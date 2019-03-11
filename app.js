let userScore = 0;
let compScore = 0;
let hitPoints = 10;
let compHitPoints = 10;

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
const userHand_div = document.getElementById("userChoiceImg");
const userFace_img = document.getElementById("face");

const compChoice_div = document.getElementById("compChoice");
const userChoice_div = document.getElementById("userChoice");

const imgMapper = {
  ROCK: "assets/images/srock-attack.png",
  PAPER: "assets/images/spaper-attack.png",
  SCISSORS: "assets/images/scissors.png",
  FACEFULL: "assets/images/face-full.png",
  FACEMED: "assets/images/face-med.png",
  FACELOW: "assets/images/face-low.png",
  FACEHIT: "assets/images/rsp-face-hit.png"
};

let userFaceImg = imgMapper.FACEFULL;

getUserFaceImage = hitPoints => {
  if (hitPoints > 7) {
    return imgMapper.FACEFULL;
  } else if (hitPoints <= 7 && hitPoints > 4) {
    return imgMapper.FACEMED;
  } else if (hitPoints <= 4) {
    return imgMapper.FACELOW;
  }
};

getComputerChoice = () => {
  const choices = ["r", "p", "s"];
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
};

setImage = choice => {
  compChoice_div.style.display = "block";
  switch (choice) {
    case "r":
      compHand_div.src = imgMapper.ROCK;
      break;
    case "s":
      compHand_div.src = imgMapper.SCISSORS;
      break;
    case "p":
      compHand_div.src = imgMapper.PAPER;
  }
};

convertToWord = choice => {
  if (choice === "p") return "PAPER";
  if (choice === "r") return "ROCK";
  else return "SCISSORS";
};

imageMap = imgChoice => {
  image = document.getElementById("userChoiceImg");
  image.src = imgMapper[imgChoice];
  userChoice_div.style.display = "block";
  return imgMapper[imgChoice];
};

scoreCounter = (score, scoreSpan, winner) => {
  if (winner === "user") {
    userScore++;
    scoreSpan.innerHTML = userScore;
  } else {
    compScore++;
    compScore_span.innerHTML = compScore;
  }
};

win = (userChoice, computerChoice) => {
  scoreCounter(userScore, userScore_span, "user");

  result_div.innerHTML = `${convertToWord(userChoice)} beats ${convertToWord(
    computerChoice
  )} user wins!`;

  compHitPointsUpdate();
  userHand_div.classList.add("green-glow");
  compHand_div.classList.add("red-glow");
  setTimeout(() => {
    userHand_div.classList.remove("green-glow");
    compHand_div.classList.remove("red-glow");
  }, 300);
};

lose = (userChoice, computerChoice) => {
  scoreCounter(compScore, compScore_span, "comp");
  result_div.innerHTML =
    convertToWord(computerChoice) +
    " beats " +
    convertToWord(userChoice) +
    " user loses!";

  hitPointsUpdater();
  userHand_div.classList.add("red-glow");
  compHand_div.classList.add("green-glow");
  setTimeout(() => {
    userHand_div.classList.remove("red-glow");
    compHand_div.classList.remove("green-glow");
  }, 800);
};

draw = () => {
  result_div.innerHTML = "Its a draw. Try again.";
  userHand_div.classList.add("grey-glow");
  compHand_div.classList.add("grey-glow");
  setTimeout(() => {
    userHand_div.classList.remove("grey-glow");
    compHand_div.classList.remove("grey-glow");
  }, 800);
};

// Overlay logic
loses = () => {
  userFace_img.src = getUserFaceImage(hitPoints);
  overlay_div.innerHTML = "YOU LOSE";
  overlay.style.display = "block";
};

winner = () => {
  userFace_img.src = getUserFaceImage(hitPoints);
  // userFace_img.src = getUserFaceImage(hitPoints);
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
  userFace_img.src = getUserFaceImage(hitPoints);
  result_div.innerHTML = "Make your move";
  compChoice_div.style.display = "none";
  userChoice_div.style.display = "none";
  overlay.style.display = "none";
};

compHitPointsUpdate = () => {
  let score = compScore;
  compHitPoints--;
  compHitpoints_div.innerHTML = compHitPoints;
  // userFace_img.src = imgMapper.FACEHIT;
  setTimeout(() => {
    userFace_img.src = getUserFaceImage(hitPoints);
  }, 400);
  if (compHitPoints === 0 && score < userScore) {
    winner();
  } else if (score === 10 && score > userScore) {
    loses();
  }
};

hitPointsUpdater = () => {
  let score = userScore;
  hitPoints--;
  userHitpoints_div.innerHTML = hitPoints;
  userFace_img.src = imgMapper.FACEHIT;
  setTimeout(() => {
    userFace_img.src = getUserFaceImage(hitPoints);
  }, 400);
  if (hitPoints === 0 && score < compScore) {
    loses();
  } else if (score === 10 && score > compScore) {
    winner();
  }
};

faceState = game = userChoice => {
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
    imageMap("ROCK");
  });

  paper_div.addEventListener("click", () => {
    game("p");
    imageMap("PAPER");
  });

  scissors_div.addEventListener("click", () => {
    game("s");
    imageMap("SCISSORS");
  });
};

main();
