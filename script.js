const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];  

//Create a fucntion to initailize the game
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    //Also display empty on UI
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    })

    newGameBtn.classList.remove("active");
    gameInfo.innerText =`Current Player - ${currentPlayer}`;
} 
initGame();

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
})

function swapTurn(){
    if(currentPlayer === 'X') currentPlayer = 'O';
    else currentPlayer = 'X';

    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    // newGameBtn.classList.add("active");
    let answer = "";
    winningPositions.forEach((index) => {
        if((gameGrid[index[0]]=="X"&&gameGrid[index[1]]=="X"&&gameGrid[index[2]]=="X")||(gameGrid[index[0]]=="O"&&gameGrid[index[1]]=="O"&&gameGrid[index[2]]=="O")){
            
            if(gameGrid[index[0]] === 'X') answer = "X";
            else answer = "O";

            //Disable pointer
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })
            
            boxes[index[0]].classList.add('win');
            boxes[index[1]].classList.add('win');
            boxes[index[2]].classList.add('win');
        }
    })
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //Check for a tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "") fillCount++;
    });
    
    if(fillCount === 9){
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
    }
}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //Swap Turn
        swapTurn();

        checkGameOver();
    }
}

newGameBtn.addEventListener("click", initGame);