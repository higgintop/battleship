/* jshint jquery:true */
'use strict'
function drawGameBoard(playerBoard, destination) {
  var $table = $('<table></table>');
  _.forEach(playerBoard, function(row){
    var $tr = $('<tr></tr>');
    _.forEach(row, function(cell) {
        var $td = $('<td>' + cell + '<td>');
        $tr.append($td);
    });
    $table.append($tr);
  });
}

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
}