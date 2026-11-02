def test_dom():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    required_ids = [
        'canvas-container', 'loading-screen', 'welcome-screen', 'hud-overlay',
        'exhibit-modal', 'teleport-modal', 'quiz-modal', 'reference-modal',
        'crosshair', 'interaction-prompt', 'click-to-resume', 'modal-image',
        'modal-title', 'modal-period', 'modal-desc', 'modal-analysis-text',
        'modal-citation-text', 'interactive-feature-box', 'minimap-canvas'
    ]
    missing = [i for i in required_ids if f'id="{i}"' not in html]
    print('Missing IDs in index.html:', missing if missing else 'None! All IDs present.')

if __name__ == '__main__':
    test_dom()

