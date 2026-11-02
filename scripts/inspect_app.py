import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Find occurrences of TextureLoader or load or image
matches = re.findall(r'(\.load\([^)]+\))', text)
for m in matches:
    print("TextureLoader:", m)

# Find references to imageUrl or HOTSPOTS or EXHIBITS
print("\n--- References to imageUrl ---")
for line in text.splitlines():
    if 'imageUrl' in line or 'HOTSPOTS_DATA' in line or 'EXHIBITS_DATA' in line or 'centerpiece' in line:
        print(line[:100])

