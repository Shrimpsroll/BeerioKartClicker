// === Simple Upgrade Shop System ===

// Upgrade definitions: just add to this array to expand!
window.upgrades = window.upgrades || [
  {
    id: 'mat',
    name: 'Mat\'s Turbo Slurper',
    desc: 'Increases points per click by 1.',
    baseCost: 25,
    cost: 25,
    level: 0,
    type: 'ppc',
    amount: 1 // no change, good for starter
  },
  {
    id: 'eve',
    name: 'Eve\'s Shortcut Strat',
    desc: 'Eve discovers a sneaky Beerio Kart shortcut.',
    baseCost: 75,
    cost: 75,
    level: 0,
    type: 'pps',
    amount: 2 // was 1, now 2 for early game boost
  },
  {
    id: 'imi',
    name: 'Imi\'s “One More” Round',
    desc: 'Each click hits harder as Imi keeps drinking.',
    baseCost: 250,
    cost: 250,
    level: 0,
    type: 'ppc',
    amount: 4 // was 6, now 4 for smoother scaling
  },
  {
    id: 'josh',
    name: 'Josh\'s YOLO Boost',
    desc: 'Josh goes full send, increasing your passive gains.',
    baseCost: 600,
    cost: 600,
    level: 0,
    type: 'pps',
    amount: 5 // was 8, now 5
  },
  {
    id: 'jason',
    name: 'Jason\'s Jug Juggernaut',
    desc: 'Jug sizes increase click impact.',
    baseCost: 1200,
    cost: 1200,
    level: 0,
    type: 'ppc',
    amount: 8 // was 10, now 8
  },
  {
    id: 'noah',
    name: 'Noah\'s Drunk Drift',
    desc: 'Smooth drifting improves passive generation.',
    baseCost: 2000,
    cost: 2000,
    level: 0,
    type: 'pps',
    amount: 10 // was 12, now 10
  },
  {
    id: 'oscar',
    name: 'Oscar\'s Beer Battery',
    desc: 'Oscar harnesses beer power for background gains.',
    baseCost: 3500,
    cost: 3500,
    level: 0,
    type: 'pps',
    amount: 14 // was 16, now 14
  },
  {
    id: 'spike',
    name: 'Spike\'s Shotgun Technique',
    desc: 'Unleash the beast. Big click gains.',
    baseCost: 6000,
    cost: 6000,
    level: 0,
    type: 'ppc',
    amount: 15 // was 20, now 15
  },
  {
    id: 'tom',
    name: 'Tom\'s Time Warp',
    desc: 'Time bends to your will. Doubles Noah\'s output.',
    baseCost: 12000,
    cost: 12000,
    level: 0,
    type: 'boost',
    targetId: 'noah',
    amount: 2 // booster, unchanged
  },
  {
    id: 'mat_hydration',
    name: 'Mat\'s Hydration Hack',
    desc: 'Mat figures out how to never get hungover. Clicking is more efficient.',
    baseCost: 18000,
    cost: 18000,
    level: 0,
    type: 'ppc',
    amount: 20 // was 30, now 20
  },
  {
    id: 'josh_pissbreak',
    name: 'Josh\'s Piss Break Efficiency',
    desc: 'He pees in record time and never loses speed. Faster PPS.',
    baseCost: 22000,
    cost: 22000,
    level: 0,
    type: 'pps',
    amount: 25 // was 35, now 25
  },
  {
    id: 'imi_infinitybeer',
    name: 'Imi\'s Infinite Beer Glitch',
    desc: 'Somehow the can never empties. Clicking is endless joy.',
    baseCost: 26000,
    cost: 26000,
    level: 0,
    type: 'ppc',
    amount: 28 // was 38, now 28
  },
  {
    id: 'tom_laptime',
    name: 'Tom\'s 12 Second Lap',
    desc: 'Physics-defying Beerio Kart tactics. Massive passive boost.',
    baseCost: 32000,
    cost: 32000,
    level: 0,
    type: 'pps',
    amount: 35 // was 48, now 35
  },
  {
    id: 'spike_bottlepop',
    name: 'Spike\'s Perfect Pop',
    desc: 'Every bottle opened with precision. Doubles Spike\'s output.',
    baseCost: 40000,
    cost: 40000,
    level: 0,
    type: 'boost',
    targetId: 'spike',
    amount: 2 // booster, unchanged
  },
  {
    id: 'noah_blinddrive',
    name: 'Noah\'s Blindfold Drive',
    desc: 'He doesn\'t even need to look anymore. Insane passive gains.',
    baseCost: 45000,
    cost: 45000,
    level: 0,
    type: 'pps',
    amount: 40 // was 55, now 40
  },
  {
    id: 'jason_kegmaster',
    name: 'Jason\'s Keg Mastery',
    desc: 'Can carry two kegs at once. Clicks are brutal.',
    baseCost: 50000,
    cost: 50000,
    level: 0,
    type: 'ppc',
    amount: 40 // was 50, now 40
  },
  {
    id: 'oscar_powerboost',
    name: 'Oscar\'s Dual Cell Battery',
    desc: 'Doubles Oscar\'s Beer Battery power.',
    baseCost: 55000,
    cost: 55000,
    level: 0,
    type: 'boost',
    targetId: 'oscar',
    amount: 2 // booster, unchanged
  },
  {
    id: 'eve_crashskip',
    name: 'Eve\'s Crash Skip Glitch',
    desc: 'Skips crash animations. Huge passive boost.',
    baseCost: 60000,
    cost: 60000,
    level: 0,
    type: 'pps',
    amount: 45 // was 60, now 45
  },
  {
    id: 'mat_ultimateslurper',
    name: 'Mat\'s Ultimate Slurper',
    desc: 'His final form. Clicks are ridiculous.',
    baseCost: 65000,
    cost: 65000,
    level: 0,
    type: 'ppc',
    amount: 45 // was 55, now 45
  },
  {
    id: 'grumble_volcano',
    name: 'Grumble Volcano Drift Zone',
    desc: 'The track is falling apart, but your reflexes aren’t. Huge PPS from risky plays.',
    baseCost: 70000,
    cost: 70000,
    level: 0,
    type: 'pps',
    amount: 50 // was 65, now 50
  },
  {
    id: 'rainbow_road_wii',
    name: 'Rainbow Road (Wii Physics)',
    desc: 'You fall off 11 times but still somehow win. Insane click boost.',
    baseCost: 75000,
    cost: 75000,
    level: 0,
    type: 'ppc',
    amount: 50 // was 60, now 50
  },
  {
    id: 'noah_coconutmall',
    name: 'Noah at Coconut Mall',
    desc: 'Shopping, drifting, chugging. Noah’s passive generation skyrockets.',
    baseCost: 80000,
    cost: 80000,
    level: 0,
    type: 'pps',
    amount: 55 // was 70, now 55
  },
  {
    id: 'mat_marioscircuit',
    name: 'Mat’s Mario Circuit Dominance',
    desc: 'Absolute control of the kart and the cup. Clicks are clean and fast.',
    baseCost: 85000,
    cost: 85000,
    level: 0,
    type: 'ppc',
    amount: 55 // was 65, now 55
  },
  {
    id: 'spike_dksummit',
    name: 'Spike’s DK Summit Snowbomb',
    desc: 'Double flips into double beers. Solid passive snowball.',
    baseCost: 90000,
    cost: 90000,
    level: 0,
    type: 'pps',
    amount: 60 // was 75, now 60
  },
  {
    id: 'josh_waluigipinball',
    name: 'Josh’s Waluigi Pinball Chaos',
    desc: 'It’s fast. It’s loud. It’s click mayhem.',
    baseCost: 95000,
    cost: 95000,
    level: 0,
    type: 'ppc',
    amount: 60 // was 70, now 60
  },
  {
    id: 'jason_bowsercastle',
    name: 'Jason’s Bowser Castle Brutality',
    desc: 'He doesn’t dodge Thwomps. They dodge him. Big passive gain.',
    baseCost: 100000,
    cost: 100000,
    level: 0,
    type: 'pps',
    amount: 65 // was 80, now 65
  },
  {
    id: 'imi_moo_meadows',
    name: 'Imi’s Moo Moo Meadows Chill Lap',
    desc: 'Comfy track. Strong, clean sips. Big click bonuses.',
    baseCost: 105000,
    cost: 105000,
    level: 0,
    type: 'ppc',
    amount: 65 // was 75, now 65
  },
  {
    id: 'eve_koopa_cape',
    name: 'Eve’s Koopa Cape Teleport',
    desc: 'Shoots through the pipe like a rocket. Passive gains explode.',
    baseCost: 110000,
    cost: 110000,
    level: 0,
    type: 'pps',
    amount: 70 // was 85, now 70
  },
  {
    id: 'oscar_maple_treeway',
    name: 'Oscar’s Maple Treeway Jump',
    desc: 'Midair chug, clean landing, and strong click follow-through.',
    baseCost: 115000,
    cost: 115000,
    level: 0,
    type: 'ppc',
    amount: 70 // was 80, now 70
  },
  {
    id: 'tom_moonview',
    name: 'Tom’s Moonview Madness',
    desc: 'Weaving through traffic while drunk? Tom’s got it. Massive PPS.',
    baseCost: 120000,
    cost: 120000,
    level: 0,
    type: 'pps',
    amount: 75 // was 95, now 75
  }
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
  if (window.points >= upg.cost) {
    window.points -= upg.cost;
    upg.level++;
    upg.cost = Math.floor(upg.baseCost * Math.pow(1.5, upg.level));
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
  upgradesListEl.innerHTML = `
    <p class="points-row"><span>Points:</span> <span id="points">${window.points.toLocaleString()}</span></p>
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
