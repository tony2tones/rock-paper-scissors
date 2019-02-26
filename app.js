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

function convertToWord(choice) {
  if (choice === "p") return "PAPER";
  if (choice === "r") return "ROCK";
  else return "SCISSORS";
}

function win(userChoice, computerChoice) {
  userChoice_div = document.getElementById(userChoice).classList;
  userScore++;
  userScore_span.innerHTML = userScore;
  result_div.innerHTML = `${convertToWord(userChoice)} beats ${convertToWord(
    computerChoice
  )} user wins!`;
  userChoice_div.add("green-glow");
  setTimeout(function() {
    userChoice_div.remove("green-glow");
  }, 800);
}

function lose(userChoice, computerChoice) {
  userChoice_div = document.getElementById(userChoice).classList;
  compScore++;
  compScore_span.innerHTML = compScore;
  result_div.innerHTML =
    convertToWord(computerChoice) +
    " beats " +
    convertToWord(userChoice) +
    " user loses!";
  hitPointsUpdate();
  userChoice_div.add("red-glow");
  setTimeout(function() {
    userChoice_div.remove("red-glow");
  }, 800);
}

function draw(userChoice) {
  userChoice_div = document.getElementById(userChoice).classList;
  result_div.innerHTML = "Its a draw, no winner. Try again.";
  userChoice_div.add("grey-glow");
  setTimeout(function() {
    userChoice_div.remove("grey-glow");
  }, 800);

}

// Overlay logic
function on() {
  console.log("your lives are over brah");
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
      draw(userChoice);
  }
}

function main() {
  retry_button.addEventListener("click", function() {
    off();
  });
  rock_div.addEventListener("click", function() {
    game("r");

    // document.getElementById("user-choice").src = "assets/images/srock.png";
    // document.getElementById("user-choice").style.display = "block";
    // document.getElementById("user-choice").style.transform = "translate(200px)";
  });

  paper_div.addEventListener("click", function() {
    game("p");
  });

  scissors_div.addEventListener("click", function() {
    game("s");
  });
}

main();
