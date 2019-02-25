let userScore = 0;
let compScore = 0;
const userScore_span = document.getElementById("user-score");
const compScore_span = document.getElementById("comp-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_div = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");

function getComputerChoice() {
  const choices = ["r", "p", "s"];
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}

function win(userChoice,computerChoice) {
    userScore ++;
    userScore_span.innerHTML = userScore;
    result_div.innerHTML = userChoice + " beats " + computerChoice + ' user wins!';
}

function lose(userChoice,computerChoice) {
    compScore ++;
    compScore_span.innerHTML = userScore;
    result_div.innerHTML = computerChoice + " beats " + userChoice + ' user wins!';
}

function draw(userChoice,computerChoice) {
    compScore_span.innerHTML = userScore;
    result_div.innerHTML = 'Its a draw, no winner. Try again.';
}

function game(userChoice) {
  const computerChoice = getComputerChoice();
  switch (userChoice + computerChoice) {
    case "rs":
    case "sp":
    case "pr":
      console.log("player wins");
      win(userChoice,computerChoice)
      break;
    case "sr":
    case "rp":
    case "rp":
      console.log("player loses");
      lose(userChoice,computerChoice)
      break;
    case "rr":
    case "ss":
    case "pp":
      console.log("its a Draw");
      draw()
      break;
      
  }
}

function main() {
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
