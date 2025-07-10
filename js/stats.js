// Initialize stats if not present
  window.stats = window.stats || {
    totalClicks: 0,
    totalPointsEarned: 0,
    totalPrestiges: 0,
  };



  // Update stats on prestige
  var originalDoPrestige = window.doPrestige;
  window.doPrestige = function() {
    window.stats.totalPrestiges++;
    if (typeof originalDoPrestige === 'function') originalDoPrestige();
  };

  // Render stats tab
  window.renderStats = function() {
    document.getElementById('stats-content').innerHTML = `
      <h2>Statistics</h2>
      <ul>
        <li>Total Clicks: ${window.stats.totalClicks}</li>
        <li>Total Points Earned: ${window.stats.totalPointsEarned}</li>
        <li>Total Prestiges: ${window.stats.totalPrestiges}</li>
      </ul>
    `;
  };