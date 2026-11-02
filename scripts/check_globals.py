import sys, io, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('js/data.js', 'r', encoding='utf-8') as f:
    data_js = f.read()
with open('js/audio.js', 'r', encoding='utf-8') as f:
    audio_js = f.read()
with open('js/app.js', 'r', encoding='utf-8') as f:
    app_js = f.read()

# All declared globals in data.js, audio.js, app.js
declared = set()
for content in [data_js, audio_js, app_js]:
    # const X =, let X =, var X =, function X(
    for m in re.finditer(r'(?:const|let|var)\s+([a-zA-Z0-9_$]+)', content):
        declared.add(m.group(1))
    for m in re.finditer(r'function\s+([a-zA-Z0-9_$]+)', content):
        declared.add(m.group(1))

# Check uppercase globals in app.js
used_globals = set(re.findall(r'\b([A-Z][A-Z0-9_]{2,})\b', app_js))
standard_globals = {
    'THREE', 'Math', 'JSON', 'Array', 'Object', 'String', 'Number', 'Boolean', 'Date',
    'HTMLCanvasElement', 'Uint8Array', 'Float32Array', 'Int32Array', 'RegExp', 'Error',
    'Promise', 'Map', 'Set', 'WeakMap', 'WeakSet', 'Symbol', 'Proxy', 'Reflect', 'URL'
}

missing = []
for g in sorted(used_globals):
    if g not in declared and g not in standard_globals:
        missing.append(g)

print("Potentially missing globals:", missing)

