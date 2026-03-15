/**
 * auth.js - Ayikho Firebase Email/Password Authentication (using Phone)
 * Supports: South Africa (+27) and Ghana (+233)
 */
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

let auth = null;
let regPhone = "";
let regPass = "";
let loginPhone = "";

// Export onAuthStateChanged for routing
window.onAuthStateChanged = onAuthStateChanged;

// ── SUPPORTED COUNTRIES ───────────────────────────────
const COUNTRIES = [
  { code: "+27", name: "South Africa", flag: "🇿🇦", placeholder: "81 234 5678" },
  { code: "+233", name: "Ghana", flag: "🇬🇭", placeholder: "24 123 4567" },
];

// ── INIT ──────────────────────────────────────────────
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyD89f-i_3zvhICBMw2E7nQRjjLGyyLGDkU",
  authDomain: "ayikho-tvet.firebaseapp.com",
  projectId: "ayikho-tvet",
  storageBucket: "ayikho-tvet.firebasestorage.app",
  messagingSenderId: "1079346801243",
  appId: "1:1079346801243:web:a209ebcdfc5cf94b342d7e",
  measurementId: "G-6CT6LLSZ12"
};

function initAuth() {
  if (auth) return;
  try {
    const app = getApps().length === 0 ? initializeApp(FIREBASE_CONFIG) : getApps()[0];
    auth = getAuth(app);
    auth.languageCode = "en";
  } catch (err) {
    console.error("Firebase init failed:", err);
    auth = null;
  }
}

window.signInWithGoogle = async function () {
  initAuth();
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Google user:", result.user.email);
    goTo("s-name");
  } catch (err) {
    console.error("Google login failed:", err);
  }
};

// ── UI HELPERS ────────────────────────────────────
window.updateCountry = function () {
  const select = document.getElementById("country-select");
  if (!select) return;
  const country = COUNTRIES.find(c => c.code === select.value);
  if (!country) return;
  document.getElementById("ph-pfx").textContent = `${country.flag} ${country.code}`;
  const pfx2 = document.getElementById("ph-pfx2");
  if (pfx2) pfx2.textContent = `${country.flag} ${country.code}`;
  const input = document.getElementById("phone-in");
  input.placeholder = country.placeholder;
  input.value = "";
  const confirmInput = document.getElementById("phone-confirm-in");
  if (confirmInput) { confirmInput.placeholder = country.placeholder; confirmInput.value = ""; }
};

window.updateLoginCountry = function () {
  const select = document.getElementById("login-country-select");
  if (!select) return;
  const country = COUNTRIES.find(c => c.code === select.value);
  if (!country) return;
  document.getElementById("login-ph-pfx").textContent = `${country.flag} ${country.code}`;
  const input = document.getElementById("login-phone-in");
  input.placeholder = country.placeholder;
  input.value = "";
};

function formatNumber(raw, isLogin = false) {
  const countryCode = document.getElementById(isLogin ? "login-country-select" : "country-select")?.value || "+27";
  const d = raw.replace(/\D/g, "");
  if (countryCode === "+27") {
    if (d.startsWith("27") && d.length === 11) return "+" + d;
    if (d.startsWith("0") && d.length === 10) return "+27" + d.slice(1);
    if (d.length === 9) return "+27" + d;
  } else if (countryCode === "+233") {
    if (d.startsWith("233") && d.length === 12) return "+" + d;
    if (d.startsWith("0") && d.length === 10) return "+233" + d.slice(1);
    if (d.length === 9) return "+233" + d;
  }
  return null;
}

// Transform phone to pseudo-email
function toEmail(phone) {
  return phone.replace("+", "") + "@ayikho.app";
}

// ── REGISTRATION FLOW ──────────────────────────────────────────

window.checkPassStrength = function () {
  const val = document.getElementById("pass-in").value;
  const hint = document.getElementById("pass-hint");
  const hasNum = /\d/.test(val);
  if (val.length >= 8 && hasNum) {
    hint.innerHTML = "Good password. You're ready to go.";
    hint.style.color = "var(--green)";
    return true;
  } else {
    hint.innerHTML = "Must be at least 8 characters with 1 number.";
    hint.style.color = "var(--rose)";
    return false;
  }
};

window.registerUser = async function () {
  const phoneInput = document.getElementById("phone-in");
  const phoneHint = document.getElementById("phone-hint");
  const phone = formatNumber(phoneInput.value);

  const passInput = document.getElementById("pass-in");
  const pass = passInput.value;
  const matchError = document.getElementById("passMatchError");

  if (!phone) {
    phoneHint.textContent = "Enter a valid cell number.";
    phoneHint.style.color = "var(--rose)";
    return;
  }

  if (!window.checkPassStrength()) {
    return;
  }

  const btn = document.getElementById("register-btn");
  btn.disabled = true;
  btn.textContent = "Creating account...";
  matchError.style.display = "none";

  try {
    initAuth();
    if (!auth) throw new Error("Auth service unavailable");
    const email = toEmail(phone);
    const uc = await createUserWithEmailAndPassword(auth, email, pass);
    console.log("User registered:", uc.user.email);
    window.__tempPhone = phone;
    goTo("s-name");
  } catch (err) {
    console.error("Register err:", err);
    if (err.code === "auth/email-already-in-use") {
      matchError.textContent = "Account already exists. Try logging in instead.";
    } else {
      matchError.textContent = "Error: " + err.message;
    }
    matchError.style.display = "block";
  } finally {
    btn.disabled = false;
    btn.textContent = "Create Account →";
  }
};

// ── SINGLE-PAGE REGISTRATION ────────────────────────────
window.registerFromSinglePage = async function () {
  // 1. Validate phone
  const phoneRaw = document.getElementById("phone-in").value;
  const phone1 = formatNumber(phoneRaw);
  if (!phone1) {
    document.getElementById("phoneMatchError").textContent = "Enter a valid cell number.";
    document.getElementById("phoneMatchError").style.display = "block";
    document.getElementById("phone-in").focus();
    return;
  }

  // 2. Validate phone confirm
  const phone2Raw = document.getElementById("phone-confirm-in").value;
  const phone2 = formatNumber(phone2Raw);
  if (!phone2 || phone2 !== phone1) {
    document.getElementById("phoneMatchError").textContent = "Phone numbers don't match — please check.";
    document.getElementById("phoneMatchError").style.display = "block";
    document.getElementById("phone-confirm-in").focus();
    return;
  }
  document.getElementById("phoneMatchError").style.display = "none";

  // 3. Validate password
  const pass = document.getElementById("pass-in").value;
  const hasNum = /\d/.test(pass);
  if (pass.length < 8 || !hasNum) {
    const hint = document.getElementById("pass-hint");
    hint.textContent = "Must be at least 8 characters with 1 number.";
    hint.style.color = "var(--rose)";
    document.getElementById("pass-in").focus();
    return;
  }

  // 4. Validate password confirm
  const passConfirm = document.getElementById("pass-confirm-in").value;
  if (passConfirm !== pass) {
    document.getElementById("passMatchError").textContent = "Passwords don't match.";
    document.getElementById("passMatchError").style.display = "block";
    document.getElementById("pass-confirm-in").focus();
    return;
  }
  document.getElementById("passMatchError").style.display = "none";

  // 5. Register with Firebase
  const btn = document.getElementById("register-btn");
  btn.disabled = true;
  btn.textContent = "Creating account...";

  try {
    initAuth();
    if (!auth) throw new Error("Auth service unavailable");
    const email = toEmail(phone1);
    const uc = await createUserWithEmailAndPassword(auth, email, pass);
    console.log("User registered:", uc.user.email);
    window.__tempPhone = phone1;
    goTo("s-name");
  } catch (err) {
    console.error("Register err:", err);
    if (err.code === "auth/email-already-in-use") {
      document.getElementById("passMatchError").textContent = "Account already exists. Try logging in instead.";
    } else {
      document.getElementById("passMatchError").textContent = "Error: " + err.message;
    }
    document.getElementById("passMatchError").style.display = "block";
  } finally {
    btn.disabled = false;
    btn.textContent = "Create Account →";
  }
};

// ── LOGIN FLOW ──────────────────────────────────────────
window.switchToLogin = function () {
  goTo("s-login-phone");
};
window.switchToRegister = function () {
  goTo("s-signup");
};

window.loginUser = async function () {
  const phoneInput = document.getElementById("login-phone-in");
  const phone = formatNumber(phoneInput.value, true);
  const pass = document.getElementById("login-pass-in").value;
  const hint = document.getElementById("login-hint");

  hint.textContent = "";

  if (!phone) {
    phoneInput.style.borderColor = "var(--rose)";
    return;
  }
  phoneInput.style.borderColor = "";

  if (!pass) {
    hint.textContent = "Please enter your password.";
    return;
  }

  const btn = document.getElementById("login-btn");
  btn.disabled = true;
  btn.textContent = "Logging in...";

  try {
    initAuth();
    if (!auth) throw new Error("Auth service unavailable");
    const email = toEmail(phone);
    await signInWithEmailAndPassword(auth, email, pass);
    console.log("User logged in:", email);

    window.__tempPhone = phone;

    if (window.parent && window.parent !== window) {
      window.parent.postMessage('onboardingComplete', '*');
      try { if (window.parent.onboardingComplete) window.parent.onboardingComplete(); } catch (e) { }
    } else {
      window.location.href = 'app.html';
    }
  } catch (err) {
    console.error("Login err:", err);
    hint.textContent = "Incorrect password or account not found.";
    btn.disabled = false;
    btn.textContent = "Log in →";
  }
};
