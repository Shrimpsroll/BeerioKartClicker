// Initialize stats if not present
window.stats = window.stats || {
  totalClicks: 0,
  totalPointsEarned: 0,
  totalPrestiges: 0,
  totalPlayTime: 0, // in seconds
  bestFishCaughtValue: 0, // Tracks the high score
  bestFishName: "None yet!" // Tracks the name
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
  // Safe fallbacks just in case formatNumber hasn't loaded yet
  const format = (num) => typeof window.formatNumber === 'function' ? window.formatNumber(num) : num.toLocaleString();

  document.getElementById('stats-content').innerHTML = `
    <h2>Statistics</h2>
    <ul style="list-style-type: none; padding: 0; font-size: 1.1em; line-height: 1.8;">
      <li>🖱️ <b>Total Clicks:</b> ${format(window.stats.totalClicks)}</li>
      <li>💰 <b>Total Points Earned:</b> ${format(window.stats.totalPointsEarned)}</li>
      <li>⭐ <b>Total Prestiges:</b> ${format(window.stats.totalPrestiges)}</li>
      <li>⏱️ <b>Total Play Time:</b> ${formatPlayTime(window.stats.totalPlayTime)}</li>
      <hr style="border-color: #444; margin: 15px 0; max-width: 300px;">
      <li>🏆 <b>Best Catch:</b> <span style="color: #f39c12;">${window.stats.bestFishName}</span></li>
      <li>💎 <b>Best Catch Value:</b> ${format(window.stats.bestFishCaughtValue)} Points</li>
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