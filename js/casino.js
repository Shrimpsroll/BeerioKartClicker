window.renderCasino = function() {
  document.getElementById('casino-content').innerHTML = `
    <h2>Casino</h2>
    <div style="margin-bottom:30px;">
      <h3>Slot Machine</h3>
      <div id="slot-result" style="font-size:2em; margin:10px 0;">🎰</div>
      <input type="number" id="slot-bet" min="1" placeholder="Bet Amount" style="width:100px;">
      <button id="slot-spin-btn">Spin</button>
      <div id="slot-message"></div>
    </div>
    <hr>
    <div>
      <h3>Coin Flip</h3>
      <input type="number" id="coin-bet" min="1" placeholder="Bet Amount" style="width:100px;">
      <select id="coin-choice">
        <option value="heads">Heads</option>
        <option value="tails">Tails</option>
      </select>
      <button id="coin-flip-btn">Flip</button>
      <div id="coin-result"></div>
    </div>
  `;

  // Set default bet amounts to half of current points (rounded down, min 1)
  const defaultBet = Math.max(1, Math.floor(window.points / 2));
  document.getElementById('slot-bet').value = defaultBet;
  document.getElementById('coin-bet').value = defaultBet;

  // --- Rigging variables for slot machine ---
  let jackpotChance = 0.01;
  let smallWinChance = 0.09;

  // Check for prestige upgrade
  if (window.prestigeUpgrades && window.prestigeUpgrades.find && window.prestigeUpgrades.find(u => u.id === "betterSlots" && u.bought)) {
    const bonus = window.prestigeUpgrades.find(u => u.id === "betterSlots").effect();
    jackpotChance += bonus;
    smallWinChance += bonus;
  }
  const SLOT_JACKPOT_CHANCE = jackpotChance;
  const SLOT_SMALLWIN_CHANCE = smallWinChance;

  // Slot Machine Logic
  document.getElementById('slot-spin-btn').onclick = function() {
    const bet = parseInt(document.getElementById('slot-bet').value, 10);
    if (!bet || bet <= 0) {
      document.getElementById('slot-message').textContent = "Enter a valid bet.";
      return;
    }
    if (window.points < bet) {
      document.getElementById('slot-message').textContent = "Not enough points!";
      return;
    }
    window.points -= bet;
    if (document.getElementById('points')) document.getElementById('points').textContent = window.points;

    const symbols = ["🍒", "🍋", "🔔", "⭐", "7️⃣"];
    let reels;
    let payout = 0;

    // Rigged odds using variables
    const roll = Math.random();
    if (roll < SLOT_JACKPOT_CHANCE) {
      // Jackpot (all three match)
      const sym = symbols[Math.floor(Math.random() * symbols.length)];
      reels = [sym, sym, sym];
      payout = bet * 10;
      document.getElementById('slot-message').textContent = "JACKPOT! You win " + payout + " points!";
    } else if (roll < SLOT_JACKPOT_CHANCE + SLOT_SMALLWIN_CHANCE) {
      // Small win (two match)
      const sym1 = symbols[Math.floor(Math.random() * symbols.length)];
      const sym2 = symbols[Math.floor(Math.random() * symbols.length)];
      reels = [sym1, sym1, sym2];
      payout = bet * 2;
      document.getElementById('slot-message').textContent = "Nice! You win " + payout + " points!";
    } else {
      // No win (all different)
      let s1 = symbols[Math.floor(Math.random() * symbols.length)];
      let s2, s3;
      do { s2 = symbols[Math.floor(Math.random() * symbols.length)]; } while (s2 === s1);
      do { s3 = symbols[Math.floor(Math.random() * symbols.length)]; } while (s3 === s1 || s3 === s2);
      reels = [s1, s2, s3];
      document.getElementById('slot-message').textContent = "No win. Try again!";
    }

    document.getElementById('slot-result').textContent = reels.join(" ");
    window.points += payout;
    if (document.getElementById('points')) document.getElementById('points').textContent = window.points;
    if (typeof saveGame === 'function') saveGame();
  };

  // Coin Flip Logic
  document.getElementById('coin-flip-btn').onclick = function() {
    const bet = parseInt(document.getElementById('coin-bet').value, 10);
    const choice = document.getElementById('coin-choice').value;
    if (!bet || bet <= 0) {
      document.getElementById('coin-result').textContent = "Enter a valid bet.";
      return;
    }
    if (window.points < bet) {
      document.getElementById('coin-result').textContent = "Not enough points!";
      return;
    }
    window.points -= bet;
    if (document.getElementById('points')) document.getElementById('points').textContent = window.points;

    const flip = Math.random() < 0.5 ? "heads" : "tails";
    if (flip === choice) {
      const payout = bet * 2;
      window.points += payout;
      document.getElementById('coin-result').textContent = `It's ${flip}! You win ${payout} points!`;
    } else {
      document.getElementById('coin-result').textContent = `It's ${flip}. You lost!`;
    }
    if (document.getElementById('points')) document.getElementById('points').textContent = window.points;
    if (typeof saveGame === 'function') saveGame();
  };
};