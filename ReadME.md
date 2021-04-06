<em>05 - Entrega: Lig-4 (em equipe)</em>

<h1>Entrega: Lig-4</h1>

No Lig-4, um jogador assume a cor Vermelha e o outro assume a cor Preta. Os jogadores se alternam inserindo suas peças em uma das 7 colunas de uma <strong>tabela 7x6</strong>. O primeiro jogador que conseguir <strong>quatro</strong> de suas peças em uma linha (seja horizontal, vertical ou diagonal) vence.

No mundo físico, a tabela é colocada perpendicular à mesa, de forma que as peças caiam para a parte de baixo e se empilhem umas em cima das outras. Sua versão digital do jogo deve manter esta característica (a animação de queda é opcional).

O jogo pode terminar em empate quando todas as células estiverem preenchidas e nenhum jogador conseguir quatro peças em linha.

![exemplo](./img/example1.gif)

Implemente o Lig-4 usando HTML, CSS e JavaScript. Em cada partida, os jogadores estarão usando o mesmo teclado & mouse, alternando seus turnos.

<h2>Detalhes do Envio</h2>

Vocês trabalharão <strong>em grupos</strong> para completar sua implementação do Lig-4. Vocês devem codificar individualmente, mas podem trabalhar juntos para construir o layout e a funcionalidade do jogo.

Como membro de um grupo, você terá que atingir uma certa expectativa de desempenho. Seu desempenho será avaliado pelos outros membros do grupo, então tente contribuir igualmente com o projeto! Você pode ler mais aqui: [Guidelines for Individuals on a Team](https://docs.google.com/document/d/1SmfHAwjDHVRmcXyoF1LsWU5OpOC6ok5L-1sKakPQJjM/edit) (em inglês)

<strong>O líder do projeto fará o envio do mesmo.</strong> Este será um projeto que você colocará em seu portfólio, então faça-o bonito e use a função do GitLab Pages para hospedar o jogo concluído para que qualquer um possa jogar.

<h2>Dicas</h2>

Se você não estiver se sentindo seguro de como começar, aqui vão algumas etapas para você ir incrementando:

<ol>
<li>Exiba um disco preto ou vermelho.</li>
<li>Empilhe discos vermelhos e pretos em uma coluna usando um layout de caixa flex.</li>
<li>Exiba um tabuleiro completo consistindo de 7 colunas.</li>
<li>Configure uma função de handler de clique para cada coluna que adiciona um disco.</li>
<li>Reveze os turnos! Mude a cor do próximo disco após um disco ser adicionado.</li>
<li>Registre a cor dos discos em cada posição do tabuleiro. Você deve ser capaz de fazer o debug via console.log() depois de cada movimento mostrando o estado do tabuleiro.</li>
<li>Após encher uma coluna (6 discos), não permita que mais discos sejam adicionados.</li>
<li>Verifique se o último disco adicionado completou uma linha de quatro peças na coluna (verticalmente).</li>
<li>Verifique se o último disco adicionado completou uma linha de quatro peças horizontalmente.</li>
<li>Verifique se o último disco adicionado completou uma linha de quatro peças em uma diagonal descendente ou ascendente.</li>
</ol>

<h2>Exemplo</h2>

Aqui está uma captura de tela de uma implementação concluída, mas sem a estilização chique.

![exemplo](./img/example.png)

<h2>Envio</h2>

Faça o push e implemente seu código no Gitlab. Adicione grupo <em>ka-br-<sua-turma>-correcoes</em> como membro do seu projeto com a permissão "Reporter", e envie a url do seu gitlab pages (Ex: https://nomedeusuario.gitlab.io/lig-4). <strong>Adicione um comentário ao seu envio informando o nome dos seus colegas.</strong>

<h2>Padronização do Commit</h2>

Iniciar sempre com:

<ul>
<li>feat:___</li>
<li>fix:__</li>
</ul>

<h2>Branchs</h2>

```
git pull origin develop
```
Criar branch específica.

```
git push origin develop
```