import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('js/app.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if 'function createHotspotKiosks' in l:
        print(f"Line {i+1}: {l.strip()}")
        for j in range(i, min(i + 80, len(lines))):
            print(f"  {j+1}: {lines[j]}", end='')
        break

