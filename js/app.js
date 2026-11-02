// LOGIC ĐIỀU HÀNH BẢO TÀNG ẢO 3D THREE.JS: ĐẠI HỘI VII (1991)
// Cấu trúc: Hành lang tuyến tính 4 Phòng Chuyên Đề + Phòng Quiz (cách nhau 30m trên trục X)
// Tâm: P1(0,0,0) -> P2(30,0,0) -> P3(60,0,0) -> P4(90,0,0) -> Quiz(120,0,0)

// Biến toàn cục Three.js
let scene, camera, renderer, controls;
let exhibitsMeshes = [];
let doorMeshes = [];
let roomGroups = {
  room1: null,
  room2: null,
  room3: null,
  room4: null,
  quiz: null
};
let raycaster, mouse;
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
let canJump = false;
let velocity = new THREE.Vector3();
let direction = new THREE.Vector3();
let prevTime = performance.now();
let activeInteractExhibit = null;
let activeInteractDoor = null;
let currentlyHighlightedMesh = null;
let rotatingGlobe = null;
let quizEmblemMesh = null;
let lastTeleportTime = 0; // Chống lặp teleport khi vừa bước qua cửa

// Biến trạng thái Quiz & Thí sinh
let currentQuizIdx = 0;
let quizScore = 0;
let quizAnswered = false;
let candidateName = "Khách tham quan";

// Biến trạng thái Tour Tự Động (Auto Guided Tour)
let isAutoTour = false;
let autoTourIndex = 0;
let autoTourTimer = null;

const AUTO_TOUR_STOPS = [
  { x: -3.8, y: 1.6, z: 0, lookAt: [0, 1.6, 0], roomKey: "room1", name: "Phòng 1: Bối cảnh lịch sử", text: "Chào mừng quý khách đến với Phòng 1: Bối cảnh lịch sử đất nước sau 5 năm Đổi mới với lạm phát 3 con số và khủng hoảng dữ dội ở Liên Xô và Đông Âu." },
  { x: 26.2, y: 1.6, z: 0, lookAt: [30, 1.6, 0], roomKey: "room2", name: "Phòng 2: Nội dung Đại hội & Cương lĩnh 1991", text: "Phòng 2: Đại hội diễn ra tại Hà Nội, bầu đồng chí Đỗ Mười làm Tổng Bí thư và thông qua Cương lĩnh 1991 khẳng định Tư tưởng Hồ Chí Minh là nền tảng tư tưởng của Đảng." },
  { x: 56.2, y: 1.6, z: 0, lookAt: [60, 1.6, 0], roomKey: "room3", name: "Phòng 3: Chiến lược & Đối ngoại", text: "Phòng 3: Chiến lược kinh tế hàng hóa nhiều thành phần, kiềm chế lạm phát thành công và tuyên bố lịch sử Việt Nam muốn là bạn với tất cả các nước, phá thế bao vây cô lập." },
  { x: 86.2, y: 1.6, z: 0, lookAt: [90, 1.6, 0], roomKey: "room4", name: "Phòng 4: Kết quả & Ý nghĩa lịch sử", text: "Phòng 4: Đất nước phục hồi kỳ diệu với GDP tăng 8,2% mỗi năm, giữ vững ổn định chính trị, tạo tiền đề lịch sử chuyển sang thời kỳ đẩy mạnh công nghiệp hóa, hiện đại hóa." },
  { x: 118.0, y: 1.6, z: 0, lookAt: [120, 1.6, 0], roomKey: "quiz", name: "Phòng Quiz: Thử thách trắc nghiệm", text: "Điểm dừng chân cuối: Mời quý khách bước vào Phòng Thử Thách Trắc Nghiệm để củng cố tri thức và nhận Giấy chứng nhận vinh danh của Bảo tàng." }
];

// Khởi chạy khi tài nguyên HTML tải xong
window.addEventListener('DOMContentLoaded', () => {
  updateLoadingProgress(20, "Đang khởi tạo giao diện điều khiển...");
  initUI();
  updateLoadingProgress(40, "Đang khởi tạo không gian 3D Three.js...");
  initThreeJS();
  updateLoadingProgress(65, "Đang xây dựng hành lang 4 phòng tuyến tính...");
  createMuseumArchitecture();
  updateLoadingProgress(85, "Đang gắn tranh tư liệu & cửa thông phòng 3D...");
  loadAllExhibits();
  setupEventListeners();
  animate();
  finishLoading();
});

// THANH LOADING TIẾN ĐỘ TẢI
function updateLoadingProgress(percent, statusText) {
  const bar = document.getElementById('loading-bar');
  const text = document.getElementById('loading-text');
  if (bar) bar.style.width = `${percent}%`;
  if (text) text.textContent = `${statusText} (${percent}%)`;
}

function finishLoading() {
  updateLoadingProgress(100, "Không gian 3D đã sẵn sàng!");
  setTimeout(() => {
    const screen = document.getElementById('loading-screen');
    if (screen) {
      screen.style.opacity = '0';
      screen.style.pointerEvents = 'none';
      setTimeout(() => screen.classList.add('hidden'), 600);
    }
  }, 450);
}

// 1. KHỞI TẠO THREE.JS SCENE, CAMERA, RENDERER
function initThreeJS() {
  const container = document.getElementById('canvas-container');

  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0c10);
  scene.fog = new THREE.FogExp2(0x0a0c10, 0.015);

  // Tạo các Group phòng để quản lý tối ưu hiệu năng
  roomGroups.room1 = new THREE.Group();
  roomGroups.room2 = new THREE.Group();
  roomGroups.room3 = new THREE.Group();
  roomGroups.room4 = new THREE.Group();
  roomGroups.quiz = new THREE.Group();

  scene.add(roomGroups.room1);
  scene.add(roomGroups.room2);
  scene.add(roomGroups.room3);
  scene.add(roomGroups.room4);
  scene.add(roomGroups.quiz);

  // Camera xuất phát gần cửa vào Phòng 1 (x: -3.8, y: 1.6, z: 0) nhìn về tâm phòng 1 (+X)
  camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(-3.8, 1.6, 0);
  camera.lookAt(0, 1.6, 0);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  // Controls (PointerLockControls)
  controls = new THREE.PointerLockControls(camera, document.body);

  // Tinh chỉnh chống chóng mặt (Anti-dizziness / Motion Comfort)
  controls.disconnect();
  const _eulerLook = new THREE.Euler(0, 0, 0, 'YXZ');
  const _PI_2 = Math.PI / 2;
  const MOUSE_SENSITIVITY = 0.0011; // Giảm 45% so với 0.002 mặc định giúp lia camera êm ái, chống say

  document.addEventListener('mousemove', (event) => {
    if (!controls.isLocked) return;
    const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
    const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

    _eulerLook.setFromQuaternion(camera.quaternion);
    _eulerLook.y -= movementX * MOUSE_SENSITIVITY;
    _eulerLook.x -= movementY * MOUSE_SENSITIVITY;
    _eulerLook.x = Math.max(_PI_2 - controls.maxPolarAngle, Math.min(_PI_2 - controls.minPolarAngle, _eulerLook.x));
    camera.quaternion.setFromEuler(_eulerLook);
    controls.dispatchEvent({ type: 'change' });
  }, false);

  document.addEventListener('pointerlockchange', () => {
    if (document.pointerLockElement === document.body) {
      controls.isLocked = true;
      controls.dispatchEvent({ type: 'lock' });
    } else {
      controls.isLocked = false;
      controls.dispatchEvent({ type: 'unlock' });
    }
  }, false);

  // Ánh sáng chung
  const ambientLight = new THREE.AmbientLight(0xfff5e6, 0.95);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0xffffff, 0.6);
  mainLight.position.set(30, 25, 20);
  scene.add(mainLight);

  // Raycaster để phát hiện tương tác
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2(0, 0);
}

// 2. TẠO TEXTURE TỰ ĐỘNG BẰNG CANVAS
function createParquetTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#221914';
  ctx.fillRect(0, 0, 512, 512);

  ctx.strokeStyle = '#3d2b20';
  ctx.lineWidth = 4;
  for (let i = 0; i < 512; i += 64) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 512);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(512, i);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(5, 4);
  return texture;
}

function createWallTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#1e232d';
  ctx.fillRect(0, 0, 256, 256);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    ctx.fillRect(x, y, 4, 4);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 2);
  return texture;
}

// 3. XÂY DỰNG KIẾN TRÚC BẢO TÀNG THEO HÀNH LANG TUYẾN TÍNH
function createMuseumArchitecture() {
  const floorTexture = createParquetTexture();
  const wallTexture = createWallTexture();

  const floorMaterial = new THREE.MeshStandardMaterial({
    map: floorTexture,
    roughness: 0.35,
    metalness: 0.1
  });

  const wallMaterial = new THREE.MeshStandardMaterial({
    map: wallTexture,
    roughness: 0.8
  });

  const ceilingMaterial = new THREE.MeshStandardMaterial({
    color: 0x12151c,
    roughness: 0.9
  });

  // Dựng 4 phòng triển lãm chính (Rộng 10m x Sâu 8m x Cao 4m)
  // Tâm: P1(0,0,0), P2(30,0,0), P3(60,0,0), P4(90,0,0)
  const mainRooms = [
    { key: "room1", cx: 0, hasEntrance: true, hasExit: true, exitTitle: "► SANG PHÒNG 2", nextRoom: "room2", prevRoom: null },
    { key: "room2", cx: 30, hasEntrance: true, hasExit: true, exitTitle: "► SANG PHÒNG 3", nextRoom: "room3", prevRoom: "room1" },
    { key: "room3", cx: 60, hasEntrance: true, hasExit: true, exitTitle: "► SANG PHÒNG 4", nextRoom: "room4", prevRoom: "room2" },
    { key: "room4", cx: 90, hasEntrance: true, hasExit: true, exitTitle: "► VÀO PHÒNG QUIZ", nextRoom: "quiz", prevRoom: "room3" }
  ];

  mainRooms.forEach(r => {
    buildStandardRoom(r, floorMaterial, ceilingMaterial, wallMaterial);
  });

  // Dựng Phòng Quiz (Tâm: x = 120, z = 0 | Kích thước 6m x 6m x 3m)
  buildQuizRoom(floorMaterial, ceilingMaterial, wallMaterial);

  // Hiện vật trung tâm đặt giữa mỗi phòng (x = center.x, z = 0)
  createRoom1Centerpiece();
  createRoom2Centerpiece();
  createRoom3Centerpiece();
  createRoom4Centerpiece();
  createQuizCenterpiece();
}

// Dựng một phòng chuẩn 10m x 8m x 4m
function buildStandardRoom(config, floorMat, ceilMat, wallMat) {
  const group = roomGroups[config.key];
  const cx = config.cx;

  // Sàn (10 x 8)
  const floorMesh = createBox(cx, -0.05, 0, 10, 0.1, 8, floorMat, group);
  floorMesh.receiveShadow = true;

  // Thảm đỏ chạy ngang lối đi (10 x 2)
  const carpetMat = new THREE.MeshStandardMaterial({ color: 0x881337, roughness: 0.8 });
  createBox(cx, 0.01, 0, 10, 0.02, 2.0, carpetMat, group);

  // Trần (10 x 8) cao 4m
  createBox(cx, 4.05, 0, 10, 0.1, 8, ceilMat, group);

  // Đèn trần với màu ánh sáng riêng biệt cho từng phòng theo quy chuẩn thiết kế
  const ROOM_LIGHT_COLORS = {
    room1: 0xcfd8dc, // Phòng 1: Xám lạnh (khó khăn, biến động lịch sử 1986 - 1990)
    room2: 0xfde047, // Phòng 2: Vàng ấm trang trọng (Đại hội VII, Cương lĩnh 1991)
    room3: 0x38bdf8, // Phòng 3: Trắng xanh hiện đại (Kinh tế thị trường & Mở rộng đối ngoại)
    room4: 0xfffbeb  // Phòng 4: Trắng ấm khải hoàn (Ra khỏi khủng hoảng, tiền đề CNH - HĐH)
  };
  const lightColor = ROOM_LIGHT_COLORS[config.key] || 0xfff7ed;
  const roomLight = new THREE.PointLight(lightColor, 1.5, 16);
  roomLight.position.set(cx, 3.7, 0);
  group.add(roomLight);

  // TƯỜNG SAU (z = -4.1) & TƯỜNG TRƯỚC (z = 4.1)
  createBox(cx, 2.0, -4.1, 10, 4.0, 0.2, wallMat, group);
  createBox(cx, 2.0, 4.1, 10, 4.0, 0.2, wallMat, group);

  // TƯỜNG TRÁI (x = cx - 5.1): Cửa vào rộng 1.5m, cao 2.5m ở giữa (z: [-0.75, 0.75])
  createBox(cx - 5.1, 2.0, -2.375, 0.2, 4.0, 3.25, wallMat, group); // Vách Bắc
  createBox(cx - 5.1, 2.0, 2.375, 0.2, 4.0, 3.25, wallMat, group);  // Vách Nam
  createBox(cx - 5.1, 3.25, 0, 0.2, 1.5, 1.5, wallMat, group);       // Lanh-tô trên cửa

  // TƯỜNG PHẢI (x = cx + 5.1): Cửa ra rộng 1.5m, cao 2.5m ở giữa (z: [-0.75, 0.75])
  createBox(cx + 5.1, 2.0, -2.375, 0.2, 4.0, 3.25, wallMat, group); // Vách Bắc
  createBox(cx + 5.1, 2.0, 2.375, 0.2, 4.0, 3.25, wallMat, group);  // Vách Nam
  createBox(cx + 5.1, 3.25, 0, 0.2, 1.5, 1.5, wallMat, group);       // Lanh-tô trên cửa

  // CỬA RA (Tường phải, x = cx + 5.0)
  if (config.hasExit) {
    createInteractiveDoor({
      id: `door_exit_${config.key}`,
      roomKey: config.key,
      pos: [cx + 4.95, 1.25, 0],
      rot: [0, -Math.PI / 2, 0],
      title: config.exitTitle,
      subtitle: "Bấm chuột hoặc bước qua cửa để tiếp tục",
      targetRoom: config.nextRoom,
      group: group,
      isNext: true
    });
  }

  // CỬA VÀO (Tường trái, x = cx - 5.0)
  if (config.prevRoom) {
    createInteractiveDoor({
      id: `door_back_${config.key}`,
      roomKey: config.key,
      pos: [cx - 4.95, 1.25, 0],
      rot: [0, Math.PI / 2, 0],
      title: `◄ QUAY LẠI ${config.prevRoom.toUpperCase()}`,
      subtitle: "Bấm chuột để trở về phòng trước",
      targetRoom: config.prevRoom,
      group: group,
      isNext: false
    });
  } else if (config.key === "room1") {
    // Biển đón chào tại cửa vào Phòng 1
    createDoorSignboard(
      "CỬA VÀO TRIỂN LÃM",
      "ĐẠI HỘI VII CỦA ĐẢNG (1991)",
      [cx - 4.95, 2.8, 0],
      [0, Math.PI / 2, 0],
      false,
      group
    );
  }

  // LỚP 2: Bảng chủ đề lớn giữa tường sau
  createThemeSignboard(config.key, cx, group);

  // LỚP 5: Kiosk tra cứu Kiosk tra cứu chuyên đề
  createHotspotKiosks(config.key, cx, group);

  // LỚP 6: Trạm loa thuyết minh góc phòng
  createSpeakerStation(config.key, cx, group);
}

// TẠO BẢNG CHỦ ĐỀ LỚN Ở TƯỜNG SAU (LAYER 2)
function createThemeSignboard(roomKey, cx, group) {
  if (typeof ROOM_THEMES === 'undefined' || !ROOM_THEMES[roomKey]) return;
  const theme = ROOM_THEMES[roomKey];

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 240;
  const ctx = canvas.getContext('2d');

  // Nền đỏ nhung cờ Đảng sang trọng
  const grad = ctx.createLinearGradient(0, 0, 1024, 240);
  grad.addColorStop(0, '#581c87');
  grad.addColorStop(0.5, '#7f1d1d');
  grad.addColorStop(1, '#581c87');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 240);

  // Khung viền vàng đồng kép
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 8;
  ctx.strokeRect(6, 6, 1012, 228);
  ctx.strokeStyle = '#fde047';
  ctx.lineWidth = 2;
  ctx.strokeRect(16, 16, 992, 208);

  ctx.textAlign = 'center';

  // Tiêu đề lớn
  ctx.fillStyle = '#fef08a';
  ctx.font = 'bold 34px Arial';
  ctx.fillText(theme.title, 512, 85);

  // Khẩu hiệu chủ đề
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 21px Arial';
  ctx.fillText(theme.sub, 512, 155);

  // Dòng chân biểu trưng
  ctx.fillStyle = '#fde047';
  ctx.font = 'italic 16px Arial';
  ctx.fillText('⭐ KHÔNG GIAN BẢO TÀNG LỊCH SỬ ĐẢNG CỘNG SẢN VIỆT NAM ⭐', 512, 205);

  const texture = new THREE.CanvasTexture(canvas);
  const mat = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
  const geo = new THREE.PlaneGeometry(3.8, 0.9);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(cx, 2.85, -3.95);
  group.add(mesh);

  // Spotlight chiếu sáng bảng chủ đề
  const boardLight = new THREE.SpotLight(0xfef08a, 1.2);
  boardLight.position.set(cx, 3.8, -2.5);
  boardLight.target = mesh;
  boardLight.angle = Math.PI / 4;
  boardLight.penumbra = 0.5;
  group.add(boardLight);
}

// TẠO HAI KIOSK TRA CỨU KIOSK TRA CỨU CHUYÊN ĐỀ HAI BÊN BỤC TRUNG TÂM (LAYER 5)
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
}

// TẠO TRẠM LOA THUYẾT MINH GÓC PHÒNG (LAYER 6)
function createSpeakerStation(roomKey, cx, group) {
  if (typeof ROOM_THEMES === 'undefined' || !ROOM_THEMES[roomKey]) return;
  const theme = ROOM_THEMES[roomKey];

  const spkGroup = new THREE.Group();
  spkGroup.position.set(cx - 4.2, 0, -3.2);

  // Chân đế kim loại tròn
  const baseGeo = new THREE.CylinderGeometry(0.3, 0.35, 0.06, 24);
  const baseMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.2 });
  const baseMesh = new THREE.Mesh(baseGeo, baseMat);
  baseMesh.position.y = 0.03;
  spkGroup.add(baseMesh);

  // Trụ đứng
  const poleGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.35, 16);
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.9, roughness: 0.2 });
  const poleMesh = new THREE.Mesh(poleGeo, poleMat);
  poleMesh.position.y = 0.7;
  spkGroup.add(poleMesh);

  // Hộp loa thuyết minh
  const boxGeo = new THREE.BoxGeometry(0.55, 0.65, 0.2);
  const boxMat = new THREE.MeshStandardMaterial({ color: 0x064e3b, metalness: 0.5, roughness: 0.3 });
  const boxMesh = new THREE.Mesh(boxGeo, boxMat);
  boxMesh.position.set(0, 1.5, 0);
  boxMesh.rotation.y = Math.PI / 4; // Quay chéo hướng về trung tâm phòng
  spkGroup.add(boxMesh);

  // Mặt hiển thị loa phát thanh
  const spkCanvas = document.createElement('canvas');
  spkCanvas.width = 512;
  spkCanvas.height = 512;
  const spkCtx = spkCanvas.getContext('2d');

  spkCtx.fillStyle = '#064e3b';
  spkCtx.fillRect(0, 0, 512, 512);

  spkCtx.strokeStyle = '#34d399';
  spkCtx.lineWidth = 10;
  spkCtx.strokeRect(8, 8, 496, 496);

  spkCtx.font = '90px Arial';
  spkCtx.textAlign = 'center';
  spkCtx.fillText('🔊', 256, 150);

  spkCtx.fillStyle = '#a7f3d0';
  spkCtx.font = 'bold 36px Arial';
  spkCtx.fillText('TRẠM THUYẾT MINH', 256, 240);

  spkCtx.fillStyle = '#ffffff';
  spkCtx.font = 'bold 24px Arial';
  wrapText(spkCtx, theme.title, 256, 310, 460, 32);

  spkCtx.fillStyle = '#fde047';
  spkCtx.font = 'bold 22px Arial';
  spkCtx.fillText('▶ BẤM HOẶC [E] ĐỂ NGHE', 256, 440);

  const spkTex = new THREE.CanvasTexture(spkCanvas);
  const spkFaceMat = new THREE.MeshBasicMaterial({ map: spkTex });
  const spkFaceMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.58), spkFaceMat);
  spkFaceMesh.position.set(0, 0, 0.105);
  boxMesh.add(spkFaceMesh);

  // Đèn tín hiệu xanh lá phát sáng
  const spkLight = new THREE.PointLight(0x34d399, 1.2, 4.0);
  spkLight.position.set(0, 1.7, 0);
  spkGroup.add(spkLight);

  // Gán userData
  boxMesh.userData = {
    isSpeaker: true,
    title: "Thuyết minh: " + theme.title,
    audioIntro: theme.audioIntro,
    roomKey: roomKey
  };

  group.add(spkGroup);
  exhibitsMeshes.push(boxMesh);
}

// Dựng Phòng Quiz (Tâm: x = 120, z = 0 | Kích thước 6m x 6m x 3m)

// ============================================================================
// MÀN HÌNH BẢNG XẾP HẠNG 3D TRONG PHÒNG QUIZ (REALTIME DIGITAL SCREEN - 2K HD)
// ============================================================================
let lbCanvas = null;
let lbContext = null;
let lbTexture3D = null;

function create3DLeaderboardScreen(cx, group) {
  lbCanvas = document.createElement('canvas');
  lbCanvas.width = 2048;
  lbCanvas.height = 1536;
  lbContext = lbCanvas.getContext('2d');

  lbTexture3D = new THREE.CanvasTexture(lbCanvas);
  lbTexture3D.generateMipmaps = true;
  lbTexture3D.minFilter = THREE.LinearMipmapLinearFilter;
  lbTexture3D.magFilter = THREE.LinearFilter;
  if (renderer && renderer.capabilities) {
    lbTexture3D.anisotropy = renderer.capabilities.getMaxAnisotropy();
  }

  // Màn hình hiển thị LED 3D sắc nét tuyệt đối
  const screenMat = new THREE.MeshBasicMaterial({ map: lbTexture3D });
  const screenGeo = new THREE.PlaneGeometry(4.2, 2.8);
  const screenMesh = new THREE.Mesh(screenGeo, screenMat);
  
  // Đặt ở tường đối diện cửa vào (Tường Đông x = 122.95), hướng thẳng về phía người chơi
  screenMesh.position.set(cx + 2.95, 1.5, 0);
  screenMesh.rotation.y = -Math.PI / 2;
  group.add(screenMesh);

  // Khung viền kim loại cho màn hình
  const frameMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8, roughness: 0.2 });
  createBox(cx + 2.97, 1.5, 0, 0.04, 2.9, 4.3, frameMat, group);

  // Đăng ký tương tác bấm vào màn hình để mở popup chi tiết
  screenMesh.userData = {
    isLeaderboardScreen: true,
    title: "BẢNG VINH DANH THỜI GIAN THỰC (REALTIME)",
    shortDesc: "Nhấp chuột để mở chi tiết Bảng xếp hạng và danh sách thí sinh!"
  };
  doorMeshes.push(screenMesh);

  // Vẽ dữ liệu nếu đã có
  if (typeof currentLeaderboardData !== 'undefined' && currentLeaderboardData.length > 0) {
    drawLeaderboardOnCanvas(currentLeaderboardData);
  } else {
    drawLeaderboardOnCanvas([]);
  }
}

function update3DLeaderboard(data) {
  if (!lbContext || !lbTexture3D) return;
  drawLeaderboardOnCanvas(data);
  lbTexture3D.needsUpdate = true;
}

function drawLeaderboardOnCanvas(data) {
  if (!lbContext) return;
  const ctx = lbContext;
  const w = 2048;
  const h = 1536;

  // Nền đỏ đô sang trọng kết hợp gradient công nghệ
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, '#2d060a');
  grad.addColorStop(0.5, '#150305');
  grad.addColorStop(1, '#08090c');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Viền vàng kim tuyến 2 lớp sắc nét
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 14;
  ctx.strokeRect(20, 20, w - 40, h - 40);

  ctx.strokeStyle = 'rgba(254, 240, 138, 0.3)';
  ctx.lineWidth = 4;
  ctx.strokeRect(34, 34, w - 68, h - 68);

  // Tiêu đề chính
  ctx.fillStyle = '#fef08a';
  ctx.font = 'bold 76px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🏆 BẢNG VINH DANH THỜI GIAN THỰC 🏆', w / 2, 130);

  // Phụ đề
  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif';
  ctx.fillText('THỬ THÁCH TRI THỨC ĐẠI HỘI VII (1991) • ĐỒNG BỘ TRỰC TIẾP FIREBASE', w / 2, 200);

  // Thanh tiêu đề bảng
  const tableY = 260;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.fillRect(80, tableY, w - 160, 84);

  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 36px Arial, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('HẠNG', 120, tableY + 56);
  ctx.fillText('HỌ VÀ TÊN', 380, tableY + 56);
  ctx.textAlign = 'center';
  ctx.fillText('ĐIỂM SỐ', 1480, tableY + 56);
  ctx.fillText('TỐC ĐỘ', 1780, tableY + 56);

  // Hiển thị danh sách Top 7
  const list = (data && data.length > 0) ? data.slice(0, 7) : [
    { name: "Đang tải dữ liệu từ máy chủ...", score: 10, timeSpent: 30 }
  ];

  let currentY = tableY + 98;
  list.forEach((item, idx) => {
    // Màu nền từng hàng
    if (idx === 0) ctx.fillStyle = 'rgba(245, 158, 11, 0.28)';
    else if (idx === 1) ctx.fillStyle = 'rgba(148, 163, 184, 0.20)';
    else if (idx === 2) ctx.fillStyle = 'rgba(180, 83, 9, 0.22)';
    else ctx.fillStyle = (idx % 2 === 0) ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.08)';

    ctx.fillRect(80, currentY, w - 160, 96);

    // Huy hiệu hạng
    ctx.font = 'bold 44px Arial, sans-serif';
    ctx.textAlign = 'left';
    let rankText = `#${idx + 1}`;
    if (idx === 0) rankText = '🥇 TOP 1';
    else if (idx === 1) rankText = '🥈 TOP 2';
    else if (idx === 2) rankText = '🥉 TOP 3';

    ctx.fillStyle = (idx === 0) ? '#fef08a' : ((idx === 1) ? '#e2e8f0' : ((idx === 2) ? '#fed7aa' : '#94a3b8'));
    ctx.fillText(rankText, 120, currentY + 62);

    // Tên thí sinh
    ctx.font = 'bold 42px Arial, sans-serif';
    ctx.fillStyle = '#ffffff';
    let nameStr = item.name || 'Khách tham quan';
    if (nameStr.length > 25) nameStr = nameStr.substring(0, 24) + '...';
    ctx.fillText(nameStr, 380, currentY + 62);

    // Điểm số
    ctx.textAlign = 'center';
    ctx.font = 'bold 46px Arial, sans-serif';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(`${item.score} / 10`, 1480, currentY + 62);

    // Thời gian làm bài
    ctx.font = '36px Arial, sans-serif';
    ctx.fillStyle = '#cbd5e1';
    const timeStr = item.timeSpent ? `${item.timeSpent}s` : '--';
    ctx.fillText(timeStr, 1780, currentY + 62);

    currentY += 108;
  });

  // Footer nhắc nhở tương tác
  ctx.fillStyle = '#34d399';
  ctx.font = 'bold 40px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('► BẤM VÀO MÀN HÌNH ĐỂ MỞ BẢNG XẾP HẠNG CHI TIẾT ◄', w / 2, h - 60);
}

function buildQuizRoom(floorMat, ceilMat, wallMat) {
  const group = roomGroups.quiz;
  const cx = 120;

  // Sàn (6 x 6)
  createBox(cx, -0.05, 0, 6, 0.1, 6, floorMat, group);

  // Trần cao 3m
  createBox(cx, 3.05, 0, 6, 0.1, 6, ceilMat, group);

  // Phòng Quiz sử dụng ánh sáng môi trường khuếch tán tự nhiên của bảo tàng, đã bỏ hoàn toàn bóng đèn chói

  // Tường sau (z = -3.1) & Tường trước (z = 3.1)
  createBox(cx, 1.5, -3.1, 6, 3.0, 0.2, wallMat, group);
  createBox(cx, 1.5, 3.1, 6, 3.0, 0.2, wallMat, group);

  // Tường phải (x = 123.1, đóng kín)
  createBox(cx + 3.1, 1.5, 0, 0.2, 3.0, 6, wallMat, group);

  // Tường trái (x = 116.9): Cửa vào từ Phòng 4 (rộng 1.5m, cao 2.5m)
  createBox(cx - 3.1, 1.5, -1.875, 0.2, 3.0, 2.25, wallMat, group); // Vách Bắc
  createBox(cx - 3.1, 1.5, 1.875, 0.2, 3.0, 2.25, wallMat, group);  // Vách Nam
  createBox(cx - 3.1, 2.75, 0, 0.2, 0.5, 1.5, wallMat, group);       // Lanh-tô trên cửa

  // Cửa quay lại Phòng 4
  createInteractiveDoor({
    id: "door_back_room4",
    roomKey: "quiz",
    pos: [cx - 2.95, 1.25, 0],
    rot: [0, Math.PI / 2, 0],
    title: "◄ QUAY LẠI PHÒNG 4",
    subtitle: "Kết quả & Ý nghĩa lịch sử",
    targetRoom: "room4",
    group: group,
    isNext: false
  });

  // Bảng chữ lớn treo tường sau phòng Quiz
  createQuizBackdropSign(cx, group);
  create3DLeaderboardScreen(cx, group);
}

// Tạo Bảng vinh danh sau lưng phòng Quiz
function createQuizBackdropSign(cx, group) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 360;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#450a0a';
  ctx.fillRect(0, 0, 1024, 360);

  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 10;
  ctx.strokeRect(8, 8, 1008, 344);

  ctx.fillStyle = '#fef08a';
  ctx.font = 'bold 36px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('★ KHÔNG GIAN THỬ THÁCH TRẮC NGHIỆM LỊCH SỬ ★', 512, 80);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 26px Arial';
  ctx.fillText('ĐẠI HỘI ĐẠI BIỂU TOÀN QUỐC LẦN THỨ VII CỦA ĐẢNG (1991)', 512, 140);

  ctx.fillStyle = '#cbd5e1';
  ctx.font = 'italic 20px Arial';
  ctx.fillText('Vượt qua 6 câu hỏi then chốt để kiểm tra kiến thức và nhận Giấy chứng nhận vinh danh!', 512, 210);

  ctx.fillStyle = '#34d399';
  ctx.font = 'bold 22px Arial';
  ctx.fillText('► BẤM VÀO BỤC TRUNG TÂM HOẶC NHẤN [E] ĐỂ BẮT ĐẦU ◄', 512, 290);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  if (renderer && renderer.capabilities) {
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  }
  const mat = new THREE.MeshBasicMaterial({ map: texture });
  const geo = new THREE.PlaneGeometry(4.8, 1.8);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(cx, 1.7, -2.95);
  group.add(mesh);
}

// 4. HIỆN VẬT TRUNG TÂM TẠI 4 PHÒNG & QUIZ
// Phòng 1: Tủ kính Tem phiếu & Sổ gạo (x = 0, z = 0)
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
}

// Phòng 2: Bục sách Cương lĩnh 1991 mạ vàng 3D mở sẵn (x = 30, z = 0)
function createRoom2Centerpiece() {
  const group = new THREE.Group();
  group.position.set(30, 0, 0);

  const baseGeo = new THREE.CylinderGeometry(1.4, 1.6, 0.9, 24);
  const baseMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.3, metalness: 0.4 });
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.y = 0.45;
  group.add(base);

  const bookMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.2, metalness: 0.8 });
  const leftPage = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.08, 1.4), bookMat);
  leftPage.position.set(-0.5, 1.15, 0);
  leftPage.rotation.z = 0.15;
  group.add(leftPage);

  const rightPage = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.08, 1.4), bookMat);
  rightPage.position.set(0.5, 1.15, 0);
  rightPage.rotation.z = -0.15;
  group.add(rightPage);

  const bookLight = new THREE.PointLight(0xfef08a, 1.8, 8);
  bookLight.position.set(0, 2.0, 0);
  group.add(bookLight);

  roomGroups.room2.add(group);
}

// Phòng 3: Bục quả cầu đối ngoại 3D phát sáng xoay (x = 60, z = 0)
function createRoom3Centerpiece() {
  const group = new THREE.Group();
  group.position.set(60, 0, 0);

  const baseGeo = new THREE.CylinderGeometry(1.4, 1.6, 0.8, 24);
  const baseMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4 });
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.y = 0.4;
  group.add(base);

  const sphereGeo = new THREE.SphereGeometry(0.75, 32, 32);
  const sphereMat = new THREE.MeshStandardMaterial({
    color: 0x1d4ed8,
    emissive: 0x1e3a8a,
    emissiveIntensity: 0.6,
    roughness: 0.2,
    metalness: 0.8
  });
  const sphere = new THREE.Mesh(sphereGeo, sphereMat);
  sphere.position.y = 1.6;
  group.add(sphere);
  rotatingGlobe = sphere;

  const ringGeo = new THREE.TorusGeometry(1.1, 0.04, 16, 64);
  const ringMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.9, roughness: 0.1 });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.position.y = 1.6;
  ring.rotation.x = Math.PI / 3;
  group.add(ring);

  const light = new THREE.PointLight(0x60a5fa, 2.0, 8);
  light.position.set(0, 2.4, 0);
  group.add(light);

  roomGroups.room3.add(group);
}

// Phòng 4: Dòng thời gian 3D lịch sử nối Đại hội VI (1986) -> Đại hội VII (1991) -> Đại hội VIII (1996)
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
      imageUrl: (m.year === 1986) ? "assets/images/p1_centerpiece_dh6_1986.jpg" : ((m.year === 1991) ? "assets/images/extra_dh7_toancanh.jpg" : "assets/images/p4_b_mau_dich.webp"),
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
}

// Phòng Quiz: Bục đài vinh danh Quiz 3D (x = 120, z = 0)
function createQuizCenterpiece() {
  const group = new THREE.Group();
  group.position.set(120, 0, 0);

  const baseGeo = new THREE.CylinderGeometry(1.2, 1.4, 0.7, 24);
  const baseMat = new THREE.MeshStandardMaterial({ color: 0x670d10, roughness: 0.3, metalness: 0.6 });
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.y = 0.35;
  group.add(base);

  const emblemGeo = new THREE.OctahedronGeometry(0.5, 1);
  const emblemMat = new THREE.MeshStandardMaterial({
    color: 0xd97706,
    roughness: 0.35,
    metalness: 0.8
  });
  const emblem = new THREE.Mesh(emblemGeo, emblemMat);
  emblem.position.y = 1.25;
  group.add(emblem);
  quizEmblemMesh = emblem;

  // Đối tượng tương tác bấm vào bục để mở bài trắc nghiệm
  const clickBox = createBox(0, 0.8, 0, 1.6, 1.6, 1.6, new THREE.MeshBasicMaterial({ visible: false }), group);
  clickBox.userData = {
    isQuizPodium: true,
    title: "BỤC THỬ THÁCH TRẮC NGHIỆM ĐẠI HỘI VII",
    shortDesc: "Nhấp chuột để mở giao diện làm bài Quiz 6 câu hỏi và nhận Huy hiệu!"
  };
  doorMeshes.push(clickBox);

// Đã bỏ đèn chiếu xuống gắt trên bục

  roomGroups.quiz.add(group);
}

// 5. TẠO CỬA THÔNG PHÒNG TƯƠNG TÁC (INTERACTIVE DOORWAY)
function createInteractiveDoor(doorConfig) {
  const { id, roomKey, pos, rot, title, subtitle, targetRoom, group, isNext } = doorConfig;

  // Biển hiệu phía trên cửa
  createDoorSignboard(title, subtitle, [pos[0], pos[1] + 1.4, pos[2]], rot, !isNext, group);

  // Khung viền cửa 3D
  const frameMat = new THREE.MeshStandardMaterial({
    color: isNext ? 0xb45309 : 0x065f46,
    metalness: 0.8,
    roughness: 0.2
  });

  const doorGroup = new THREE.Group();
  doorGroup.position.set(pos[0], pos[1], pos[2]);
  doorGroup.rotation.set(rot[0], rot[1], rot[2]);

  // Cột trái, cột phải, thanh trên
  createBox(-0.75, 0, 0, 0.1, 2.5, 0.1, frameMat, doorGroup);
  createBox(0.75, 0, 0, 0.1, 2.5, 0.1, frameMat, doorGroup);
  createBox(0, 1.25, 0, 1.6, 0.1, 0.1, frameMat, doorGroup);

  // Mặt portal phát sáng bán trong suốt để click
  const portalGeo = new THREE.PlaneGeometry(1.4, 2.4);
  const portalMat = new THREE.MeshStandardMaterial({
    color: isNext ? 0xf59e0b : 0x10b981,
    emissive: isNext ? 0xd97706 : 0x059669,
    emissiveIntensity: 0.5,
    transparent: true,
    opacity: 0.45,
    side: THREE.DoubleSide
  });
  const portalMesh = new THREE.Mesh(portalGeo, portalMat);
  portalMesh.position.y = 0;
  doorGroup.add(portalMesh);

  portalMesh.userData = {
    isDoor: true,
    doorId: id,
    targetRoom: targetRoom,
    title: title,
    shortDesc: subtitle
  };

  group.add(doorGroup);
  doorMeshes.push(portalMesh);
}

function createDoorSignboard(title, subtitle, pos, rot, isBack, group) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 160;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = isBack ? '#064e3b' : '#670d10';
  ctx.fillRect(0, 0, 512, 160);

  ctx.strokeStyle = isBack ? '#34d399' : '#f59e0b';
  ctx.lineWidth = 8;
  ctx.strokeRect(6, 6, 500, 148);

  ctx.fillStyle = isBack ? '#a7f3d0' : '#fef08a';
  ctx.font = 'bold 26px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(title, 256, 65);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 18px Arial';
  ctx.fillText(subtitle, 256, 115);

  const texture = new THREE.CanvasTexture(canvas);
  const mat = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
  const geo = new THREE.PlaneGeometry(2.4, 0.75);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(pos[0], pos[1], pos[2]);
  mesh.rotation.set(rot[0], rot[1], rot[2]);
  group.add(mesh);
}

function createBox(x, y, z, w, h, d, mat, parent) {
  const geo = new THREE.BoxGeometry(w, h, d);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(x, y, z);
  parent.add(mesh);
  return mesh;
}

// 6. GẮN TOÀN BỘ TRANH TƯ LIỆU THỰC TẾ VÀO TƯỜNG PHÒNG (LAYER 4)
function loadAllExhibits() {
  const textureLoader = new THREE.TextureLoader();

  EXHIBITS_DATA.forEach((item) => {
    const parentGroup = roomGroups[item.room];
    if (!parentGroup) return;

    // Khung tranh vàng đồng kích thước 2.2m x 1.45m sang trọng
    const frameGeo = new THREE.BoxGeometry(2.2, 1.45, 0.08);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x926c15,
      metalness: 0.8,
      roughness: 0.3
    });
    const frame = new THREE.Mesh(frameGeo, frameMat);
    frame.position.set(item.position.x, item.position.y, item.position.z);
    frame.rotation.set(item.rotation[0], item.rotation[1], item.rotation[2]);

    // Canvas texture vẽ bản xem trước / fallback
    const canvasTexture = generateExhibitArtworkCanvas(item.title, item.period, item.shortDesc);
    const picMat = new THREE.MeshBasicMaterial({ map: canvasTexture });
    const picGeo = new THREE.PlaneGeometry(2.02, 1.28);
    const picMesh = new THREE.Mesh(picGeo, picMat);
    picMesh.position.z = 0.045;
    frame.add(picMesh);

    // Tải ảnh thực tế cục bộ từ assets/images/
    if (item.imageUrl) {
      textureLoader.load(
        item.imageUrl,
        (loadedTex) => {
          loadedTex.generateMipmaps = true;
          loadedTex.minFilter = THREE.LinearMipmapLinearFilter;
          picMat.map = loadedTex;
          picMat.needsUpdate = true;
        },
        undefined,
        (err) => {
          console.warn(`Fallback to canvas artwork for ${item.id}:`, err);
        }
      );
    }

    // Bảng tên hiện vật gắn bên dưới khung tranh (Plaque)
    const plaqueCanvas = document.createElement('canvas');
    plaqueCanvas.width = 512;
    plaqueCanvas.height = 96;
    const pCtx = plaqueCanvas.getContext('2d');
    pCtx.fillStyle = '#1c1917';
    pCtx.fillRect(0, 0, 512, 96);
    pCtx.strokeStyle = '#d97706';
    pCtx.lineWidth = 4;
    pCtx.strokeRect(4, 4, 504, 88);
    pCtx.fillStyle = '#fef08a';
    pCtx.font = 'bold 20px Arial';
    pCtx.textAlign = 'center';
    pCtx.fillText(item.title.substring(0, 36), 256, 40);
    pCtx.fillStyle = '#94a3b8';
    pCtx.font = 'italic 16px Arial';
    pCtx.fillText('Bấm hoặc phím [E] để xem tư liệu chi tiết', 256, 74);

    const plaqueTex = new THREE.CanvasTexture(plaqueCanvas);
    const plaqueMat = new THREE.MeshBasicMaterial({ map: plaqueTex });
    const plaqueMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.28), plaqueMat);
    plaqueMesh.position.set(0, -0.92, 0.045);
    frame.add(plaqueMesh);

    frame.userData = item;
    parentGroup.add(frame);
    exhibitsMeshes.push(frame);

    // Spotlight chiếu sáng hiện vật (hướng rọi tính theo mặt trước hoặc sau tường)
    const spotLight = new THREE.SpotLight(0xfff3d6, 1.2);
    const zOffset = (item.position.z > 0) ? -2.2 : 2.2;
    spotLight.position.set(item.position.x, 3.8, item.position.z + zOffset);
    spotLight.target = frame;
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.5;
    parentGroup.add(spotLight);
  });
}

function generateExhibitArtworkCanvas(title, period, shortDesc) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 360;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createLinearGradient(0, 0, 512, 360);
  gradient.addColorStop(0, '#450a0a');
  gradient.addColorStop(1, '#1c1917');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 360);

  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 6;
  ctx.strokeRect(6, 6, 500, 348);

  ctx.fillStyle = '#fde047';
  ctx.font = 'bold 13px Arial';
  ctx.fillText(period.toUpperCase(), 30, 42);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 20px Arial';
  wrapText(ctx, title, 30, 85, 452, 28);

  ctx.fillStyle = '#cbd5e1';
  ctx.font = 'italic 15px Arial';
  wrapText(ctx, `"${shortDesc}"`, 256, 260, 440, 22);

  ctx.fillStyle = '#eab308';
  ctx.font = 'bold 13px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('► NHẤN ĐỂ MỞ CHI TIẾT & NGHE THUYẾT MINH', 256, 325);

  return new THREE.CanvasTexture(canvas);
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

// 7. CÁC SỰ KIỆN ĐIỀU KHIỂN & GIAO DIỆN
function setupEventListeners() {
  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);

  document.addEventListener('click', (e) => {
    // Chỉ kích hoạt tương tác 3D khi chuột đang khóa ngắm (trong không gian 3D)
    // Tránh việc bấm nút đóng popup mà bị nhận diện nhầm thành click mở lại hiện vật
    if (controls.isLocked) {
      if (activeInteractExhibit) {
        if (activeInteractExhibit.isSpeaker) {
          handleSpeakerClick(activeInteractExhibit);
        } else {
          openExhibitModal(activeInteractExhibit);
        }
      } else if (activeInteractDoor) {
        handleDoorClick(activeInteractDoor);
      }
    }
  });

  const clickResume = document.getElementById('click-to-resume');
  if (clickResume) {
    clickResume.addEventListener('click', () => {
      const welcomeScreen = document.getElementById('welcome-screen');
      if (welcomeScreen && !welcomeScreen.classList.contains('hidden')) return;
      if (!isAnyModalOpen() && !controls.isLocked && !isAutoTour) {
        controls.lock();
      }
    });
  }

  const canvasContainer = document.getElementById('canvas-container');
  if (canvasContainer) {
    canvasContainer.addEventListener('click', () => {
      const welcomeScreen = document.getElementById('welcome-screen');
      if (welcomeScreen && !welcomeScreen.classList.contains('hidden')) return;
      if (!isAnyModalOpen() && !controls.isLocked && !isAutoTour) {
        controls.lock();
      }
    });
  }

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        if (overlay.id === 'exhibit-modal') closeExhibitModal();
        else if (overlay.id === 'teleport-modal') toggleTeleportModal();
        else if (overlay.id === 'quiz-modal') closeQuizModal();
        else if (overlay.id === 'reference-modal') toggleReferenceModal();
      }
    });
  });

  controls.addEventListener('unlock', () => {
    const hint = document.getElementById('click-to-resume');
    const welcomeScreen = document.getElementById('welcome-screen');
    const isWelcome = welcomeScreen && !welcomeScreen.classList.contains('hidden');
    if (hint && !isAnyModalOpen() && !isAutoTour && !isWelcome) {
      hint.classList.remove('hidden');
    }
  });

  controls.addEventListener('lock', () => {
    const hint = document.getElementById('click-to-resume');
    if (hint) hint.classList.add('hidden');
  });

  window.addEventListener('resize', onWindowResize);
}

function handleSpeakerClick(speakerData) {
  soundManager.playClickSound();
  if (soundManager.isSpeaking) {
    soundManager.stopSpeech();
  } else {
    soundManager.speakText(speakerData.audioIntro);
  }
}

function handleDoorClick(doorData) {
  if (doorData.isQuizPodium) {
    openQuizModal();
    return;
  }
  if (doorData.isLeaderboardScreen) {
    document.getElementById('leaderboard-modal').classList.remove('hidden');
    if (controls.isLocked) controls.unlock();
    if (typeof renderLeaderboardUI === 'function') {
      renderLeaderboardUI(currentLeaderboardData);
    }
    return;
  }
  if (doorData.targetRoom) {
    soundManager.playClickSound();
    teleportTo(doorData.targetRoom);
  }
}

function onKeyDown(event) {
  switch (event.code) {
    case 'KeyW':
    case 'ArrowUp':
      moveForward = true;
      break;
    case 'KeyA':
    case 'ArrowLeft':
      moveLeft = true;
      break;
    case 'KeyS':
    case 'ArrowDown':
      moveBackward = true;
      break;
    case 'KeyD':
    case 'ArrowRight':
      moveRight = true;
      break;
    case 'Space':
      if (canJump === true && controls.isLocked) {
        velocity.y = 10.0;
        canJump = false;
      }
      break;
    case 'KeyE':
      if (activeInteractExhibit) {
        if (activeInteractExhibit.isSpeaker) {
          handleSpeakerClick(activeInteractExhibit);
        } else {
          openExhibitModal(activeInteractExhibit);
        }
      } else if (activeInteractDoor) {
        handleDoorClick(activeInteractDoor);
      }
      break;
    case 'KeyM':
      toggleTeleportModal();
      break;
    case 'Escape':
      if (!document.getElementById('exhibit-modal').classList.contains('hidden')) {
        closeExhibitModal();
      } else if (!document.getElementById('teleport-modal').classList.contains('hidden')) {
        toggleTeleportModal();
      } else if (!document.getElementById('quiz-modal').classList.contains('hidden')) {
        closeQuizModal();
      } else if (!document.getElementById('reference-modal').classList.contains('hidden')) {
        toggleReferenceModal();
      }
      break;
  }
}

function onKeyUp(event) {
  switch (event.code) {
    case 'KeyW':
    case 'ArrowUp':
      moveForward = false;
      break;
    case 'KeyA':
    case 'ArrowLeft':
      moveLeft = false;
      break;
    case 'KeyS':
    case 'ArrowDown':
      moveBackward = false;
      break;
    case 'KeyD':
    case 'ArrowRight':
      moveRight = false;
      break;
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// 8. KHỞI TẠO UI & MENU NHẢY PHÒNG
function initUI() {
  const btnStart = document.getElementById('btn-start');
  const chkBgm = document.getElementById('chk-bgm');
  const welcomeScreen = document.getElementById('welcome-screen');
  const hudOverlay = document.getElementById('hud-overlay');

  btnStart.addEventListener('click', () => {
    welcomeScreen.classList.add('hidden');
    hudOverlay.classList.remove('hidden');
    controls.lock();

    if (chkBgm.checked) {
      soundManager.startBGM();
    }
  });

  // 5 Nút trên thanh điều hướng đỉnh màn hình
  document.querySelectorAll('.nav-room-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const roomKey = btn.getAttribute('data-nav');
      teleportTo(roomKey);
    });
  });

  const btnToggleAudio = document.getElementById('btn-toggle-audio');
  btnToggleAudio.addEventListener('click', () => {
    const isPlaying = soundManager.toggleBGM();
    btnToggleAudio.textContent = isPlaying ? "🎵 Nhạc: Bật" : "🔇 Nhạc: Tắt";
  });

  document.getElementById('btn-open-map').addEventListener('click', toggleTeleportModal);
  document.getElementById('btn-close-teleport').addEventListener('click', toggleTeleportModal);

  document.querySelectorAll('.room-card').forEach(card => {
    card.addEventListener('click', () => {
      const targetKey = card.getAttribute('data-teleport');
      teleportTo(targetKey);
      toggleTeleportModal();
    });
  });

  const btnCloseModal = document.getElementById('btn-close-modal');

  if (btnCloseModal) {

    btnCloseModal.addEventListener('click', (e) => {

      e.stopPropagation();

      closeExhibitModal();

    });

  }

  const btnCloseModalBottom = document.getElementById('btn-close-modal-bottom');

  if (btnCloseModalBottom) {

    btnCloseModalBottom.addEventListener('click', (e) => {

      e.stopPropagation();

      closeExhibitModal();

    });

  }

  const btnSpeak = document.getElementById('btn-speak-voice');
  btnSpeak.addEventListener('click', () => {
    if (soundManager.isSpeaking) {
      soundManager.stopSpeech();
      btnSpeak.classList.remove('speaking');
      document.getElementById('speak-text').textContent = "Nghe thuyết minh";
    } else {
      const descText = document.getElementById('modal-desc').textContent;
      soundManager.speakText(descText, () => {
        btnSpeak.classList.add('speaking');
        document.getElementById('speak-text').textContent = "Đang đọc...";
      }, () => {
        btnSpeak.classList.remove('speaking');
        document.getElementById('speak-text').textContent = "Nghe thuyết minh";
      });
    }
  });

  document.getElementById('btn-close-quiz').addEventListener('click', closeQuizModal);

  const btnAutoTour = document.getElementById('btn-auto-tour');
  if (btnAutoTour) btnAutoTour.addEventListener('click', startAutoTour);
  const btnStopTour = document.getElementById('btn-stop-tour');
  if (btnStopTour) btnStopTour.addEventListener('click', stopAutoTour);

  document.getElementById('btn-start-quiz').addEventListener('click', startQuizSession);
  document.getElementById('btn-next-question').addEventListener('click', nextQuizQuestion);
  document.getElementById('btn-restart-quiz').addEventListener('click', startQuizSession);
  document.getElementById('btn-back-to-museum').addEventListener('click', () => {
    closeQuizModal();
    resumeExploration();
  });

  const btnDownloadCert = document.getElementById('btn-download-cert');
  if (btnDownloadCert) btnDownloadCert.addEventListener('click', downloadCertificatePNG);

  // Nút mở/đóng Thư mục nguồn & Tài liệu tham khảo
  const btnOpenRefs = document.getElementById('btn-open-refs');
  if (btnOpenRefs) btnOpenRefs.addEventListener('click', toggleReferenceModal);

  const btnCloseRefs = document.getElementById('btn-close-refs');
  if (btnCloseRefs) btnCloseRefs.addEventListener('click', toggleReferenceModal);

  renderBibliographyList();
}

// 9. HỆ THỐNG TOUR TỰ ĐỘNG
function startAutoTour() {
  if (isAutoTour) return;
  isAutoTour = true;
  autoTourIndex = 0;
  controls.unlock();
  document.getElementById('auto-tour-banner').classList.remove('hidden');
  runNextTourStop();
}

function stopAutoTour() {
  if (!isAutoTour) return;
  isAutoTour = false;
  if (autoTourTimer) clearTimeout(autoTourTimer);
  soundManager.stopSpeech();
  document.getElementById('auto-tour-banner').classList.add('hidden');
  resumeExploration();
}

function runNextTourStop() {
  if (!isAutoTour) return;
  if (autoTourIndex >= AUTO_TOUR_STOPS.length) {
    document.getElementById('tour-step-text').textContent = "TOUR HOÀN THÀNH - MỜI VÀO PHÒNG QUIZ";
    setTimeout(() => {
      stopAutoTour();
      openQuizModal();
    }, 2500);
    return;
  }

  const stop = AUTO_TOUR_STOPS[autoTourIndex];
  document.getElementById('tour-step-text').textContent = `ĐANG THAM QUAN: ${stop.name}`;
  document.getElementById('room-name-display').textContent = stop.name;

  camera.position.set(stop.x, stop.y, stop.z);
  camera.lookAt(stop.lookAt[0], stop.lookAt[1], stop.lookAt[2]);
  updateActiveNavButton(stop.roomKey);
  updateRoomVisibility(stop.roomKey);

  soundManager.speakText(stop.text, null, null);

  autoTourTimer = setTimeout(() => {
    if (isAutoTour) {
      autoTourIndex++;
      runNextTourStop();
    }
  }, 9500);
}

// 10. MỞ VÀ ĐÓNG MODAL HIỆN VẬT
function openExhibitModal(item) {
  soundManager.playClickSound();
  controls.unlock();
  activeInteractExhibit = null;
  activeInteractDoor = null;

  document.getElementById('modal-period').textContent = item.period;
  document.getElementById('modal-title').textContent = item.title;
  document.getElementById('modal-desc').textContent = item.fullDesc;
  document.getElementById('modal-fun-fact').textContent = item.funFact;

  // Điền chú thích nguồn ảnh tư liệu và năm chụp
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
  }

  // Điền trích dẫn nguồn tư liệu chính thống
  const citationEl = document.getElementById('modal-citation-text');
  if (citationEl) {
    citationEl.textContent = item.sourceCitation || "Văn kiện Đại hội VII của Đảng, NXB Sự thật, Hà Nội, 1991.";
  }

  renderInteractiveFeature(item);

  const imgElem = document.getElementById('modal-image');
  const safeImg = (item.imageUrl && item.imageUrl.trim() !== '') ? item.imageUrl : 'assets/images/p2_emblem.jpg';
  imgElem.src = safeImg;
  imgElem.onerror = () => {
    // Luôn dự phòng bằng tệp ảnh biểu trưng cục bộ có sẵn trên máy, tuyệt đối không gọi link ngoài
    imgElem.src = 'assets/images/p2_emblem.jpg';
  };

  document.getElementById('exhibit-modal').classList.remove('hidden');
}

function renderInteractiveFeature(item) {
  const container = document.getElementById('interactive-feature-box');
  if (!container) return;

  if (!item.interactiveType) {
    container.classList.add('hidden');
    container.innerHTML = '';
    return;
  }

  container.classList.remove('hidden');
  container.innerHTML = '';

  // 1. Tương tác đinh Phòng 1: Thanh trượt So sánh Trước / Sau
  if (item.interactiveType === 'comparison') {
    const data = item.interactiveData;
    container.innerHTML = `
      <div class="interactive-title">📊 TƯƠNG TÁC SO SÁNH: ${data.label}</div>
      <div class="comparison-slider-container">
        <div class="slider-labels">
          <span class="slider-before">Trước 1991 (Khủng hoảng)</span>
          <span class="slider-after">Sau Đại hội VII (Đổi mới)</span>
        </div>
        <input type="range" min="0" max="100" value="0" class="interactive-slider" id="compare-slider">
        <div class="slider-result-card" id="compare-result-text">
          <strong>Trạng thái ban đầu: </strong>${data.before}
        </div>
      </div>
    `;

    setTimeout(() => {
      const slider = document.getElementById('compare-slider');
      const resultText = document.getElementById('compare-result-text');
      if (slider && resultText) {
        slider.addEventListener('input', (e) => {
          if (e.target.value > 50) {
            resultText.innerHTML = `<strong>Thành tựu sau ĐH VII: </strong><span style="color:#34d399">${data.after}</span>`;
          } else {
            resultText.innerHTML = `<strong>Bối cảnh ban đầu: </strong><span style="color:#f87171">${data.before}</span>`;
          }
        });
      }
    }, 50);
  }

  // 2. Tương tác Phòng 2: Lật xem Cương lĩnh 1991
  else if (item.interactiveType === 'book') {
    const data = item.interactiveData;
    const tabsHtml = data.chapters.map((chap, idx) => `
      <button class="book-tab-btn ${idx === 0 ? 'active' : ''}" data-chap="${idx}">Mục ${idx + 1}</button>
    `).join('');

    container.innerHTML = `
      <div class="interactive-title">📖 TƯƠNG TÁC LẬT SÁCH: ${data.bookTitle}</div>
      <div class="book-tabs">${tabsHtml}</div>
      <div class="book-content-card" id="book-content-display">
        <strong>Trang 1: </strong>${data.chapters[0]}
      </div>
    `;

    setTimeout(() => {
      document.querySelectorAll('.book-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.book-tab-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const chapIdx = parseInt(btn.getAttribute('data-chap'));
          document.getElementById('book-content-display').innerHTML = `
            <strong>Nội dung cốt lõi: </strong>${data.chapters[chapIdx]}
          `;
        });
      });
    }, 50);
  }

  // 3. Tương tác đinh Phòng 3: Mốc son ngoại giao phá thế bao vây
  else if (item.interactiveType === 'map') {
    const data = item.interactiveData;
    const listHtml = data.milestones.map(m => `
      <div class="milestone-item">
        <span class="milestone-year">${m.year}</span>
        <span>${m.event}</span>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="interactive-title">🌐 MỐC SON NGOẠI GIAO: PHÁ THẾ BAO VÂY CÔ LẬP</div>
      <div class="milestones-list">${listHtml}</div>
    `;
  }

  // 5. Tương tác Kiosk Hotspot: Bảng phân tích số liệu / nhân sự / sự kiện
  else if (item.isHotspot) {
    container.innerHTML = `
      <div class="interactive-title">🔍 ${item.label}</div>
      <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid #38bdf8; border-radius: 8px; padding: 14px; margin-top: 8px;">
        <div style="color: #38bdf8; font-weight: bold; font-size: 1rem; margin-bottom: 6px;">
          📌 Dữ liệu lịch sử quan trọng:
        </div>
        <p style="color: #f1f5f9; font-size: 0.95rem; line-height: 1.6; margin: 0 0 10px 0;">
          ${item.fullDesc}
        </p>
        <button id="btn-read-hotspot" class="modal-speak-btn" style="width: 100%; justify-content: center; margin-top: 8px;">
          🔊 Nghe thuyết minh điểm tra cứu này
        </button>
      </div>
    `;

    setTimeout(() => {
      const btn = document.getElementById('btn-read-hotspot');
      if (btn) {
        btn.addEventListener('click', () => {
          soundManager.speakText(`${item.title}. ${item.fullDesc}`);
        });
      }
    }, 50);
  }

  // 4. Tương tác Phòng 4: Sổ lưu niệm điện tử
  else if (item.interactiveType === 'guestbook') {
    container.innerHTML = `
      <div class="interactive-title">✍️ SỔ LƯU NIỆM ĐIỆN TỬ BẢO TÀNG</div>
      <p style="font-size:13px; color:#cbd5e1; margin-bottom:10px;">
        Hãy để lại cảm nhận của bạn về chuyến tham quan Đại hội VII của Đảng:
      </p>
      <div style="display:flex; gap:8px; margin-bottom:10px;">
        <input type="text" id="guestbook-input" placeholder="Viết cảm nhận của bạn tại đây..." style="flex:1; background:#0f172a; border:1px solid #475569; border-radius:6px; padding:8px 12px; color:#fff; font-size:13px;">
        <button class="btn-primary" id="btn-guestbook-send" style="width:auto; padding:8px 16px; font-size:13px;">Gửi</button>
      </div>
      <div id="guestbook-list" style="max-height:120px; overflow-y:auto; display:flex; flex-direction:column; gap:6px;">
        <div style="background:rgba(255,255,255,0.05); padding:6px 10px; border-radius:4px; font-size:12px; color:#94a3b8;">
          <strong style="color:#fbbf24;">Đoàn viên Hà Nội:</strong> "Tự hào về bản lĩnh kiên cường của Đảng ta trong giai đoạn thử thách 1991!"
        </div>
        <div style="background:rgba(255,255,255,0.05); padding:6px 10px; border-radius:4px; font-size:12px; color:#94a3b8;">
          <strong style="color:#fbbf24;">Sinh viên Lịch sử:</strong> "Mô hình bảo tàng 3D rất trực quan, dễ hiểu và truyền cảm hứng sâu sắc."
        </div>
      </div>
    `;

    setTimeout(() => {
      const sendBtn = document.getElementById('btn-guestbook-send');
      const input = document.getElementById('guestbook-input');
      const list = document.getElementById('guestbook-list');
      if (sendBtn && input && list) {
        sendBtn.addEventListener('click', () => {
          const val = input.value.trim();
          if (val.length > 0) {
            const newItem = document.createElement('div');
            newItem.style.cssText = 'background:rgba(217,119,6,0.15); border-left:2px solid #fbbf24; padding:6px 10px; border-radius:4px; font-size:12px; color:#f8fafc;';
            newItem.innerHTML = `<strong style="color:#fbbf24;">${candidateName}:</strong> "${val}"`;
            list.insertBefore(newItem, list.firstChild);
            input.value = '';
            soundManager.playSuccessSound();
          }
        });
      }
    }, 50);
  }
}

// KHÔI PHỤC ĐIỀU KHIỂN CHUỘT
function isAnyModalOpen() {
  const modalIds = ['exhibit-modal', 'teleport-modal', 'quiz-modal', 'reference-modal'];
  return modalIds.some(id => {
    const el = document.getElementById(id);
    return el && !el.classList.contains('hidden');
  });
}

function toggleReferenceModal() {
  const modal = document.getElementById('reference-modal');
  if (!modal) return;
  if (modal.classList.contains('hidden')) {
    controls.unlock();
    modal.classList.remove('hidden');
  } else {
    modal.classList.add('hidden');
    resumeExploration();
  }
}

function renderBibliographyList() {
  const container = document.getElementById('ref-list-container');
  if (!container || typeof BIBLIOGRAPHY_DATA === 'undefined') return;
  container.innerHTML = BIBLIOGRAPHY_DATA.map((item, idx) => `
    <div class="ref-item">
      <div class="ref-item-title">[${idx + 1}] ${item.title}</div>
      <div class="ref-item-pub">🏛️ ${item.publisher}</div>
      <div class="ref-item-desc">${item.desc}</div>
    </div>
  `).join('');
}

function resumeExploration() {
  if (isAutoTour) return;
  setTimeout(() => {
    if (!isAnyModalOpen()) {
      try {
        controls.lock();
      } catch (err) {
        console.warn('PointerLock lock request deferred:', err);
      }
    }
  }, 60);
}

function closeExhibitModal() {
  soundManager.stopSpeech();
  const modal = document.getElementById('exhibit-modal');
  if (modal) modal.classList.add('hidden');
  activeInteractExhibit = null;
  activeInteractDoor = null;
  resumeExploration();
}

function toggleTeleportModal() {
  const modal = document.getElementById('teleport-modal');
  if (modal.classList.contains('hidden')) {
    controls.unlock();
    modal.classList.remove('hidden');
  } else {
    modal.classList.add('hidden');
    resumeExploration();
  }
}

function teleportTo(roomKey) {
  const dest = TELEPORT_DESTINATIONS[roomKey];
  if (!dest) return;

  camera.position.set(dest.x, dest.y, dest.z);
  if (dest.lookX !== undefined) {
    camera.lookAt(dest.lookX, dest.y, dest.z);
  }
  document.getElementById('room-name-display').textContent = dest.name;
  updateActiveNavButton(roomKey);
  updateRoomVisibility(roomKey);
  lastTeleportTime = performance.now();
  resumeExploration();
}

function updateActiveNavButton(roomKey) {
  document.querySelectorAll('.nav-room-btn').forEach(btn => {
    if (btn.getAttribute('data-nav') === roomKey) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// ẨN / HIỆN CÁC PHÒNG ĐỂ TỐI ƯU HIỆU NĂNG MÁY YẾU
function updateRoomVisibility(currentKey) {
  const keys = ['room1', 'room2', 'room3', 'room4', 'quiz'];
  const curIdx = keys.indexOf(currentKey);
  if (curIdx === -1) return;

  keys.forEach((k, idx) => {
    if (roomGroups[k]) {
      // Giữ phòng hiện tại và 2 phòng kế cận hiển thị, các phòng xa ẩn đi
      const isVisible = Math.abs(curIdx - idx) <= 1;
      roomGroups[k].visible = isVisible;
    }
  });
}

// 11. HỆ THỐNG QUIZ TRẮC NGHIỆM
function openQuizModal() {
  controls.unlock();
  document.getElementById('quiz-modal').classList.remove('hidden');
  document.getElementById('quiz-intro-view').classList.remove('hidden');
  document.getElementById('quiz-active-view').classList.add('hidden');
  document.getElementById('quiz-result-view').classList.add('hidden');
}

function closeQuizModal() {
  document.getElementById('quiz-modal').classList.add('hidden');
  resumeExploration();
}

function startQuizSession() {
  window.quizStartTime = Date.now();
  currentQuizIdx = 0;
  quizScore = 0;

  const nameInput = document.getElementById('quiz-user-name');
  if (nameInput && nameInput.value.trim().length > 0) {
    candidateName = nameInput.value.trim();
  } else {
    candidateName = "Khách tham quan";
  }

  document.getElementById('quiz-intro-view').classList.add('hidden');
  document.getElementById('quiz-result-view').classList.add('hidden');
  document.getElementById('quiz-active-view').classList.remove('hidden');
  renderQuizQuestion();
}

function renderQuizQuestion() {
  quizAnswered = false;
  const q = QUIZ_QUESTIONS[currentQuizIdx];
  document.getElementById('quiz-progress').textContent = `Câu ${currentQuizIdx + 1} / ${QUIZ_QUESTIONS.length}`;
  document.getElementById('quiz-score-live').textContent = `Điểm: ${quizScore}`;
  document.getElementById('quiz-question-text').textContent = q.question;

  const optionsContainer = document.getElementById('quiz-options-container');
  optionsContainer.innerHTML = '';
  document.getElementById('quiz-explanation').classList.add('hidden');

  q.options.forEach((optText, optIdx) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt-btn';
    btn.textContent = optText;
    btn.addEventListener('click', () => handleQuizSelect(optIdx, btn));
    optionsContainer.appendChild(btn);
  });
}

function handleQuizSelect(selectedIdx, clickedBtn) {
  if (quizAnswered) return;
  quizAnswered = true;

  const q = QUIZ_QUESTIONS[currentQuizIdx];
  const allBtns = document.querySelectorAll('.quiz-opt-btn');

  if (selectedIdx === q.correct) {
    quizScore += 1;
    clickedBtn.classList.add('correct');
    soundManager.playSuccessSound();
    document.getElementById('quiz-result-message').className = 'success';
    document.getElementById('quiz-result-message').textContent = "✓ CHÍNH XÁC! XIN CHÚC MỪNG!";
  } else {
    clickedBtn.classList.add('wrong');
    allBtns[q.correct].classList.add('correct');
    document.getElementById('quiz-result-message').className = 'fail';
    document.getElementById('quiz-result-message').textContent = "✗ RẤT TIẾC, CHƯA ĐÚNG!";
  }

  document.getElementById('quiz-fact-text').textContent = q.explanation;
  document.getElementById('quiz-explanation').classList.remove('hidden');
  document.getElementById('quiz-score-live').textContent = `Điểm: ${quizScore}`;
}

function nextQuizQuestion() {
  currentQuizIdx++;
  if (currentQuizIdx < QUIZ_QUESTIONS.length) {
    renderQuizQuestion();
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  document.getElementById('quiz-active-view').classList.add('hidden');
  document.getElementById('quiz-result-view').classList.remove('hidden');

  const displayName = candidateName.startsWith("Đồng chí") ? candidateName : ("Đồng chí: " + candidateName);
  document.getElementById('cert-name-display').textContent = displayName;
  document.getElementById('cert-score-display').textContent = `${quizScore} / ${QUIZ_QUESTIONS.length} Điểm`;

  let rankTitle = "Chiến Sĩ Lịch Sử Xuất Sắc (Huy Hiệu Vàng)";
  if (quizScore < 4) rankTitle = "Đoàn Viên Tích Cực (Huy Hiệu Đồng)";
  else if (quizScore <= 5) rankTitle = "Chiến Sĩ Tri Thức Giỏi (Huy Hiệu Bạc)";

  document.getElementById('cert-rank-display').textContent = rankTitle;
  document.getElementById('cert-date-display').textContent = `Cấp ngày: ${new Date().toLocaleDateString('vi-VN')}`;

  // Gửi điểm số lên Bảng xếp hạng Realtime
  const timeSpent = Math.max(1, Math.round((Date.now() - (window.quizStartTime || Date.now())) / 1000));
  if (typeof submitScoreToLeaderboard === 'function') {
    submitScoreToLeaderboard(candidateName, quizScore, timeSpent);
  }
}

function downloadCertificatePNG() {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 800;
  const ctx = canvas.getContext('2d');

  const bgGrad = ctx.createRadialGradient(600, 400, 50, 600, 400, 700);
  bgGrad.addColorStop(0, '#3f0c10');
  bgGrad.addColorStop(1, '#11141a');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1200, 800);

  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 10;
  ctx.strokeRect(25, 25, 1150, 750);

  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 3;
  ctx.strokeRect(40, 40, 1120, 720);

  const corners = [
    [50, 50], [1150, 50], [50, 750], [1150, 750]
  ];
  ctx.fillStyle = '#f59e0b';
  corners.forEach(c => {
    ctx.beginPath();
    ctx.arc(c[0], c[1], 12, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = '#fef08a';
  ctx.font = 'bold 50px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('★  ☭  ★', 600, 125);

  ctx.fillStyle = '#fde047';
  ctx.font = 'bold 22px Arial';
  ctx.fillText('CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM', 600, 175);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'italic 18px Arial';
  ctx.fillText('Độc lập - Tự do - Hạnh phúc', 600, 205);

  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(480, 220);
  ctx.lineTo(720, 220);
  ctx.stroke();

  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 38px Arial';
  ctx.fillText('CHỨNG NHẬN VINH DANH CHIẾN SĨ LỊCH SỬ', 600, 285);

  ctx.fillStyle = '#e2e8f0';
  ctx.font = '20px Arial';
  ctx.fillText('Ban Tổ Chức Bảo Tàng Ảo 3D Trân Trọng Trao Tặng:', 600, 345);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 44px Arial';
  const displayName = candidateName.startsWith("Đồng chí") ? candidateName : ("Đồng chí: " + candidateName);
  ctx.fillText(displayName.toUpperCase(), 600, 415);

  ctx.fillStyle = '#cbd5e1';
  ctx.font = '22px Arial';
  ctx.fillText('Đã hoàn thành xuất sắc chuyến tham quan không gian triển lãm 3D:', 600, 475);
  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 26px Arial';
  ctx.fillText('ĐẠI HỘI ĐẠI BIỂU TOÀN QUỐC LẦN THỨ VII CỦA ĐẢNG (1991)', 600, 520);

  ctx.fillStyle = '#34d399';
  ctx.font = 'bold 36px Arial';
  let rankTitle = "Chiến Sĩ Lịch Sử Xuất Sắc (Huy Hiệu Vàng)";
  if (quizScore < 4) rankTitle = "Đoàn Viên Tích Cực (Huy Hiệu Đồng)";
  else if (quizScore <= 5) rankTitle = "Chiến Sĩ Tri Thức Giỏi (Huy Hiệu Bạc)";
  ctx.fillText(`Kết quả: ${quizScore}/${QUIZ_QUESTIONS.length} Điểm  —  Danh hiệu: ${rankTitle}`, 600, 590);

  const dateStr = `Hà Nội, ngày ${new Date().getDate()} tháng ${new Date().getMonth() + 1} năm ${new Date().getFullYear()}`;
  ctx.fillStyle = '#94a3b8';
  ctx.font = 'italic 19px Arial';
  ctx.textAlign = 'right';
  ctx.fillText(dateStr, 1080, 670);

  ctx.fillStyle = '#fef08a';
  ctx.font = 'bold 20px Arial';
  ctx.fillText('BAN TỔ CHỨC BẢO TÀNG ẢO 3D', 1080, 705);

  const link = document.createElement('a');
  link.download = `Chung-Nhan-Dai-Hoi-VII-${candidateName.replace(/\s+/g, '_')}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// CHẶN VA CHẠM VỚI BỤC HIỆN VẬT TRUNG TÂM VÀ KIOSK (KHÔNG THỂ XUYÊN QUA)
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
  if (isCollidingWithPodium(x, z)) return false;
  // Phòng 1: x in [-4.6, 4.6], z in [-3.6, 3.6]
  if (x >= -4.6 && x <= 4.6 && z >= -3.6 && z <= 3.6) return true;
  // Cho phép chạm vào ngưỡng cửa ra P1: x in [4.6, 5.3], |z| <= 0.8
  if (x >= 4.6 && x <= 5.3 && Math.abs(z) <= 0.8) return true;

  // Phòng 2: x in [25.4, 34.6], z in [-3.6, 3.6]
  if (x >= 25.4 && x <= 34.6 && z >= -3.6 && z <= 3.6) return true;
  // Ngưỡng cửa vào P2: x in [24.7, 25.4], |z| <= 0.8
  if (x >= 24.7 && x <= 25.4 && Math.abs(z) <= 0.8) return true;
  // Ngưỡng cửa ra P2: x in [34.6, 35.3], |z| <= 0.8
  if (x >= 34.6 && x <= 35.3 && Math.abs(z) <= 0.8) return true;

  // Phòng 3: x in [55.4, 64.6], z in [-3.6, 3.6]
  if (x >= 55.4 && x <= 64.6 && z >= -3.6 && z <= 3.6) return true;
  // Ngưỡng cửa vào P3: x in [54.7, 55.4], |z| <= 0.8
  if (x >= 54.7 && x <= 55.4 && Math.abs(z) <= 0.8) return true;
  // Ngưỡng cửa ra P3: x in [64.6, 65.3], |z| <= 0.8
  if (x >= 64.6 && x <= 65.3 && Math.abs(z) <= 0.8) return true;

  // Phòng 4: x in [85.4, 94.6], z in [-3.6, 3.6]
  if (x >= 85.4 && x <= 94.6 && z >= -3.6 && z <= 3.6) return true;
  // Ngưỡng cửa vào P4: x in [84.7, 85.4], |z| <= 0.8
  if (x >= 84.7 && x <= 85.4 && Math.abs(z) <= 0.8) return true;
  // Ngưỡng cửa ra P4: x in [94.6, 95.3], |z| <= 0.8
  if (x >= 94.6 && x <= 95.3 && Math.abs(z) <= 0.8) return true;

  // Phòng Quiz: x in [117.4, 122.6], z in [-2.6, 2.6]
  if (x >= 117.4 && x <= 122.6 && z >= -2.6 && z <= 2.6) return true;
  // Ngưỡng cửa vào Quiz: x in [116.7, 117.4], |z| <= 0.8
  if (x >= 116.7 && x <= 117.4 && Math.abs(z) <= 0.8) return true;

  return false;
}

// BƯỚC QUA CỬA TỰ ĐỘNG CHUYỂN PHÒNG (WALK-THROUGH TELEPORTATION)
function checkDoorProximity(x, z) {
  const now = performance.now();
  if (now - lastTeleportTime < 1200) return; // Khoảng hoãn 1.2s chống teleport lặp

  if (Math.abs(z) <= 0.85) {
    // 1. Bước qua cửa ra P1 (x >= 4.8) -> sang P2
    if (x >= 4.8 && x <= 5.5) {
      teleportTo("room2");
    }
    // 2. Bước qua cửa lùi P2 (x <= 25.2) -> về P1
    else if (x <= 25.2 && x >= 24.5) {
      teleportTo("room1");
    }
    // 3. Bước qua cửa ra P2 (x >= 34.8) -> sang P3
    else if (x >= 34.8 && x <= 35.5) {
      teleportTo("room3");
    }
    // 4. Bước qua cửa lùi P3 (x <= 55.2) -> về P2
    else if (x <= 55.2 && x >= 54.5) {
      teleportTo("room2");
    }
    // 5. Bước qua cửa ra P3 (x >= 64.8) -> sang P4
    else if (x >= 64.8 && x <= 65.5) {
      teleportTo("room4");
    }
    // 6. Bước qua cửa lùi P4 (x <= 85.2) -> về P3
    else if (x <= 85.2 && x >= 84.5) {
      teleportTo("room3");
    }
    // 7. Bước qua cửa ra P4 (x >= 94.8) -> sang Quiz
    else if (x >= 94.8 && x <= 95.5) {
      teleportTo("quiz");
    }
    // 8. Bước qua cửa lùi Quiz (x <= 117.2) -> về P4
    else if (x <= 117.2 && x >= 116.5) {
      teleportTo("room4");
    }
  }
}

function getCurrentRoomKey(x) {
  if (x < 15) return "room1";
  if (x < 45) return "room2";
  if (x < 75) return "room3";
  if (x < 105) return "room4";
  return "quiz";
}

function getCurrentRoomName(x) {
  const key = getCurrentRoomKey(x);
  return TELEPORT_DESTINATIONS[key]?.name || "Bảo tàng ảo Đại hội VII (1991)";
}

// 13. BẢN ĐỒ MINIMAP 2D MÔ PHỎNG HÀNH LANG TUYẾN TÍNH
function updateMinimap() {
  const canvas = document.getElementById('minimap-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, w, h);

  const rooms = [
    { key: 'room1', label: 'P1', x: 22, y: 45, w: 32, h: 26 },
    { key: 'room2', label: 'P2', x: 64, y: 45, w: 32, h: 26 },
    { key: 'room3', label: 'P3', x: 106, y: 45, w: 32, h: 26 },
    { key: 'room4', label: 'P4', x: 148, y: 45, w: 32, h: 26 },
    { key: 'quiz', label: 'QUIZ', x: 190, y: 45, w: 26, h: 26 }
  ];

  // Vẽ các mũi tên nối giữa các phòng
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2;
  for (let i = 0; i < rooms.length - 1; i++) {
    const r1 = rooms[i];
    const r2 = rooms[i + 1];
    ctx.beginPath();
    ctx.moveTo(r1.x + r1.w / 2, r1.y);
    ctx.lineTo(r2.x - r2.w / 2, r2.y);
    ctx.stroke();

    // Mũi tên nhỏ
    ctx.beginPath();
    ctx.moveTo(r2.x - r2.w / 2, r2.y);
    ctx.lineTo(r2.x - r2.w / 2 - 4, r2.y - 3);
    ctx.lineTo(r2.x - r2.w / 2 - 4, r2.y + 3);
    ctx.fillStyle = '#f59e0b';
    ctx.fill();
  }

  // Vẽ các khối phòng
  const curKey = getCurrentRoomKey(camera.position.x);

  rooms.forEach(r => {
    const isCurrent = (r.key === curKey);
    ctx.fillStyle = isCurrent ? 'rgba(185, 28, 28, 0.6)' : 'rgba(30, 41, 59, 0.7)';
    ctx.fillRect(r.x - r.w / 2, r.y - r.h / 2, r.w, r.h);

    ctx.strokeStyle = isCurrent ? '#fbbf24' : '#64748b';
    ctx.lineWidth = isCurrent ? 2 : 1;
    ctx.strokeRect(r.x - r.w / 2, r.y - r.h / 2, r.w, r.h);

    ctx.fillStyle = isCurrent ? '#fef08a' : '#cbd5e1';
    ctx.font = isCurrent ? 'bold 10px Arial' : '9px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(r.label, r.x, r.y);
  });

  // Vị trí người tham quan tương đối theo phòng
  const activeRoom = rooms.find(r => r.key === curKey);
  if (activeRoom) {
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.arc(activeRoom.x, activeRoom.y + 7, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

// 14. VÒNG LẶP RENDER CHÍNH (ANIMATE LOOP)
function animate() {
  requestAnimationFrame(animate);

  const time = performance.now();
  const delta = (time - prevTime) / 1000;

  const welcomeScreen = document.getElementById('welcome-screen');
  const isWelcomeOpen = welcomeScreen && !welcomeScreen.classList.contains('hidden');
  const canMove = (controls.isLocked || !isWelcomeOpen) && !isAnyModalOpen();

  if (canMove) {
    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;

    direction.z = Number(moveForward) - Number(moveBackward);
    direction.x = Number(moveRight) - Number(moveLeft);
    direction.normalize();

    const speed = 20.0; // Tốc độ tản bộ bảo tàng êm ái, chống chóng mặt
    if (moveForward || moveBackward) velocity.z -= direction.z * speed * delta;
    if (moveLeft || moveRight) velocity.x -= direction.x * speed * delta;

    const oldX = camera.position.x;
    const oldZ = camera.position.z;

    controls.moveRight(-velocity.x * delta);
    controls.moveForward(-velocity.z * delta);

    const newX = camera.position.x;
    const newZ = camera.position.z;

    // Va chạm & trượt mượt mà dọc các vách tường
    if (!isPositionWalkable(newX, newZ)) {
      if (isPositionWalkable(newX, oldZ)) {
        camera.position.z = oldZ;
      } else if (isPositionWalkable(oldX, newZ)) {
        camera.position.x = oldX;
      } else {
        camera.position.x = oldX;
        camera.position.z = oldZ;
      }
    }

    // Kiểm tra bước qua cửa để teleport tự động
    checkDoorProximity(camera.position.x, camera.position.z);

    // Cập nhật tên phòng và thanh điều hướng trực tiếp khi người xem đổi phòng
    const curRoomKey = getCurrentRoomKey(camera.position.x);
    const curRoomName = getCurrentRoomName(camera.position.x);
    const roomDisplay = document.getElementById('room-name-display');
    if (roomDisplay && roomDisplay.textContent !== curRoomName) {
      roomDisplay.textContent = curRoomName;
      updateActiveNavButton(curRoomKey);
      updateRoomVisibility(curRoomKey);
    }

    // Nhảy phím Space
    velocity.y -= 9.8 * 3.5 * delta;
    camera.position.y += velocity.y * delta;

    if (camera.position.y <= 1.6) {
      velocity.y = 0;
      camera.position.y = 1.6;
      canJump = true;
    }
    if (camera.position.y > 3.8) {
      camera.position.y = 3.8;
      velocity.y = 0;
    }

    // Raycasting kiểm tra hiện vật hoặc cửa thông phòng trước mặt
    raycaster.setFromCamera(mouse, camera);

    const crosshair = document.getElementById('crosshair');
    const prompt = document.getElementById('interaction-prompt');

    // 1. Raycast kiểm tra tranh hiện vật
    const exhibitIntersects = raycaster.intersectObjects(exhibitsMeshes, true);
    // 2. Raycast kiểm tra cửa thông phòng & bục quiz
    const doorIntersects = raycaster.intersectObjects(doorMeshes, true);

    if (exhibitIntersects.length > 0 && exhibitIntersects[0].distance < 6.0) {
      let target = exhibitIntersects[0].object;
      while (target && !target.userData.title && target.parent) {
        target = target.parent;
      }

      if (target && target.userData && target.userData.title) {
        activeInteractExhibit = target.userData;
        activeInteractDoor = null;
        crosshair.classList.add('active');
        prompt.classList.remove('hidden');

        if (target.userData.isSpeaker) {
          prompt.innerHTML = `<span class="prompt-key">Click</span> hoặc nhấn <span class="prompt-key">E</span> để nghe ${target.userData.title}`;
        } else if (target.userData.isHotspot) {
          prompt.innerHTML = `<span class="prompt-key">Click</span> hoặc nhấn <span class="prompt-key">E</span> để tra cứu: ${target.userData.label}`;
        } else {
          prompt.innerHTML = `<span class="prompt-key">Click</span> hoặc nhấn <span class="prompt-key">E</span> để xem ${target.userData.title.substring(0, 36)}...`;
        }

        if (currentlyHighlightedMesh !== target) {
          if (currentlyHighlightedMesh) currentlyHighlightedMesh.scale.set(1.0, 1.0, 1.0);
          currentlyHighlightedMesh = target;
          currentlyHighlightedMesh.scale.set(1.03, 1.03, 1.03);
        }
      }
    } else if (doorIntersects.length > 0 && doorIntersects[0].distance < 6.0) {
      let target = doorIntersects[0].object;
      while (target && !target.userData.title && target.parent) {
        target = target.parent;
      }

      if (target && target.userData && target.userData.title) {
        activeInteractDoor = target.userData;
        activeInteractExhibit = null;
        crosshair.classList.add('active');
        prompt.classList.remove('hidden');
        prompt.innerHTML = `<span class="prompt-key">Click</span> hoặc nhấn <span class="prompt-key">E</span>: ${target.userData.title}`;

        if (currentlyHighlightedMesh !== target) {
          if (currentlyHighlightedMesh) currentlyHighlightedMesh.scale.set(1.0, 1.0, 1.0);
          currentlyHighlightedMesh = target;
        }
      }
    } else {
      activeInteractExhibit = null;
      activeInteractDoor = null;
      crosshair.classList.remove('active');
      prompt.classList.add('hidden');

      if (currentlyHighlightedMesh) {
        currentlyHighlightedMesh.scale.set(1.0, 1.0, 1.0);
        currentlyHighlightedMesh = null;
      }
    }
  }

  // Quả địa cầu Phòng 3 xoay chậm
  if (rotatingGlobe) {
    rotatingGlobe.rotation.y += 0.005;
  }

  // Ngôi sao biểu tượng phòng Quiz xoay nhẹ
  if (quizEmblemMesh) {
    quizEmblemMesh.rotation.y += 0.01;
  }

  updateMinimap();

  prevTime = time;
  renderer.render(scene, camera);
}
