//  Instializing global variables

//  Variable to count the clicked boxes
let turnsCount;

//  check for win state variable
let winState;

//  Players input array
const greenArr = [];
const redArr = [];

const score = [0, 0, 0, 0];

//  Winning object
const winObj = {
  0: [[1, 2], [4, 8], [3, 6]],
  1: [[4, 7]],
  2: [[4, 6], [5, 8]],
  3: [[4, 5]],
  6: [[7, 8]]
};

//  Build an array for all the boxes
let grids = document.querySelectorAll(".grid");

//  Build the reset button
const resetBut = document.querySelector(".reset-tag");

//  Functions to be used

//  Initialize listners and variables for a new game
function intializeListeners() {
  //  Initialize the count of turns and win state
  turnsCount = 0;

  //  Initialize the win state
  winState = false;

  //  Add listners to the grids
  for (let i = 0; i < grids.length; i++) {
    grids[i].addEventListener("click", clickEvent);
    grids[i].addEventListener("mouseover", hoverEvent);
    grids[i].addEventListener("mouseleave", leaveEvent);
  }
}

//  Clear input by reassignning classes and reinitializing
function clearInput() {
  for (let i = 0; i < grids.length; i++) {
    grids[i].className = "grid";
    const spanChild = grids[i].querySelector("span");
    grids[i].removeChild(spanChild);
  }
  intializeListeners();
}

//  Hover event listner that adds green class to the grid
function hoverEvent(event) {
  if (turnsCount % 2 == 0) event.target.classList.add("green");
  if (turnsCount % 2 == 1) event.target.classList.add("red");
}

//  Hover leave event that reinitializes the grid
function leaveEvent(event) {
  event.target.classList.remove("green");
  event.target.classList.remove("red");
}

//  Click event function
function clickEvent(event) {
  const spanDiv = document.createElement("div");
  event.target.appendChild(spanDiv);
  spanDiv.classList.add("spanDiv");
  //  Add class to color the box and tag it as clicked
  event.target.classList.add("clicked");

  //  Remove the event listners from the clicked div
  event.target.removeEventListener("mouseover", hoverEvent);
  event.target.removeEventListener("mouseleave", leaveEvent);
  event.target.removeEventListener("click", clickEvent);

  //  Check which player turn, then
  if (event.target.classList.value.includes("green")) {
    greenArr.push(event.target.id);
    if (turnsCount > 3) winState = checkForWin(greenArr);
    if (winState) {
      score[0]++;
      console.log("Green Has Won");
    }
  }

  if (event.target.classList.value.includes("red")) {
    redArr.push(event.target.id);
    // spanAdd.classList.add("red");
    if (turnsCount > 3) winState = checkForWin(redArr);
    if (winState) {
      console.log("Red has won");
      score[1]++;
    }
  }

  //  Increase the click count
  turnsCount++;

  if (winState) {
    console.log("end game");
  }
  if (turnsCount >= 9 && !winState) {
    console.log("It's a Tie");
    score[2]++;
  }
}

//  Check for win function
function checkForWin(playerArr) {
  //  Sorting the player's array for comparison
  playerArr.sort();
  //  Temporary array holding possible winning array
  let tempArr;

  // Check if the first element is in the winning property
  if (winObj.hasOwnProperty(playerArr[0])) {
    tempArr = winObj[playerArr[0]];
    for (let i = 0; i < tempArr.length; i++) {
      if (
        playerArr.includes("" + tempArr[i][0]) &&
        playerArr.includes("" + tempArr[i][1])
      )
        return true;
    }
  }

  if (playerArr.length > 3 && !winState) {
    const [, ...newArr] = playerArr;
    return checkForWin(newArr);
  }
}

//  End of the game function
function endGame() {
  updateBoard();
}

resetBut.addEventListener("click", clearInput);

const scoreBoard = document.querySelector("#score-board");

//  update Scoreboard
function updateBoard() {
  document.querySelector("#play1 span").innerText = score[0];
  document.querySelector("#play2 span").innerText = score[1];
  document.querySelector("#draws span").innerText = score[2];
  document.querySelector("#noFinish span").innerText = score[3];
}
//  Call the main initializing function
intializeListeners();
updateBoard();
