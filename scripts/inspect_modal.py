import sys, io, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

m = re.search(r'<div[^>]*id=["\']exhibit-modal["\'][\s\S]*?</div>\s*</div>\s*</div>', html)
if m:
    print("Found exhibit-modal HTML:")
    print(m.group(0)[:2000])

print("\n--- Event listeners for close in app.js ---")
with open('js/app.js', 'r', encoding='utf-8') as f:
    app_js = f.read()

for i, line in enumerate(app_js.splitlines()):
    if any(k in line for k in ['btn-close-modal', 'closeExhibitModal', 'exhibit-modal']):
        print(f"Line {i+1}: {line}")

