import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('js/app.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print("Line 1130-1150:")
for i in range(1128, min(1150, len(lines))):
    print(f"{i+1}: {lines[i]}", end='')

print("\nLine 2100-2125:")
for i in range(2100, min(2125, len(lines))):
    print(f"{i+1}: {lines[i]}", end='')

