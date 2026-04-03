window.render_fishing = function() {
  // Clear any existing game loop so it doesn't double-run
  if (window.fishingLoop) cancelAnimationFrame(window.fishingLoop);

  document.getElementById('tab-content').innerHTML = `
    <h2>Fishing Pier</h2>
    <p>Hold the mouse down <b>anywhere</b> to raise your catch bar. Keep the fish inside the green bar!</p>
    
    <button id="start-fishing-btn" style="padding: 10px 20px; font-size: 1.2em; cursor: pointer;">Cast Line 🎣</button>
    
    <div id="fishing-game-area" style="display:none; gap: 30px; align-items: flex-end; height: 300px; margin-top: 20px; user-select: none;">
       <div id="water-track" style="width: 50px; height: 100%; background: #2980b9; position: relative; border-radius: 10px; border: 2px solid #2c3e50; overflow: hidden;">
          <div id="catch-bar" style="width: 100%; height: 25%; background: rgba(46, 204, 113, 0.7); position: absolute; bottom: 0; border: 2px solid #27ae60; box-sizing: border-box;"></div>
          <div id="fish-icon" style="width: 20px; height: 20px; background: #f39c12; border-radius: 50%; position: absolute; bottom: 0; left: 13px; transition: bottom 0.1s linear;"></div>
       </div>

       <div id="progress-track" style="width: 20px; height: 100%; background: #eee; position: relative; border-radius: 10px; border: 2px solid #bdc3c7;">
          <div id="progress-fill" style="width: 100%; height: 20%; background: #e74c3c; position: absolute; bottom: 0;"></div>
       </div>
    </div>
    
    <div id="fishing-loot" style="margin-top: 20px;"></div>

    <hr style="margin-top: 40px; border-color: #444;">
    
    <h3>🏆 Biggest Catches (Global)</h3>
    <div id="fishing-leaderboard-list">Loading top catches...</div>
  `;

  let isFishing = false;
  let isHolding = false;
  let fishPos = 10; 
  let fishTarget = 50;
  let fishTimer = 0;
  let barPos = 0; 
  let barVelocity = 0;
  const barHeight = 25; 
  let catchProgress = 20; 

  const btn = document.getElementById('start-fishing-btn');
  const gameArea = document.getElementById('fishing-game-area');
  const catchBarEl = document.getElementById('catch-bar');
  const fishIconEl = document.getElementById('fish-icon');
  const progressFillEl = document.getElementById('progress-fill');
  const lootArea = document.getElementById('fishing-loot');

  // --- LEADERBOARD LOGIC ---
  async function loadFishingLeaderboard() {
    if (!window.supabase) return;
    const { data, error } = await window.supabase
      .from('fishing_leaderboard')
      .select('*')
      .order('points_rewarded', { ascending: false }) 
      .limit(10);

    if (error) {
      document.getElementById('fishing-leaderboard-list').innerText = 'Error loading catches.';
      return;
    }

    if (data.length === 0) {
      document.getElementById('fishing-leaderboard-list').innerHTML = '<p>No catches recorded yet. Be the first!</p>';
      return;
    }

    document.getElementById('fishing-leaderboard-list').innerHTML = `
      <ol style="background: #222; padding: 20px 40px; border-radius: 8px;">
        ${data.map(row => `
          <li style="margin-bottom: 10px; border-bottom: 1px solid #444; padding-bottom: 5px;">
            <strong>${row.player_name}</strong> caught a <span style="color:#f39c12;">${row.fish_details}</span> 
            (${row.weight} kg) <br> 
            <small style="color: #2ecc71;">Worth ${window.formatNumber ? window.formatNumber(row.points_rewarded) : row.points_rewarded} points</small>
          </li>
        `).join('')}
      </ol>
    `;
  }
  
  loadFishingLeaderboard(); 

  // --- INPUT LISTENERS ---
  const pullUp = (e) => { 
    if (isFishing) { e.preventDefault(); isHolding = true; }
  };
  const letGo = (e) => { 
    if (isFishing) { e.preventDefault(); isHolding = false; }
  };
  
  window.removeEventListener('mousedown', pullUp);
  window.removeEventListener('mouseup', letGo);
  window.removeEventListener('touchstart', pullUp);
  window.removeEventListener('touchend', letGo);

  window.addEventListener('mousedown', pullUp);
  window.addEventListener('mouseup', letGo);
  window.addEventListener('touchstart', pullUp, {passive: false});
  window.addEventListener('touchend', letGo);

  // --- MINIGAME START ---
  btn.onclick = () => {
    isFishing = true;
    catchProgress = 20;
    fishPos = 10;
    barPos = 0;
    barVelocity = 0;
    btn.style.display = 'none';
    gameArea.style.display = 'flex';
    lootArea.innerHTML = '';
    updateVisuals();
    runGameLoop();
  };

  // --- PHYSICS LOOP ---
  function runGameLoop() {
    if (!isFishing) return;

    if (isHolding) barVelocity += 0.15; 
    else barVelocity -= 0.15; 
    
    barVelocity *= 0.88; 
    barPos += barVelocity;

    if (barPos < 0) { barPos = 0; barVelocity = 0; }
    if (barPos > (100 - barHeight)) { barPos = (100 - barHeight); barVelocity = 0; }

    fishTimer++;
    if (fishTimer > 80) { 
      fishTimer = 0;
      fishTarget = Math.random() * 90; 
    }
    
    if (fishPos < fishTarget) fishPos += 0.4; 
    if (fishPos > fishTarget) fishPos -= 0.4; 
    
    if (fishPos < 0) fishPos = 0;
    if (fishPos > 100) fishPos = 100;

    let isCatching = (fishPos >= barPos && fishPos <= (barPos + barHeight));

    if (isCatching) {
      catchProgress += 0.3; 
      catchBarEl.style.background = 'rgba(46, 204, 113, 0.9)'; 
    } else {
      catchProgress -= 0.2; 
      catchBarEl.style.background = 'rgba(231, 76, 60, 0.7)'; 
    }

    if (catchProgress >= 100) { winFishing(); return; } 
    else if (catchProgress <= 0) { loseFishing(); return; }

    updateVisuals();
    window.fishingLoop = requestAnimationFrame(runGameLoop);
  }

  function updateVisuals() {
    catchBarEl.style.bottom = `${barPos}%`;
    fishIconEl.style.bottom = `${fishPos}%`;
    progressFillEl.style.height = `${catchProgress}%`;
    
    if (catchProgress > 75) progressFillEl.style.background = '#2ecc71';
    else if (catchProgress > 40) progressFillEl.style.background = '#f1c40f';
    else progressFillEl.style.background = '#e74c3c';
  }

  function getRoll(lootTable) {
    let roll = Math.random();
    let cumulative = 0;
    for (let item of lootTable) {
      cumulative += item.chance;
      if (roll <= cumulative) return item;
    }
    return lootTable[lootTable.length - 1]; 
  }

  // --- WIN STATE & LOOT GENERATION ---
  function winFishing() {
    isFishing = false;
    gameArea.style.display = 'none';
    btn.style.display = 'block';
    btn.textContent = "Cast Again 🎣";

    const fishDB = [
      { name: "Old Boot", chance: 0.12, minW: 0.5, maxW: 1.5, baseValue: 1, scale: 0.000001, color: "#7f8c8d" },
      { name: "Minnow", chance: 0.12, minW: 0.1, maxW: 0.5, baseValue: 5, scale: 0.000005, color: "#95a5a6" },
      { name: "Carp", chance: 0.10, minW: 0.5, maxW: 3.0, baseValue: 15, scale: 0.00001, color: "#d35400" },
      { name: "Sunfish", chance: 0.10, minW: 1.0, maxW: 4.5, baseValue: 20, scale: 0.00005, color: "#f39c12" },
      { name: "Herring", chance: 0.08, minW: 0.2, maxW: 1.0, baseValue: 25, scale: 0.0001, color: "#bdc3c7" },
      { name: "River Bass", chance: 0.07, minW: 1.5, maxW: 5.0, baseValue: 50, scale: 0.0005, color: "#2ecc71" },
      { name: "Catfish", chance: 0.07, minW: 3.0, maxW: 12.0, baseValue: 75, scale: 0.0008, color: "#34495e" },
      { name: "Rainbow Trout", chance: 0.06, minW: 1.0, maxW: 4.0, baseValue: 100, scale: 0.001, color: "#ff9ff3" },
      { name: "Pufferfish", chance: 0.05, minW: 0.5, maxW: 2.5, baseValue: 150, scale: 0.002, color: "#f1c40f" },
      { name: "Cave Eel", chance: 0.05, minW: 2.0, maxW: 8.0, baseValue: 250, scale: 0.003, color: "#3498db" },
      { name: "Giant Sturgeon", chance: 0.04, minW: 15.0, maxW: 45.0, baseValue: 600, scale: 0.005, color: "#8e44ad" },
      { name: "Swordfish", chance: 0.03, minW: 30.0, maxW: 90.0, baseValue: 1500, scale: 0.008, color: "#0abde3" },
      { name: "Deep Sea Angler", chance: 0.03, minW: 5.0, maxW: 15.0, baseValue: 3000, scale: 0.01, color: "#1abc9c" },
      { name: "Kraken Tentacle", chance: 0.02, minW: 50.0, maxW: 200.0, baseValue: 10000, scale: 0.015, color: "#e74c3c" },
      { name: "Ghost Fish", chance: 0.02, minW: 0.0, maxW: 0.1, baseValue: 25000, scale: 0.02, color: "#ecf0f1" },
      { name: "Void Ray", chance: 0.015, minW: 10.0, maxW: 30.0, baseValue: 75000, scale: 0.025, color: "#2c3e50" },
      { name: "Crimson Leviathan", chance: 0.01, minW: 80.0, maxW: 250.0, baseValue: 250000, scale: 0.03, color: "#c0392b" },
      { name: "Stardust Serpent", chance: 0.008, minW: 20.0, maxW: 60.0, baseValue: 1000000, scale: 0.04, color: "#fd79a8" },
      { name: "Abyssal Behemoth", chance: 0.005, minW: 500.0, maxW: 2000.0, baseValue: 5000000, scale: 0.06, color: "#192a56" },
      { name: "Cosmic Whale", chance: 0.002, minW: 1000.0, maxW: 5000.0, baseValue: 50000000, scale: 0.10, color: "#9c88ff" }
    ];

    const qualityDB = [
      { name: "Rotted", chance: 0.10, mult: 0.1, color: "#596275" },
      { name: "Poor", chance: 0.15, mult: 0.5, color: "#8395a7" },
      { name: "Normal", chance: 0.25, mult: 1, color: "#c8d6e5" },
      { name: "Fair", chance: 0.15, mult: 1.2, color: "#a4b0be" },
      { name: "Good", chance: 0.10, mult: 1.5, color: "#1dd1a1" },
      { name: "Silver", chance: 0.08, mult: 2, color: "#c0c0c0" },
      { name: "Gold", chance: 0.06, mult: 3, color: "#f1c40f" },
      { name: "Platinum", chance: 0.04, mult: 5, color: "#00d2d3" },
      { name: "Iridium", chance: 0.025, mult: 10, color: "#8e44ad" },
      { name: "Obsidian", chance: 0.02, mult: 20, color: "#2f3640" },
      { name: "Radiant", chance: 0.015, mult: 50, color: "#fffa65" },
      { name: "Ethereal", chance: 0.006, mult: 100, color: "#18dcff" },
      { name: "Celestial", chance: 0.003, mult: 250, color: "#cd84f1" },
      { name: "Omnipotent", chance: 0.001, mult: 1000, color: "#ff4d4d" }
    ];

    const attrDB = [
      { name: "None", chance: 0.35, mult: 1 },
      { name: "Slimy", chance: 0.12, mult: 1.1 },
      { name: "Heavy", chance: 0.10, mult: 1.2 },
      { name: "Shiny", chance: 0.08, mult: 1.3 },
      { name: "Spiky", chance: 0.06, mult: 1.5 },
      { name: "Glowing", chance: 0.05, mult: 1.8 },
      { name: "Vicious", chance: 0.04, mult: 2 },
      { name: "Energized", chance: 0.035, mult: 2.5 },
      { name: "Mutated", chance: 0.03, mult: 3 },
      { name: "Armored", chance: 0.025, mult: 4 },
      { name: "Radioactive", chance: 0.02, mult: 5 },
      { name: "Ancient", chance: 0.018, mult: 8 },
      { name: "Cursed", chance: 0.015, mult: 12 }, 
      { name: "Blessed", chance: 0.012, mult: 20 },
      { name: "Mechanical", chance: 0.01, mult: 30 },
      { name: "Fractal", chance: 0.008, mult: 40 },
      { name: "Quantum", chance: 0.006, mult: 50 },
      { name: "Demonic", chance: 0.004, mult: 75 },
      { name: "Angelic", chance: 0.003, mult: 100 },
      { name: "Glitched", chance: 0.001, mult: 200 }
    ];

    const caughtFish = getRoll(fishDB);
    const caughtQuality = getRoll(qualityDB);
    const caughtAttr = getRoll(attrDB);

    const weight = (Math.random() * (caughtFish.maxW - caughtFish.minW) + caughtFish.minW).toFixed(2);
    
    // Dynamic Points Scaling
    const currentPoints = window.points || 0;
    const dynamicBaseValue = Math.max(caughtFish.baseValue, Math.floor(currentPoints * caughtFish.scale));
    const weightBonus = (weight / caughtFish.maxW) * 0.5; 
    let pointsAwarded = Math.floor(dynamicBaseValue * caughtQuality.mult * caughtAttr.mult * (1 + weightBonus));
    
    const totalOddsProbability = caughtFish.chance * caughtQuality.chance * caughtAttr.chance;
    const oddsOneIn = Math.round(1 / totalOddsProbability);

    // Update Points and Stats (Anti-Cheat Fix)
    window.points = (window.points || 0) + pointsAwarded;
    if (window.stats) {
      window.stats.totalPointsEarned = (window.stats.totalPointsEarned || 0) + pointsAwarded;
      window.stats.totalFishCaught = (window.stats.totalFishCaught || 0) + 1;
    }

    if (document.getElementById('points')) {
        document.getElementById('points').textContent = window.formatNumber ? window.formatNumber(window.points) : window.points;
    }

    const fishFullName = `${caughtQuality.name !== "Normal" ? caughtQuality.name + " " : ""}${caughtAttr.name !== "None" ? caughtAttr.name + " " : ""}${caughtFish.name}`;

    // Check for Personal Best Catch
    if (!window.stats) window.stats = {}; 
    if (pointsAwarded > (window.stats.bestFishCaughtValue || 0)) {
      window.stats.bestFishCaughtValue = pointsAwarded;
      window.stats.bestFishName = fishFullName;
    }

    if (typeof saveGame === 'function') saveGame();

    lootArea.innerHTML = `
      <div style="background: #222; padding: 15px; border-radius: 8px; border: 2px solid ${caughtQuality.color}; max-width: 320px;">
        <h3 style="margin-top:0; margin-bottom: 5px; color: ${caughtQuality.color}; text-shadow: 1px 1px 1px #000;">
          ${fishFullName}
        </h3>
        
        <p style="margin: 5px 0; font-size: 0.9em; color: #aaa;"><i>Base Catch Rate: ${(caughtFish.chance * 100).toFixed(0)}%</i></p>
        <hr style="border-color: #444;">
        <p style="margin: 5px 0;"><b>Weight:</b> ${weight} kg</p>
        
        <div style="background: #111; border: 1px solid #1abc9c; padding: 5px; border-radius: 4px; margin-top: 10px;">
           <p style="margin: 0; font-size: 0.85em; color: #1abc9c;"><b>Total Luck:</b> 1 in ${window.formatNumber ? window.formatNumber(oddsOneIn) : oddsOneIn} chance!</p>
        </div>

        <p style="margin: 10px 0; font-size: 1.2em; font-weight: bold; color: #f39c12;">Reward: +${window.formatNumber ? window.formatNumber(pointsAwarded) : pointsAwarded} Points</p>
        
        <div style="margin-top: 15px; background: #333; padding: 10px; border-radius: 5px;">
           <input type="text" id="fisher-name" placeholder="Enter your name" maxlength="16" style="width: 100%; padding: 5px; box-sizing: border-box; margin-bottom: 5px;">
           <button id="submit-catch-btn" style="width: 100%; padding: 8px; background: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer;">Post to Leaderboard</button>
           <div id="catch-status" style="font-size: 0.85em; color: #ccc; margin-top: 5px;"></div>
        </div>
      </div>
    `;

    document.getElementById('submit-catch-btn').onclick = async function() {
      const name = document.getElementById('fisher-name').value.trim();
      const statusEl = document.getElementById('catch-status');
      
      if (!name) {
        statusEl.textContent = "Please enter a name first!";
        statusEl.style.color = "#e74c3c";
        return;
      }
      
      statusEl.textContent = "Submitting...";
      statusEl.style.color = "#888";

      let ip = 'unknown';
      try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        ip = data.ip;
      } catch (err) {}

      const { error } = await window.supabase.from('fishing_leaderboard').insert([{ 
        player_name: name, 
        fish_details: fishFullName, 
        weight: parseFloat(weight), 
        points_rewarded: pointsAwarded,
        ip: ip
      }]);

      if (error) {
        console.error(error);
        statusEl.textContent = "Error submitting catch.";
        statusEl.style.color = "#e74c3c";
      } else {
        statusEl.textContent = "Catch added to the Leaderboard!";
        statusEl.style.color = "#2ecc71";
        document.getElementById('submit-catch-btn').style.display = 'none'; 
        if (typeof loadFishingLeaderboard === 'function') loadFishingLeaderboard(); 
      }
    };
  }

  function loseFishing() {
    isFishing = false;
    gameArea.style.display = 'none';
    btn.style.display = 'block';
    btn.textContent = "Try Again 🎣";
    
    lootArea.innerHTML = `
      <div style="background: #331a1a; padding: 15px; border-radius: 8px; border: 2px solid #e74c3c; max-width: 300px;">
        <h3 style="margin-top:0; color: #e74c3c;">❌ The fish got away...</h3>
        <p style="margin: 0;">You let the tension drop too low!</p>
      </div>
    `;
  }
};