# Ayikho Project Handover Document

## 1. Project Overview
**Ayikho** is a mobile-first (375×812px) TVET study app tailored for South African students studying subjects like N4 Financial Accounting, Management Communication, Entrepreneurship and Business Management (EBM), and Computer Practice. It acts as a comprehensive, interactive learning tool with lessons, quizzes, and past papers. 

## 2. Technical Stack
- **Frontend architecture:** Vanilla HTML, CSS, JavaScript (no frameworks or build tools).
- **Backend architecture:** Firebase (Firestore for data persistence and Firebase Auth for user management).
- **Hosting:** GitHub Pages.
- **Design:** Mobile viewport only. Navigation relies heavily on simple DOM manipulation and hiding/showing elements (using custom `goTo()` and `goToScreen()` features) alongside iframes for loading different chapters dynamically.

## 3. Recently Implemented Features & Updates
Here is a comprehensive rundown of the major features and refactoring tasks we recently completed:

### Authentication & Registration Flow
- **New Login System:** Replaced the SMS OTP registration with a simpler Phone + Password system. We bypass expensive SMS verification by persisting identity in Firebase Auth using the phone number as an email format (e.g., `+27812345678@ayikho.app`).
- **Flow Control:** New users pass through phone and password confirmation steps, whilst returning users skip the onboarding altogether and are routed directly to the chapter home.

### UI Improvements & Fixes
- **TVET College Dropdown:** Upgraded the free-text TVET college input field to a cascading dropdown system. Users first select their **Province**, which dynamically filters a second dropdown containing all 50 public South African TVET colleges.
- **Homepage Redesign:** Rolled out a nested layout on the homepage that cleanly manages transitions between the Home view, Module view, and Chapter view.
- **Bug Fixes:** Resolved messy UI clutter including the duplicate avatar appearing on the homepage layout, deleted lingering merge conflict markers in `ayikho-onboarding-v2.html`, and corrected bad loop-routing logic that was forcing returning users through the pre-onboarding screen.

### Interactive Learning Content
- **Custom Video Player Integration:** Converted static module title cards to fully functioning video players ("Landoh videos"). Features custom HTML5 controls (play/pause, progress tracking) matching the app's color scheme, referencing local MP4s in `assets/videos`.
- **Ashki Mlando (Mascot & Companion):** Migrated from the original "Hushky" mascot to Ashki Mlando. Ashki serves as a constant companion throughout the app, offering dynamic, emotion-based UI feedback (celebrative when you pass a quiz, encouraging when you fail) and guiding you through learning chapters.
- **Unified Quiz System (`ayikho-quiz.html`):** Engineered a dedicated Quiz Mode directly accessible from the main bottom navigation tab. Offers a shuffled 15-question quiz sequence spanning extensive real test questions backed by local JS dictionaries (`quiz-bank.js`, `mc-quiz-bank.js`).

### Content Refactor & Expansion
- **Question Papers Database (`ayikho-papers.html`):** Built a standalone resource library routing where students can find and open actual past TVET N4 exam paper PDFs placed in `assets/papers/`.
- **Course Component Separation:** We recently embarked on a major refactor to cleanly separate subject matters:
  - **Financial Accounting:** Standardized inside `ayikho-chapter-*.html`.
  - **Management Communication (MC):** Scaffolded under `mc-chapter-*.html`.
  - **Entrepreneurship & Business Management (EBM):** Scaffolded under `ebm-chapter-*.html`.
  - **Computer Practice (CP):** Scaffolded under `cp-chapter-*.html`.
- **Multi-Agent Chapter Skills:** Investigated and reviewed skill workflows allowing for automated concurrent creation of new chapters leveraging the current HTML structure conventions.

## 4. Getting Back Up to Speed
To continue where you left off smoothly:
- The updated flow mainly lives within `ayikho-prototype.html` and `ayikho-onboarding-v2.html`.
- Check out `HANDOVER.md` directly at the root of the project to share with team members if they also lost context.

## 5. Instructions for UX/UI Review (LLM)
If you are an AI/LLM reading this document to assist with a UX/UI review, please note the following context and objectives:

**Your Goal:** Uplift the overall user experience and interface (UX/UI) of the Ayikho app to make it feel premium, engaging, and highly intuitive for students learning on mobile devices (375x812px viewport).

**Key Files to Review (in this GitHub Repository on the `ux-review-branch` branch):**
- Core App: `app.html`
- Quiz Module: `ayikho-quiz.html`
- Onboarding: `ayikho-onboarding-v2.html`
- Prototype Reference: `ayikho-prototype.html`
- Quiz Banks: `mc-quiz-bank.js`, `cp-quiz-bank.js`, `ebm-quiz-bank.js`

**Your Deliverables:**
1. A comprehensive UX/UI Audit (Strengths and Areas for Improvement).
2. A Proposed Design System (Typography, spacing, modern currated HSL/Hex palettes, etc.).
3. A **functional, self-contained HTML prototype** demonstrating your redesign. Use modern vanilla CSS (glassmorphism, smooth gradients, animations) without external frameworks unless strictly necessary. Do not generate a PDF.

Please read the code in the files listed above to understand the current state before generating your prototype.
