// ═══════════════════════════════════════════════
// AYIKHO — FIREBASE CONFIG (Vanilla JS / CDN Version)
// ═══════════════════════════════════════════════

// 1. Import Firebase directly from Google's CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// 2. Your specific project keys
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyD89f-i_3zvhICBMw2E7nQRjjLGyyLGDkU",
  authDomain: "ayikho-tvet.firebaseapp.com",
  projectId: "ayikho-tvet",
  storageBucket: "ayikho-tvet.firebasestorage.app",
  messagingSenderId: "1079346801243",
  appId: "1:1079346801243:web:a209ebcdfc5cf94b342d7e",
  measurementId: "G-6CT6LLSZ12"
};

// 3. Initialize the app and the database
const app = initializeApp(FIREBASE_CONFIG);
const db = getFirestore(app);

// 4. Make them globally available so tracking.js can use them
window.FIREBASE_CONFIG = FIREBASE_CONFIG;
window.ayikhoDb = db;
