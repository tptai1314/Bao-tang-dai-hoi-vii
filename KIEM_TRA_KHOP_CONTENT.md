# KIỂM TRA SỰ KHỚP GIỮA ẢNH HIỆN CÓ VÀ content.json

## CHÍNH THỨC YÊUCẦU TRONG content.json

| Hotspot ID | Ảnh cần có | Phòng | Nội dung |
|------------|-----------|-------|---------|
| p1_hotspot_a | **p1_ex1.jpg** | Phòng 1 | Bảng số liệu lạm phát 1986-1990 |
| p1_hotspot_b | **p1_ex2.jpg** | Phòng 1 | Biến động SEV & Liên Xô |
| p2_hotspot_a | **p2_portrait_domuoi.jpg** | Phòng 2 | Chân dung Đỗ Mười |
| p2_hotspot_b | **p2_emblem.jpg** | Phòng 2 | Phù hiệu/Cương lĩnh |
| p3_hotspot_a | **p3_portrait_vovankiet.jpg** | Phòng 3 | Chân dung Võ Văn Kiệt |
| p3_hotspot_b | **p3_ex3.jpg** | Phòng 3 | Mốc ngoại giao tháng 7/1995 |
| p4_hotspot_a | **p4_ex2.jpg** | Phòng 4 | Đường dây 500kV / Thành tựu |
| p4_hotspot_b | **p4_ex3.jpg** | Phòng 4 | Tiền đề CNH - HĐH |

## SO SÁNH VỚI ẢNH HIỆN CÓ

### ✅ CÓ NHƯNG TÊN KHÁC
| Yêu cầu | Hiện có | Trạng thái |
|--------|--------|-----------|
| p2_portrait_domuoi.jpg | **Do_muoi.jpg** | ⚠️ Tên khác - cần rename |

### ❌ HOÀN TOÀN THIẾU
| Yêu cầu | Hiện có | Trạng thái |
|--------|--------|-----------|
| p1_ex1.jpg | Không | ❌ THIẾU |
| p1_ex2.jpg | Không | ❌ THIẾU |
| p2_emblem.jpg | Không | ❌ THIẾU |
| p3_portrait_vovankiet.jpg | Không | ❌ THIẾU |
| p3_ex3.jpg | Không | ❌ THIẾU |
| p4_ex2.jpg | Không | ❌ THIẾU |
| p4_ex3.jpg | Không | ❌ THIẾU |

### ✅ CÓ NHƯNG KHÔNG DÙNG
| File hiện có | Lý do |
|-------------|-------|
| 120428kpbaocap11_7f7b3.webp | Không trong content.json |
| 2.1_Toan_canh_DH7.jpg | Không trong hotspots (chỉ là centerpiece) |
| 30-nam-gia-nhap-asean-khang-dinh-dau-an-va-vi-the-cua-viet-nam_6896e17fdf1eb.jpg | Không trong content.json |
| BlankMap-World.svg.webp | Không trong content.json |
| cho_dong_xuan_1990.avif | Không trong content.json |
| cho_voi_sieu_xe_1990.avif | Không trong content.json |
| Flag_of_the_Communist_Party_of_Vietnam.svg.webp | Không trong content.json |
| Flag_of_Vietnam.svg.webp | Không trong content.json |
| gia_nhap_ASEAN_6.avif | Không trong content.json |
| mau_dich_thoi_bao_cap-2.png | Không trong content.json |
| mau_dich_thoi_bao_cap.png | Không trong content.json |
| tem_phieu_bao_capd.jpg | Không trong content.json |
| tuong-berlin-5668-1415611289.webp | Không trong content.json |

---

## NÓM NA: CẦN LÀM CÁC VIỆC SAU

### 1️⃣ RENAME (1 ảnh)
```
Do_muoi.jpg  →  p2_portrait_domuoi.jpg
```

### 2️⃣ CẦN TẢI LẠI (7 ảnh)
```
p1_ex1.jpg           - Bảng số liệu lạm phát (làm infographic)
p1_ex2.jpg           - Biến động Liên Xô, SEV (ảnh tư liệu hoặc infographic)
p2_emblem.jpg        - Phù hiệu/Logo Đảng hoặc bìa Cương lĩnh
p3_portrait_vovankiet.jpg  - Chân dung Thủ tướng Võ Văn Kiệt
p3_ex3.jpg           - Mốc ngoại giao 1995 (ảnh hoặc infographic)
p4_ex2.jpg           - Đường dây 500kV Bắc-Nam (ảnh tư liệu)
p4_ex3.jpg           - Tiền đề CNH-HĐH (ảnh hoặc infographic)
```

### 3️⃣ CÓ THỂXÓA HOẶC GIỮ LẠI (13 ảnh)
- Nếu muốn triển lãm "sạch" theo content.json → xóa
- Nếu muốn "phong phú" → giữ (dùng ở các mục không yêu cầu trong hotspots)

---

## KẾT LUẬN

**Tình trạng hiện tại:** ❌ **CHƯA ĐÚNG ĐỊNH DẠNG**

Bạn có 2 lựa chọn:

### ✅ LỰA CHỌN 1: Cập nhật ảnh để khớp content.json (Khuyên)
1. Rename: `Do_muoi.jpg` → `p2_portrait_domuoi.jpg`
2. Tạo/Tải 7 ảnh còn thiếu
3. **Khi đó triển lãm sẽ chạy HOÀN CHỈNH**

### ⚠️ LỰA CHỌN 2: Cập nhật content.json để khớp ảnh hiện có
1. Sửa tên file trong content.json
2. Bỏ bớt các hotspot không có ảnh
3. **Nhưng triển lãm sẽ thiếu nội dung**

---

**Bạn chọn lựa chọn nào?**
