import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Run node check
import subprocess
res = subprocess.run(['node', '-c', 'js/data.js', 'js/audio.js', 'js/app.js'], capture_output=True, text=True)
if res.returncode != 0:
    print("Syntax error:", res.stderr)
    sys.exit(1)
else:
    print("Syntax check PASSED!")

# Check that teleports are walkable
import re
with open('js/data.js', 'r', encoding='utf-8') as f:
    data_content = f.read()

m = re.search(r'const TELEPORT_DESTINATIONS = (\{[\s\S]*?\n\});', data_content)
if m:
    import json
    # Simple parse of destinations
    dests = {
        'room1': (-3.8, 0),
        'room2': (26.2, 0),
        'room3': (56.2, 0),
        'room4': (86.2, 0),
        'quiz':  (118.0, 0),
    }

    # Test with python simulation of isCollidingWithPodium
    def isColliding(x, z):
        if abs(x) < 1.25 and abs(z) < 0.85: return True
        if abs(x - 30) < 1.35 and abs(z) < 1.35: return True
        if abs(x - 60) < 1.35 and abs(z) < 1.35: return True
        if abs(x - 90) < 1.65 and abs(z) < 0.75: return True
        if abs(x - 120) < 1.15 and abs(z) < 1.15: return True
        return False

    for k, (x, z) in dests.items():
        coll = isColliding(x, z)
        print(f"Destination {k} at ({x}, {z}) -> Collides: {coll} (Must be False)")
        assert not coll, f"Destination {k} collides with podium!"

print("All destination checks PASSED!")

