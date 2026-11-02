import re

def update_app_js():
    with open('js/app.js', 'r', encoding='utf-8') as f:
        code = f.read()

    # 1. Update buildStandardRoom call to include Layer 2, Layer 5, Layer 6
    target_build_room = """  } else if (config.key === "room1") {
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
}"""

    replacement_build_room = """  } else if (config.key === "room1") {
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

  // LỚP 5: Kiosk tra cứu Điểm bấm A & B
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

// TẠO HAI KIOSK TRA CỨU ĐIỂM BẤM A & B HAI BÊN BỤC TRUNG TÂM (LAYER 5)
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
}"""

    if target_build_room in code:
        code = code.replace(target_build_room, replacement_build_room, 1)
        print("Updated buildStandardRoom with layers 2, 5, 6 successfully.")
    else:
        print("Warning: target_build_room not found!")

    # 2. Update loadAllExhibits() with real image loading & subtitle plaque
    target_load_exhibits = """// 6. GẮN TOÀN BỘ TRANH TƯ LIỆU VÀO TƯỜNG SAU MỖI PHÒNG
function loadAllExhibits() {
  EXHIBITS_DATA.forEach((item) => {
    const parentGroup = roomGroups[item.room];
    if (!parentGroup) return;

    // Khung tranh vàng đồng kích thước 2.4m x 1.7m phù hợp chiều cao phòng 4m
    const frameGeo = new THREE.BoxGeometry(2.4, 1.7, 0.1);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x926c15,
      metalness: 0.8,
      roughness: 0.3
    });
    const frame = new THREE.Mesh(frameGeo, frameMat);
    frame.position.set(item.position.x, item.position.y, item.position.z);
    frame.rotation.set(item.rotation[0], item.rotation[1], item.rotation[2]);

    const canvasTexture = generateExhibitArtworkCanvas(item.title, item.period, item.shortDesc);
    const picMat = new THREE.MeshBasicMaterial({ map: canvasTexture });
    const picGeo = new THREE.PlaneGeometry(2.2, 1.5);
    const picMesh = new THREE.Mesh(picGeo, picMat);
    picMesh.position.z = 0.06;
    frame.add(picMesh);

    frame.userData = item;
    parentGroup.add(frame);
    exhibitsMeshes.push(frame);

    // Spotlight chiếu sáng hiện vật
    const spotLight = new THREE.SpotLight(0xfff3d6, 1.1);
    spotLight.position.set(item.position.x, 3.8, item.position.z + 2.0);
    spotLight.target = frame;
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.5;
    parentGroup.add(spotLight);
  });
}"""

    replacement_load_exhibits = """// 6. GẮN TOÀN BỘ TRANH TƯ LIỆU THỰC TẾ VÀO TƯỜNG PHÒNG (LAYER 4)
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
}"""

    # Normalize newlines for matching
    if target_load_exhibits in code:
        code = code.replace(target_load_exhibits, replacement_load_exhibits, 1)
        print("Updated loadAllExhibits with local TextureLoader and plaques.")
    else:
        # Try regex or substring matching
        print("Warning: target_load_exhibits exact match failed, attempting regex...")
        pat = re.compile(r'// 6\. GẮN TOÀN B.*?function loadAllExhibits\(\) \{.*?\n\}', re.DOTALL)
        if pat.search(code):
            code = pat.sub(replacement_load_exhibits, code, count=1)
            print("Updated loadAllExhibits via regex.")
        else:
            print("Failed to replace loadAllExhibits.")

    # 3. Update click listener and KeyE in setupEventListeners to handle speaker click
    target_click = """  document.addEventListener('click', () => {
    if (controls.isLocked) {
      if (activeInteractExhibit) {
        openExhibitModal(activeInteractExhibit);
      } else if (activeInteractDoor) {
        handleDoorClick(activeInteractDoor);
      }
    }
  });"""

    replacement_click = """  document.addEventListener('click', () => {
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
  });"""

    if target_click in code:
        code = code.replace(target_click, replacement_click, 1)
        print("Updated click event listener.")
    else:
        print("Warning: target_click not found!")

    # 4. Add handleSpeakerClick near handleDoorClick
    target_door_click = """function handleDoorClick(doorData) {"""
    replacement_door_click = """function handleSpeakerClick(speakerData) {
  soundManager.playClickSound();
  if (soundManager.isSpeaking) {
    soundManager.stopSpeech();
  } else {
    soundManager.speakText(speakerData.audioIntro);
  }
}

function handleDoorClick(doorData) {"""

    if target_door_click in code:
        code = code.replace(target_door_click, replacement_door_click, 1)
        print("Added handleSpeakerClick.")
    else:
        print("Warning: target_door_click not found!")

    # 5. Update KeyE in onKeyDown
    target_key_e = """    case 'KeyE':
      if (activeInteractExhibit) {
        openExhibitModal(activeInteractExhibit);
      } else if (activeInteractDoor) {
        handleDoorClick(activeInteractDoor);
      }
      break;"""

    replacement_key_e = """    case 'KeyE':
      if (activeInteractExhibit) {
        if (activeInteractExhibit.isSpeaker) {
          handleSpeakerClick(activeInteractExhibit);
        } else {
          openExhibitModal(activeInteractExhibit);
        }
      } else if (activeInteractDoor) {
        handleDoorClick(activeInteractDoor);
      }
      break;"""

    if target_key_e in code:
        code = code.replace(target_key_e, replacement_key_e, 1)
        print("Updated KeyE handler.")
    else:
        print("Warning: target_key_e not found!")

    # 6. Update renderInteractiveFeature to support isHotspot
    target_guestbook_end = """  // 4. Tương tác Phòng 4: Sổ lưu niệm điện tử
  else if (item.interactiveType === 'guestbook') {"""

    replacement_guestbook_plus_hotspot = """  // 5. Tương tác Kiosk Hotspot: Bảng phân tích số liệu / nhân sự / sự kiện
  else if (item.isHotspot) {
    container.innerHTML = `
      <div class="interactive-title">🔍 BẢNG TRA CỨU TƯ LIỆU: ${item.label}</div>
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
  else if (item.interactiveType === 'guestbook') {"""

    if target_guestbook_end in code:
        code = code.replace(target_guestbook_end, replacement_guestbook_plus_hotspot, 1)
        print("Added isHotspot support in renderInteractiveFeature.")
    else:
        print("Warning: target_guestbook_end not found!")

    # 7. Update raycasting prompt text in animate()
    target_raycast_prompt = """      if (target && target.userData && target.userData.title) {
        activeInteractExhibit = target.userData;
        activeInteractDoor = null;
        crosshair.classList.add('active');
        prompt.classList.remove('hidden');
        prompt.innerHTML = `<span class="prompt-key">Click</span> hoặc nhấn <span class="prompt-key">E</span> để xem ${target.userData.title.substring(0, 36)}...`;"""

    replacement_raycast_prompt = """      if (target && target.userData && target.userData.title) {
        activeInteractExhibit = target.userData;
        activeInteractDoor = null;
        crosshair.classList.add('active');
        prompt.classList.remove('hidden');

        if (target.userData.isSpeaker) {
          prompt.innerHTML = `<span class="prompt-key">Click</span> hoặc nhấn <span class="prompt-key">E</span> để nghe ${target.userData.title}`;
        } else if (target.userData.isHotspot) {
          prompt.innerHTML = `<span class="prompt-key">Click</span> hoặc nhấn <span class="prompt-key">E</span> để tra cứu ${target.userData.label}`;
        } else {
          prompt.innerHTML = `<span class="prompt-key">Click</span> hoặc nhấn <span class="prompt-key">E</span> để xem ${target.userData.title.substring(0, 36)}...`;
        }"""

    if target_raycast_prompt in code:
        code = code.replace(target_raycast_prompt, replacement_raycast_prompt, 1)
        print("Updated raycaster prompt in animate().")
    else:
        print("Warning: target_raycast_prompt not found, attempting partial match...")
        pat_prompt = re.compile(r'activeInteractExhibit = target\.userData;\s*activeInteractDoor = null;\s*crosshair\.classList\.add\(\'active\'\);\s*prompt\.classList\.remove\(\'hidden\'\);\s*prompt\.innerHTML = .*?;')
        if pat_prompt.search(code):
            code = pat_prompt.sub("""activeInteractExhibit = target.userData;
        activeInteractDoor = null;
        crosshair.classList.add('active');
        prompt.classList.remove('hidden');

        if (target.userData.isSpeaker) {
          prompt.innerHTML = `<span class="prompt-key">Click</span> hoặc nhấn <span class="prompt-key">E</span> để nghe ${target.userData.title}`;
        } else if (target.userData.isHotspot) {
          prompt.innerHTML = `<span class="prompt-key">Click</span> hoặc nhấn <span class="prompt-key">E</span> để tra cứu ${target.userData.label}`;
        } else {
          prompt.innerHTML = `<span class="prompt-key">Click</span> hoặc nhấn <span class="prompt-key">E</span> để xem ${target.userData.title.substring(0, 36)}...`;
        }""", code, count=1)
            print("Updated raycaster prompt via regex.")

    with open('js/app.js', 'w', encoding='utf-8') as f:
        f.write(code)
    print("js/app.js updated successfully!")

if __name__ == '__main__':
    update_app_js()

