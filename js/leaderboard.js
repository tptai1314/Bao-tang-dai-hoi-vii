// ==============================================================================
// LEADERBOARD - BẢNG XẾP HẠNG THỜI GIAN THỰC (FIREBASE REALTIME DATABASE)
// ==============================================================================

let firebaseDb = null;
let leaderboardRef = null;
let currentLeaderboardData = [];

// Khởi tạo Firebase Database
function initLeaderboardFirebase() {
  if (typeof firebase === 'undefined') {
    console.warn("Firebase SDK chưa được tải.");
    return false;
  }

  if (!isFirebaseConfigured()) {
    console.log("Firebase chưa được cấu hình. Sử dụng dữ liệu mẫu / lưu trữ nội bộ.");
    loadLocalLeaderboard();
    return false;
  }

  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG);
    }
    firebaseDb = firebase.database();
    leaderboardRef = firebaseDb.ref('quiz_leaderboard');

    // Lắng nghe thay đổi thời gian thực
    leaderboardRef.orderByChild('score').limitToLast(30).on('value', (snapshot) => {
      const data = [];
      snapshot.forEach((child) => {
        data.push({ id: child.key, ...child.val() });
      });

      // Sắp xếp: Điểm cao nhất trước, nếu bằng điểm thì thời gian nộp sớm hơn / làm nhanh hơn
      data.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return (a.timeSpent || 9999) - (b.timeSpent || 9999);
      });

      currentLeaderboardData = data;
      renderLeaderboardUI(data);
    }, (error) => {
      console.error("Lỗi khi tải bảng xếp hạng Firebase:", error);
      loadLocalLeaderboard();
    });

    console.log("Firebase Realtime Database kết nối thành công!");
    return true;
  } catch (err) {
    console.error("Khởi tạo Firebase thất bại:", err);
    loadLocalLeaderboard();
    return false;
  }
}

// Lưu trữ nội bộ dự phòng khi chưa cấu hình Firebase
function loadLocalLeaderboard() {
  try {
    const saved = localStorage.getItem('museum_local_leaderboard');
    if (saved) {
      currentLeaderboardData = JSON.parse(saved);
    } else {
      // Dữ liệu mẫu ban đầu để giao diện luôn đẹp mắt
      currentLeaderboardData = [
        { name: "Đoàn Thanh Niên", score: 10, timeSpent: 45, date: "Hôm nay" },
        { name: "Nguyễn Văn Hùng", score: 10, timeSpent: 58, date: "Hôm nay" },
        { name: "Trần Thị Mai", score: 9, timeSpent: 52, date: "Hôm nay" },
        { name: "Lê Hoàng Nam", score: 9, timeSpent: 65, date: "Hôm nay" },
        { name: "Phạm Minh Đức", score: 8, timeSpent: 70, date: "Hôm nay" }
      ];
    }
  } catch (e) {
    currentLeaderboardData = [];
  }
  renderLeaderboardUI(currentLeaderboardData);
}

// Gửi điểm số mới lên Bảng xếp hạng
function submitScoreToLeaderboard(name, score, timeSpent) {
  const cleanName = (name && name.trim()) ? name.trim() : "Khách tham quan";
  const now = new Date();
  const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')} ${now.getDate()}/${now.getMonth() + 1}`;

  const entry = {
    name: cleanName,
    score: Number(score),
    timeSpent: Number(timeSpent) || 0,
    timestamp: firebase && firebase.database ? firebase.database.ServerValue.TIMESTAMP : Date.now(),
    dateStr: timeStr
  };

  if (firebaseDb && leaderboardRef) {
    leaderboardRef.push(entry)
      .then(() => console.log("Gửi điểm lên Firebase thành công!"))
      .catch((err) => {
        console.error("Lỗi gửi điểm Firebase:", err);
        saveLocalScore(entry);
      });
  } else {
    saveLocalScore(entry);
  }
}

function saveLocalScore(entry) {
  currentLeaderboardData.push(entry);
  currentLeaderboardData.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return (a.timeSpent || 9999) - (b.timeSpent || 9999);
  });
  if (currentLeaderboardData.length > 20) currentLeaderboardData = currentLeaderboardData.slice(0, 20);
  try {
    localStorage.setItem('museum_local_leaderboard', JSON.stringify(currentLeaderboardData));
  } catch (e) {}
  renderLeaderboardUI(currentLeaderboardData);
}

// Render danh sách Bảng xếp hạng lên HTML
function renderLeaderboardUI(list) {
  const containers = [
    document.getElementById('leaderboard-list-body'),
    document.getElementById('leaderboard-list-body-modal')
  ].filter(Boolean);

  if (containers.length === 0) return;

  if (!list || list.length === 0) {
    container.innerHTML = `<div class="lb-empty">Chưa có lượt thi nào. Hãy là người đầu tiên ghi danh!</div>`;
    return;
  }

  let html = '';
  list.slice(0, 10).forEach((item, index) => {
    let rankBadge = `${index + 1}`;
    let rankClass = '';
    if (index === 0) { rankBadge = '🥇'; rankClass = 'rank-1'; }
    else if (index === 1) { rankBadge = '🥈'; rankClass = 'rank-2'; }
    else if (index === 2) { rankBadge = '🥉'; rankClass = 'rank-3'; }

    const timeFormatted = item.timeSpent ? `${item.timeSpent}s` : '--';

    html += `
      <div class="lb-row ${rankClass}">
        <div class="lb-col-rank">${rankBadge}</div>
        <div class="lb-col-name" title="${item.name}">${escapeHtml(item.name)}</div>
        <div class="lb-col-score"><strong>${item.score}</strong>/10</div>
        <div class="lb-col-time">${timeFormatted}</div>
      </div>
    `;
  });

  containers.forEach(c => c.innerHTML = html);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Khởi chạy khi tài liệu nạp xong
document.addEventListener('DOMContentLoaded', () => {
  initLeaderboardFirebase();
});
