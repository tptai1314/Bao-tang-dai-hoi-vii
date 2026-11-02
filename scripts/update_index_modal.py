with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

target = """          <!-- TRÍCH DẪN NGUỒN CHÍNH THỐNG -->
          <div class="citation-box" id="modal-citation-container">
            <span class="citation-icon">📖</span> <strong>Nguồn tư liệu:</strong> <span id="modal-citation-text">Văn kiện Đại hội VII</span>
          </div>
        </div>
      </div>
    </div>
  </div>"""

replacement = """          <!-- TRÍCH DẪN NGUỒN CHÍNH THỐNG -->
          <div class="citation-box" id="modal-citation-container">
            <span class="citation-icon">📖</span> <strong>Nguồn tư liệu:</strong> <span id="modal-citation-text">Văn kiện Đại hội VII</span>
          </div>

          <!-- NÚT ĐÓNG TIỆN LỢI Ở ĐÁY CỬA SỔ -->
          <button id="btn-close-modal-bottom" class="btn-primary" style="margin-top: 20px; width: 100%; justify-content: center; background: linear-gradient(135deg, #78350f, #92400e); border: 1px solid #f59e0b; color: #fef08a; font-weight: bold; padding: 12px; border-radius: 8px; cursor: pointer;">
            ✕ ĐÓNG CỬA SỔ XEM TƯ LIỆU [ESC]
          </button>
        </div>
      </div>
    </div>
  </div>"""

text = text.replace(target.replace('\n', '\r\n'), replacement.replace('\n', '\r\n'))
text = text.replace(target, replacement)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("Updated index.html successfully!")

