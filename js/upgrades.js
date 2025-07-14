// === Simple Upgrade Shop System ===

// Upgrade definitions: just add to this array to expand!
window.upgrades = window.upgrades || [
  { id: 'mat', name: "Mat's Turbo Slurper", desc: 'Increases points per click by 1.', baseCost: 40, cost: 40, level: 0, type: 'ppc', amount: 2, maxLevel: 99 },
  { id: 'eve', name: "Eve's Shortcut Strat", desc: 'Eve discovers a sneaky Beerio Kart shortcut.', baseCost: 120, cost: 120, level: 0, type: 'pps', amount: 2, maxLevel: 99 },
  { id: 'imi', name: "Imi's “One More” Round", desc: 'Each click hits harder as Imi keeps drinking.', baseCost: 400, cost: 400, level: 0, type: 'ppc', amount: 2, maxLevel: 99 },
  { id: 'josh', name: "Josh's YOLO Boost", desc: 'Josh goes full send, increasing your passive gains.', baseCost: 960, cost: 960, level: 0, type: 'pps', amount: 6, maxLevel: 99 },
  { id: 'jason', name: "Jason's Jug Juggernaut", desc: 'Jug sizes increase click impact.', baseCost: 1920, cost: 1920, level: 0, type: 'ppc', amount: 4, maxLevel: 99 },
  { id: 'noah', name: "Noah's Drunk Drift", desc: 'Smooth drifting improves passive generation.', baseCost: 3200, cost: 3200, level: 0, type: 'pps', amount: 12, maxLevel: 99 },
  { id: 'oscar', name: "Oscar's Beer Battery", desc: 'Oscar harnesses beer power for background gains.', baseCost: 5600, cost: 5600, level: 0, type: 'pps', amount: 16, maxLevel: 99 },
  { id: 'spike', name: "Spike's Shotgun Technique", desc: 'Unleash the beast. Big click gains.', baseCost: 9600, cost: 9600, level: 0, type: 'ppc', amount: 8, maxLevel: 99 },
  { id: 'tom', name: "Tom's Time Warp", desc: 'Time bends to your will. Boosts Noah\'s output.', baseCost: 19200, cost: 19200, level: 0, type: 'boost', targetId: 'noah', amount: 2, maxLevel: 2 },
  { id: 'mat_hydration', name: "Mat's Hydration Hack", desc: 'Mat figures out how to never get hungover. Clicking is more efficient.', baseCost: 28800, cost: 28800, level: 0, type: 'ppc', amount: 10, maxLevel: 99 },
  { id: 'josh_pissbreak', name: "Josh's Piss Break Efficiency", desc: 'He pees in record time and never loses speed. Faster PPS.', baseCost: 35200, cost: 35200, level: 0, type: 'pps', amount: 30, maxLevel: 99 },
  { id: 'imi_infinitybeer', name: "Imi's Infinite Beer Glitch", desc: 'Somehow the can never empties. Clicking is endless joy.', baseCost: 41600, cost: 41600, level: 0, type: 'ppc', amount: 14, maxLevel: 99 },
  { id: 'tom_laptime', name: "Tom's 12 Second Lap", desc: 'Physics-defying Beerio Kart tactics. Massive passive boost.', baseCost: 51200, cost: 51200, level: 0, type: 'pps', amount: 42, maxLevel: 99 },
  { id: 'spike_bottlepop', name: "Spike's Perfect Pop", desc: 'Every bottle opened with precision. Boosts Spike\'s output.', baseCost: 64000, cost: 64000, level: 0, type: 'boost', targetId: 'spike', amount: 2, maxLevel: 2 },
  { id: 'noah_blinddrive', name: "Noah's Blindfold Drive", desc: 'He doesn\'t even need to look anymore. Insane passive gains.', baseCost: 72000, cost: 72000, level: 0, type: 'pps', amount: 48, maxLevel: 99 },
  { id: 'jason_kegmaster', name: "Jason's Keg Mastery", desc: 'Can carry two kegs at once. Clicks are brutal.', baseCost: 80000, cost: 80000, level: 0, type: 'ppc', amount: 20, maxLevel: 99 },
  { id: 'oscar_powerboost', name: "Oscar's Dual Cell Battery", desc: 'Boosts Oscar\'s Beer Battery power.', baseCost: 88000, cost: 88000, level: 0, type: 'boost', targetId: 'oscar', amount: 2, maxLevel: 2 },
  { id: 'eve_crashskip', name: "Eve's Crash Skip Glitch", desc: 'Skips crash animations. Huge passive boost.', baseCost: 96000, cost: 96000, level: 0, type: 'pps', amount: 54, maxLevel: 99 },
  { id: 'mat_ultimateslurper', name: "Mat's Ultimate Slurper", desc: 'His final form. Clicks are ridiculous.', baseCost: 104000, cost: 104000, level: 0, type: 'ppc', amount: 22, maxLevel: 99 },
  { id: 'grumble_volcano', name: 'Grumble Volcano Drift Zone', desc: 'The track is falling apart, but your reflexes aren’t. Huge PPS from risky plays.', baseCost: 112000, cost: 112000, level: 0, type: 'pps', amount: 60, maxLevel: 99 },
  { id: 'rainbow_road_wii', name: 'Rainbow Road (Wii Physics)', desc: 'You fall off 11 times but still somehow win. Insane click boost.', baseCost: 120000, cost: 120000, level: 0, type: 'ppc', amount: 26, maxLevel: 99 },
  { id: 'noah_coconutmall', name: 'Noah at Coconut Mall', desc: 'Shopping, drifting, chugging. Noah’s passive generation skyrockets.', baseCost: 128000, cost: 128000, level: 0, type: 'pps', amount: 66, maxLevel: 99 },
  { id: 'mat_marioscircuit', name: 'Mat’s Mario Circuit Dominance', desc: 'Absolute control of the kart and the cup. Clicks are clean and fast.', baseCost: 136000, cost: 136000, level: 0, type: 'ppc', amount: 28, maxLevel: 99 },
  { id: 'spike_dksummit', name: 'Spike’s DK Summit Snowbomb', desc: 'Double flips into double beers. Solid passive snowball.', baseCost: 144000, cost: 144000, level: 0, type: 'pps', amount: 72, maxLevel: 99 },
  { id: 'josh_waluigipinball', name: 'Josh’s Waluigi Pinball Chaos', desc: 'It’s fast. It’s loud. It’s click mayhem.', baseCost: 152000, cost: 152000, level: 0, type: 'ppc', amount: 30, maxLevel: 99 },
  { id: 'jason_bowsercastle', name: 'Jason’s Bowser Castle Brutality', desc: 'He doesn’t dodge Thwomps. They dodge him. Big passive gain.', baseCost: 160000, cost: 160000, level: 0, type: 'pps', amount: 78, maxLevel: 99 },
  { id: 'imi_moo_meadows', name: 'Imi’s Moo Moo Meadows Chill Lap', desc: 'Comfy track. Strong, clean sips. Big click bonuses.', baseCost: 168000, cost: 168000, level: 0, type: 'ppc', amount: 32, maxLevel: 99 },
  { id: 'eve_koopa_cape', name: 'Eve’s Koopa Cape Teleport', desc: 'Shoots through the pipe like a rocket. Passive gains explode.', baseCost: 176000, cost: 176000, level: 0, type: 'pps', amount: 84, maxLevel: 99 },
  { id: 'oscar_maple_treeway', name: 'Oscar’s Maple Treeway Jump', desc: 'Midair chug, clean landing, and strong click follow-through.', baseCost: 184000, cost: 184000, level: 0, type: 'ppc', amount: 36, maxLevel: 99 },
  { id: 'tom_moonview', name: 'Tom’s Moonview Madness', desc: 'Weaving through traffic while drunk? Tom’s got it. Massive PPS.', baseCost: 192000, cost: 192000, level: 0, type: 'pps', amount: 90, maxLevel: 99 }
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
            <strong>${upg.name}</strong> <span style='font-size:0.9em;'>(Level: ${upg.level.toLocaleString()})</span><br>
            <small>${upg.desc}</small><br>
            <button onclick="buyUpgrade('${upg.id}')" style="margin-top:0.5em;background:${canBuy ? '#3498db' : '#888'};color:white;width:100%;padding:0.5em 0;border:none;border-radius:4px;font-size:1em;cursor:${canBuy ? 'pointer' : 'not-allowed'};" ${canBuy ? '' : 'disabled'}>
              Buy (${upg.cost.toLocaleString()} points)
            </button>
          </div>
        `;
      }).join('')}
    </div>
  `;
  const ppc = typeof window.pointsPerClick === 'number' ? window.pointsPerClick : 1;
  const pps = typeof window.pointsPerSecond === 'number' ? window.pointsPerSecond : 0;
  upgradesListEl.innerHTML = `
    <p class="points-row"><span>Points:</span> <span id="points">${window.points.toLocaleString()}</span></p>
    <p class="ppc-row"><span>PPC:</span> <span id="ppc">${ppc.toLocaleString()}</span></p>
    <p class="pps-row"><span>PPS:</span> <span id="pps">${pps.toLocaleString()}</span></p>
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
