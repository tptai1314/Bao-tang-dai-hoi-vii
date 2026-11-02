with open('css/style.css', 'r', encoding='utf-8') as f:
    text = f.read()

target = """.modal-close {
  position: absolute;
  top: 14px;
  right: 18px;
  background: transparent;
  border: none;
  font-size: 28px;
  color: var(--text-muted);
  cursor: pointer;
  transition: color 0.2s;
  z-index: 10;
}

.modal-close:hover {
  color: #fff;
}"""

replacement = """.modal-close {
  position: absolute;
  top: 14px;
  right: 18px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #e2e8f0;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.modal-close:hover {
  color: #fff;
  background: rgba(220, 38, 38, 0.85);
  border-color: #ef4444;
  transform: scale(1.1);
}"""

text = text.replace(target.replace('\n', '\r\n'), replacement.replace('\n', '\r\n'))
text = text.replace(target, replacement)

with open('css/style.css', 'w', encoding='utf-8') as f:
    f.write(text)

print("Updated css/style.css successfully!")

