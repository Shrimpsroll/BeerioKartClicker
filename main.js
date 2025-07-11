const tabs = ['game', 'upgrades', 'prestige', 'casino', 'bank', 'stats', 'leaderboard', 'settings'];

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
      <p class="points-row"><span>Points:</span> <span id="points">${points}</span></p>
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
window.increment = function() {
  const amount = window.pointsPerClick || 1;
  window.points += amount;
  window.stats.totalClicks++;
  window.stats.totalPointsEarned += amount;
  if (document.getElementById('points')) document.getElementById('points').textContent = window.points;
  if (typeof saveGame === 'function') saveGame();
  if (typeof originalIncrement === 'function') originalIncrement();
  window.checkForCheating();
};

window.hasCheated = false;
window.checkForCheating = function() {
  // Check if points exceed totalPointsEarned or if dev commands were used
  if (window.points > (window.stats?.totalPointsEarned || 0) || window.hasCheated === true) {
    window.hasCheated = true;
  }
  // Check if prestige points exceed total prestiges earned
  if ((window.prestige?.points || 0) > (window.stats?.totalPrestiges || 0)) {
    window.hasCheated = true;
  }
};

// Mark as cheating if any code is run in the console
if (!window._cheatConsoleGuard) {
  window._cheatConsoleGuard = true;
  const cheatHandler = () => { window.hasCheated = true; };
  // Detect property access in console (works in most browsers)
  Object.defineProperty(window, 'cheatDetect', {
    get: function() {
      cheatHandler();
      return undefined;
    },
    configurable: true
  });
  // Print a hidden property to the console to bait access
  setTimeout(() => {
    if (window.console && window.console.log) {
      window.console.log('%cStop! Any use of the console will mark you as a cheater.', 'color: red; font-size: 16px;');
    }
  }, 1000);
}

