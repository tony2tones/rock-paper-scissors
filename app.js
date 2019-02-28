let userScore = 0;
let compScore = 0;
let hitPoints = 5;
let compHitPoints = 1;

const userScore_span = document.getElementById("user-score");
const compScore_span = document.getElementById("comp-score");
const hitpoints_div = document.getElementById("lifeCount");
const scoreBoard_div = document.querySelector(".score-board");
const retry_button = document.getElementById("retry-button");
const result_div = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");
const userChoice_img = document.getElementById("user-choice");
const overlay_div = document.querySelector(".result-lose > p");

function getComputerChoice() {
  const choices = ["r", "p", "s"];
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}

function setImage(choice) {
  switch (choice) {
    case "r":
      return "this is a rock";
      break;
    case "s":
      return "this is a scissors";
      break;
    case "p":
      return "this is a paper";
  }
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
function loses() {
  console.log(' you actually lose');
  document.getElementById("overlay").style.display = "block";
}

function winner() {
  console.log(' you actually win');
  overlay_div.innerHTML = "YOU WIN!";
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
  let score = userScore;
  console.log(lives);
  let compLife = compHitPoints;

  hitPoints--;
    hitpoints_div.innerHTML = hitPoints;
    document.getElementById("face").src = "assets/images/rsp-face-hit.png";
    setTimeout(function() {
      document.getElementById("face").src = "assets/images/faceBeard.png";
    }, 400);

  if (hitPoints === 0 && score < compScore) {
    loses();
  } else if (score === 5 && score > compScore) {
    winner();
  }

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
  });

  paper_div.addEventListener("click", function() {
    game("p");
  });

  scissors_div.addEventListener("click", function() {
    game("s");
  });
}

main();
