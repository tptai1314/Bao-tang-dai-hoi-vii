import sys, io, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

m = re.search(r'const HOTSPOTS_DATA = \[([\s\S]*?)\];', text)
if m:
    hotspots = m.group(1)
    items = re.findall(r'(\{\s*id:\s*"[^"]+"[\s\S]*?\n\s*\})', hotspots)
    for it in items:
        id_m = re.search(r'id:\s*"([^"]+)"', it)
        label_m = re.search(r'label:\s*"([^"]+)"', it)
        img_m = re.search(r'imageUrl:\s*"([^"]+)"', it)
        print(f"{id_m.group(1) if id_m else '?'}: {label_m.group(1) if label_m else '?'} -> {img_m.group(1) if img_m else 'NO IMAGE'}")
