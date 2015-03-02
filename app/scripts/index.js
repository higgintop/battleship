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
        uid: 0
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
        uid: 0
      },
    isPlayerOneTurn: true
};

var ships = gameBoardsList[1].toString(),
    shipLetters = ['A', 'B', 'C', 'S', 'D'],
    hitCountDown = [],
    hitCountDownTotal;

/*if(firebaseToUpdate){
  console.log('here');
  firebaseToUpdate.on('value', function(snap) {
    console.log('a change occurred', snap.val());

  });
}*/


drawGameBoard(newGame.playerOne.myGuessesBoard, $('.playerOpponentBoard'));
drawGameBoard(newGame.playerOne.myBoard, $('.playerOwnBoard'));

$('.playerOpponentBoard').on('click', 'td', function() {
    var yCoord = $(this).index();
    var xCoord = $(this).closest('tr').index();
    if ($(this).text() !== '*') {
      alert('This tile has already been guessed. Select another.');
    } else {
      if (newGame.isPlayerOneTurn) {
          checkHit(newGame.playerTwo.myBoard, xCoord, yCoord, newGame.playerOne.myGuessesBoard, newGame.playerTwo);
          //drawGameBoard(newGame.playerOne.myGuessesBoard,$('.playerOpponentBoard'));

      } else {
          checkHit(newGame.playerOne.myBoard, xCoord, yCoord, newGame.playerTwo.myGuessesBoard, newGame.playerOne);
          //drawGameBoard(newGame.playerTwo.myGuessesBoard,$('.playerOpponentBoard'));
      }
      switchTurns(newGame.isPlayerOneTurn);
    }
    firebaseToUpdate.set(newGame);
    drawGameBoard(newGame.playerOne.myGuessesBoard,$('.playerOpponentBoard'));
    drawGameBoard(newGame.playerTwo.myGuessesBoard,$('.playerOpponentBoard'));
    drawGameBoard(newGame.playerOne.myBoard,$('.playerOwnBoard'));
    drawGameBoard(newGame.playerTwo.myBoard,$('.playerOwnBoard'));


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
    	boardToUpdate[coord1][coord2] = "H";
        boardToCheck[coord1][coord2] = "H";
        ships = gameBoardsList[1].toString();
        hitCount(ships, shipLetters);
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
    newGame.isPlayerOneTurn = false;
  } else {
    newGame.isPlayerOneTurn = true;
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
      gameId = fb.push();
      newGame.gameName=gameId.key();
      gameId.set(newGame);
      findMyGame();
      console.log('myGame is now ' + myGame);
      firebaseToUpdate = new Firebase(fbUrl + '/' + myGame);
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
             findMyGame();
             console.log('myGame is now ' + myGame);
             firebaseToUpdate = new Firebase(fbUrl + '/' + myGame);
          }

          else if(games[uuid].playerTwo.uid === 0) {
             var updatedGame = games[uuid];
             updatedGame.playerTwo.uid = playerId;
             gameFb.set(updatedGame);
             needAGame = true;
             findMyGame();
             console.log('myGame is now ' + myGame);
             firebaseToUpdate = new Firebase(fbUrl + '/' + myGame);
          }

        }); // Object.keys

       if(needAGame){
         var gameId = fb.push();
         newGame.gameName=gameId.key();
         gameId.set(newGame);
       }

      }

    });
  });
});


function findMyGame () {
fb.once('value', function(snap) {
  var gameList = snap.val();
  console.log(gameList);
_.forEach(gameList, function(game) {
  if (fb.getAuth().uid === game.playerOne.uid ||
      fb.getAuth().uid === game.playerTwo.uid) {
      myGame = game.gameName;
   }
  })
});
};