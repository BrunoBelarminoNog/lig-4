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
const btnRestartGame = document.querySelectorAll('.reset_game');
const btnCloseGame = document.getElementById('btn_close_game')
const btnRanking = document.getElementById('ranking');
const btnCloseRanking = document.getElementById('closeRanking');
const btnCloseCredits = document.getElementById('close_credits');
const containerNamePlayerOneInGame = document.getElementById('player_one_name');
const containerNamePlayerTwoInGame = document.getElementById('player_two_name');
const containerGameWin = document.getElementById('game_win')
const containerGameDraw = document.getElementById('game_draw')
const containerInfo = document.getElementById('info_div')
const containerRanking = document.getElementById('ranking_div')
const containerRankingTimes = document.getElementById('times')
const btnAudio = document.getElementById('audio');
const iconSoundOn = document.getElementById('audio_on');
const iconSoundOff = document.getElementById('audio_off');
const soundGame = document.getElementById('audio_game');
const soundDraw = new Audio("./assets/sounds/DRAW-player-losing-or-failing.wav");
const soundWinner = new Audio("./assets/sounds/WINNER-completion-of-a-level.wav");
const soundBall = new Audio("./assets/sounds/BALL--game-ball-tap.wav");
const containerBio = document.getElementById('bio')
const containerCredits = document.getElementById('credits')
let root = document.querySelector(':root');
let audioTurned = false;

let namePlayerOne
let namePlayerTwo
/* variaveis e constantes */


/* eventos de click */

/* eventos de click */



/* cronometro */
let segundo = 0;
let minuto = 0;
let cronometro;
let timer = 0
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
    timer++
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
  let positionColumn
  for(let column = game_table.length -1; column >= 0; column--){
      if(game_table[row_selected][column] == 0){
          if(first_player_turn){
              game_table[row_selected][column] = "red"
              first_player_turn = false
              arrow_div.classList.add("rotate")
              containerNamePlayerTwoInGame.classList.add('current_player');
              containerNamePlayerOneInGame.classList.remove('current_player');
              root.style.setProperty("--background_color_column_indicator", "#7fe9a8e8");
              positionColumn = column
          }else{
              game_table[row_selected][column] = "blue"
              first_player_turn = true
              arrow_div.classList.remove("rotate")
              containerNamePlayerTwoInGame.classList.remove('current_player');
              containerNamePlayerOneInGame.classList.add('current_player');
              root.style.setProperty("--background_color_column_indicator", "#e79bfa");
              positionColumn = column
          }
          console.log(game_table)
          create_table(row_selected, positionColumn);
          break;
      }
  }
}
/* function revezamento de turno */


/* function armazenar os tempos das partidas e nome dos vencedores */
// records array
let records = []
// records array

//funciton armazenar tempos das vitorias
 function  getTime(){
   let horizontal = checkHorizontal()
   let vertical = checkVertical()
   let diagonal = checkDiagonal()
   let new_winner = new Object()
   if(horizontal || vertical || diagonal){
     clearInterval(cronometro)
     if(!first_player_turn){
       new_winner.name = namePlayerOne
       console.log(timer)
       new_winner.time = timer
     }
     else{
       new_winner.name = namePlayerTwo
       new_winner.time = timer
     }
     return new_winner
    }
 }
 // function armazenar tempos das vitorias

 // function checar se é record
 function isRecord(){
   if(records.length < 3){
      records.push(getTime())
      records.sort((a,b) => a.time - b.time)
   }
   else{
     records.pop()
     records.push(getTime())
     records.sort((a,b) => a.time - b.time) 
   }
   return records
 }
 // function checar se é record
 // function mostrar records
 function printRecords (){
   containerRankingTimes.innerHTML = ''
   let times = [0, 0, 0]
   for(let i = 0; i < records.length; i++){
      let span = document.createElement('span')
      if(records[i].time < 60){
        if(records[i].time < 10){
          times[i] = `00:0${records[i].time}`
        }
        else{
          times[i] = `00:${records[i].time}`
        }
      }
      else{
        let min = records[i]['time'] % 60
        let seg = records[i]['time'] - min * 60
        if(min < 10){
          if(seg < 10){
            times[i] = `0${min}:0${seg}` 
          }
          else{
            times[i] = `0${min}:${seg}`
          }
        }
        else{
          if(seg < 10){
            times[i] = `${min}:0${seg}`
          }
          else{
            times[i] = `${min}:${seg}`
          }
        }
      }
      if(records[i] !== undefined){
        span.innerHTML = '<span>' + `${records[i].name}` + '</span>' + ` - ${times[i]}` 
        containerRankingTimes.appendChild(span)
      }
   }
 }
 // function mostrar records

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
    getTime()
    resetaCronometro()
    isRecord()
    printRecords()
    soundWinner.play()
  }else if(draw){
    containerGamePage.classList.add('hidden');
    containerGameDraw.classList.remove('hidden')
    getTime()
    resetaCronometro()
    isRecord()
    printRecords()
    soundDraw.play()
  }
}



function checkDraw(){
  let control = [false, false, false, false, false, false, false]
  game_table.forEach((element, index) => {
    if(!element.includes(0)){
      control[index] = true;
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
    root.style.setProperty("--background_color_column_indicator", "#e79bfa");
    resetaCronometro();
    create_table()
}
/* function reinicar game */


/* function criar tabela */
function create_table(col, indexCol){

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
                soundBall.play()
                if(column == col && row == indexCol) {
                  div.classList.add('current')
                  column_div.classList.add('current')
                }
            }
            if(game_table[column][row] == "red"){
                div.classList.add("red")
                soundBall.play()
                if(column == col && row == indexCol) {
                  div.classList.add('current')
                  column_div.classList.add('current')
                }
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
        })
        element.addEventListener('mouseout', e => {
            element.classList.remove('current')
        })
    });
    checkWin();
};
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
    containerNamePlayerOneInGame.classList.add('current_player')
    containerNamePlayerTwoInGame.classList.remove('current_player')

    init_game()
    timer = 0
    iniciaCronometro()

    containerHomePage.classList.add('hidden');
    containerGamePage.classList.remove('hidden');

  }
});

btnRestartGame.forEach(e => {
  e.addEventListener('click', e => {
  containerGameDraw.classList.add('hidden')
  containerGameWin.classList.add('hidden')
  containerHomePage.classList.remove('hidden')
})});

btnAjuda.addEventListener('click', () => {
  containerInfo.classList.remove('hidden')
});

btnClose.addEventListener('click', () => {
  containerInfo.classList.add('hidden')
});

btnAudio.addEventListener('click', () => {
  if(audioTurned) {
    iconSoundOff.classList.remove('hidden')
    iconSoundOn.classList.add('hidden')
    audioTurned = false
    soundGame.pause()
  } else {
    iconSoundOff.classList.add('hidden')
    iconSoundOn.classList.remove('hidden')
    audioTurned = true
    soundGame.play()
  }
});
btnRanking.addEventListener('click', () => {
  containerRanking.classList.remove('hidden')
})
btnCloseRanking.addEventListener('click', () => {
  containerRanking.classList.add('hidden')
})

soundGame.volume = 0.2;

containerBio.addEventListener('click', () => {
  containerHomePage.classList.add('hidden')
  containerCredits.classList.remove('hidden')
})

containerBio.addEventListener('mouseenter', () => {
  containerHomePage.classList.remove('hidden')
  containerCredits.classList.add('hidden')
})

btnCloseGame.addEventListener('click', () => {
  containerGamePage.classList.add('hidden');
  containerHomePage.classList.remove('hidden');

  resetaCronometro()
})

btnCloseCredits.addEventListener('click', ()=> {
  containerCredits.classList.add('hidden');
  containerHomePage.classList.remove('hidden');
})

window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});