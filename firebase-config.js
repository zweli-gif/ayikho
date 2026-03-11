// ═══════════════════════════════════════════════
// AYIKHO — FIREBASE CONFIG
// ═══════════════════════════════════════════════
// Replace these values with your Firebase project config
// Get them from: Firebase Console → Project Settings → Web app

window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyD89f-i_3zvhICBMw2E7nQRjjLGyyLGDkU",
  authDomain: "ayikho-tvet.firebaseapp.com",
  projectId: "ayikho-tvet",
  storageBucket: "ayikho-tvet.firebasestorage.app",
  messagingSenderId: "1079346801243",
  appId: "1:1079346801243:web:a209ebcdfc5cf94b342d7e",
  measurementId: "G-6CT6LLSZ12"
};

// ═══════════════════════════════════════════════
// SETUP INSTRUCTIONS FOR ZWELI:
// ═══════════════════════════════════════════════
// 1. Go to https://console.firebase.google.com
// 2. Click "Create a project" → name it "ayikho-tvet"
// 3. Enable Firestore Database (test mode to start)
// 4. Enable Authentication → Sign-in method → Phone
//    **CRITICAL**: In the Phone Auth settings, add a "Test Number"
//    (e.g., +27812345678) and a fixed OTP (e.g., 1234) so you can
//    test the app locally without using up SMS quota or needing a real phone.
// 5. Go to Project Settings → scroll to "Your apps" → click web icon (</>)
// 6. Copy the config values and paste them above
// 7. In Firestore → Rules, paste:
//
//    rules_version = '2';
//    service cloud.firestore {
//      match /databases/{database}/documents {
//        match /users/{userId} {
//          allow read, write: if true;
//        }
//        match /events/{eventId} {
//          allow create: if true;
//          allow read: if true;
//        }
//        match /progress/{userId} {
//          allow read, write: if true;
//        }
//      }
//    }
//
// NOTE: These rules are open for MVP testing.
// Before going live with real students, tighten them.
