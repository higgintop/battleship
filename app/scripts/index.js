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
var myGame;
var firebaseToUpdate;
var newGame = {
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
        uid: 0,
        hitCountDown:[0,0,0,0,0],
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
        uid: 0,
        hitCountDown:[0,0,0,0,0],
        hitCountDownTotal: ''
      },
    isPlayerOneTurn: true
};

if (firebaseToUpdate) {
  watchFirebaseForChange();
}

$('.playerOpponentBoard').on('click', 'td', function() {
    var yCoord = $(this).index();
    var xCoord = $(this).closest('tr').index();
    if ($(this).text() !== '*') {
      alert('This tile has already been guessed. Select another.');
    } else {
      if (newGame.isPlayerOneTurn && (newGame.playerOne.uid === fb.getAuth().uid)) {
          checkHit(newGame.playerTwo.myBoard, xCoord, yCoord, newGame.playerOne.myGuessesBoard, newGame.playerTwo);
          switchTurns(newGame.isPlayerOneTurn);
      } else if (!newGame.isPlayerOneTurn && (newGame.playerTwo.uid === fb.getAuth().uid)){
          checkHit(newGame.playerOne.myBoard, xCoord, yCoord, newGame.playerTwo.myGuessesBoard, newGame.playerOne);
          switchTurns(newGame.isPlayerOneTurn);
      } else {
        alert('not your turn');
      }
    }
    firebaseToUpdate.set(newGame);
    watchFirebaseForChange();
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
            boardToCheck[coord1][coord2] = "M";
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
    console.log(playerToHit);
    console.log(playerToHit.hitCountDown);
    console.log(playerToHit.hitCountDown[0]);
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
    newGame.isPlayerOneTurn = false;
  } else {
    newGame.isPlayerOneTurn = true;
  }

}

// On click of Join Game
$('body').on('click', '#join-game', function(event) {
  $('form').addClass('hidden');
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
      gameId = fb.push();
      newGame.gameName=gameId.key();
      gameId.set(newGame);
      findMyGame(function(theGame) {
         firebaseToUpdate = new Firebase(fbUrl + '/' + myGame);
         if (fb.getAuth().uid===playerId) {
            drawGameBoard(newGame.playerOne.myGuessesBoard, $('.playerOpponentBoard'));
            drawGameBoard(newGame.playerOne.myBoard, $('.playerOwnBoard'));
              $('.gameContainer').removeClass('hidden');
              $('.statusBoard').empty();
              $('.statusBoard').append('<div>You are player1.</div>');
         }
         watchFirebaseForChange();
      });
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
             findMyGame(function(theGame) {
                firebaseToUpdate = new Firebase(fbUrl + '/' + myGame);
                if (fb.getAuth().uid===playerId) {
            drawGameBoard(newGame.playerOne.myGuessesBoard, $('.playerOpponentBoard'));
            drawGameBoard(newGame.playerOne.myBoard, $('.playerOwnBoard'));
              $('.gameContainer').removeClass('hidden');
              $('.statusBoard').empty();
              $('.statusBoard').append('<div>You are player1.</div>');
            }
            watchFirebaseForChange();
          });
        }
          else if(games[uuid].playerTwo.uid === 0) {
             var updatedGame = games[uuid];
             updatedGame.playerTwo.uid = playerId;
             gameFb.set(updatedGame);
             needAGame = true;
             findMyGame(function(theGame) {
                firebaseToUpdate = new Firebase(fbUrl + '/' + myGame);
                if (fb.getAuth().uid===playerId) {
                  drawGameBoard(newGame.playerTwo.myGuessesBoard, $('.playerOpponentBoard'));
                  drawGameBoard(newGame.playerTwo.myBoard, $('.playerOwnBoard'));
                  $('.gameContainer').removeClass('hidden');
                  $('.statusBoard').empty();
                  $('.statusBoard').append('<div>You are player2.</div>');
                }
                watchFirebaseForChange();
             });
          }
        }); // Object.keys

       if(needAGame){
         newGame.playerOne.uid = 0;
         newGame.playerTwo.uid = 0;
         var gameId = fb.push();
         newGame.gameName=gameId.key();
         gameId.set(newGame);
       }

      }

    });
  });
});

function findMyGame (callback) {
  fb.once('value', function(snap) {
    var gameList = snap.val();
    console.log(gameList);
  _.forEach(gameList, function(game) {
    if (fb.getAuth().uid === game.playerOne.uid ||
        fb.getAuth().uid === game.playerTwo.uid) {
        myGame = game.gameName;
        callback(myGame);
     }
    })
  });
};

function watchFirebaseForChange () {
  firebaseToUpdate.on('value', function(currentGame) {
    console.log('updating game based on firebase!');
    newGame=currentGame.val();
    if (fb.getAuth().uid === newGame.playerOne.uid) {
    drawGameBoard(newGame.playerOne.myGuessesBoard,$('.playerOpponentBoard'));
    drawGameBoard(newGame.playerOne.myBoard,$('.playerOwnBoard'));
  } else if (fb.getAuth().uid === newGame.playerTwo.uid){
    drawGameBoard(newGame.playerTwo.myGuessesBoard,$('.playerOpponentBoard'));
    drawGameBoard(newGame.playerTwo.myBoard,$('.playerOwnBoard'));
    }
    showTurn();
  });
}


function showTurn() {
  $('.turnTracker').empty();
  if (newGame.isPlayerOneTurn){
    $('.turnTracker').append('<div>Player One\'s Turn</div>');
  } else {
    $('.turnTracker').append('<div>Player Two\'s Turn</div>');
  }
}



