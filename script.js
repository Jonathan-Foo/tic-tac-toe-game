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
let playerOne = {}
let playerTwo = {}


function beginPvPGame() {
    if (pvpFormInputs.every(input => input.validity.valid !== false)) {
        pvpModal.classList.toggle('active')
        gameScreen.classList.toggle('active')
        playerOneCreator(pvpFormInputs[0].value)
        playerTwoCreator(pvpFormInputs[1].value)
    } else {
        pvpForm.reportValidity()
        return 
    }
}

const playerOneCreator = (name) => {playerOne = {name: name, playerNumber: 'one', symbol: 'X'}}

const playerTwoCreator = (name) => {playerTwo = {name: name, playerNumber: 'two', symbol: 'O'}}


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
    let leftColumnWin = gameBoard[0][0] !== '' && gameBoard.every(array => array[0] == gameBoard[0][0]) 
    let midColumnWin = gameBoard[0][1] !== '' && gameBoard.every(array => array[1] == gameBoard[0][1])
    let rightColumnWin = gameBoard[0][2] !== '' && gameBoard.every(array => array[2] == gameBoard[0][2])
    
    if (leftColumnWin || midColumnWin || rightColumnWin) {
        console.log('vertical win')
    } else {
        return 
    }
} 

function horizontalWinCheck() {
    let topRowWin = gameBoard[0][0] !== '' && gameBoard[0][0] == gameBoard[0][1] && gameBoard[0][1] == gameBoard[0][2]
    let midRowWin = gameBoard[0][0] !== '' && gameBoard[0][0] == gameBoard[0][1] && gameBoard[0][1] == gameBoard[0][2]
    let bottomRowWin = gameBoard[0][0] !== '' && gameBoard[0][0] == gameBoard[0][1] && gameBoard[0][1] == gameBoard[0][2]
    if (topRowWin || midRowWin || bottomRowWin) {
        console.log("horizontal win")
    } else {
        return 
    }
}

function diagonalWinCheck() {
    let diagonalOne = gameBoard[0][0] !== '' && gameBoard[0][0] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][2] 
    let diagonalTwo = gameBoard[0][2] !== '' && gameBoard[0][2] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][0] 
    if (diagonalOne || diagonalTwo) {
        console.log('diagonal win')
    } else {
        return
    }
}



// CLICKING ON TITLE TRIGGER A SYMBOL TO BE DISPLAYED 
let currentSymbol = 'X'
const tiles = [...document.querySelectorAll('.tile')]
// let turns = 0
// CONNECT CLICK TO GAMEBOARD ARRAY
tiles.forEach(tile => tile.addEventListener('click', () => {
    const indexA = tile.dataset.indexa
    const indexB = tile.dataset.indexb
    if (gameBoard[indexA][indexB] == '') {
        tile.innerHTML = currentSymbol
        gameBoard[indexA][indexB] = tile.innerHTML
        switchSymbol(currentSymbol)
       
        checkWinner()
    } else {
        return
    }

}))



function switchSymbol(symbol) {
     return symbol == 'X' ? currentSymbol = 'O' : currentSymbol = 'X'
}


