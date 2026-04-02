// Game version variable
window.GAME_VERSION = window.GAME_VERSION || '1.0.2';
window.SUPABASE_URL = window.SUPABASE_URL || 'https://hlzjnuvpyeqpuuwbdrwm.supabase.co';
window.SUPABASE_KEY = window.SUPABASE_KEY || 'sb_publishable_MeP2lSHANuOoMrGsCudDCg_oMmlmMg8';

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
    <hr>
    
    <h3>Cloud Save</h3>
    <input type="text" id="cloud-save-id" placeholder="Enter a secret save name" maxlength="30" style="margin-bottom: 8px; padding: 4px;" required>
    <br>
    <button id="cloud-save-btn">Save to Cloud</button>
    <button id="cloud-load-btn">Load from Cloud</button>
    <div id="cloud-save-status" style="margin-top: 8px; font-weight: bold;"></div>
    
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

  // --- CLOUD SAVE LOGIC (ROLLING BACKUPS) ---
  document.getElementById('cloud-save-btn').onclick = async function() {
    const saveId = document.getElementById('cloud-save-id').value.trim();
    const status = document.getElementById('cloud-save-status');
    
    if (!saveId) {
      status.textContent = "Please enter a save name first.";
      status.style.color = "#e74c3c";
      return;
    }

    if (typeof saveGame === 'function') saveGame();
    const saveData = localStorage.getItem('gameSave');
    
    if (!saveData) {
      status.textContent = "No local save data found.";
      status.style.color = "#e74c3c";
      return;
    }

    status.textContent = "Saving to cloud...";
    status.style.color = "#888";

    // 1. Insert the brand new save
    const { error: insertError } = await window.supabase
      .from('saves')
      .insert([{ save_code: saveId, save_data: saveData }]);

    if (insertError) {
      console.error("Cloud save error:", insertError);
      status.textContent = "Failed to save to the cloud.";
      status.style.color = "#e74c3c";
      return;
    }

    // 2. Fetch all saves for this code to clean up old ones
    const { data: allSaves } = await window.supabase
      .from('saves')
      .select('id')
      .eq('save_code', saveId)
      .order('updated_at', { ascending: false }); // Newest first

    // 3. Keep only the 3 most recent saves, delete the rest
    if (allSaves && allSaves.length > 3) {
      const idsToDelete = allSaves.slice(3).map(row => row.id);
      await window.supabase.from('saves').delete().in('id', idsToDelete);
    }

    status.textContent = "Game saved to the cloud successfully!";
    status.style.color = "#2ecc71";
  };

  // --- CLOUD LOAD LOGIC ---
  document.getElementById('cloud-load-btn').onclick = async function() {
    const saveId = document.getElementById('cloud-save-id').value.trim();
    const status = document.getElementById('cloud-save-status');
    
    if (!saveId) {
      status.textContent = "Please enter your save name to load.";
      status.style.color = "#e74c3c";
      return;
    }

    status.textContent = "Loading from cloud...";
    status.style.color = "#888";

    // Grab ONLY the single newest save for this code
    const { data, error } = await window.supabase
      .from('saves')
      .select('save_data')
      .eq('save_code', saveId)
      .order('updated_at', { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      console.error("Cloud load error:", error);
      status.textContent = "Could not find a save file with that name.";
      status.style.color = "#e74c3c";
      return;
    }

    window.disableSaving = true;
    localStorage.removeItem('gameSave');
    localStorage.setItem('gameSave', data.save_data);
    
    status.textContent = "Save loaded! Reloading game...";
    status.style.color = "#3498db";
    setTimeout(() => location.replace(location.href), 500);
  };

  // --- RESTART GAME LOGIC ---
  document.getElementById('restart-game-btn').onclick = function() {
    if (confirm("Are you sure you want to restart your game? This will erase all progress!")) {
      localStorage.removeItem('gameSave');
      window.disableSaving = true; // Prevents further saves during restart
      setTimeout(() => {
        location.replace(location.href); // Forces a full reload
      }, 500);
    }
  };

  // --- SUGGESTION BOX LOGIC ---
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
      console.error("Supabase Error:", error); 
      status.textContent = "Error submitting suggestion.";
    } else {
      status.textContent = "Thank you for your suggestion!";
      document.getElementById('suggestion-input').value = "";
      lastSuggestionTime = now;
    }
  };
};