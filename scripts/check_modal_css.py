import sys, io, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('css/style.css', 'r', encoding='utf-8') as f:
    text = f.read()

for m in re.finditer(r'(\.modal[^{]*\{[^}]*\})', text):
    print(m.group(1))
    print('-'*40)

