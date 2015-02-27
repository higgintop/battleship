'use strict'

var fb = new Firebase('https://tictactoecohort8.firebaseio.com/');
var player;


$(function init() {

    // check to see if unfinished board exists
    fb.once('value', function(snapshot) {
    	var games = snapshot.val();

	   Object.keys(games).forEach(function (uuid) {
	     if (games[uuid].isOver === false) {
		  // load unfinished game
		  updatePlayingBoard(games[uuid].board);
		  player = games[uuid].whoseTurn;
		  $('table').attr("data-uuid", uuid);
	  }
	});
  });
}); 



$('td').on('click', function(event) {
	var $boardSpace = $(event.target);
	
	// get row/col from the clicked table cell
	var myClass = $(this).attr("class").split('-');
	var row = myClass[1];
	var col = myClass[2];

	var spaceTaken = $boardSpace.css('background-color');
	if (spaceTaken !== 'rgb(255, 255, 255)'){
		alert('invalid move');
	}
	else {
		if(player === 'X') {
			$boardSpace.css( "background-color", "red" );
			makeMove(player,row,col);
			player = 'O';
		}
		else if (player === 'O') {
			$boardSpace.css( "background-color", "blue" );
			makeMove(player,row,col);
		    player = 'X';
		}
	}
});



function updatePlayingBoard(board) {
	for (var row=0; row < 3; row++){
		for(var col=0; col < 3; col++) {
			var cell = board[row][col];
			var	cellClass ='.cell-' + row + "-" + col;

			if (cell === 'X') {
				$(cellClass).css("background-color", "red");
			}
			else if (cell === 'O'){
				 $(cellClass).css("background-color", "blue");
			}
			else if (cell === 'b'){
				 $(cellClass).css("background-color", "white");

			}
		}
	}
}



// logic for which space on playing board was chosen
function makeMove(player, row, col) {

  // access uuid of the playing board
  var uuid = $('table').data('uuid');

  var currentGameRef = fb.child(uuid);

  // get the current board from firebase
  currentGameRef.once('value', function(snapshot) {
  	var currentGame = snapshot.val();
  	var currentBoard = currentGame.board;


  	// update the board, and push new board to firebase
  	currentBoard[row][col] = player;
  	currentGameRef.update({board: currentBoard});

    // flip player turns
  	if (player === 'X'){
  		currentGameRef.update({whoseTurn: 'O'});
  	}
  	else {
  	   currentGameRef.update({whoseTurn: 'X'});
  	}



    // update num of free playing spaces left on board
  	var freeSpaces = currentGame.freeSpaces;
  	freeSpaces--;
  	currentGameRef.update({freeSpaces: freeSpaces});

  	// render updated board on screen
    updatePlayingBoard(currentBoard);


    // check for winner
    if ((currentBoard[0][0] === 'X' && currentBoard[0][1] === 'X' && currentBoard[0][2] === 'X') ||(currentBoard[1][0] === 'X' && currentBoard[1][1] === 'X' && currentBoard[1][2] === 'X') ||(currentBoard[2][0] === 'X' && currentBoard[2][1] === 'X' && currentBoard[2][2] === 'X') ||(currentBoard[0][0] === 'X' && currentBoard[1][0] === 'X' && currentBoard[2][0] === 'X') ||(currentBoard[0][1] === 'X' && currentBoard[1][1] === 'X' && currentBoard[2][1] === 'X') || (currentBoard[0][2] === 'X' && currentBoard[1][2] === 'X' && currentBoard[2][2] === 'X') |(currentBoard[0][0] === 'X' && currentBoard[1][1] === 'X' && currentBoard[2][2] === 'X') ||(currentBoard[2][0] === 'X' && currentBoard[1][1] === 'X' && currentBoard[0][2] === 'X') ||(currentBoard[0][0] === 'O' && currentBoard[0][1] === 'O' && currentBoard[0][2] === 'O') ||(currentBoard[1][0] === 'O' && currentBoard[1][1] === 'O' && currentBoard[1][2] === 'O') ||(currentBoard[2][0] === 'O' && currentBoard[2][1] === 'O' && currentBoard[2][2] === 'O') ||(currentBoard[0][0] === 'O' && currentBoard[1][0] === 'O' && currentBoard[2][0] === 'O') ||(currentBoard[0][1] === 'O' && currentBoard[1][1] === 'O' && currentBoard[2][1] === 'O') ||(currentBoard[0][2] === 'O' && currentBoard[1][2] === 'O' && currentBoard[2][2] === 'O') ||(currentBoard[0][0] === 'O' && currentBoard[1][1] === 'O' && currentBoard[2][2] === 'O') ||(currentBoard[2][0] === 'O' && currentBoard[1][1] === 'O' && currentBoard[0][2] === 'O') ){
	  var winner;

	  // winner is opposite of last player
      if (player === 'X'){
  	    winner = 'O';
  	  }
  	  else {
  		winner='X'
	  }

      showScore('WIN', winner);

      // make a new board
	  var newGame = {
	    board: [['b', 'b', 'b'],['b', 'b', 'b'],['b', 'b', 'b']],
	    whoseTurn: 'X',
	    freeSpaces: 9
      };
      currentGameRef.update(newGame);
      updatePlayingBoard(newGame.board);
    }



    // if no winner yet, check for a tie
  	if(freeSpaces<= 0){
	  var newGame = {
	    board: [['b', 'b', 'b'],['b', 'b', 'b'],['b', 'b', 'b']],
	    whoseTurn: 'X',
	    freeSpaces: 9
      };
      currentGameRef.update(newGame);
      updatePlayingBoard(newGame.board);
      showScore('TIE', '');
  	 }
  });
}

function showScore(score , winningPlayer) {
	// empty previous score container
	$('.scoreContainer').empty();
	
	if(score === 'TIE'){
	  $('.scoreContainer').append('<h2>Previous Game: TIE</h2>');
	}
	else {
	  $('.scoreContainer').append('<h2>Previous Game: ' + winningPlayer + ' WON</h2>');
	  $('.scoreContainer').css('color', 'white');
	  if (winningPlayer === 'X'){
	    $('.scoreContainer').css('background-color', 'blue');
	  }
	  else {
	    $('.scoreContainer').css('background-color', 'red');
	  }
	}
}





