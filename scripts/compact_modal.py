# Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

target_html = """        <div class="modal-media">
          <img id="modal-image" src="" alt="Ảnh hiện vật">
          <div class="period-tag" id="modal-period">Phòng 1: Bối cảnh lịch sử</div>
          <div class="photo-meta-tag" id="modal-photo-meta">
            📷 <span id="modal-photo-meta-text">Năm: 1991 | Nguồn: TTXVN / dangcongsan.vn</span>
          </div>
        </div>
        <div class="modal-body">
          <h2 id="modal-title">Tiêu đề hiện vật</h2>"""

replacement_html = """        <!-- Ảnh hiện vật ẩn đi để giao diện popup gọn gàng, tập trung vào nội dung đọc -->
        <div class="modal-media" style="display: none;">
          <img id="modal-image" src="" alt="Ảnh hiện vật">
        </div>
        <div class="modal-body">
          <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 12px; flex-wrap: wrap;">
            <span class="period-tag" id="modal-period" style="position: static; display: inline-block;">Phòng 1: Bối cảnh lịch sử</span>
            <span class="photo-meta-tag" id="modal-photo-meta" style="position: static; font-size: 12px; color: #cbd5e1; background: rgba(255,255,255,0.06); padding: 4px 10px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1);">
              📷 <span id="modal-photo-meta-text">Năm: 1991 | Nguồn: TTXVN / dangcongsan.vn</span>
            </span>
          </div>
          <h2 id="modal-title">Tiêu đề hiện vật</h2>"""

html = html.replace(target_html.replace('\n', '\r\n'), replacement_html.replace('\n', '\r\n'))
html = html.replace(target_html, replacement_html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated index.html successfully!")

# Update css/style.css
with open('css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

target_css = """.modal-box {
  background: var(--bg-card);
  border: var(--border-gold);
  border-radius: 16px;
  max-width: 820px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.9), 0 0 25px var(--gold-glow);
  padding: 28px;
}"""

replacement_css = """.modal-box {
  background: var(--bg-card);
  border: var(--border-gold);
  border-radius: 16px;
  max-width: 680px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.9), 0 0 25px var(--gold-glow);
  padding: 24px 28px;
}"""

css = css.replace(target_css.replace('\n', '\r\n'), replacement_css.replace('\n', '\r\n'))
css = css.replace(target_css, replacement_css)

target_content_css = """/* Modal Hiện vật */
.modal-content {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 24px;
}

.modal-media {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  background: #000;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}"""

replacement_content_css = """/* Modal Hiện vật - Thiết kế gọn gàng, tập trung bài đọc */
.modal-content {
  display: block;
}

.modal-media {
  display: none !important;
}"""

css = css.replace(target_content_css.replace('\n', '\r\n'), replacement_content_css.replace('\n', '\r\n'))
css = css.replace(target_content_css, replacement_content_css)

with open('css/style.css', 'w', encoding='utf-8') as f:
    f.write(css)
print("Updated css/style.css successfully!")

