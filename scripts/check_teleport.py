import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
import os

for f in ['js/data.js', 'js/app.js', 'js/audio.js']:
    with open(f, 'r', encoding='utf-8') as fp:
        c = fp.read()
    if 'TELEPORT_DESTINATIONS' in c:
        print(f"Found in {f}:")
        for i, line in enumerate(c.splitlines()):
            if 'TELEPORT_DESTINATIONS' in line:
                print(f"   line {i+1}: {line}")
