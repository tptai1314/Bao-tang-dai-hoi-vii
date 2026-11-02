with open('js/app.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace document click listener in setupEventListeners
old_doc_click = """  document.addEventListener('click', () => {
    const welcomeScreen = document.getElementById('welcome-screen');

  const isWelcomeOpen = welcomeScreen && !welcomeScreen.classList.contains('hidden');

  const canMove = (controls.isLocked || !isWelcomeOpen) && !isAnyModalOpen();



  if (canMove) {
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

new_doc_click = """  document.addEventListener('click', (e) => {
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
  });"""

# Normalize CRLF
text = text.replace(old_doc_click.replace('\n', '\r\n'), new_doc_click.replace('\n', '\r\n'))
text = text.replace(old_doc_click, new_doc_click)

# In openExhibitModal: clear activeInteractExhibit and activeInteractDoor
old_open_modal = """function openExhibitModal(item) {
  soundManager.playClickSound();
  controls.unlock();"""

new_open_modal = """function openExhibitModal(item) {
  soundManager.playClickSound();
  controls.unlock();
  activeInteractExhibit = null;
  activeInteractDoor = null;"""

text = text.replace(old_open_modal.replace('\n', '\r\n'), new_open_modal.replace('\n', '\r\n'))
text = text.replace(old_open_modal, new_open_modal)

# In closeExhibitModal: clear activeInteractExhibit and activeInteractDoor
old_close_modal = """function closeExhibitModal() {
  soundManager.stopSpeech();
  document.getElementById('exhibit-modal').classList.add('hidden');
  resumeExploration();
}"""

new_close_modal = """function closeExhibitModal() {
  soundManager.stopSpeech();
  const modal = document.getElementById('exhibit-modal');
  if (modal) modal.classList.add('hidden');
  activeInteractExhibit = null;
  activeInteractDoor = null;
  resumeExploration();
}"""

text = text.replace(old_close_modal.replace('\n', '\r\n'), new_close_modal.replace('\n', '\r\n'))
text = text.replace(old_close_modal, new_close_modal)

# In initUI: attach listeners to btn-close-modal and btn-close-modal-bottom with e.stopPropagation()
old_btn_close = """  document.getElementById('btn-close-modal').addEventListener('click', closeExhibitModal);"""

new_btn_close = """  const btnCloseModal = document.getElementById('btn-close-modal');
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
  }"""

text = text.replace(old_btn_close.replace('\n', '\r\n'), new_btn_close.replace('\n', '\r\n'))
text = text.replace(old_btn_close, new_btn_close)

# In animate(): make sure canMove is used
old_anim = """// 14. VÒNG LẶP RENDER CHÍNH (ANIMATE LOOP)
function animate() {
  requestAnimationFrame(animate);

  const time = performance.now();
  const delta = (time - prevTime) / 1000;

  if (controls.isLocked) {"""

new_anim = """// 14. VÒNG LẶP RENDER CHÍNH (ANIMATE LOOP)
function animate() {
  requestAnimationFrame(animate);

  const time = performance.now();
  const delta = (time - prevTime) / 1000;

  const welcomeScreen = document.getElementById('welcome-screen');
  const isWelcomeOpen = welcomeScreen && !welcomeScreen.classList.contains('hidden');
  const canMove = (controls.isLocked || !isWelcomeOpen) && !isAnyModalOpen();

  if (canMove) {"""

text = text.replace(old_anim.replace('\n', '\r\n'), new_anim.replace('\n', '\r\n'))
text = text.replace(old_anim, new_anim)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Applied modal fixes to js/app.js!")

