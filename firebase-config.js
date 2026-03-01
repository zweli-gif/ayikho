// ═══════════════════════════════════════════════
// AYIKHO — FIREBASE CONFIG
// ═══════════════════════════════════════════════
// Replace these values with your Firebase project config
// Get them from: Firebase Console → Project Settings → Web app

const FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "ayikho-tvet.firebaseapp.com",
  projectId: "ayikho-tvet",
  storageBucket: "ayikho-tvet.appspot.com",
  messagingSenderId: "000000000000",
  appId: "YOUR_APP_ID"
};

// ═══════════════════════════════════════════════
// SETUP INSTRUCTIONS FOR ZWELI:
// ═══════════════════════════════════════════════
// 1. Go to https://console.firebase.google.com
// 2. Click "Create a project" → name it "ayikho-tvet"
// 3. Enable Firestore Database (test mode to start)
// 4. Enable Authentication → Phone (for OTP)
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
