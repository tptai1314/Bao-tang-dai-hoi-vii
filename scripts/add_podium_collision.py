with open('js/app.js', 'r', encoding='utf-8') as f:
    text = f.read()

podium_func = """// CHẶN VA CHẠM VỚI BỤC HIỆN VẬT TRUNG TÂM VÀ KIOSK (KHÔNG THỂ XUYÊN QUA)
function isCollidingWithPodium(x, z) {
  // 1. Phòng 1: Bục tủ kính tem phiếu tại (0, 0)
  if (Math.abs(x) < 1.25 && Math.abs(z) < 0.85) return true;
  // Kiosk P1 trái & phải tại (-2.2, 1.5) và (2.2, 1.5)
  if (Math.abs(x - (-2.2)) < 0.55 && Math.abs(z - 1.5) < 0.45) return true;
  if (Math.abs(x - 2.2) < 0.55 && Math.abs(z - 1.5) < 0.45) return true;

  // 2. Phòng 2: Bục sách Cương lĩnh mạ vàng tại (30, 0)
  if (Math.abs(x - 30) < 1.35 && Math.abs(z) < 1.35) return true;
  // Kiosk P2 trái & phải tại (27.8, 1.5) và (32.2, 1.5)
  if (Math.abs(x - 27.8) < 0.55 && Math.abs(z - 1.5) < 0.45) return true;
  if (Math.abs(x - 32.2) < 0.55 && Math.abs(z - 1.5) < 0.45) return true;

  // 3. Phòng 3: Bục quả địa cầu đối ngoại tại (60, 0)
  if (Math.abs(x - 60) < 1.35 && Math.abs(z) < 1.35) return true;
  // Kiosk P3 trái & phải tại (57.8, 1.5) và (62.2, 1.5)
  if (Math.abs(x - 57.8) < 0.55 && Math.abs(z - 1.5) < 0.45) return true;
  if (Math.abs(x - 62.2) < 0.55 && Math.abs(z - 1.5) < 0.45) return true;

  // 4. Phòng 4: Bục 3 cột mốc thời gian VI-VII-VIII tại (90, 0)
  if (Math.abs(x - 90) < 1.65 && Math.abs(z) < 0.75) return true;
  // Kiosk P4 trái & phải tại (87.8, 1.5) và (92.2, 1.5)
  if (Math.abs(x - 87.8) < 0.55 && Math.abs(z - 1.5) < 0.45) return true;
  if (Math.abs(x - 92.2) < 0.55 && Math.abs(z - 1.5) < 0.45) return true;

  // 5. Phòng Quiz: Bục đài biểu tượng Sao Vàng tại (120, 0)
  if (Math.abs(x - 120) < 1.15 && Math.abs(z) < 1.15) return true;

  return false;
}

// 12. VA CHẠM TƯỜNG & VẬT CẢN (COLLISION CHO 4 PHÒNG TUYẾN TÍNH + QUIZ)
function isPositionWalkable(x, z) {
  // Không cho phép bước xuyên qua các bục hiện vật và bàn kiosk
  if (isCollidingWithPodium(x, z)) return false;"""

target_header = """// 12. VA CHẠM TƯỜNG (COLLISION CHO 4 PHÒNG TUYẾN TÍNH + QUIZ)
function isPositionWalkable(x, z) {"""

text = text.replace(target_header.replace('\n', '\r\n'), podium_func.replace('\n', '\r\n'))
text = text.replace(target_header, podium_func)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Updated js/app.js with podium collision!")

