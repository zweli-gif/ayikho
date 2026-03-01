# Ayikho — TVET N4 Financial Accounting Study App

Ayikho is a mobile-first interactive study app for TVET N4 Financial Accounting students in South Africa. It delivers bite-sized lessons, quizzes, and past papers through a phone-friendly interface.

## What's Inside

| File | Purpose |
|------|---------|
| `index.html` | Landing page & entry point for GitHub Pages |
| `ayikho-prototype.html` | Master app shell (loads onboarding → home → modules) |
| `ayikho-onboarding-v2.html` | 17-screen onboarding (phone, name, college, goals) |
| `ayikho-chapter-home.html` | Module selection home screen |
| `ayikho-chapter-concepts.html` | Module 1: Accounting Concepts & Principles |
| `ayikho-chapter-accounting.html` | Module 2: Double Entry & Accounting Equation |
| `ayikho-chapter-journals.html` | Module 3: Journals & Ledgers |
| `ayikho-chapter-trial-balance.html` | Module 4: Trial Balance |
| `ayikho-chapter-cash-journals.html` | Module 5: Cash Receipts & Payments Journals |
| `ayikho-chapter-debtors-creditors.html` | Module 6: Debtors & Creditors Journals |
| `ayikho-chapter-vat.html` | Module 7: Value Added Tax (VAT) |
| `ayikho-chapter-adjustments.html` | Module 8: Year-End Adjustments |
| `ayikho-chapter-financial-statements.html` | Module 9: Financial Statements |
| `ayikho-chapter-bank-recon.html` | Module 10: Bank Reconciliation |
| `ayikho-dashboard.html` | Student progress dashboard |
| `admin-dashboard.html` | Admin analytics dashboard (password: `ayikho2026`) |
| `student-data.js` | Student progress persistence (localStorage + Firebase sync) |
| `tracking.js` | Event tracking library (buffers → Firestore) |
| `firebase-config.js` | Firebase configuration (needs your keys) |

## Deploy to GitHub Pages (Free)

### Step 1: Create a GitHub Account
1. Go to [github.com](https://github.com) and sign up (free)
2. Verify your email

### Step 2: Create a Repository
1. Click the **+** button (top right) → **New repository**
2. Name it `ayikho` (or `ayikho-app`)
3. Set it to **Public**
4. Do NOT tick "Add a README" (we already have one)
5. Click **Create repository**

### Step 3: Upload Files
1. On your new repo page, click **"uploading an existing file"** link
2. Drag ALL 20 files from this folder into the upload area
3. Type a commit message like "Initial Ayikho MVP"
4. Click **Commit changes**

### Step 4: Enable GitHub Pages
1. Go to your repo → **Settings** tab (top bar)
2. In the left sidebar, click **Pages**
3. Under "Source", select **Deploy from a branch**
4. Choose **main** branch, **/ (root)** folder
5. Click **Save**
6. Wait 1–2 minutes, then your app is live at:
   ```
   https://YOUR-USERNAME.github.io/ayikho/
   ```

## Set Up Firebase (Free Tier)

Firebase gives you a real-time database to track how students use the app. The free tier handles up to 50,000 reads/day and 1 GB storage — more than enough for testing.

### Step 1: Create Firebase Project
1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **Create a project**
3. Name it `ayikho-tvet`
4. Disable Google Analytics (not needed)
5. Click **Create project**

### Step 2: Add a Web App
1. On the project overview page, click the **web icon** `</>`
2. Name it `Ayikho Web`
3. Do NOT tick "Firebase Hosting" (we use GitHub Pages)
4. Click **Register app**
5. You'll see a config block like this:
   ```js
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "ayikho-tvet.firebaseapp.com",
     projectId: "ayikho-tvet",
     storageBucket: "ayikho-tvet.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123"
   };
   ```
6. Copy those values

### Step 3: Update firebase-config.js
Open `firebase-config.js` and replace the placeholder values:
```js
const FIREBASE_CONFIG = {
  apiKey: "YOUR_ACTUAL_API_KEY",        // ← paste from Firebase
  authDomain: "ayikho-tvet.firebaseapp.com",
  projectId: "ayikho-tvet",
  storageBucket: "ayikho-tvet.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",  // ← paste from Firebase
  appId: "YOUR_APP_ID"                  // ← paste from Firebase
};
```

### Step 4: Set Up Firestore Database
1. In Firebase Console, click **Build** → **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (open rules for now)
4. Pick a location close to South Africa (e.g., `europe-west1`)
5. Click **Enable**

### Step 5: Set Firestore Security Rules
1. In Firestore, click the **Rules** tab
2. Replace the rules with:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read, write: if true;
       }
       match /events/{eventId} {
         allow create: if true;
         allow read: if true;
       }
       match /progress/{userId} {
         allow read, write: if true;
       }
     }
   }
   ```
3. Click **Publish**

> **Important:** These rules are open for MVP testing. Before launching to real students at scale, tighten them with proper authentication.

### Step 6: Re-upload firebase-config.js
After editing the config file with your real keys, upload the updated `firebase-config.js` to your GitHub repo (it will overwrite the old one).

## How It Works

The app is 100% static HTML/CSS/JS — no server needed. Here's the flow:

```
index.html → ayikho-prototype.html → onboarding (17 screens)
                                    → chapter home (10 modules)
                                    → individual chapters (pre-quiz → lessons → post-quiz → resources)
                                    → dashboard (progress stats)
```

Each chapter file is self-contained and loaded inside an iframe by the master prototype. Tracking events are sent via `postMessage` to the parent frame, which batches them to Firestore every 30 seconds.

If Firebase isn't configured, everything still works — tracking just saves to localStorage instead.

## Admin Dashboard

Access at `your-site-url/admin-dashboard.html`

Password: `ayikho2026`

Shows: total users, active users, time per module, quiz pass rates, weakest questions, drop-off screens. Currently displays mock data — connects to real Firestore data once Firebase is configured.

## Costs

| Service | Free Tier | Limit |
|---------|-----------|-------|
| GitHub Pages | Free forever | 1 GB storage, 100 GB bandwidth/month |
| Firebase Firestore | Free (Spark plan) | 1 GB storage, 50K reads/day, 20K writes/day |
| Total | **$0/year** | |

## Tech Stack

- Pure HTML/CSS/JS (no frameworks, no build tools)
- Google Fonts: Playfair Display, Outfit, JetBrains Mono
- Firebase Firestore (event tracking)
- Chart.js (admin dashboard charts)
- Designed for 375×812px mobile screens

## Need Help?

If anything breaks or you want to add features, the key files to know are:
- **`ayikho-prototype.html`** — the master shell that loads everything
- **`tracking.js`** — where all analytics events are defined
- **`firebase-config.js`** — the only file you need to edit for Firebase

Built with care for South African TVET students.
