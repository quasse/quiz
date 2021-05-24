var timerEl = document.getElementById("timer");
var startButton = document.getElementById("start-quiz");
var quizContent = document.getElementById("quiz");
var answerContent = document.getElementById("responses");
var highScoreBtn = document.getElementById("high-scores");

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
  {
    question:
      "What programming language primarily controls the style of websites?",
    answers: ["HTML", "Javascript", "C++", "CSS"],
    correct: "CSS",
  },
  {
    question: "What does DOM stand for?",
    answers: [
      "Display Oriented Mobility",
      "Document Object Model",
      "Driving Over Microprocessors",
    ],
    correct: "Document Object Model",
  },
  {
    question:
      "What command submits code to the main branch of a remote github repository?",
    answers: [
      "git status",
      "git add .",
      "git push origin main",
      "git commit -m <message>?",
    ],
    correct: "git push origin main",
  },
];

// Counter to keep track of questions asked
var quizCounter = 0;

var score = 0;

// Variable to keep track of how much time has passed
var time = 0;

// Variable for the countdown
var timeInterval;

//Variable for holding user's initials
var initials;

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
      endGame();
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
  }

  if (targetEl !== "Start Quiz") {
    quizCounter++;
    if (targetEl !== rightAnswer) {
      clearInterval(timeInterval);
      timer(time - 10);
    }
    answerMessage(isRight);
    if (quizCounter < 5) {
      addQuestion();
    } else {
      endGame();
    }
  }
};

// Function to display user's answer
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

//Function to handle the end of game
var endGame = function () {
  quizContent.removeEventListener("click", answerHandler);

  clearInterval(timeInterval);
  quizContent.innerHTML = "";

  //Create div to hold final quiz elements
  var finalScreenEl = document.createElement("form");
  finalScreenEl.className = "final-screen";

  //Message indicating quiz is over
  var finalMessage = document.createElement("h2");
  finalMessage.textContent = "All done!";

  finalScreenEl.append(finalMessage);

  //Score
  var finalScore = document.createElement("p");
  finalScore.textContent = "Your score is " + score;
  finalScreenEl.append(finalScore);

  // Form to enter initials and take user to high score page
  var finalForm = document.createElement("form");
  finalForm.setAttribute("id", "submit-form");

  //Input box
  var inputBox = document.createElement("input");
  inputBox.setAttribute("type", "text");
  inputBox.setAttribute("name", "input-box");
  inputBox.setAttribute("placeholder", "Please enter initials");

  //Submission button
  var submitBtn = document.createElement("button");
  submitBtn.className = "btn";
  submitBtn.setAttribute("id", "save-initials");
  submitBtn.setAttribute("type", "submit");
  submitBtn.textContent = "Submit";

  //Add Form elements to form
  finalForm.append(inputBox);
  finalForm.append(submitBtn);

  //Add form to final screen element
  finalScreenEl.append(finalForm);

  //Add final screen element to the window
  quizContent.append(finalScreenEl);

  //Event listener to handle user submission
  finalForm.addEventListener("submit", submitHandler);
};

// Function to handle form submissions
var submitHandler = function () {
  //Get user input
  initials = document.querySelector("input[name='input-box']").value;

  //Create object using user's initial and score
  var userScore = {
    name: initials,
    score: score,
  };

  //Add the score object to the array of score objects
  highScores[highScores.length] = userScore;

  //Save the array to localStorage
  localStorage.setItem("scores", JSON.stringify(highScores));

  //Call function to display scores
  showHighScores();
};

// Function to display scores on page
var showHighScores = function () {
  quizContent.innerHTML = "";

  var highScoreEl = document.createElement("div");

  // Title element
  var highScoreTitle = document.createElement("h2");
  highScoreTitle.textContent = "High Scores";
  highScoreEl.append(highScoreTitle);

  //Scoreboard element
  var scoreboard = document.createElement("div");
  scoreboard.setAttribute("id", "scoreboard");

  //Iterate through array to set scores on screen
  for (i = 0; i < highScores.length; i++) {
    var scoreEl = document.createElement("p");
    scoreEl.textContent = highScores[i].name + ": " + highScores[i].score;
    //console.log([highScores[i].name + " " + highScores[i].score]);
    scoreboard.append(scoreEl);
  }

  var buttonEl = document.createElement("div");

  //Button element to go back to start quiz screen
  var backBtn = document.createElement("button");
  backBtn.className = "btn";
  backBtn.textContent = "Go Back";
  backBtn.setAttribute("onclick", "location.href='/quiz'");

  //Button element to clear cache
  var clearBtn = document.createElement("button");
  clearBtn.className = "btn";
  clearBtn.textContent = "Clear High Scores";

  buttonEl.append(backBtn);
  buttonEl.append(clearBtn);

  //Append elements to screen
  highScoreEl.append(scoreboard);
  highScoreEl.append(buttonEl);
  quizContent.append(highScoreEl);

  //eventListener for clear high scores button
  clearBtn.addEventListener("click", clearHighScores);
};

//Function to loadLocalstorage scores
var loadScores = function () {
  var savedScores = localStorage.getItem("scores");

  if (!savedScores) {
    return [];
  }

  savedScores = JSON.parse(savedScores);

  return savedScores;
};

//Function to clear high scores from localstorage
var clearHighScores = function () {
  var scoreboardEl = document.getElementById("scoreboard");
  highScores = [];
  localStorage.setItem("scores", highScores);
  scoreboardEl.innerHTML = "";
  scoreboardEl.textContent = "Scores have been cleared";
};

startButton.addEventListener("click", quizHandler);
quizContent.addEventListener("click", answerHandler);
highScoreBtn.addEventListener("click", showHighScores);

//Global variable to keep track of scores that have been saved already to localStorage
var highScores = loadScores();
