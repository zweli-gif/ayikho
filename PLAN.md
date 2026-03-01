# Ayikho MVP Plan

## 3 Things to Build

### 1. Firebase Tracking + GitHub Pages Hosting
- Host all files on GitHub Pages (free)
- Use Firebase Firestore (free tier) to track: screen views, quiz answers, time per module, drop-offs
- Each chapter sends events via postMessage to the master prototype, which batches them to Firestore
- Onboarding saves user profile to Firestore (phone, name, college, subjects, current mark, goal)

### 2. Admin Dashboard (`admin-dashboard.html`)
- Password-protected page for Zweli
- Shows: total users, active users, time per module, quiz pass rates, weakest questions, drop-off screens
- Queries Firestore directly using Chart.js for visuals

### 3. Past Papers + Practice Exams per Module
- Add a resources screen to each chapter (after win screen, before "next module")
- 3 NATED past paper links (PDF) + 2 Ayikho practice exams (interactive quiz screens)
- Tracked in analytics so we know which papers students use

## Files to Create/Modify
- `tracking.js` — lightweight event tracker (~100 lines)
- `firebase-config.js` — Firebase init
- `admin-dashboard.html` — admin analytics page
- `ayikho-prototype.html` — add Firebase init + postMessage bridge
- `ayikho-onboarding-v2.html` — save profile to Firestore
- All 10 chapter files — add 5-line tracker hook + resources screen with past papers

## Cost: $0/year (GitHub Pages free, Firebase free tier)
