import re
import json

def update_index_html():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Add photo-meta-tag under period-tag
    target_media = """          <img id="modal-image" src="" alt="Ảnh hiện vật">
          <div class="period-tag" id="modal-period">Phòng 1: Bối cảnh lịch sử</div>"""

    replacement_media = """          <img id="modal-image" src="" alt="Ảnh hiện vật">
          <div class="period-tag" id="modal-period">Phòng 1: Bối cảnh lịch sử</div>
          <div class="photo-meta-tag" id="modal-photo-meta">
            📷 <span id="modal-photo-meta-text">Năm: 1991 | Nguồn: TTXVN / dangcongsan.vn</span>
          </div>"""

    if target_media in html:
        html = html.replace(target_media, replacement_media, 1)
        print("Updated modal-media in index.html.")
    else:
        # Regex replacement if whitespace differs
        pat = re.compile(r'<img id="modal-image"[^>]*>.*?<div class="period-tag" id="modal-period">.*?</div>', re.DOTALL)
        if pat.search(html):
            html = pat.sub("""<img id="modal-image" src="" alt="Ảnh hiện vật">
          <div class="period-tag" id="modal-period">Phòng 1: Bối cảnh lịch sử</div>
          <div class="photo-meta-tag" id="modal-photo-meta">
            📷 <span id="modal-photo-meta-text">Năm: 1991 | Nguồn: TTXVN / dangcongsan.vn</span>
          </div>""", html, count=1)
            print("Updated modal-media in index.html via regex.")
        else:
            print("Warning: target_media not found in index.html")

    # Add doc-quote-card right under analysis-box
    target_analysis = """          <!-- KHỐI PHÂN TÍCH CHUYÊN SÂU & SO SÁNH VỚI ĐẠI HỘI VI -->
          <div class="analysis-box" id="modal-analysis-container">
            <div class="analysis-header">
              <span class="analysis-icon">🔍</span> <strong>PHÂN TÍCH & ĐỘT PHÁ LÝ LUẬN:</strong>
            </div>
            <p id="modal-analysis-text">Nội dung phân tích đối chiếu...</p>
          </div>"""

    replacement_analysis = """          <!-- KHỐI TRÍCH ĐOẠN NGẮN VĂN KIỆN ĐẢNG CHÍNH THỐNG (1 - 2 CÂU) -->
          <div class="doc-quote-card" id="modal-doc-quote-container">
            <div class="doc-quote-title">📜 TRÍCH ĐOẠN VĂN KIỆN ĐẢNG:</div>
            <blockquote class="doc-quote-content" id="modal-doc-quote">"..."</blockquote>
            <div class="doc-quote-ref" id="modal-doc-quote-ref">— Văn kiện Đại hội VII của Đảng, 1991</div>
          </div>

          <!-- KHỐI PHÂN TÍCH CHUYÊN SÂU & SO SÁNH VỚI ĐẠI HỘI VI -->
          <div class="analysis-box" id="modal-analysis-container">
            <div class="analysis-header">
              <span class="analysis-icon">🔍</span> <strong>PHÂN TÍCH & ĐỘT PHÁ LÝ LUẬN:</strong>
            </div>
            <p id="modal-analysis-text">Nội dung phân tích đối chiếu...</p>
          </div>"""

    if target_analysis in html:
        html = html.replace(target_analysis, replacement_analysis, 1)
        print("Updated doc-quote-card in index.html.")
    else:
        print("Warning: target_analysis not found in index.html")

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)

def update_css():
    with open('css/style.css', 'r', encoding='utf-8') as f:
        css = f.read()

    new_styles = """
/* KHỐI CHÚ THÍCH NGUỒN ẢNH VÀ TRÍCH ĐOẠN VĂN KIỆN */
.photo-meta-tag {
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(217, 119, 6, 0.4);
  color: #fde047;
  font-size: 11.5px;
  padding: 5px 12px;
  border-radius: 6px;
  margin-top: 8px;
  display: block;
  line-height: 1.4;
}

.doc-quote-card {
  background: rgba(69, 10, 10, 0.35);
  border: 1px solid rgba(245, 158, 11, 0.35);
  border-left: 3px solid #f59e0b;
  border-radius: 0 8px 8px 0;
  padding: 10px 14px;
  margin-bottom: 12px;
}

.doc-quote-title {
  font-size: 11.5px;
  font-weight: 700;
  color: #fbbf24;
  margin-bottom: 4px;
  letter-spacing: 0.5px;
}

.doc-quote-content {
  font-size: 13.5px;
  font-style: italic;
  line-height: 1.5;
  color: #fef08a;
  margin: 0 0 6px 0;
}

.doc-quote-ref {
  font-size: 11.5px;
  color: #94a3b8;
  text-align: right;
  font-weight: 500;
}
"""
    if '.doc-quote-card' not in css:
        css += new_styles
        with open('css/style.css', 'w', encoding='utf-8') as f:
            f.write(css)
        print("Updated css/style.css with doc-quote-card and photo-meta-tag styles.")

def update_app_js():
    with open('js/app.js', 'r', encoding='utf-8') as f:
        code = f.read()

    target_open_modal = """  // Điền nội dung phân tích đối chiếu chuyên sâu
  const analysisEl = document.getElementById('modal-analysis-text');
  if (analysisEl) {
    analysisEl.textContent = item.analysisCompare || "Phân tích đối chiếu đang được cập nhật.";
  }"""

    replacement_open_modal = """  // Điền chú thích nguồn ảnh tư liệu và năm chụp
  const metaEl = document.getElementById('modal-photo-meta-text');
  if (metaEl) {
    const pYear = item.photoYear || item.period || "1991";
    const pSource = item.photoSource || "Bảo tàng Lịch sử Quốc gia / TTXVN / dangcongsan.vn";
    metaEl.textContent = `Năm: ${pYear} | Nguồn: ${pSource}`;
  }

  // Điền trích đoạn ngắn văn kiện Đảng chính thống (1 - 2 câu)
  const docQuoteEl = document.getElementById('modal-doc-quote');
  const docQuoteRefEl = document.getElementById('modal-doc-quote-ref');
  const docQuoteBox = document.getElementById('modal-doc-quote-container');
  if (docQuoteEl && docQuoteBox) {
    if (item.docQuote) {
      docQuoteBox.classList.remove('hidden');
      docQuoteEl.textContent = `"${item.docQuote}"`;
      if (docQuoteRefEl) docQuoteRefEl.textContent = `— ${item.docQuoteSource || "Văn kiện Đại hội VII của Đảng, 1991"}`;
    } else {
      docQuoteBox.classList.add('hidden');
    }
  }

  // Điền nội dung phân tích đối chiếu chuyên sâu
  const analysisEl = document.getElementById('modal-analysis-text');
  if (analysisEl) {
    analysisEl.textContent = item.analysisCompare || "Phân tích đối chiếu đang được cập nhật.";
  }"""

    if target_open_modal in code:
        code = code.replace(target_open_modal, replacement_open_modal, 1)
        print("Updated openExhibitModal in js/app.js.")
    else:
        print("Warning: target_open_modal not found in js/app.js.")

    with open('js/app.js', 'w', encoding='utf-8') as f:
        f.write(code)

if __name__ == '__main__':
    update_index_html()
    update_css()
    update_app_js()

