import re
import json

def update_data_js():
    with open('js/data.js', 'r', encoding='utf-8') as f:
        code = f.read()

    replacements = [
        ('label: "ĐIỂM BẤM A: SỐ LIỆU LẠM PHÁT"', 'label: "BẢNG SỐ LIỆU LẠM PHÁT (1986 - 1990)"'),
        ('period: "Phòng 1: Điểm tra cứu số liệu"', 'period: "Tra cứu số liệu lịch sử (1986 - 1990)"'),
        ('label: "ĐIỂM BẤM B: KHỦNG HOẢNG SEV"', 'label: "TƯ LIỆU: BIẾN ĐỘNG SEV & LIÊN XÔ"'),
        ('period: "Phòng 1: Điểm tra cứu quốc tế"', 'period: "Bối cảnh quốc tế & Địa chính trị"'),
        ('label: "ĐIỂM BẤM A: BẢNG NHÂN SỰ"', 'label: "CƠ CẤU NHÂN SỰ ĐẢNG KHÓA VII"'),
        ('period: "Phòng 2: Điểm tra cứu nhân sự"', 'period: "Nhân sự lãnh đạo Khóa VII"'),
        ('label: "ĐIỂM BẤM B: 6 ĐẶC TRƯNG XHCN"', 'label: "6 ĐẶC TRƯNG BẢN CHẤT CƯƠNG LĨNH 1991"'),
        ('period: "Phòng 2: Điểm tra cứu Cương lĩnh"', 'period: "Cương lĩnh lý luận nền tảng"'),
        ('label: "ĐIỂM BẤM A: THỂ CHẾ KINH TẾ"', 'label: "CHIẾN LƯỢC KINH TẾ ĐẾN NĂM 2000"'),
        ('period: "Phòng 3: Điểm tra cứu kinh tế"', 'period: "Thể chế kinh tế thị trường"'),
        ('label: "ĐIỂM BẤM B: THÁNG VÀNG NGOẠI GIAO"', 'label: "MỐC NGOẠI GIAO THÁNG 7/1995"'),
        ('period: "Phòng 3: Điểm tra cứu đối ngoại"', 'period: "Đột phá phá thế bao vây cô lập"'),
        ('label: "ĐIỂM BẤM A: THÀNH TỰU & HẠN CHẾ"', 'label: "TỔNG KẾT THÀNH TỰU & HẠN CHẾ (1991 - 1995)"'),
        ('period: "Phòng 4: Điểm đối chiếu tổng kết"', 'period: "Đánh giá khách quan nhiệm kỳ VII"'),
        ('label: "ĐIỂM BẤM B: CẦU NỐI ĐẠI HỘI VIII"', 'label: "TIỀN ĐỀ BƯỚC VÀO THỜI KỲ CNH, HĐH"'),
        ('period: "Phòng 4: Điểm mốc chuyển giao"', 'period: "Mắt xích lịch sử sang Đại hội VIII"'),
    ]

    for old_s, new_s in replacements:
        if old_s in code:
            code = code.replace(old_s, new_s)
        else:
            print(f"Warning in js/data.js: '{old_s}' not found directly, checking regex...")
            # Fallback regex
            pattern = re.escape(old_s)
            code = re.sub(pattern, new_s, code)

    # Clean comments
    code = code.replace("DANH SÁCH 8 ĐIỂM BẤM PHỤ (HOTSPOTS A & B)", "DANH SÁCH 8 KIOSK TRA CỨU TƯ LIỆU CHUYÊN ĐỀ")

    with open('js/data.js', 'w', encoding='utf-8') as f:
        f.write(code)
    print("Updated js/data.js successfully.")

def update_app_js():
    with open('js/app.js', 'r', encoding='utf-8') as f:
        code = f.read()

    code = code.replace("Điểm bấm A & B", "Kiosk tra cứu chuyên đề")
    code = code.replace("ĐIỂM BẤM A & B", "KIOSK TRA CỨU CHUYÊN ĐỀ")
    code = code.replace("ĐIỂM BẤM A", "TRA CỨU")
    code = code.replace("ĐIỂM BẤM B", "TƯ LIỆU")
    code = code.replace("tra cứu ${target.userData.label}", "tra cứu: ${target.userData.label}")
    code = code.replace("BẢNG TRA CỨU TƯ LIỆU: ${item.label}", "${item.label}")

    with open('js/app.js', 'w', encoding='utf-8') as f:
        f.write(code)
    print("Updated js/app.js successfully.")

def update_content_json():
    with open('content.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    label_map = {
        "p1_hotspot_a": "BẢNG SỐ LIỆU LẠM PHÁT (1986 - 1990)",
        "p1_hotspot_b": "TƯ LIỆU: BIẾN ĐỘNG SEV & LIÊN XÔ",
        "p2_hotspot_a": "CƠ CẤU NHÂN SỰ ĐẢNG KHÓA VII",
        "p2_hotspot_b": "6 ĐẶC TRƯNG BẢN CHẤT CƯƠNG LĨNH 1991",
        "p3_hotspot_a": "CHIẾN LƯỢC KINH TẾ ĐẾN NĂM 2000",
        "p3_hotspot_b": "MỐC NGOẠI GIAO THÁNG 7/1995",
        "p4_hotspot_a": "TỔNG KẾT THÀNH TỰU & HẠN CHẾ (1991 - 1995)",
        "p4_hotspot_b": "TIỀN ĐỀ BƯỚC VÀO THỜI KỲ CNH, HĐH"
    }

    for room in data.get('rooms', []):
        for hs in room.get('hotspots', []):
            hs_id = hs.get('id')
            if hs_id in label_map:
                hs['label'] = label_map[hs_id]

    with open('content.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print("Updated content.json successfully.")

def update_docs():
    with open('docs/MO_TA_CHI_TIET_PHONG_TRIEN_LAM.md', 'r', encoding='utf-8') as f:
        doc = f.read()

    doc = doc.replace("2 Điểm bấm phụ A & B (Kiosk console nghiêng 35° phát quang)", "2 Kiosk tra cứu chuyên đề (console nghiêng 35° phát quang)")
    doc = doc.replace("Điểm bấm phụ A & B:", "Kiosk tra cứu chuyên đề:")
    doc = doc.replace("Điểm A (Kiosk tra cứu Số liệu lạm phát", "Kiosk 1 (Số liệu Lạm phát và Cải cách")
    doc = doc.replace("Điểm B (Kiosk Khủng hoảng khối SEV & Liên Xô", "Kiosk 2 (Biến động khối SEV và Liên Xô")
    doc = doc.replace("Điểm A (Kiosk Cơ cấu Nhân sự lãnh đạo khóa VII", "Kiosk 1 (Cơ cấu Nhân sự Lãnh đạo Khóa VII")
    doc = doc.replace("Điểm B (Kiosk 6 Đặc trưng Bản chất CNXH theo Cương lĩnh 1991", "Kiosk 2 (6 Đặc trưng Bản chất CNXH Cương lĩnh 1991")
    doc = doc.replace("Điểm A (Kiosk Chiến lược KT-XH đến 2000", "Kiosk 1 (Chiến lược KT-XH đến năm 2000")
    doc = doc.replace("Điểm B (Kiosk Ngoại giao đa phương hóa, đa dạng hóa", "Kiosk 2 (Mốc Ngoại giao Đa phương hóa")
    doc = doc.replace("Điểm A (Kiosk Thể chế Kinh tế & Chiến lược đến 2000", "Kiosk 1 (Thể chế Kinh tế & Chiến lược đến 2000")
    doc = doc.replace("Điểm B (Kiosk Ngoại giao Đa phương hóa", "Kiosk 2 (Mốc Ngoại giao Đa phương hóa")
    doc = doc.replace("Điểm A (Kiosk Đánh giá Khách quan Thành tựu & Hạn chế", "Kiosk 1 (Đánh giá Khách quan Thành tựu & Hạn chế")
    doc = doc.replace("Điểm B (Kiosk Cầu nối lịch sử sang Đại hội VIII", "Kiosk 2 (Cầu nối Lịch sử sang Đại hội VIII")
    doc = doc.replace("Điểm B (Kiosk Cầu nối Lịch sử sang Đại hội VIII", "Kiosk 2 (Cầu nối Lịch sử sang Đại hội VIII")
    doc = doc.replace("| **Điểm bấm A** |", "| **Kiosk chuyên đề 1** |")
    doc = doc.replace("| **Điểm bấm B** |", "| **Kiosk chuyên đề 2** |")

    with open('docs/MO_TA_CHI_TIET_PHONG_TRIEN_LAM.md', 'w', encoding='utf-8') as f:
        f.write(doc)
    print("Updated docs/MO_TA_CHI_TIET_PHONG_TRIEN_LAM.md successfully.")

if __name__ == '__main__':
    update_data_js()
    update_app_js()
    update_content_json()
    update_docs()

