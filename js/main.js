/*----- constants -----*/
// 1.1) Define a colors object
const colors = {
    null: 'white',
    '1': 'Orange',
    '-1': 'Green'
};

// Define the 8 possible winning combinations
const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6]  // Diagonal from top-right to bottom-left
];

// Define Tie Messages
const tieMessages = [
    "It's a stalemate!",
    "It's a draw!",
    "Neither player emerged victorious!",
    "The battle ends in a tie!",
    "The game ends in a stalemate!",
    "It's a deadlock!",
    "The final result is a balanced tie!",
    "Neither side prevailed!"
];

//Define Win Messages
const winMessages = [
    [" conquered the board!"],
    [" emerges as the ultimate champion!"],
    [" claims victory!"],
    [" seizes the win!"],
    [" outshines everyone!"],
    [" reigns supreme!"],
    [" dominates the game!"],
    [" conquers the game!"]
];


/*----- app's state (variables) -----*/
// 2.1) Board array to represent the squares
let board = [];

// 2.2) Turn variable to remember whose turn it is
let turn; // Player 1 starts (can be either 1 or -1)

// 2.3) Winner variable to represent game status
let winner; // Initially, no winner (can be null for game in play, 1 for player 1 win, -1 for player -1 win, or 'T' for a tie game)

// Span element variable to add color to the span element of class "player"
let playerEls;
//Remember clicked element;
let clickedSquare;

/*----- cached element references -----*/
// 3.1) Store the 9 elements that represent the squares on the page.
const squareEls = document.querySelectorAll('main > div');
// console.log(squareEls);
// Store element to message whose turn it is 
const headerEl = document.getElementById('whose-turn');
// Store btn element to reset the game 
const replayBtn = document.getElementById('replay');

/*----- event listeners -----*/
function handleClick(evt) {

    // update clicked element
    clickedSquare = evt.target;

    // If the board has a value at the index, immediately return
    if (board[parseInt(clickedSquare.id)] !== null) return;
    // If winner is not null, immediately return
    if (winner !== null) return;
    // Update the board array at the index with the value of turn
    board[parseInt(clickedSquare.id)] = turn;
    // Flip turns by multiplying turn by -1
    turn = turn * (-1);
    // Set the winner variable
    winner = getWinner();
    //console.log (winner);

    render();

};

function handleReplay(evt) {
    init();
}

/*----- functions -----*/
function init() {
    // Initialize the board array to 9 nulls to represent empty squares
    board = [null, null, null, null, null, null, null, null, null];

    // Initialize whose turn it is to 1 (player 'X')
    turn = 1;

    // Initialize winner to null to represent that there is no winner or tie yet
    winner = null;

    //set initial message
    headerEl.innerHTML = `It's <span class="player">${colors[turn].toUpperCase()}</span>'s turn`


    squareEls.forEach((square) => {
        square.addEventListener('click', handleClick);
        square.addEventListener('mouseenter', function(evt1) {
            evt1.target.style.borderColor = colors[turn];
            });
        square.addEventListener('mouseleave', function(evt2) {
            evt2.target.style.borderColor = colors[null];
            });
        square.classList.remove('disabled-div');
    })
    replayBtn.addEventListener('click', handleReplay);


    // Render those state variables to the page
    render();
};

function render() {
    renderBoard();
    renderMessage();
    replayBtn.disabled = !winner;
};

function renderBoard() {

    // Loop over each of the 9 elements that represent the squares on the page
    for (let i = 0; i < squareEls.length; i++) {
        // Set the background color of the current element by using the value as a key on the colors lookup object (constant).
        squareEls[i].style.backgroundColor = colors[board[i]];
        if (winner !== null) squareEls[i].classList.add('disabled-div');
        if (board[i] !== null) clickedSquare.classList.add('disabled-div');
    };
};

function renderMessage() {


    if (winner === 'T') {
        // If winner is equal to 'T' (tie), render a tie message
        headerEl.innerText = tieMessages[Math.floor(Math.random() * 8)];
    } else if (winner !== null) {
        // render a congratulatory message to which player has won - use the color name for the player, converting it to uppercase.
        const randomNum = Math.floor(Math.random() * 8);
        headerEl.innerHTML = '<span class="player">' + colors[winner].toUpperCase() + '</span>' + winMessages[randomNum];
        playerEls = document.querySelectorAll(".player");
        playerEls.forEach((player) => {
            player.style.color = colors[board[parseInt(clickedSquare.id)]];
        });
    } else {
        // If winner has a value other than null (game still in progress), render whose turn it is - use the color name for the player, converting it to upper case.
        headerEl.innerHTML = `It's <span class="player">${colors[turn].toUpperCase()}</span>'s turn`
        playerEls = document.querySelectorAll(".player");
        playerEls.forEach((player) => {
            player.style.color = colors[turn];
        });
    }



};

function getWinner() {
    for (let i = 0; i < winningCombinations.length; i++) {
        let total = 0;
        for (let j = 0; j < winningCombinations[i].length; j++) {
            total += board[winningCombinations[i][j]];
            // If the total equals 3, we have a winner! 
            if (Math.abs(total) === 3) return board[winningCombinations[i][0]];
        }
    }
    // Set winner to 'T' if there are no more nulls in the board array
    if (!board.includes(null)) return 'T';
    return null;
}






/*----- Start game -----*/

init();