// ==============================================================================
// CẤU HÌNH FIREBASE REALTIME DATABASE - BẢNG XẾP HẠNG BẢO TÀNG ĐẠI HỘI VII
// ==============================================================================
// Hướng dẫn: Dán thông tin firebaseConfig lấy từ Firebase Console vào đây.

const FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Kiểm tra xem cấu hình đã được điền chưa
function isFirebaseConfigured() {
  return FIREBASE_CONFIG && 
         FIREBASE_CONFIG.apiKey !== "YOUR_API_KEY" && 
         FIREBASE_CONFIG.databaseURL && 
         !FIREBASE_CONFIG.databaseURL.includes("YOUR_PROJECT_ID");
}
