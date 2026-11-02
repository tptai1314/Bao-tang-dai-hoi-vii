import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('js/app.js', 'r', encoding='utf-8') as f:
    text = f.read()

keywords = ['btn-close', 'modal-overlay', 'closeExhibitModal', 'toggleTeleportModal', 'closeQuizModal', 'toggleReferenceModal']
for i, line in enumerate(text.splitlines()):
    if any(k in line for k in keywords):
        print(f"Line {i+1}: {line}")

