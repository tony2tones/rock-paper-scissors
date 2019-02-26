let userScore = 0;
let compScore = 0;
let hitPoints = 10;

const userScore_span = document.getElementById("user-score");
const compScore_span = document.getElementById("comp-score");
const hitpoints_div = document.getElementById("lifeCount");
const scoreBoard_div = document.querySelector(".score-board");
const retry_button = document.getElementById("retry-button");
const result_div = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");

function getComputerChoice() {
  const choices = ["r", "p", "s"];
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}

function win(userChoice, computerChoice) {
  userScore++;
  userScore_span.innerHTML = userScore;
  result_div.innerHTML =
    userChoice + " beats " + computerChoice + " user wins!";
}

function lose(userChoice, computerChoice) {
  compScore++;
  compScore_span.innerHTML = compScore;
  result_div.innerHTML =
    computerChoice + " beats " + userChoice + " user loses!";
  hitPointsUpdate();
}

function draw() {
  result_div.innerHTML = "Its a draw, no winner. Try again.";
}

// Overlay logic
function on() {
  console.log("your lives are over brah");
  document.getElementById("overlay").style.display = "block";
}

function off() {
  hitPoints = 10;
  userScore = 0;
  compScore = 0;
  compScore_span.innerHTML = compScore;
  userScore_span.innerHTML = userScore;
  hitpoints_div.innerHTML = hitPoints;
  document.getElementById("overlay").style.display = "none";
}

function hitPointsUpdate() {
  let lives = hitPoints;
  console.log(lives);
  if (lives === 0) {
    on();
    console.log("its over");
  } else hitPoints--;
  hitpoints_div.innerHTML = hitPoints;
  console.log("your health " + hitPoints);
}

function game(userChoice) {
  result_div.innerHTML = "Make your move";
  const computerChoice = getComputerChoice();
  switch (userChoice + computerChoice) {
    case "rs":
    case "pr":
    case "sp":
      win(userChoice, computerChoice);
      break;
    case "sr":
    case "ps":
    case "rp":
      lose(userChoice, computerChoice);
      break;
    case "pp":
    case "rr":
    case "ss":
      draw();
  }
}

function main() {
  retry_button.addEventListener("click", function() {
    off();
  });
  rock_div.addEventListener("click", function() {
    game("r");
  });

  paper_div.addEventListener("click", function() {
    game("p");
  });

  scissors_div.addEventListener("click", function() {
    game("s");
  });
}

main();
