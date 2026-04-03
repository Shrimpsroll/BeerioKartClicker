// === Simple Upgrade Shop System ===

// Upgrade definitions: just add to this array to expand!
window.upgrades = window.upgrades || [
  { id: 'mat', name: "Mat's Turbo Slurper", desc: 'Increases points per click by 1.', baseCost: 50, cost: 50, level: 0, type: 'ppc', amount: 2, maxLevel: 99 },
  { id: 'drake', name: "Drake's Shortcut Strat", desc: 'Drake discovers a sneaky Beerio Kart shortcut.', baseCost: 250, cost: 250, level: 0, type: 'pps', amount: 10, maxLevel: 99 },
  { id: 'imi', name: "Imi's “One More” Round", desc: 'Each click hits harder as Imi keeps drinking.', baseCost: 1200, cost: 1200, level: 0, type: 'ppc', amount: 50, maxLevel: 99 },
  { id: 'josh', name: "Josh's YOLO Boost", desc: 'Josh goes full send, increasing your passive gains.', baseCost: 6000, cost: 6000, level: 0, type: 'pps', amount: 250, maxLevel: 99 },
  { id: 'jason', name: "Jason's Jug Juggernaut", desc: 'Jug sizes increase click impact.', baseCost: 35000, cost: 35000, level: 0, type: 'ppc', amount: 1200, maxLevel: 99 },
  { id: 'noah', name: "Noah's Drunk Drift", desc: 'Smooth drifting improves passive generation.', baseCost: 180000, cost: 180000, level: 0, type: 'pps', amount: 6000, maxLevel: 99 },
  { id: 'oscar', name: "Oscar's Beer Battery", desc: 'Oscar harnesses beer power for background gains.', baseCost: 900000, cost: 900000, level: 0, type: 'pps', amount: 30000, maxLevel: 99 },
  { id: 'spike', name: "Spike's Shotgun Technique", desc: 'Unleash the beast. Big click gains.', baseCost: 4500000, cost: 4500000, level: 0, type: 'ppc', amount: 150000, maxLevel: 99 },
  { id: 'tom', name: "Tom's Time Warp", desc: 'Time bends to your will. Boosts Noah\'s output.', baseCost: 10000000, cost: 10000000, level: 0, type: 'boost', targetId: 'noah', amount: 5, maxLevel: 2 },
  { id: 'mat_hydration', name: "Mat's Hydration Hack", desc: 'Mat figures out how to never get hungover. Clicking is more efficient.', baseCost: 25000000, cost: 25000000, level: 0, type: 'ppc', amount: 800000, maxLevel: 99 },
  { id: 'josh_pissbreak', name: "Josh's Piss Break Efficiency", desc: 'He pees in record time and never loses speed. Faster PPS.', baseCost: 120000000, cost: 120000000, level: 0, type: 'pps', amount: 3500000, maxLevel: 99 },
  { id: 'imi_infinitybeer', name: "Imi's Infinite Beer Glitch", desc: 'Somehow the can never empties. Clicking is endless joy.', baseCost: 600000000, cost: 600000000, level: 0, type: 'ppc', amount: 18000000, maxLevel: 99 },
  { id: 'tom_laptime', name: "Tom's 12 Second Lap", desc: 'Physics-defying Beerio Kart tactics. Massive passive boost.', baseCost: 3000000000, cost: 3000000000, level: 0, type: 'pps', amount: 85000000, maxLevel: 99 },
  { id: 'spike_bottlepop', name: "Spike's Perfect Pop", desc: 'Every bottle opened with precision. Boosts Spike\'s output.', baseCost: 10000000000, cost: 10000000000, level: 0, type: 'boost', targetId: 'spike', amount: 10, maxLevel: 2 },
  { id: 'noah_blinddrive', name: "Noah's Blindfold Drive", desc: 'He doesn\'t even need to look anymore. Insane passive gains.', baseCost: 18000000000, cost: 18000000000, level: 0, type: 'pps', amount: 400000000, maxLevel: 99 },
  { id: 'jason_kegmaster', name: "Jason's Keg Mastery", desc: 'Can carry two kegs at once. Clicks are brutal.', baseCost: 90000000000, cost: 90000000000, level: 0, type: 'ppc', amount: 2000000000, maxLevel: 99 },
  { id: 'oscar_powerboost', name: "Oscar's Dual Cell Battery", desc: 'Boosts Oscar\'s Beer Battery power.', baseCost: 250000000000, cost: 250000000000, level: 0, type: 'boost', targetId: 'oscar', amount: 25, maxLevel: 2 },
  { id: 'drake_crashskip', name: "Drake's Crash Skip Glitch", desc: 'Skips crash animations. Huge passive boost.', baseCost: 500000000000, cost: 500000000000, level: 0, type: 'pps', amount: 10000000000, maxLevel: 99 },
  { id: 'mat_ultimateslurper', name: "Mat's Ultimate Slurper", desc: 'His final form. Clicks are ridiculous.', baseCost: 2500000000000, cost: 2500000000000, level: 0, type: 'ppc', amount: 50000000000, maxLevel: 99 },
  { id: 'grumble_volcano', name: 'Grumble Volcano Drift Zone', desc: 'The track is falling apart, but your reflexes aren’t. Huge PPS from risky plays.', baseCost: 12500000000000, cost: 12500000000000, level: 0, type: 'pps', amount: 250000000000, maxLevel: 99 },
  { id: 'rainbow_road_wii', name: 'Rainbow Road (Wii Physics)', desc: 'You fall off 11 times but still somehow win. Insane click boost.', baseCost: 65000000000000, cost: 65000000000000, level: 0, type: 'ppc', amount: 1200000000000, maxLevel: 99 },
  { id: 'noah_coconutmall', name: 'Noah at Coconut Mall', desc: 'Shopping, drifting, chugging. Noah’s passive generation skyrockets.', baseCost: 300000000000000, cost: 300000000000000, level: 0, type: 'pps', amount: 6000000000000, maxLevel: 99 },
  { id: 'mat_marioscircuit', name: 'Mat’s Mario Circuit Dominance', desc: 'Absolute control of the kart and the cup. Clicks are clean and fast.', baseCost: 1500000000000000, cost: 1500000000000000, level: 0, type: 'ppc', amount: 30000000000000, maxLevel: 99 },
  { id: 'spike_dksummit', name: 'Spike’s DK Summit Snowbomb', desc: 'Double flips into double beers. Solid passive snowball.', baseCost: 8000000000000000, cost: 8000000000000000, level: 0, type: 'pps', amount: 150000000000000, maxLevel: 99 },
  { id: 'josh_waluigipinball', name: 'Josh’s Waluigi Pinball Chaos', desc: 'It’s fast. It’s loud. It’s click mayhem.', baseCost: 40000000000000000, cost: 40000000000000000, level: 0, type: 'ppc', amount: 750000000000000, maxLevel: 99 },
  { id: 'jason_bowsercastle', name: 'Jason’s Bowser Castle Brutality', desc: 'He doesn’t dodge Thwomps. They dodge him. Big passive gain.', baseCost: 200000000000000000, cost: 200000000000000000, level: 0, type: 'pps', amount: 3500000000000000, maxLevel: 99 },
  { id: 'imi_moo_meadows', name: 'Imi\'s Moo Moo Meadows Chill Lap', desc: 'Comfy track. Strong, clean sips. Big click bonuses.', baseCost: 1000000000000000000, cost: 1000000000000000000, level: 0, type: 'ppc', amount: 18000000000000000, maxLevel: 99 },
  { id: 'drake_koopa_cape', name: "Drake's Koopa Cape Teleport", desc: 'Shoots through the pipe like a rocket. Passive gains explode.', baseCost: 5000000000000000000, cost: 5000000000000000000, level: 0, type: 'pps', amount: 90000000000000000, maxLevel: 99 },
  { id: 'oscar_maple_treeway', name: 'Oscar’s Maple Treeway Jump', desc: 'Midair chug, clean landing, and strong click follow-through.', baseCost: 25000000000000000000, cost: 25000000000000000000, level: 0, type: 'ppc', amount: 450000000000000000, maxLevel: 99 },
  { id: 'tom_moonview', name: 'Tom’s Moonview Madness', desc: 'Weaving through traffic while drunk? Tom’s got it. Massive PPS.', baseCost: 100000000000000000000, cost: 100000000000000000000, level: 0, type: 'pps', amount: 2000000000000000000, maxLevel: 99 }
];

// Helper: get upgrade by id
function getUpgrade(id) {
  return window.upgrades.find(u => u.id === id);
}

// Helper: recalculate PPC
window.recalculatePointsPerClick = function() {
  let ppc = 1;
  // Sum all upgrades that affect PPC
  window.upgrades.filter(u => u.type === 'ppc').forEach(upg => {
    ppc += upg.level * upg.amount;
  });
  // Apply boosters
  window.upgrades.filter(u => u.type === 'boost' && u.targetId === 'ppc' && u.level > 0).forEach(boost => {
    ppc *= Math.pow(boost.amount, boost.level);
  });
  window.pointsPerClick = ppc;
};

// Helper: recalculate PPS
window.recalculatePointsPerSecond = function() {
  let pps = 0;
  // Sum all upgrades that affect PPS
  window.upgrades.filter(u => u.type === 'pps').forEach(upg => {
    let upgPps = upg.level * upg.amount;
    // Apply all boosters that target this upgrade's id or 'pps' in general
    window.upgrades.filter(b => b.type === 'boost' && (b.targetId === upg.id || b.targetId === 'pps') && b.level > 0).forEach(boost => {
      upgPps *= Math.pow(boost.amount, boost.level);
    });
    pps += upgPps;
  });
  window.pointsPerSecond = pps;
};

// Buy upgrade
window.buyUpgrade = function(id) {
  const upg = getUpgrade(id);
  if (!upg) return;
  // Default maxLevel to 99 if not set
  if (typeof upg.maxLevel !== 'number') upg.maxLevel = 99;
  if (window.points >= upg.cost) {
    if (upg.level >= upg.maxLevel) return;
    window.points -= upg.cost;
    upg.level++;
    if (upg.level >= upg.maxLevel) {
      upg.cost = Infinity;
    } else {
      upg.cost = Math.floor(upg.baseCost * Math.pow(1.5, upg.level));
    }
    window.recalculatePointsPerClick();
    window.recalculatePointsPerSecond();
    if (window.stats) window.stats.totalPointsEarned += 0; // for stats compatibility
    if (typeof saveGame === 'function') saveGame();
    window.renderUpgrades();
    if (document.getElementById('points')) document.getElementById('points').textContent = window.points;
  }
};

// Render upgrades shop
window.renderUpgrades = function() {
  const upgradesListEl = document.getElementById('upgrades-list');
  if (!upgradesListEl) return;
  
  // Use a flexbox grid for responsive horizontal layout
  const upgradesList = `
    <div style="display:flex;flex-wrap:wrap;gap:1em;justify-content:flex-start;">
      ${window.upgrades.map(upg => {
        const canBuy = window.points >= upg.cost;
        return `
          <div style="flex:1 1 220px;min-width:200px;max-width:260px;background:#222;padding:1em;border-radius:8px;box-shadow:0 2px 8px #0002;display:flex;flex-direction:column;align-items:flex-start;">
            <strong>${upg.name}</strong> <span style='font-size:0.9em;'>(Level: ${window.formatNumber(upg.level)})</span><br>
            <small>${upg.desc}</small><br>
            <button onclick="buyUpgrade('${upg.id}')" style="margin-top:0.5em;background:${canBuy ? '#3498db' : '#888'};color:white;width:100%;padding:0.5em 0;border:none;border-radius:4px;font-size:1em;cursor:${canBuy ? 'pointer' : 'not-allowed'};" ${canBuy ? '' : 'disabled'}>
              Buy (${window.formatNumber(upg.cost)} points)
            </button>
          </div>
        `;
      }).join('')}
    </div>
  `;
  
  const ppc = typeof window.pointsPerClick === 'number' ? window.pointsPerClick : 1;
  const pps = typeof window.pointsPerSecond === 'number' ? window.pointsPerSecond : 0;
  
  upgradesListEl.innerHTML = `
    <p class="points-row"><span>Points:</span> <span id="points">${window.formatNumber(window.points)}</span></p>
    <p class="ppc-row"><span>PPC:</span> <span id="ppc">${window.formatNumber(ppc)}</span></p>
    <p class="pps-row"><span>PPS:</span> <span id="pps">${window.formatNumber(pps)}</span></p>
    <img src="img/clicker.png" alt="Clicker" id="clicker-img" style="cursor:pointer;max-width:200px;" onclick="increment()">
    <br><br>
    ${upgradesList}
  `;
};

// Make renderUpgrades globally accessible
window.renderUpgrades = renderUpgrades;

// Points per second system
setInterval(() => {
  if (typeof window.recalculatePointsPerSecond === 'function') window.recalculatePointsPerSecond();
  const pps = window.pointsPerSecond || 0;
  if (pps > 0) {
    window.points += pps;
    if (window.stats) window.stats.totalPointsEarned += pps;
    if (document.getElementById('points')) document.getElementById('points').textContent = window.points.toLocaleString();
    if (typeof saveGame === 'function') saveGame();
  }
}, 1000);

// Click logic (image click)
const originalIncrement = window.increment;
window.increment = function() {
  const amount = window.pointsPerClick || 1;
  window.points += amount;
  if (window.stats) {
    window.stats.totalClicks++;
    window.stats.totalPointsEarned += amount;
  }
  if (document.getElementById('points')) document.getElementById('points').textContent = window.points.toLocaleString();
  if (typeof saveGame === 'function') saveGame();
  if (typeof originalIncrement === 'function') originalIncrement();
};

// Periodically refresh upgrades UI to keep button states correct
setInterval(() => {
  if (typeof window.renderUpgrades === 'function') window.renderUpgrades();
}, 500);
