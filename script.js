const board = document.getElementById("board");
const diceEl = document.getElementById("dice");
const turnText = document.getElementById("turn");
const coinsEl = document.getElementById("coins");

const diceSound = document.getElementById("diceSound");
const moveSound = document.getElementById("moveSound");
const winSound = document.getElementById("winSound");

let coins = 1000;
let playerTokens = [0,0,0,0];
let aiTokens = [0,0,0,0];
let playerTurn = true;
let pathLength = 56;

let cells=[];

// Create 15x15 board
for(let i=0;i<225;i++){
  let cell=document.createElement("div");
  cell.classList.add("cell");
  board.appendChild(cell);
  cells.push(cell);
}

updateBoard();

function rollDice(){
  if(!playerTurn) return;

  diceEl.classList.add("roll");
  diceSound.play();

  setTimeout(()=>{
    diceEl.classList.remove("roll");

    let dice=Math.floor(Math.random()*6)+1;
    diceEl.innerText=dice;

    moveToken(playerTokens,dice,true);

    playerTurn=false;
    turnText.innerText="AI Turn";
    setTimeout(aiMove,1000);

  },600);
}

function moveToken(tokens,dice,isPlayer){
  tokens[0]+=dice;
  if(tokens[0]>=pathLength){
    winSound.play();
    alert(isPlayer?"You Win 🎉":"AI Wins 🤖");
    coins += isPlayer?200:-100;
    coinsEl.innerText=coins;
    resetGame();
  }
  moveSound.play();
  updateBoard();
}

function aiMove(){
  let dice=Math.floor(Math.random()*6)+1;
  diceEl.innerText=dice;
  moveToken(aiTokens,dice,false);
  playerTurn=true;
  turnText.innerText="Your Turn";
}

function updateBoard(){
  cells.forEach(c=>c.innerHTML="");

  let p=playerTokens[0];
  let a=aiTokens[0];

  if(p<cells.length){
    let t=document.createElement("div");
    t.classList.add("token","red","move");
    cells[p].appendChild(t);
  }

  if(a<cells.length){
    let t=document.createElement("div");
    t.classList.add("token","blue","move");
    cells[a].appendChild(t);
  }
}

function resetGame(){
  playerTokens=[0,0,0,0];
  aiTokens=[0,0,0,0];
  playerTurn=true;
  turnText.innerText="Your Turn";
  updateBoard();
}
