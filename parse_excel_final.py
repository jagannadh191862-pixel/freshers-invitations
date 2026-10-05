import zipfile
import xml.etree.ElementTree as ET
import json
import os

excel_path = r'C:\Users\smile\.gemini\antigravity\scratch\freshers-2k26\students_master.xlsx'
out_path = r'C:\Users\smile\.gemini\antigravity\scratch\freshers-2k26\students_db.json'

ns = {'s': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}

with zipfile.ZipFile(excel_path) as z:
    shared_strings = []
    if 'xl/sharedStrings.xml' in z.namelist():
        tree = ET.fromstring(z.read('xl/sharedStrings.xml'))
        for si in tree.findall('s:si', ns):
            t_elems = si.findall('.//s:t', ns)
            text = "".join([t.text or "" for t in t_elems])
            shared_strings.append(text)
    
    sheet_data = z.read('xl/worksheets/sheet1.xml')
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

if rows:
    headers = [str(h).strip().lower() for h in rows[0]]
    print("Headers found:", headers)
    students = []
    for r in rows[1:]:
        if not r or len(r) == 0: continue
        record = {}
        for h, val in zip(headers, r):
            record[h] = str(val).strip()
        students.append(record)
    
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(students, f, indent=2)
    print(f"Successfully processed {len(students)} student records!")
