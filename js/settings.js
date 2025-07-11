window.SUPABASE_URL = window.SUPABASE_URL || 'https://qwdlkzcvvjbjjhrhagax.supabase.co';
window.SUPABASE_KEY = window.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3ZGxremN2dmpiampocmhhZ2F4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNjc5MzAsImV4cCI6MjA2NzY0MzkzMH0.1RdbkzQbF612lIZncZ7m2yhtQWNc_Bc66RXzrJo_ao0';
if (!window.supabase || typeof window.supabase.from !== "function") {
  window.supabase = supabase.createClient(window.SUPABASE_URL, window.SUPABASE_KEY);
}

window.devCommands = {
  addPoints: function(amount) {
    window.points = (window.points || 0) + amount;
    if (document.getElementById('points')) document.getElementById('points').textContent = window.points;
    if (typeof saveGame === 'function') saveGame();
  },
  addPrestige: function(amount) {
    window.prestige.points += 1;
if (window.renderPrestige) window.renderPrestige();
    if (typeof saveGame === 'function') saveGame();
    if (window.renderPrestige) window.renderPrestige();
  },
  resetGame: function() {
    if (confirm("Are you sure?")) {
      localStorage.removeItem('gameSave');
      setTimeout(() => {
        location.replace(location.href);
      }, 500);
    }
  }
};

window.renderSettings = function() {
  document.getElementById('settings-content').innerHTML = `
    <h2>Settings</h2>
    <div style="font-size:0.95em;color:#888;margin-bottom:4px;">Version 1.0.0</div>
    <!-- <button id=\"show-dev-panel-btn\" class=\"dev-bottom-btn\">Show Dev Panel</button> -->
    <hr>
    <!-- <button id=\"download-save-btn\">Download Save</button> -->
    <!-- <input type=\"file\" id=\"upload-save-input\" style=\"display:none\" /> -->
    <!-- <button id=\"upload-save-btn\">Upload Save</button> -->
    <hr>
    <button id="restart-game-btn" style="background:#e74c3c;">Restart Game</button>
    <hr>
    <div id="suggestion-box">
      <h3>Suggestion Box and Bug Report</h3>
      <textarea id="suggestion-input" rows="3" placeholder="Your suggestion..."></textarea><br>
      <button id="submit-suggestion-btn">Submit Suggestion</button>
      <div id="suggestion-status"></div>
    </div>
  `;

  // Dev panel logic (commented out)
  // document.getElementById('show-dev-panel-btn').onclick = function() {
  //   const pwd = prompt("Enter dev password:");
  //   if (pwd !== "letmein") {
  //     alert("Incorrect password.");
  //     return;
  //   }
  //   if (!document.getElementById('dev-panel')) {
  //     const devPanel = document.createElement("div");
  //     window.hasCheated = true;
  //     devPanel.id = "dev-panel";
  //     devPanel.style.background = "#222";
  //     devPanel.style.color = "#fff";
  //     devPanel.style.padding = "10px";
  //     devPanel.style.borderRadius = "8px";
  //     devPanel.style.marginTop = "10px";
  //     devPanel.innerHTML = `
  //       <b>Dev Panel</b><br>
  //       <button onclick="window.devCommands.addPoints(1000000)">+1M Points</button>
  //       <button onclick="window.devCommands.addPrestige(1)">+1 Prestige</button>
  //       <button onclick="window.devCommands.resetGame()">Reset Game</button>
  //       <button onclick="this.parentElement.remove()">Close</button>
  //     `;
  //     document.getElementById('settings-content').appendChild(devPanel);
  //   }
  // };

  // Download/Upload save buttons are commented out
  // document.getElementById('download-save-btn').onclick = function() { ... }
  // document.getElementById('upload-save-btn').onclick = function() { ... }
  // document.getElementById('upload-save-input').onchange = function(e) { ... }

  // Restart game logic
  document.getElementById('restart-game-btn').onclick = function() {
    if (confirm("Are you sure you want to restart your game? This will erase all progress!")) {
      localStorage.removeItem('gameSave');
      window.disableSaving = true; // Prevents further saves during restart
      setTimeout(() => {
        location.replace(location.href); // Forces a full reload
      }, 500);
    }
  };

  // Suggestion box logic
  let lastSuggestionTime = 0;

document.getElementById('submit-suggestion-btn').onclick = async function() {
  const now = Date.now();
  const cooldown = 30 * 1000; // 30 seconds
  const status = document.getElementById('suggestion-status');
  if (now - lastSuggestionTime < cooldown) {
    status.textContent = "Please wait before submitting another suggestion.";
    return;
  }

  const text = document.getElementById('suggestion-input').value.trim();
  if (!text) {
    status.textContent = "Please enter a suggestion.";
    return;
  }
  status.textContent = "Submitting...";
  // Fetch IP address
  let ip = '';
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    ip = data.ip;
  } catch (err) {
    ip = 'unknown';
  }
  const { error } = await window.supabase.from('suggestions').insert([{ text, ip }]);
  if (error) {
    status.textContent = "Error submitting suggestion.";
  } else {
    status.textContent = "Thank you for your suggestion!";
    document.getElementById('suggestion-input').value = "";
    lastSuggestionTime = now;
  }
};
};