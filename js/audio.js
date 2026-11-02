// HỆ THỐNG ÂM THANH: NHẠC NỀN SYNTHESIZER & GIỌNG ĐỌC AI VIETNAMESE SPEECH

class SoundManager {
  constructor() {
    this.audioCtx = null;
    this.bgmPlaying = false;
    this.timer = null;
    this.speechSynth = window.speechSynthesis;
    this.currentUtterance = null;
    this.isSpeaking = false;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    }
  }

  // Khởi tạo nhạc nền giao hưởng nhẹ nhàng bằng Web Audio API (không cần file mp3 ngoài)
  startBGM() {
    this.init();
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    this.bgmPlaying = true;
    this.playAmbientHarmony();
  }

  stopBGM() {
    this.bgmPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  toggleBGM() {
    if (this.bgmPlaying) {
      this.stopBGM();
      return false;
    } else {
      this.startBGM();
      return true;
    }
  }

  // Tạo hợp âm nền trang trọng, truyền cảm hứng
  playAmbientHarmony() {
    if (!this.bgmPlaying || !this.audioCtx) return;

    // Các vòng hợp âm Đô trưởng / Fa trưởng / La thứ trang nghiêm
    const chordProgressions = [
      [261.63, 329.63, 392.00, 523.25], // C Major
      [220.00, 261.63, 329.63, 440.00], // A Minor
      [174.61, 220.00, 261.63, 349.23], // F Major
      [196.00, 246.94, 293.66, 392.00]  // G Major
    ];

    const currentChord = chordProgressions[Math.floor(Math.random() * chordProgressions.length)];
    const duration = 5.0;

    currentChord.forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      // Volume envelope êm dịu, không chói tai
      const baseVol = 0.015;
      gain.gain.setValueAtTime(0.0001, this.audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(baseVol, this.audioCtx.currentTime + 1.5);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    });

    // Lặp lại sau mỗi chu kỳ
    this.timer = setTimeout(() => {
      if (this.bgmPlaying) {
        this.playAmbientHarmony();
      }
    }, (duration - 1.2) * 1000);
  }

  // Âm thanh tương tác khi click hoặc nhặt hiện vật
  playClickSound() {
    if (!this.audioCtx) this.init();
    if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, this.audioCtx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880.00, this.audioCtx.currentTime + 0.12); // A5

    gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.12);
  }

  // Âm thanh chúc mừng trả lời đúng
  playSuccessSound() {
    if (!this.audioCtx) this.init();
    if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + idx * 0.1);

      gain.gain.setValueAtTime(0.001, this.audioCtx.currentTime + idx * 0.1);
      gain.gain.linearRampToValueAtTime(0.06, this.audioCtx.currentTime + idx * 0.1 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + idx * 0.1 + 0.3);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(this.audioCtx.currentTime + idx * 0.1);
      osc.stop(this.audioCtx.currentTime + idx * 0.1 + 0.35);
    });
  }

  // THUYẾT MINH GIỌNG ĐỌC AI TIẾNG VIỆT
  speakText(text, onStart, onEnd) {
    if (!('speechSynthesis' in window)) {
      alert("Trình duyệt không hỗ trợ Web Speech API.");
      return;
    }

    this.stopSpeech();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Tìm giọng tiếng Việt tối ưu nếu có
    const voices = this.speechSynth.getVoices();
    const viVoice = voices.find(v => v.lang.includes('vi') || v.lang.includes('VIE'));
    if (viVoice) utterance.voice = viVoice;

    utterance.onstart = () => {
      this.isSpeaking = true;
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    this.currentUtterance = utterance;
    this.speechSynth.speak(utterance);
  }

  stopSpeech() {
    if (this.speechSynth.speaking) {
      this.speechSynth.cancel();
    }
    this.isSpeaking = false;
  }
}

const soundManager = new SoundManager();

