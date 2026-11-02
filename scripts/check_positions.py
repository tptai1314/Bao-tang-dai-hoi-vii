import sys, io, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

m = re.findall(r'id:\s*"([^"]+)"[\s\S]*?position:\s*(\{[^}]+\})', text)
for item in m:
    print(f"{item[0]}: pos: {item[1]}")
