// Call this to trigger a random event
window.triggerRandomEvent = function() {
  // Define possible events
  const events = [
    {
      img: "img/event-lose.png",
      message: "Oh no! You lost all your points!",
      action: function(popup, closePopup) {
        window.points = 0;
        if (document.getElementById('points')) document.getElementById('points').textContent = window.points;
        if (typeof saveGame === 'function') saveGame();
        popup.querySelector('#event-ok-btn').disabled = false;
        setTimeout(closePopup, 5000); // Auto-close after 5 seconds
      }
    },
    {
      img: "img/event-bank-lose.png.png",
      message: "Disaster! You lost half your bank balance!",
      action: function(popup, closePopup) {
        window.bank.balance = window.bank.balance / 2;
        if (document.getElementById('bank-balance')) document.getElementById('bank-balance').textContent = window.bank.balance;
        if (typeof saveGame === 'function') saveGame();
        popup.querySelector('#event-ok-btn').disabled = false;
        setTimeout(closePopup, 5000); // Auto-close after 5 seconds
      }
    },
    {
      img: "img/event-math.png",
      message: "Answer this multiplication question correctly to win bonus points! If you fail, you lose all your points.",
      action: function(popup, closePopup) {
        // Much harder: 3-digit × 3-digit
        const a = Math.floor(Math.random() * 900) + 100;
        const b = Math.floor(Math.random() * 900) + 100;
        const answer = a * b;
        popup.querySelector('#event-extra').innerHTML = `
          <p><b>What is ${a} × ${b}?</b></p>
          <input type="number" id="math-answer" style="font-size:1.2em;width:120px;">
          <button id="submit-math-answer">Submit</button>
          <div id="math-feedback" style="margin-top:10px;"></div>
          <div id="math-timer" style="margin-top:10px;font-weight:bold;"></div>
        `;
        popup.querySelector('#event-ok-btn').style.display = 'none';

        // --- Tab penalty logic ONLY for math event ---
        let popupTabPenaltyActive = true;
        function popupTabPenaltyListener() {
          if (popupTabPenaltyActive && document.hidden) {
            window.points = window.points * -1;
            if (document.getElementById('points')) document.getElementById('points').textContent = window.points;
            if (typeof saveGame === 'function') saveGame();
            alert("You changed tabs during the math event! Your points are now negative.");
            localClosePopup();
          }
        }
        document.addEventListener('visibilitychange', popupTabPenaltyListener);

        // Timer logic
        let timeLeft = 10;
        const timerDiv = popup.querySelector('#math-timer');
        timerDiv.textContent = `Time left: ${timeLeft} seconds`;
        const timerInterval = setInterval(() => {
          timeLeft--;
          timerDiv.textContent = `Time left: ${timeLeft} seconds`;
          if (timeLeft <= 0) {
            clearInterval(timerInterval);
            if (popupTabPenaltyActive) {
              window.points = 0;
              if (document.getElementById('points')) document.getElementById('points').textContent = window.points;
              if (typeof saveGame === 'function') saveGame();
              timerDiv.textContent = "Time's up! You lost all your points.";
              setTimeout(localClosePopup, 1500);
            }
          }
        }, 1000);

        function localClosePopup() {
          popup.remove();
          popupTabPenaltyActive = false;
          document.removeEventListener('visibilitychange', popupTabPenaltyListener);
          clearInterval(timerInterval);
        }

        popup.querySelector('#submit-math-answer').onclick = function() {
          if (!popupTabPenaltyActive) return;
          const userAnswer = parseInt(popup.querySelector('#math-answer').value, 10);
          const feedback = popup.querySelector('#math-feedback');
          clearInterval(timerInterval);
          if (userAnswer === answer) {
            const bonus = Math.floor(window.points * 0.5); // 50% bonus for hard question
            window.points += bonus;
            feedback.textContent = `Correct! You gained ${bonus} points.`;
          } else {
            window.points = 0;
            feedback.textContent = `Wrong! You lost all your points.`;
          }
          if (document.getElementById('points')) document.getElementById('points').textContent = window.points;
          if (typeof saveGame === 'function') saveGame();
          setTimeout(localClosePopup, 1500);
        };
      }
    }
  ];

  // Pick a random event
  const event = events[Math.floor(Math.random() * events.length)];

  // Create event popup
  const popup = document.createElement("div");
  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.background = "#fff";
  popup.style.border = "2px solid #333";
  popup.style.padding = "20px";
  popup.style.zIndex = 9999;
  popup.style.textAlign = "center";
  popup.style.color = "#23283a";
  popup.innerHTML = `
    <img src="${event.img}" alt="Event" style="max-width:350px; width:100%;"><br>
    <p>${event.message}</p>
    <div id="event-extra"></div>
    <button id="event-ok-btn">OK</button>
  `;
  document.body.appendChild(popup);

  // By default, disable OK button until event is resolved
  popup.querySelector('#event-ok-btn').disabled = true;

  function closePopup() {
    popup.remove();
  }

  // Run the event action, passing the popup and closePopup function
  event.action(popup, closePopup);

  // OK button closes the popup (for non-math events)
  popup.querySelector('#event-ok-btn').onclick = closePopup;
};


setInterval(() => {
  if (Math.random() < 0.1) { // 10% chance every interval
    window.triggerRandomEvent();
  }
}, 60000); // 2 minutes (120,000 ms)