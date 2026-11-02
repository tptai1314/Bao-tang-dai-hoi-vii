import sys, io, json, os
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('content.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print("Checking content.json images against disk...")
for room in data.get('rooms', []):
    print(f"[{room['id']}] {room['title']}")
    cp = room.get('centerpiece', {})
    if 'imagePath' in cp:
        path = cp['imagePath']
        exists = os.path.exists(path)
        print(f"  Centerpiece: {path} -> {'EXISTS' if exists else 'MISSING'}")
    for hs in room.get('hotspots', []):
        path = hs.get('imageUrl', '')
        exists = os.path.exists(path)
        print(f"  Hotspot {hs['id']}: {path} -> {'EXISTS' if exists else 'MISSING'}")

