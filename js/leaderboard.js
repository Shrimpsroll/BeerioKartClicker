// Use this at the top of every file that needs Supabase
window.SUPABASE_URL = window.SUPABASE_URL || 'https://qwdlkzcvvjbjjhrhagax.supabase.co';
window.SUPABASE_KEY = window.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3ZGxremN2dmpiampocmhhZ2F4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNjc5MzAsImV4cCI6MjA2NzY0MzkzMH0.1RdbkzQbF612lIZncZ7m2yhtQWNc_Bc66RXzrJo_ao0';
if (!window.supabase || typeof window.supabase.from !== "function") {
  window.supabase = supabase.createClient(window.SUPABASE_URL, window.SUPABASE_KEY);
}

window.renderLeaderboard = async function() {
  document.getElementById('leaderboard-content').innerHTML = `
    <p>Points: <span id="points">${points}</span></p>
    <h2>Leaderboard</h2>
    <form id="submit-score-form">
      <input type="text" id="leaderboard-name" placeholder="Your name" maxlength="16" required>
      <button type="submit">Submit Score</button>
    </form>
    <div id="leaderboard-list">Loading...</div>
  `;

  // Fetch and display leaderboard
  async function loadLeaderboard() {
    const { data, error } = await window.supabase
      .from('leaderboard')
      .select('*')
      .order('prestige', { ascending: false })
      .order('score', { ascending: false })
      .limit(10);

    if (error) {
      document.getElementById('leaderboard-list').innerText = 'Error loading leaderboard.';
      return;
    }

    document.getElementById('leaderboard-list').innerHTML = `
      <ol>
        ${data.map(row => `<li>${row.name}: Prestige ${row.prestige.toLocaleString()}, Score ${row.score.toLocaleString()}</li>`).join('')}
      </ol>
    `;
  }

  loadLeaderboard();

  // Handle score submission
  document.getElementById('submit-score-form').onsubmit = async function(e) {
    e.preventDefault();
    const name = document.getElementById('leaderboard-name').value.trim();
    if (!name) return;
    const score = window.points || 0;
    const prestige = window.prestige?.points || 0;
    const bank = window.bank?.balance || 0;
    // Cheating check
    const cheated = window.hasCheated || (score > (window.stats?.totalPointsEarned || 0));
    // Fetch IP address
    let ip = '';
    try {
      const res = await fetch('https://api.ipify.org?format=json');
      const data = await res.json();
      ip = data.ip;
    } catch (err) {
      ip = 'unknown';
    }
    // Get playtime in seconds
    const playtime = window.stats?.totalPlayTime || 0;

    const { error } = await window.supabase.from('leaderboard').insert([
      { name, score, prestige, bank, cheated, ip, playtime }
    ]);
    if (error) {
      alert('Error submitting score.');
      return;
    }
    loadLeaderboard();
    e.target.reset();
  };
};