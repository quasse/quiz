var timerEl = document.getElementById("timer");
var startButton = document.getElementById("start-quiz");
var quizContent = document.getElementById("quiz");

//Array of question objects
var questionsArr = [
  {
    question:
      "What data type in Javascript can hold multiple values as a list?",
    answers: ["integer", "string", "array"],
    correct: "array",
  },
  {
    question: "A boolean is a variable that is either true of false",
    answers: ["true", "false"],
    correct: "true",
  },
];

// Counter to keep track of questions asked
var quizCounter = 0;

var score = 0;

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
      // TODO: Add function to display out of time message
      clearInterval(timeInterval);
    }
  }, 1000);
};

// Handles the quiz questions
var quizHandler = function () {
  timer();
  addQuestion();
};

//Function to add question to page
var addQuestion = function () {
  var questionEl = document.createElement("div");

  questionEl.className = "questions";

  var questionObject = questionsArr[quizCounter];

  questionEl.innerHTML = "<h2>" + questionObject.question + "</h2>";

  for (var i = 0; i < questionObject.answers.length; i++) {
    var option = document.createElement("button");
    option.className = "btn";
    option.textContent = questionObject.answers[i];
    questionEl.append(option);
  }
  var container = document.getElementById("container");

  //Need to fix this where it does not advance to the next question
  quizContent.replaceChild(questionEl, container);
};

// Determines if answer is correct or incorrect
var answerHandler = function (event) {
  var targetEl = event.target.textContent;
  var rightAnswer = questionsArr[quizCounter].correct;

  if (targetEl === rightAnswer) {
    correctHandler();
    // check to make sure button check is not the start quiz button
  } else if (targetEl !== "Start Quiz") {
    wrongHandler();
  }
};

var correctHandler = function () {
  quizCounter++;
  score++;
  addQuestion();
};

var wrongHandler = function () {
  quizCounter++;
  addQuestion();
};

startButton.addEventListener("click", quizHandler);
quizContent.addEventListener("click", answerHandler);
