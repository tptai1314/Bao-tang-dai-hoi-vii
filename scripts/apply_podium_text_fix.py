with open('js/app.js', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update createHotspotKiosks
old_kiosk = """// TẠO HAI KIOSK TRA CỨU KIOSK TRA CỨU CHUYÊN ĐỀ HAI BÊN BỤC TRUNG TÂM (LAYER 5)
function createHotspotKiosks(roomKey, cx, group) {
  if (typeof HOTSPOTS_DATA === 'undefined') return;
  const hotspots = HOTSPOTS_DATA.filter(h => h.room === roomKey);

  hotspots.forEach(h => {
    const kioskGroup = new THREE.Group();
    kioskGroup.position.set(h.position.x, 0, h.position.z);

    // Bục chân đế bằng đá granite xám than
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.4,
      metalness: 0.6
    });
    createBox(0, 0.425, 0, 0.75, 0.85, 0.5, baseMat, kioskGroup);

    // Màn hình console nghiêng 35 độ
    const consoleGeo = new THREE.BoxGeometry(0.78, 0.52, 0.08);
    const consoleMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.3,
      metalness: 0.8
    });
    const consoleMesh = new THREE.Mesh(consoleGeo, consoleMat);
    consoleMesh.position.set(0, 0.95, 0.05);
    consoleMesh.rotation.x = -Math.PI / 5;
    kioskGroup.add(consoleMesh);

    // Mặt kính màn hình hiển thị nội dung tra cứu
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 512;
    screenCanvas.height = 340;
    const sCtx = screenCanvas.getContext('2d');

    const sGrad = sCtx.createLinearGradient(0, 0, 512, 340);
    sGrad.addColorStop(0, '#0c4a6e');
    sGrad.addColorStop(1, '#082f49');
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 512, 340);

    sCtx.strokeStyle = '#38bdf8';
    sCtx.lineWidth = 6;
    sCtx.strokeRect(6, 6, 500, 328);

    sCtx.fillStyle = '#38bdf8';
    sCtx.font = 'bold 22px Arial';
    sCtx.textAlign = 'center';
    sCtx.fillText(h.label, 256, 45);

    sCtx.fillStyle = '#ffffff';
    sCtx.font = 'bold 20px Arial';
    wrapText(sCtx, h.title, 256, 110, 470, 28);

    sCtx.fillStyle = '#fde047';
    sCtx.font = 'bold 18px Arial';
    sCtx.fillText('👉 BẤM CHUỘT HOẶC PHÍM [E] ĐỂ XEM', 256, 290);

    const screenTex = new THREE.CanvasTexture(screenCanvas);
    const screenMat = new THREE.MeshBasicMaterial({ map: screenTex });
    const screenMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.72, 0.46), screenMat);
    screenMesh.position.set(0, 0, 0.045);
    consoleMesh.add(screenMesh);

    // Ánh sáng phát quang dịu (glow light)
    const glowLight = new THREE.PointLight(0x38bdf8, 0.9, 3.5);
    glowLight.position.set(0, 1.2, 0);
    kioskGroup.add(glowLight);

    // Gán dữ liệu tương tác để raycaster và click mở modal tra cứu
    consoleMesh.userData = {
      ...h,
      isHotspot: true
    };

    group.add(kioskGroup);
    exhibitsMeshes.push(consoleMesh);
  });
}"""

new_kiosk = """// TẠO HAI KIOSK TRA CỨU KIOSK TRA CỨU CHUYÊN ĐỀ HAI BÊN BỤC TRUNG TÂM (LAYER 5)
function createHotspotKiosks(roomKey, cx, group) {
  if (typeof HOTSPOTS_DATA === 'undefined') return;
  const hotspots = HOTSPOTS_DATA.filter(h => h.room === roomKey);

  hotspots.forEach(h => {
    const kioskGroup = new THREE.Group();
    kioskGroup.position.set(h.position.x, 0, h.position.z);

    // Xoay bục kiosk hướng về phía lối đi người xem để phiến chữ đón trọn tầm nhìn
    kioskGroup.rotation.y = (h.position.x < cx) ? (Math.PI - 0.28) : (Math.PI + 0.28);

    // Bục chân đế bằng đá granite xám than (hạ chiều cao xuống 0.68m để phiến chữ phía trên không bị che)
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.4,
      metalness: 0.6
    });
    createBox(0, 0.34, 0, 0.70, 0.68, 0.46, baseMat, kioskGroup);

    // Cột đỡ cổ nghiêng console
    const neckMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.7, roughness: 0.3 });
    createBox(0, 0.72, 0.02, 0.36, 0.10, 0.24, neckMat, kioskGroup);

    // Màn hình console nghiêng 30 độ (đặt cao tại y = 0.90m, hoàn toàn nổi trên bục đá, không bị chìm)
    const consoleGeo = new THREE.BoxGeometry(0.76, 0.48, 0.08);
    const consoleMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.3,
      metalness: 0.8
    });
    const consoleMesh = new THREE.Mesh(consoleGeo, consoleMat);
    consoleMesh.position.set(0, 0.90, 0.02);
    consoleMesh.rotation.x = -Math.PI / 6;
    kioskGroup.add(consoleMesh);

    // Mặt kính màn hình hiển thị nội dung tra cứu (kích thước chuẩn, không bị lẹm viền)
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 512;
    screenCanvas.height = 340;
    const sCtx = screenCanvas.getContext('2d');

    const sGrad = sCtx.createLinearGradient(0, 0, 512, 340);
    sGrad.addColorStop(0, '#0c4a6e');
    sGrad.addColorStop(1, '#082f49');
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 512, 340);

    sCtx.strokeStyle = '#38bdf8';
    sCtx.lineWidth = 6;
    sCtx.strokeRect(6, 6, 500, 328);

    sCtx.fillStyle = '#38bdf8';
    sCtx.font = 'bold 20px Arial';
    sCtx.textAlign = 'center';
    sCtx.fillText(h.label, 256, 38);

    sCtx.fillStyle = '#ffffff';
    sCtx.font = 'bold 19px Arial';
    wrapText(sCtx, h.title, 256, 85, 450, 26);

    sCtx.fillStyle = '#fde047';
    sCtx.font = 'bold 17px Arial';
    sCtx.fillText('👉 BẤM CHUỘT HOẶC PHÍM [E] ĐỂ XEM', 256, 265);

    const screenTex = new THREE.CanvasTexture(screenCanvas);
    const screenMat = new THREE.MeshBasicMaterial({ map: screenTex });
    const screenMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.70, 0.42), screenMat);
    screenMesh.position.set(0, 0, 0.046);
    consoleMesh.add(screenMesh);

    // Ánh sáng phát quang dịu (glow light)
    const glowLight = new THREE.PointLight(0x38bdf8, 1.1, 4.0);
    glowLight.position.set(0, 1.25, 0);
    kioskGroup.add(glowLight);

    // Gán dữ liệu tương tác để raycaster và click mở modal tra cứu
    consoleMesh.userData = {
      ...h,
      isHotspot: true
    };

    group.add(kioskGroup);
    exhibitsMeshes.push(consoleMesh);
  });
}"""

# 2. Update createRoom1Centerpiece
old_room1 = """// Phòng 1: Tủ kính Tem phiếu & Sổ gạo (x = 0, z = 0)
function createRoom1Centerpiece() {
  const group = new THREE.Group();
  group.position.set(0, 0, 0);

  const woodBase = createBox(0, 0.45, 0, 2.2, 0.9, 1.4, new THREE.MeshStandardMaterial({ color: 0x1c1917, roughness: 0.6 }), group);
  
  const glassMat = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.35, roughness: 0.1, metalness: 0.2 });
  const glassCase = createBox(0, 1.4, 0, 2.0, 1.0, 1.2, glassMat, group);

  const couponGeo = new THREE.PlaneGeometry(0.7, 0.45);
  const couponMat = new THREE.MeshBasicMaterial({ color: 0xfef08a, side: THREE.DoubleSide });
  const coupon1 = new THREE.Mesh(couponGeo, couponMat);
  coupon1.position.set(-0.4, 0.95, 0);
  coupon1.rotation.x = -Math.PI / 4;
  group.add(coupon1);

  const coupon2 = new THREE.Mesh(couponGeo, couponMat);
  coupon2.position.set(0.4, 0.95, 0);
  coupon2.rotation.x = -Math.PI / 4;
  group.add(coupon2);

  const light = new THREE.PointLight(0xfef08a, 1.6, 6);
  light.position.set(0, 1.5, 0);
  group.add(light);

  roomGroups.room1.add(group);
}"""

new_room1 = """// Phòng 1: Tủ kính Tem phiếu & Sổ gạo (x = 0, z = 0)
function createRoom1Centerpiece() {
  const group = new THREE.Group();
  group.position.set(0, 0, 0);

  // Bục gỗ chân đế tủ kính
  const woodBase = createBox(0, 0.40, 0, 2.2, 0.8, 1.4, new THREE.MeshStandardMaterial({ color: 0x1c1917, roughness: 0.6 }), group);
  
  // Tủ kính trong suốt cao ráo (đáy tủ y = 0.80m)
  const glassMat = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.35, roughness: 0.1, metalness: 0.2 });
  const glassCase = createBox(0, 1.35, 0, 2.0, 1.1, 1.2, glassMat, group);

  // 2 Giá đỡ nghiêng sang trọng đặt bên trong tủ kính (y = 0.92m, nổi trên mặt bục gỗ)
  const standMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.2 });
  createBox(-0.48, 0.90, 0, 0.72, 0.12, 0.46, standMat, group);
  createBox(0.48, 0.90, 0, 0.72, 0.12, 0.46, standMat, group);

  // Phiến 1: Tem phiếu lương thực (gạo) thời bao cấp có in chữ rõ nét
  const couponCanvas1 = document.createElement('canvas');
  couponCanvas1.width = 512;
  couponCanvas1.height = 320;
  const cCtx1 = couponCanvas1.getContext('2d');
  cCtx1.fillStyle = '#fef3c7';
  cCtx1.fillRect(0, 0, 512, 320);
  cCtx1.strokeStyle = '#b45309';
  cCtx1.lineWidth = 6;
  cCtx1.strokeRect(8, 8, 496, 304);
  cCtx1.fillStyle = '#78350f';
  cCtx1.font = 'bold 24px Arial';
  cCtx1.textAlign = 'center';
  cCtx1.fillText('PHIẾU MUA LƯƠNG THỰC', 256, 55);
  cCtx1.font = 'bold 20px Arial';
  cCtx1.fillText('GẠO TẺ - ĐỊNH LƯỢNG 13KG', 256, 105);
  cCtx1.fillStyle = '#991b1b';
  cCtx1.font = 'bold 32px Arial';
  cCtx1.fillText('★ THỜI KỲ BAO CẤP ★', 256, 175);
  cCtx1.fillStyle = '#78350f';
  cCtx1.font = 'italic 18px Arial';
  cCtx1.fillText('Hiện vật lịch sử trước Đổi mới (1986)', 256, 245);
  const couponTex1 = new THREE.CanvasTexture(couponCanvas1);

  // Phiến 2: Sổ mua hàng tiêu dùng mậu dịch quốc doanh có in chữ rõ nét
  const couponCanvas2 = document.createElement('canvas');
  couponCanvas2.width = 512;
  couponCanvas2.height = 320;
  const cCtx2 = couponCanvas2.getContext('2d');
  cCtx2.fillStyle = '#fef3c7';
  cCtx2.fillRect(0, 0, 512, 320);
  cCtx2.strokeStyle = '#b45309';
  cCtx2.lineWidth = 6;
  cCtx2.strokeRect(8, 8, 496, 304);
  cCtx2.fillStyle = '#78350f';
  cCtx2.font = 'bold 24px Arial';
  cCtx2.textAlign = 'center';
  cCtx2.fillText('SỔ MUA HÀNG TIÊU DÙNG', 256, 55);
  cCtx2.font = 'bold 20px Arial';
  cCtx2.fillText('PHÂN PHỐI THEO TIÊU CHUẨN', 256, 105);
  cCtx2.fillStyle = '#991b1b';
  cCtx2.font = 'bold 30px Arial';
  cCtx2.fillText('★ MẬU DỊCH QUỐC DOANH ★', 256, 175);
  cCtx2.fillStyle = '#78350f';
  cCtx2.font = 'italic 18px Arial';
  cCtx2.fillText('Tư liệu hiện vật giai đoạn 1986 - 1990', 256, 245);
  const couponTex2 = new THREE.CanvasTexture(couponCanvas2);

  // Đặt 2 phiến tem phiếu cao ráo tại y = 1.05m, nghiêng 25 độ, hoàn toàn không bị bục che chữ
  const coupon1 = new THREE.Mesh(new THREE.PlaneGeometry(0.70, 0.44), new THREE.MeshBasicMaterial({ map: couponTex1, side: THREE.DoubleSide }));
  coupon1.position.set(-0.48, 1.05, 0.02);
  coupon1.rotation.x = -Math.PI / 6;
  group.add(coupon1);

  const coupon2 = new THREE.Mesh(new THREE.PlaneGeometry(0.70, 0.44), new THREE.MeshBasicMaterial({ map: couponTex2, side: THREE.DoubleSide }));
  coupon2.position.set(0.48, 1.05, 0.02);
  coupon2.rotation.x = -Math.PI / 6;
  group.add(coupon2);

  const light = new THREE.PointLight(0xfef08a, 1.8, 6);
  light.position.set(0, 1.6, 0);
  group.add(light);

  roomGroups.room1.add(group);
}"""

text = text.replace(old_kiosk.replace('\n', '\r\n'), new_kiosk.replace('\n', '\r\n'))
text = text.replace(old_kiosk, new_kiosk)

text = text.replace(old_room1.replace('\n', '\r\n'), new_room1.replace('\n', '\r\n'))
text = text.replace(old_room1, new_room1)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Updated js/app.js successfully!")

