import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

print("--- EXHIBITS_DATA ---")
exhibit_blocks = re.findall(r'(\{\s*id:\s*"p\d_ex\d"[\s\S]*?\n\s*\})', text)
for b in exhibit_blocks:
    id_m = re.search(r'id:\s*"([^"]+)"', b)
    title_m = re.search(r'title:\s*"([^"]+)"', b)
    img_m = re.search(r'imageUrl:\s*"([^"]+)"', b)
    print(f"{id_m.group(1) if id_m else '?'}: {title_m.group(1)[:40] if title_m else '?'} -> {img_m.group(1) if img_m else 'NO IMG'}")

print("\n--- HOTSPOTS_DATA ---")
hotspot_blocks = re.findall(r'(\{\s*id:\s*"p\d_[ab]"[\s\S]*?\n\s*\})', text)
for b in hotspot_blocks:
    id_m = re.search(r'id:\s*"([^"]+)"', b)
    title_m = re.search(r'title:\s*"([^"]+)"', b)
    img_m = re.search(r'img:\s*"([^"]+)"', b)
    print(f"{id_m.group(1) if id_m else '?'}: {title_m.group(1)[:40] if title_m else '?'} -> {img_m.group(1) if img_m else 'NO IMG'}")
