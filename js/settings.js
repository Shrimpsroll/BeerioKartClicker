// Game version variable
window.GAME_VERSION = window.GAME_VERSION || '1.0.2';
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
    <div style="font-size:0.95em;color:#888;margin-bottom:4px;">Version ${window.GAME_VERSION}</div>
    <!-- <button id=\"show-dev-panel-btn\" class=\"dev-bottom-btn\">Show Dev Panel</button> -->
    <hr>
    <button id="download-save-btn">Download Save</button>
    <input type="file" id="upload-save-input" style="display:none" />
    <button id="upload-save-btn">Upload Save</button>
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
  // Download Save logic (AES-GCM encrypted with static key)
  document.getElementById('download-save-btn').onclick = async function() {
    if (typeof saveGame === 'function') saveGame();
    let save = localStorage.getItem('gameSave');
    if (!save) {
      alert('No save data found.');
      return;
    }
    // Static key and IV (should be 32 bytes for key, 12 bytes for IV)
    const keyBytes = new Uint8Array([99,42,17,88,201,33,77,5,9,111,222,123,44,55,66,77,88,99,101,102,103,104,105,106,107,108,109,110,111,112,113,114]);
    const iv = new Uint8Array([1,2,3,4,5,6,7,8,9,10,11,12]);
    const enc = new TextEncoder();
    try {
      const key = await window.crypto.subtle.importKey(
        'raw', keyBytes, {name: 'AES-GCM'}, false, ['encrypt']);
      const ciphertext = new Uint8Array(await window.crypto.subtle.encrypt(
        {name: 'AES-GCM', iv}, key, enc.encode(save)));
      // Save as base64
      const b64 = btoa(String.fromCharCode(...ciphertext));
      const blob = new Blob([b64], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'beeriokart_save.enc';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
    } catch (err) {
      alert('Encryption failed: ' + err);
    }
  };

  // Upload Save logic
  document.getElementById('upload-save-btn').onclick = function() {
    document.getElementById('upload-save-input').click();
  };

  document.getElementById('upload-save-input').onchange = function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async function(evt) {
      try {
        // Static key and IV (must match download)
        const keyBytes = new Uint8Array([99,42,17,88,201,33,77,5,9,111,222,123,44,55,66,77,88,99,101,102,103,104,105,106,107,108,109,110,111,112,113,114]);
        const iv = new Uint8Array([1,2,3,4,5,6,7,8,9,10,11,12]);
        const enc = new TextEncoder();
        const dec = new TextDecoder();
        const b64 = evt.target.result;
        const ciphertext = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
        const key = await window.crypto.subtle.importKey(
          'raw', keyBytes, {name: 'AES-GCM'}, false, ['decrypt']);
        const decrypted = dec.decode(await window.crypto.subtle.decrypt(
          {name: 'AES-GCM', iv}, key, ciphertext));
        // Optionally validate JSON here if needed
        window.disableSaving = true; // Prevent auto-save from overwriting
        localStorage.removeItem('gameSave'); // Remove old save first
        localStorage.setItem('gameSave', decrypted);
        alert('Save uploaded! The game will now reload.');
        setTimeout(() => location.replace(location.href), 500);
      } catch (err) {
        alert('Failed to load or decrypt save file.');
      }
    };
    reader.readAsText(file);
  };

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