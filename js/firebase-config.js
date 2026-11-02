// ==============================================================================
// CẤU HÌNH FIREBASE REALTIME DATABASE - BẢNG XẾP HẠNG BẢO TÀNG ĐẠI HỘI VII
// ==============================================================================

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDXOsB-Vjuh_i8ZdhMigE42EhlxC-QCwN8",
  authDomain: "trie-1ae27.firebaseapp.com",
  databaseURL: "https://trie-1ae27-default-rtdb.firebaseio.com",
  projectId: "trie-1ae27",
  storageBucket: "trie-1ae27.firebasestorage.app",
  messagingSenderId: "852497463406",
  appId: "1:852497463406:web:f2f56a0cd948f2ab8f4e7f",
  measurementId: "G-CHJ7ZV07NH"
};

// Kiểm tra xem cấu hình đã được điền chưa
function isFirebaseConfigured() {
  return FIREBASE_CONFIG && 
         FIREBASE_CONFIG.apiKey && 
         FIREBASE_CONFIG.databaseURL && 
         !FIREBASE_CONFIG.databaseURL.includes("YOUR_PROJECT_ID");
}
