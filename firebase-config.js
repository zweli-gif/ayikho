<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Ayikho · Admin Command Center</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<style>
  :root {
    --fa: #0284C7; --fa-l: #38BDF8; --fa-d: #075985; --fa-xs: #F0F9FF;
    --green: #22C55E; --rose: #F43F5E; --ink: #1A0A3A; --mut: #6B5A8A;
    --bord: #DDD5F5; --surf: #F7F4FF; --w: #FFFFFF;
  }
  
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Outfit', sans-serif; background: var(--surf); color: var(--ink); height: 100vh; overflow: hidden; }
  
  /* --- Login Overlay --- */
  #login-screen { position: fixed; inset: 0; background: var(--ink); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 999; transition: opacity 0.3s ease; }
  .login-box { background: var(--w); padding: 40px; border-radius: 24px; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.5); width: 100%; max-width: 400px; }
  .login-box h1 { font-family: 'Playfair Display', serif; color: var(--fa); margin-bottom: 8px; font-size: 32px; }
  .login-box input { padding: 14px; border: 2px solid var(--bord); border-radius: 12px; font-family: 'JetBrains Mono', monospace; outline: none; margin-bottom: 16px; width: 100%; font-size: 16px; transition: border-color 0.2s; }
  .login-box input:focus { border-color: var(--fa); }
  .login-box button { background: var(--fa); color: var(--w); border: none; padding: 14px 24px; border-radius: 12px; cursor: pointer; font-weight: 700; width: 100%; font-size: 16px; transition: background 0.2s, transform 0.1s; }
  .login-box button:hover { background: var(--fa-d); }
  .login-box button:active { transform: scale(0.98); }

  /* --- Dashboard Layout --- */
  #dashboard { display: none; height: 100%; flex-direction: column; padding: 32px 40px; overflow-y: auto; }
  header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; }
  header h1 { font-family: 'Playfair Display', serif; font-size: 36px; color: var(--ink); line-height: 1.1; }
  .meta-text { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--mut); margin-top: 8px; text-transform: uppercase; letter-spacing: 0.05em; }
  
  /* --- Top Stats --- */
  .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; margin-bottom: 40px; }
  .stat-card { background: var(--w); padding: 24px; border-radius: 20px; border: 1px solid var(--bord); box-shadow: 0 4px 12px rgba(26,10,58,0.03); }
  .stat-label { font-family: 'JetBrains Mono', monospace; font-size: 11px; text-transform: uppercase; color: var(--mut); margin-bottom: 12px; letter-spacing: 0.05em; }
  .stat-value { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 900; color: var(--fa); }
  
  /* --- Charts Grid --- */
  .charts-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(450px, 1fr)); gap: 24px; padding-bottom: 40px; }
  .chart-card { background: var(--w); padding: 24px; border-radius: 20px; border: 1px solid var(--bord); box-shadow: 0 4px 12px rgba(26,10,58,0.03); height: 380px; display: flex; flex-direction: column; }
  .chart-card h2 { font-size: 18px; margin-bottom: 20px; color: var(--ink); font-weight: 700; }
  .canvas-container { flex: 1; position: relative; min-height: 0; }
</style>
</head>
<body>

  <div id="login-screen">
    <div class="login-box">
      <h1>Ayikho Admin</h1>
      <p class="meta-text" style="margin-bottom:24px;">Command Center</p>
      <input type="password" id="admin-pass" placeholder="Enter Password" onkeypress="if(event.key === 'Enter') checkPassword()">
      <button onclick="checkPassword()">Unlock Dashboard</button>
      <div id="login-err" style="color:var(--rose); font-family:'JetBrains Mono', monospace; font-size:12px; margin-top:16px; display:none;">Access Denied. Check password.</div>
    </div>
  </div>

  <div id="dashboard">
    <header>
      <div>
        <h1>Command Center</h1>
        <div class="meta-text">TVET N4 Financial Accounting Overview</div>
      </div>
      <div class="meta-text" style="text-align: right;">
        Status: <span style="color:var(--green)">Online</span><br>
        Last synced: <span id="sync-time">Just now</span>
      </div>
    </header>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">👥 Total Students</div>
        <div class="stat-value" id="stat-users">--</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">🎯 Avg Quiz Score</div>
        <div class="stat-value" id="stat-score">--</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">⏱ Avg Time / Module</div>
        <div class="stat-value" id="stat-time">--</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">🚀 Active Today</div>
        <div class="stat-value" id="stat-active" style="color:var(--green)">--</div>
      </div>
    </div>

    <div class="charts-grid">
      <div class="chart-card">
        <h2>Module Completions</h2>
        <div class="canvas-container"><canvas id="completionChart"></canvas></div>
      </div>
      <div class="chart-card">
        <h2>Drop-off Screens (Exit Points)</h2>
        <div class="canvas-container"><canvas id="dropoffChart"></canvas></div>
      </div>
      <div class="chart-card">
        <h2>Weakest Quiz Topics</h2>
        <div class="canvas-container"><canvas id="weakestTopicsChart"></canvas></div>
      </div>
      <div class="chart-card">
        <h2>Daily Active Students (7 Days)</h2>
        <div class="canvas-container"><canvas id="activeUsersChart"></canvas></div>
      </div>
    </div>
  </div>

<script>
  // ═══════════════════════════════════════════════
  // 1. AUTHENTICATION
  // ═══════════════════════════════════════════════
  function checkPassword() {
    const pass = document.getElementById('admin-pass').value;
    if (pass === 'ayikho2026') {
      document.getElementById('login-screen').style.opacity = '0';
      setTimeout(() => {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('dashboard').style.display = 'flex';
        initDashboard(); 
      }, 300);
    } else {
      document.getElementById('login-err').style.display = 'block';
    }
  }

  // ═══════════════════════════════════════════════
  // 2. DATA FETCHING & PROCESSING 
  // ═══════════════════════════════════════════════
  async function initDashboard() {
    // NOTE: Right now, this uses placeholder data so the dashboard works instantly.
    // Once your Firebase is set up, you will replace `fetchMockData()` with `fetchFirebaseData()`
    
    const data = await fetchMockData(); 
    
    // Update top stat cards
    document.getElementById('stat-users').innerText = data.totalUsers;
    document.getElementById('stat-score').innerText = data.avgScore + '%';
    document.getElementById('stat-time').innerText = data.avgTime;
    document.getElementById('
