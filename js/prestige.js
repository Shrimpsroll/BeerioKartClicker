window.prestige = {
  points: 0,
  threshold: 1_000_000, // Start at 1 million
};

// Prestige upgrade definitions
window.prestigeUpgrades = [
  {
    id: "betterSlots",
    name: "Slot Machine Savant",
    description: "Your luck is legendary. Slot machine win rates are boosted by 5%.",
    cost: 3,
    bought: false,
    effect: function() {
      return this.bought ? 0.05 : 0; // +5% win rate if bought
    }
  },
  {
    id: "clickPower",
    name: "Golden Finger",
    description: "Each prestige point increases your click power by 10%.",
    cost: 5,
    bought: false,
    effect: function() {
      return this.bought ? (window.prestige?.points || 0) * 0.10 : 0;
    }
  },
  {
    id: "ppsPower",
    name: "Time Lord",
    description: "Each prestige point increases your points per second by 10%.",
    cost: 7,
    bought: false,
    effect: function() {
      return this.bought ? (window.prestige?.points || 0) * 0.10 : 0;
    }
  },
  {
    id: "autoMat",
    name: "Mat's Auto-Slurper",
    description: "Mat's turbo slurping is now fully automated! Auto-buys Mat upgrades.",
    cost: 4,
    bought: false,
    autoTargets: ['mat'],
    effect: function() { return this.bought; }
  },
  {
    id: "autoEve",
    name: "Eve's Shortcut Bot",
    description: "Eve's AI finds every shortcut. Auto-buys Eve upgrades.",
    cost: 4,
    bought: false,
    autoTargets: ['eve'],
    effect: function() { return this.bought; }
  },
  {
    id: "autoImi",
    name: "Imi's Infinite Clicker",
    description: "Imi's thirst never ends. Auto-buys Imi upgrades.",
    cost: 4,
    bought: false,
    autoTargets: ['imi'],
    effect: function() { return this.bought; }
  },
  {
    id: "autoJosh",
    name: "Josh's YOLO Macro",
    description: "Josh goes full send, even when you're AFK. Auto-buys Josh upgrades.",
    cost: 4,
    bought: false,
    autoTargets: ['josh'],
    effect: function() { return this.bought; }
  },
  {
    id: "autoJason",
    name: "Jason's Juggernaut Routine",
    description: "Jug upgrades are now on autopilot. Auto-buys Jason upgrades.",
    cost: 4,
    bought: false,
    autoTargets: ['jason'],
    effect: function() { return this.bought; }
  },
  {
    id: "autoNoah",
    name: "Noah's Driftbot",
    description: "Noah's smooth moves are now automatic. Auto-buys Noah upgrades.",
    cost: 4,
    bought: false,
    autoTargets: ['noah'],
    effect: function() { return this.bought; }
  },
  {
    id: "autoOscar",
    name: "Oscar's Battery Backup",
    description: "Oscar's beer battery never runs out. Auto-buys Oscar upgrades.",
    cost: 4,
    bought: false,
    autoTargets: ['oscar'],
    effect: function() { return this.bought; }
  },
  {
    id: "autoSpike",
    name: "Spike's Shotgun Script",
    description: "Spike's beast mode is now always on. Auto-buys Spike upgrades.",
    cost: 4,
    bought: false,
    autoTargets: ['spike'],
    effect: function() { return this.bought; }
  },
  {
    id: "autoTom",
    name: "Tom's Timekeeper",
    description: "Tom bends time for you. Auto-buys Tom upgrades.",
    cost: 4,
    bought: false,
    autoTargets: ['tom'],
    effect: function() { return this.bought; }
  }
];

window.renderPrestige = function() {
  const prestigeContentEl = document.getElementById('prestige-content');
  if (!prestigeContentEl) return; // Prevent error if not on prestige tab
  const canPrestige = points >= (window.prestige?.threshold ?? 1_000_000);
  const threshold = window.prestige?.threshold ?? 1_000_000;
  const prestigePoints = window.prestige?.points ?? 0;
  const ppc = typeof window.pointsPerClick === 'number' ? window.pointsPerClick : 1;
  const pps = typeof window.pointsPerSecond === 'number' ? window.pointsPerSecond : 0;
  prestigeContentEl.innerHTML = `
    <div>
      <p class="points-row"><span>Points:</span> <span id="points">${points.toLocaleString()}</span></p>
      <p class="ppc-row"><span>PPC:</span> <span id="ppc">${ppc.toLocaleString()}</span></p>
      <p class="pps-row"><span>PPS:</span> <span id="pps">${pps.toLocaleString()}</span></p>
      <img src="img/clicker.png" alt="Clicker" id="clicker-img" style="cursor:pointer;max-width:200px;" onclick="increment()">
      <p>Prestige Points: <span id="prestige-points" class="prestige-counter">${prestigePoints}</span></p>
      <p>Reach ${threshold.toLocaleString()} points to prestige.</p>
      <button onclick="doPrestige()" ${canPrestige ? '' : 'disabled'}>Prestige!</button>
      <div id="prestige-upgrades"></div>
    </div>
  `;
  if (window.renderPrestigeUpgrades) window.renderPrestigeUpgrades();
};

window.renderPrestigeUpgrades = function() {
  if (!window.prestigeUpgrades.length) {
    document.getElementById('prestige-upgrades').innerHTML = "<i>No prestige upgrades available.</i>";
    return;
  }
  // Responsive flexbox grid for prestige upgrades
  const list = `
    <div style=\"display:flex;flex-wrap:wrap;gap:1em;justify-content:flex-start;\">
      ${window.prestigeUpgrades.map(upg => {
        let toggleBtn = '';
        if (upg.bought && Array.isArray(upg.autoTargets)) {
          if (typeof upg.enabled === 'undefined') upg.enabled = true;
          toggleBtn = `<button onclick=\"toggleAutoPrestige('${upg.id}')\" style=\"margin-top:0.5em;background:#8e44ad;color:white;width:100%;padding:0.5em 0;border:none;border-radius:4px;font-size:1em;\">Auto-Buy: ${upg.enabled ? 'ON' : 'OFF'}</button>`;
        }
        return `
          <div style=\"flex:1 1 220px;min-width:200px;max-width:260px;background:#222;padding:1em;border-radius:8px;box-shadow:0 2px 8px #0002;display:flex;flex-direction:column;align-items:flex-start;\">
            <strong>${upg.name}</strong> <span style='font-size:0.9em;'>${upg.bought ? '(Bought)' : ''}</span><br>
            <small>${upg.description}</small><br>
            <button onclick=\"buyPrestigeUpgrade('${upg.id}')\" style=\"margin-top:0.5em;background:${window.prestige.points < upg.cost || upg.bought ? '#888' : '#e67e22'};color:white;width:100%;padding:0.5em 0;border:none;border-radius:4px;font-size:1em;cursor:${window.prestige.points < upg.cost || upg.bought ? 'not-allowed' : 'pointer'};\" ${window.prestige.points < upg.cost || upg.bought ? 'disabled' : ''}>
              Buy (${upg.cost} prestige points)
            </button>
            ${toggleBtn}
          </div>
        `;
      }).join('')}
    </div>
  `;
  document.getElementById('prestige-upgrades').innerHTML = list;
};

window.toggleAutoPrestige = function(id) {
  const upg = window.prestigeUpgrades.find(u => u.id === id);
  if (upg && upg.bought) {
    upg.enabled = !upg.enabled;
    window.renderPrestige();
  }
};

window.buyPrestigeUpgrade = function(id) {
  const upg = window.prestigeUpgrades.find(u => u.id === id);
  if (window.prestige.points >= upg.cost && !upg.bought) {
    window.prestige.points -= upg.cost;
    upg.bought = true;
    saveGame();
    window.renderPrestige();
  }
};

window.doPrestige = function() {
  if (points >= window.prestige.threshold) {
    window.prestige.points += 1;
    points = 0;
    window.bank.balance = 0; // Reset bank balance
    // Reset upgrades safely
    if (window.upgrades && Array.isArray(window.upgrades)) {
      window.upgrades.forEach(u => {
        u.level = 0;
        u.cost = u.baseCost;
      });
    }
    // Increase threshold (e.g., double it)
    window.prestige.threshold = Math.floor(window.prestige.threshold * 1.5);
    saveGame();
    window.renderPrestige();
    if (window.renderUpgrades) window.renderUpgrades();
    if (window.render_game) window.render_game();
  }
};

// Auto-buy logic for prestige upgrades
setInterval(() => {
  (window.prestigeUpgrades || []).forEach(upg => {
    if (upg.bought && Array.isArray(upg.autoTargets) && (typeof upg.enabled === 'undefined' || upg.enabled)) {
      upg.autoTargets.forEach(targetId => {
        // Buy all upgrades with this id (not just the first found)
        const targets = window.upgrades && window.upgrades.filter(u => u.id === targetId);
        if (targets && targets.length) {
          targets.forEach(target => {
            if (window.points >= target.cost) {
              window.buyUpgrade(target.id);
            }
          });
        }
      });
    }
  });
}, 1000);
