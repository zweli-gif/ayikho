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

        window.recaptchaVerifier = new RecaptchaVerifier(authObj, 'recaptcha-container', {
            'size': 'invisible'
        });

    } catch (e) {
        console.error('Firebase Auth Init Failed:', e);
    }
}

initFirebaseAuth();

async function sendOTP() {
    const phoneIn = document.getElementById('phone-in').value.trim();
    const btn = document.getElementById('send-otp-btn');
    const hint = document.getElementById('phone-hint');

    if (!phoneIn || phoneIn.length < 9) {
        hint.innerHTML = '<span style="color:var(--rose)">Please enter a valid number.</span>';
        return;
    }

    let formattedNumber = phoneIn;
    if (formattedNumber.startsWith('0')) formattedNumber = formattedNumber.substring(1);
    formattedNumber = '+27' + formattedNumber.replace(/[^0-9]/g, '');

    if (!authObj) {
        btn.textContent = 'Mock Sending...';
        setTimeout(() => {
            btn.textContent = 'Send code \u2192';
            goTo('s-otp');
        }, 800);
        return;
    }

    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
        windowConfirmationResult = await window.signInWithPhoneNumber(authObj, formattedNumber, window.recaptchaVerifier);
        btn.textContent = 'Send code \u2192';
        btn.disabled = false;
        goTo('s-otp');
    } catch (error) {
        console.error('SMS Error:', error);
        btn.textContent = 'Send code \u2192';
        btn.disabled = false;

        if (error.code === 'auth/too-many-requests') {
            hint.innerHTML = '<span style="color:var(--rose)">Too many attempts. Skipping verification...</span>';
            localStorage.setItem('ayikho_phone', formattedNumber);
            localStorage.setItem('ayikho_userId', 'phone_' + formattedNumber.replace('+', ''));
            setTimeout(() => {
                goTo('s-name');
            }, 1200);
            return;
        }

        hint.innerHTML = '<span style="color:var(--rose)">Error: ' + error.message + '</span>';

        try {
            if (window.recaptchaVerifier) {
                const widgetId = await window.recaptchaVerifier.render();
                grecaptcha.reset(widgetId);
            }
        } catch (recaptchaErr) {
            console.warn('Recaptcha reset failed:', recaptchaErr);
        }
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

    if (!windowConfirmationResult) {
        btn.textContent = 'Verifying...';
        setTimeout(() => {
            btn.textContent = 'Verify \u2192';
            goTo('s-name');
        }, 800);
        return;
    }

    btn.textContent = 'Verifying...';
    btn.disabled = true;

    try {
        const result = await windowConfirmationResult.confirm(code);
        const user = result.user;
        localStorage.setItem('ayikho_userId', user.uid);
        console.log('[Auth] Logged in as:', user.uid);
        btn.textContent = 'Verify \u2192';
        btn.disabled = false;
        goTo('s-name');
    } catch (error) {
        console.error('Verify Error:', error);
        btn.textContent = 'Verify \u2192';
        btn.disabled = false;
        hint.innerHTML = '<span style="color:var(--rose)">Invalid code. Try again.</span>';
    }
}
