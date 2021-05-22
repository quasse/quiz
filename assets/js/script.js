var timerEl = document.getElementById("timer");
var startButton = document.getElementById("start-quiz");
var quizContent = document.getElementById("quiz");

// Function to keep track of the timer
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

var quizHandler = function () {
  var firstQuestionEl = document.createElement("div");

  firstQuestionEl.className = "questions";

  firstQuestionEl.innerHTML = "<h2> Please answer one or two.</h2>";

  var option1 = document.createElement("button");
  option1.className = "btn option1";
  option1.textContent = "Pick me";
  firstQuestionEl.appendChild(option1);

  var option2 = document.createElement("button");
  option2.textContent = "No pick me!";
  option2.className = "btn option2";
  firstQuestionEl.appendChild(option2);

  var container = document.getElementById("container");

  quizContent.replaceChild(firstQuestionEl, container);
  timer();
};

var answerHandler = function (event) {
  var targetEl = event.target;

  if (targetEl.matches(".option1")) {
    console.log("option 1");
  }

  if (targetEl.matches(".option2")) {
    console.log("option 2");
  }
};

startButton.addEventListener("click", quizHandler);
quizContent.addEventListener("click", answerHandler);
