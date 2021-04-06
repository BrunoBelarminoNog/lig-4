/* variaveis e constantes */
let game_table = [[0,0,0,0,0,0],
                  [0,0,0,0,0,0],
                  [0,0,0,0,0,0],
                  [0,0,0,0,0,0],
                  [0,0,0,0,0,0],
                  [0,0,0,0,0,0],
                  [0,0,0,0,0,0]]
const game_screen = document.getElementById("game")
let first_player_turn = true
/* variaveis e constantes */


/* eventos de click  */

/* eventos de click  */


/* function revezamento de turno */
function put_piece(row_selected){
    for(let column = game_table.length -1; column >= 0; column--){
        if(game_table[row_selected][column] == 0){
            if(first_player_turn){
                game_table[row_selected][column] = "blue"
                first_player_turn = false
            }else{
                game_table[row_selected][column] = "red"
                first_player_turn = true
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
  let game_table = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1],
    [0, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 1],
    [0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0]
  ];
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
      if (
        game_table[row - 3][col] === game_table[row - 2][col - 1] &&
        game_table[row - 2][col - 1] === game_table[row - 1][col - 2] &&
        game_table[row - 1][col - 2] === game_table[row][col - 3] &&
        game_table[row - 3][col - 3] !== 0
      ) {
        output = true;
      }
      console.log(row - 3, col - 3);
      // console.log(row, col)
    }
  }
  console.log(
    game_table[1][5] === game_table[2][4] &&
      game_table[2][4] === game_table[3][3] &&
      game_table[3][3] === game_table[4][2]
  );
  console.log(game_table[1][5]);
  console.log(game_table[2][4]);
  console.log(game_table[3][3]);
  console.log(game_table[4][2]);
  console.log(output);
}
checkDiagonal();
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
}
/* function criar tabela */
