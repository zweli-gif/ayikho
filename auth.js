// ═══════════════════════════════════════════════
// FIREBASE AUTHENTICATION LOGIC
// ═══════════════════════════════════════════════
let windowConfirmationResult = null;
let authObj = null;

async function initFirebaseAuth() {
    try {
        const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
        const { getAuth, RecaptchaVerifier, signInWithPhoneNumber } =
            await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');

        // Attempt to load from firebase-config.js
        const script = document.createElement('script');
        script.src = 'firebase-config.js';
        document.head.appendChild(script);

        await new Promise(resolve => { script.onload = resolve; script.onerror = resolve; });

        if (typeof FIREBASE_CONFIG === 'undefined' || FIREBASE_CONFIG.apiKey.includes('YOUR_')) {
            console.warn('Firebase not configured. OTP will be mocked.');
            return;
        }

        const app = initializeApp(FIREBASE_CONFIG);
        authObj = getAuth(app);
        window.RecaptchaVerifier = RecaptchaVerifier;
        window.signInWithPhoneNumber = signInWithPhoneNumber;

        // Initialize Recaptcha
        window.recaptchaVerifier = new RecaptchaVerifier(authObj, 'recaptcha-container', {
            'size': 'invisible'
        });

    } catch (e) {
        console.error('Firebase Auth Init Failed:', e);
    }
}

// Call on load
initFirebaseAuth();

async function sendOTP() {
    const phoneIn = document.getElementById('phone-in').value.trim();
    const btn = document.getElementById('send-otp-btn');
    const hint = document.getElementById('phone-hint');

    if (!phoneIn || phoneIn.length < 9) {
        hint.innerHTML = '<span style="color:var(--rose)">Please enter a valid number.</span>';
        return;
    }

    // Format to E.164 (+27...)
    let formattedNumber = phoneIn;
    if (formattedNumber.startsWith('0')) formattedNumber = formattedNumber.substring(1);
    formattedNumber = '+27' + formattedNumber.replace(/[^0-9]/g, '');

    // Mock Mode (Firebase not ready)
    if (!authObj) {
        btn.textContent = 'Mock Sending...';
        setTimeout(() => {
            btn.textContent = 'Send code →';
            goTo('s-otp');
        }, 800);
        return;
    }

    // Real Firebase Mode
    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
        windowConfirmationResult = await window.signInWithPhoneNumber(authObj, formattedNumber, window.recaptchaVerifier);
        btn.textContent = 'Send code →';
        btn.disabled = false;
        goTo('s-otp');
    } catch (error) {
        console.error('SMS Error:', error);
        btn.textContent = 'Send code →';
        btn.disabled = false;
        hint.innerHTML = `<span style="color:var(--rose)">Error: ${error.message}</span>`;

        // Reset recaptcha if failed so they can try again
        if (window.recaptchaVerifier) window.recaptchaVerifier.render().then(widgetId => { grecaptcha.reset(widgetId); });
    }
}

async function verifyOTP() {
    const o1 = document.getElementById('o1').value;
    const o2 = document.getElementById('o2').value;
    const o3 = document.getElementById('o3').value;
    const o4 = document.getElementById('o4').value;
    const o5 = document.getElementById('o5').value;
    const o6 = document.getElementById('o6').value;
    const code = o1 + o2 + o3 + o4 + o5 + o6;

    const btn = document.getElementById('verify-otp-btn');
    const hint = document.getElementById('otp-hint');

    if (code.length < 6) {
        hint.innerHTML = '<span style="color:var(--rose)">Enter all 6 digits.</span>';
        return;
    }

    // Mock Mode
    if (!windowConfirmationResult) {
        btn.textContent = 'Verifying...';
        setTimeout(() => {
            btn.textContent = 'Verify →';
            goTo('s-name');
        }, 800);
        return;
    }

    // Real Firebase Mode
    btn.textContent = 'Verifying...';
    btn.disabled = true;

    try {
        const result = await windowConfirmationResult.confirm(code);
        const user = result.user;

        // If successfully authenticated, save the official Firebase UID into localStorage
        // so our tracking.js and student-data.js merge with this identity.
        localStorage.setItem('ayikho_userId', user.uid);
        console.log('[Auth] Logged in as:', user.uid);

        btn.textContent = 'Verify →';
        btn.disabled = false;
        goTo('s-name');
    } catch (error) {
        console.error('Verify Error:', error);
        btn.textContent = 'Verify →';
        btn.disabled = false;
        hint.innerHTML = `<span style="color:var(--rose)">Invalid code. Try again.</span>`;
    }
}
