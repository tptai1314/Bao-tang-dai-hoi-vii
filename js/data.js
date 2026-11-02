// ==========================================================================
// DỮ LIỆU BẢO TÀNG ẢO ĐẠI HỘI ĐẠI BIỂU TOÀN QUỐC LẦN THỨ VII CỦA ĐẢNG (1991)
// Bố trí 4 phòng chính + 1 phòng Quiz trắc nghiệm vinh danh
// ==========================================================================

// 1. CHỦ ĐỀ & THÔNG ĐIỆP BẢNG TREO TƯỜNG (LAYER 2)
const ROOM_THEMES = {
  room1: {
    roomKey: "room1",
    name: "Phòng 1: Bối cảnh lịch sử",
    order: 1,
    title: "BỐI CẢNH LỊCH SỬ (1986 - 1990)",
    sub: "KHỦNG HOẢNG KINH TẾ - XÃ HỘI & BIẾN ĐỘNG DỮ DỘI Ở LIÊN XÔ, ĐÔNG ÂU",
    audioIntro: "Chào mừng quý khách đến với Phòng 1. Sau 5 năm khởi xướng Đổi mới từ Đại hội 6 năm 1986, đất nước ta vẫn đứng trước muôn vàn thử thách hiểm nghèo: lạm phát phi mã 3 con số lên tới 774,7%, đời sống nhân dân vô cùng khó khăn. Cùng lúc đó, hệ thống xã hội chủ nghĩa ở Đông Âu sụp đổ, Liên Xô khủng hoảng trầm trọng, khối SEV giải thể. Bối cảnh sống còn ấy đòi hỏi Đảng phải triệu tập Đại hội VII để kiên định mục tiêu độc lập dân tộc gắn liền với chủ nghĩa xã hội và vạch ra chiến lược ổn định, phát triển đất nước."
  },
  room2: {
    roomKey: "room2",
    name: "Phòng 2: Nội dung Đại hội VII & Cương lĩnh 1991",
    order: 2,
    title: "ĐẠI HỘI VII, 24 - 27/6/1991",
    sub: "ĐỔI MỚI, ỔN ĐỊNH VÀ PHÁT TRIỂN - HỘI TRƯỜNG BA ĐÌNH, HÀ NỘI",
    audioIntro: "Quý khách đang đứng tại Phòng 2. Đại hội lần thứ VII của Đảng họp từ ngày 24 đến 27 tháng 6 năm 1991 tại Hội trường Ba Đình, Hà Nội với 1.176 đại biểu tham dự. Đại hội đã bầu đồng chí Đỗ Mười làm Tổng Bí thư và thông qua bản Cương lĩnh xây dựng đất nước trong thời kỳ quá độ lên chủ nghĩa xã hội. Đây là mốc son đặc biệt khi lần đầu tiên Đảng ta chính thức khẳng định: Đảng lấy chủ nghĩa Mác - Lênin và tư tưởng Hồ Chí Minh làm nền tảng tư tưởng, kim chỉ nam cho hành động."
  },
  room3: {
    roomKey: "room3",
    name: "Phòng 3: Chiến lược & Đối ngoại",
    order: 3,
    title: "CHIẾN LƯỢC KINH TẾ ĐẾN NĂM 2000 & ĐỐI NGOẠI",
    sub: "\"VIỆT NAM MUỐN LÀ BẠN VỚI TẤT CẢ CÁC NƯỚC TRONG CỘNG ĐỒNG THẾ GIỚI\"",
    audioIntro: "Tại Phòng 3, quý khách được tìm hiểu hai quyết sách mang tầm thời đại của Đại hội VII: Chiến lược kinh tế - xã hội đến năm 2000 xác lập nền kinh tế hàng hóa nhiều thành phần vận hành theo cơ chế thị trường có sự quản lý của Nhà nước; và bước ngoặt đối ngoại với tuyên ngôn: 'Việt Nam muốn là bạn với tất cả các nước trong cộng đồng thế giới'. Quyết sách này đã giúp đất nước phá vỡ hoàn toàn thế bao vây cấm vận, mở ra kỷ nguyên hội nhập kinh tế quốc tế sâu rộng."
  },
  room4: {
    roomKey: "room4",
    name: "Phòng 4: Kết quả & Ý nghĩa lịch sử",
    order: 4,
    title: "KẾT QUẢ VÀ Ý NGHĨA LỊCH SỬ CỦA ĐẠI HỘI VII",
    sub: "BƯỚC ĐẦU RA KHỎI KHỦNG HOẢNG - TIỀN ĐỀ ĐẨY MẠNH CÔNG NGHIỆP HÓA, HIỆN ĐẠI HÓA",
    audioIntro: "Phòng 4 tổng kết thành tựu vượt bậc của nhiệm kỳ Đại hội 7: GDP tăng trưởng bình quân 8,2% mỗi năm, lạm phát kiềm chế ở mức một con số, an ninh lương thực bảo đảm vững chắc, đất nước giữ vững ổn định chính trị trong giông bão. Những kết quả vĩ đại này đã chuẩn bị thế và lực vững chắc để Đại hội 8 năm 1996 chuyển sang thời kỳ đẩy mạnh công nghiệp hóa, hiện đại hóa."
  }
};

// 2. DANH MỤC 12 HIỆN VẬT / TRANH ẢNH TƯ LIỆU THỰC TẾ TRONG 4 PHÒNG
// Mỗi phòng gồm 3 tranh: 2 tranh tường sau hai bên bảng chủ đề + 1 tranh tường trước
const EXHIBITS_DATA = [
  // ==========================================
  // PHÒNG 1: BỐI CẢNH LỊCH SỬ (Tâm: x = 0, z = 0)
  // ==========================================
  {
    id: "p1_ex1",
    room: "room1",
    photoYear: "1986",
    photoSource: "Bảo tàng Lịch sử Quốc gia / TTXVN",
    docQuote: "Đất nước đang lâm vào khủng hoảng kinh tế - xã hội trầm trọng; lạm phát phi mã lên tới 774,7% năm 1986.",
    docQuoteSource: "Văn kiện Đại hội VI & Báo cáo Đại hội VII",
    period: "Phòng 1: Tường sau bên trái",
    title: "Khủng hoảng kinh tế - xã hội và lạm phát phi mã (1986 - 1990)",
    shortDesc: "Sau 5 năm khởi xướng Đổi mới, nền kinh tế vẫn còn ngổn ngang với lạm phát 3 con số.",
    fullDesc: "Sau Đại hội VI (1986), công cuộc Đổi mới đạt được một số kết quả ban đầu, đặc biệt là việc triển khai Nghị quyết 10 của Bộ Chính trị (tháng 4/1988) về khoán hộ trong nông nghiệp giúp bước đầu giải quyết nạn thiếu đói. Tuy nhiên, đất nước vẫn chưa thoát khỏi khủng hoảng kinh tế - xã hội trầm trọng. Lạm phát năm 1986 ở mức phi mã 774,7%, năm 1988 là 393,8%, năm 1990 vẫn ở mức 67,4% và năm 1991 là 67,1%. Nền tài chính - tiền tệ khủng hoảng nghiêm trọng, đồng tiền mất giá hàng ngày, đời sống công nhân, viên chức, lực lượng vũ trang và nhân dân lao động vô cùng khó khăn.",
    analysisCompare: "Khác với Đại hội VI (1986) mới ở bước đầu 'nhìn thẳng vào sự thật, đánh giá đúng sự thật' để phá vỡ cơ chế tập trung quan liêu bao cấp, bối cảnh Đại hội VII (1991) đòi hỏi phải có bước đi căn cơ, khoa học và quyết liệt hơn: Không chỉ giải quyết tình thế mà phải hoạch định một Chiến lược dài hạn để chặn đứng lạm phát và tái cấu trúc nền kinh tế theo cơ chế thị trường có sự quản lý của Nhà nước.",
    sourceCitation: "Văn kiện Đảng toàn tập, Tập 51, NXB Chính trị quốc gia, 2007; Giáo trình Lịch sử Đảng Cộng sản Việt Nam, NXB Chính trị quốc gia Sự thật, 2021, tr. 280-286.",
    funFact: "Thời kỳ 1986 - 1988, người ta thường nói 'tiền chở bằng bao tải, mua mớ rau cũng tính bằng cọc tiền' do lạm phát phi mã làm đồng tiền mất giá kỷ lục từng ngày trước khi chính sách lãi suất thực dương được áp dụng.",
    interactiveType: "comparison",
    interactiveData: {
      label: "Chỉ số lạm phát",
      before: "Năm 1986: 774.7% (Đỉnh điểm khủng hoảng)",
      after: "Sau Đại hội VII (1993): giảm xuống còn 5.2%"
    },
    imageUrl: "assets/images/p1_a_lam_phat.webp",
    position: { x: -2.8, y: 1.9, z: -3.85 },
    rotation: [0, 0, 0]
  },
  {
    id: "p1_ex2",
    room: "room1",
    photoYear: "1989 - 1991",
    photoSource: "Tư liệu lưu trữ quốc tế / TTXVN",
    docQuote: "Chế độ xã hội chủ nghĩa ở Đông Âu và Liên Xô lâm vào khủng hoảng toàn diện; khối SEV giải thể đặt nước ta trước thử thách sống còn.",
    docQuoteSource: "Văn kiện Đại hội VII của Đảng, tr. 15",
    period: "Phòng 1: Tường sau bên phải",
    title: "Biến động dữ dội ở Liên Xô và Đông Âu (1989 - 1991)",
    shortDesc: "Hệ thống XHCN thế giới lâm vào thoái trào, thách thức sống còn đối với cách mạng Việt Nam.",
    fullDesc: "Từ cuối năm 1989, chế độ xã hội chủ nghĩa ở các nước Đông Âu lần lượt sụp đổ. Đến giữa năm 1991, Liên bang Xô Viết lún sâu vào khủng hoảng toàn diện không thể đảo ngược (chính thức tan rã ngày 25/12/1991). Khối SEV giải thể vào tháng 6/1991. Nước ta mất đi chỗ dựa chiến lược và nguồn viện trợ kinh tế, quân sự khổng lồ (bị cắt giảm hơn 80% chỉ trong thời gian ngắn), thị trường truyền thống bị thu hẹp đột ngột, đặt sự nghiệp xây dựng chủ nghĩa xã hội ở Việt Nam trước thử thách hiểm nghèo chưa từng có trong lịch sử.",
    analysisCompare: "Đảng ta nhận định sâu sắc: Sự sụp đổ của Liên Xô và Đông Âu là sự sụp đổ của một 'mô hình chủ nghĩa xã hội giáo điều, xơ cứng, quan liêu bao cấp', chứ không phải sự phá sản của lý tưởng khoa học Mác-Lênin. Bản lĩnh của Đảng tại Đại hội VII thể hiện ở chỗ: không hoang mang dao động, bình tĩnh phân tích nguyên nhân và kiên định ngọn cờ độc lập dân tộc gắn liền với CNXH.",
    sourceCitation: "Văn kiện Đại hội đại biểu toàn quốc lần thứ VII của Đảng, NXB Sự thật, Hà Nội, 1991, tr. 12-25; Giáo trình Lịch sử Đảng Cộng sản Việt Nam, 2021, tr. 283.",
    funFact: "Đại hội VII diễn ra đúng vào thời điểm Hội đồng Tương trợ Kinh tế (SEV) chính thức họp phiên giải thể tại Budapest (Hungary) ngày 28/6/1991, minh chứng cho tính chất 'nước sôi lửa bỏng' của thời cuộc.",
    imageUrl: "assets/images/p1_b_tuong_berlin.webp",
    position: { x: 2.8, y: 1.9, z: -3.85 },
    rotation: [0, 0, 0]
  },
  {
    id: "p1_ex3",
    room: "room1",
    photoYear: "Tháng 12/1986",
    photoSource: "Văn kiện và tư liệu Đại hội VI / TTXVN",
    docQuote: "Đại hội VII được triệu tập với sứ mệnh hoạch định cương lĩnh dẫn đường trong giông bão.",
    docQuoteSource: "Giáo trình Lịch sử Đảng Cộng sản Việt Nam",
    period: "Phòng 1: Tường trước đối diện",
    title: "Yêu cầu lịch sử: Kiên định con đường xã hội chủ nghĩa",
    shortDesc: "Đại hội VII được triệu tập với sứ mệnh hoạch định cương lĩnh dẫn đường trong giông bão.",
    fullDesc: "Trước sự bao vây cấm vận ngặt nghèo của đế quốc và sự tấn công tư tưởng của các thế lực thù địch nhằm 'diễn biến hòa bình', nội bộ nhân dân và cán bộ xuất hiện những băn khoăn về con đường đi lên CNXH. Đại hội VII được triệu tập với sứ mệnh lịch sử: Tổng kết 5 năm Đổi mới (1986-1991), giữ vững ổn định chính trị, thông qua Cương lĩnh dài hạn để định hình rõ mô hình xã hội XHCN ở Việt Nam và chiến lược kinh tế - xã hội đưa đất nước thoát khỏi hiểm cảnh.",
    analysisCompare: "Sự chuẩn bị cho Đại hội VII là đợt sinh hoạt chính trị sâu rộng bậc nhất trong lịch sử: Dự thảo Cương lĩnh và Chiến lược được công bố công khai trên toàn quốc, thu hút hàng triệu ý kiến đóng góp tâm huyết của đồng bào trong nước và kiều bào nước ngoài, tạo nên sự đồng thuận dân tộc to lớn trước ngày khai mạc.",
    sourceCitation: "Văn kiện Đảng toàn tập, Tập 51, tr. 45-68; Giáo trình Lịch sử Đảng Cộng sản Việt Nam, NXB Chính trị quốc gia Sự thật, 2021, tr. 286-288.",
    funFact: "Đợt lấy ý kiến nhân dân cho dự thảo Cương lĩnh 1991 đã nhận được hơn 2 triệu lượt ý kiến đóng góp, nhiều cuộc tranh luận lý luận sôi nổi chưa từng có đã làm sáng tỏ bản chất CNXH Việt Nam.",
    imageUrl: "assets/images/p1_centerpiece_dh6_1986.jpg",
    position: { x: 0, y: 1.9, z: 3.85 },
    rotation: [0, Math.PI, 0]
  },

  // ==========================================
  // PHÒNG 2: NỘI DUNG ĐẠI HỘI & CƯƠNG LĨNH 1991 (Tâm: x = 30, z = 0)
  // ==========================================
  {
    id: "p2_ex1",
    room: "room2",
    photoYear: "24 - 27/6/1991",
    photoSource: "Báo điện tử Đảng Cộng sản Việt Nam (dangcongsan.vn)",
    docQuote: "Đại hội của trí tuệ, đổi mới, dân chủ, kỷ cương và đoàn kết, hoạch định con đường đi lên chủ nghĩa xã hội.",
    docQuoteSource: "Văn kiện Đại hội VII của Đảng, tr. 5",
    period: "Phòng 2: Tường sau bên trái",
    title: "Khai mạc Đại hội VII & Đồng chí Đỗ Mười được bầu làm Tổng Bí thư",
    shortDesc: "1.176 đại biểu họp từ 24 - 27/6/1991 tại Ba Đình; Đồng chí Đỗ Mười được bầu làm Tổng Bí thư.",
    fullDesc: "Đại hội đại biểu toàn quốc lần thứ VII của Đảng diễn ra từ ngày 24 đến ngày 27/6/1991 tại Hội trường Ba Đình, Hà Nội. Tham dự Đại hội có 1.176 đại biểu đại diện cho 2.155.022 đảng viên trong cả nước. Chủ đề bao trùm: 'Tiếp tục công cuộc đổi mới, đưa đất nước vượt qua khó khăn thử thách, giữ vững ổn định chính trị, phát triển kinh tế - xã hội'. Ban Chấp hành Trung ương khóa VII gồm 146 ủy viên, Bộ Chính trị gồm 13 đồng chí. Đồng chí Đỗ Mười được tín nhiệm bầu giữ chức Tổng Bí thư của Đảng. Đại hội cử các đồng chí Nguyễn Văn Linh, Phạm Văn Đồng, Võ Chí Công làm Cố vấn Ban Chấp hành Trung ương.",
    analysisCompare: "Công tác nhân sự tại Đại hội VII thể hiện sự kế thừa vững chắc và chuyển giao thế hệ lãnh đạo hài hòa: Đồng chí Nguyễn Văn Linh chủ động rút lui để làm Cố vấn, đồng chí Đỗ Mười - nhà lãnh đạo có thực tiễn phong phú, kiên định và quyết liệt - đảm nhiệm trọng trách chèo lái đất nước qua giai đoạn đầy sóng gió.",
    sourceCitation: "Văn kiện Đại hội đại biểu toàn quốc lần thứ VII, NXB Sự thật, Hà Nội, 1991, tr. 5-15; Lịch sử Biên niên Đảng Cộng sản Việt Nam, Tập 7, NXB Chính trị quốc gia Sự thật.",
    funFact: "Đồng chí Đỗ Mười sau khi được bầu đã trực tiếp chỉ đạo hàng loạt quyết sách thực tiễn, nổi bật là quyết định lịch sử xây dựng Đường dây tải điện 500kV Bắc - Nam (khởi công 1992, đóng điện 1994) thống nhất hệ thống điện quốc gia.",
    imageUrl: "assets/images/p2_a_tong_bi_thu.jpg",
    position: { x: 27.2, y: 1.9, z: -3.85 },
    rotation: [0, 0, 0]
  },
  {
    id: "p2_ex2",
    room: "room2",
    photoYear: "1991",
    photoSource: "Nhà xuất bản Sự thật / Viện Lịch sử Đảng",
    docQuote: "Toàn Đảng, toàn dân ta quyết tâm xây dựng đất nước Việt Nam xã hội chủ nghĩa: do nhân dân lao động làm chủ, có nền kinh tế phát triển cao...",
    docQuoteSource: "Cương lĩnh 1991, tr. 8",
    period: "Phòng 2: Tường sau bên phải",
    title: "Cương lĩnh xây dựng đất nước trong thời kỳ quá độ lên CNXH (1991)",
    shortDesc: "Ngọn cờ tư tưởng dẫn đường, đúc kết 6 đặc trưng bản chất của xã hội XHCN ở Việt Nam.",
    fullDesc: "Cương lĩnh 1991 là Cương lĩnh thứ tư trong lịch sử của Đảng, có giá trị lý luận và thực tiễn định hướng xuyên suốt. Cương lĩnh chỉ rõ nước ta quá độ lên CNXH bỏ qua chế độ tư bản chủ nghĩa, đồng thời đúc kết 6 đặc trưng cơ bản của xã hội XHCN mà nhân dân ta xây dựng: 1. Do nhân dân lao động làm chủ; 2. Nền kinh tế phát triển cao dựa trên lực lượng sản xuất hiện đại và chế độ công hữu tư liệu sản xuất chủ yếu; 3. Nền văn hóa tiên tiến, đậm đà bản sắc dân tộc; 4. Con người được giải phóng, làm theo năng lực hưởng theo lao động; 5. Các dân tộc bình đẳng, đoàn kết; 6. Có quan hệ hữu nghị và hợp tác với nhân dân tất cả các nước. Cương lĩnh cũng đề ra 7 phương hướng cơ bản trong thời kỳ quá độ.",
    analysisCompare: "Cương lĩnh 1991 đã khắc phục triệt để căn bệnh nóng vội, chủ quan duy ý chí thời kỳ trước 1986. Cương lĩnh chỉ rõ: Thời kỳ quá độ là một quá trình lịch sử lâu dài, nhiều chặng đường, với sự tồn tại tất yếu của nền kinh tế nhiều thành phần đan xen phức tạp trước khi đạt tới CNXH hoàn chỉnh.",
    sourceCitation: "Cương lĩnh xây dựng đất nước trong thời kỳ quá độ lên chủ nghĩa xã hội, NXB Sự thật, Hà Nội, 1991, tr. 8-22.",
    interactiveType: "book",
    interactiveData: {
      bookTitle: "Cương lĩnh xây dựng đất nước (1991)",
      chapters: [
        "1. Quá độ lên CNXH bỏ qua chế độ tư bản chủ nghĩa, trải qua nhiều chặng đường",
        "2. Sáu đặc trưng bản chất của xã hội XHCN Việt Nam",
        "3. Bảy phương hướng cơ bản phát triển toàn diện đất nước trong thời kỳ quá độ",
        "4. Nền tảng tư tưởng: Chủ nghĩa Mác-Lênin & Tư tưởng Hồ Chí Minh là kim chỉ nam"
      ]
    },
    imageUrl: "assets/images/p2_b_co_dang.webp",
    position: { x: 32.8, y: 1.9, z: -3.85 },
    rotation: [0, 0, 0]
  },
  {
    id: "p2_ex3",
    room: "room2",
    photoYear: "24 - 27/6/1991",
    photoSource: "Hội đồng Biên soạn Lịch sử Đảng / Báo Nhân Dân",
    docQuote: "Đảng lấy chủ nghĩa Mác - Lênin và tư tưởng Hồ Chí Minh làm nền tảng tư tưởng, kim chỉ nam cho hành động.",
    docQuoteSource: "Cương lĩnh 1991 & Điều lệ Đảng khóa VII",
    period: "Phòng 2: Tường trước đối diện",
    title: "Toàn cảnh Đại hội VII tại Hội trường Ba Đình (24 - 27/6/1991)",
    shortDesc: "Mốc son lịch sử lần đầu tiên chính thức đưa 'Tư tưởng Hồ Chí Minh' vào nền tảng tư tưởng của Đảng.",
    fullDesc: "Đại hội VII ghi dấu bước phát triển tư duy lý luận vượt bậc khi long trọng khẳng định trong Cương lĩnh: 'Đảng lấy chủ nghĩa Mác - Lênin và tư tưởng Hồ Chí Minh làm nền tảng tư tưởng, kim chỉ nam cho hành động'. Đây là sự đúc kết từ lịch sử đấu tranh vẻ vang hơn 60 năm của Đảng và dân tộc, khẳng định Tư tưởng Hồ Chí Minh chính là sự vận dụng sáng tạo, phát triển chủ nghĩa Mác-Lênin vào điều kiện cụ thể của Việt Nam.",
    analysisCompare: "So sánh với Đại hội VI (1986) chỉ nêu 'Đảng lấy chủ nghĩa Mác-Lênin làm nền tảng tư tưởng', việc Đại hội VII bổ sung 'Tư tưởng Hồ Chí Minh' là một bước đột phá lý luận vĩ đại, củng cố chỗ dựa tinh thần vô giá cho toàn Đảng, toàn quân, toàn dân trong bối cảnh các luồng tư tưởng xét lại trên thế giới đang tìm cách phủ nhận chủ nghĩa Mác.",
    sourceCitation: "Văn kiện Đại hội VII, tr. 127; Giáo trình Lịch sử Đảng Cộng sản Việt Nam, 2021, tr. 293-295.",
    funFact: "Năm 1990, đúng 1 năm trước Đại hội VII, UNESCO đã tổ chức kỷ niệm trọng thể 100 năm ngày sinh Chủ tịch Hồ Chí Minh và vinh danh Người là 'Anh hùng giải phóng dân tộc, Nhà văn hóa kiệt xuất của Việt Nam'.",
    imageUrl: "assets/images/extra_dh7_toancanh.jpg",
    position: { x: 30.0, y: 1.9, z: 3.85 },
    rotation: [0, Math.PI, 0]
  },

  // ==========================================
  // PHÒNG 3: CHIẾN LƯỢC KINH TẾ - XÃ HỘI & ĐỐI NGOẠI (Tâm: x = 60, z = 0)
  // ==========================================
  {
    id: "p3_ex1",
    room: "room3",
    photoYear: "1991 - 2000",
    photoSource: "Văn kiện Đại hội VII / Nhà xuất bản Sự thật",
    docQuote: "Phát triển nền kinh tế hàng hóa nhiều thành phần vận hành theo cơ chế thị trường có sự quản lý của Nhà nước theo định hướng XHCN.",
    docQuoteSource: "Chiến lược ổn định và phát triển KT - XH đến năm 2000, tr. 58",
    period: "Phòng 3: Tường sau bên trái",
    title: "Chiến lược KT - XH đến 2000 & Phát triển kinh tế hàng hóa nhiều thành phần",
    shortDesc: "Mục tiêu thoát khỏi khủng hoảng, tăng gấp đôi GDP và vận hành kinh tế theo cơ chế thị trường.",
    fullDesc: "Đại hội VII thông qua 'Chiến lược ổn định và phát triển kinh tế - xã hội đến năm 2000'. Mục tiêu tổng quát: Ra khỏi khủng hoảng, ổn định tình hình kinh tế - xã hội, phấn đấu đến năm 2000 GDP tăng gấp đôi so với năm 1990. Về thể chế, Đảng xác lập cơ chế vận hành mới: Kinh tế hàng hóa nhiều thành phần theo cơ chế thị trường có sự quản lý của Nhà nước bằng pháp luật, kế hoạch và chính sách; kinh tế quốc doanh giữ vai trò chủ đạo. Nhờ chính sách lãi suất thực dương, mở rộng tự do lưu thông hàng hóa và trao quyền tự chủ cho doanh nghiệp, lạm phát từ 67,1% (1991) đã hạ nhiệt kỳ diệu xuống 17,5% (1992) và chỉ còn 5,2% (1993).",
    analysisCompare: "Khác với Đại hội VI chủ yếu tập trung vào 3 chương trình kinh tế lớn (lương thực - thực phẩm, hàng tiêu dùng, hàng xuất khẩu), Chiến lược của Đại hội VII đã hoàn thiện cơ chế thị trường, thừa nhận sự tồn tại lâu dài và bình đẳng trước pháp luật của kinh tế tư nhân, tư bản tư nhân, tạo ra luồng sinh khí giải phóng toàn bộ sức sản xuất trong xã hội.",
    sourceCitation: "Chiến lược ổn định và phát triển kinh tế - xã hội đến năm 2000, NXB Sự thật, 1991; Niên giám Thống kê giai đoạn 1991-1995, Tổng cục Thống kê.",
    funFact: "Nhờ giải phóng sức sản xuất và khoán hộ, Việt Nam từ một quốc gia phải nhận hàng triệu tấn lương thực viện trợ đã vươn lên thành nước xuất khẩu gạo lớn thứ 3 thế giới ngay từ đầu thập niên 1990.",
    imageUrl: "assets/images/p3_a_co_to_quoc.webp",
    position: { x: 57.2, y: 1.9, z: -3.85 },
    rotation: [0, 0, 0]
  },
  {
    id: "p3_ex2",
    room: "room3",
    photoYear: "1991",
    photoSource: "Bộ Ngoại giao Việt Nam",
    docQuote: "Việt Nam muốn là bạn với tất cả các nước trong cộng đồng thế giới, phấn đấu vì hòa bình, độc lập và phát triển.",
    docQuoteSource: "Văn kiện Đại hội VII của Đảng, tr. 147",
    period: "Phòng 3: Tường sau bên phải",
    title: "Tuyên bố lịch sử: 'Việt Nam muốn là bạn với tất cả các nước'",
    shortDesc: "Đột phá tư duy đối ngoại: Đa phương hóa, đa dạng hóa quan hệ quốc tế, phá thế cô lập.",
    fullDesc: "Đại hội VII đề ra chủ trương đối ngoại rộng mở mang tính bước ngoặt lịch sử: 'Đa phương hóa, đa dạng hóa quan hệ quốc tế', với khẩu hiệu tuyên ngôn: 'Việt Nam muốn là bạn với tất cả các nước trong cộng đồng thế giới, phấn đấu vì hòa bình, độc lập và phát triển'. Nguyên tắc đối ngoại: Tôn trọng độc lập, chủ quyền, toàn vẹn lãnh thổ, không can thiệp vào công việc nội bộ của nhau, bình đẳng và cùng có lợi, khép lại quá khứ, hướng tới tương lai.",
    analysisCompare: "Trước Đại hội VII, quan hệ đối ngoại của nước ta chủ yếu nghiêng về khối XHCN và bị đế quốc bao vây cấm vận nặng nề. Đường lối Đại hội VII đã chuyển căn bản từ tư duy 'ý thức hệ đối đầu' sang tư duy 'lợi ích quốc gia - dân tộc trên hết', mở đường cho Việt Nam bình thường hóa quan hệ với các nước láng giềng và các cường quốc phương Tây.",
    sourceCitation: "Văn kiện Đại hội VII, tr. 147; Giáo trình Đường lối cách mạng của ĐCSVN, NXB Chính trị quốc gia Sự thật.",
    funFact: "Khẩu hiệu 'Việt Nam muốn là bạn' tại Đại hội VII (1991) đã phát triển thành 'Việt Nam sẵn sàng là bạn' (Đại hội VIII, 1996) và 'Việt Nam là bạn, đối tác tin cậy' (Đại hội IX, 2001).",
    interactiveType: "map",
    interactiveData: {
      mapTitle: "Các mốc son phá thế bao vây cô lập (1991 - 1995)",
      milestones: [
        { year: "11/1991", event: "Bình thường hóa quan hệ Việt Nam - Trung Quốc" },
        { year: "1992", event: "Ký Hiệp ước Bali, mở đường hội nhập Đông Nam Á" },
        { year: "02/1994", event: "Mỹ tuyên bố bãi bỏ cấm vận kinh tế đối với Việt Nam" },
        { year: "07/1995", event: "Bình thường hóa quan hệ Việt - Mỹ & Gia nhập ASEAN" }
      ]
    },
    imageUrl: "assets/images/extra_worldmap.webp",
    position: { x: 62.8, y: 1.9, z: -3.85 },
    rotation: [0, 0, 0]
  },
  {
    id: "p3_ex3",
    room: "room3",
    photoYear: "Tháng 7/1995",
    photoSource: "Thông tấn xã Việt Nam / Bộ Ngoại giao",
    docQuote: "Phá vỡ hoàn toàn thế bao vây cô lập, tạo môi trường quốc tế hòa bình, thuận lợi cho công cuộc đổi mới và phát triển đất nước.",
    docQuoteSource: "Nghị quyết Trung ương Đảng khóa VII",
    period: "Phòng 3: Tường trước đối diện",
    title: "Phá thế bao vây, cô lập: Bình thường hóa với Trung Quốc, Mỹ và gia nhập ASEAN",
    shortDesc: "Khép lại quá khứ đối đầu, mở ra thời kỳ hội nhập sâu rộng và bang giao toàn cầu.",
    fullDesc: "Thực hiện đường lối đối ngoại của Đại hội VII, nước ta đã giành được những thắng lợi ngoại giao rực rỡ: Tháng 11/1991, Tổng Bí thư Đỗ Mười và Chủ tịch HĐBT Võ Văn Kiệt thăm chính thức Trung Quốc, tuyên bố bình thường hóa quan hệ hai nước. Tháng 7/1992, ký Hiệp ước Bali. Ngày 3/2/1994, Tổng thống Bill Clinton tuyên bố dỡ bỏ hoàn toàn lệnh cấm vận thương mại kéo dài 19 năm đối với Việt Nam. Đặc biệt, tháng 7/1995 ghi dấu 3 mốc son chói lọi: Ngày 11/7/1995, Việt Nam và Hoa Kỳ tuyên bố bình thường hóa quan hệ ngoại giao; Ngày 17/7/1995, ký Hiệp định khung hợp tác với EU; Ngày 28/7/1995, Việt Nam chính thức trở thành thành viên thứ 7 của Hiệp hội các quốc gia Đông Nam Á (ASEAN). Thế bao vây, cấm vận, cô lập hoàn toàn bị đập tan.",
    analysisCompare: "Những đột phá ngoại giao giai đoạn 1991 - 1995 đã tạo lập môi trường quốc tế hòa bình, thuận lợi chưa từng có, mở đường cho dòng vốn đầu tư trực tiếp nước ngoài (FDI) và viện trợ ODA đổ vào Việt Nam, thúc đẩy nền kinh tế tăng trưởng vượt bậc.",
    sourceCitation: "Giáo trình Lịch sử Đảng Cộng sản Việt Nam, 2021, tr. 305-312; 75 năm Ngoại giao Việt Nam (1945-2020), Bộ Ngoại giao, NXB Chính trị quốc gia Sự thật.",
    funFact: "Tháng 7/1995 được giới ngoại giao trong nước và quốc tế vinh danh là 'Tháng Vàng lịch sử ngoại giao Việt Nam' khi thiết lập quan hệ với cả Mỹ, EU và ASEAN chỉ trong vòng 17 ngày.",
    imageUrl: "assets/images/p3_b_asean_1995.webp",
    position: { x: 60.0, y: 1.9, z: 3.85 },
    rotation: [0, Math.PI, 0]
  },

  // ==========================================
  // PHÒNG 4: KẾT QUẢ VÀ Ý NGHĨA LỊCH SỬ (Tâm: x = 90, z = 0)
  // ==========================================
  {
    id: "p4_ex1",
    room: "room4",
    photoYear: "1990 - 1995",
    photoSource: "Tư liệu Chợ Đồng Xuân & phố phường Hà Nội đầu Đổi mới",
    docQuote: "Nước ta đã vượt qua thời kỳ suy thoái kinh tế, đạt tốc độ tăng trưởng GDP bình quân 8,2% mỗi năm trong suốt nhiệm kỳ 1991 - 1995.",
    docQuoteSource: "Báo cáo chính trị Đại hội VIII của Đảng, tr. 12",
    period: "Phòng 4: Tường sau bên trái",
    title: "Kinh tế phục hồi kỳ diệu: Tốc độ tăng trưởng GDP đạt 8,2%/năm",
    shortDesc: "Vượt xa chỉ tiêu kế hoạch đề ra, đưa đất nước thoát đáy suy thoái kinh tế trầm trọng.",
    fullDesc: "Nhiệm kỳ Đại hội VII (1991 - 1995) ghi nhận những kỳ tích to lớn vượt bậc: Tốc độ tăng trưởng GDP bình quân hàng năm đạt 8,2% (vượt xa chỉ tiêu kế hoạch 5,5% - 6,5%). Sản xuất nông nghiệp phát triển liên tục, tăng bình quân 4,5%/năm, sản lượng lương thực quy thóc năm 1995 đạt trên 27,5 triệu tấn, bảo đảm vững chắc an ninh lương thực. Sản xuất công nghiệp tăng trưởng cao, bình quân 13,3%/năm. Kim ngạch xuất khẩu tăng bình quân 20%/năm. Lạm phát được kiềm chế vững chắc ở mức một con số (năm 1993 là 5,2%, năm 1995 là 12,7%). Lũy kế vốn đầu tư trực tiếp nước ngoài (FDI) đăng ký đạt trên 19 tỷ USD.",
    analysisCompare: "Hội nghị đại biểu toàn quốc giữa nhiệm kỳ khóa VII (tháng 1/1994) đã vui mừng ra thông điệp lịch sử: 'Nước ta đã vượt qua thời kỳ suy thoái kinh tế trầm trọng, cơ bản ổn định tình hình chính trị - xã hội, tạo điều kiện chuyển sang giai đoạn phát triển mới'. Đây là bước ngoặt khẳng định đường lối Đổi mới của Đảng là hoàn toàn đúng đắn.",
    sourceCitation: "Báo cáo Chính trị tại Đại hội đại biểu toàn quốc lần thứ VIII của Đảng (1996); Niên giám Thống kê Tổng cục Thống kê 1995.",
    funFact: "Giai đoạn 1991 - 1995, Việt Nam được các tổ chức tài chính quốc tế như World Bank và IMF đánh giá là một trong những nền kinh tế có tốc độ cải cách và kiểm soát lạm phát thành công nhất thế giới.",
    imageUrl: "assets/images/extra_cho_1990_1.webp",
    position: { x: 87.2, y: 1.9, z: -3.85 },
    rotation: [0, 0, 0]
  },
  {
    id: "p4_ex2",
    room: "room4",
    photoYear: "Thời kỳ bao cấp & Bước chuyển 1990",
    photoSource: "Bảo tàng Lịch sử Quốc gia",
    docQuote: "Đường dây 500kV Bắc - Nam là kỳ tích về ý chí, lòng dũng cảm và trí tuệ sáng tạo của giai cấp công nhân và đội ngũ trí thức Việt Nam.",
    docQuoteSource: "Diễn văn Thủ tướng Võ Văn Kiệt tại lễ đóng điện",
    period: "Phòng 4: Tường sau bên phải",
    title: "Ổn định chính trị - xã hội: Tạm biệt thời tem phiếu bao cấp",
    shortDesc: "Giữ vững định hướng XHCN, củng cố quốc phòng an ninh và niềm tin son sắt của nhân dân.",
    fullDesc: "Giữa lúc hệ thống XHCN thế giới lâm vào thoái trào trầm trọng và các thế lực thù địch tăng cường chống phá, Việt Nam vẫn giữ vững độc lập chủ quyền, an ninh chính trị và trật tự an toàn xã hội. Đời sống vật chất và tinh thần của nhân dân từng bước được cải thiện; sự đồng thuận xã hội được củng cố. Đảng ta đã chứng minh năng lực tự đổi mới, bản lĩnh chính trị kiên định và sự gắn bó máu thịt với nhân dân.",
    analysisCompare: "Đánh giá khách quan những Hạn chế và Khuyết điểm còn tồn tại: Nền kinh tế phát triển chưa thật vững chắc, hiệu quả và sức cạnh tranh còn thấp; khu vực kinh tế nhà nước chậm được đổi mới; đời sống một bộ phận nhân dân (nhất là vùng sâu, vùng xa, người lao động mất việc) còn nhiều khó khăn; phân hóa giàu nghèo bắt đầu xuất hiện; tệ nạn tham nhũng, lãng phí, buôn lậu và quan liêu diễn biến phức tạp.",
    sourceCitation: "Văn kiện Đại hội đại biểu toàn quốc lần thứ VIII của Đảng, NXB Chính trị quốc gia, 1996, tr. 18-29; Giáo trình Lịch sử Đảng Cộng sản Việt Nam, 2021, tr. 314-316.",
    funFact: "Nhờ giữ vững được ổn định chính trị - xã hội tuyệt đối trong giai đoạn 1991-1995, Việt Nam đã trở thành điểm đến an toàn và hấp dẫn bậc nhất cho các nhà đầu tư quốc tế tại khu vực Châu Á - Thái Bình Dương.",
    imageUrl: "assets/images/p4_a_tem_phieu.jpg",
    position: { x: 92.8, y: 1.9, z: -3.85 },
    rotation: [0, 0, 0]
  },
  {
    id: "p4_ex3",
    room: "room4",
    photoYear: "1991 - 1996",
    photoSource: "Tư liệu mậu dịch quốc doanh & chuyển đổi Đổi mới",
    docQuote: "Nhiệm vụ chuẩn bị tiền đề cho công nghiệp hóa đã cơ bản hoàn thành; đất nước chuyển sang thời kỳ đẩy mạnh công nghiệp hóa, hiện đại hóa.",
    docQuoteSource: "Văn kiện Đại hội VIII của Đảng, tr. 68",
    period: "Phòng 4: Tường trước đối diện",
    title: "Tiền đề lịch sử bước vào thời kỳ Đẩy mạnh Công nghiệp hóa - Hiện đại hóa",
    shortDesc: "Đại hội VII đặt nền móng vững chắc nhất về lý luận và thực tiễn cho công cuộc Đổi mới.",
    fullDesc: "Ý nghĩa lịch sử vĩ đại của Đại hội VII là đã hoạch định một hệ thống quan điểm toàn diện, kết hợp nhuần nhuyễn giữa đổi mới kinh tế và đổi mới chính trị, giữa độc lập tự chủ và mở cửa hội nhập sâu rộng. Cương lĩnh 1991 và Chiến lược đến năm 2000 đã định hình diện mạo chủ nghĩa xã hội Việt Nam trong thời đại mới. Những thành tựu to lớn của nhiệm kỳ Đại hội VII đã tạo ra 'thế và lực' mới để Đại hội VIII (1996) tự tin tuyên bố: Đất nước đã ra khỏi khủng hoảng kinh tế - xã hội, chuyển sang thời kỳ phát triển mới: Đẩy mạnh công nghiệp hóa, hiện đại hóa đất nước.",
    analysisCompare: "Nếu Đại hội VI (1986) là 'Khởi xướng Đổi mới' thì Đại hội VII (1991) chính là 'Đại hội xác lập hệ thống Cương lĩnh và Thể chế'. Đây là cầu nối lịch sử quyết định đưa dân tộc vượt qua cơn bão táp thế kỷ 20 để bước vào kỷ nguyên phát triển rực rỡ.",
    sourceCitation: "Giáo trình Lịch sử Đảng Cộng sản Việt Nam, NXB Chính trị quốc gia Sự thật, Hà Nội, 2021, tr. 316-318.",
    interactiveType: "guestbook",
    imageUrl: "assets/images/p4_b_mau_dich.webp",
    position: { x: 90.0, y: 1.9, z: 3.85 },
    rotation: [0, Math.PI, 0]
  }
];

// 3. DANH SÁCH 8 KIOSK TRA CỨU TƯ LIỆU CHUYÊN ĐỀ TẠI 4 PHÒNG
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
    fullDesc: "Cương lĩnh 1991 lần đầu tiên đúc kết 6 đặc trưng bản chất của CNXH ở Việt Nam:\n1. Do nhân dân lao động làm chủ.\n2. Có một nền kinh tế phát triển cao dựa trên lực lượng sản xuất hiện đại và chế độ công hữu về các tư liệu sản xuất chủ yếu.\n3. Có nền văn hóa tiên tiến, đậm đà bản sắc dân tộc.\n4. Con người được giải phóng khỏi áp bức, bóc lột, bất công, làm theo năng lực, hưởng theo lao động, có cuộc sống ấm no, tự do, hạnh phúc.\n5. Các dân tộc trong nước bình đẳng, đoàn kết và giúp đỡ lẫn nhau cùng tiến bộ.\n6. Có quan hệ hữu nghị và hợp tác với nhân dân tất cả các nước trên thế giới.",
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
    fullDesc: "Chỉ trong vòng chưa đầy 3 tuần của tháng 7/1995, ngoại giao Việt Nam lập nên 3 kỳ tích lịch sử liên tiếp:\n- Ngày 11/7/1995: Tổng thống Bill Clinton và Thủ tướng Võ Văn Kiệt tuyên bố bình thường hóa quan hệ ngoại giao Việt Nam - Hoa Kỳ.\n- Ngày 17/7/1995: Ký Hiệp định khung hợp tác toàn diện Việt Nam - EU tại Brussels.\n- Ngày 28/7/1995: Bộ trưởng Ngoại giao Nguyễn Mạnh Cầm tham dự Lễ thượng cờ Việt Nam, chính thức gia nhập ASEAN tại Bandar Seri Begawan (Brunei).",
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
    fullDesc: "Thành tựu rực rỡ: GDP tăng bình quân 8,2%/năm, công nghiệp tăng 13,3%/năm; lạm phát giảm từ 67,1% (1991) xuống 12,7% (1995); an ninh lương thực vững chắc; giữ vững ổn định chính trị.\n\nHạn chế và Khuyết điểm còn tồn tại:\n- Nền kinh tế còn nhiều yếu kém, năng suất lao động và hiệu quả thấp.\n- Doanh nghiệp nhà nước chậm đổi mới, tài chính ngân sách chưa thật vững chắc.\n- Đời sống một bộ phận nhân dân (nhất là vùng sâu, vùng xa) còn nhiều khó khăn, phân hóa giàu nghèo bắt đầu xuất hiện.\n- Tệ nạn tham nhũng, lãng phí, buôn lậu và quan liêu diễn biến phức tạp.",
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
];

// 4. DỮ LIỆU CÂU HỎI TRẮC NGHIỆM PHÒNG QUIZ (6 CÂU TINH HOA)
const QUIZ_QUESTIONS = [
  {
    question: "Đại hội đại biểu toàn quốc lần thứ VII của Đảng diễn ra vào thời gian nào và tại đâu?",
    options: [
      "A. Từ 15 đến 18/12/1986 tại Hà Nội",
      "B. Từ 24 đến 27/6/1991 tại Hà Nội",
      "C. Từ 28/6 đến 1/7/1996 tại Hà Nội",
      "D. Từ 19 đến 22/4/2001 tại TP. Hồ Chí Minh"
    ],
    correct: 1,
    explanation: "Đại hội VII của Đảng diễn ra từ ngày 24 đến ngày 27/6/1991 tại Hội trường Ba Đình, Thủ đô Hà Nội với sự tham dự của 1.176 đại biểu đại diện cho 2.155.022 đảng viên cả nước."
  },
  {
    question: "Chủ đề bao trùm của Đại hội VII của Đảng (1991) là gì?",
    options: [
      "A. Toàn dân đoàn kết, đẩy mạnh công nghiệp hóa",
      "B. Đổi mới, ổn định và phát triển",
      "C. Độc lập, tự do và chủ nghĩa xã hội",
      "D. Phát triển kinh tế tri thức và hội nhập quốc tế"
    ],
    correct: 1,
    explanation: "Chủ đề trung tâm của Đại hội VII là: 'Tiếp tục công cuộc đổi mới, đưa đất nước vượt qua khó khăn thử thách, giữ vững ổn định chính trị, phát triển kinh tế - xã hội' (gọi tắt là Đổi mới, ổn định và phát triển)."
  },
  {
    question: "Tại Đại hội VII (1991), đồng chí nào được bầu làm Tổng Bí thư Ban Chấp hành Trung ương Đảng?",
    options: [
      "A. Đồng chí Nguyễn Văn Linh",
      "B. Đồng chí Đỗ Mười",
      "C. Đồng chí Lê Khả Phiêu",
      "D. Đồng chí Nông Đức Mạnh"
    ],
    correct: 1,
    explanation: "Ban Chấp hành Trung ương khóa VII đã bầu đồng chí Đỗ Mười giữ chức Tổng Bí thư; đồng thời cử các đồng chí Nguyễn Văn Linh, Phạm Văn Đồng, Võ Chí Công làm Cố vấn BCH Trung ương."
  },
  {
    question: "Bước phát triển đột phá về nền tảng tư tưởng được khẳng định trong Cương lĩnh 1991 là gì?",
    options: [
      "A. Lấy chủ nghĩa Mác - Lênin làm nền tảng duy nhất",
      "B. Đảng lấy chủ nghĩa Mác - Lênin và tư tưởng Hồ Chí Minh làm nền tảng tư tưởng, kim chỉ nam cho hành động",
      "C. Tiếp thu toàn diện lý thuyết kinh tế phương Tây",
      "D. Chỉ tập trung phát triển tư duy kinh tế thị trường tự do"
    ],
    correct: 1,
    explanation: "Cương lĩnh 1991 lần đầu tiên chính thức đưa 'Tư tưởng Hồ Chí Minh' cùng với Chủ nghĩa Mác - Lênin vào nền tảng tư tưởng và kim chỉ nam cho hành động của Đảng (khác Đại hội VI chỉ nêu Mác-Lênin)."
  },
  {
    question: "Về cơ chế quản lý kinh tế, Đại hội VII khẳng định chủ trương phát triển nền kinh tế nào?",
    options: [
      "A. Kinh tế kế hoạch hóa tập trung quan liêu bao cấp",
      "B. Kinh tế hàng hóa nhiều thành phần vận động theo cơ chế thị trường có sự quản lý của Nhà nước",
      "C. Kinh tế tư bản tư nhân hoàn toàn tự do",
      "D. Kinh tế tự cung tự cấp khép kín"
    ],
    correct: 1,
    explanation: "Đại hội VII xác định chuyển hẳn sang phát triển kinh tế hàng hóa nhiều thành phần, vận động theo cơ chế thị trường có sự quản lý của Nhà nước bằng pháp luật, kế hoạch và chính sách, định hướng XHCN."
  },
  {
    question: "Khẩu hiệu đối ngoại mang tính bước ngoặt lịch sử được Đại hội VII (1991) đưa ra là gì?",
    options: [
      "A. Chỉ hợp tác toàn diện với khối các nước XHCN",
      "B. Việt Nam muốn là bạn với tất cả các nước trong cộng đồng thế giới, phấn đấu vì hòa bình, độc lập và phát triển",
      "C. Đóng cửa tự chủ kinh tế và đề phòng hội nhập",
      "D. Ưu tiên liên minh quân sự khu vực"
    ],
    correct: 1,
    explanation: "Đại hội VII khẳng định chính sách đối ngoại rộng mở: 'Việt Nam muốn là bạn với tất cả các nước trong cộng đồng thế giới', mở đường phá vỡ thế bao vây cô lập, bình thường hóa quan hệ với Trung Quốc, Hoa Kỳ và gia nhập ASEAN năm 1995."
  }
];


// 5. DANH SÁCH ĐIỂM ĐẾN TELEPORT NHANH (4 PHÒNG + QUIZ)
const TELEPORT_DESTINATIONS = {
  room1: { x: -3.8, y: 1.6, z: 0, lookX: 0, name: "Phòng 1: Bối cảnh lịch sử (1986 - 1990)" },
  room2: { x: 26.2, y: 1.6, z: 0, lookX: 30, name: "Phòng 2: Nội dung Đại hội & Cương lĩnh 1991" },
  room3: { x: 56.2, y: 1.6, z: 0, lookX: 60, name: "Phòng 3: Chiến lược KT - XH & Đối ngoại" },
  room4: { x: 86.2, y: 1.6, z: 0, lookX: 90, name: "Phòng 4: Kết quả & Ý nghĩa lịch sử" },
  quiz:  { x: 118.0, y: 1.6, z: 0, lookX: 120, name: "Phòng Quiz: Thử thách trắc nghiệm lịch sử" }
};

// 6. DANH MỤC NGUỒN VÀ TÀI LIỆU THAM KHẢO CHÍNH THỐNG
const BIBLIOGRAPHY_DATA = [
  {
    title: "Văn kiện Đảng Toàn tập (Tập 51 - Năm 1991)",
    publisher: "Nhà xuất bản Chính trị quốc gia Sự thật, Hà Nội, 2007",
    desc: "Chứa toàn văn các văn kiện, nghị quyết, phát biểu khai mạc, bế mạc và biên bản kiểm phiếu của Đại hội đại biểu toàn quốc lần thứ VII của Đảng."
  },
  {
    title: "Cương lĩnh xây dựng đất nước trong thời kỳ quá độ lên chủ nghĩa xã hội",
    publisher: "Nhà xuất bản Sự thật, Hà Nội, 1991",
    desc: "Văn kiện nền tảng xác định 6 đặc trưng bản chất của CNXH ở Việt Nam, 7 phương hướng phát triển và khẳng định Tư tưởng Hồ Chí Minh là nền tảng tư tưởng."
  },
  {
    title: "Chiến lược ổn định và phát triển kinh tế - xã hội đến năm 2000",
    publisher: "Nhà xuất bản Sự thật, Hà Nội, 1991",
    desc: "Văn kiện xác lập mục tiêu tăng gấp đôi GDP, cơ chế thị trường có sự quản lý của Nhà nước và đường lối mở rộng kinh tế đối ngoại."
  },
  {
    title: "Giáo trình Lịch sử Đảng Cộng sản Việt Nam (Bậc Đại học)",
    publisher: "Bộ Giáo dục và Đào tạo - NXB Chính trị quốc gia Sự thật, Hà Nội, 2021",
    desc: "Giáo trình chuẩn quốc gia dành cho sinh viên đại học trên toàn quốc, phần 'Đại hội VII và công cuộc đẩy mạnh đổi mới (1991-1996)' (tr. 280-325)."
  },
  {
    title: "Lịch sử Biên niên Đảng Cộng sản Việt Nam (Tập 7: 1986 - 1996)",
    publisher: "Viện Lịch sử Đảng - Học viện Chính trị Quốc gia Hồ Chí Minh, NXB Chính trị quốc gia Sự thật",
    desc: "Ghi chép chi tiết từng ngày, từng sự kiện ngoại giao, kinh tế và chính trị trong suốt nhiệm kỳ Đại hội VII."
  },
  {
    title: "Niên giám Thống kê giai đoạn 1986 - 1995",
    publisher: "Tổng cục Thống kê (GSO) - Nhà xuất bản Thống kê, Hà Nội",
    desc: "Nguồn số liệu chính thức về GDP, lạm phát, sản lượng lương thực, công nghiệp và chỉ số xuất nhập khẩu giai đoạn Đổi mới."
  }
];
