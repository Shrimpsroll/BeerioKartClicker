// Initialize stats if not present
  window.stats = window.stats || {
    totalClicks: 0,
    totalPointsEarned: 0,
    totalPrestiges: 0,
    totalPlayTime: 0 // in seconds
  };



  // Track play time
  if (!window._playTimeInterval) {
    window._playTimeInterval = setInterval(() => {
      window.stats.totalPlayTime++;
      if (typeof saveGame === 'function') saveGame();
    }, 1000);
  }

  // Update stats on prestige
  var originalDoPrestige = window.doPrestige;
  window.doPrestige = function() {
    window.stats.totalPrestiges++;
    if (typeof originalDoPrestige === 'function') originalDoPrestige();
  };

  // Helper to format play time as HH:MM:SS
  function formatPlayTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
  }

  // Render stats tab
  window.renderStats = function() {
    document.getElementById('stats-content').innerHTML = `
      <h2>Statistics</h2>
      <ul>
        <li>Total Clicks: ${window.stats.totalClicks}</li>
        <li>Total Points Earned: ${window.stats.totalPointsEarned}</li>
        <li>Total Prestiges: ${window.stats.totalPrestiges}</li>
        <li>Total Play Time: ${formatPlayTime(window.stats.totalPlayTime)}</li>
      </ul>
    `;
  };

  // Automatically update stats page every second if visible
if (!window._statsAutoUpdateInterval) {
  window._statsAutoUpdateInterval = setInterval(() => {
    const statsContent = document.getElementById('stats-content');
    if (statsContent && statsContent.offsetParent !== null) {
      window.renderStats();
    }
  }, 1000);
}