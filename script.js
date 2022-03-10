



// CHECKING FOR WINS 
const gameBoard = [['X','X', 'X'],
                [ 'X', 'X', 'O'], 
                ['', '', 'X']] 


// CHECK FOR HORIZONTAL WIN
console.log(gameBoard.map(array => array[0] == array[1] && array[1] == array[2]))

// CHECK FOR VERTICAL WIN ONLY IF gameBoard[0].first/second/third do not equal 0
console.log(gameBoard.every( v => v[0] == gameBoard[0][0] ))
console.log(gameBoard.every( v => v[1] == gameBoard[0][1] ))
console.log(gameBoard.every( v => v[2] == gameBoard[0][2] ))

// CHECK FOR DIAGONAL WINS
console.log(gameBoard[0][0] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][2] )
console.log(gameBoard[0][2] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][0] )

