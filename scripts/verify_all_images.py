import sys, io, re, os
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def check_file(path_str):
    rel_path = path_str.strip().replace('/', os.sep)
    exists = os.path.isfile(rel_path)
    size = os.path.getsize(rel_path) if exists else 0
    return exists, size

print("=== CHECKING js/data.js ===")
with open('js/data.js', 'r', encoding='utf-8') as f:
    text_data = f.read()

# Exhibits
exhibit_imgs = re.findall(r'id:\s*"([^"]+)"[\s\S]*?imageUrl:\s*"([^"]+)"', text_data)
print(f"Total Exhibits with imageUrl: {len(exhibit_imgs)}")
all_ok = True
for eid, img in exhibit_imgs:
    ok, size = check_file(img)
    status = f"OK ({size} bytes)" if ok else "MISSING FAILED!"
    if not ok: all_ok = False
    print(f"  Exhibit {eid:10} -> {img:38} [{status}]")

# Hotspots
hotspot_imgs = re.findall(r'id:\s*"([^"]+)"[\s\S]*?imageUrl:\s*"([^"]+)"', text_data)
# Exclude exhibits ids
hotspot_only = [x for x in hotspot_imgs if 'hotspot' in x[0]]
print(f"\nTotal Hotspots with imageUrl: {len(hotspot_only)}")
for hid, img in hotspot_only:
    ok, size = check_file(img)
    status = f"OK ({size} bytes)" if ok else "MISSING FAILED!"
    if not ok: all_ok = False
    print(f"  Hotspot {hid:12} -> {img:38} [{status}]")

print("\n=== CHECKING js/app.js ===")
with open('js/app.js', 'r', encoding='utf-8') as f:
    text_app = f.read()

app_imgs = set(re.findall(r'assets/images/[a-zA-Z0-9_\-\.]+', text_app))
print(f"Total distinct image references in app.js: {len(app_imgs)}")
for img in sorted(app_imgs):
    ok, size = check_file(img)
    status = f"OK ({size} bytes)" if ok else "MISSING FAILED!"
    if not ok: all_ok = False
    print(f"  {img:40} [{status}]")

print("\n=== FINAL VERIFICATION RESULT ===")
if all_ok:
    print("SUCCESS: 100% of images exist on disk and are verified!")
else:
    print("ERROR: Some images are missing!")
    sys.exit(1)

