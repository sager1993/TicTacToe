//  Build an array for all the boxes
let grids = document.querySelectorAll(".grid");

//  Variable to count the clicked boxes
let turnsCount;

//  check for win state
let winState;

//  Player input array
const greenArr = []; const redArr = [];

//  Winning options
const winsArray = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
]

//  Click function
function clickEvent(event) {
    //  Add class to color the box and tag it as clicked
    event.target.classList.add("clicked");
    //  Remove the event listners from the clicked div
    event.target.removeEventListener("mouseover", hoverEvent);
    event.target.removeEventListener("mouseleave", leaveEvent);
    event.target.removeEventListener("click", clickEvent);

    //  Increase the click count
    turnsCount++;

    if (event.target.classList.value.includes("green")) {
        greenArr.push(event.target.id);
        checkForWin(greenArr);
    }

    if (event.target.classList.value.includes("red")) {
        redArr.push(event.target.id);
        checkForWin(redArr);
    }

}

//  Check for win function
function checkForWin(playerArr) {
    playerArr.sort();
    for (let i = 0; i < playerArr.length - 2 && !winState; i++) {
        const winOptions = winsArray.filter(x => x[0] == playerArr[i]);
        for (let i = 0; i < winOptions.length; i++) {
            if (playerArr.includes("" + winOptions[i][1]) &&
                playerArr.includes("" + winOptions[i][2])) {
                winState = true;
                const winMessage = turnsCount % 2 == 1 ? "Green won!" : "Red won!"
                console.log(winMessage)
                break;
            }
        }
    }
}

//  Hover event listner that adds green class to the grid
function hoverEvent(event) {
    if (turnsCount % 2 == 0)
        event.target.classList.add("green");
    if (turnsCount % 2 == 1)
        event.target.classList.add("red");
}

//  Hover leave event that reinitializes the grid
function leaveEvent(event) {
    event.target.classList.remove("green");
    event.target.classList.remove("red");
}

function intializeListeners() {
    //  Initialize the count of turns and win state
    turnsCount = 0;

    winState = false;
    //  Add listners to the grids
    for (let i = 0; i < grids.length; i++) {
        grids[i].addEventListener("click", clickEvent);
        grids[i].addEventListener("mouseover", hoverEvent);
        grids[i].addEventListener("mouseleave", leaveEvent);
    }
}


function clearInput() {
    for (let i = 0; i < grids.length; i++) {
        grids[i].className = "grid";
    }
    intializeListeners();
}
//
intializeListeners();