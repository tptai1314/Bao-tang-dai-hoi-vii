# HƯỚNG DẪN CHẠY NHANH DỰ ÁN (DÀNH CHO 1 NGƯỜI LÀM TRONG 1-2 NGÀY)

Toàn bộ mã nguồn bản chạy hoàn chỉnh (Full Working Prototype) đã được lập trình sẵn 100% trong thư mục này. Bạn có thể chạy ngay và demo trực tiếp.

---

## 1. CÁCH CHẠY DỰ ÁN NGAY LẬP TỨC

### Cách 1: Dùng tiện ích Live Server trong VS Code (Khuyên dùng)
1. Mở thư mục `TrienLam` bằng VS Code.
2. Cài extension **Live Server** (nếu chưa có).
3. Chuột phải vào file `index.html` chọn **"Open with Live Server"**.

### Cách 2: Chạy máy chủ nội bộ bằng Python hoặc Node (Rất nhanh)
Mở PowerShell tại thư mục `TrienLam` và chạy một trong hai lệnh sau:

- Nếu máy có **Python**:
  ```bash
  python -m http.server 8080
  ```
  Sau đó mở trình duyệt truy cập: `http://localhost:8080`

- Hoặc nếu máy có **Node.js**:
  ```bash
  npx serve .
  ```

---

## 2. CÁC TÍNH NĂNG ĐÃ TÍCH HỢP ĐẦY ĐỦ 100%

| Tính năng | Trạng thái | Chi tiết kỹ thuật |
| :--- | :---: | :--- |
| **Không gian 3D 5 phòng + Sảnh chính** | ✅ Hoàn thành | Xây dựng bằng Three.js, sàn gỗ bóng, vách triển lãm, đèn spotlight từng bức tranh. |
| **Di chuyển góc nhìn thứ nhất (FPS)** | ✅ Hoàn thành | Phím `WASD` / Mũi tên, xoay chuột góc nhìn 360°, khóa con trỏ `PointerLock`. |
| **Tương tác hiện vật (20 hiện vật lịch sử)** | ✅ Hoàn thành | Tâm ngắm Raycasting đổi màu khi nhìn tranh, bấm `E` hoặc Click chuột mở Popup chi tiết. |
| **Thuyết minh giọng đọc AI (Web Speech API)** | ✅ Hoàn thành | Bấm nút "Nghe thuyết minh", trình duyệt tự đọc văn bản bằng tiếng Việt chuẩn. |
| **Nhạc nền hào hùng (Web Audio Synthesizer)** | ✅ Hoàn thành | Tự tạo hợp âm trang nghiêm thời gian thực, không lo thiếu file MP3. |
| **Bản đồ con (Minimap 2D)** | ✅ Hoàn thành | Vẽ vị trí và góc nhìn người chơi theo thời gian thực ở góc phải màn hình. |
| **Menu chuyển phòng tức thời (Teleport)** | ✅ Hoàn thành | Bấm phím `M` hoặc nút trên HUD để nhảy ngay đến bất kỳ phòng nào hoặc phòng Quiz. |
| **Phòng Quiz 10 câu trắc nghiệm** | ✅ Hoàn thành | Chấm điểm trực tiếp, giải thích vì sao đúng/sai, cấp **Chứng nhận vinh danh** cuối tour. |

---

## 3. KẾ HOẠCH NƯỚC RÚT CHO 1 MÌNH BẠN (1 - 2 NGÀY)

Vì chỉ có một mình bạn và hạn 1-2 ngày, **code đã hoàn thiện xong toàn bộ**, bạn chỉ cần tập trung làm 3 việc sau:

1. **Ngày 1 - Chạy thử & Tinh chỉnh nội dung (nếu muốn):**
   - Mở `js/data.js` để đọc qua 20 hiện vật và 10 câu hỏi trắc nghiệm (đã được biên soạn chính xác theo dòng lịch sử Đảng).
   - Nếu muốn thay đổi hình ảnh thật của bạn, chỉ cần copy ảnh vào thư mục `assets/images/` và đổi đường dẫn `imageUrl` trong file `js/data.js`.

2. **Ngày 2 - Chuẩn bị bài thuyết trình / Báo cáo:**
   - Dùng tài liệu [Y_TUONG_DE_TAI.md](file:///d:/Documents/Book/Semester_9/VNR/TrienLam/docs/Y_TUONG_DE_TAI.md) để làm slide PowerPoint hoặc viết báo cáo nộp giáo viên/hội đồng.
   - Quay video màn hình (Screen recording) 2-3 phút demo:
     - Đi từ Sảnh chính qua các phòng.
     - Click 1-2 tranh để nghe AI đọc thuyết minh và hiện ô "Em có biết?".
     - Mở Menu Teleport nhảy nhanh đến Phòng 5.
     - Vào Phòng Quiz làm bài và nhận chứng nhận vinh danh.

3. **Đưa lên mạng (Deploy online) miễn phí trong 1 phút:**
   - Kéo thả thư mục dự án lên [Netlify Drop](https://app.netlify.com/drop) hoặc [Vercel](https://vercel.com).
   - Bạn sẽ có ngay một link web (ví dụ `https://baotang-dang-3d.netlify.app`) để gửi thầy cô, bạn bè chấm điểm mà không cần cài đặt gì!

