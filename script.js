/* variaveis e constantes */
let game_table = [[0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0]]
let first_player_turn = true
/* variaveis e constantes */


/* eventos de click  */

/* eventos de click  */


/* function revezamento de turno */

/* function revezamento de turno */


/* function verificar ou bloquear movimento em coluna cheia */

/* function verificar ou bloquear movimento em coluna cheia */


/* function verificar resultado da partida */ 

/* function verificar resultado da partida */ 


/* function reinicar game */
function init_game(){
    game_table = [[0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0]]
    create_table()
}
/* function reinicar game */


/* function criar tabela */
function create_table(){
    game_screen.innerHTML = ``
    for(let row in game_table){
        row_div = document.createElement("div")
        row_div.classList.add("row")
        for(let column in game_table[row]){
            let div = document.createElement("div");
            div.dataset.column_value = column.toString();
            div.dataset.row_value = row.toString();
            if(game_table[row][column] == 0){
                div.classList.add("empty")
            }
            if(game_table[row][column] == "blue"){
                div.classList.add("blue")
            }
            if(game_table[row][column] == "red"){
                div.classList.add("red")
            }
            row_div.appendChild(div)
        }
        game_screen.appendChild(row_div)
    }
    let slots = document.querySelectorAll(".empty")
    slots.forEach(element => {
        element.addEventListener("click", e =>{
            let column_selected = element.dataset.column_value
            put_piece(column_selected)
        })
    });
}
/* function criar tabela */