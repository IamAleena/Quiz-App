const questions = [
  {
    question: "The hardest substance available on earth is",
    answers: [
      { text: "Gold", correct: false },
      { text: "Diamond", correct: true },
      { text: "Iron", correct: false },
      { text: "Platinum", correct: false },
    ],
  },
  //   {
  //     question: "The ratio of width of our National flag to its length is",
  //     answers: [
  //       { text: "3:5", correct: false },
  //       { text: "2:4", correct: false },
  //       { text: "2:3", correct: true },
  //       { text: "3:4", correct: false },
  //     ],
  //   },
  {
    question: "The best conductor of electricity is",
    answers: [
      { text: "Aluminium", correct: false },
      { text: "Copper", correct: false },
      { text: "Silver", correct: true },
      { text: "Iron", correct: false },
    ],
  },
  {
    question: "Which of the following is the least polluting fuel?",
    answers: [
      { text: "Kerosene", correct: false },
      { text: "Diesel", correct: false },
      { text: "Hydrogen", correct: true },
      { text: "Coal", correct: false },
    ],
  },
  {
    question:
      "Which country of the world has the largest number of post offices?",
    answers: [
      { text: "France", correct: false },
      { text: "China", correct: false },
      { text: "India", correct: true },
      { text: "Japan", correct: false },
    ],
  },
  //   {
  //     question: "Which of the following day is celebrated as Law Day in India?",
  //     answers: [
  //       { text: "November 26", correct: true },
  //       { text: "December 13", correct: false },
  //       { text: "January 6", correct: false },
  //       { text: "August 9", correct: false },
  //     ],
  //   },
  {
    question: "What is the duration of singing of national anthem of India?",
    answers: [
      { text: "52 seconds", correct: false },
      { text: "65 seconds", correct: true },
      { text: "60 seconds", correct: false },
      { text: "50 seconds", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

showQuestion();
