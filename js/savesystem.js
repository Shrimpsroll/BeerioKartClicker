// Save/load stub
async function hashSaveData(data) {
  const encoder = new TextEncoder();
  const dataStr = JSON.stringify(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(dataStr));
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function saveGame() {
  // Prevent saving if window.disableSaving is true
  if (window.disableSaving) return;
  const data = {
    points: window.points,
    upgrades: window.upgrades.map(u => ({
      id: u.id,
      level: u.level,
      cost: u.cost
    })),
    prestige: window.prestige,
    prestigeUpgrades: window.prestigeUpgrades,
    stats: window.stats,
    bank: window.bank,
    hasCheated: window.hasCheated || false
  };
  data.hash = await hashSaveData(data);
  localStorage.setItem('gameSave', JSON.stringify(data));
}

async function loadGame() {
  let saveRaw = localStorage.getItem('gameSave');
  if (!saveRaw) return;
  let save;
  try {
    save = JSON.parse(saveRaw);
  } catch {
    // Invalid/corrupt save, do not load
    return;
  }
  if (save && save.hash) {
    const hash = save.hash;
    delete save.hash;
    const validHash = await hashSaveData(save);
    if (hash !== validHash) {
      window.hasCheated = true;
      // Optionally, you can still load the save, or you can return here to refuse loading.
      // return;
    }
    if (typeof save.points === 'number') window.points = save.points;
    // If window.upgrades is not initialized, assign from save
    if (Array.isArray(save.upgrades)) {
      if (!Array.isArray(window.upgrades) || window.upgrades.length === 0) {
        window.upgrades = save.upgrades.map(u => ({ ...u }));
      } else {
        save.upgrades.forEach(savedUpg => {
          const upg = window.upgrades.find(u => u.id === savedUpg.id);
          if (upg) {
            upg.level = savedUpg.level;
            upg.cost = savedUpg.cost;
          }
        });
      }
    }
    if (save.prestige) window.prestige = save.prestige;
    if (Array.isArray(save.prestigeUpgrades)) window.prestigeUpgrades = save.prestigeUpgrades;
    if (save.stats) window.stats = save.stats;
    if (save.bank) window.bank = save.bank;
    // Only set hasCheated to true if the save hasCheated is true; never set to false
    if (save.hasCheated === true) window.hasCheated = true;
  }
  // Recalculate derived variables after loading
  if (typeof window.recalculatePointsPerClick === 'function') window.recalculatePointsPerClick();
  if (typeof window.recalculatePointsPerSecond === 'function') window.recalculatePointsPerSecond();
  if (typeof window.renderUpgrades === 'function') window.renderUpgrades();
  if (typeof window.renderPrestige === 'function') window.renderPrestige();
}

// On load
window.onload = async function() {
  await loadGame();
  showTab('game');
};