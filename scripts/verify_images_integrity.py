import os
from PIL import Image

image_dir = 'assets/images'
files = [f for f in os.listdir(image_dir) if f.endswith('.jpg')]
print(f"Total jpg files in {image_dir}: {len(files)}")

for f in sorted(files):
    p = os.path.join(image_dir, f)
    try:
        im = Image.open(p)
        im.verify() # Verify file integrity
        # Re-open to read size and mode (verify closes the file)
        im = Image.open(p)
        print(f"  OK: {f:28} | size={im.size} | mode={im.mode} | bytes={os.path.getsize(p)}")
    except Exception as e:
        print(f"  CORRUPTED: {f} -> {e}")

