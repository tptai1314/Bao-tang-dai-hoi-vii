# PLAN: CẬP NHẬT TÊN & ĐỊNH DẠNG ẢNH - THỐNG NHẤT

## 🎯 QUY CHUẨN ĐẶT TÊN MỚI

Format: `p{room}_{hotspot}_{name}.webp`

Ví dụ:
- `p1_a_lamphatlexam.webp` (Phòng 1, Hotspot A)
- `p2_a_do_muoi.webp` (Phòng 2, Hotspot A)

---

## 📋 DANH SÁCH RENAME + CHUYỂN ĐỔI ĐỊNH DẠNG

### PHÒNG 1: BỐI CẢNH
| Tên cũ | Tên mới | Định dạng | Ghi chú |
|--------|--------|-----------|---------|
| `120428kpbaocap11_7f7b3.webp` | `p1_a_lam_phat.webp` | WEBP | ✅ Giữ |
| `tuong-berlin-5668-1415611289.webp` | `p1_b_tuong_berlin.webp` | WEBP | ✅ Giữ |
| `dai_hoi_VI.jpg` | `p1_centerpiece_dh6_1986.webp` | JPG→WEBP | 🔄 Convert |

### PHÒNG 2: ĐẠI HỘI VII
| Tên cũ | Tên mới | Định dạng | Ghi chú |
|--------|--------|-----------|---------|
| `Do_muoi.jpg` | `p2_a_tong_bi_thu.webp` | JPG→WEBP | 🔄 Convert |
| `Flag_of_the_Communist_Party_of_Vietnam.svg.webp` | `p2_b_co_dang.webp` | WEBP | ✅ Giữ |
| `dai_hoi_VII.avif` | `p2_centerpiece_dh7_1991.webp` | AVIF→WEBP | 🔄 Convert |

### PHÒNG 3: CHIẾN LƯỢC & ĐỐI NGOẠI
| Tên cũ | Tên mới | Định dạng | Ghi chú |
|--------|--------|-----------|---------|
| `Flag_of_Vietnam.svg.webp` | `p3_a_co_to_quoc.webp` | WEBP | ✅ Giữ |
| `gia_nhap_ASEAN_6.avif` | `p3_b_asean_1995.webp` | AVIF→WEBP | 🔄 Convert |

### PHÒNG 4: KẾT QUẢ & Ý NGHĨA
| Tên cũ | Tên mới | Định dạng | Ghi chú |
|--------|--------|-----------|---------|
| `tem_phieu_bao_capd.jpg` | `p4_a_tem_phieu.webp` | JPG→WEBP | 🔄 Convert |
| `mau_dich_thoi_bao_cap.png` | `p4_b_mau_dich.webp` | PNG→WEBP | 🔄 Convert (nén) |

### PHỤ TRỢ (Rename để tham khảo)
| Tên cũ | Tên mới | Ghi chú |
|--------|--------|---------|
| `2.1_Toan_canh_DH7.jpg` | `extra_dh7_toancanh.webp` | Dự phòng |
| `30-nam-gia-nhap-asean...jpg` | `extra_asean_30nam.webp` | Dự phòng |
| `BlankMap-World.svg.webp` | `extra_worldmap.webp` | Giữ |
| `cho_dong_xuan_1990.avif` | `extra_cho_1990_1.webp` | Dự phòng |
| `cho_voi_sieu_xe_1990.avif` | `extra_cho_1990_2.webp` | Dự phòng |
| `mau_dich_thoi_bao_cap-2.png` | `extra_mau_dich_2.webp` | Dự phòng (nén) |

---

## ✅ LỢI ÍCH CỦA CÁCH LÀM NÀY

1. ✅ Tên rõ ràng: Biết luôn ảnh dùng ở phòng nào, hotspot nào
2. ✅ Định dạng thống nhất: Tất cả WEBP (tối ưu web, nén tốt)
3. ✅ Dễ maintain: Dễ tìm, dễ sửa, dễ thay thế
4. ✅ Tăng tốc độ load: WEBP nhẹ hơn JPG/PNG 20-30%

---

## 🔧 BƯỚC TIẾN HÀNH

Bạn muốn tôi:
1. ✏️ Đặt tên lại tất cả ảnh theo quy chuẩn?
2. 🔄 Chuyển đổi sang WEBP?
3. 📝 Cập nhật content.json với tên mới?

**Chọn mục nào hay làm cả ba?**
