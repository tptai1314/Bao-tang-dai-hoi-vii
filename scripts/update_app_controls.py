with open('js/app.js', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Add click listener to click-to-resume
old_canvas_block = """  const canvasContainer = document.getElementById('canvas-container');
  if (canvasContainer) {
    canvasContainer.addEventListener('click', () => {
      const welcomeScreen = document.getElementById('welcome-screen');
      if (welcomeScreen && !welcomeScreen.classList.contains('hidden')) return;
      if (!isAnyModalOpen() && !controls.isLocked && !isAutoTour) {
        controls.lock();
      }
    });
  }"""

new_canvas_block = """  const clickResume = document.getElementById('click-to-resume');
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
  }"""

old_canvas_block_crlf = old_canvas_block.replace('\n', '\r\n')
new_canvas_block_crlf = new_canvas_block.replace('\n', '\r\n')

if old_canvas_block_crlf in text:
    text = text.replace(old_canvas_block_crlf, new_canvas_block_crlf)
elif old_canvas_block in text:
    text = text.replace(old_canvas_block, new_canvas_block)
else:
    print("WARNING: canvasContainer block not found directly!")

# 2. Update animate() canMove condition
old_anim_block = """  if (controls.isLocked) {"""
new_anim_block = """  const welcomeScreen = document.getElementById('welcome-screen');
  const isWelcomeOpen = welcomeScreen && !welcomeScreen.classList.contains('hidden');
  const canMove = (controls.isLocked || !isWelcomeOpen) && !isAnyModalOpen();

  if (canMove) {"""

old_anim_block_crlf = old_anim_block.replace('\n', '\r\n')
new_anim_block_crlf = new_anim_block.replace('\n', '\r\n')

if old_anim_block_crlf in text:
    text = text.replace(old_anim_block_crlf, new_anim_block_crlf, 1)
elif old_anim_block in text:
    text = text.replace(old_anim_block, new_anim_block, 1)
else:
    print("WARNING: animate block not found directly!")

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Updated js/app.js successfully!")

