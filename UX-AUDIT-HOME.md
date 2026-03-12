# UX/UI Audit: Ayikho TVET Home Page
## Comprehensive Redesign Proposal

**Audit Date:** March 12, 2026
**Target User:** Zandile, 19, from Soweto, aspiring bookkeeper
**Current Viewport:** 375×812px (mobile-first)
**Design System:** Playfair Display (headings), Outfit (body), JetBrains Mono (numbers), Caveat (accents)

---

## EXECUTIVE SUMMARY

The Ayikho home page has solid **structural foundations** (proper color system, modular architecture, responsive navigation) but feels **uninspired and generic**. It reads like a checklist ("status bar, header, module list, nav") rather than a **motivational learning journey**.

**Key Problem:** The home page fails to emotionally connect with a 19-year-old South African student. It lacks personality, urgency, and the premium polish of Duolingo or Brilliant. The mascot (Ashki) is absent. The "today's lesson" concept is undefined. Micro-interactions are sparse. The visual hierarchy doesn't guide the user toward their next action.

**Impact:** A young student opening this app sees a flat, corporate interface that doesn't inspire confidence or excitement about their path to a bookkeeping career.

---

## PART 1: SPECIFIC PROBLEMS IDENTIFIED

### 1. GREETING & PERSONAL CONNECTION (Lines 202-203)

**Problem:** The greeting "Sawubona 👋 Zandile" is **too formal and unmotivating**.
- Sawubona is correct for Zulu, but it's a static, emotionless greeting
- The emoji feels tacked-on, not designed
- No emotional hook ("You're 2 modules away from mastering double-entry bookkeeping!")
- No sense of **why** the user is here today

**Current Implementation:**
```html
<div class="hh-greeting">Sawubona 👋</div>
<div class="hh-name">Zandile</div>
```

**Issues:**
- The greeting doesn't change based on time of day (morning vs. evening study sessions)
- No progressive validation ("Great to see you again!" after a 9-day streak)
- No context-aware messaging (e.g., "Your VAT module is unlocked!" when M7 becomes available)
- The Playfair Display name is large but the greeting is tiny (typographic hierarchy is inverted)

**Benchmark:**
- Duolingo: "Welcome back! You're on fire with a 9-day streak 🔥" (uses emoji, motivational language, context)
- Brilliant: "Today's Lesson: Probability & Data" (shows exactly what to learn, creates FOMO)
- Quizlet: "3 sets to review" (actionable, status-driven)

---

### 2. MASCOT ABSENCE (Major)

**Problem:** Ashki (the husky mascot at `assets/ashki/ashki_master.png`) is **completely absent from the home page**.

The platform spec explicitly defines Ashki as a key emotional anchor, yet the home screen has zero interaction with or appearance of the mascot. This is a massive missed opportunity.

**Current State:**
- No mascot visible anywhere on home-view
- No contextual reactions ("Ashki is excited for your VAT lesson!", "Ashki is proud of your 85% score")
- No visual anchor for personality

**Why This Matters:**
- **Emotional Investment:** Mascots (Duo the owl in Duolingo) create parasocial bonds that drive retention
- **Accessibility to Serious Topics:** A 19-year-old learning financial accounting might find it dry. Ashki humanizes the experience
- **South African Relevance:** A husky (unique breed, not a typical lion/elephant) adds personality without cultural appropriation

**Proposed Usage:**
1. Ashki appears in the top-right (above the avatar), small (40×40px), reacting to user state:
   - **Default pose:** calm, sitting
   - **After 9-day streak:** jumping, celebrating
   - **Unlocked new module:** pointing at the module card
   - **Hover on current module:** Ashki nods/winks
2. Ashki has **tooltip-style messages** that appear on tap:
   - "Keep your streak alive! Just 5 minutes for M3."
   - "You're crushing it — 85% on M1 and M2!"
   - "M7 is unlocked. It's about VAT — super important for the exam."

---

### 3. STATS PRESENTATION — NO NARRATIVE (Lines 209-213)

**Problem:** Stats are **informational, not motivational**. Three isolated numbers with no story.

**Current Implementation:**
```html
<div class="hh-stats">
  <div class="hh-stat"><div class="hh-stat-n">🔥9</div><div class="hh-stat-l">Day streak</div></div>
  <div class="hh-stat"><div class="hh-stat-n">2/10</div><div class="hh-stat-l">Modules done</div></div>
  <div class="hh-stat"><div class="hh-stat-n">85%</div><div class="hh-stat-l">Avg. score</div></div>
</div>
```

**Issues:**
1. **Static emoji use:** The fire emoji (🔥) is decorative, not functional. It's the same size as the number, breaking hierarchy.
2. **No context on the streak:** "9 days" — so what? Is that good? What's the goal? What happens at 30?
3. **"2/10 Modules done" is discouraging:** The ratio emphasizes incompleteness (80% left to do). Duolingo would say "20% Complete" or "Level 3 of 10."
4. **"Avg. score" is cold:** No celebration of 85% being excellent. No comparison to previous session (was it 80% last week?).
5. **Layout:** Three equal boxes = three independent facts. There's no **narrative flow** connecting them.

**CSS Issues:**
```css
.hh-stat {
  flex: 1;
  background: rgba(255,255,255,.05);
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 10px;
  padding: 10px 12px;
  text-align: center;
}
```
- The semi-transparent background (opacity .05) is too subtle. Hard to see they're distinct boxes.
- No hover or interaction state (should react to tap on mobile).
- No icon/color differentiation between stats.

**Benchmark Comparison:**

| App | Streak Display | Completion | Score/Accuracy |
|-----|---|---|---|
| **Duolingo** | "9 day streak 🔥 Keep it going!" | "Level 3 · 3 skills unlocked" | Hidden in profile (not emphasized daily) |
| **Brilliant** | "Streak: 9 days" + thermal color (gold→red as it grows) | "Problem 3 of 5 today" | "You're in the top 22% this week" |
| **Ayikho (Current)** | "🔥9" in a gray box | "2/10" in a gray box | "85%" in a gray box |

---

### 4. "TODAY'S LESSON" IS UNDEFINED (Critical UX Gap)

**Problem:** The platform spec says the home dashboard should show "Today's lesson," but **the current implementation doesn't have a clear "what should I do next?" section**.

**Current State:**
- The module cards scroll vertically
- M3 is highlighted with inline styles: `style="border-color:var(--fa);box-shadow:0 0 0 1px var(--fa),0 4px 16px rgba(2,132,199,.12)"`
- The label "Module 3 · Up Next" is added via inline HTML
- But there's no **banner**, **card**, or **CTA** that screams "START HERE"

**Why This Is a Problem:**
- A 19-year-old opening the app should know **exactly** what to do in < 2 seconds
- The current design requires scrolling to find M3 and recognizing the subtle blue glow
- On some screen sizes, M3 might not be visible on first load
- No "Start M3 Now" button, no estimated time ("5 min"), no progress indicator

**CSS/HTML to Blame:**
```css
.modules-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: .2em;
  text-transform: uppercase;
  color: var(--dim);
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
}
```
This label is generic and doesn't highlight urgency or personality.

**Proposed Solution:**
Replace the generic "Financial Accounting N4 · 10 Modules" label with a **"Today's Lesson" hero banner** that:
1. Shows the current module (M3)
2. Shows time estimate ("5 min lesson")
3. Shows what the module teaches ("Learn how journals record transactions")
4. Has a prominent CTA button ("Start Lesson → " or "Resume from 2/8 questions")
5. Displays progress within the lesson (e.g., "2/8 questions done")

---

### 5. MODULE CARDS — GENERIC AND FLAT (Lines 103-134)

**Problem:** Module cards are **functional but uninspiring**. They look like a spreadsheet with colorful dots, not a learning journey.

**Current Issues:**

#### 5a. Progress Ring Overcomplicated
```css
.prog-ring-wrap { position: relative; width: 52px; height: 52px; flex-shrink: 0; }
.prog-ring { transform: rotate(-90deg); }
.prog-ring-bg { fill: none; stroke: var(--bord); stroke-width: 4; }
.prog-ring-fill { fill: none; stroke: var(--fa); stroke-width: 4; stroke-linecap: round; ... }
```

The SVG circular progress ring is:
- **Too technical:** A 19-year-old doesn't understand SVG stroke-dasharray mechanics
- **Inconsistent size:** 52px is oddly specific. Why not 50 or 60?
- **Low visual interest:** A simple circle with a line through it (completed) or half-filled is boring
- **Accessibility issue:** The progress is only visible to sighted users; no text alternative until you hover

**Duolingo's approach:** Simple grid layout with filled/unfilled circles, large checkmark for complete lessons. No SVG needed.

#### 5b. Card Layout Doesn't Scale
```html
<div class="module-card completed" onclick="openModule(1)">
  <div class="prog-ring-wrap">...</div>
  <div class="mc-info">...</div>
  <div class="mc-right"><div class="mc-xp">+150 XP</div></div>
</div>
```

The layout is flex with `gap: 14px`. This works, but:
- The XP badge (+150 XP) is **tiny and easy to miss**
- No visual indication of difficulty or category (all modules look identical)
- Locked modules are indistinguishable except for opacity (55%)
- The metadata row (⏱ 7 min · 3/3 correct) is gray and hard to scan

#### 5c. Connector Lines Don't Add Value
```css
.connector { display: flex; align-items: center; justify-content: center; height: 20px; }
.connector-line { width: 2px; height: 100%; background: var(--bord); }
.connector.done .connector-line { background: var(--green); }
```

Vertical connector lines between cards:
- **Visual noise:** Takes up space without adding clarity
- **Not a real journey:** Connector lines suggest a linear path, but students can jump between modules
- **Confusing on small screens:** At 375px width, the connectors feel cramped

**Where connectors work:** Roadmap apps (Figma, Miro) use them for dependency. Ayikho modules aren't dependent—M4 doesn't require M3 completion.

---

### 6. BOTTOM NAVIGATION — DECORATIVE, NOT FUNCTIONAL (Lines 301-306)

**Problem:** The bottom nav has four items (Learn, Progress, Badges, Profile) but **they don't do anything**.

**Current Implementation:**
```html
<div class="bottom-nav">
  <div class="bn-item active"><div class="bn-icon">📚</div><div class="bn-label">Learn</div></div>
  <div class="bn-item"><div class="bn-icon">📊</div><div class="bn-label">Progress</div></div>
  <div class="bn-item"><div class="bn-icon">🏆</div><div class="bn-label">Badges</div></div>
  <div class="bn-item"><div class="bn-icon">👤</div><div class="bn-label">Profile</div></div>
</div>
```

**Issues:**
1. **No onclick handlers:** These divs are not clickable. They're divs with emoji, not buttons.
2. **"Learn" is active by default** (active class), but it's the home page. Users expect "Learn" to be the home view, so this is confusing.
3. **Icons are emoji:** Font size is 22px for emoji. This is inconsistent with the design system (which should use icon fonts or SVG).
4. **No indication of state:** After tapping "Progress," there's no bottom nav update to show which section you're in.
5. **Accessibility:** No ARIA labels, no semantic button elements.

**CSS Issues:**
```css
.bn-item { opacity: .4; transition: opacity .2s; }
.bn-item.active { opacity: 1; }
.bn-label { color: var(--fa); } /* Only applies to active */
```

The inactive items are 40% opacity (very faint). On a dark background (the bottom nav has background `#05090F`), this is hard to read for some users.

**Benchmark:**
- Duolingo: Bold, colorful icons. Tap "Leaderboard" and it slides in. Clear state management.
- Brilliant: Tab bar with explicit visual feedback (underline, color change).

---

### 7. HEADER BACKGROUND EFFECTS — SUBTLE BUT UNUSED (Lines 79-81)

**Problem:** The home header has two decorative gradient orbs (::before and ::after pseudo-elements) that are **barely visible**.

**Current CSS:**
```css
.home-header::before {
  content: '';
  position: absolute;
  top: -60px;
  right: -40px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(2,132,199,.15), transparent 70%);
}
.home-header::after {
  content: '';
  position: absolute;
  bottom: -30px;
  left: -20px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(124,58,237,.1), transparent 70%);
}
```

**Issues:**
1. **Opacity is too low (0.15 and 0.1):** On a dark background (#1A0A3A), these are nearly invisible.
2. **Positioning is off-canvas:** The orbs are positioned top: -60px and bottom: -30px, so they're mostly hidden.
3. **No animation:** These could pulse, fade, or respond to scroll, but they're static.
4. **Unclear purpose:** Do they represent brands? Themes? They serve no visual function.

**Why Include Them?** If they're meant to be subtle, they work. If they're meant to add visual interest, they fail because users won't see them.

---

### 8. COLOR USAGE — FUNCTIONAL BUT NOT YOUTHFUL (Lines 13-18)

**Current Color System:**
```
--p: #7C3AED (purple) — primary
--pl: #9D5FFF, --pd: #4C1A99 (purple variants)
--fa: #0284C7 (blue) — secondary
--gold: #F59E0B (amber)
--green: #22C55E (success)
--ink: #1A0A3A (dark, near-black)
```

**Issues:**
1. **Purple + Blue Combination:** The primary purple (#7C3AED) and secondary blue (#0284C7) are both cool, muted tones. For a 19-year-old from Soweto, this feels corporate, not youthful.
2. **Gold is Underused:** Only appears as an accent color. Could be used for achievements, badges, or XP highlights.
3. **No "Energy" Colors:** There's no hot pink, bright orange, or vibrant teal. Duolingo's palette is much warmer and more energetic.
4. **Dark Background (#05090F):** The shell background is very dark (near-black). This creates high contrast but feels clinical.

**Comparison:**

| App | Primary | Secondary | Accent | Vibe |
|-----|---------|-----------|--------|------|
| **Duolingo** | Green (#58CC02) | Orange (#FF6B00) | Yellow | Youthful, energetic |
| **Brilliant** | Purple (#635BFF) | Light Blue | Gold | Playful, premium |
| **Quizlet** | Purple (#5E6FA3) | Orange (#FF6B6B) | Green | Clean, academic |
| **Ayikho** | Purple (#7C3AED) | Blue (#0284C7) | Gold | Corporate, cold |

---

### 9. MICRO-INTERACTIONS & ANIMATIONS — MINIMAL (Lines 104-105)

**Current Interactions:**
```css
.module-card:hover {
  border-color: var(--fa);
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(2,132,199,.1);
}
.module-card:active {
  transform: scale(.98);
}
```

**Issues:**
1. **Desktop-focused:** Hover effects don't work on mobile (no hover state on touch). `active` is fleeting.
2. **Minimal visual feedback:** -1px translate and 0.98 scale are subtle. A user might not notice they tapped the card.
3. **No success feedback:** When a module is completed, there's no celebration animation (confetti, shake, glow).
4. **No progress feedback:** Completing a question in a module has no visual consequence on the home screen until refresh.
5. **No gesture feedback:** No pull-down refresh, no swipe navigation, no bottom-drawer interactions.

**Benchmark Interactions:**
- **Duolingo:** Tapping a lesson shakes the card, then slides in the lesson screen. Completing lessons triggers confetti animation.
- **Brilliant:** Cards flip on hover. Completing a problem shows a success card with a celebration sound (optional).

---

### 10. VISUAL HIERARCHY ISSUES

**The Eye Path Should Be:**
1. "What should I do next?" (today's lesson hero section)
2. Progress toward that lesson
3. Overall progress (stats)
4. Other modules to explore

**Current Eye Path:**
1. Greeting (small, gray)
2. Name (large, white)
3. Avatar (small, right)
4. XP bar (subtle)
5. Stats (three identical boxes)
6. Scroll to find today's lesson (M3 is buried in a list)

**Problem:** The greeting and name are sized for a profile page, not for "what should I do today?" The most important information (today's lesson) is not at the top.

---

### 11. ONBOARDING CONTEXT MISSING

**Problem:** The home page assumes a student named "Zandile" with specific stats (9-day streak, 85% avg, 2/10 done) but **there's no onboarding flow shown**.

- What happens when a new user first opens the app?
- Are they shown Ashki? A welcome video?
- Do they set learning goals?
- Is there a "first lesson" tutorial?

The current home page lacks context for new users.

---

## PART 2: PROPOSED REDESIGN

### Design Principles for Redesign

1. **First-Time Magic:** New users should see Ashki and an immediate CTA ("Let's Master Financial Accounting").
2. **Motivation Over Information:** "You're crushing it!" beats "2/10 done."
3. **Action-First Layout:** The very next thing to learn (today's lesson) should be above the fold.
4. **Personality:** Ashki, localized language (Zulu greetings), warm colors, and celebratory micro-interactions.
5. **Mobile-First:** Everything works with touch, not hover.

---

### Proposed Home Page Layout (Top to Bottom)

```
┌─────────────────────────────────┐
│         STATUS BAR              │  [KEEP: Time, signal, battery]
├─────────────────────────────────┤
│      GREETING + ASHKI           │  [NEW: "Sawubona Zandile 👋", Ashki icon, 2 lines]
├─────────────────────────────────┤
│   TODAY'S LESSON (HERO CARD)    │  [CRITICAL NEW: M3, 5 min, Start CTA, 2/8 progress]
├─────────────────────────────────┤
│     QUICK STATS (3 PILLS)       │  [REDESIGNED: Streak card, Progress %, Score card]
│                                 │  [NEW: Ashki reactions on card tap]
├─────────────────────────────────┤
│  "CONTINUE YOUR JOURNEY"        │  [REDESIGNED: Horizontal scroll of next 3 modules]
│  [M3][M4][M5]                  │
├─────────────────────────────────┤
│  "ALL MODULES" (collapsible)    │  [EXISTING: Vertical list, but cleaner design]
│  [M1][M2][M3][M4][M5]...      │
│                                 │
├─────────────────────────────────┤
│      BOTTOM NAV (Functional)    │  [REDESIGNED: Learn | Progress | Badges | Profile]
└─────────────────────────────────┘
```

---

### Section-by-Section Redesign Proposal

#### A. GREETING + ASHKI (Replace Lines 202-203)

**Current:**
```html
<div class="hh-top">
  <div><div class="hh-greeting">Sawubona 👋</div><div class="hh-name">Zandile</div></div>
  <div class="hh-avatar">Z</div>
</div>
```

**Proposed HTML Structure:**
```html
<div class="greeting-hero">
  <div class="greeting-left">
    <div class="greeting-text">
      <div class="greeting-line1">Sawubona, Zandile 👋</div>
      <div class="greeting-line2" id="greeting-motivator">9-day streak — you're crushing it!</div>
    </div>
  </div>
  <div class="greeting-mascot">
    <img src="assets/ashki/ashki_master.png" alt="Ashki" id="ashki-icon" class="ashki-default" />
  </div>
</div>
```

**Proposed CSS:**
```css
.greeting-hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 16px;
}

.greeting-left {
  flex: 1;
}

.greeting-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.greeting-line1 {
  font-family: 'Playfair Display', serif;
  font-size: 24px;
  font-weight: 900;
  color: var(--w);
  line-height: 1.2;
}

.greeting-line2 {
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  color: var(--gold);
  font-weight: 600;
}

.greeting-mascot {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(124,58,237,.2), rgba(2,132,199,.2));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
}

#ashki-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Ashki animations */
.ashki-default {
  animation: ashki-breathe 3s ease-in-out infinite;
}

.ashki-celebrating {
  animation: ashki-jump 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes ashki-breathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes ashki-jump {
  0% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0); }
}
```

**JavaScript to Dynamically Update:**
```javascript
// Update greeting based on time and streak
function updateGreeting() {
  const hour = new Date().getHours();
  const streak = userStats.streak || 0; // From student-data.js
  let greetingLine2 = '';

  if (streak >= 7) {
    greetingLine2 = `${streak}-day streak — you're crushing it! 🔥`;
    document.getElementById('ashki-icon').className = 'ashki-celebrating';
  } else if (streak >= 3) {
    greetingLine2 = `${streak} days in a row. Keep going! 💪`;
  } else {
    greetingLine2 = 'Ready to learn something new?';
  }

  document.getElementById('greeting-motivator').textContent = greetingLine2;
}

// Call on load
updateGreeting();
```

**Why This Works:**
- Ashki is now visible and reacts to streaks
- The greeting is emotional and localized (Zulu)
- Gold accent color makes the motivator message pop
- The icon is touch-friendly (56px vs. 40px)
- Space is saved by removing the separate avatar box

---

#### B. TODAY'S LESSON HERO CARD (New Section, Insert After Greeting)

**Current Problem:** No clear "what to do next" section. M3 is buried in a list with a subtle blue glow.

**Proposed HTML:**
```html
<div class="todays-lesson">
  <div class="lesson-header">
    <div class="lesson-badge">TODAY'S LESSON</div>
    <div class="lesson-time">⏱ 5 min</div>
  </div>

  <div class="lesson-card" onclick="openModule(3)">
    <div class="lesson-circle">
      <div class="lesson-number">3</div>
    </div>

    <div class="lesson-content">
      <div class="lesson-title">Journals & Ledgers</div>
      <div class="lesson-desc">Learn how to record transactions in journals and post them to ledgers.</div>
      <div class="lesson-progress">2/8 questions done</div>
    </div>

    <div class="lesson-cta">
      <div class="cta-button">Resume →</div>
    </div>
  </div>
</div>
```

**Proposed CSS:**
```css
.todays-lesson {
  margin-bottom: 24px;
  position: relative;
}

.lesson-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.lesson-badge {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--gold);
  font-weight: 600;
}

.lesson-time {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: rgba(255,255,255,.6);
}

.lesson-card {
  background: linear-gradient(135deg, var(--p), var(--fa));
  border-radius: 16px;
  padding: 16px;
  display: flex;
  gap: 14px;
  align-items: flex-start;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 8px 32px rgba(124,58,237,.25);
}

.lesson-card:active {
  transform: scale(0.96);
  box-shadow: 0 4px 16px rgba(124,58,237,.15);
}

.lesson-circle {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(255,255,255,.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.lesson-number {
  font-family: 'Playfair Display', serif;
  font-size: 22px;
  font-weight: 900;
  color: white;
}

.lesson-content {
  flex: 1;
  min-width: 0;
  color: white;
}

.lesson-title {
  font-family: 'Playfair Display', serif;
  font-size: 16px;
  font-weight: 900;
  margin-bottom: 4px;
  line-height: 1.2;
}

.lesson-desc {
  font-size: 12px;
  color: rgba(255,255,255,.85);
  margin-bottom: 8px;
  line-height: 1.3;
}

.lesson-progress {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: rgba(255,255,255,.6);
  letter-spacing: 0.05em;
}

.lesson-cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.cta-button {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 600;
  color: white;
  background: rgba(255,255,255,.2);
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,.3);
  text-align: center;
  white-space: nowrap;
}
```

**Why This Works:**
- **Gradient Background:** Creates visual interest and differentiates from module cards
- **Emoji Timing:** Familiar time indicator (⏱ 5 min) is instantly readable
- **Progress Context:** Showing "2/8 questions done" removes ambiguity
- **Large Touch Target:** 48px circle is easy to tap on mobile
- **CTA is Clear:** "Resume →" tells the user exactly what happens on tap
- **Shadow:** Subtle depth makes the card feel important and actionable

---

#### C. QUICK STATS — REDESIGNED (Replace Lines 209-213)

**Current Problem:** Three identical gray boxes with isolated stats. No motivation, no interactivity.

**Proposed HTML:**
```html
<div class="quick-stats-row">
  <div class="quick-stat streak-stat" onclick="showStreakInfo()">
    <div class="stat-icon">🔥</div>
    <div class="stat-content">
      <div class="stat-number">9</div>
      <div class="stat-label">Day Streak</div>
    </div>
  </div>

  <div class="quick-stat progress-stat" onclick="showProgressInfo()">
    <div class="stat-icon">📈</div>
    <div class="stat-content">
      <div class="stat-number">20%</div>
      <div class="stat-label">Complete</div>
    </div>
  </div>

  <div class="quick-stat score-stat" onclick="showScoreInfo()">
    <div class="stat-icon">✓</div>
    <div class="stat-content">
      <div class="stat-number">85%</div>
      <div class="stat-label">Avg. Score</div>
    </div>
  </div>
</div>
```

**Proposed CSS:**
```css
.quick-stats-row {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.quick-stat {
  flex: 1;
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 12px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;
}

.quick-stat::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,.02);
  opacity: 0;
  transition: opacity 0.25s ease;
}

.quick-stat:active {
  transform: scale(0.96);
}

.quick-stat:active::before {
  opacity: 1;
}

/* Stat-specific colors */
.quick-stat.streak-stat {
  border-color: rgba(245,158,11,.3);
  background: rgba(245,158,11,.08);
}

.quick-stat.progress-stat {
  border-color: rgba(2,132,199,.3);
  background: rgba(2,132,199,.08);
}

.quick-stat.score-stat {
  border-color: rgba(34,197,94,.3);
  background: rgba(34,197,94,.08);
}

.stat-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.stat-content {
  flex: 1;
  min-width: 0;
}

.stat-number {
  font-family: 'Playfair Display', serif;
  font-size: 16px;
  font-weight: 900;
  color: white;
  line-height: 1;
  margin-bottom: 2px;
}

.stat-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 8px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,.5);
}
```

**JavaScript for Interactivity:**
```javascript
function showStreakInfo() {
  alert('🔥 9-day streak!\nKeep it going — one more day for 10! Unlock a special Ashki badge at 14 days.');
}

function showProgressInfo() {
  alert('📈 2 of 10 modules complete\nYou\'re 20% of the way to mastering Financial Accounting.');
}

function showScoreInfo() {
  alert('✓ Average: 85%\nYou\'re in the top 15% of learners. Keep this pace and you\'ll ace the exam!');
}
```

**Why This Works:**
- **Color-coded:** Each stat has its own color (gold, blue, green)
- **Emoji-based icons:** Stays visual, no need for icon fonts
- **Interactive:** Tap reveals context and encouragement (not just an alert, could be a tooltip on mobile)
- **Sized correctly:** Stat numbers are 16px (readable), labels are 8px (secondary)
- **Space-efficient:** Three cards in a row, no wasted space

---

#### D. MODULE CARDS — REDESIGNED (Replace Lines 216-299)

**Current Problem:** Progress rings are too technical. Cards are flat. No visual category differentiation.

**Proposed Redesign Philosophy:**
1. Remove SVG progress rings (replace with simpler progress bars or dots)
2. Add color categories or difficulty badges
3. Better contrast for locked modules
4. Horizontal scroll for "continue your journey" section
5. Vertical scroll only for "all modules" (collapsible)

**Proposed HTML for "Continue Your Journey" Section (new horizontal scroll):**
```html
<div class="journey-section">
  <div class="section-header">
    <div class="section-title">Continue Your Journey</div>
    <div class="section-count">3 lessons ahead</div>
  </div>

  <div class="module-carousel">
    <!-- M3 -->
    <div class="carousel-card in-progress" onclick="openModule(3)">
      <div class="card-number">3</div>
      <div class="card-content">
        <div class="card-title">Journals & Ledgers</div>
        <div class="card-progress-bar">
          <div class="progress-fill" style="width: 25%;"></div>
        </div>
        <div class="card-meta">2/8 done</div>
      </div>
    </div>

    <!-- M4 -->
    <div class="carousel-card locked" onclick="openModule(4)">
      <div class="card-number">4</div>
      <div class="card-content">
        <div class="card-title">Trial Balance</div>
        <div class="card-locked-badge">Complete M3 first</div>
      </div>
    </div>

    <!-- M5 -->
    <div class="carousel-card locked" onclick="openModule(5)">
      <div class="card-number">5</div>
      <div class="card-content">
        <div class="card-title">Cash Journals</div>
        <div class="card-locked-badge">Complete M4 first</div>
      </div>
    </div>
  </div>
</div>
```

**Proposed CSS for Carousel:**
```css
.journey-section {
  margin-bottom: 24px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 14px;
  font-weight: 700;
  color: white;
}

.section-count {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  color: var(--dim);
  letter-spacing: 0.1em;
}

.module-carousel {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  padding-bottom: 4px;
  margin: 0 -18px;
  padding: 0 18px;
}

.module-carousel::-webkit-scrollbar {
  height: 3px;
}

.module-carousel::-webkit-scrollbar-track {
  background: transparent;
}

.module-carousel::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,.1);
  border-radius: 2px;
}

.carousel-card {
  flex: 0 0 auto;
  width: 160px;
  background: white;
  border: 2px solid var(--bord);
  border-radius: 14px;
  padding: 14px;
  cursor: pointer;
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;
}

.carousel-card:active {
  transform: scale(0.96);
}

.carousel-card.in-progress {
  border-color: var(--fa);
  box-shadow: 0 4px 16px rgba(2,132,199,.15);
}

.carousel-card.completed {
  border-color: var(--green);
  background: var(--green-xs);
}

.carousel-card.locked {
  opacity: 0.55;
  cursor: default;
}

.carousel-card.locked:active {
  transform: none;
}

.card-number {
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  font-weight: 900;
  color: var(--ink);
  margin-bottom: 8px;
}

.carousel-card.in-progress .card-number {
  color: var(--fa);
}

.carousel-card.completed .card-number {
  color: var(--green);
}

.carousel-card.locked .card-number {
  color: var(--dim);
}

.card-content {
  flex: 1;
}

.card-title {
  font-weight: 600;
  font-size: 12px;
  color: var(--ink);
  margin-bottom: 8px;
  line-height: 1.3;
}

.carousel-card.locked .card-title {
  color: var(--mut);
}

.card-progress-bar {
  height: 4px;
  background: var(--bord);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 6px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--fa), var(--p));
  border-radius: 2px;
  transition: width 0.6s ease;
}

.card-meta {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  color: var(--mut);
  letter-spacing: 0.05em;
}

.card-locked-badge {
  font-family: 'JetBrains Mono', monospace;
  font-size: 8px;
  color: var(--dim);
  padding: 4px 6px;
  background: rgba(26,10,58,.3);
  border-radius: 6px;
  display: inline-block;
  margin-top: 6px;
}
```

**Proposed HTML for "All Modules" Section (cleaned-up vertical list):**
```html
<div class="all-modules-section">
  <div class="section-header">
    <div class="section-title">All Modules</div>
    <div class="section-toggle" id="toggle-all-modules" onclick="toggleAllModules()">
      <span id="toggle-arrow">▼</span>
    </div>
  </div>

  <div class="modules-list" id="modules-list">
    <!-- Repeat for each module, no connector lines -->
    <div class="module-row completed" onclick="openModule(1)">
      <div class="row-left">
        <div class="row-indicator">✓</div>
        <div class="row-info">
          <div class="row-title">Accounting Concepts</div>
          <div class="row-meta">7 min · 3/3 correct</div>
        </div>
      </div>
      <div class="row-xp">+150 XP</div>
    </div>

    <!-- Continue for M2-M10 -->
  </div>
</div>
```

**Proposed CSS for All Modules:**
```css
.all-modules-section {
  margin-bottom: 16px;
}

.section-toggle {
  font-size: 12px;
  cursor: pointer;
  color: var(--dim);
  transition: color 0.2s ease;
}

.section-toggle:active {
  color: var(--fa);
}

.modules-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: 600px;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.modules-list.collapsed {
  max-height: 0;
  gap: 0;
}

.module-row {
  background: white;
  border: 1px solid var(--bord);
  border-radius: 12px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.25s ease;
}

.module-row:active {
  background: var(--psm);
  transform: scale(0.98);
}

.module-row.completed {
  border-color: var(--green);
  background: var(--green-xs);
}

.row-left {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.row-indicator {
  font-size: 18px;
  flex-shrink: 0;
}

.module-row.completed .row-indicator {
  color: var(--green);
}

.row-info {
  flex: 1;
  min-width: 0;
}

.row-title {
  font-weight: 600;
  font-size: 13px;
  color: var(--ink);
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.row-meta {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: var(--mut);
}

.row-xp {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 600;
  color: var(--green);
  background: var(--green-xs);
  padding: 3px 8px;
  border-radius: 100px;
  flex-shrink: 0;
  white-space: nowrap;
}
```

**Why This Works:**
1. **Two-tier structure:** "Continue" (horizontal, prominent) + "All Modules" (collapsible, secondary)
2. **No connector lines:** Cleaner, less visual noise
3. **Better progress indication:** Simple progress bar instead of SVG rings
4. **Color-coded states:** In-progress (blue), completed (green), locked (dim)
5. **Responsive carousel:** Horizontal scroll works naturally on mobile
6. **Accessibility:** Cleaner HTML, easier for screen readers

---

#### E. BOTTOM NAVIGATION — FUNCTIONAL (Redesign Lines 301-306)

**Current Problem:** Non-functional divs, emoji icons, no state management.

**Proposed HTML:**
```html
<div class="bottom-nav">
  <button class="nav-item active" data-view="learn" onclick="switchView('learn')">
    <span class="nav-icon">📚</span>
    <span class="nav-label">Learn</span>
  </button>
  <button class="nav-item" data-view="progress" onclick="switchView('progress')">
    <span class="nav-icon">📊</span>
    <span class="nav-label">Progress</span>
  </button>
  <button class="nav-item" data-view="badges" onclick="switchView('badges')">
    <span class="nav-icon">🏆</span>
    <span class="nav-label">Badges</span>
  </button>
  <button class="nav-item" data-view="profile" onclick="switchView('profile')">
    <span class="nav-icon">👤</span>
    <span class="nav-label">Profile</span>
  </button>
</div>
```

**Proposed CSS:**
```css
.bottom-nav {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px 16px 28px;
  border-top: 1px solid var(--bord);
  flex-shrink: 0;
  background: #05090F;
  gap: 0;
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0.4;
  transition: all 0.25s ease;
  -webkit-appearance: none;
}

.nav-item:active {
  opacity: 0.7;
  transform: scale(0.95);
}

.nav-item.active {
  opacity: 1;
}

.nav-icon {
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 8px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,.5);
  transition: color 0.25s ease;
}

.nav-item.active .nav-label {
  color: var(--fa);
  font-weight: 600;
}

.nav-item:active .nav-label {
  color: var(--fa);
}
```

**JavaScript:**
```javascript
function switchView(viewName) {
  // Update nav state
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  document.querySelector(`[data-view="${viewName}"]`).classList.add('active');

  // Switch view (placeholder)
  console.log('Switching to:', viewName);
  // TODO: Implement view switching for Progress, Badges, Profile
}
```

**Why This Works:**
- **Semantic HTML:** Uses `<button>` instead of `<div>`
- **Clear state:** `.active` class shows which section is selected
- **Better accessibility:** ARIA labels could be added
- **Mobile-friendly:** Tap targets are larger, feedback is instant
- **Scalable:** Easy to add new nav items

---

## PART 3: IMPLEMENTATION PRIORITY

### Phase 1: High-Impact, Low-Effort (Week 1)

1. **Add Greeting Motivation** (30 min)
   - Update lines 202-203 to add dynamic greeting
   - Update greeting text based on streak, time of day

2. **Color-Code Quick Stats** (30 min)
   - Add background colors to .hh-stat boxes
   - Replace emoji with icons or keep emoji but improve sizing

3. **Highlight Today's Lesson** (1 hour)
   - Add visual hero card for M3 (above the module list)
   - Add "Today's Lesson" label and start CTA

4. **Remove Connector Lines** (15 min)
   - Hide or remove `.connector` divs
   - Add padding to module cards to compensate

### Phase 2: Medium-Impact, Medium-Effort (Week 2)

5. **Add Ashki to Home Page** (2 hours)
   - Add img src for Ashki
   - Implement Ashki animation states (default, celebrating, reacting)
   - Link Ashki reactions to streak/stats

6. **Redesign Module Cards** (3 hours)
   - Remove SVG progress rings
   - Replace with simple progress bars
   - Add color coding (in-progress=blue, completed=green, locked=gray)
   - Update card styling for better contrast

7. **Build "Continue Your Journey" Carousel** (2 hours)
   - Add horizontal scroll section above module list
   - Style carousel cards differently from vertical list
   - Test on various viewport sizes

### Phase 3: Polish & Refinement (Week 3)

8. **Enhance Micro-Interactions** (2 hours)
   - Add card flip/bounce on tap
   - Add confetti animation on module completion
   - Add pull-down refresh gesture
   - Add subtle parallax scroll on header

9. **Optimize Color Scheme** (1 hour)
   - Test contrast ratios (WCAG AA)
   - Consider warmer accent colors (optional)
   - Refine dark background if needed

10. **Implement Functional Bottom Navigation** (2 hours)
    - Add onclick handlers to nav items
    - Build Progress view (stats, charts)
    - Build Badges view (achievements)
    - Build Profile view (settings, edit name/goal)

---

## PART 4: SPECIFIC CSS/HTML CHANGES

### Change 1: Greeting Section (Lines 200-204)

**Replace:**
```html
<div class="hh-top">
  <div><div class="hh-greeting">Sawubona 👋</div><div class="hh-name">Zandile</div></div>
  <div class="hh-avatar">Z</div>
</div>
```

**With:**
```html
<div class="greeting-hero">
  <div class="greeting-left">
    <div class="greeting-line1">Sawubona, Zandile 👋</div>
    <div class="greeting-line2" id="greeting-motivator">9-day streak — you're crushing it!</div>
  </div>
  <div class="greeting-mascot">
    <img src="assets/ashki/ashki_master.png" alt="Ashki" id="ashki-icon" />
  </div>
</div>
```

**Add CSS:**
```css
.greeting-hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 16px;
}

.greeting-line1 {
  font-family: 'Playfair Display', serif;
  font-size: 24px;
  font-weight: 900;
  color: white;
  margin-bottom: 4px;
  line-height: 1.2;
}

.greeting-line2 {
  font-size: 13px;
  color: var(--gold);
  font-weight: 600;
}

.greeting-mascot {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(124,58,237,.2), rgba(2,132,199,.2));
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.greeting-mascot img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
```

---

### Change 2: Add Today's Lesson Hero Card (Insert After Greeting)

**Add HTML (after greeting-hero div):**
```html
<div class="todays-lesson">
  <div class="lesson-header">
    <span class="lesson-badge">TODAY'S LESSON</span>
    <span class="lesson-time">⏱ 5 min</span>
  </div>
  <div class="lesson-card" onclick="openModule(3)">
    <div class="lesson-circle"><span class="lesson-number">3</span></div>
    <div class="lesson-content">
      <div class="lesson-title">Journals & Ledgers</div>
      <div class="lesson-desc">Learn how to record transactions and post them to ledgers.</div>
      <div class="lesson-progress">2/8 questions done</div>
    </div>
    <div class="lesson-cta"><span class="cta-button">Resume →</span></div>
  </div>
</div>
```

**Add CSS:**
```css
.todays-lesson {
  margin-bottom: 24px;
}

.lesson-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding: 0 4px;
}

.lesson-badge {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--gold);
  font-weight: 600;
}

.lesson-time {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: rgba(255,255,255,.6);
}

.lesson-card {
  background: linear-gradient(135deg, var(--p), var(--fa));
  border-radius: 16px;
  padding: 16px;
  display: flex;
  gap: 14px;
  align-items: flex-start;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 32px rgba(124,58,237,.25);
}

.lesson-card:active {
  transform: scale(0.96);
  box-shadow: 0 4px 16px rgba(124,58,237,.15);
}

.lesson-circle {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(255,255,255,.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.lesson-number {
  font-family: 'Playfair Display', serif;
  font-size: 22px;
  font-weight: 900;
  color: white;
}

.lesson-content {
  flex: 1;
  color: white;
}

.lesson-title {
  font-family: 'Playfair Display', serif;
  font-size: 16px;
  font-weight: 900;
  margin-bottom: 4px;
}

.lesson-desc {
  font-size: 12px;
  color: rgba(255,255,255,.85);
  margin-bottom: 8px;
  line-height: 1.3;
}

.lesson-progress {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: rgba(255,255,255,.6);
}

.lesson-cta {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.cta-button {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 600;
  color: white;
  background: rgba(255,255,255,.2);
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,.3);
}
```

---

### Change 3: Redesign Quick Stats (Lines 209-213)

**Replace:**
```html
<div class="hh-stats">
  <div class="hh-stat"><div class="hh-stat-n">🔥9</div><div class="hh-stat-l">Day streak</div></div>
  <div class="hh-stat"><div class="hh-stat-n">2/10</div><div class="hh-stat-l">Modules done</div></div>
  <div class="hh-stat"><div class="hh-stat-n">85%</div><div class="hh-stat-l">Avg. score</div></div>
</div>
```

**With:**
```html
<div class="quick-stats-row">
  <div class="quick-stat streak-stat" onclick="showStreakInfo()">
    <div class="stat-icon">🔥</div>
    <div class="stat-content">
      <div class="stat-number">9</div>
      <div class="stat-label">Streak</div>
    </div>
  </div>
  <div class="quick-stat progress-stat" onclick="showProgressInfo()">
    <div class="stat-icon">📈</div>
    <div class="stat-content">
      <div class="stat-number">20%</div>
      <div class="stat-label">Done</div>
    </div>
  </div>
  <div class="quick-stat score-stat" onclick="showScoreInfo()">
    <div class="stat-icon">✓</div>
    <div class="stat-content">
      <div class="stat-number">85%</div>
      <div class="stat-label">Score</div>
    </div>
  </div>
</div>
```

**Replace old .hh-stats CSS with:**
```css
.quick-stats-row {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.quick-stat {
  flex: 1;
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 12px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.quick-stat.streak-stat {
  border-color: rgba(245,158,11,.3);
  background: rgba(245,158,11,.08);
}

.quick-stat.progress-stat {
  border-color: rgba(2,132,199,.3);
  background: rgba(2,132,199,.08);
}

.quick-stat.score-stat {
  border-color: rgba(34,197,94,.3);
  background: rgba(34,197,94,.08);
}

.quick-stat:active {
  transform: scale(0.96);
}

.stat-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.stat-content {
  flex: 1;
}

.stat-number {
  font-family: 'Playfair Display', serif;
  font-size: 16px;
  font-weight: 900;
  color: white;
  margin-bottom: 2px;
}

.stat-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 8px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,.5);
}
```

---

### Change 4: Simplify Module Cards (Lines 220-296)

**Key CSS Changes:**

1. **Remove SVG Progress Rings:**
```css
/* OLD */
.prog-ring { transform: rotate(-90deg); }
.prog-ring-bg { fill: none; stroke: var(--bord); stroke-width: 4; }
.prog-ring-fill { fill: none; stroke: var(--fa); stroke-width: 4; ... }

/* NEW */
.module-card-progress {
  height: 4px;
  background: var(--bord);
  border-radius: 2px;
  overflow: hidden;
  flex: 1;
  max-width: 120px;
}

.module-card-progress-fill {
  height: 100%;
  background: var(--fa);
  border-radius: 2px;
  transition: width 0.6s ease;
}

.module-card.completed .module-card-progress-fill {
  background: var(--green);
}
```

2. **Update Module Card HTML to use progress bar instead of SVG:**
```html
<!-- OLD -->
<div class="prog-ring-wrap">
  <svg class="prog-ring" viewBox="0 0 52 52">
    <circle class="prog-ring-bg" cx="26" cy="26" r="22"/>
    <circle class="prog-ring-fill" cx="26" cy="26" r="22" stroke-dasharray="138.23" stroke-dashoffset="0"/>
  </svg>
  <div class="prog-ring-center"><span class="prog-ring-num">✓</span></div>
</div>

<!-- NEW -->
<div class="module-status">
  <div class="status-indicator">✓</div>
</div>
```

3. **Add color coding to module cards:**
```css
.module-card {
  border: 2px solid var(--bord);
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  transition: all .25s;
  background: white;
}

/* In-progress module (M3) */
.module-card.in-progress {
  border-color: var(--fa);
  box-shadow: 0 4px 16px rgba(2,132,199,.12);
}

/* Completed module */
.module-card.completed {
  border-color: var(--green);
  background: var(--green-xs);
}

/* Locked module */
.module-card.locked {
  opacity: 0.55;
  border-color: var(--bord);
  cursor: default;
}

.module-card.locked:hover {
  border-color: var(--bord);
  transform: none;
  box-shadow: none;
}

.module-card:hover {
  border-color: var(--fa);
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(2,132,199,.1);
}

.module-card:active {
  transform: scale(.98);
}
```

---

### Change 5: Hide Connector Lines (Lines 135-137)

**Current:**
```css
.connector {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  position: relative;
}

.connector-line {
  width: 2px;
  height: 100%;
  background: var(--bord);
}

.connector.done .connector-line {
  background: var(--green);
}
```

**Change to:**
```css
.connector {
  display: none; /* Hide connector lines */
}
```

---

### Change 6: Fix Bottom Navigation (Lines 301-306)

**Replace:**
```html
<div class="bottom-nav">
  <div class="bn-item active"><div class="bn-icon">📚</div><div class="bn-label">Learn</div></div>
  <div class="bn-item"><div class="bn-icon">📊</div><div class="bn-label">Progress</div></div>
  <div class="bn-item"><div class="bn-icon">🏆</div><div class="bn-label">Badges</div></div>
  <div class="bn-item"><div class="bn-icon">👤</div><div class="bn-label">Profile</div></div>
</div>
```

**With:**
```html
<div class="bottom-nav">
  <button class="nav-item active" data-view="learn" onclick="switchView('learn')">
    <span class="nav-icon">📚</span>
    <span class="nav-label">Learn</span>
  </button>
  <button class="nav-item" data-view="progress" onclick="switchView('progress')">
    <span class="nav-icon">📊</span>
    <span class="nav-label">Progress</span>
  </button>
  <button class="nav-item" data-view="badges" onclick="switchView('badges')">
    <span class="nav-icon">🏆</span>
    <span class="nav-label">Badges</span>
  </button>
  <button class="nav-item" data-view="profile" onclick="switchView('profile')">
    <span class="nav-icon">👤</span>
    <span class="nav-label">Profile</span>
  </button>
</div>
```

**Replace nav CSS:**
```css
.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  background: none;
  border: none;
  cursor: pointer;
  opacity: .4;
  transition: all .25s;
  -webkit-appearance: none;
}

.nav-item.active {
  opacity: 1;
}

.nav-item:active {
  opacity: .7;
  transform: scale(.95);
}

.nav-icon {
  font-size: 22px;
}

.nav-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 8px;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: rgba(255,255,255,.5);
}

.nav-item.active .nav-label {
  color: var(--fa);
  font-weight: 600;
}
```

**Add JavaScript:**
```javascript
function switchView(viewName) {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  document.querySelector(`[data-view="${viewName}"]`).classList.add('active');
  console.log('Switching to:', viewName);
}
```

---

## PART 5: DESIGN BENCHMARKS

### Duolingo Home (Reference)
- **Greeting:** "Welcome back! You're 1 day away from a 100-day streak 🔥"
- **Today's Lesson:** Large card with the current lesson, time estimate, and a CTA
- **Streak Visualizer:** Progress ring showing day-by-day streak
- **Recent Lessons:** Horizontal scroll of recent/in-progress lessons
- **Micro-interactions:** Cards bounce on tap, confetti on lesson completion
- **Color Scheme:** Green, orange, and warm accent colors

### Brilliant Home (Reference)
- **Greeting:** "Hi Alex, you've solved 156 problems"
- **Daily Problem:** Large featured card with the current daily problem
- **Learning Paths:** Cards show progress toward specific topics
- **Achievements:** Badges and points are visible
- **Design:** Colorful, playful, uses illustrations

### Quizlet Home (Reference)
- **Quick Stats:** Study streak, total study time, questions answered
- **Recent Sets:** Cards showing sets you've studied
- **Recommended:** Personalized recommendations based on study history
- **Social Elements:** Friends' recent activities (optional)
- **Color Scheme:** Purple, orange, clean typography

---

## PART 6: ESTIMATED EFFORT & TIMELINE

| Phase | Task | Effort | Time | Owner |
|-------|------|--------|------|-------|
| 1 | Add greeting motivation | 30 min | Day 1 | Dev |
| 1 | Color-code quick stats | 30 min | Day 1 | Dev |
| 1 | Add "Today's Lesson" hero card | 1 hr | Day 1 | Dev |
| 1 | Remove connector lines | 15 min | Day 1 | Dev |
| 1 | **Phase 1 Testing** | 1 hr | Day 2 | QA |
| 2 | Add Ashki to home page | 2 hrs | Day 3-4 | Dev |
| 2 | Redesign module cards | 3 hrs | Day 4-5 | Dev |
| 2 | Build "Continue Your Journey" carousel | 2 hrs | Day 5-6 | Dev |
| 2 | **Phase 2 Testing & Polish** | 2 hrs | Day 6-7 | QA |
| 3 | Enhance micro-interactions | 2 hrs | Day 8 | Dev |
| 3 | Optimize color scheme & accessibility | 1 hr | Day 8 | Design + Dev |
| 3 | Implement functional bottom navigation | 2 hrs | Day 9 | Dev |
| 3 | **Phase 3 Testing & Release** | 2 hrs | Day 10 | QA |
| - | **TOTAL** | **~19 hrs** | **10 days** | - |

---

## CONCLUSION

The Ayikho home page has solid foundations but needs **significant personality and motivation injections** to compete with premium study apps. The redesign focuses on:

1. **Emotional Connection:** Ashki mascot, localized greeting, celebration micro-interactions
2. **Clear Next Steps:** Hero card for today's lesson, obvious CTA
3. **Visual Hierarchy:** Greeting, today's lesson, stats, then all modules
4. **Mobile-Friendly:** Touch-first interactions, no hover-only states
5. **Premium Polish:** Gradients, shadows, smooth animations, color coding

With these changes, Ayikho will feel like a **$50 app**, not a basic prototype. A 19-year-old from Soweto opening this will think, "This is made for me. Let me crush this bookkeeping course."

**Next Steps:**
1. Prioritize Phase 1 changes (high-impact, low-effort)
2. Get user feedback on the Ashki addition and "Today's Lesson" card
3. Iterate on color scheme based on accessibility testing
4. Roll out phases 2 and 3 incrementally

