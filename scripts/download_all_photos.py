import urllib.request
import json
import os

headers = {'User-Agent': 'VNR_MuseumProject/1.0 (contact: student@edu.vn)'}
os.makedirs('tmp_photos', exist_ok=True)

def get_commons_url(title):
    url = f'https://commons.wikimedia.org/w/api.php?action=query&titles={urllib.parse.quote(title)}&prop=imageinfo&iiprop=url&format=json'
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as r:
            data = json.loads(r.read())
            pages = data.get('query', {}).get('pages', {})
            for pid, pdata in pages.items():
                info = pdata.get('imageinfo', [])
                if info:
                    return info[0].get('url')
    except Exception as e:
        print(f"Error fetching url for {title}: {e}")
        return None

def download_file(title, out_name):
    dest = os.path.join('tmp_photos', out_name)
    if os.path.exists(dest) and os.path.getsize(dest) > 1000:
        print(f"Already exists: {out_name} ({os.path.getsize(dest)} bytes)")
        return dest
    url = get_commons_url(title)
    if not url:
        print(f"Could not get URL for {title}")
        return None
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as r:
            data = r.read()
            with open(dest, 'wb') as f:
                f.write(data)
        print(f"Downloaded {out_name} ({len(data)} bytes) from {title}")
        return dest
    except Exception as e:
        print(f"Error downloading {out_name}: {e}")
        return None

# Target authentic files
downloads = [
    ('File:Ho Chi Minh 1946.jpg', 'ho_chi_minh.jpg'),
    ('File:Karl Marx 001.jpg', 'karl_marx.jpg'),
    ('File:Vladimir Lenin, 1917.jpg', 'lenin.jpg'),
    ('File:Transmission towers at sunset in East Texas.jpg', '500kv_pylon.jpg'),
    ('File:Ben Thanh market 2.jpg', 'ben_thanh.jpg'),
    ('File:Hanoi, Vietnam, Ba Dinh Square.jpg', 'ba_dinh.jpg'),
    ('File:Inflation Vietnam 1976-1986 (Retail price).png', 'inflation_chart.png'),
    ('File:The Soviet Union 1990 CPA 6181 stamp (60th Anniv of Vietnamese Communist Party. Flag and Hanoi Monument).jpg', 'cpv_stamp_1990.jpg'),
    ('File:WWII Food Rationing.jpg', 'rationing_food.jpg'),
    ('File:Photograph of President William Jefferson Clinton Greeting a Large Crowd in Hanoi, Vietnam - DPLA - 52a3712e76aad78697fdc79b7bb21b19.jpg', 'us_vietnam_relations.jpg')
]

for title, out_name in downloads:
    download_file(title, out_name)

print("\nFinished downloading authentic historical base photos.")

