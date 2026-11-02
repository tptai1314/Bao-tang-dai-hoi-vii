import json

with open('content.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

for r in d.get('rooms', []):
    print("Room:", r['id'])
    for hs in r.get('hotspots', []):
        print("  Hotspot:", hs['id'], "imageUrl:", hs.get('imageUrl'))

