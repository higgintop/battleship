/* jshint jquery:true */
/* _: true */
'use strict'

var fbUrl = 'https://battleshipcohort8.firebaseio.com/games',
    fb = new Firebase('https://battleshipcohort8.firebaseio.com/games'),
    ships = [
             {name: 'A',
              spaces: 5,
              orientation: 'horizontal'
             },
             {name: 'B',
              spaces: 4,
              orientation: 'horizontal'
             },
             {name: 'C',
              spaces: 3,
              orientation: 'horizontal'
             },
             {name: 'S',
              spaces: 3,
              orientation: 'horizontal'},
             {name: 'D',
              spaces: 2,
              orientation: 'horizontal'}
            ],
    cleanBoard =        [['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*']],
    defaultBoard =      [['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*']],
    myGame,
    firebaseToUpdate,
    newGame = {
      playerOne: {
        myBoard: cleanBoard,
        opponentBoard: defaultBoard,
        myGuessesBoard: [['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*']],
        A: 5,
        B: 4,
        C: 3,
        S: 3,
        D: 2,
        uid: 0,
        handle: '',
        hitCountDown:[0,0,0,0,0],
        hitCountDownTotal: ''
    },
     playerTwo: {
        myBoard: cleanBoard,
        opponentBoard: defaultBoard,
        myGuessesBoard: [['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*'],
                         ['*','*','*','*','*','*','*','*','*','*']],
        A: 5,
        B: 4,
        C: 3,
        S: 3,
        D: 2,
        uid: 0,
        handle: '',
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
      showQuickUpdate('This tile has already been guessed. Select another.');
    } else {
      if (newGame.isPlayerOneTurn && (newGame.playerOne.uid === fb.getAuth().uid)) {
          checkHit(newGame.playerTwo.myBoard, xCoord, yCoord, newGame.playerOne.myGuessesBoard, newGame.playerTwo);
          switchTurns(newGame.isPlayerOneTurn);
      } else if (!newGame.isPlayerOneTurn && (newGame.playerTwo.uid === fb.getAuth().uid)){
          checkHit(newGame.playerOne.myBoard, xCoord, yCoord, newGame.playerTwo.myGuessesBoard, newGame.playerOne);
          switchTurns(newGame.isPlayerOneTurn);
      } else {
        showQuickUpdate('It is not your turn.');
      }
    }
    firebaseToUpdate.set(newGame);
    watchFirebaseForChange();
});

function checkHit(boardToCheck, coord1, coord2, boardToUpdate, playerToHit) {
    switch (boardToCheck[coord1][coord2]) {
        case 'A':
            showQuickUpdate('Hit!');
            playerToHit.A -= 1;
            scoreIt(playerToHit.A);
            break;
        case 'B':
            showQuickUpdate('Hit!');
            playerToHit.B -= 1;
            scoreIt(playerToHit.B);
            break;
        case 'C':
            showQuickUpdate('Hit!');
            playerToHit.C -= 1;
            scoreIt(playerToHit.C);
            break;
        case 'S':
            showQuickUpdate('Hit!');
            playerToHit.S -= 1;
            scoreIt(playerToHit.S);
            break;
        case 'D':
            showQuickUpdate('Hit!');
            playerToHit.D -= 1;
            scoreIt(playerToHit.D);
            break;
        default:
            showQuickUpdate('Miss! Try again next time.');
            boardToUpdate[coord1][coord2] = "M";
            boardToCheck[coord1][coord2] = "M";
    }
    function scoreIt(playerHit){
      var ships = boardToCheck.toString(),
      shipLetters = ['A', 'B', 'C', 'S', 'D'];
      boardToUpdate[coord1][coord2] = "H";
      boardToCheck[coord1][coord2] = "H";
      hitCount(ships, shipLetters, playerToHit);
      if(playerHit === 0){
      showQuickUpdate('You sunk a ship!');
      }
    }
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
      showQuickUpdate('Game Over.!');
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
  $('.statusBoard').removeClass('hidden');
  $('.turnTracker').removeClass('hidden');
 event.preventDefault();
 var needAGame = false;
 var playerName = $('#name').val();
 var playerId;

 fb.authAnonymously(function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    playerId = authData.uid;
  }
  fb.once("value", function(snapshot) {
    var games = snapshot.val();
    if (games === null){
      newGame.playerOne.myBoard = cleanBoard;
      newGame.playerOne.uid = playerId;
      newGame.playerOne.handle=playerName;
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
       Object.keys(games).forEach(function (uuid) {
          var gameUrl = fbUrl + '/' + uuid;
          var gameFb = new Firebase(gameUrl);
          if(games[uuid].playerOne.uid === 0){
            var updatedGame = games[uuid];
            updatedGame.playerOne.uid = playerId;
            newGame.playerOne.handle=playerName;
            updatedGame.playerOne.myBoard = cleanBoard;
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
            updatedGame.playerTwo.handle=playerName;
            updatedGame.playerTwo.myBoard = cleanBoard;
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
         newGame.playerOne.handle = '';
         newGame.playerTwo.handle = '';
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
  _.forEach(gameList, function(game) {
    if (fb.getAuth().uid === game.playerOne.uid ||
        fb.getAuth().uid === game.playerTwo.uid) {
        myGame = game.gameName;
        callback(myGame);
     }
    });
  });
}

function watchFirebaseForChange () {
  firebaseToUpdate.on('value', function(currentGame) {
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
    if(newGame.playerOne.handle === '') {
       newGame.playerOne.handle = 'Player1';
    } else {
      $('.turnTracker').append('<div>' + newGame.playerOne.handle + '\'s Turn</div>');
    }
  } else {
     if(newGame.playerOne.handle === '') {
        newGame.playerOne.handle = 'Player2';
    } else {
    $('.turnTracker').append('<div>' + newGame.playerTwo.handle + '\'s Turn</div>');
    }
  }
}

function placeShips() {
    // draw the board and append to placeShipsContainer
    drawGameBoard(cleanBoard, $('.placeShipsContainer'));
}

$('.rotateBtn').on('click', function(){
  if(ships[0].orientation === 'horizontal'){
    ships[0].orientation = 'vertical';
  } else {
    ships[0].orientation = 'horizontal';
  }
});

$('.placeShipsContainer').on('mouseover', 'td', function(){
    var yCoord = $(this).index();
    var xCoord = $(this).closest('tr').index();
    if(ships[0].orientation === 'horizontal') {
      var space = $(this);
      space.css('background-color', 'lightgrey');
      for (var i=0; i < ships[0].spaces-1; i++){
        space = space.next();
        space.css('background-color', 'lightgrey');
      }

    } else if (ships[0].orientation === 'vertical') {
      var spacesLeft = $(this).parent().nextAll();

      $(this).css('background-color', 'lightgrey');
      var nextRow;
      for (var i=0; i < ships[0].spaces-1; i++){
        nextRow = spacesLeft[i];
        $(nextRow).find('td').eq(yCoord).css('background-color', 'lightgrey');
      }
    }

});

$('.placeShipsContainer').on('mouseleave', 'td', function(){
    var yCoord = $(this).index();
    var xCoord = $(this).closest('tr').index();
    $(this).css('background-color', 'turquoise');

    if(ships[0].orientation === 'horizontal') {
      var space = $(this);
      space.css('background-color', 'turquoise');
      for (var i=0; i < ships[0].spaces-1; i++){
        space = space.next();
        space.css('background-color', 'turquoise');
      }

    } else if (ships[0].orientation === 'vertical') {
      var spacesLeft = $(this).parent().nextAll();

      $(this).css('background-color', 'turquoise');
      var nextRow;
      for (var i=0; i < ships[0].spaces-1; i++){
        nextRow = spacesLeft[i];
        $(nextRow).find('td').eq(yCoord).css('background-color', 'turquoise');
      }
    }
});
$('#placeShips').on('click', function() {
  placeShips();
  $('.placeShipsContainer').toggleClass('hidden');
  $('.rotateBtn').toggleClass('hidden');
});

$('.placeShipsContainer').on('click', 'td', function(){
    var col = $(this).index();
    var row = $(this).closest('tr').index();

    // logic to see if this is a valid click
    if (cleanBoard[row][col] === '*'){
      if (ships[0].orientation === 'horizontal'){
        placeHorizontalShip(row, col);
      } else if (ships[0].orientation === 'vertical') {
        placeVerticalShip(row, col);
      }
    } else {
      showQuickUpdate('That placement is invalid. Select another placement.');
    }
});

function placeHorizontalShip(row, col){
   // check cleanBoard for cells right of where we are
   var isValid = true;

   for(var i=1; i < ships[0].spaces; i++){
    if(cleanBoard[row][col + i] !== '*'){
      isValid = false;
      showQuickUpdate('That placement is invalid. Select another placement.');
    }
  }

   if(isValid){
    for(var i=0; i < ships[0].spaces; i++){
      cleanBoard[row][col + i] = ships[0].name;
     }
     placeShips();
     ships.shift();
     if(!ships[0]) {
      updateGameStatusBoard('You\'ve placed all of your ships. Enter your username.');
      toggleShipPlacementDisplay();
    }
  }
}

function placeVerticalShip(row, col) {
     var isValid = true;

   for(var i=1; i < ships[0].spaces; i++){
    if(cleanBoard[row + i][col] !== '*'){
      isValid = false;
      showQuickUpdate('That placement is invalid. Select another placement.');
    }
  }
   if(isValid){
    for(var i=0; i < ships[0].spaces; i++){
      cleanBoard[row + i][col] = ships[0].name;
     }
     placeShips();
     ships.shift();
     if(!ships[0]) {
      updateGameStatusBoard('You\'ve placed all of your ships. Enter your username.');
      toggleShipPlacementDisplay();
     }
   }
}

function toggleShipPlacementDisplay() {
  $('.placeShipsContainer').toggleClass('hidden');
  $('.rotateBtn').toggleClass('hidden');
  $('form').toggleClass('hidden');
  $('#placeShips').toggleClass('hidden');
}
function updateGameStatusBoard(message) {
  $('.statusBoard').append('<div class="statusUpdate">' + message + '</div>');
  $('.statusBoard').removeClass('hidden');
}
function showQuickUpdate(message) {
  $('.statusBoard').empty();
  $('.statusBoard').append('<div class="statusUpdate redUpdate">' + message + '</div>');
  $('.statusBoard').removeClass('hidden');
  $('.statusBoard').fadeOut(4000);

}