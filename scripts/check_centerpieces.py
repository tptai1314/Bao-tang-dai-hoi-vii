import sys, io, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('js/app.js', 'r', encoding='utf-8') as f:
    text = f.read()

matches = re.finditer(r'function createRoom\dCenterpiece[\s\S]*?\n\}', text)
for m in matches:
    func_text = m.group(0)
    func_name = func_text.splitlines()[0]
    imgs = re.findall(r'assets/images/[a-zA-Z0-9_\-\.]+', func_text)
    print(func_name, "->", imgs)

