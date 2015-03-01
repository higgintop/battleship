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
    isPlayerOneTurn: true,
    isGameOver: false
};
var ships = gameBoardsList[1].toString(),
    shipLetters = ['A', 'B', 'C', 'S', 'D'],
    hitCountDown = [],
    hitCountDownTotal;

drawGameBoard(game.playerOne.myGuessesBoard, $('.playerOpponentBoard'));
drawGameBoard(game.playerOne.myBoard, $('.playerOwnBoard'));

$('.playerOpponentBoard').on('click', 'td', function() {
    var yCoord = $(this).index();
    var xCoord = $(this).closest('tr').index();
    //$(this).unbind(event);
    if (game.isPlayerOneTurn) {
        checkHit(game.playerTwo.myBoard, xCoord, yCoord, game.playerOne.myGuessesBoard, game.playerTwo);
        drawGameBoard(game.playerOne.myGuessesBoard,$('.playerOpponentBoard'));

    } else {
        checkHit(game.playerOne.myBoard, xCoord, yCoord, game.playerTwo.myGuessesBoard, game.playerOne);
    }
});

function checkHit(boardToCheck, coord1, coord2, boardToUpdate, playerToHit) {
    switch (boardToCheck[coord1][coord2]) {
        case 'A':
            alert('A was hit! Success!');
            playerToHit.A -= 1;
            scoreIt();
            break;
        case 'B':
            alert('B was hit! Success!');
            playerToHit.B -= 1;
            scoreIt();
            break;
        case 'C':
            alert('C was hit! Success!');
            playerToHit.C -= 1;
            scoreIt();
            break;
        case 'S':
            alert('S was hit! Success!');
            playerToHit.S -= 1;
            scoreIt();
            break;
        case 'D':
            alert('D was hit! Success!');
            playerToHit.D -= 1;
            scoreIt();
            break;
        default:
            alert('Miss! Try again next time.');
            boardToUpdate[coord1][coord2] = "M";
    }
    function scoreIt(){
    	boardToUpdate[coord1][coord2] = "H";
        //playerToHit.D -= 1;
        boardToCheck[coord1][coord2] = "H";
        ships = gameBoardsList[1].toString();
        hitCountDown = [];
        hitCount(ships, shipLetters, hitCountDown);
    };
}

function drawGameBoard(playerBoard, destination) {
  destination.empty();
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

function hitCount(shipString, letter, countArray){
  var shipCount,
      shipLetter;
  for (var i = 0; i < letter.length; i++) {
    shipLetter = letter[i];
    shipCount = 0;
    for (var x = 0; x < shipString.length; x++) {
      if (shipString[x] === shipLetter) {
        shipCount++;
        }
      }
      countArray.push(shipCount);
      console.log(shipCount);
    }
    console.log(hitCountDown);
    hitCountDownTotal = hitCountDown.reduce(function(a, b) {
      return a + b;
    });
    console.log(hitCountDownTotal);
};


