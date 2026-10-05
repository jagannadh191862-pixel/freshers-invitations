const path = require('path');
const fs = require('fs');

const XLSX = require(path.join(__dirname, 'node_modules', 'xlsx'));

const excelPath = path.join(__dirname, 'students_master.xlsx');
const jsonPath = path.join(__dirname, 'students_parsed.json');
const encryptedDbPath = path.join(__dirname, 'students_db_encrypted.json');
const logFile = path.join(__dirname, 'parse_run.log');

function log(msg) {
  console.log(msg);
  fs.appendFileSync(logFile, msg + '\n');
}

fs.writeFileSync(logFile, 'Starting parsing...\n');

try {
  log('Loading workbook: ' + excelPath);
  const workbook = XLSX.readFile(excelPath);
  log('Sheets found: ' + workbook.SheetNames.join(', '));

  const sheetName = workbook.SheetNames.includes('Students') ? 'Students' : workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const rawData = XLSX.utils.sheet_to_json(sheet, { defval: '' });
  log(`Total rows in '${sheetName}': ${rawData.length}`);

  if (rawData.length > 0) {
    log('Sample row 0: ' + JSON.stringify(rawData[0]));
  }

  const students = rawData.map(row => {
    const normRow = {};
    Object.keys(row).forEach(k => {
      normRow[k.trim().toLowerCase()] = String(row[k]).trim();
    });
    return {
      roll_no: normRow.roll_no || normRow['roll no'] || normRow.rollno || '',
      full_name: normRow.full_name || normRow['full name'] || normRow.name || normRow.fullname || '',
      branch: normRow.branch || '',
      branch_code: normRow.branch_code || normRow['branch code'] || '',
      branch_name: normRow.branch_name || normRow['branch name'] || '',
      section: normRow.section || '',
      year: normRow.year || '',
      entry_type: normRow.entry_type || normRow['entry type'] || ''
    };
  }).filter(s => s.roll_no && s.full_name);

  log(`Extracted ${students.length} valid student records.`);

  fs.writeFileSync(jsonPath, JSON.stringify(students, null, 2), 'utf-8');
  log('Saved raw JSON to: ' + jsonPath);

  function obfuscate(text, key) {
    const keyUpper = key.toUpperCase();
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i) ^ keyUpper.charCodeAt(i % keyUpper.length);
      result += String.fromCharCode(charCode);
    }
    return Buffer.from(result, 'binary').toString('base64');
  }

  const lookupDb = {};
  students.forEach(s => {
    const normKey = s.roll_no.trim().toUpperCase();
    const payload = JSON.stringify({
      roll_no: s.roll_no,
      full_name: s.full_name,
      branch: s.branch,
      section: s.section
    });
    lookupDb[normKey] = obfuscate(payload, normKey);
  });

  fs.writeFileSync(encryptedDbPath, JSON.stringify(lookupDb, null, 2), 'utf-8');
  log('Saved encrypted lookup DB to: ' + encryptedDbPath);
} catch (err) {
  log('ERROR: ' + err.stack);
}
