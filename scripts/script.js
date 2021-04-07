/* variaveis e constantes */
let game_table = []
const game_screen = document.getElementById("tabuleiro")
let first_player_turn = true

const containerHomePage = document.getElementById('initial');
const containerGamePage = document.getElementById('game');
const inputPlayerOne = document.getElementById('player_one');
const inputPlayerTwo = document.getElementById('player_two');
const btnStartGame = document.getElementById('submit_game');
const btnAjuda = document.getElementById('info');
const btnClose = document.getElementById('close');
const btnRestartGame = document.querySelector('.reset_game');
const btnRanking = document.getElementById('ranking');
const containerNamePlayerOneInGame = document.getElementById('player_one_name');
const containerNamePlayerTwoInGame = document.getElementById('player_two_name');
const containerGameWin = document.getElementById('game_win')
const containerGameDraw = document.getElementById('game_draw')
const containerInfo = document.getElementById('info_div')
const containerRanking = document.getElementById('ranking_div')
const btnSoundOn = document.getElementById('audio_on');
const btnSoundOff = document.getElementById('audio_off');
const soundGame = document.getElementById('audio_game');
const soundDraw = new Audio("./assets/sounds/DRAW-player-losing-or-failing.wav");
const soundWinner = new Audio("./assets/sounds/WINNER-completion-of-a-level.wav");
const soundBall = new Audio("./assets/sounds/BALL--game-ball-tap.wav");
let root = document.querySelector(':root');

let namePlayerOne
let namePlayerTwo
/* variaveis e constantes */


/* eventos de click */

/* eventos de click */

// function effectsSounds(effect) {
//   if (!btnSoundOn) {
//     soundOn.play();
//   }

//   if (effect === "ball") {
//     soundBall.play()
//   } else if (effect === "draw") {
//       soundDraw.play()
//   } else if (effect === "win") {
//       soundWinner.play()
//   }
// }


/* cronometro */
let segundo = 0;
let minuto = 0;
let cronometro;

function iniciaCronometro() {
    clearInterval(cronometro)
    cronometro = setInterval(() => { temp(); }, 1000);
}

function resetaCronometro() {
    clearInterval(cronometro);
    minuto = 0;
    segundo = 0;

    document.getElementById('cronometro').innerText = '00:00';
}

function temp() {
    segundo++

    if (segundo == 60) {
        segundo = 0
        minuto++
    }

    let saida = (minuto < 10 ? '0' + minuto : minuto) + ':' + (segundo < 10 ? '0' + segundo : segundo);
   
    document.getElementById("cronometro").innerText = saida;

    return saida;
}
/* cronometro */

/* function revezamento de turno */
function put_piece(row_selected){
  let arrow_div = document.getElementById("players")
  for(let column = game_table.length -1; column >= 0; column--){
      if(game_table[row_selected][column] == 0){
          if(first_player_turn){
              game_table[row_selected][column] = "blue"
              first_player_turn = false
              arrow_div.classList.add("rotate")
              root.style.setProperty("--background_color_column_indicator", "red");
          }else{
              game_table[row_selected][column] = "red"
              first_player_turn = true
              arrow_div.classList.remove("rotate")
              root.style.setProperty("--background_color_column_indicator", "blue");
          }
          console.log(game_table)
          create_table();
          break;
      }
  }
}
/* function revezamento de turno */


/* function armazenar os tempos das partidas e nome dos vencedores */
/* criando objeto que armazena os 3 melhores tempos */
class ranking {
  constructor(player){
    this.name = player
    this.bestTime = []
  }
}
let playerOne = new ranking(namePlayerOne)
let playerTwo = new ranking(namePlayerTwo)
/* criando objeto que armazena os 3 melhores tempos */
function storageTimes(){
  let vertical = checkVertical()
  let horizontal = checkHorizontal()
  let diagonal = checkDiagonal()
  if(vertical || horizontal || diagonal){
    let time = temp()
    console.log(time)
    if(!first_player_turn){
      playerOne['name'] = namePlayerOne
      if(playerOne['bestTime'].length < 3){
        playerOne['bestTime'].push(time)
      }
      else{
        playerOne['bestTime'].pop()
        playerOne['bestTime'].push(time)
      }
    }
    else{
      playerTwo['name'] = namePlayerTwo
      if(playerTwo['bestTime'].length < 3){
        playerTwo['bestTime'].push(time)
      }
      else{
        playerTwo['bestTime'].pop()
        playerTwo['bestTime'].push(time)
      }
    }
  }
  console.log(playerOne)
}
/* function armazenar os tempos das partidas e nome dos vencedores */


/* function verificar resultado da partida */ 
function checkVertical() {
  let output = false;
  for (let row = 0; row < game_table.length; row++) {
    for (let col = 3; col < game_table[row].length; col++) {
      if (
        game_table[row][col - 3] === game_table[row][col - 2] &&
        game_table[row][col - 2] === game_table[row][col - 1] &&
        game_table[row][col - 1] === game_table[row][col] &&
        game_table[row][col] !== 0
      ) {
        output = true;
      }
    }
  }
  return output;
}
function checkHorizontal() {
  let output = false;
  for (let row = 3; row < game_table.length; row++) {
    for (let col = 0; col < game_table[0].length; col++) {
      if (
        game_table[row - 3][col] === game_table[row - 2][col] &&
        game_table[row - 2][col] === game_table[row - 1][col] &&
        game_table[row - 1][col] === game_table[row][col] &&
        game_table[row][col] !== 0
      ) {
        output = true;
      }
    }
  }
  return output;
}
function checkDiagonal() {
  let output = false;
  for (let row = 3; row < game_table.length; row++) {
    for (let col = 3; col < game_table[0].length; col++) {
      if (
        game_table[row - 3][col - 3] === game_table[row - 2][col - 2] &&
        game_table[row - 2][col - 2] === game_table[row - 1][col - 1] &&
        game_table[row - 1][col - 1] === game_table[row][col] &&
        game_table[row - 3][col - 3] !== 0
      ) {
        output = true;
      }
    }
  }
  for(let row = 3; row < game_table.length; row++){
    for(let col = game_table[0].length; col >= 0; col--){
      if (
        game_table[row - 3][col] === game_table[row - 2][col - 1] &&
        game_table[row - 2][col - 1] === game_table[row - 1][col - 2] &&
        game_table[row - 1][col - 2] === game_table[row][col - 3] && game_table[row -3][col]
        ) {
          output = true;
        }
      
    }
  }
  return output;
}
function checkWin(){
  let vertical = checkVertical()
  let horizontal = checkHorizontal()
  let diagonal = checkDiagonal()
  let draw = checkDraw()
  let result = document.getElementById('game_win_player')
  if((vertical || horizontal || diagonal) === true){
    result.innerHTML = ''
    if(!first_player_turn){
      result.innerHTML = `${namePlayerOne}`
    }
    else{
      result.innerHTML = `${namePlayerTwo}`
    }
    containerGamePage.classList.add('hidden');
    containerGameWin.classList.remove('hidden')
  }
  if(draw){
    containerGamePage.classList.add('hidden');
    containerGameDraw.classList.remove('hidden')
  }
  storageTimes()
}

function checkDraw(){
  let control = [false, false, false, false, false, false, false]
  game_table.forEach((element, index) => {
    if(!element.includes(0)){
      control[index] = true
    }
  })
  return control.includes(false) ? false : true
}
/* function verificar resultado da partida */ 


/* function reinicar game */
function init_game(){
    game_table = [[0,0,0,0,0,0],
                  [0,0,0,0,0,0],
                  [0,0,0,0,0,0],
                  [0,0,0,0,0,0],
                  [0,0,0,0,0,0],
                  [0,0,0,0,0,0],
                  [0,0,0,0,0,0]]
    first_player_turn = true
    root.style.setProperty("--background_color_column_indicator", "blue");
    create_table()
}
/* function reinicar game */


/* function criar tabela */
function create_table(){
    game_screen.innerHTML = ``
    for(let column in game_table){
        column_div = document.createElement("div")
        column_div.dataset.column_value = column.toString();
        column_div.classList.add("column")
        for(let row in game_table[column]){
            let div = document.createElement("div");
            if(game_table[column][row] == 0){
                div.classList.add("empty")
            }
            if(game_table[column][row] == "blue"){
                div.classList.add("blue")
            }
            if(game_table[column][row] == "red"){
                div.classList.add("red")
            }
            column_div.appendChild(div)
        }
        game_screen.appendChild(column_div)
    }
    let slots = document.querySelectorAll(".column")
    slots.forEach(element => {
        element.addEventListener("click", e =>{
            let column_selected = element.dataset.column_value
            put_piece(column_selected)
            iniciaCronometro()
        })
    });
    checkWin()
}
/* function criar tabela */


btnStartGame.addEventListener('click', (event) => {
  if(inputPlayerOne.value === "" || inputPlayerTwo.value === "") {
    event.preventDefault()
    alert('Preencha o campo de nomes')
  } else{
    namePlayerOne = inputPlayerOne.value;
    namePlayerTwo = inputPlayerTwo.value;
  
    inputPlayerOne.value = ""
    inputPlayerTwo.value = ""
  
    containerNamePlayerOneInGame.innerHTML = `${namePlayerOne}`;
    containerNamePlayerTwoInGame.innerHTML = `${namePlayerTwo}`;
  
    init_game()
  
    containerHomePage.classList.add('hidden');
    containerGamePage.classList.remove('hidden');

  }
})

btnRestartGame.addEventListener('click', ()=> {
  containerGameWin.classList.add('hidden')
  containerGameDraw.classList.add('hidden')
  containerHomePage.classList.remove('hidden')
})

btnAjuda.addEventListener('click', () => {
  containerInfo.classList.remove('hidden')
})

btnClose.addEventListener('click', () => {
  containerInfo.classList.add('hidden')
})

btnSoundOn.addEventListener('click', () => {
  btnSoundOff.classList.remove('hidden')
  btnSoundOn.classList.add('hidden')
  soundGame.pause()
})

btnSoundOff.addEventListener('click', () => {
  btnSoundOn.classList.remove('hidden')
  btnSoundOff.classList.add('hidden')
  soundGame.play()
})
