// script.js

let questions = [];
let currentQuestionIndex = 0;
let score = 0;

// Load questions from JSON file
async function loadQuestionsFromJSON() {
  try {
    const response = await fetch("questions.json");
    const data = await response.json();
    questions = data.questions;
    loadQuestion();
    console.log("Ready");
  } catch (error) {
    console.error("Error loading questions:", error);
  }
}

function loadQuestion() {
  const questionContainer = document.getElementById("question-container");
  const questionElement = document.getElementById("question");
  const choicesContainer = document.getElementById("choices");

  if (currentQuestionIndex < questions.length) {
    const questionNumber = "# " + (currentQuestionIndex + 1) + ": ";
    console.log(questionNumber);
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = questionNumber + currentQuestion.question;
    const choices = choicesContainer.getElementsByClassName("choice");
    for (let i = 0; i < choices.length; i++) {
      choices[i].textContent = currentQuestion.choices[i];
    }
    questionContainer.style.display = "block";
    // document.getElementById("next-button").style.display = "none";
  } else {
    showResults();
  }
}

function selectAnswer(choiceIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  if (choiceIndex === currentQuestion.correctAnswer) {
    score++;
  }
  //   document.getElementById("next-button").style.display = "block";
  nextQuestion();
}

function nextQuestion() {
  currentQuestionIndex++;
  loadQuestion();
}

function showResults() {
  const resultsContainer = document.getElementById("results-container");
  const quizContainer = document.getElementById("quiz");
  const jlptLevelElement = document.getElementById("jlpt-level");
  const resultDetailsElement = document.getElementById("result-details");

  quizContainer.style.display = "none";
  resultsContainer.style.display = "block";

  let jlptLevel = "";
  if (score > 80) {
    jlptLevel = "N1";
  } else if (score > 60) {
    jlptLevel = "N2";
  } else if (score > 40) {
    jlptLevel = "N3";
  } else if (score > 20) {
    jlptLevel = "N4";
  } else {
    jlptLevel = "N5";
  }

  jlptLevelElement.textContent = jlptLevel;
  resultDetailsElement.textContent = `You answered ${score} questions correctly out of ${questions.length}. This suggests your JLPT level might be ${jlptLevel}.`;
}

window.onload = function () {
  loadQuestionsFromJSON();
};
