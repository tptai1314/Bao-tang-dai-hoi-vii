import json
import re

def update_hotspots_in_data_js():
    with open('js/data.js', 'r', encoding='utf-8') as f:
        code = f.read()

    # Mapping of hotspot id to imageUrl, photoYear, photoSource, docQuote, docQuoteSource
    hotspot_meta = {
        "p1_hotspot_a": {
            "imageUrl": "assets/images/p1_ex1.jpg",
            "photoYear": "1986",
            "photoSource": "Bảo tàng Lịch sử Quốc gia / TTXVN",
            "docQuote": "Lạm phát phi mã lên tới 774,7% năm 1986, đòi hỏi phải kiên quyết đổi mới toàn diện.",
            "docQuoteSource": "Văn kiện Đại hội VI & Báo cáo Đại hội VII"
        },
        "p1_hotspot_b": {
            "imageUrl": "assets/images/p1_ex2.jpg",
            "photoYear": "1989 - 1991",
            "photoSource": "Tư liệu lưu trữ quốc tế / TTXVN",
            "docQuote": "Chế độ xã hội chủ nghĩa ở Đông Âu và Liên Xô lâm vào khủng hoảng toàn diện; khối SEV giải thể đặt nước ta trước thử thách sống còn.",
            "docQuoteSource": "Văn kiện Đại hội VII của Đảng, tr. 15"
        },
        "p2_hotspot_a": {
            "imageUrl": "assets/images/p2_portrait_domuoi.jpg",
            "photoYear": "1991",
            "photoSource": "Thông tấn xã Việt Nam / dangcongsan.vn",
            "docQuote": "Kiên định con đường xã hội chủ nghĩa, phát huy dân chủ, giữ vững kỷ cương và tăng cường đoàn kết toàn dân tộc.",
            "docQuoteSource": "Phát biểu bế mạc Đại hội VII của Tổng Bí thư Đỗ Mười"
        },
        "p2_hotspot_b": {
            "imageUrl": "assets/images/p2_emblem.jpg",
            "photoYear": "1991",
            "photoSource": "Bảo tàng Lịch sử Quốc gia",
            "docQuote": "Khẩu hiệu hành động: Đổi mới, Ổn định và Phát triển - Giữ vững định hướng xã hội chủ nghĩa.",
            "docQuoteSource": "Văn kiện Đại hội VII của Đảng"
        },
        "p3_hotspot_a": {
            "imageUrl": "assets/images/p3_portrait_vovankiet.jpg",
            "photoYear": "1991 - 1997",
            "photoSource": "Thông tấn xã Việt Nam",
            "docQuote": "Phải đổi mới quyết liệt, dám nghĩ, dám làm, lấy hiệu quả phục vụ nhân dân và sự hưng thịnh của đất nước làm thước đo.",
            "docQuoteSource": "Tài liệu lưu trữ Chính phủ"
        },
        "p3_hotspot_b": {
            "imageUrl": "assets/images/p3_ex3.jpg",
            "photoYear": "Tháng 7/1995",
            "photoSource": "Thông tấn xã Việt Nam / Báo Quốc tế",
            "docQuote": "Phá vỡ hoàn toàn thế bao vây cô lập, tạo môi trường quốc tế hòa bình, thuận lợi cho công cuộc đổi mới và phát triển đất nước.",
            "docQuoteSource": "Nghị quyết Trung ương Đảng khóa VII"
        },
        "p4_hotspot_a": {
            "imageUrl": "assets/images/p4_ex2.jpg",
            "photoYear": "1994",
            "photoSource": "Tập đoàn Điện lực Việt Nam (EVN) / Báo Tiền Phong",
            "docQuote": "Đường dây 500kV Bắc - Nam là kỳ tích về ý chí, lòng dũng cảm và trí tuệ sáng tạo của giai cấp công nhân và trí thức Việt Nam.",
            "docQuoteSource": "Diễn văn Thủ tướng Võ Văn Kiệt"
        },
        "p4_hotspot_b": {
            "imageUrl": "assets/images/p4_ex3.jpg",
            "photoYear": "1996",
            "photoSource": "Báo Nhân Dân / TTXVN",
            "docQuote": "Nhiệm vụ chuẩn bị tiền đề cho công nghiệp hóa đã cơ bản hoàn thành; đất nước chuyển sang thời kỳ đẩy mạnh công nghiệp hóa, hiện đại hóa.",
            "docQuoteSource": "Văn kiện Đại hội VIII của Đảng, tr. 68"
        }
    }

    for hid, meta in hotspot_meta.items():
        pattern = rf'(id:\s*"{hid}",\s*room:\s*"[^"]+",)'
        extra_fields = f'\n    imageUrl: "{meta["imageUrl"]}",\n    photoYear: "{meta["photoYear"]}",\n    photoSource: "{meta["photoSource"]}",\n    docQuote: "{meta["docQuote"]}",\n    docQuoteSource: "{meta["docQuoteSource"]}",'
        if f'id: "{hid}"' in code and f'imageUrl: "{meta["imageUrl"]}"' not in code:
            code = re.sub(pattern, rf'\1{extra_fields}', code, count=1)

    with open('js/data.js', 'w', encoding='utf-8') as f:
        f.write(code)
    print("Updated HOTSPOTS_DATA in js/data.js with imageUrl and metadata.")

def update_open_modal_in_app_js():
    with open('js/app.js', 'r', encoding='utf-8') as f:
        code = f.read()

    # Replace Wikimedia fallback with 100% local guaranteed image
    target = """  const imgElem = document.getElementById('modal-image');
  imgElem.src = item.imageUrl;
  imgElem.onerror = () => {
    imgElem.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Tranh_Hoi_nghi_thanh_lap_Dang_Cong_san_Viet_Nam_1930.jpg/640px-Tranh_Hoi_nghi_thanh_lap_Dang_Cong_san_Viet_Nam_1930.jpg';
  };"""

    replacement = """  const imgElem = document.getElementById('modal-image');
  const safeImg = (item.imageUrl && item.imageUrl.trim() !== '') ? item.imageUrl : 'assets/images/p2_emblem.jpg';
  imgElem.src = safeImg;
  imgElem.onerror = () => {
    // Luôn dự phòng bằng tệp ảnh biểu trưng cục bộ có sẵn trên máy, tuyệt đối không gọi link ngoài
    imgElem.src = 'assets/images/p2_emblem.jpg';
  };"""

    if target in code:
        code = code.replace(target, replacement, 1)
        print("Updated modal-image fallback in js/app.js.")
    else:
        # Regex replacement if whitespace differs
        pat = re.compile(r'const imgElem = document\.getElementById\(\'modal-image\'\);\s*imgElem\.src = item\.imageUrl;\s*imgElem\.onerror = \(\) => \{[^}]+\};', re.DOTALL)
        if pat.search(code):
            code = pat.sub(replacement, code, count=1)
            print("Updated modal-image fallback in js/app.js via regex.")
        else:
            print("Warning: target modal-image block not found.")

    with open('js/app.js', 'w', encoding='utf-8') as f:
        f.write(code)

def update_content_json():
    with open('content.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    hotspot_images = {
        "p1_hotspot_a": "assets/images/p1_ex1.jpg",
        "p1_hotspot_b": "assets/images/p1_ex2.jpg",
        "p2_hotspot_a": "assets/images/p2_portrait_domuoi.jpg",
        "p2_hotspot_b": "assets/images/p2_emblem.jpg",
        "p3_hotspot_a": "assets/images/p3_portrait_vovankiet.jpg",
        "p3_hotspot_b": "assets/images/p3_ex3.jpg",
        "p4_hotspot_a": "assets/images/p4_ex2.jpg",
        "p4_hotspot_b": "assets/images/p4_ex3.jpg"
    }

    for room in data.get('rooms', []):
        for hs in room.get('hotspots', []):
            hid = hs.get('id')
            if hid in hotspot_images:
                hs['imageUrl'] = hotspot_images[hid]

    with open('content.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print("Updated content.json with imageUrl for all hotspots.")

if __name__ == '__main__':
    update_hotspots_in_data_js()
    update_open_modal_in_app_js()
    update_content_json()

