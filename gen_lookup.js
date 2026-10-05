import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const encDbPath = path.join(__dirname, 'students_db_encrypted.json');
const encDb = JSON.parse(fs.readFileSync(encDbPath, 'utf-8'));

const fileHeader = `// Encrypted student database lookup (${Object.keys(encDb).length} records)
// Protects student list from plain-text scraping while allowing fast roll-number verification

const LOOKUP_DB = ${JSON.stringify(encDb, null, 2)};

function deobfuscate(b64, key) {
  try {
    const binary = atob(b64);
    const keyUpper = key.toUpperCase();
    let result = '';
    for (let i = 0; i < binary.length; i++) {
      const charCode = binary.charCodeAt(i) ^ keyUpper.charCodeAt(i % keyUpper.length);
      result += String.fromCharCode(charCode);
    }
    return result;
  } catch (err) {
    return null;
  }
}

/**
 * Searches student database by roll number
 * @param {string} inputRollNo - Student roll number entered by user
 * @returns {object|null} Student details object if found, null otherwise
 */
export function searchStudentByRollNo(inputRollNo) {
  if (!inputRollNo || typeof inputRollNo !== 'string') return null;
  
  // Normalize input: trim spaces, uppercase
  const cleanKey = inputRollNo.trim().replace(/\\s+/g, '').toUpperCase();
  if (!cleanKey) return null;

  const encryptedData = LOOKUP_DB[cleanKey];
  if (!encryptedData) return null;

  const decryptedJson = deobfuscate(encryptedData, cleanKey);
  if (!decryptedJson) return null;

  try {
    return JSON.parse(decryptedJson);
  } catch (e) {
    return null;
  }
}

export const TOTAL_STUDENTS_COUNT = ${Object.keys(encDb).length};
`;

const outDir = path.join(__dirname, 'src', 'data');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(path.join(outDir, 'studentsLookup.js'), fileHeader, 'utf-8');
console.log('Successfully generated src/data/studentsLookup.js with ' + Object.keys(encDb).length + ' student records!');
