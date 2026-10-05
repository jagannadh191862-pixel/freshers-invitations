import zipfile
import sys

excel_path = r'C:\Users\smile\.gemini\antigravity\scratch\freshers-2k26\students_master.xlsx'
log_path = r'C:\Users\smile\.gemini\antigravity\scratch\freshers-2k26\inspect.log'

with open(log_path, 'w', encoding='utf-8') as out:
    try:
        with zipfile.ZipFile(excel_path) as z:
            out.write("Namelist in zip:\n" + "\n".join(z.namelist()) + "\n\n")
            for name in z.namelist():
                if name.endswith('.xml') and ('sheet' in name or 'shared' in name or 'workbook' in name):
                    content = z.read(name).decode('utf-8', errors='ignore')
                    out.write(f"--- {name} (len {len(content)}) ---\n")
                    out.write(content[:1000] + "\n\n")
    except Exception as e:
        out.write(f"Error: {e}\n")
