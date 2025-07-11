const tabs = ['game', 'upgrades', 'prestige', 'casino', 'bank', 'stats', 'leaderboard', 'settings'];
window.disableSaving = false;

function showTab(tab) {
  tabs.forEach(t => {
    if (t === tab) {
      window[`render_${t}`]();
    }
  });
}

// Default renderers (replace with real logic in each file)
window.render_game = function() {
  document.getElementById('tab-content').innerHTML = `
    <div>
      <p class="points-row"><span>Points:</span> <span id="points">${points.toLocaleString()}</span></p>
      <img src="img/clicker.png" alt="Clicker" id="clicker-img" style="cursor:pointer;max-width:200px;" onclick="increment()">
    </div>
  `;
  document.getElementById('clicker-img').onclick = increment;
};
window.render_upgrades = function() {
  document.getElementById('tab-content').innerHTML = `<div id="upgrades-list"></div>`;
  renderUpgrades();
};
window.render_prestige = function() {
  document.getElementById('tab-content').innerHTML = `<div id="prestige-content"></div>`;
  renderPrestige();
};
window.render_casino = function() {
  document.getElementById('tab-content').innerHTML = `<div id="casino-content"></div>`;
  renderCasino();
};
window.render_bank = function() {
  document.getElementById('tab-content').innerHTML = `<div id="bank-content"></div>`;
  renderBank();
};
window.render_stats = function() {
  document.getElementById('tab-content').innerHTML = `<div id="stats-content"></div>`;
  window.renderStats();
};
window.render_leaderboard = function() {
  document.getElementById('tab-content').innerHTML = `<div id="leaderboard-content"></div>`;
  window.renderLeaderboard();
};
window.render_settings = function() {
  document.getElementById('tab-content').innerHTML = `<div id="settings-content"></div>`;
  window.renderSettings();
};

// Simple game logic
window.points = 0;
// Anti-autoclicker: limit to 10 clicks per second
let lastClickTimes = [];
window.increment = function() {
  const now = Date.now();
  // Remove clicks older than 1 second
  lastClickTimes = lastClickTimes.filter(t => now - t < 1000);
  if (lastClickTimes.length >= 15) {
    // Optionally, you can flag cheating here:
    window.cheatHandler && window.cheatHandler('autoclicker detected');
    return; // Ignore this click
  }
  lastClickTimes.push(now);
  const amount = window.pointsPerClick || 1;
  window.points += amount;
  window.stats.totalClicks++;
  window.stats.totalPointsEarned += amount;
  if (document.getElementById('points')) document.getElementById('points').textContent = window.points.toLocaleString();
  if (typeof saveGame === 'function') saveGame();
  if (typeof originalIncrement === 'function') originalIncrement();
  window.checkForCheating();
};

window.hasCheated = false;
// Define cheatHandler globally so checkForCheating can use it
window.cheatHandler = (why = 'unknown') => {
  if (!window.hasCheated) {
    window.hasCheated = true;
    window.console && window.console.log && window.console.log('%c[CHEAT FLAGGED]%c Reason: ' + why, 'color: red; font-weight: bold;', 'color: orange;');
  }
};
window.checkForCheating = function() {
  // Check if points exceed totalPointsEarned or if dev commands were used
  if (window.points > (window.stats?.totalPointsEarned || 0) || window.hasCheated === true) {
    window.cheatHandler('points > totalPointsEarned or dev commands used');
  }
  // Check if prestige points exceed total prestiges earned
  if ((window.prestige?.points || 0) > (window.stats?.totalPrestiges || 0)) {
    window.cheatHandler('prestige points > total prestiges earned');
  }
};



