import json
import re

# Comprehensive metadata mapping for all exhibits in js/data.js
METADATA_MAP = {
    "p1_ex1": {
        "photoYear": "1986",
        "photoSource": "Bảo tàng Lịch sử Quốc gia / TTXVN",
        "docQuote": "Đất nước đang lâm vào khủng hoảng kinh tế - xã hội trầm trọng; lạm phát phi mã lên tới 774,7% năm 1986.",
        "docQuoteSource": "Văn kiện Đại hội VI & Báo cáo Đại hội VII"
    },
    "p1_ex2": {
        "photoYear": "1989 - 1991",
        "photoSource": "Tư liệu lưu trữ quốc tế / TTXVN",
        "docQuote": "Chế độ xã hội chủ nghĩa ở Đông Âu và Liên Xô lâm vào khủng hoảng toàn diện; khối SEV giải thể đặt nước ta trước thử thách sống còn.",
        "docQuoteSource": "Văn kiện Đại hội VII của Đảng, tr. 15"
    },
    "p1_ex3": {
        "photoYear": "1986",
        "photoSource": "Báo Nhân Dân / TTXVN",
        "docQuote": "Đảng nhìn thẳng vào sự thật, đánh giá đúng sự thật, nói rõ sự thật; quyết định đường lối Đổi mới toàn diện đất nước.",
        "docQuoteSource": "Văn kiện Đại hội VI của Đảng, tr. 25"
    },
    "p2_ex1": {
        "photoYear": "24 - 27/6/1991",
        "photoSource": "Báo điện tử Đảng Cộng sản Việt Nam (dangcongsan.vn)",
        "docQuote": "Đại hội của trí tuệ, đổi mới, dân chủ, kỷ cương và đoàn kết, hoạch định con đường đi lên chủ nghĩa xã hội.",
        "docQuoteSource": "Văn kiện Đại hội VII của Đảng, tr. 5"
    },
    "p2_ex2": {
        "photoYear": "1991",
        "photoSource": "Nhà xuất bản Sự thật / Viện Lịch sử Đảng",
        "docQuote": "Toàn Đảng, toàn dân ta quyết tâm xây dựng đất nước Việt Nam xã hội chủ nghĩa: do nhân dân lao động làm chủ, có nền kinh tế phát triển cao...",
        "docQuoteSource": "Cương lĩnh 1991, tr. 8"
    },
    "p2_ex3": {
        "photoYear": "1991",
        "photoSource": "Tạp chí Cộng sản / Ban Tuyên giáo Trung ương",
        "docQuote": "Đảng lấy chủ nghĩa Mác - Lênin và tư tưởng Hồ Chí Minh làm nền tảng tư tưởng, kim chỉ nam cho hành động.",
        "docQuoteSource": "Cương lĩnh 1991, tr. 21"
    },
    "p3_ex1": {
        "photoYear": "1994",
        "photoSource": "Tập đoàn Điện lực Việt Nam (EVN) / TTXVN",
        "docQuote": "Phát triển nền kinh tế hàng hóa nhiều thành phần vận hành theo cơ chế thị trường có sự quản lý của Nhà nước theo định hướng XHCN.",
        "docQuoteSource": "Chiến lược ổn định và phát triển KT - XH đến năm 2000, tr. 58"
    },
    "p3_ex2": {
        "photoYear": "1991",
        "photoSource": "Bộ Ngoại giao / Báo Nhân Dân",
        "docQuote": "Việt Nam muốn là bạn với tất cả các nước trong cộng đồng thế giới, phấn đấu vì hòa bình, độc lập và phát triển.",
        "docQuoteSource": "Văn kiện Đại hội VII của Đảng, tr. 119"
    },
    "p3_ex3": {
        "photoYear": "Tháng 7/1995",
        "photoSource": "Thông tấn xã Việt Nam / Báo Quốc tế",
        "docQuote": "Phá vỡ hoàn toàn thế bao vây cô lập, tạo môi trường quốc tế hòa bình, thuận lợi cho công cuộc đổi mới và phát triển đất nước.",
        "docQuoteSource": "Nghị quyết Trung ương Đảng khóa VII"
    },
    "p4_ex1": {
        "photoYear": "1995",
        "photoSource": "Báo ảnh Việt Nam / TTXVN",
        "docQuote": "Nước ta đã vượt qua thời kỳ suy thoái kinh tế, đạt tốc độ tăng trưởng GDP bình quân 8,2% mỗi năm trong suốt nhiệm kỳ 1991 - 1995.",
        "docQuoteSource": "Báo cáo chính trị Đại hội VIII của Đảng, tr. 12"
    },
    "p4_ex2": {
        "photoYear": "27/5/1994",
        "photoSource": "Tập đoàn Điện lực Việt Nam (EVN) / Báo Tiền Phong",
        "docQuote": "Đường dây 500kV Bắc - Nam là kỳ tích về ý chí, lòng dũng cảm và trí tuệ sáng tạo của giai cấp công nhân và đội ngũ trí thức Việt Nam.",
        "docQuoteSource": "Diễn văn Thủ tướng Võ Văn Kiệt tại lễ đóng điện"
    },
    "p4_ex3": {
        "photoYear": "1996",
        "photoSource": "Báo Nhân Dân / TTXVN",
        "docQuote": "Nhiệm vụ chuẩn bị tiền đề cho công nghiệp hóa đã cơ bản hoàn thành; đất nước chuyển sang thời kỳ đẩy mạnh công nghiệp hóa, hiện đại hóa.",
        "docQuoteSource": "Văn kiện Đại hội VIII của Đảng, tr. 68"
    }
}

def update_data_js():
    with open('js/data.js', 'r', encoding='utf-8') as f:
        code = f.read()

    for item_id, meta in METADATA_MAP.items():
        pattern = rf'(id:\s*"{item_id}",\s*room:\s*"[^"]+",)'
        replacement = rf'\1\n    photoYear: "{meta["photoYear"]}",\n    photoSource: "{meta["photoSource"]}",\n    docQuote: "{meta["docQuote"]}",\n    docQuoteSource: "{meta["docQuoteSource"]}",'
        if f'photoYear: "{meta["photoYear"]}"' not in code:
            code = re.sub(pattern, replacement, code, count=1)

    with open('js/data.js', 'w', encoding='utf-8') as f:
        f.write(code)
    print("Updated js/data.js with archival photo metadata and quotes.")

def update_content_json():
    with open('content.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    data['archivalCollection'] = [
        {
            "id": k,
            "photoYear": v["photoYear"],
            "photoSource": v["photoSource"],
            "docQuote": v["docQuote"],
            "docQuoteSource": v["docQuoteSource"]
        } for k, v in METADATA_MAP.items()
    ]

    with open('content.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print("Updated content.json with archivalCollection.")

if __name__ == '__main__':
    update_data_js()
    update_content_json()

