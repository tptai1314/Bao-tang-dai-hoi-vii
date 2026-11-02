import sys, io, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('C:/Users/ASUS/.gemini/antigravity/brain/0310192b-0534-4b4a-a214-a91dde02b38f/.system_generated/logs/transcript.jsonl', 'r', encoding='utf-8') as f:
    text = f.read()

m = re.search(r'const BIBLIOGRAPHY_DATA = \[[\s\S]*?\n\];', text)
if m:
    print("Found BIBLIOGRAPHY_DATA:")
    print(m.group(0)[:1500])

m2 = re.search(r'const TELEPORT_DESTINATIONS = \{[\s\S]*?\n\};', text)
if m2:
    print("\nFound TELEPORT_DESTINATIONS:")
    print(m2.group(0))

