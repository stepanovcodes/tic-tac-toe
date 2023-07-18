/*----- constants -----*/
const colors = {
    null: 'white',
    '1': 'red',
    '-1': 'blue'
  };

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


/*----- app's state (variables) -----*/
// 2.1) Board array to represent the squares
let board = [];

// 2.2) Turn variable to remember whose turn it is
let turn; // Player 1 starts (can be either 1 or -1)

// 2.3) Winner variable to represent game status
let winner; // Initially, no winner (can be null for game in play, 1 for player 1 win, -1 for player -1 win, or 'tie' for a tie game)

/*----- cached element references -----*/
const squareEls = document.querySelectorAll('main > div');
// console.log(squareEls);
const headerEl = document.getElementById('whose-turn');
const resetBtn = document.getElementById('reset');


/*----- event listeners -----*/
function handleClick(evt) {
    //console.dir(evt.target);
    const clickedSquare = evt.target; 
    //console.log(board[parseInt(clickedSquare.id)],clickedSquare.id);
    if (board[parseInt(clickedSquare.id)] !== null) return;
    if (winner !== null) return;

    board[parseInt(clickedSquare.id)] = turn;
    turn = turn * (-1);

    winner = getWinner();
    //console.log (winner);
    
    render();
};

function handleReset(evt) {
    init();
}

/*----- functions -----*/
function init () {
    board = [null, null, null, null, null, null, null, null, null];
    turn = 1;
    winner = null;

    render();

    squareEls.forEach((square) => {
        square.addEventListener('click', handleClick);
    })
    resetBtn.addEventListener('click', handleReset);
};

function render () {
    renderBoard ();
    renderMessage();
};

function renderBoard () {
    // console.log(squareEls.length);
for(let i = 0; i < squareEls.length; i++) {
    squareEls[i].style.backgroundColor = colors[board[i]];
    //console.log(colors[board[i]]);
};
};

function renderMessage () {
    if (winner === 'T') {
        headerEl.innerText = 'It Is a Tie!';
        return;
    } else if (winner !== null) {
        headerEl.innerText = `Congrats! ${colors[winner].toUpperCase()} Won!`
        return;
    } else {
        headerEl.innerText = `${colors[turn].toUpperCase()}'s Turn`
    }
};

function getWinner() {
    for (let i = 0; i<winningCombinations.length;i++) {
    let total = 0;
        for (let j = 0;j<winningCombinations[i].length;j++) {
            total += board[winningCombinations[i][j]];
            if (Math.abs(total)===3) return board[winningCombinations[i][0]];
        }
    }
    if (!board.includes(null)) return'T';
    return null;
}




/*----- Start game -----*/

init ();