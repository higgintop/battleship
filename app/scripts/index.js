/* jshint jquery:true */
'use strict'

// firebase
var fbUrl = 'https://battleshipcohort8.firebaseio.com/games';
var fb = new Firebase('https://battleshipcohort8.firebaseio.com/games');


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
    ['*','*','*','*','*','*','*','*','*','*'],
    ['*','*','*','*','*','*','*','*','*','*']
  ]
];

var newGame = {
      playerOne: {
        myBoard: gameBoardsList[0],
        opponentBoard: gameBoardsList[1],
        A: 5,
        B: 4,
        C: 3,
        S: 3,
        D: 2,
        uid: 0
    },
     playerTwo: {
        myBoard: gameBoardsList[1],
        opponentBoard: gameBoardsList[0],
        A: 5,
        B: 4,
        C: 3,
        S: 3,
        D: 2,
        uid: 0
      }
};

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
    if ($(this).text() !== '*') {
      alert('This tile has already been guessed. Select another.');
    } else {
      if (game.isPlayerOneTurn) {
          checkHit(game.playerTwo.myBoard, xCoord, yCoord, game.playerOne.myGuessesBoard, game.playerTwo);
          drawGameBoard(game.playerOne.myGuessesBoard,$('.playerOpponentBoard'));

      } else {
          checkHit(game.playerOne.myBoard, xCoord, yCoord, game.playerTwo.myGuessesBoard, game.playerOne);
          drawGameBoard(game.playerTwo.myGuessesBoard,$('.playerOpponentBoard'));
      }
      //switchTurns(game.isPlayerOneTurn);
    }
});


function checkHit(boardToCheck, coord1, coord2, boardToUpdate, playerToHit) {
    switch (boardToCheck[coord1][coord2]) {
        case 'A':
            alert('On target! Hit!');
            playerToHit.A -= 1;
            if(playerToHit.A === 0){
               alert('SUNK!!!');
            }
            scoreIt();
            break;
        case 'B':
            alert('On target! Hit!');
            playerToHit.B -= 1;
            scoreIt();
            if(playerToHit.B === 0){
               alert('SUNK!!!');
            }
            break;
        case 'C':
            alert('On target! Hit!');
            playerToHit.C -= 1;
            if(playerToHit.C === 0){
               alert('SUNK!!!');
            }
            scoreIt();
            break;
        case 'S':
            alert('On target! Hit!');
            playerToHit.S -= 1;
            if(playerToHit.S === 0){
               alert('SUNK!!!');
            }
            scoreIt();
            break;
        case 'D':
            alert('On target! Hit!');
            playerToHit.D -= 1;
            if(playerToHit.D === 0){
               alert('SUNK!!!');
            }
            scoreIt();
            break;
        default:
            alert('Miss! Try again next time.');
            boardToUpdate[coord1][coord2] = "M";
    }
    function scoreIt(){
    	boardToUpdate[coord1][coord2] = "H";
        boardToCheck[coord1][coord2] = "H";
        ships = gameBoardsList[1].toString();
        hitCount(ships, shipLetters);
    };
}

function drawGameBoard(playerBoard, destination) {
  destination.empty();
  var $table = $('<table class="table table-bordered game_board"></table>');
  _.forEach(playerBoard, function(row){
    var $tr = $('<tr></tr>');
    _.forEach(row, function(cell) {
        var $td = $('<td>' + cell + '</td>');
        if (cell==='*'){
          $td.addClass('blue');
        } else if (cell === 'M'){
          $td.addClass('white');
        } else if (cell === 'H'){
          $td.addClass('red');
        } else {
          $td.addClass('grey');
        }
        $tr.append($td);
    });
    $table.append($tr);
  });
  destination.append($table);
}

function hitCount(shipString, letter){
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
      if (hitCountDown[i] !== 'E') {
	      hitCountDown[i] = shipCount;
	  }
    }
    hitCountDownTotal = hitCountDown.reduce(function(a, b) {
      return a + b;
    });
    if (hitCountDownTotal === 0) {
    	alert('Game Over');
    }
}


function switchTurns (turnBoolean) {
  if (turnBoolean) {
    game.isPlayerOneTurn = false;
  } else {
    game.isPlayerOneTurn = true;
  }
}









// On click of Join Game
$('body').on('click', '#join-game', function(event) {
 event.preventDefault();

 var needAGame = false;

 var playerName = $('#name').val();
 var playerId;

 // attempt to log in anonymous
 fb.authAnonymously(function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    playerId = authData.uid;
  }


  // check to see if there are any games when joining
  fb.once("value", function(snapshot) {
    var games = snapshot.val();

    // if no games exist in firebase
    if (games === null){
      newGame.playerOne.uid = playerId;
      fb.push(newGame);

    } 
    else {
      // check those games
       Object.keys(games).forEach(function (uuid) {

          var gameUrl = fbUrl + '/' + uuid;
          var gameFb = new Firebase(gameUrl);

          if(games[uuid].playerOne.uid === 0){
             var updatedGame = games[uuid];
             updatedGame.playerOne.uid = playerId;
             gameFb.set(updatedGame);
          }

          else if(games[uuid].playerTwo.uid === 0) {
             var updatedGame = games[uuid];
             updatedGame.playerTwo.uid = playerId;
             gameFb.set(updatedGame);
             needAGame = true;
          }

        }); // Object.keys

       if(needAGame){
         fb.push(newGame);
       }

      }

    });
  });
});


