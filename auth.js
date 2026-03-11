/**
 * auth.js - Ayikho Firebase Phone Authentication
 * Supports: South Africa (+27) and Ghana (+233)
 */
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

let auth = null, recaptchaVerifier = null, confirmationResult = null;

// ── SUPPORTED COUNTRIES ───────────────────────────────
const COUNTRIES = [
  { code: "+27",  name: "South Africa", flag: "🇿🇦", placeholder: "81 234 5678" },
  { code: "+233", name: "Ghana",        flag: "🇬🇭", placeholder: "24 123 4567" },
];

// ── INIT ──────────────────────────────────────────────
function initAuth() {
  if (auth) return;
  if (!window.FIREBASE_CONFIG) { console.error("FIREBASE_CONFIG missing"); return; }
  const app = getApps().length === 0 ? initializeApp(window.FIREBASE_CONFIG) : getApps()[0];
  auth = getAuth(app);
  auth.languageCode = "en";
}

function setupRecaptcha() {
  if (recaptchaVerifier) return;
  recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
    size: "invisible",
    callback: () => {},
    "expired-callback": () => { recaptchaVerifier = null; }
  });
}

// ── COUNTRY PICKER ────────────────────────────────────
// Needs to be on window because the HTML calls onchange="updateCountry()"
window.updateCountry = function () {
  const select  = document.getElementById("country-select");
  if (!select) return;

  const country = COUNTRIES.find(c => c.code === select.value);
  if (!country) return;

  // Update the prefix badge
  const pfx = document.getElementById("ph-pfx");
  if (pfx) pfx.textContent = `${country.flag} ${country.code}`;

  // Update input placeholder and clear any typed value
  const input = document.getElementById("phone-in");
  if (input) {
    input.placeholder = country.placeholder;
    input.value = "";
  }

  // Clear any existing error
  const hint = document.getElementById("phone-hint");
  if (hint) {
    hint.innerHTML = "We send a 6-digit code to verify. <strong>No spam ever.</strong>";
    hint.style.color = "";
  }
};

// ── PHONE FORMATTER ───────────────────────────────────
function formatNumber(raw) {
  const countryCode = document.getElementById("country-select")?.value || "+27";
  const d = raw.replace(/\D/g, ""); // strip non-digits

  if (countryCode === "+27") {
    if (d.startsWith("27") && d.length === 11) return "+" + d;
    if (d.startsWith("0")  && d.length === 10) return "+27" + d.slice(1);
    if (d.length === 9)                         return "+27" + d;
    return null;
  }

  if (countryCode === "+233") {
    if (d.startsWith("233") && d.length === 12) return "+" + d;
    if (d.startsWith("0")   && d.length === 10) return "+233" + d.slice(1);
    if (d.length === 9)                          return "+233" + d;
    return null;
  }

  return null;
}

// ── SEND OTP ──────────────────────────────────────────
window.sendOTP = async function () {
  const input   = document.getElementById("phone-in");
  const btn     = document.getElementById("send-otp-btn");
  const hint    = document.getElementById("phone-hint");
  const code    = document.getElementById("country-select")?.value || "+27";
  const country = COUNTRIES.find(c => c.code === code);
  const phone   = formatNumber(input.value);

  if (!phone) {
    hint.textContent = `Enter a valid ${country.name} number e.g. 0${country.placeholder}`;
    hint.style.color = "var(--rose)";
    return;
  }

  btn.disabled = true; btn.textContent = "Sending...";
  hint.textContent = ""; hint.style.color = "";

  try {
    initAuth();
    setupRecaptcha();
    confirmationResult = await signInWithPhoneNumber(auth, phone, recaptchaVerifier);

    // Show the number on the OTP screen
    const otpTarget = document.getElementById("otp-sent-to");
    if (otpTarget) otpTarget.textContent = phone;

    goTo("s-otp");
    startResendCountdown();
  } catch (err) {
    const m = {
      "auth/invalid-phone-number":   "That number doesn't look right.",
      "auth/too-many-requests":      "Too many attempts. Wait a few minutes.",
      "auth/quota-exceeded":         "SMS limit reached. Try again later.",
      "auth/network-request-failed": "No connection. Check your data.",
    };
    hint.textContent  = m[err.code] || "Something went wrong. Please try again.";
    hint.style.color  = "var(--rose)";
    btn.disabled      = false;
    btn.textContent   = "Send code";
    recaptchaVerifier = null;
    console.error("sendOTP error:", err.code, err.message);
  }
};

// ── VERIFY OTP ────────────────────────────────────────
window.verifyOTP = async function () {
  const btn  = document.getElementById("verify-otp-btn");
  const hint = document.getElementById("otp-hint");
  const code = ["o1","o2","o3","o4","o5","o6"]
    .map(id => (document.getElementById(id)?.value || "").trim())
    .join("");

  if (code.length < 6) {
    hint.textContent = "Enter all 6 digits from your SMS.";
    hint.style.color = "var(--rose)";
    return;
  }

  btn.disabled = true; btn.textContent = "Verifying...";
  hint.textContent = ""; hint.style.color = "";

  try {
    if (!confirmationResult) throw new Error("auth/session-expired");
    await confirmationResult.confirm(code);
    goTo("s-name");
  } catch (err) {
    const m = {
      "auth/invalid-verification-code": "Wrong code. Check the SMS and try again.",
      "auth/code-expired":              "Code expired. Go back and request a new one.",
      "auth/session-expired":           "Session expired. Go back and request a new code.",
    };
    hint.textContent = m[err.code] || m[err.message] || "Verification failed. Try again.";
    hint.style.color = "var(--rose)";
    btn.disabled     = false;
    btn.textContent  = "Verify";
  }
};

// ── RESEND ────────────────────────────────────────────
function startResendCountdown() {
  const hint = document.getElementById("otp-hint");
  let s = 60;
  const t = setInterval(() => {
    s--;
    if (hint) hint.innerHTML = s > 0
      ? `Didn't get it? <strong>Resend in 0:${String(s).padStart(2,"0")}</strong>`
      : `Didn't get it? <strong style='cursor:pointer;color:var(--p)' onclick='resendOTP()'>Resend now</strong>`;
    if (s <= 0) clearInterval(t);
  }, 1000);
}

window.resendOTP = function () {
  ["o1","o2","o3","o4","o5","o6"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  document.getElementById("o1")?.focus();
  goTo("s-phone");
};
