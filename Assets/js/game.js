var question = document.getElementById("question");
var choices = Array.from(document.getElementsByClassName("choice-text"));
var timerText = document.getElementById("timerText");
var scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let startTimer = 20;

let questions = [
  {
    question: "Javascript is an _______ language?",
    choice1: "Object-Oriented",
    choice2: "Procedural",
    choice3: "Object-Based",
    choice4: "None of the above",
    answer: 1,
  },

  {
    question:
      "Which of the following keywords is used to define a variable in Javascript?",
    choice1: "var",
    choice2: "let",
    choice3: "Both A and B",
    choice4: "None of the above",
    Answer: 3,
  },

  {
    question:
      "Which of the following keywords are used to access HTML elements using Javascript?",
    choice1: "getElementById",
    choice2: "getElementByClassName",
    choice3: "Both A and B",
    choice4: "None of the above",
    answer: 3,
  },

  {
    question:
      "Which of the following methods can be used to display data in some form using Javascript?",
    choice1: "document.white()",
    choice2: "console-log()",
    choice3: "window-alert()",
    choice4: "All of the above",
    answer: 4,
  },
];

//constants
var CORRECT_BONUS = 10;
var MAX_QUESTIONS = 3;

var count = 30;
var timer = setInterval(function () {
  document.getElementById("count").innerHTML = count;
  count--;
  if (count === 0) {
    clearInterval(timer);
    alert("You're out of time!");
  }
}, 1000);

var startGame = function () {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

var getNewQuestion = function () {
  if (availableQuestions.lenth === 0 || questionCounter > MAX_QUESTIONS)
    return window.location.assign("./develop/end.html");

  questionCounter++;

  var questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    var number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    var selectedChoice = e.target;
    var selectedAnswer = selectedChoice.dataset["number"];
    console.log(selectedAnswer == currentQuestion.answer);

    var answerToApply = "incorrect";
    if (selectedAnswer == currentQuestion.answer) {
      answerToApply = "correct";

      if (answerToApply === "correct") {
        incrementScore(CORRECT_BONUS);
      }
    }

    selectedChoice.parentElement.classList.add(answerToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(answerToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
