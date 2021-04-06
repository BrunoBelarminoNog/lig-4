/* variaveis e constantes */
let game_table = [[0,0,0,0,0,0],
                  [0,0,0,0,0,0],
                  [0,0,0,0,0,0],
                  [0,0,0,0,0,0],
                  [0,0,0,0,0,0],
                  [0,0,0,0,0,0],
                  [0,0,0,0,0,0]]
const game_screen = document.getElementById("tabuleiro")
let first_player_turn = true

const containerHomePage = document.getElementById('initial');
const containerGamePage = document.getElementById('game');
const inputPlayerOne = document.getElementById('player_one');
const inputPlayerTwo = document.getElementById('player_two');
const btnStartGame = document.getElementById('submit_game');
const containerNamePlayerOneInGame = document.getElementById('player_one_name');
const containerNamePlayerTwoInGame = document.getElementById('player_two_name');
let root = document.querySelector(':root');

let namePlayerOne
let namePlayerTwo
/* variaveis e constantes */


/* eventos de click  */

/* eventos de click  */


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


/* function verificar ou bloquear movimento em coluna cheia */

/* function verificar ou bloquear movimento em coluna cheia */


/* function verificar resultado da partida */ 
function checkHorizontal() {
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
function checkVertical() {
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
  let result = document.createElement('h1')
  if((vertical || horizontal || diagonal) === true){
    if(first_player_turn){
      result.innerText = `${namePlayerOne}`
    }
    else{
      result.innerText = `${namePlayerTwo}`
    }
    document.getElementById('game_win').appendChild(result)
    containerGamePage.classList.add('hidden');
    document.getElementById('game_win').classList.remove('hidden')
  }
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
        })
    });
    checkWin()
}
/* function criar tabela */


btnStartGame.addEventListener('click', (event) => {
  if(inputPlayerOne.value === "" || inputPlayerTwo.value === "") {
    event.preventDefault()
    alert('Preencha o campo de nomes')
  }

  namePlayerOne = inputPlayerOne.value;
  namePlayerTwo = inputPlayerTwo.value;

  inputPlayerOne.value = ""
  inputPlayerTwo.value = ""

  containerNamePlayerOneInGame.innerHTML = `${namePlayerOne}`;
  containerNamePlayerTwoInGame.innerHTML = `${namePlayerTwo}`;

  init_game()

  containerHomePage.classList.add('hidden');
  containerGamePage.classList.remove('hidden');
})