let userScore = 0;
let compScore = 0;
let hitPoints = 2;
let compHitPoints = 5;

const ROCK = "r";
const PAPER = "p";
const SCISSORS = "s";

const userImage = document.getElementById("userChoiceImg");
const overlay = document.getElementById("overlay");
const userScore_span = document.getElementById("user-score");
const compScore_span = document.getElementById("comp-score");
const userHitpoints_div = document.getElementById("userLife");
const compHitpoints_div = document.getElementById("compLife");
const scoreBoard_div = document.querySelector(".score-board");
const retry_button = document.getElementById("retry-button");
const result_div = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");
const userChoice_img = document.getElementById("user-choice");
const overlay_div = document.querySelector(".result-lose > p");
const compHand_div = document.getElementById("compChoiceImg");

const imgMapper = {
    ROCK : 'assets/images/srock-attack.png',
    PAPER : 'assets/images/srock-attack.png',
    SCISSORS : 'assets/images/scissors.png'
}


getComputerChoice = () => {
  const choices = ["r", "p", "s"];
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
};

setImage = choice => {
  document.getElementById("compChoice").style.display = "block";
  switch (choice) {
    case "r":
      compHand_div.src = "assets/images/srock-attack.png";
      break;
    case "s":
      compHand_div.src = "assets/images/scissors-close.png";
      break;
    case "p":
      compHand_div.src = "assets/images/spaper-attack.png";
  }
};

convertToWord = choice => {
  if (choice === "p") return "PAPER";
  if (choice === "r") return "ROCK";
  else return "SCISSORS";
};

 imageMap = imgChoice => {
    console.log(imgMapper[imgChoice]);
    return imgMapper[imgChoice];
    
}

win = (userChoice, computerChoice) => {
  userChoice_div = document.getElementById(userChoice).classList;
  userScore++;

  userScore_span.innerHTML = userScore;
  result_div.innerHTML = `${convertToWord(userChoice)} beats ${convertToWord(
    computerChoice
  )} user wins!`;
  compHitPointsUpdate();
  userChoice_div.add("green-glow");
  setTimeout(() => {
    userChoice_div.remove("green-glow");
  }, 300);
};

lose = (userChoice, computerChoice) => {
  userChoice_div = document.getElementById(userChoice).classList;
  compScore++;
  compScore_span.innerHTML = compScore;
  result_div.innerHTML =
    convertToWord(computerChoice) +
    " beats " +
    convertToWord(userChoice) +
    " user loses!";
  hitPointsUpdater();
  userChoice_div.add("red-glow");
  setTimeout(() => {
    userChoice_div.remove("red-glow");
  }, 800);
};

draw = userChoice => {
  userChoice_div = document.getElementById(userChoice).classList;
  result_div.innerHTML = "Its a draw, no winner. Try again.";
  userChoice_div.add("grey-glow");
  setTimeout(() => {
    userChoice_div.remove("grey-glow");
  }, 800);
};

// Overlay logic
loses = () => {
  overlay_div.innerHTML = "YOU LOSE";
  overlay.style.display = "block";
};

winner = () => {
  overlay_div.innerHTML = "YOU WIN!";
  overlay.style.display = "block";
};

off = () => {
  hitPoints = 10;
  compHitPoints = 10;
  userScore = 0;
  compScore = 0;
  compScore_span.innerHTML = compScore;
  userScore_span.innerHTML = userScore;
  userHitpoints_div.innerHTML = hitPoints;
  compHitpoints_div.innerHTML = compHitPoints;
  result_div.innerHTML = "Make your move";

  document.getElementById("compChoice").style.display = "none";
  document.getElementById("userChoice").style.display = "none";

  document.getElementById("overlay").style.display = "none";
};

compHitPointsUpdate = () => {
  let score = compScore;
  compHitPoints--;
  compHitpoints_div.innerHTML = compHitPoints;
  document.getElementById("face").src = "assets/images/rsp-face-hit.png";
  setTimeout(() => {
    document.getElementById("face").src = "assets/images/faceBeard.png";
  }, 400);
  if (compHitPoints === 0 && score < userScore) {
    winner();
  } else if (score === 5 && score > userScore) {
    loses();
  }
};

hitPointsUpdater = () => {
  let score = userScore;
  hitPoints--;
  userHitpoints_div.innerHTML = hitPoints;
  document.getElementById("face").src = "assets/images/rsp-face-hit.png";
  setTimeout(() => {
    document.getElementById("face").src = "assets/images/faceBeard.png";
  }, 400);
  if (hitPoints === 0 && score < compScore) {
    loses();
  } else if (score === 5 && score > compScore) {
    winner();
  }
};

game = userChoice => {
  result_div.innerHTML = "Make your move";
  const computerChoice = getComputerChoice();
  setImage(computerChoice);
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
};

main = () => {
  retry_button.addEventListener("click", () => {
    off();
  });

  rock_div.addEventListener("click", () => {
    game("r");
    imageMap('ROCK');
    image = document.getElementById("userChoiceImg");
    image.src = "assets/images/srock-attack.png";
    document.getElementById("userChoice").style.display = "block";
  });

  paper_div.addEventListener("click", () => {
    game("p");
    image = document.getElementById("userChoiceImg");
    image.src = "assets/images/spaper-attack.png";
    document.getElementById("userChoice").style.display = "block";
  });

  scissors_div.addEventListener("click", () => {
    game("s");
    image = document.getElementById("userChoiceImg");
    image.src = "assets/images/scissors.png";
    document.getElementById("userChoice").style.display = "block";
  });
};

main();
