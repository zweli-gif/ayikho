// ═══════════════════════════════════════════════
// AYIKHO ANALYTICS — Platform-wide counters
// ═══════════════════════════════════════════════
// Writes to Firestore: analytics/counters, analytics/daily-{YYYY-MM-DD}
// All operations are fire-and-forget (no blocking)

(function(){
  var db = null;
  var refs = null;
  var ready = false;
  var queue = [];
  var today = new Date().toISOString().slice(0,10); // YYYY-MM-DD

  // Init Firebase
  async function init() {
    try {
      if (!window.FIREBASE_CONFIG) return;
      var { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
      var { getFirestore, doc, setDoc, getDoc, increment, serverTimestamp, arrayUnion } =
        await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');

      var app = initializeApp(window.FIREBASE_CONFIG, 'ayikho-analytics');
      db = getFirestore(app);
      refs = { doc, setDoc, getDoc, increment, serverTimestamp, arrayUnion };
      ready = true;

      // Process queued events
      queue.forEach(function(fn){ fn(); });
      queue = [];
      console.log('[Analytics] Ready');
    } catch(e) {
      console.warn('[Analytics] Init failed:', e);
    }
  }

  // Increment a counter in analytics/counters
  function incCounter(field, amount) {
    if (!ready) { queue.push(function(){ incCounter(field, amount); }); return; }
    try {
      var data = {}; data[field] = refs.increment(amount || 1);
      data.lastUpdated = refs.serverTimestamp();
      refs.setDoc(refs.doc(db, 'analytics', 'counters'), data, { merge: true });
    } catch(e) {}
  }

  // Increment a field in today's daily doc
  function incDaily(field, amount) {
    if (!ready) { queue.push(function(){ incDaily(field, amount); }); return; }
    try {
      var data = {}; data[field] = refs.increment(amount || 1);
      data.date = today;
      data.lastUpdated = refs.serverTimestamp();
      refs.setDoc(refs.doc(db, 'analytics', 'daily-' + today), data, { merge: true });
    } catch(e) {}
  }

  // Set a value (not increment) in counters
  function setCounter(field, value) {
    if (!ready) { queue.push(function(){ setCounter(field, value); }); return; }
    try {
      var data = {}; data[field] = value;
      data.lastUpdated = refs.serverTimestamp();
      refs.setDoc(refs.doc(db, 'analytics', 'counters'), data, { merge: true });
    } catch(e) {}
  }

  // Track a session start
  function trackSession(deviceInfo) {
    incCounter('totalSessions');
    incDaily('sessions');
    if (deviceInfo) {
      if (deviceInfo.mobile) incDaily('sessionsMobile');
      else incDaily('sessionsDesktop');
      if (deviceInfo.os) incDaily('os_' + deviceInfo.os.replace(/[^a-zA-Z]/g,''));
      if (deviceInfo.browser) incDaily('browser_' + deviceInfo.browser.replace(/[^a-zA-Z]/g,''));
    }
  }

  // Public API
  window.ayikhoAnalytics = {
    // Registration
    trackRegistration: function(profile) {
      incCounter('totalUsers');
      incDaily('registrations');
      if (profile) {
        if (profile.gender) incCounter('gender_' + profile.gender.toLowerCase().replace(/[^a-z]/g,''));
        if (profile.province) incCounter('province_' + profile.province.replace(/[^a-zA-Z]/g,''));
        if (profile.level) incCounter('level_' + profile.level);
        if (profile.college) incCounter('colleges_count');
      }
      // Save individual user profile to users collection
      if (ready && profile) {
        try {
          var userId = 'user_' + Date.now() + '_' + Math.random().toString(36).slice(2,8);
          var userDoc = {
            name: profile.name || '',
            gender: profile.gender || '',
            province: profile.province || '',
            college: profile.college || '',
            level: profile.level || '',
            course: profile.course || '',
            subjects: profile.subjects || [],
            fiveYearGoal: profile.fiveYearGoal || '',
            dream: profile.dream || '',
            phone: profile.phone || '',
            registeredAt: refs.serverTimestamp(),
            registeredDate: new Date().toISOString().slice(0,10)
          };
          refs.setDoc(refs.doc(db, 'users', userId), userDoc);
        } catch(e) { console.warn('[Analytics] User save failed:', e); }
      }
    },

    // Mood check-in
    trackMood: function(mood) {
      incCounter('totalMoodCheckins');
      incDaily('moods');
      incDaily('mood_' + mood); // mood_good, mood_okay, mood_struggling
      incCounter('mood_' + mood + '_total');
    },

    // Module start
    trackModuleStart: function(subject, moduleId) {
      incCounter('totalModuleStarts');
      incDaily('moduleStarts');
      incCounter('moduleStarts_' + subject);
    },

    // Module complete
    trackModuleComplete: function(subject, moduleId, score) {
      incCounter('totalModuleCompletes');
      incDaily('moduleCompletes');
      incCounter('moduleCompletes_' + subject);
      if (typeof score === 'number') {
        incCounter('totalQuizScore', score);
        incCounter('totalQuizAttempts');
      }
    },

    // Quiz answer
    trackQuizAnswer: function(correct) {
      incCounter('totalQuizAnswers');
      incDaily('quizAnswers');
      if (correct) {
        incCounter('totalQuizCorrect');
        incDaily('quizCorrect');
      }
    },

    // Session
    trackSession: function() {
      var ua = navigator.userAgent || '';
      var mobile = /Mobile|Android|iPhone/i.test(ua);
      var os = /Android/i.test(ua) ? 'Android' : /iPhone|iPad/i.test(ua) ? 'iOS' : /Windows/i.test(ua) ? 'Windows' : /Mac/i.test(ua) ? 'macOS' : 'Other';
      var browser = /Chrome/i.test(ua) && !/Edg/i.test(ua) ? 'Chrome' : /Safari/i.test(ua) && !/Chrome/i.test(ua) ? 'Safari' : /Firefox/i.test(ua) ? 'Firefox' : /SamsungBrowser/i.test(ua) ? 'Samsung' : /Opera/i.test(ua) ? 'Opera' : 'Other';
      trackSession({ mobile: mobile, os: os, browser: browser });

      // Track DAU — unique users per day via localStorage flag
      var dauKey = 'ayikho_dau_' + today;
      if (!localStorage.getItem(dauKey)) {
        localStorage.setItem(dauKey, '1');
        incDaily('dau');
        incCounter('totalDAUEvents');
      }
    },

    // Capstone attempt
    trackCapstone: function(score, passed) {
      incCounter('totalCapstoneAttempts');
      incDaily('capstoneAttempts');
      if (passed) {
        incCounter('totalCapstonePasses');
        incDaily('capstonePasses');
      }
    },

    // Onboarding step
    trackOnboardingStep: function(step) {
      incDaily('onboarding_step_' + step);
      incCounter('onboarding_step_' + step + '_total');
    },

    // Page load time
    trackPageLoad: function(ms) {
      incCounter('totalPageLoads');
      incCounter('totalPageLoadMs', Math.round(ms));
    }
  };

  // Auto-init
  init();

  // Track page load performance
  window.addEventListener('load', function() {
    var perf = performance.getEntriesByType('navigation');
    if (perf && perf[0]) {
      var loadTime = perf[0].loadEventEnd - perf[0].startTime;
      if (loadTime > 0) window.ayikhoAnalytics.trackPageLoad(loadTime);
    }
  });

})();
