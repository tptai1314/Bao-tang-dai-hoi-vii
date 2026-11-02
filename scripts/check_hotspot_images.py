with open('js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = re.findall(r'id:\s*"([^"]+)",[\s\S]*?imageUrl:\s*"([^"]+)"', text)
for m in matches:
    print(f"{m[0]:25} -> {m[1]}")

