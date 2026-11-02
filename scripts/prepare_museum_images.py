import urllib.request
import json
import os
import ssl
from PIL import Image, ImageDraw, ImageFont

os.makedirs('assets/images', exist_ok=True)

# List of target files
targets = {
    'p1_ex1.jpg': {
        'commons_title': 'File:Thoi bao cap.jpg',
        'backup_title': 'TEM PHIẾU THỜI BAO CẤP & LẠM PHÁT PHI MÃ',
        'sub': 'Phân phối lương thực qua tem phiếu & khủng hoảng giá - lương - tiền (1986-1990)',
        'year': '1986 - 1990'
    },
    'p1_ex2.jpg': {
        'commons_title': 'File:Coat of arms of the Soviet Union.svg',
        'backup_title': 'BIẾN ĐỘNG Ở LIÊN XÔ VÀ ĐÔNG ÂU',
        'sub': 'Chế độ XHCN ở Đông Âu sụp đổ, SEV giải thể và Liên Xô đứng trước bờ vực tan rã',
        'year': '1989 - 1991'
    },
    'p1_ex3.jpg': {
        'commons_title': 'File:Nguyen Van Linh.jpg',
        'backup_title': 'ĐẠI HỘI VI (1986): KHỞI ĐẦU ĐỔI MỚI',
        'sub': 'Tổng Bí thư Nguyễn Văn Linh và quyết sách lịch sử nhìn thẳng sự thật để đổi mới',
        'year': '12/1986'
    },
    'p2_ex1.jpg': {
        'commons_title': 'File:Do Muoi cropped.jpg',
        'backup_title': 'ĐẠI HỘI VII & TỔNG BÍ THƯ ĐỖ MƯỜI',
        'sub': '1.176 đại biểu họp tại Hội trường Ba Đình; Đồng chí Đỗ Mười được bầu làm Tổng Bí thư',
        'year': '24 - 27/6/1991'
    },
    'p2_ex2.jpg': {
        'commons_title': None,
        'backup_title': 'CƯƠNG LĨNH XÂY DỰNG ĐẤT NƯỚC (1991)',
        'sub': 'Ngọn cờ tư tưởng đúc kết 6 đặc trưng bản chất của xã hội XHCN ở Việt Nam',
        'year': 'Tháng 6/1991'
    },
    'p2_ex3.jpg': {
        'commons_title': 'File:Ho Chi Minh 1946.jpg',
        'backup_title': 'CHỦ NGHĨA MÁC-LÊNIN & TƯ TƯỞNG HỒ CHÍ MINH',
        'sub': 'Khẳng định Tư tưởng Hồ Chí Minh là nền tảng tư tưởng, kim chỉ nam cho hành động của Đảng',
        'year': 'Đại hội VII (1991)'
    },
    'p3_ex1.jpg': {
        'commons_title': 'File:Hoa Binh Dam in Vietnam.jpg',
        'backup_title': 'KINH TẾ HÀNG HÓA NHIỀU THÀNH PHẦN',
        'sub': 'Vận hành theo cơ chế thị trường có sự quản lý của Nhà nước; phát triển công trình trọng điểm',
        'year': '1991 - 2000'
    },
    'p3_ex2.jpg': {
        'commons_title': None,
        'backup_title': 'TUYÊN BỐ ĐỐI NGOẠI BƯỚC NGOẶT',
        'sub': '"Việt Nam muốn là bạn với tất cả các nước trong cộng đồng thế giới, phấn đấu vì hòa bình"',
        'year': 'Tháng 6/1991'
    },
    'p3_ex3.jpg': {
        'commons_title': 'File:ASEAN Flags.jpg',
        'backup_title': 'PHÁ THẾ BAO VÂY CÔ LẬP: GIA NHẬP ASEAN (1995)',
        'sub': 'Bình thường hóa với Trung Quốc (1991), Hoa Kỳ (1995) và trở thành thành viên thứ 7 của ASEAN',
        'year': '1991 - 1995'
    },
    'p4_ex1.jpg': {
        'commons_title': 'File:Mr. Vo Van Kiet.jpg',
        'backup_title': 'KINH TẾ PHỤC HỒI KỲ DIỆU (GDP 8.2%/NĂM)',
        'sub': 'Thủ tướng Võ Văn Kiệt cùng Chính phủ điều hành kiềm chế lạm phát từ 67% xuống 12.7%',
        'year': '1991 - 1995'
    },
    'p4_ex2.jpg': {
        'commons_title': None,
        'backup_title': 'CÔNG TRÌNH THẾ KỶ: ĐƯỜNG DÂY 500kV BẮC - NAM',
        'sub': 'Thống nhất hệ thống điện quốc gia (1992-1994), giữ vững ổn định chính trị - xã hội trong giông bão',
        'year': '1992 - 1994'
    },
    'p4_ex3.jpg': {
        'commons_title': None,
        'backup_title': 'TIỀN ĐỀ BƯỚC VÀO THỜI KỲ CNH - HĐH',
        'sub': 'Thành tựu Đại hội VII tạo thế và lực đưa đất nước bước sang Đại hội VIII (1996) đẩy mạnh CNH-HĐH',
        'year': 'Đại hội VIII (1996)'
    }
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}

def get_wikimedia_url(title):
    try:
        url = f'https://commons.wikimedia.org/w/api.php?action=query&titles={urllib.parse.quote(title)}&prop=imageinfo&iiprop=url&format=json'
        req = urllib.request.Request(url, headers={'User-Agent': 'AntigravityApp/1.0 (student.project@vnr.edu.vn)'})
        with urllib.request.urlopen(req, timeout=8) as r:
            data = json.loads(r.read())
            pages = data.get('query', {}).get('pages', {})
            for pid, p in pages.items():
                if 'imageinfo' in p and len(p['imageinfo']) > 0:
                    raw_url = p['imageinfo'][0]['url']
                    return raw_url
    except Exception as e:
        print(f"Error fetching URL for {title}: {e}")
    return None

def download_image(url, save_path):
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=12) as r:
            data = r.read()
            with open(save_path, 'wb') as f:
                f.write(data)
            print(f"Successfully downloaded {save_path} ({len(data)} bytes)")
            return True
    except Exception as e:
        print(f"Failed download {url}: {e}")
        return False

def generate_archival_plate(file_path, info):
    # Create high-res 1200x800 museum archival plate
    img = Image.new('RGB', (1200, 800), color='#1e232d')
    draw = ImageDraw.Draw(img)

    # Gradient background
    for y in range(800):
        r = int(50 + (y / 800) * -30)
        g = int(15 + (y / 800) * -5)
        b = int(20 + (y / 800) * -5)
        draw.line([(0, y), (1200, y)], fill=(max(r, 15), max(g, 10), max(b, 12)))

    # Ornate double border
    draw.rectangle([25, 25, 1175, 775], outline='#d97706', width=6)
    draw.rectangle([35, 35, 1165, 765], outline='#f59e0b', width=2)

    # Corner stars
    for cx, cy in [(50, 50), (1150, 50), (50, 750), (1150, 750)]:
        draw.ellipse([cx-10, cy-10, cx+10, cy+10], fill='#fbbf24')

    # Top header badge
    draw.rectangle([300, 50, 900, 110], fill='#670d10', outline='#f59e0b', width=2)
    draw.text((600, 80), f"★ TƯ LIỆU LỊCH SỬ ĐẠI HỘI VII (1991) - {info['year']} ★", fill='#fef08a', anchor="mm")

    # Center Document Card
    draw.rectangle([120, 150, 1080, 680], fill='#181c24', outline='#475569', width=2)
    draw.rectangle([130, 160, 1070, 240], fill='#78350f')
    
    # Title & Subtitle
    draw.text((600, 200), info['backup_title'], fill='#fef08a', anchor="mm")
    
    # Text box details
    lines = [
        info['sub'],
        "",
        "Đại hội đại biểu toàn quốc lần thứ VII của Đảng (24 - 27/6/1991 tại Hà Nội)",
        "Chủ đề: 'Đổi mới, ổn định và phát triển'",
        "Lưu trữ tại: Bảo tàng Lịch sử Quốc gia & Viện Lịch sử Đảng"
    ]
    y_text = 300
    for l in lines:
        draw.text((600, y_text), l, fill='#e2e8f0', anchor="mm")
        y_text += 40

    # Red seal stamp in bottom corner
    draw.ellipse([920, 520, 1040, 640], outline='#ef4444', width=4)
    draw.text((980, 580), "BẢO TÀNG\nĐẢNG CSVN", fill='#ef4444', anchor="mm")

    img.save(file_path, 'JPEG', quality=95)
    print(f"Generated archival plate {file_path}")

for filename, info in targets.items():
    save_path = os.path.join('assets/images', filename)
    downloaded = False
    if info['commons_title']:
        url = get_wikimedia_url(info['commons_title'])
        if url and not url.endswith('.svg'):
            downloaded = download_image(url, save_path)
    if not downloaded:
        generate_archival_plate(save_path, info)

print("All 12 museum images ready in assets/images!")

