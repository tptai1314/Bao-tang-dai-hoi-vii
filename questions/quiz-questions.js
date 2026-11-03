// ==============================================================================
// NGÂN HÀNG CÂU HỎI TRẮC NGHIỆM ĐẠI HỘI VII CỦA ĐẢNG (1991)
// ==============================================================================
// Thư mục: questions/quiz-questions.js
// Mỗi lần người tham quan làm bài, hệ thống sẽ ngẫu nhiên chọn 6 câu hỏi từ ngân hàng này!
// Điểm tối đa mỗi lượt thi là: 6 Điểm.
//
// Cấu trúc mỗi câu hỏi:
// - question: Nội dung câu hỏi trắc nghiệm
// - options: Mảng 4 đáp án (A, B, C, D)
// - correct: Số thứ tự đáp án đúng (0 = A, 1 = B, 2 = C, 3 = D)
// - explanation: Thuyết minh & trích dẫn văn kiện chuẩn xác
// ==============================================================================

const QUIZ_QUESTION_BANK = [
  {
    id: 1,
    question: "Đại hội đại biểu toàn quốc lần thứ VII của Đảng diễn ra vào thời gian nào và tại đâu?",
    options: [
      "A. Từ 15 đến 18/12/1986 tại Hà Nội",
      "B. Từ 24 đến 27/6/1991 tại Hội trường Ba Đình, Hà Nội",
      "C. Từ 28/6 đến 1/7/1996 tại Hà Nội",
      "D. Từ 19 đến 22/4/2001 tại TP. Hồ Chí Minh"
    ],
    correct: 1,
    explanation: "Đại hội VII của Đảng diễn ra từ ngày 24 đến ngày 27/6/1991 tại Hội trường Ba Đình, Thủ đô Hà Nội với sự tham dự của 1.176 đại biểu đại diện cho 2.155.022 đảng viên trong cả nước."
  },
  {
    id: 2,
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
    id: 3,
    question: "Tại Đại hội VII (1991), đồng chí nào được bầu làm Tổng Bí thư Ban Chấp hành Trung ương Đảng?",
    options: [
      "A. Đồng chí Nguyễn Văn Linh",
      "B. Đồng chí Đỗ Mười",
      "C. Đồng chí Lê Khả Phiêu",
      "D. Đồng chí Nông Đức Mạnh"
    ],
    correct: 1,
    explanation: "Ban Chấp hành Trung ương khóa VII đã bầu đồng chí Đỗ Mười giữ chức Tổng Bí thư; đồng thời trân trọng cử các đồng chí Nguyễn Văn Linh, Phạm Văn Đồng, Võ Chí Công làm Cố vấn Ban Chấp hành Trung ương."
  },
  {
    id: 4,
    question: "Bước phát triển đột phá về nền tảng tư tưởng được khẳng định trong Cương lĩnh 1991 là gì?",
    options: [
      "A. Lấy chủ nghĩa Mác - Lênin làm nền tảng duy nhất",
      "B. Đảng lấy chủ nghĩa Mác - Lênin và tư tưởng Hồ Chí Minh làm nền tảng tư tưởng, kim chỉ nam cho hành động",
      "C. Tiếp thu toàn diện lý thuyết kinh tế phương Tây",
      "D. Chỉ tập trung phát triển tư duy kinh tế thị trường tự do"
    ],
    correct: 1,
    explanation: "Cương lĩnh 1991 đánh dấu mốc lịch sử khi lần đầu tiên Đảng chính thức khẳng định: 'Đảng lấy chủ nghĩa Mác - Lênin và tư tưởng Hồ Chí Minh làm nền tảng tư tưởng, kim chỉ nam cho hành động'."
  },
  {
    id: 5,
    question: "Về cơ chế quản lý kinh tế, Đại hội VII khẳng định chủ trương phát triển mô hình kinh tế nào?",
    options: [
      "A. Kinh tế kế hoạch hóa tập trung quan liêu bao cấp",
      "B. Kinh tế hàng hóa nhiều thành phần vận động theo cơ chế thị trường có sự quản lý của Nhà nước, định hướng XHCN",
      "C. Kinh tế tư bản tư nhân hoàn toàn tự do",
      "D. Kinh tế tự cung tự cấp khép kín"
    ],
    correct: 1,
    explanation: "Đại hội VII xác định chuyển hẳn sang phát triển kinh tế hàng hóa nhiều thành phần, vận động theo cơ chế thị trường có sự quản lý của Nhà nước bằng pháp luật, kế hoạch, chính sách theo định hướng XHCN."
  },
  {
    id: 6,
    question: "Khẩu hiệu đối ngoại mang tính bước ngoặt lịch sử mở cửa hội nhập được Đại hội VII đưa ra là gì?",
    options: [
      "A. Chỉ hợp tác toàn diện với khối các nước XHCN",
      "B. Việt Nam muốn là bạn với tất cả các nước trong cộng đồng thế giới, phấn đấu vì hòa bình, độc lập và phát triển",
      "C. Đóng cửa tự chủ kinh tế và đề phòng hội nhập",
      "D. Ưu tiên các khối liên minh quân sự"
    ],
    correct: 1,
    explanation: "Đại hội VII khẳng định chính sách đối ngoại rộng mở: 'Việt Nam muốn là bạn với tất cả các nước trong cộng đồng thế giới', mở đường phá vỡ thế bao vây cô lập, bình thường hóa quan hệ với Trung Quốc, Hoa Kỳ và gia nhập ASEAN."
  },
  {
    id: 7,
    question: "Cương lĩnh xây dựng đất nước trong thời kỳ quá độ lên CNXH (1991) xác định xã hội XHCN mà nhân dân ta xây dựng có bao nhiêu đặc trưng cơ bản?",
    options: [
      "A. 4 đặc trưng",
      "B. 6 đặc trưng",
      "C. 8 đặc trưng",
      "D. 10 đặc trưng"
    ],
    correct: 1,
    explanation: "Cương lĩnh 1991 nêu ra 6 đặc trưng cơ bản của xã hội XHCN ở Việt Nam. Đến Đại hội X (2006) và Cương lĩnh bổ sung, phát triển năm 2011 (Đại hội XI) mới phát triển thành 8 đặc trưng."
  },
  {
    id: 8,
    question: "Đặc trưng đầu tiên về bản chất của xã hội XHCN được khẳng định trong Cương lĩnh 1991 là gì?",
    options: [
      "A. Do nhân dân lao động làm chủ",
      "B. Có nền kinh tế phát triển cao",
      "C. Có nền văn hóa tiên tiến, đậm đà bản sắc dân tộc",
      "D. Con người được giải phóng khỏi áp bức, bóc lột"
    ],
    correct: 0,
    explanation: "Cương lĩnh 1991 khẳng định đặc trưng số 1 thể hiện bản chất ưu việt của chế độ: 'Do nhân dân lao động làm chủ'."
  },
  {
    id: 9,
    question: "Cương lĩnh 1991 đề ra bao nhiêu phương hướng cơ bản trong quá trình xây dựng CNXH và bảo vệ Tổ quốc?",
    options: [
      "A. 5 phương hướng",
      "B. 7 phương hướng",
      "C. 9 phương hướng",
      "D. 11 phương hướng"
    ],
    correct: 1,
    explanation: "Cương lĩnh năm 1991 nêu rõ 7 phương hướng cơ bản chỉ đạo toàn bộ tiến trình cách mạng trong thời kỳ quá độ lên chủ nghĩa xã hội ở nước ta."
  },
  {
    id: 10,
    question: "Mục tiêu tổng quát của 'Chiến lược ổn định và phát triển kinh tế - xã hội đến năm 2000' được Đại hội VII thông qua là gì?",
    options: [
      "A. Hoàn thành công nghiệp hóa hiện đại hóa ngay trong thế kỷ XX",
      "B. Vượt qua khủng hoảng, ổn định KT-XH, phấn đấu đến năm 2000 GDP tăng gấp đôi so với năm 1990",
      "C. Trở thành nước phát triển có thu nhập cao trong khu vực",
      "D. Xóa bỏ hoàn toàn sở hữu tư nhân về tư liệu sản xuất"
    ],
    correct: 1,
    explanation: "Mục tiêu then chốt của Chiến lược là: Vượt qua khủng hoảng, ổn định tình hình kinh tế - xã hội, thoát khỏi tình trạng nước nghèo, phấn đấu đến năm 2000 GDP tăng gấp đôi so với năm 1990 (thực tế năm 2000 GDP đã tăng gấp 2,07 lần)."
  },
  {
    id: 11,
    question: "Bối cảnh quốc tế nổi bật và phức tạp nhất tác động sâu sắc đến thời điểm diễn ra Đại hội VII là gì?",
    options: [
      "A. Chiến tranh thế giới thứ hai bùng nổ",
      "B. Khủng hoảng trầm trọng và sự sụp đổ của chế độ XHCN ở Liên Xô và Đông Âu",
      "C. Khủng hoảng tài chính châu Á bùng nổ mạnh mẽ",
      "D. Phong trào giải phóng dân tộc trên thế giới vừa mới bắt đầu"
    ],
    correct: 1,
    explanation: "Đại hội VII diễn ra trong thời điểm hệ thống XHCN ở Liên Xô và các nước Đông Âu rơi vào khủng hoảng gay gắt và tan rã, đặt cách mạng Việt Nam trước những thử thách sống còn vô cùng to lớn."
  },
  {
    id: 12,
    question: "Trước thời kỳ Đổi mới (năm 1986), lạm phát ở nước ta ở mức đỉnh điểm là bao nhiêu %?",
    options: [
      "A. Khoảng 77,4%",
      "B. Khoảng 774,7%",
      "C. Khoảng 150%",
      "D. Khoảng 350%"
    ],
    correct: 1,
    explanation: "Năm 1986, lạm phát ở Việt Nam lên tới đỉnh điểm là 774,7%, đời sống nhân dân vô cùng khó khăn, tiền lương không theo kịp tốc độ mất giá của đồng tiền, phải phân phối bằng tem phiếu."
  },
  {
    id: 13,
    question: "Nhờ đường lối đổi mới của Đại hội VII, đến giai đoạn 1991 - 1995, lạm phát ở nước ta đã được kiềm chế xuống còn bao nhiêu?",
    options: [
      "A. Từ 67% (năm 1991) giảm xuống 12,7% (năm 1995)",
      "B. Vẫn duy trì trên 100%",
      "C. Tăng lên 200%",
      "D. Giảm ngay về mức 0%"
    ],
    correct: 0,
    explanation: "Chỉ sau một nhiệm kỳ Đại hội VII, lạm phát từ mức 67,1% (năm 1991) đã giảm ngoạn mục xuống còn 12,7% (năm 1995), đưa nước ta từng bước thoát khỏi khủng hoảng kinh tế - xã hội."
  },
  {
    id: 14,
    question: "Sự kiện ngoại giao quan trọng đánh dấu việc bình thường hóa quan hệ giữa Việt Nam và Trung Quốc diễn ra vào thời gian nào?",
    options: [
      "A. Tháng 12/1986",
      "B. Tháng 11/1991",
      "C. Tháng 7/1995",
      "D. Tháng 2/1994"
    ],
    correct: 1,
    explanation: "Tháng 11/1991, nhận lời mời của lãnh đạo Trung Quốc, Đoàn đại biểu cấp cao Việt Nam do Tổng Bí thư Đỗ Mười và Thủ tướng Võ Văn Kiệt dẫn đầu đã sang thăm chính thức Trung Quốc, chính thức bình thường hóa quan hệ giữa hai nước."
  },
  {
    id: 15,
    question: "Hoa Kỳ chính thức tuyên bố bãi bỏ hoàn toàn lệnh cấm vận thương mại kéo dài 19 năm đối với Việt Nam vào ngày tháng năm nào?",
    options: [
      "A. Ngày 24/6/1991",
      "B. Ngày 03/02/1994",
      "C. Ngày 11/7/1995",
      "D. Ngày 28/7/1995"
    ],
    correct: 1,
    explanation: "Ngày 03/02/1994, Tổng thống Hoa Kỳ Bill Clinton chính thức tuyên bố bãi bỏ hoàn toàn lệnh cấm vận thương mại đối với Việt Nam, mở ra kỷ nguyên bình thường hóa và hợp tác kinh tế."
  },
  {
    id: 16,
    question: "Mốc thời gian lịch sử Việt Nam và Hoa Kỳ chính thức tuyên bố bình thường hóa quan hệ ngoại giao là:",
    options: [
      "A. Ngày 30/4/1975",
      "B. Ngày 24/6/1991",
      "C. Ngày 11/7/1995 (theo giờ Mỹ) / 12/7/1995 (giờ Việt Nam)",
      "D. Ngày 15/12/2000"
    ],
    correct: 2,
    explanation: "Ngày 11/7/1995 (giờ Washington, tức sáng 12/7/1995 giờ Hà Nội), Tổng thống Bill Clinton và Thủ tướng Võ Văn Kiệt đã cùng tuyên bố bình thường hóa quan hệ ngoại giao giữa Hoa Kỳ và Việt Nam."
  },
  {
    id: 17,
    question: "Việt Nam chính thức trở thành thành viên thứ 7 của Hiệp hội các quốc gia Đông Nam Á (ASEAN) vào ngày tháng năm nào?",
    options: [
      "A. Ngày 28/7/1995",
      "B. Ngày 08/8/1967",
      "C. Ngày 24/6/1991",
      "D. Ngày 11/1/2007"
    ],
    correct: 0,
    explanation: "Ngày 28/7/1995, tại Hội nghị Bộ trưởng Ngoại giao ASEAN lần thứ 28 tại Bandar Seri Begawan (Brunei), Việt Nam chính thức được kết nạp làm thành viên thứ 7 của ASEAN."
  },
  {
    id: 18,
    question: "Bản Hiến pháp nào được Quốc hội thông qua nhằm thể chế hóa Cương lĩnh năm 1991 và đường lối đổi mới toàn diện của Đảng?",
    options: [
      "A. Hiến pháp năm 1959",
      "B. Hiến pháp năm 1980",
      "C. Hiến pháp năm 1992",
      "D. Hiến pháp năm 2013"
    ],
    correct: 2,
    explanation: "Hiến pháp năm 1992 (Hiến pháp của thời kỳ đổi mới) được Quốc hội khóa VIII thông qua ngày 15/4/1992, kịp thời thể chế hóa Cương lĩnh 1991 và đường lối phát triển kinh tế thị trường định hướng XHCN."
  },
  {
    id: 19,
    question: "Theo quan điểm của Đại hội VII, thành phần kinh tế nào giữ vai trò chủ đạo trong nền kinh tế nhiều thành phần?",
    options: [
      "A. Kinh tế tư nhân",
      "B. Kinh tế có vốn đầu tư nước ngoài",
      "C. Kinh tế quốc doanh (Kinh tế nhà nước)",
      "D. Kinh tế cá thể, tiểu chủ"
    ],
    correct: 2,
    explanation: "Đại hội VII xác định kinh tế quốc doanh (sau này gọi là kinh tế nhà nước) giữ vai trò chủ đạo, liên kết và hỗ trợ các thành phần kinh tế khác cùng phát triển theo định hướng XHCN."
  },
  {
    id: 20,
    question: "Trong Cương lĩnh 1991, nền tảng của khối đại đoàn kết toàn dân tộc được xác định dựa trên liên minh nào?",
    options: [
      "A. Liên minh giữa giai cấp công nhân với doanh nhân",
      "B. Liên minh giai cấp công nhân với giai cấp nông dân và tầng lớp trí thức",
      "C. Liên minh giữa thanh niên và phụ nữ",
      "D. Liên minh kinh tế giữa các vùng miền"
    ],
    correct: 1,
    explanation: "Cương lĩnh 1991 khẳng định: Đại đoàn kết toàn dân tộc lấy liên minh giữa giai cấp công nhân với giai cấp nông dân và tầng lớp trí thức làm nền tảng, do Đảng Cộng sản Việt Nam lãnh đạo."
  },
  {
    id: 21,
    question: "Ba chương trình kinh tế lớn được đề ra từ Đại hội VI và tiếp tục đẩy mạnh thực hiện hiệu quả trong Đại hội VII là:",
    options: [
      "A. Lương thực - thực phẩm, hàng tiêu dùng và hàng xuất khẩu",
      "B. Công nghiệp nặng, hóa chất và năng lượng",
      "C. Giao thông vận tải, bưu chính viễn thông và du lịch",
      "D. Khoa học công nghệ, giáo dục và quốc phòng"
    ],
    correct: 0,
    explanation: "Ba chương trình kinh tế lớn: Lương thực - thực phẩm, Hàng tiêu dùng và Hàng xuất khẩu là trọng tâm xuyên suốt giải quyết triệt để nạn khan hiếm hàng hóa và thiếu lương thực của thời bao cấp."
  },
  {
    id: 22,
    question: "Đại hội VII của Đảng đã thông qua bao nhiêu văn kiện có tầm vóc cương lĩnh và định hướng chiến lược lâu dài?",
    options: [
      "A. Chỉ duy nhất Nghị quyết Đại hội",
      "B. Báo cáo chính trị, Cương lĩnh 1991, Chiến lược KT-XH đến năm 2000 và Báo cáo xây dựng Đảng",
      "C. Kế hoạch phát triển kinh tế 1 năm",
      "D. Chỉ thông qua Điều lệ Đảng"
    ],
    correct: 1,
    explanation: "Đại hội VII có tầm vóc đặc biệt khi cùng lúc thông qua: Báo cáo chính trị, Cương lĩnh xây dựng đất nước năm 1991, Chiến lược ổn định và phát triển KT-XH đến năm 2000 và Báo cáo xây dựng Đảng, sửa đổi Điều lệ Đảng."
  },
  {
    id: 23,
    question: "Ý nghĩa lịch sử nổi bật nhất của Đại hội VII (1991) đối với tiền đồ cách mạng Việt Nam là gì?",
    options: [
      "A. Là Đại hội kết thúc hoàn toàn thời kỳ đổi mới",
      "B. Là Đại hội của đổi mới, ổn định và phát triển; giữ vững định hướng XHCN giữa cơn bão khủng hoảng toàn cầu",
      "C. Là Đại hội chuyển hẳn sang nền kinh tế tư bản chủ nghĩa",
      "D. Là Đại hội chuyển giao sang chế độ đa nguyên, đa đảng"
    ],
    correct: 1,
    explanation: "Đại hội VII đi vào lịch sử như một cột mốc vàng kiên định: giữ vững ổn định chính trị, làm sáng tỏ con đường đi lên CNXH ở Việt Nam giữa lúc hệ thống XHCN thế giới sụp đổ, mở ra kỷ nguyên độc lập, tự chủ và hội nhập thành công."
  },
  {
    id: 24,
    question: "Chủ tịch Hồ Chí Minh đã từng khẳng định: 'Đoàn kết, đoàn kết, đại đoàn kết. Thành công, thành công, đại thành công'. Tinh thần này được Đại hội VII kế thừa qua bài học nào?",
    options: [
      "A. Tự lực cánh sinh, không cần quan hệ quốc tế",
      "B. Không ngừng củng cố khối đại đoàn kết toàn dân tộc, kết hợp sức mạnh dân tộc với sức mạnh thời đại",
      "C. Đặt lợi ích cá nhân lên trên tập thể",
      "D. Chỉ dựa vào viện trợ của các cường quốc"
    ],
    correct: 1,
    explanation: "Bài học lớn của Đại hội VII là: Luôn nắm vững ngọn cờ độc lập dân tộc và CNXH, không ngừng củng cố khối đại đoàn kết toàn dân tộc, kết hợp sức mạnh dân tộc với sức mạnh thời đại để chiến thắng mọi thử thách."
  }
];

// Xuất biến ra môi trường trình duyệt và Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QUIZ_QUESTION_BANK };
}
