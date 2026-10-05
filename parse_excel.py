import zipfile
import xml.etree.ElementTree as ET
import json
import os

excel_path = r'C:\Users\smile\.gemini\antigravity\scratch\freshers-2k26\students_master.xlsx'

ns = {'s': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}

with zipfile.ZipFile(excel_path) as z:
    # Read shared strings
    shared_strings = []
    if 'xl/sharedStrings.xml' in z.namelist():
        tree = ET.fromstring(z.read('xl/sharedStrings.xml'))
        for si in tree.findall('s:si', ns):
            # Text can be in t or r/t
            t_elems = si.findall('.//s:t', ns)
            text = "".join([t.text or "" for t in t_elems])
            shared_strings.append(text)
    
    # Read sheet1.xml
    sheet_data = z.read('xl/worksheets/sheet1.xml')
    tree = ET.fromstring(sheet_data)
    
    rows = []
    for r in tree.findall('.//s:row', ns):
        row_cells = []
        for c in r.findall('s:c', ns):
            t = c.attrib.get('t')
            v_elem = c.find('s:v', ns)
            v = v_elem.text if v_elem is not None else ""
            if t == 's' and v.isdigit():
                val = shared_strings[int(v)]
            else:
                val = v
            row_cells.append(val)
        if row_cells:
            rows.append(row_cells)

print(f"Parsed {len(rows)} rows.")
if rows:
    headers = rows[0]
    print("Headers:", headers)
    students = []
    for r in rows[1:]:
        if not r or len(r) < 2: continue
        # Zip header and values
        record = {}
        for h, val in zip(headers, r):
            record[h] = val
        students.append(record)
    
    print(f"Total student records: {len(students)}")
    print("First 3 records:", json.dumps(students[:3], indent=2))
    
    # Save parsed records to students.json
    out_path = r'C:\Users\smile\.gemini\antigravity\scratch\freshers-2k26\students.json'
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(students, f, indent=2)
    print("Saved to students.json")
