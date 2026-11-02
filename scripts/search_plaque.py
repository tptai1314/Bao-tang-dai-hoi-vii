import sys, io, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('js/app.js', 'r', encoding='utf-8') as f:
    text = f.read()

keywords = ['plaque', 'phiến', 'bục', 'square', 'box', 'coupon']
for i, line in enumerate(text.splitlines()):
    if any(k in line.lower() for k in keywords):
        print(f"Line {i+1}: {line[:90]}")

