/* variaveis e constantes */
let game_table = [[0,0,0,0,0,0],
                  [0,0,0,0,0,0],
                  [0,0,0,0,0,0],
                  [0,0,0,0,0,0],
                  [0,0,0,0,0,0],
                  [0,0,0,0,0,0]]
const game_screen = document.getElementById("tabuleiro")
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


init_game()