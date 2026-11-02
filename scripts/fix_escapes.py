with open('js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace the specific multi-line blocks with valid strings
p2_b_text = '    fullDesc: "Cương lĩnh 1991 lần đầu tiên đúc kết 6 đặc trưng bản chất của CNXH ở Việt Nam:\\n1. Do nhân dân lao động làm chủ.\\n2. Có một nền kinh tế phát triển cao dựa trên lực lượng sản xuất hiện đại và chế độ công hữu về các tư liệu sản xuất chủ yếu.\\n3. Có nền văn hóa tiên tiến, đậm đà bản sắc dân tộc.\\n4. Con người được giải phóng khỏi áp bức, bóc lột, bất công, làm theo năng lực, hưởng theo lao động, có cuộc sống ấm no, tự do, hạnh phúc.\\n5. Các dân tộc trong nước bình đẳng, đoàn kết và giúp đỡ lẫn nhau cùng tiến bộ.\\n6. Có quan hệ hữu nghị và hợp tác với nhân dân tất cả các nước trên thế giới.",'

p3_b_text = '    fullDesc: "Chỉ trong vòng chưa đầy 3 tuần của tháng 7/1995, ngoại giao Việt Nam lập nên 3 kỳ tích lịch sử liên tiếp:\\n- Ngày 11/7/1995: Tổng thống Bill Clinton và Thủ tướng Võ Văn Kiệt tuyên bố bình thường hóa quan hệ ngoại giao Việt Nam - Hoa Kỳ.\\n- Ngày 17/7/1995: Ký Hiệp định khung hợp tác toàn diện Việt Nam - EU tại Brussels.\\n- Ngày 28/7/1995: Bộ trưởng Ngoại giao Nguyễn Mạnh Cầm tham dự Lễ thượng cờ Việt Nam, chính thức gia nhập ASEAN tại Bandar Seri Begawan (Brunei).",'

p4_a_text = '    fullDesc: "Thành tựu rực rỡ: GDP tăng bình quân 8,2%/năm, công nghiệp tăng 13,3%/năm; lạm phát giảm từ 67,1% (1991) xuống 12,7% (1995); an ninh lương thực vững chắc; giữ vững ổn định chính trị.\\n\\nHạn chế và Khuyết điểm còn tồn tại:\\n- Nền kinh tế còn nhiều yếu kém, năng suất lao động và hiệu quả thấp.\\n- Doanh nghiệp nhà nước chậm đổi mới, tài chính ngân sách chưa thật vững chắc.\\n- Đời sống một bộ phận nhân dân (nhất là vùng sâu, vùng xa) còn nhiều khó khăn, phân hóa giàu nghèo bắt đầu xuất hiện.\\n- Tệ nạn tham nhũng, lãng phí, buôn lậu và quan liêu diễn biến phức tạp.",'

import re
text = re.sub(r'fullDesc:\s*"Cương lĩnh 1991[\s\S]*?trên thế giới\."', p2_b_text.strip(), text)
text = re.sub(r'fullDesc:\s*"Chỉ trong vòng[\s\S]*?\(Brunei\)\."', p3_b_text.strip(), text)
text = re.sub(r'fullDesc:\s*"Thành tựu rực rỡ[\s\S]*?phức tạp\."', p4_a_text.strip(), text)

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Escaping fixed successfully!")

