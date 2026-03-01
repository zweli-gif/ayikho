// ═══════════════════════════════════════════════
// AYIKHO — EVENT TRACKER
// ═══════════════════════════════════════════════
// Lightweight tracking library for user behavior analytics.
// Works in both parent frame and chapter iframes.
// Buffers events locally, batches to Firestore every 30s.

class AyikhoTracker {
  constructor() {
    this.userId = localStorage.getItem('ayikho_userId') || this._generateId();
    this.sessionId = this._generateId();
    this.buffer = [];
    this.screenStart = Date.now();
    this.currentScreen = null;
    this.currentModule = null;
    this.db = null;
    this.initialized = false;

    // Save userId
    localStorage.setItem('ayikho_userId', this.userId);

    // Auto-flush every 30 seconds
    setInterval(() => this.flush(), 30000);

    // Flush on page hide (user leaving)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.track('sessionPause', {});
        this.flush();
      }
    });

    // Flush on beforeunload
    window.addEventListener('beforeunload', () => this.flush());
  }

  // ── INIT FIREBASE ──
  async initFirebase(config) {
    if (this.initialized) return;
    try {
      // Dynamic import Firebase modules
      const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
      const { getFirestore, collection, addDoc, doc, setDoc, serverTimestamp } =
        await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');

      const app = initializeApp(config);
      this.db = getFirestore(app);
      this._collection = collection;
      this._addDoc = addDoc;
      this._doc = doc;
      this._setDoc = setDoc;
      this._serverTimestamp = serverTimestamp;
      this.initialized = true;

      // Flush any buffered events
      this.flush();
      console.log('[Ayikho] Tracker initialized for user:', this.userId);
    } catch (e) {
      console.warn('[Ayikho] Firebase init failed, events buffered locally:', e.message);
    }
  }

  // ── CORE TRACKING ──
  track(type, data) {
    const event = {
      type,
      userId: this.userId,
      sessionId: this.sessionId,
      timestamp: Date.now(),
      ...data
    };
    this.buffer.push(event);

    // Also store in localStorage as backup
    try {
      const stored = JSON.parse(localStorage.getItem('ayikho_events') || '[]');
      stored.push(event);
      // Keep max 500 events in localStorage
      if (stored.length > 500) stored.splice(0, stored.length - 500);
      localStorage.setItem('ayikho_events', JSON.stringify(stored));
    } catch (e) { /* storage full, ignore */ }
  }

  // ── SCREEN VIEW ──
  trackScreen(moduleId, screenName) {
    const now = Date.now();
    const timeOnPrev = now - this.screenStart;

    // Track time on previous screen
    if (this.currentScreen) {
      this.track('screenView', {
        moduleId: this.currentModule,
        screen: this.currentScreen,
        timeMs: timeOnPrev
      });
    }

    this.currentModule = moduleId;
    this.currentScreen = screenName;
    this.screenStart = now;
  }

  // ── QUIZ ANSWER ──
  trackQuiz(moduleId, quizType, questionNum, isCorrect, timeMs) {
    this.track('quizAnswer', {
      moduleId,
      quizType, // 'pre' or 'post'
      questionNum,
      isCorrect,
      timeMs
    });
  }

  // ── MODULE START/COMPLETE ──
  trackModuleStart(moduleId) {
    this.track('moduleStart', { moduleId });
  }

  trackModuleComplete(moduleId, score, totalQuestions, timeMs) {
    this.track('moduleComplete', {
      moduleId,
      score,
      totalQuestions,
      timeMs
    });
  }

  // ── DROP OFF ──
  trackDropOff(moduleId, lastScreen) {
    this.track('dropOff', { moduleId, lastScreen });
  }

  // ── SAVE USER PROFILE ──
  async saveUser(profile) {
    if (!this.initialized || !this.db) {
      // Store locally until Firebase is ready
      localStorage.setItem('ayikho_profile', JSON.stringify(profile));
      return;
    }
    try {
      await this._setDoc(this._doc(this.db, 'users', this.userId), {
        ...profile,
        userId: this.userId,
        createdAt: this._serverTimestamp(),
        lastActiveAt: this._serverTimestamp()
      }, { merge: true });
    } catch (e) {
      console.warn('[Ayikho] Failed to save user:', e.message);
      localStorage.setItem('ayikho_profile', JSON.stringify(profile));
    }
  }

  // ── FLUSH BUFFER TO FIRESTORE ──
  async flush() {
    if (!this.initialized || !this.db || this.buffer.length === 0) return;

    const batch = [...this.buffer];
    this.buffer = [];

    try {
      const eventsRef = this._collection(this.db, 'events');
      // Write events in parallel (batch of promises)
      await Promise.all(batch.map(event =>
        this._addDoc(eventsRef, event)
      ));

      // Update last active timestamp
      await this._setDoc(this._doc(this.db, 'users', this.userId), {
        lastActiveAt: this._serverTimestamp()
      }, { merge: true });

      // Clear localStorage backup for flushed events
      localStorage.removeItem('ayikho_events');
    } catch (e) {
      // Put events back in buffer
      this.buffer = [...batch, ...this.buffer];
      console.warn('[Ayikho] Flush failed, will retry:', e.message);
    }
  }

  // ── HELPERS ──
  _generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 8);
  }
}

// ── GLOBAL INSTANCE ──
window.ayikhoTracker = new AyikhoTracker();
