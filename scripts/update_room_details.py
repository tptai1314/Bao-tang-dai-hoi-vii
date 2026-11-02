import re

def update_room_lights_and_centerpiece():
    with open('js/app.js', 'r', encoding='utf-8') as f:
        code = f.read()

    # 1. Update buildStandardRoom lighting per room
    old_light_snippet = """  // Đèn trần trung tâm
  const roomLight = new THREE.PointLight(0xfff7ed, 1.4, 15);
  roomLight.position.set(cx, 3.7, 0);
  group.add(roomLight);"""

    new_light_snippet = """  // Đèn trần với màu ánh sáng riêng biệt cho từng phòng theo quy chuẩn thiết kế
  const ROOM_LIGHT_COLORS = {
    room1: 0xcfd8dc, // Phòng 1: Xám lạnh (khó khăn, biến động lịch sử 1986 - 1990)
    room2: 0xfde047, // Phòng 2: Vàng ấm trang trọng (Đại hội VII, Cương lĩnh 1991)
    room3: 0x38bdf8, // Phòng 3: Trắng xanh hiện đại (Kinh tế thị trường & Mở rộng đối ngoại)
    room4: 0xfffbeb  // Phòng 4: Trắng ấm khải hoàn (Ra khỏi khủng hoảng, tiền đề CNH - HĐH)
  };
  const lightColor = ROOM_LIGHT_COLORS[config.key] || 0xfff7ed;
  const roomLight = new THREE.PointLight(lightColor, 1.5, 16);
  roomLight.position.set(cx, 3.7, 0);
  group.add(roomLight);"""

    if old_light_snippet in code:
        code = code.replace(old_light_snippet, new_light_snippet, 1)
        print("Updated per-room distinctive lighting.")
    else:
        print("Warning: old_light_snippet not found.")

    # 2. Update createRoom4Centerpiece to 3D Timeline Centerpiece (ĐH VI 1986 -> ĐH VII 1991 -> ĐH VIII 1996)
    old_p4_centerpiece = """// Phòng 4: Cổng vòm ánh sáng khải hoàn & Sổ lưu bút (x = 90, z = 0)
function createRoom4Centerpiece() {
  const group = new THREE.Group();
  group.position.set(90, 0, 0);

  const archMat = new THREE.MeshStandardMaterial({
    color: 0xfef08a,
    emissive: 0xfbbf24,
    emissiveIntensity: 0.8,
    roughness: 0.2
  });

  const p1 = createBox(-1.8, 1.8, 0, 0.4, 3.6, 0.4, archMat, group);
  const p2 = createBox(1.8, 1.8, 0, 0.4, 3.6, 0.4, archMat, group);
  const top = createBox(0, 3.6, 0, 4.0, 0.4, 0.4, archMat, group);

  const light = new THREE.PointLight(0xfffbeb, 2.5, 12);
  light.position.set(0, 2.5, 0);
  group.add(light);

  roomGroups.room4.add(group);
}"""

    new_p4_centerpiece = """// Phòng 4: Dòng thời gian 3D lịch sử nối Đại hội VI (1986) -> Đại hội VII (1991) -> Đại hội VIII (1996)
function createRoom4Centerpiece() {
  const group = new THREE.Group();
  group.position.set(90, 0, 0);

  // Thanh ray năng lượng dòng thời gian phát sáng
  const railGeo = new THREE.BoxGeometry(4.6, 0.08, 0.12);
  const railMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    emissive: 0xd97706,
    emissiveIntensity: 0.7,
    roughness: 0.2,
    metalness: 0.8
  });
  const rail = new THREE.Mesh(railGeo, railMat);
  rail.position.set(0, 0.9, 0);
  group.add(rail);

  // 3 Mốc lịch sử trên dòng thời gian
  const milestones = [
    {
      x: -1.7,
      year: "1986",
      name: "ĐẠI HỘI VI",
      sub: "Khởi xướng Đổi mới",
      color: 0x94a3b8,
      emissive: 0x475569,
      height: 1.1,
      fullDesc: "Đại hội VI (tháng 12/1986) nhìn thẳng vào sự thật, đánh giá đúng sự thật, nói rõ sự thật; khởi xướng đường lối Đổi mới toàn diện đất nước, xóa bỏ cơ chế tập trung quan liêu bao cấp.",
      citation: "Văn kiện Đại hội VI của Đảng, NXB Sự thật, 1987."
    },
    {
      x: 0,
      year: "1991",
      name: "ĐẠI HỘI VII",
      sub: "Cương lĩnh & Ổn định",
      color: 0xfbbf24,
      emissive: 0xd97706,
      height: 1.35,
      fullDesc: "Đại hội VII (tháng 6/1991) thông qua Cương lĩnh 1991, Chiến lược KT-XH đến 2000, khẳng định Tư tưởng Hồ Chí Minh là nền tảng tư tưởng và mở rộng quan hệ quốc tế, đưa đất nước vượt qua khủng hoảng.",
      citation: "Văn kiện Đại hội VII của Đảng, NXB Sự thật, 1991."
    },
    {
      x: 1.7,
      year: "1996",
      name: "ĐẠI HỘI VIII",
      sub: "Đẩy mạnh CNH, HĐH",
      color: 0x34d399,
      emissive: 0x059669,
      height: 1.15,
      fullDesc: "Đại hội VIII (tháng 6/1996) khẳng định nước ta đã ra khỏi khủng hoảng kinh tế - xã hội sau 10 năm Đổi mới; quyết định chuyển đất nước sang thời kỳ mới: đẩy mạnh công nghiệp hóa, hiện đại hóa.",
      citation: "Văn kiện Đại hội VIII của Đảng, NXB Chính trị quốc gia, 1996."
    }
  ];

  milestones.forEach((m) => {
    // Trụ mốc thời gian
    const pillarGeo = new THREE.CylinderGeometry(0.32, 0.38, m.height, 24);
    const pillarMat = new THREE.MeshStandardMaterial({
      color: m.color,
      emissive: m.emissive,
      emissiveIntensity: 0.5,
      roughness: 0.3,
      metalness: 0.7
    });
    const pillar = new THREE.Mesh(pillarGeo, pillarMat);
    pillar.position.set(m.x, m.height / 2, 0);
    group.add(pillar);

    // Quả cầu mốc thời gian trên đỉnh phát sáng
    const capGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const capMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: m.color,
      emissiveIntensity: 0.9
    });
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.set(m.x, m.height + 0.15, 0);
    group.add(cap);

    // Biển tên mốc thời gian xoay về hướng người xem
    const signCanvas = document.createElement('canvas');
    signCanvas.width = 256;
    signCanvas.height = 160;
    const sCtx = signCanvas.getContext('2d');
    sCtx.fillStyle = '#0f172a';
    sCtx.fillRect(0, 0, 256, 160);
    sCtx.strokeStyle = '#f59e0b';
    sCtx.lineWidth = 4;
    sCtx.strokeRect(4, 4, 248, 152);

    sCtx.fillStyle = '#fbbf24';
    sCtx.font = 'bold 36px Arial';
    sCtx.textAlign = 'center';
    sCtx.fillText(m.year, 128, 48);

    sCtx.fillStyle = '#ffffff';
    sCtx.font = 'bold 22px Arial';
    sCtx.fillText(m.name, 128, 92);

    sCtx.fillStyle = '#94a3b8';
    sCtx.font = '16px Arial';
    sCtx.fillText(m.sub, 128, 130);

    const signTex = new THREE.CanvasTexture(signCanvas);
    const signMat = new THREE.MeshBasicMaterial({ map: signTex, side: THREE.DoubleSide });
    const signMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.44), signMat);
    signMesh.position.set(m.x, m.height / 2 + 0.05, 0.39);
    group.add(signMesh);

    // Tương tác bấm vào mốc dòng thời gian
    pillar.userData = {
      title: `${m.name} (${m.year}) - ${m.sub}`,
      period: `Mốc lịch sử: ${m.year}`,
      fullDesc: m.fullDesc,
      analysisCompare: "Đại hội VII là mắt xích cầu nối mang tính quyết định lịch sử: kế thừa định hướng của Đại hội VI, bảo vệ vững chắc thành quả Đổi mới trong khủng hoảng, tạo lập nền tảng để Đại hội VIII tự tin tiến vào thời kỳ CNH, HĐH.",
      sourceCitation: m.citation,
      funFact: `Đại hội VII là đại hội đầu tiên trong lịch sử Đảng định hình trọn vẹn mô hình CNXH tại Việt Nam qua Cương lĩnh 1991.`,
      imageUrl: "assets/images/p4_ex3.jpg",
      isHotspot: true,
      label: `DÒNG THỜI GIAN: ${m.name}`
    };
    exhibitsMeshes.push(pillar);
  });

  // Spotlight rọi sáng bục dòng thời gian
  const timeLight = new THREE.PointLight(0xfef08a, 1.8, 8);
  timeLight.position.set(0, 2.4, 0);
  group.add(timeLight);

  roomGroups.room4.add(group);
}"""

    if old_p4_centerpiece in code:
        code = code.replace(old_p4_centerpiece, new_p4_centerpiece, 1)
        print("Updated createRoom4Centerpiece to 3D Timeline Centerpiece.")
    else:
        # Regex replacement if exact match differs by whitespace
        pat = re.compile(r'// Phòng 4: Cổng vòm ánh sáng khải hoàn.*?roomGroups\.room4\.add\(group\);\s*\}', re.DOTALL)
        if pat.search(code):
            code = pat.sub(new_p4_centerpiece, code, count=1)
            print("Updated createRoom4Centerpiece via regex.")
        else:
            print("Warning: old_p4_centerpiece not found.")

    with open('js/app.js', 'w', encoding='utf-8') as f:
        f.write(code)
    print("Room lights and centerpiece updated in js/app.js.")

if __name__ == '__main__':
    update_room_lights_and_centerpiece()

