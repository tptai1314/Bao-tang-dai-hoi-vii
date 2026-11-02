# 🔧 KHẮC PHỤC LỖI KHÔNG DI CHUYỂN ĐƯỢC

## ❌ TRIỆU CHỨNG
- Không thể di chuyển bằng phím W/A/S/D
- Không thể xoay camera bằng chuột
- Pointer Lock không hoạt động

## ✅ NGUYÊN NHÂN & GIẢI PHÁP

### 1️⃣ CHƯA BẤM "BẮT ĐẦU THAM QUAN"
**Nguyên nhân:** Pointer Lock chỉ kích hoạt sau khi bấm nút start
**Giải pháp:**
- Bấm nút **"BẮT ĐẦU THAM QUAN ĐẠI HỘI VII"** màu đỏ
- Sau đó bấm vào màn hình để kích hoạt điều khiển

### 2️⃣ TRÌNH DUYỆT CHẶN POINTER LOCK
**Nguyên nhân:** Một số trình duyệt chặn Pointer Lock
**Giải pháp:**
- Sử dụng Chrome, Firefox, hoặc Edge (phiên bản mới nhất)
- Cho phép trang web sử dụng chuột (click "Allow" nếu có thông báo)
- Thử tải lại trang (F5)

### 3️⃣ CONSOLE CÓ LỖI JAVASCRIPT
**Kiểm tra:**
1. Bấm **F12** để mở Developer Tools
2. Chọn tab **Console**
3. Xem có lỗi màu đỏ không

**Lỗi thường gặp:**
```
❌ "controls is not defined"
❌ "THREE is not defined"
❌ "Failed to load resource"
```

### 4️⃣ FILE JS KHÔNG LOAD ĐƯỢC
**Kiểm tra:**
1. Mở **F12 > Network tab**
2. Tải lại trang (F5)
3. Tìm file `app.js` - nếu màu đỏ = lỗi

**Giải pháp:**
- Kiểm tra server đang chạy: `http://localhost:8000`
- Kiểm tra đường dẫn file `js/app.js` tồn tại

### 5️⃣ MODAL HOẶC OVERLAY ĐANG MỞ
**Nguyên nhân:** Khi có modal mở, Pointer Lock sẽ tắt
**Giải pháp:**
- Đóng tất cả popup/modal (bấm X hoặc ESC)
- Bấm lại vào màn hình để kích hoạt

---

## 🚀 KHỞI ĐỘNG LẠI SERVER

Nếu vẫn không được, khởi động lại server:

```bash
# Mở PowerShell tại thư mục dự án
cd D:\Documents\Book\Semester_9\VNR\TrienLam

# Chạy server
python -m http.server 8000
```

Sau đó mở: **http://localhost:8000**

---

## 🎮 CÁCH DI CHUYỂN ĐÚNG

1. **Bấm nút "BẮT ĐẦU THAM QUAN"**
2. **Click vào màn hình 3D** (con trỏ chuột sẽ biến mất)
3. **Sử dụng phím:**
   - `W` / `↑` - Đi tới
   - `S` / `↓` - Lùi lại
   - `A` / `←` - Sang trái
   - `D` / `→` - Sang phải
   - `Space` - Nhảy
   - `Chuột` - Xoay camera
   - `ESC` - Thoát điều khiển

---

## 📞 LIÊN HỆ HỖ TRỢ

Nếu vẫn gặp lỗi, cung cấp thông tin sau:
1. Trình duyệt đang dùng (Chrome/Firefox/Edge + version)
2. Screenshot màn hình Console (F12 > Console)
3. Mô tả chi tiết lỗi

---

**Tạo bởi:** Kiro AI Assistant  
**Ngày:** 02/11/2026
