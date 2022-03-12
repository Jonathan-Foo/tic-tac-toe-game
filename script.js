//STARTING SCREEN TRANSITION
const pvpBtn = document.querySelector('.pvp-button')
const pveBtn = document.querySelector('.pve-button')
const logo = document.querySelector('.logo')
const pvpModal = document.querySelector('.pvp-modal')
const pveModal = document.querySelector('.pve-modal')
const buttonContainer = document.querySelector('.button-container')
const gameScreen = document.querySelector('.game-screen')


pvpBtn.addEventListener('click', () => {
    startScreenTransition()
    pvpModal.classList.toggle('active')
})

pveBtn.addEventListener('click', () => {
    startScreenTransition()
    pveModal.classList.toggle('active')
})

function startScreenTransition() {
    logo.classList.toggle('active')
    buttonContainer.classList.toggle('active')
}

// PVP FORM

const beginGameBtn = pvpModal.querySelector('.pvp-begin-btn')

beginGameBtn.addEventListener('click', () => beginPvPGame())

const pvpForm = document.querySelector('.pvp-form')
const pvpFormInputs = [...pvpForm.querySelectorAll('input')];
const turnDeclarer = document.querySelector('.turn-declare') 
let playerOne = {}
let playerTwo = {}
let currentPlayer = {}
let nextPlayer = {}
const playerOneCreator = (name) => {playerOne = {name: name, playerNumber: 'one', symbol: 'X'}}
const playerTwoCreator = (name) => {playerTwo = {name: name, playerNumber: 'two', symbol: 'O'}}

function beginPvPGame() {
    if (pvpFormInputs.every(input => input.validity.valid !== false)) {
        pvpModal.classList.toggle('active')
        gameScreen.classList.toggle('active')
        playerOneCreator(pvpFormInputs[0].value)
        playerTwoCreator(pvpFormInputs[1].value)
        turnDeclarer.innerHTML = `${playerOne.name}'s turn`
        currentPlayer = playerOne
        nextPlayer = playerTwo
        
    } else {
        pvpForm.reportValidity()
        return 
    }
}




//PVE FORM 
const beginPvEGameBtn = pveModal.querySelector('.pve-begin-btn')

beginPvEGameBtn.addEventListener('click', () => beginPvEGame())

function beginPvEGame() {
    const pveForm = document.querySelector('.pve-form')
    const pveFormInput = pveForm.querySelector('input');

    if (pveFormInput.validity.valid !== false) {
        pvpModal.classList.toggle('active')
        gameScreen.classList.toggle('active')
        playerOneCreator(pvpFormInputs[0].value)
        
    } else {
        pveForm.reportValidity()
        return 
    }
}





// GAMESCREEN    
const gameOverScreen =  document.querySelector('.game-over-screen')
const congratulations = document.querySelector('.congratulations')

function gameOverTransition() {
    gameOverScreen.classList.toggle('active')
    logo.classList.toggle('disappear')
    turnDeclarer.classList.toggle('active')
    gameScreen.style.pointerEvents = 'none'
}

function declareWinner() {
    congratulations.innerHTML = `Congratulations ${nextPlayer.name} Won!`
    gameOverTransition()
}

function checkForTie() {
    let fullHouse = gameBoard.every(array => array[0] !== '' && array[1] !== '' && array[2] !== '')
    if (fullHouse && checkWinner() === false) {
        congratulations.innerHTML = `It's A Tie Game!`
        gameOverTransition()
    } else {
        return
    }
}

// CHECKING FOR WINS 
let gameBoard = [['','', ''],
                [ '', '', ''], 
                ['', '', '']] 


// WINNER CHECK
function checkWinner() {
        verticalWinCheck() 
        horizontalWinCheck()
        diagonalWinCheck()
        return false 
    
}


function verticalWinCheck() {
    let leftColumnWin = gameBoard[0][0] !== '' && gameBoard.every(array => array[0] == gameBoard[0][0]) 
    let midColumnWin = gameBoard[0][1] !== '' && gameBoard.every(array => array[1] == gameBoard[0][1])
    let rightColumnWin = gameBoard[0][2] !== '' && gameBoard.every(array => array[2] == gameBoard[0][2])
    
    if (leftColumnWin || midColumnWin || rightColumnWin) {
        declareWinner()
    } else {
        return false 
    }
} 

function horizontalWinCheck() {
    let topRowWin = gameBoard[0][0] !== '' && gameBoard[0][0] == gameBoard[0][1] && gameBoard[0][1] == gameBoard[0][2]
    let midRowWin = gameBoard[1][0] !== '' && gameBoard[1][0] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[1][2]
    let bottomRowWin = gameBoard[2][0] !== '' && gameBoard[2][0] == gameBoard[2][1] && gameBoard[2][1] == gameBoard[2][2]
    if (topRowWin || midRowWin || bottomRowWin) {
        declareWinner()
    } else {
        return false
    }
}

function diagonalWinCheck() {
    let diagonalOne = gameBoard[0][0] !== '' && gameBoard[0][0] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][2] 
    let diagonalTwo = gameBoard[0][2] !== '' && gameBoard[0][2] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][0] 
    if (diagonalOne || diagonalTwo) {
        declareWinner()
    } else {
        return false 
    }
}

//player screen
let currentSymbol = 'X'
const tiles = [...document.querySelectorAll('.tile')]

function switchSymbol(symbol) {
     symbol == 'X' ? currentSymbol = 'O' : currentSymbol = 'X'
}

function switchCurrentPlayer(player) {
    if (player == playerOne) {
        currentPlayer = playerTwo
        nextPlayer = playerOne
    } else {
        currentPlayer = playerOne
        nextPlayer = playerTwo
    }
}

function switchTurnDeclareName(player) {
    return turnDeclarer.innerHTML = `${player.name}'s turn`
}

// CLICK EVENT TRIGGERS
tiles.forEach(tile => tile.addEventListener('click', () => {
    const indexA = tile.dataset.indexa
    const indexB = tile.dataset.indexb
    if (gameBoard[indexA][indexB] == '') {
        tile.innerHTML = currentSymbol
        gameBoard[indexA][indexB] = tile.innerHTML
        switchCurrentPlayer(currentPlayer)
        switchTurnDeclareName(currentPlayer) 
        switchSymbol(currentSymbol)
        checkForTie()
        checkWinner()
    } else {
        return
    }

}))

// GAME OVER 
const newGame = document.querySelector('.start-game-btn')
const restartBtn = document.querySelector('.restart-btn')

newGame.addEventListener('click', () => {
    logo.classList.toggle('disappear')
    startScreenTransition()
    gameScreen.classList.toggle('active')
    gameOverScreen.classList.toggle('active')
    turnDeclarer.classList.toggle('active')
    pvpFormInputs.forEach(input => input.value = '') 
    gameScreen.style.pointerEvents = 'all'
    clearData()
})

restartBtn.addEventListener('click', () => {
    logo.classList.toggle('disappear')
    gameOverScreen.classList.toggle('active')
    turnDeclarer.classList.toggle('active')
    gameScreen.style.pointerEvents = 'all'
    gameBoard = [['','', ''],[ '', '', ''], ['', '', '']]
    tiles.forEach(tile => tile.innerHTML = '')
    currentPlayer = playerOne
    nextPlayer = playerTwo
    currentSymbol = 'X'
    turnDeclarer.innerHTML = `${playerOne.name}'s turn`

})


function clearData() {
    gameBoard = [['','', ''],[ '', '', ''], ['', '', '']]
    tiles.forEach(tile => tile.innerHTML = '')
    playerOne = {}
    playerTwo = {}
    currentPlayer = {}
    nextPlayer = {}
    currentSymbol = 'X'
}