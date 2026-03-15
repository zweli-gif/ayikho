// ═══════════════════════════════════════════════
// AYIKHO — STUDENT DATA PERSISTENCE LAYER
// ═══════════════════════════════════════════════
// Single source of truth for all student progress.
// Saves to localStorage instantly, syncs to Firebase when available.
// Data survives between sessions on the same device.

class AyikhoStudentData {
  constructor() {
    this.STORAGE_KEY = 'ayikho_student';
    this.data = this._load();
    this.db = null;
    this.firebaseRefs = null;

    // Auto-save every 10 seconds
    setInterval(() => this._save(), 10000);

    // Save on page hide
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') this._save();
    });
    window.addEventListener('beforeunload', () => this._save());
  }

  // ── DEFAULT DATA STRUCTURE ──
  _defaultData() {
    return {
      userId: localStorage.getItem('ayikho_userId') || this._generateId(),
      profile: {
        name: '',
        gender: '',
        province: '',
        college: '',
        phone: '',
        level: '',
        course: '',
        subjects: [],
        fiveYearGoal: '',
        dream: '',
        registeredDate: new Date().toISOString().split('T')[0],
        currentMark: 0,
        targetMark: 70,
        createdAt: Date.now()
      },
      onboardingComplete: false,
      // Per-module progress
      modules: {
        1: this._defaultModule(), 2: this._defaultModule(),
        3: this._defaultModule(), 4: this._defaultModule(),
        5: this._defaultModule(), 6: this._defaultModule(),
        7: this._defaultModule(), 8: this._defaultModule(),
        9: this._defaultModule(), 10: this._defaultModule()
      },
      // Global stats
      stats: {
        totalTimeMs: 0,
        totalXP: 0,
        streakDays: 0,
        lastActiveDate: null,  // YYYY-MM-DD format
        sessionsCount: 0
      },
      // Last position for resume
      lastPosition: {
        moduleId: null,
        screenIndex: 0,
        timestamp: null
      },
      // Practice quizzes
      practiceQuizzes: {
        totalAttempts: 0,
        bestScores: {},
        history: []
      },
      // Capstone exam
      capstoneExam: {
        attempts: 0,
        bestScore: 0,
        bestPercentage: 0,
        history: [],
        weakAreas: []
      }
    };
  }

  _defaultModule() {
    return {
      status: 'locked',          // 'locked', 'available', 'in_progress', 'completed'
      currentScreen: 0,
      totalScreens: 0,
      timeSpentMs: 0,
      startedAt: null,
      completedAt: null,
      preQuiz: { score: 0, total: 0, answers: [], completedAt: null },
      postQuiz: { score: 0, total: 0, answers: [], completedAt: null },
      weakSpots: [],             // Array of { question, topic, wrongAnswer }
      xpEarned: 0,
      lastScreenVisited: 0
    };
  }

  // ── LOAD / SAVE ──
  _load() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge with defaults to handle new fields added in updates
        const defaults = this._defaultData();
        return this._deepMerge(defaults, parsed);
      }
    } catch (e) { console.warn('[AyikhoData] Load failed:', e); }
    return this._defaultData();
  }

  _save() {
    try {
      this.data.stats.lastActiveDate = new Date().toISOString().split('T')[0];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) { console.warn('[AyikhoData] Save failed:', e); }

    // Sync to Firebase if available
    this._syncToFirebase();
  }

  _deepMerge(target, source) {
    const result = { ...target };
    for (const key of Object.keys(source)) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = this._deepMerge(target[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
    return result;
  }

  // ── FIREBASE SYNC ──
  async initFirebase(config) {
    try {
      const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
      const { getFirestore, doc, setDoc, serverTimestamp } =
        await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');

      const app = initializeApp(config, 'ayikho-student-data');
      this.db = getFirestore(app);
      this.firebaseRefs = { doc, setDoc, serverTimestamp };

      // Initial sync
      this._syncToFirebase();
      console.log('[AyikhoData] Firebase connected for user:', this.data.userId);
    } catch (e) {
      console.warn('[AyikhoData] Firebase init failed:', e.message);
    }
  }

  async _syncToFirebase() {
    if (!this.db || !this.firebaseRefs) return;
    try {
      const { doc, setDoc, serverTimestamp } = this.firebaseRefs;
      await setDoc(doc(this.db, 'progress', this.data.userId), {
        ...this.data,
        lastSyncedAt: serverTimestamp()
      }, { merge: true });
    } catch (e) { /* silent fail */ }
  }

  // ── WRITE FLAT PROFILE TO users/ COLLECTION (powers admin dashboard master list) ──
  async _syncUserProfile() {
    if (!this.db || !this.firebaseRefs) return;
    try {
      const { doc, setDoc, serverTimestamp } = this.firebaseRefs;
      const p = this.data.profile;
      await setDoc(doc(this.db, 'users', this.data.userId), {
        userId:         this.data.userId,
        name:           p.name           || '',
        gender:         p.gender         || '',
        phone:          p.phone          || '',
        province:       p.province       || '',
        college:        p.college        || '',
        level:          p.level          || '',
        course:         p.course         || '',
        subjects:       p.subjects       || [],
        fiveYearGoal:   p.fiveYearGoal   || '',
        dream:          p.dream          || '',
        registeredDate: p.registeredDate || new Date().toISOString().split('T')[0],
        lastSyncedAt:   serverTimestamp()
      }, { merge: true });
      console.log('[AyikhoData] users/ profile synced:', this.data.userId);
    } catch (e) {
      console.warn('[AyikhoData] users/ sync failed:', e.message);
    }
  }

  // ══════════════════════════════════
  //  PUBLIC API — PROFILE
  // ══════════════════════════════════

  setProfile(profile) {
    this.data.profile = { ...this.data.profile, ...profile };
    this._save();
    // Keep users/ collection in sync whenever profile fields change
    this._syncUserProfile();
  }

  getProfile() {
    return this.data.profile;
  }

  setOnboardingComplete(val) {
    this.data.onboardingComplete = val;
    this._save();
    // Fire profile to users/ collection the moment onboarding finishes
    if (val) this._syncUserProfile();
  }

  isOnboardingComplete() {
    return this.data.onboardingComplete;
  }

  // ══════════════════════════════════
  //  PUBLIC API — MODULE PROGRESS
  // ══════════════════════════════════

  getModule(moduleId) {
    const key = String(moduleId);
    if (!this.data.modules[key]) {
      this.data.modules[key] = this._defaultModule();
    }
    return this.data.modules[key];
  }

  startModule(moduleId) {
    const mod = this.getModule(moduleId);
    if (mod.status === 'locked' || mod.status === 'available') {
      mod.status = 'in_progress';
      mod.startedAt = mod.startedAt || Date.now();
    }
    this.data.lastPosition.moduleId = moduleId;
    this.data.lastPosition.timestamp = Date.now();
    this._save();
  }

  completeModule(moduleId) {
    const mod = this.getModule(moduleId);
    mod.status = 'completed';
    mod.completedAt = Date.now();

    // Award XP
    const quizScore = mod.postQuiz.total > 0 ? mod.postQuiz.score / mod.postQuiz.total : 0;
    const baseXP = 100;
    const bonusXP = Math.round(quizScore * 50);
    mod.xpEarned = baseXP + bonusXP;
    this.data.stats.totalXP += mod.xpEarned;

    // Unlock next module
    const nextId = parseInt(moduleId) + 1;
    if (nextId <= 10) {
      const nextMod = this.getModule(nextId);
      if (nextMod.status === 'locked') {
        nextMod.status = 'available';
      }
    }

    this._save();
  }

  setModuleScreen(moduleId, screenIndex, totalScreens) {
    const mod = this.getModule(moduleId);
    mod.currentScreen = screenIndex;
    if (totalScreens) mod.totalScreens = totalScreens;
    mod.lastScreenVisited = Math.max(mod.lastScreenVisited || 0, screenIndex);

    this.data.lastPosition.moduleId = moduleId;
    this.data.lastPosition.screenIndex = screenIndex;
    this.data.lastPosition.timestamp = Date.now();
    this._save();
  }

  addModuleTime(moduleId, timeMs) {
    const mod = this.getModule(moduleId);
    mod.timeSpentMs += timeMs;
    this.data.stats.totalTimeMs += timeMs;
    this._save();
  }

  // ══════════════════════════════════
  //  PUBLIC API — QUIZZES
  // ══════════════════════════════════

  recordQuizAnswer(moduleId, quizType, questionNum, isCorrect, questionText, topic) {
    const mod = this.getModule(moduleId);
    const quiz = quizType === 'pre' ? mod.preQuiz : mod.postQuiz;

    // Store answer
    quiz.answers[questionNum - 1] = { isCorrect, questionText, topic, answeredAt: Date.now() };

    // Recalculate score
    quiz.score = quiz.answers.filter(a => a && a.isCorrect).length;
    quiz.total = quiz.answers.filter(a => a).length;

    // Track weak spots (wrong answers)
    if (!isCorrect && questionText) {
      const existing = mod.weakSpots.find(w => w.questionNum === questionNum && w.quizType === quizType);
      if (!existing) {
        mod.weakSpots.push({
          questionNum,
          quizType,
          questionText: questionText || `Question ${questionNum}`,
          topic: topic || `Module ${moduleId}`,
          addedAt: Date.now()
        });
      }
    }

    this._save();
  }

  completeQuiz(moduleId, quizType) {
    const mod = this.getModule(moduleId);
    const quiz = quizType === 'pre' ? mod.preQuiz : mod.postQuiz;
    quiz.completedAt = Date.now();
    this._save();
  }

  getQuizResults(moduleId, quizType) {
    const mod = this.getModule(moduleId);
    return quizType === 'pre' ? mod.preQuiz : mod.postQuiz;
  }

  // ══════════════════════════════════
  //  PUBLIC API — STATS & DASHBOARD
  // ══════════════════════════════════

  getStats() {
    return this.data.stats;
  }

  getLastPosition() {
    return this.data.lastPosition;
  }

  getAllModules() {
    return this.data.modules;
  }

  // Get computed dashboard data
  getDashboardData() {
    const modules = this.data.modules;
    const moduleNames = {
      1: 'Accounting Concepts', 2: 'Double Entry', 3: 'Journals & Ledgers',
      4: 'Trial Balance', 5: 'Cash Journals', 6: 'Debtors & Creditors',
      7: 'VAT', 8: 'Year-End Adjustments', 9: 'Financial Statements',
      10: 'Bank Reconciliation'
    };

    const moduleStats = [];
    let totalTime = 0;
    let completedCount = 0;
    let totalPreScore = 0, totalPostScore = 0;
    let quizModules = 0;
    const allWeakSpots = [];

    for (let i = 1; i <= 10; i++) {
      const mod = modules[String(i)] || this._defaultModule();
      const timeMin = Math.round(mod.timeSpentMs / 60000);
      totalTime += mod.timeSpentMs;

      if (mod.status === 'completed') completedCount++;

      if (mod.postQuiz.total > 0) {
        totalPostScore += mod.postQuiz.score / mod.postQuiz.total;
        quizModules++;
      }
      if (mod.preQuiz.total > 0) {
        totalPreScore += mod.preQuiz.score / mod.preQuiz.total;
      }

      mod.weakSpots.forEach(ws => {
        allWeakSpots.push({ ...ws, moduleId: i, moduleName: moduleNames[i] });
      });

      moduleStats.push({
        id: i,
        name: moduleNames[i],
        shortName: `M${i}: ${moduleNames[i].split(' ')[0]}`,
        status: mod.status,
        timeMin,
        timeMs: mod.timeSpentMs,
        preQuiz: mod.preQuiz,
        postQuiz: mod.postQuiz,
        xpEarned: mod.xpEarned,
        lastScreenVisited: mod.lastScreenVisited,
        totalScreens: mod.totalScreens
      });
    }

    const avgScore = quizModules > 0 ? Math.round((totalPostScore / quizModules) * 100) : 0;

    return {
      totalTimeMs: totalTime,
      totalTimeMin: Math.round(totalTime / 60000),
      completedCount,
      totalXP: this.data.stats.totalXP,
      streakDays: this._calculateStreak(),
      avgScore,
      moduleStats,
      weakSpots: allWeakSpots,
      lastPosition: this.data.lastPosition
    };
  }

  // ── STREAK CALCULATION ──
  _calculateStreak() {
    const today = new Date().toISOString().split('T')[0];
    const lastActive = this.data.stats.lastActiveDate;

    if (!lastActive) {
      this.data.stats.streakDays = 1;
      return 1;
    }

    const lastDate = new Date(lastActive);
    const todayDate = new Date(today);
    const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      // Same day, keep streak
      return this.data.stats.streakDays || 1;
    } else if (diffDays === 1) {
      // Consecutive day, increment
      this.data.stats.streakDays = (this.data.stats.streakDays || 0) + 1;
      return this.data.stats.streakDays;
    } else {
      // Streak broken
      this.data.stats.streakDays = 1;
      return 1;
    }
  }

  // ── UNLOCK MODULE 1 + 2 BY DEFAULT ──
  initDefaults() {
    if (this.data.modules['1'].status === 'locked') {
      this.data.modules['1'].status = 'available';
    }
    // Module 2 unlocked by default for testing
    if (this.data.modules['2'].status === 'locked') {
      this.data.modules['2'].status = 'available';
    }
    this.data.stats.sessionsCount++;
    this._save();
  }

  // ── RESET (for testing) ──
  reset() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.data = this._defaultData();
    this._save();
  }

  // ══════════════════════════════════
  //  PUBLIC API — PRACTICE QUIZZES
  // ══════════════════════════════════

  recordPracticeQuiz(moduleId, score, total) {
    var d = this.data;
    if (!d.practiceQuizzes) d.practiceQuizzes = { totalAttempts: 0, bestScores: {}, history: [] };
    d.practiceQuizzes.totalAttempts++;
    if (!d.practiceQuizzes.bestScores[moduleId] || score > d.practiceQuizzes.bestScores[moduleId]) {
      d.practiceQuizzes.bestScores[moduleId] = score;
    }
    d.practiceQuizzes.history.push({ moduleId: moduleId, score: score, total: total, date: new Date().toISOString() });
    this._save();
  }

  getPracticeStats() {
    var d = this.data;
    return d.practiceQuizzes || { totalAttempts: 0, bestScores: {}, history: [] };
  }

  // ══════════════════════════════════
  //  PUBLIC API — CAPSTONE EXAM
  // ══════════════════════════════════

  recordCapstoneAttempt(result) {
    var d = this.data;
    if (!d.capstoneExam) d.capstoneExam = { attempts: 0, bestScore: 0, bestPercentage: 0, history: [], weakAreas: [] };
    d.capstoneExam.attempts++;
    if (result.percentage > d.capstoneExam.bestPercentage) {
      d.capstoneExam.bestScore = result.score;
      d.capstoneExam.bestPercentage = result.percentage;
    }
    d.capstoneExam.history.push({
      date: new Date().toISOString(),
      score: result.score,
      total: result.total,
      percentage: result.percentage,
      sectionScores: result.sectionScores,
      timeUsedMs: result.timeUsedMs
    });
    if (result.weakAreas) d.capstoneExam.weakAreas = result.weakAreas;
    this._save();
  }

  getCapstoneStats() {
    var d = this.data;
    return d.capstoneExam || { attempts: 0, bestScore: 0, bestPercentage: 0, history: [], weakAreas: [] };
  }

  _generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 8);
  }
}

// ── GLOBAL INSTANCE ──
window.ayikhoData = new AyikhoStudentData();
window.ayikhoData.initDefaults();

