# 📚 NGÂN HÀNG CÂU HỎI TRẮC NGHIỆM ĐẠI HỘI VII CỦA ĐẢNG (1991)

Thư mục này được tạo riêng để bạn dễ dàng **kiểm tra, chỉnh sửa nội dung, hoặc bổ sung thêm câu hỏi mới** cho Bảo tàng ảo 3D Đại hội VII (1991).

---

## 📁 1. Tệp tin chính
* **`quiz-questions.js`**: Chứa toàn bộ ngân hàng gồm **24 câu hỏi trắc nghiệm** lịch sử chuẩn xác theo *Văn kiện Đảng Toàn tập (Tập 51)* và *Giáo trình chuẩn của Bộ GD&ĐT*.

---

## 🎲 2. Cơ chế bốc ngẫu nhiên (Random 6 câu hỏi)
* **Nguyên lý hoạt động**:
  * Mỗi khi có người chơi bấm vào **BẮT ĐẦU LÀM BÀI THỬ THÁCH**, hệ thống sẽ tự động xáo trộn ngẫu nhiên (Shuffle) toàn bộ ngân hàng câu hỏi và bốc ra **đúng 6 câu hỏi khác nhau**.
  * Nhờ cơ chế này, người chơi có thể thi lại nhiều lần mà không bị trùng đề thi.
* **Thang điểm**:
  * Mỗi câu trả lời đúng = **1 điểm**.
  * Điểm tối đa của mỗi lượt thi = **6 / 6 Điểm**.

---

## ✍️ 3. Hướng dẫn cách bạn kiểm tra và tự thêm/sửa câu hỏi

Mỗi câu hỏi trong tệp `quiz-questions.js` có cấu trúc như sau:

```javascript
{
  id: 25, // Mã số câu hỏi (tự tăng)
  question: "Nội dung câu hỏi của bạn ở đây?",
  options: [
    "A. Phương án A",
    "B. Phương án B",
    "C. Phương án C",
    "D. Phương án D"
  ],
  correct: 1, // Vị trí đáp án ĐÚNG (Quy ước: 0 = A, 1 = B, 2 = C, 3 = D)
  explanation: "Lời giải thích chuẩn xác trích dẫn từ tài liệu/văn kiện để người học ôn tập kiến thức."
}
```

### 💡 Lưu ý khi sửa:
1. **Chỉ số `correct`**:
   * Nếu đáp án đúng là **A** ➔ điền `0`
   * Nếu đáp án đúng là **B** ➔ điền `1`
   * Nếu đáp án đúng là **C** ➔ điền `2`
   * Nếu đáp án đúng là **D** ➔ điền `3`
2. **Thêm câu hỏi mới**: Bạn chỉ cần copy nguyên khối `{ id: ..., question: ..., ... }` dán xuống dưới cùng của danh sách (nhớ thêm dấu phẩy `,` ngăn cách giữa các câu). Hệ thống sẽ tự động gộp vào ngân hàng bốc đề ngẫu nhiên!
