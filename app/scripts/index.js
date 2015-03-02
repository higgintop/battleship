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
        D: 2,
        hitCountDown:[],
        hitCountDownTotal: ''
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
        D: 2,
        hitCountDown:[],
        hitCountDownTotal: ''
    },
    isPlayerOneTurn: true,
    isGameOver: false
};

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
            playerToHit.A -= 1;
            scoreIt(playerToHit.A);
            break;
        case 'B':
            playerToHit.B -= 1;
            scoreIt(playerToHit.B);
            break;
        case 'C':
            playerToHit.C -= 1;
            scoreIt(playerToHit.C);
            break;
        case 'S':
            playerToHit.S -= 1;
            scoreIt(playerToHit.S);
            break;
        case 'D':
            playerToHit.D -= 1;
            scoreIt(playerToHit.D);
            break;
        default:
            alert('Miss! Try again next time.');
            boardToUpdate[coord1][coord2] = "M";
    }
    function scoreIt(playerHit){
    	var ships = boardToCheck.toString(),
            shipLetters = ['A', 'B', 'C', 'S', 'D'];
            //countDown = playerToHit.hitCountDown,
            //countDownTotal = playerToHit.hitCountDownTotal;
    	boardToUpdate[coord1][coord2] = "H";
        boardToCheck[coord1][coord2] = "H";
        hitCount(ships, shipLetters, playerToHit);
        if(playerHit === 0){
            alert('SUNK!!!');
        }
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

function hitCount(shipString, letter, playerToHit){
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
	  playerToHit.hitCountDown[i] = shipCount;
    }
    playerToHit.hitCountDownTotal = playerToHit.hitCountDown.reduce(function(a, b) {
      return a + b;
    });
    if (playerToHit.hitCountDownTotal === 1) {
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


