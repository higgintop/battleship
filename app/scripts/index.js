/* jshint jquery:true */
'use strict'
var gameBoardsList =
[
  [
    ['A','*','*','*','*','*','*','*','*','*'],
    ['A','*','*','*','*','*','*','*','*','*'],
    ['A','*','*','*','*','*','*','*','*','*'],
    ['A','*','*','*','*','S','S','S','*','*'],
    ['A','*','*','*','*','*','*','*','*','*'],
    ['*','*','*','*','*','*','*','*','*','*'],
    ['*','*','*','*','*','*','*','*','*','*'],
    ['*','C','*','B','B','B','B','*','*','*'],
    ['*','C','*','*','*','*','*','*','D','*'],
    ['*','C','*','*','*','*','*','*','D','*']
  ],
  [
    ['*','D','D','*','*','*','*','*','*','*'],
    ['*','*','*','*','*','*','*','*','B','*'],
    ['*','*','*','C','C','C','*','*','B','*'],
    ['*','*','*','*','*','*','*','*','B','*'],
    ['*','*','*','*','*','*','*','*','B','*'],
    ['S','S','S','*','*','*','*','*','*','*'],
    ['*','*','*','*','*','*','*','*','*','*'],
    ['*','A','A','A','A','A','*','*','*','*'],
    ['*','*','*','*','*','*','*','*','*','*']
  ]
];
var game = {
    playerOne: {
        myBoard: gameBoardsList[0],
        opponentBoard: gameBoardsList[1],
        myGuessesBoard: [
                         ['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*']
                        ],
        A: 5,
        B: 4,
        C: 3,
        S: 3,
        D: 2
    },
    
    playerTwo: {
        myBoard: gameBoardsList[1],
        opponentBoard: gameBoardsList[0],
        A: 5,
        B: 4,
        C: 3,
        S: 3,
        D: 2
    },
    isPlayerOneTurn: true,
    isGameOver: false
};

drawGameBoard(game.playerOne.myGuessesBoard, $('.playerOpponentBoard'));

$('.playerOpponentBoard').on('click', 'td', function(event) {
    var yCoord = $(this).index();
    var xCoord = $(this).closest('tr').index();
    $(this).unbind(event);
    if (game.isPlayerOneTurn) {
      checkHit(game.playerTwo.myBoard, xCoord, yCoord);
    } else {
      checkHit(game.playerOne.myBoard, xCoord, yCoord);
    }
});

function checkHit(boardToCheck, coord1, coord2) {
    switch (boardToCheck[coord1][coord2]) {
        case 'A':
          alert('A was hit! Success!');
          break;
        case 'B':
          alert('B was hit! Success!');
          break;
        case 'C':
          alert('C was hit! Success!');
          break;
        case 'S':
          alert('S was hit! Success!');
          break;
        case 'D':
          alert('D was hit! Success!');
          break;
        default:
          alert('Miss! Try again next time.');

    }
}

function drawGameBoard(playerBoard, destination) {
  var $table = $('<table class="table table-bordered game_board"></table>');
  _.forEach(playerBoard, function(row){
    var $tr = $('<tr></tr>');
    _.forEach(row, function(cell) {
        var $td = $('<td>' + cell + '</td>');
        $tr.append($td);
    });
    $table.append($tr);
  });

  destination.append($table);
}



