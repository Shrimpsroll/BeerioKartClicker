// Bank state
window.bank = window.bank || {
  balance: 0,
  interestRate: 0.02, // 2% per tick
  taxRate: 0.10, // 10% tax
};

// Deposit points into bank
window.depositToBank = function(amount) {
  amount = Math.floor(amount);
  if (window.points >= amount && amount > 0) {
    window.points -= amount;
    window.bank.balance += amount;
    if (document.getElementById('points')) document.getElementById('points').textContent = window.points;
    window.renderBank();
    if (typeof saveGame === 'function') saveGame();
  }
};

// Withdraw points from bank (with tax)
window.withdrawFromBank = function(amount) {
  amount = Math.floor(amount);
  if (window.bank.balance >= amount && amount > 0) {
    window.bank.balance -= amount;
    // Apply tax
    const taxedAmount = Math.floor(amount * (1 - window.bank.taxRate));
    window.points += taxedAmount;
    // Add to totalPointsEarned stat
    if (window.stats) window.stats.totalPointsEarned += taxedAmount;
    if (document.getElementById('points')) document.getElementById('points').textContent = window.points;
    window.renderBank();
    if (typeof saveGame === 'function') saveGame();
  }
};

// Interest tick (call every 10 seconds)
setInterval(function() {
  if (window.bank.balance > 0) {
    window.bank.balance += window.bank.balance * window.bank.interestRate;
    window.bank.balance = Math.floor(window.bank.balance);
    if (document.getElementById('bank-balance')) {
      document.getElementById('bank-balance').textContent = window.bank.balance;
    }
    if (typeof saveGame === 'function') saveGame();
  }
}, 10000);

// Render bank tab
window.renderBank = function() {
  document.getElementById('bank-content').innerHTML = `
    <h2>Bank</h2>
    <p>Bank Balance: <span id="bank-balance">${window.bank.balance}</span></p>
    <p>Interest Rate: ${(window.bank.interestRate * 100).toFixed(2)}% every 10 seconds</p>
    <p>Withdrawal Tax: ${(window.bank.taxRate * 100).toFixed(2)}%</p>
    <div>
      <input type="number" id="bank-amount" min="1" placeholder="Amount">
      <button onclick="depositToBank(parseInt(document.getElementById('bank-amount').value, 10))">Deposit</button>
      <button onclick="withdrawFromBank(parseInt(document.getElementById('bank-amount').value, 10))">Withdraw</button>
      <br><br>
      <button onclick="depositToBank(Math.floor(window.points/2))">Deposit Half</button>
      <button onclick="depositToBank(window.points)">Deposit All</button>
      <button onclick="withdrawFromBank(Math.floor(window.bank.balance/2))">Withdraw Half</button>
      <button onclick="withdrawFromBank(window.bank.balance)">Withdraw All</button>
    </div>
  `;
};