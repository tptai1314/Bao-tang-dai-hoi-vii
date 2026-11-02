import os
import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    code = f.read()

image_refs = re.findall(r'imageUrl:\s*"([^"]+)"', code)
print(f"Total imageUrl references in data.js: {len(image_refs)}")

missing = []
for ref in set(image_refs):
    exists = os.path.exists(ref)
    size = os.path.getsize(ref) if exists else 0
    print(f"  {ref:35} -> exists: {str(exists):5} ({size} bytes)")
    if not exists:
        missing.append(ref)

print("\nFiles in assets/images:")
for f in os.listdir('assets/images'):
    fp = os.path.join('assets/images', f)
    print(f"  assets/images/{f:25} ({os.path.getsize(fp)} bytes)")

if missing:
    print("\nMISSING FILES:", missing)
else:
    print("\nALL REFERENCED FILES EXIST ON DISK!")

