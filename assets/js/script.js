var timerEl = document.getElementById("timer");
var startButton = document.getElementById("start-quiz");
var quizContent = document.getElementById("quiz");
var answerContent = document.getElementById("responses");

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

// Variable to keep track of how much time has passed
var time = 0;

// Variable for the countdown
var timeInterval;

// Function to keep track of the timer
var timer = function (timeLeft) {
  timeInterval = setInterval(function () {
    var countdown = timerEl;
    if (timeLeft >= 1) {
      countdown.textContent = "Time left: " + timeLeft;
      timeLeft--;
      time = timeLeft;
    } else {
      countdown.textContent = "Out of time";
      // TODO: Add function to display out of time message
      clearInterval(timeInterval);
    }
  }, 1000);
};

// Handles the quiz questions
var quizHandler = function () {
  time = timer(60);
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

  quizContent.innerHTML = "";

  quizContent.append(questionEl);
};

// Determines if answer is correct or incorrect
var answerHandler = function (event) {
  var targetEl = event.target.textContent;
  var rightAnswer = questionsArr[quizCounter].correct;
  var isRight = false;

  if (targetEl === rightAnswer) {
    score++;
    isRight = true;
    //TODO Add function to display message indicating right answer
  }

  if (targetEl !== "Start Quiz") {
    quizCounter++;
    if (targetEl !== rightAnswer) {
      clearInterval(timeInterval);
      timer(time - 10);
      // TODO: Add function to display message indicating wrong answer
    }
    answerMessage(isRight);
    //TODO: Change to less than 5
    if (quizCounter < 2) {
      addQuestion();
    } else {
      //TODO: Add end game function
      console.log(score);
    }
  }
};

var answerMessage = function (isRight) {
  var answerEl = document.createElement("div");
  answerEl.className = "answer";

  if (isRight) {
    answerEl.textContent = "You got question " + quizCounter + " correct!";
  } else {
    answerEl.textContent = "You got question " + quizCounter + " incorrect!";
  }

  answerContent.innerHTML = "";

  answerContent.append(answerEl);
};

startButton.addEventListener("click", quizHandler);
quizContent.addEventListener("click", answerHandler);
