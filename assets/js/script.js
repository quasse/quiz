var timerEl = document.getElementById("timer");
var startButton = document.getElementById("start-quiz");

var timer = function () {
  var timeLeft = 60;
  var timeInterval = setInterval(function () {
    var countdown = timerEl;
    if (timeLeft >= 1) {
      countdown.textContent = "Time left: " + timeLeft;
      timeLeft--;
    } else {
      countdown.textContent = "Out of time";
      clearInterval(timeInterval);
    }
  }, 1000);
};

var displayMessage = function () {
  timerEl.append("Hello");
};

startButton.addEventListener("click", timer);
