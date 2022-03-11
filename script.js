



// CHECKING FOR WINS 
const gameBoard = [['','', ''],
                [ '', '', ''], 
                ['', '', '']] 



// WINNER CHECK
function checkWinner() {
    verticalWinCheck() 
    horizontalWinCheck()
    diagonalWinCheck()
}

function verticalWinCheck() {
    gameBoard.every(array => array[0] == gameBoard[0][0] )
    gameBoard.every(array => array[1] == gameBoard[0][1] )
    gameBoard.every(array => array[2] == gameBoard[0][2] )
} 

function horizontalWinCheck() {
    gameBoard.map(array => array[0] == array[1] && array[1] == array[2])
}

function diagonalWinCheck() {
    gameBoard[0][0] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][2] 
    gameBoard[0][2] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][0] 
}



// CLICKING ON TITLE TRIGGER A SYMBOL TO BE DISPLAYED 
let currentSymbol = 'X'
const tiles = [...document.querySelectorAll('.tile')]
// CONNECT CLICK TO GAMEBOARD ARRAY
tiles.forEach(tile => tile.addEventListener('click', () => {
    const indexA = tile.dataset.indexa
    const indexB = tile.dataset.indexb
    tile.innerHTML = currentSymbol
    gameBoard[indexA][indexB] = tile.innerHTML
    console.log(gameBoard)
    switchSymbol(currentSymbol)
}))



function switchSymbol(symbol) {
     return symbol == 'X' ? currentSymbol = 'O' : currentSymbol = 'X'
}


