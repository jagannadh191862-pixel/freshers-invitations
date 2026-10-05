import zipfile
import xml.etree.ElementTree as ET
import json
import sys

excel_path = r'C:\Users\smile\.gemini\antigravity\scratch\freshers-2k26\students_master.xlsx'
out_path = r'C:\Users\smile\.gemini\antigravity\brain\4ba2ffbd-5e5a-4fee-8d1d-e1e383c0b7f7\students_db.json'
debug_path = r'C:\Users\smile\.gemini\antigravity\brain\4ba2ffbd-5e5a-4fee-8d1d-e1e383c0b7f7\parse_debug.txt'

with open(debug_path, 'w', encoding='utf-8') as dbg:
    dbg.write("Starting script...\n")
    try:
        ns = {'s': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
        with zipfile.ZipFile(excel_path) as z:
            dbg.write(f"Zip opened. Namelist count: {len(z.namelist())}\n")
            shared_strings = []
            if 'xl/sharedStrings.xml' in z.namelist():
                tree = ET.fromstring(z.read('xl/sharedStrings.xml'))
                for si in tree.findall('s:si', ns):
                    t_elems = si.findall('.//s:t', ns)
                    text = "".join([t.text or "" for t in t_elems])
                    shared_strings.append(text)
            dbg.write(f"Shared strings count: {len(shared_strings)}\n")
            
            # Find worksheet xml
            sheet_files = [f for f in z.namelist() if f.startswith('xl/worksheets/sheet')]
            dbg.write(f"Sheet files: {sheet_files}\n")
            if not sheet_files:
                dbg.write("No sheet file found!\n")
                sys.exit(1)
            
            sheet_data = z.read(sheet_files[0])
            tree = ET.fromstring(sheet_data)
            
            rows = []
            for r in tree.findall('.//s:row', ns):
                row_cells = []
                for c in r.findall('s:c', ns):
                    t = c.attrib.get('t')
                    v_elem = c.find('s:v', ns)
                    v = v_elem.text if v_elem is not None else ""
                    if t == 's' and v.isdigit() and int(v) < len(shared_strings):
                        val = shared_strings[int(v)]
                    else:
                        val = v
                    row_cells.append(val)
                if row_cells:
                    rows.append(row_cells)
            
            dbg.write(f"Parsed rows count: {len(rows)}\n")
            if rows:
                headers = [str(h).strip().lower() for h in rows[0]]
                dbg.write(f"Headers: {headers}\n")
                students = []
                for r in rows[1:]:
                    if not r or len(r) == 0: continue
                    record = {}
                    for h, val in zip(headers, r):
                        record[h] = str(val).strip()
                    students.append(record)
                
                with open(out_path, 'w', encoding='utf-8') as f:
                    json.dump(students, f, indent=2)
                dbg.write(f"Successfully saved {len(students)} students to {out_path}\n")
    except Exception as e:
        dbg.write(f"EXCEPTION: {e}\n")
