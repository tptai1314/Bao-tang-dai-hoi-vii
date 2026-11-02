import sys, io, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('C:/Users/ASUS/.gemini/antigravity/brain/0310192b-0534-4b4a-a214-a91dde02b38f/.system_generated/logs/transcript_full.jsonl', 'r', encoding='utf-8') as f:
    for line in f:
        if 'BIBLIOGRAPHY_DATA' in line and 'const BIBLIOGRAPHY_DATA' in line:
            obj = json.loads(line)
            tcs = obj.get('tool_calls', [])
            for tc in tcs:
                content = tc.get('args', {}).get('Content', '')
                if 'const BIBLIOGRAPHY_DATA' in content:
                    idx = content.find('const BIBLIOGRAPHY_DATA')
                    end_idx = content.find('];', idx)
                    if idx != -1 and end_idx != -1:
                        print("FOUND EXACT BIBLIOGRAPHY_DATA IN FULL TRANSCRIPT:")
                        print(content[idx:end_idx+2])
                        sys.exit(0)

