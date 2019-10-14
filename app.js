//  Build an array for all the boxes
let grids = document.querySelectorAll(".grid");

//  Variable to count the clicked boxes
let turnsCount;

//  check for win state variable
let winState;

//  Player input array
const greenArr = []; const redArr = [];

//  Winning object
const winObj = {
    0: [[1, 2], [4, 8], [3, 6]],
    1: [[4, 7]],
    2: [[4, 6], [5, 8]],
    3: [[4, 5]],
    6: [[7, 8]]
};

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

//  Click event function
function clickEvent(event) {
    //  Add class to color the box and tag it as clicked
    event.target.classList.add("clicked");

    //  Remove the event listners from the clicked div
    event.target.removeEventListener("mouseover", hoverEvent);
    event.target.removeEventListener("mouseleave", leaveEvent);
    event.target.removeEventListener("click", clickEvent);

    //  Increase the click count
    turnsCount++;

    //  Check which player turn, then 
    if (event.target.classList.value.includes("green")) {
        greenArr.push(event.target.id);
        if (turnsCount > 4)
            winState = checkForWin(greenArr);
        if (winState)
            console.log("Green Has Won");
    }


    if (event.target.classList.value.includes("red")) {
        redArr.push(event.target.id);
        if (turnsCount > 4)
            winState = checkForWin(redArr);
        if (winState)
            console.log("Red has won");
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
            if (playerArr.includes("" + tempArr[i][0]) &&
                playerArr.includes("" + tempArr[i][1]))
                return true;
        }
    }

    if (playerArr.length > 3 && !winState) {
        const [, ...newArr] = playerArr;
        return checkForWin(newArr);
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


//  Clear input by reassignning classes and 
function clearInput() {
    for (let i = 0; i < grids.length; i++) {
        grids[i].className = "grid";
    }
    intializeListeners();
}
//
intializeListeners();