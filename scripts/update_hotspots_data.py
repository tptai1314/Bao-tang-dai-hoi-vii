import re

# Read data.js
with open('js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's inspect HOTSPOTS_DATA block
hotspots_def = """// 3. DANH SÁCH 8 KIOSK TRA CỨU TƯ LIỆU CHUYÊN ĐỀ TẠI 4 PHÒNG
const HOTSPOTS_DATA = [
  // PHÒNG 1
  {
    id: "p1_hotspot_a",
    room: "room1",
    imageUrl: "assets/images/p1_a_lam_phat.webp",
    photoYear: "1986 - 1990",
    photoSource: "Niên giám Thống kê 1986 - 1995; Báo Lao Động",
    docQuote: "Đất nước lâm vào khủng hoảng kinh tế - xã hội trầm trọng; lạm phát phi mã ba con số đe dọa đời sống nhân dân.",
    docQuoteSource: "Văn kiện Đại hội VI & Báo cáo Đại hội VII",
    position: { x: -2.2, y: 0.9, z: 1.5 },
    label: "BẢNG SỐ LIỆU LẠM PHÁT (1986 - 1990)",
    title: "Diễn biến Lạm phát phi mã và Cải cách Giá - Lương - Tiền (1986 - 1990)",
    period: "Tra cứu số liệu lịch sử (1986 - 1990)",
    fullDesc: "Giai đoạn 1986 - 1990 chứng kiến sự khủng hoảng trầm trọng của hệ thống tài chính - tiền tệ: Lạm phát năm 1986 là 774,7%, năm 1987 là 223,1%, năm 1988 là 393,8%, năm 1989 là 34,7% và năm 1990 tăng trở lại 67,4%. Thu ngân sách không đủ chi, bội chi ngân sách phải bù đắp bằng phát hành tiền. Đại hội VII đặt ra yêu cầu sống còn là phải triệt để kiềm chế lạm phát bằng công cụ thị trường và chính sách lãi suất thực dương.",
    analysisCompare: "Việc chuyển từ cơ chế phân phối tem phiếu sang cơ chế tiền tệ hóa và mở rộng tự do lưu thông hàng hóa là chìa khóa then chốt giúp bình ổn thị trường.",
    sourceCitation: "Niên giám Thống kê 1986 - 1995, Tổng cục Thống kê; Giáo trình Lịch sử Đảng Cộng sản Việt Nam, 2021, tr. 282.",
    funFact: "Tháng 3/1989, Việt Nam bắt đầu áp dụng chính sách 'Lãi suất tiền gửi thực dương' (lãi suất tiền gửi ngân hàng cao hơn tỷ lệ lạm phát), lập tức thu hút lượng tiền mặt khổng lồ trong dân vào ngân hàng, hạ nhiệt cơn sốt giá hàng hóa."
  },
  {
    id: "p1_hotspot_b",
    room: "room1",
    imageUrl: "assets/images/p1_b_tuong_berlin.webp",
    photoYear: "1989 - 1991",
    photoSource: "Tư liệu quốc tế / TTXVN",
    docQuote: "Sự sụp đổ của các nước XHCN ở Đông Âu và khủng hoảng tại Liên Xô đặt ra thách thức sống còn đối với sự nghiệp xây dựng CNXH.",
    docQuoteSource: "Văn kiện Đại hội VII, tr. 15-20",
    position: { x: 2.2, y: 0.9, z: 1.5 },
    label: "TƯ LIỆU: BIẾN ĐỘNG SEV & LIÊN XÔ",
    title: "Hội đồng Tương trợ Kinh tế (SEV) giải thể & Liên Xô khủng hoảng",
    period: "Bối cảnh quốc tế & Địa chính trị",
    fullDesc: "Khối SEV thành lập năm 1949 từng là bạn hàng và nguồn viện trợ lớn nhất của Việt Nam (chiếm hơn 80% kim ngạch xuất nhập khẩu). Tháng 6/1991, SEV chính thức giải thể tại Budapest (Hungary). Đến tháng 12/1991, Liên bang Xô Viết tan rã. Việt Nam đột ngột mất đi nguồn viện trợ và thị trường truyền thống, buộc phải tự lực cánh sinh và tìm kiếm thị trường mới trên toàn cầu.",
    analysisCompare: "Bản lĩnh của Đảng ta tại Đại hội VII là kiên định mục tiêu độc lập dân tộc gắn liền với CNXH, không hoang mang dao động trước cơn địa chấn toàn cầu.",
    sourceCitation: "Văn kiện Đại hội VII, tr. 15-20.",
    funFact: "Ngay sau khi SEV giải thể, Việt Nam đã nhanh chóng chuyển hướng xuất khẩu nông sản, dầu thô và dệt may sang các thị trường mới như Nhật Bản, Singapore, Hàn Quốc và Tây Âu."
  },

  // PHÒNG 2
  {
    id: "p2_hotspot_a",
    room: "room2",
    imageUrl: "assets/images/p2_a_tong_bi_thu.jpg",
    photoYear: "1991",
    photoSource: "Thông tấn xã Việt Nam / dangcongsan.vn",
    docQuote: "Kiên định con đường xã hội chủ nghĩa, phát huy dân chủ, giữ vững kỷ cương và tăng cường đoàn kết toàn dân tộc.",
    docQuoteSource: "Phát biểu bế mạc Đại hội VII của Tổng Bí thư Đỗ Mười",
    position: { x: 27.8, y: 0.9, z: 1.5 },
    label: "CƠ CẤU NHÂN SỰ ĐẢNG KHÓA VII",
    title: "Cơ cấu Nhân sự Lãnh đạo Khóa VII của Đảng (1991 - 1996)",
    period: "Nhân sự lãnh đạo Khóa VII",
    fullDesc: "Đại hội VII đã bầu Ban Chấp hành Trung ương gồm 146 đồng chí tiêu biểu. Hội nghị lần thứ nhất BCH Trung ương khóa VII đã bầu Bộ Chính trị gồm 13 đồng chí: Đỗ Mười, Lê Đức Anh, Võ Văn Kiệt, Đào Duy Tùng, Đoàn Khuê, Vũ Oanh, Lê Phước Thọ, Phan Văn Khải, Bùi Thiện Ngộ, Nông Đức Mạnh, Phạm Thế Duyệt, Nguyễn Đức Bình, Võ Trần Chí. Đồng chí Đỗ Mười được bầu làm Tổng Bí thư; Cử các đồng chí Nguyễn Văn Linh, Phạm Văn Đồng, Võ Chí Công làm Cố vấn Ban Chấp hành Trung ương.",
    analysisCompare: "Cơ cấu lãnh đạo khóa VII kết hợp chặt chẽ giữa các nhà lãnh đạo kiên định về lý luận và các nhà tổ chức điều hành thực tiễn xuất sắc (như Võ Văn Kiệt, Phan Văn Khải), tạo nên sức mạnh tập thể vững vàng chèo lái đất nước.",
    sourceCitation: "Văn kiện Đại hội đại biểu toàn quốc lần thứ VII của Đảng, NXB Sự thật, 1991, tr. 145-148.",
    funFact: "Tổng Bí thư Đỗ Mười và Chủ tịch Hội đồng Bộ trưởng Võ Văn Kiệt đã tạo thành 'cặp bài trùng' lãnh đạo ăn ý bậc nhất, vừa kiên định nguyên tắc XHCN vừa quyết liệt đổi mới kinh tế thị trường."
  },
  {
    id: "p2_hotspot_b",
    room: "room2",
    imageUrl: "assets/images/p2_b_co_dang.webp",
    photoYear: "1991",
    photoSource: "Bảo tàng Lịch sử Quốc gia",
    docQuote: "Khẩu hiệu hành động: Đổi mới, Ổn định và Phát triển - Giữ vững định hướng xã hội chủ nghĩa.",
    docQuoteSource: "Văn kiện Đại hội VII của Đảng",
    position: { x: 32.2, y: 0.9, z: 1.5 },
    label: "6 ĐẶC TRƯNG BẢN CHẤT CƯƠNG LĨNH 1991",
    title: "Sáu Đặc trưng Bản chất của Xã hội XHCN theo Cương lĩnh 1991",
    period: "Cương lĩnh lý luận nền tảng",
    fullDesc: "Cương lĩnh 1991 lần đầu tiên đúc kết 6 đặc trưng bản chất của CNXH ở Việt Nam:\\n1. Do nhân dân lao động làm chủ.\\n2. Có một nền kinh tế phát triển cao dựa trên lực lượng sản xuất hiện đại và chế độ công hữu về các tư liệu sản xuất chủ yếu.\\n3. Có nền văn hóa tiên tiến, đậm đà bản sắc dân tộc.\\n4. Con người được giải phóng khỏi áp bức, bóc lột, bất công, làm theo năng lực, hưởng theo lao động, có cuộc sống ấm no, tự do, hạnh phúc.\\n5. Các dân tộc trong nước bình đẳng, đoàn kết và giúp đỡ lẫn nhau cùng tiến bộ.\\n6. Có quan hệ hữu nghị và hợp tác với nhân dân tất cả các nước trên thế giới.",
    analysisCompare: "6 đặc trưng này đã khắc phục hoàn toàn mô hình giáo điều thời bao cấp, đặt con người và nhân dân lao động vào vị trí trung tâm của sự nghiệp phát triển.",
    sourceCitation: "Cương lĩnh xây dựng đất nước trong thời kỳ quá độ lên CNXH (1991), tr. 9-14.",
    funFact: "6 đặc trưng năm 1991 sau 20 năm thực tiễn Đổi mới đã được Đại hội XI (2011) bổ sung, phát triển thành 8 đặc trưng hoàn thiện của xã hội XHCN Việt Nam ngày nay."
  },

  // PHÒNG 3
  {
    id: "p3_hotspot_a",
    room: "room3",
    imageUrl: "assets/images/p3_a_co_to_quoc.webp",
    photoYear: "1991 - 1997",
    photoSource: "Văn kiện Đại hội VII / Nhà xuất bản Sự thật",
    docQuote: "Phải đổi mới quyết liệt, dám nghĩ, dám làm, lấy hiệu quả phục vụ nhân dân và sự hưng thịnh của đất nước làm thước đo.",
    docQuoteSource: "Tài liệu lưu trữ Chính phủ",
    position: { x: 57.8, y: 0.9, z: 1.5 },
    label: "CHIẾN LƯỢC KINH TẾ ĐẾN NĂM 2000",
    title: "Nền kinh tế hàng hóa nhiều thành phần & Mục tiêu tăng gấp đôi GDP",
    period: "Thể chế kinh tế thị trường",
    fullDesc: "Đại hội VII xác định rõ: Nền kinh tế nước ta có nhiều thành phần (kinh tế quốc doanh, tập thể, cá thể, tư bản tư nhân, tư bản nhà nước), trong đó kinh tế quốc doanh giữ vai trò chủ đạo. Các thành phần kinh tế đều bình đẳng trước pháp luật, cùng phát triển lâu dài, hợp tác và cạnh tranh lành mạnh. Mục tiêu chiến lược phấn đấu đến năm 2000 GDP tăng gấp đôi so với năm 1990 đã đạt được xuất sắc trên thực tế.",
    analysisCompare: "Đây là bước chuyển biến căn bản về nhận thức lý luận: Thừa nhận kinh tế thị trường không phải là sản phẩm riêng của CNTB mà là thành tựu chung của văn minh nhân loại.",
    sourceCitation: "Chiến lược ổn định và phát triển kinh tế - xã hội đến năm 2000, NXB Sự thật, 1991.",
    funFact: "Năm 2000, GDP của Việt Nam đạt mức tăng trưởng 207% so với năm 1990, hoàn thành vượt mức mục tiêu do Đại hội VII đề ra."
  },
  {
    id: "p3_hotspot_b",
    room: "room3",
    imageUrl: "assets/images/extra_asean_30nam.jpg",
    photoYear: "28/7/1995",
    photoSource: "Bộ Ngoại giao / ASEAN Secretariat",
    docQuote: "Việt Nam muốn là bạn với tất cả các nước trong cộng đồng thế giới, phấn đấu vì hòa bình, độc lập và phát triển.",
    docQuoteSource: "Tuyên ngôn Đại hội VII của Đảng",
    position: { x: 62.2, y: 0.9, z: 1.5 },
    label: "MỐC NGOẠI GIAO THÁNG 7/1995",
    title: "Tháng 7/1995: Mốc son Chói lọi của Ngoại giao Việt Nam",
    period: "Đột phá phá thế bao vây cô lập",
    fullDesc: "Chỉ trong vòng chưa đầy 3 tuần của tháng 7/1995, ngoại giao Việt Nam lập nên 3 kỳ tích lịch sử liên tiếp:\\n- Ngày 11/7/1995: Tổng thống Bill Clinton và Thủ tướng Võ Văn Kiệt tuyên bố bình thường hóa quan hệ ngoại giao Việt Nam - Hoa Kỳ.\\n- Ngày 17/7/1995: Ký Hiệp định khung hợp tác toàn diện Việt Nam - EU tại Brussels.\\n- Ngày 28/7/1995: Bộ trưởng Ngoại giao Nguyễn Mạnh Cầm tham dự Lễ thượng cờ Việt Nam, chính thức gia nhập ASEAN tại Bandar Seri Begawan (Brunei).",
    analysisCompare: "Thắng lợi ngoại giao tháng 7/1995 đã giải tỏa hoàn toàn thế bao vây cô lập, tạo ra cục diện bang giao toàn cầu thuận lợi chưa từng có cho đất nước.",
    sourceCitation: "75 năm Ngoại giao Việt Nam (1945-2020), Bộ Ngoại giao; Giáo trình Lịch sử Đảng, 2021, tr. 308-311.",
    funFact: "Bộ trưởng Ngoại giao Nguyễn Mạnh Cầm từng chia sẻ: 'Tháng 7/1995 là những ngày bay không nghỉ giữa Washington, Brussels và Brunei, chứng kiến lá cờ đỏ sao vàng tung bay cùng các cường quốc'."
  },

  // PHÒNG 4
  {
    id: "p4_hotspot_a",
    room: "room4",
    imageUrl: "assets/images/p4_a_tem_phieu.jpg",
    photoYear: "1991 - 1995",
    photoSource: "Báo cáo Chính trị Đại hội VIII; Bảo tàng Lịch sử",
    docQuote: "Nước ta đã thoát khỏi thời kỳ suy thoái kinh tế trầm trọng; lạm phát từ 67,1% (1991) giảm về 12,7% (1995).",
    docQuoteSource: "Báo cáo Đại hội VIII của Đảng",
    position: { x: 87.8, y: 0.9, z: 1.5 },
    label: "TỔNG KẾT THÀNH TỰU & HẠN CHẾ (1991 - 1995)",
    title: "Đánh giá Khách quan Thành tựu và Những Hạn chế còn tồn tại",
    period: "Đánh giá khách quan nhiệm kỳ VII",
    fullDesc: "Thành tựu rực rỡ: GDP tăng bình quân 8,2%/năm, công nghiệp tăng 13,3%/năm; lạm phát giảm từ 67,1% (1991) xuống 12,7% (1995); an ninh lương thực vững chắc; giữ vững ổn định chính trị.\\n\\nHạn chế và Khuyết điểm còn tồn tại:\\n- Nền kinh tế còn nhiều yếu kém, năng suất lao động và hiệu quả thấp.\\n- Doanh nghiệp nhà nước chậm đổi mới, tài chính ngân sách chưa thật vững chắc.\\n- Đời sống một bộ phận nhân dân (nhất là vùng sâu, vùng xa) còn nhiều khó khăn, phân hóa giàu nghèo bắt đầu xuất hiện.\\n- Tệ nạn tham nhũng, lãng phí, buôn lậu và quan liêu diễn biến phức tạp.",
    analysisCompare: "Thái độ tự phê bình nghiêm túc, chỉ rõ cả thành tựu lẫn hạn chế thể hiện phong cách khoa học, khách quan và bản lĩnh của Đảng ta.",
    sourceCitation: "Báo cáo Chính trị tại Đại hội đại biểu toàn quốc lần thứ VIII của Đảng (1996), tr. 25-32.",
    funFact: "Hội nghị giữa nhiệm kỳ khóa VII (tháng 1/1994) đã sớm chỉ ra 'Bốn nguy cơ' thách thức cách mạng Việt Nam, trong đó có nguy cơ tụt hậu xa hơn về kinh tế và nguy cơ tham nhũng."
  },
  {
    id: "p4_hotspot_b",
    room: "room4",
    imageUrl: "assets/images/extra_mau_dich_2.webp",
    photoYear: "1991 - 1996",
    photoSource: "Tư liệu ảnh thời bao cấp và mậu dịch quốc doanh",
    docQuote: "Nhiệm vụ chuẩn bị tiền đề cho công nghiệp hóa đã cơ bản hoàn thành; đất nước chuyển sang thời kỳ đẩy mạnh công nghiệp hóa, hiện đại hóa.",
    docQuoteSource: "Văn kiện Đại hội VIII của Đảng",
    position: { x: 92.2, y: 0.9, z: 1.5 },
    label: "TIỀN ĐỀ BƯỚC VÀO THỜI KỲ CNH, HĐH",
    title: "Tiền đề Lịch sử Đưa Đất nước Sang Thời kỳ Đẩy mạnh CNH, HĐH",
    period: "Mắt xích lịch sử sang Đại hội VIII",
    fullDesc: "Thành tựu toàn diện của nhiệm kỳ Đại hội VII đã tạo ra thế và lực mới chưa từng có: Nước ta đã bước ra khỏi thời kỳ suy thoái kinh tế trầm trọng kéo dài. Đại hội VIII (1996) tự tin tuyên bố: Đất nước chuyển sang thời kỳ phát triển mới - Đẩy mạnh công nghiệp hóa, hiện đại hóa, phấn đấu vì mục tiêu 'Dân giàu, nước mạnh, xã hội công bằng, văn minh'.",
    analysisCompare: "Nếu không có bản lĩnh kiên định và những bước đi vững chắc của Đại hội VII trong bối cảnh Liên Xô sụp đổ, nước ta khó có thể tạo ra thế và lực để bứt phá mạnh mẽ trong giai đoạn công nghiệp hóa sau này.",
    sourceCitation: "Giáo trình Lịch sử Đảng Cộng sản Việt Nam, 2021, tr. 317-318.",
    funFact: "Đường dây 500kV Bắc - Nam đóng điện ngày 27/5/1994 được coi là biểu tượng rực rỡ nhất cho năng lực trí tuệ và tiền đề công nghiệp hóa xuất phát từ nhiệm kỳ Đại hội VII."
  }
];"""

# Replace in text
pattern = r'// 3\. DANH SÁCH 8 KIOSK TRA CỨU TƯ LIỆU CHUYÊN ĐỀ TẠI 4 PHÒNG[\s\S]*?const HOTSPOTS_DATA = \[[\s\S]*?\n\];'
text = re.sub(pattern, hotspots_def, text)

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("HOTSPOTS_DATA in data.js updated successfully!")

