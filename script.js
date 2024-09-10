// HTML element variables
var menu = document.getElementById("dice-menu");
var rollBtn = document.getElementById("roll-btn");
var resetBtn = document.getElementById("reset-btn");
var sumBtn = document.getElementById("sum-btn");
var dice1 = document.getElementById("dice-1");
var dice2 = document.getElementById("dice-2");
var rollHistory = document.getElementById("roll-history");
var rollSum = document.getElementById("roll-sum");

// Global variables for dice rotation
var angle1 = 0;
var angle2 = 0;
var timer1;
var timer2;
let randNum1;
let randNum2;

// Events Listener
rollBtn.addEventListener("click", typesDiceActions);
resetBtn.addEventListener("click", resetClicked);

// Function to animate dice
function animateDice(dice, angle) {
  return function () {
    angle += 10; // Increase the angle for rotation
    dice.style.transform = `rotate(${angle}deg)`;
  };
}

// Functions to start animation
function startDiceAnimation() {
  timer1 = setInterval(animateDice(dice1, angle1), 50); // Rotate every 50ms
  timer2 = setInterval(animateDice(dice2, angle2), 50); // Rotate every 50ms
}

// Function to stop animation
function stopDiceAnimation() {
  clearInterval(timer1);
  clearInterval(timer2);
}

// Function to roll dice and update history
function rollDice() {
  stopDiceAnimation(); // Stop any ongoing animation

  randNum1 = Math.floor(Math.random() * 6) + 1;
  randNum2 = Math.floor(Math.random() * 6) + 1;

  dice1.src = `images/${randNum1}.png`;
  dice2.src = `images/${randNum2}.png`;

  // New function (bingo and looser)
  if (randNum1 + randNum2 == 12) {
    alert("BINGO!");
  }

  // Sum Function
  let sum = randNum1 + randNum2;

  sumBtn.addEventListener("click", sumClicked);
  function sumClicked() {
    var sumDisplay = document.createElement("span");
    sumDisplay.textContent = `${randNum1} + ${randNum2} = ${sum}`;
    rollSum.appendChild(sumDisplay);
  }

  var result = document.createElement("span");
  result.textContent = `${randNum1} - ${randNum2}`;
  rollHistory.appendChild(result);

  startDiceAnimation(); // Start animation after rolling
}

// Different functions based on rollDice()

function typesDiceActions() {
  var selectOption = menu.value; // Select the neccessary option

  if (selectOption === "roll-1") {
    rollDice();
  } else if (selectOption === "roll-5") {
    for (let i = 1; i <= 5; i++) {
      rollDice();
    }
  } else if (selectOption === "roll-x") {
    var rolls = prompt("Enter the number of rolls:");
    var rollCount = parseInt(rolls, 10);
    if (!isNaN(rollCount)) {
      for (let i = 1; i <= rollCount; i++) {
        rollDice();
      }
    } else {
      alert("Please enter a valid number.");
    }
  } else if (selectOption === "roll-snake") {
    while (true) {
      rollDice();
      let countNum;
      countNum++;
      if (randNum1 == 1 && randNum2 == 1) {
        break;
      }
      alert(countNum);
    }
  } else {
    alert("Please select a valid option.");
  }
}

// Reload

function resetClicked() {
  location.reload();
}
