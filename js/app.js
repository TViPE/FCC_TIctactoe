var human = "X";
var ai = "O";
var currentPlayer;
var isGamePlaying = false;
var hasWin = false;
// var hasPickedSymbol = false;
// var hasPickedPlayer = false;
var gameBoard = [0,1,2,3,4,5,6,7,8];
var winCombo = [
					[0,1,2],
					[3,4,5],
					[6,7,8],
					[0,3,4],
					[1,4,7],
					[2,5,8],
					[0,4,8],
					[2,4,6]
				];
var moveCount = 0;

function move(elem, currentPlayer){
	var element = $(elem).attr('id');
	//update gameBoard
	gameBoard[element] = currentPlayer;
	$(elem).text(currentPlayer);
}

function switchPlayer(){
	//console.log("Before switch: " + currentPlayer);
 	if(currentPlayer == human) {
		currentPlayer = ai;
	} else {
		currentPlayer = human;
	}
	//console.log("After switch: " + currentPlayer);
}

function isWinning(board, currentPlayer){
	if (((board[0] == currentPlayer) && (board[1] == currentPlayer) &&(board[2] == currentPlayer)) ||
		((board[3] == currentPlayer) && (board[4] == currentPlayer) &&(board[5] == currentPlayer)) ||
		((board[6] == currentPlayer) && (board[7] == currentPlayer) &&(board[8] == currentPlayer)) ||
		((board[0] == currentPlayer) && (board[3] == currentPlayer) &&(board[6] == currentPlayer)) ||
		((board[1] == currentPlayer) && (board[4] == currentPlayer) &&(board[7] == currentPlayer)) ||
		((board[2] == currentPlayer) && (board[5] == currentPlayer) &&(board[8] == currentPlayer)) ||
		((board[0] == currentPlayer) && (board[4] == currentPlayer) &&(board[8] == currentPlayer)) ||
		((board[2] == currentPlayer) && (board[4] == currentPlayer) &&(board[6] == currentPlayer))){
		hasWin = true;
		//window.alert(currentPlayer + " Win!");
		return true;
	} else {
		//window.alert('Tie');	
		hasWin = false;
		return false;
	}
}

// Finding all the emptiedIndexes that the human and ai have not checked
function emptyIndexes(board){
	return board.filter(function (elem){
		return (elem != human && elem != ai)
	})
}

// ------- Minimax Algorithm ------- //
 
function minimax(board, currentPlayer){

	// Finding empty spots
	var emptySpots = emptyIndexes(board);

	// Check for terminal state and retrn a value accordingly 
	// ai win: 10
	// human win: -10;
	// tie : 0
	if (isWinning(board, human) === true){
		return {score: -10};
	} else if(isWinning(board, ai) === true){
		return {score: 10};
	} else if(emptySpots.length === 0) {
		return {score:0};
	}

	// Make an array moves[] iterating through empty spots and collect their scores.
	var moves = [];

	// Loop through available spots
	for (var i = 0; i < emptySpots.length; i++){
		// Create an object for each spot and store the index of that spot
		var move = {};
			move.index = board[emptySpots[i]];

		// Set the empty spot to the current player
		board[emptySpots[i]] = currentPlayer;

		// Collect the score resulted from calling minimax on 
		// the opponent of the current player
		if (currentPlayer == ai){
			var result = minimax(board, human);
			move.score = result.score;
		} else {
			var result = minimax(board, ai);
			move.score = result.score;
		}

		// Reset the spot to empty after obtaining score
		board[emptySpots[i]] = move.index;

		// Push the object to moves array
		// moves = [
		// 		{index: --, score: --}
		// ]
		moves.push(move);

	}

	// Evaluate score of each move in moves array.
	// if AI is playing:
	// 		-> choose the highest scrore 
	//		-> set the bestScore to -Inifity 
	//      -> Iterating through each move, get score, compare it with bestScore
	// 		-> Update bestScore to new value if bestScore < move's score.
	//		-> bestScore is largest in the moves'score

	// if Human is playing:
	// 		-> choose the highest scrore 
	//		-> set the bestScore to Inifity 
	//      -> Iterating through each move, get score, compare it with bestScore
	// 		-> Update bestScore to new value if bestScore > move's score.
	//		-> bestScore is lowest in the moves'score

	var bestMove;
	if(currentPlayer == ai){
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++){
			if(bestScore < moves[i].score){
				// Find best score based on move's score
				bestScore = moves[i].score;
				// if Best Score found, update best move which is the index of the best score's move;
				bestMove = i;
			} 
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i<moves.length; i++){
			if(bestScore > moves[i].score) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	// Return the chosen move(object) from the moves array
	return moves[bestMove];

}
// ------- Minimax Algorithm End ------- //


// ------- Game Main Function ------- //
$(function(){
	var hasPickedSymbol = false;
	var hasPickedPlayer = false;
	var count = 0;
	$('.symbolBtn').click(function(){
		human = $(this).text();
		human == "X" ? ai = "O" : ai = "X";

		$(this).css('backgroundColor', '#fc6f37');
		hasPickedSymbol = true;
		//$('.innerPickSymbol').hide();
		count++;
	});
	currentPlayer = human;
	// $('.firstPlayerBtn').click(function(){
	// 	currentPlayer = $(this).text();
	// 	currentPlayer == "Human" ? currentPlayer = human : currentPlayer = ai;
	// 	$(this).css('backgroundColor', '#fc6f37');
	// 	hasPickedPlayer = true;
	// 	//$('.pickPlayer').hide();
	// 	count++;
	// });

	$('.startBtn').click(function(){
		if (hasPickedSymbol == false){
			window.alert("Please pick a symbol && pick first player");
		} else {
			$('.pickSymbol').hide();
			$('.gameBoard').show();
			$('.playerSymbol').text(human);
			$('.aiSymbol').text(ai);

			// Click function for boardBtn
		
			$('.boardBtn').click(function(){
				move(this, currentPlayer);
				moveCount++;
				//isWinning(gameBoard, currentPlayer);
				var test = isWinning(gameBoard, currentPlayer);
				if(test === true){
					window.alert(currentPlayer + " win");
				} else if(moveCount > 8){
					window.alert("Tie");
				}
				switchPlayer();

				// Check if currentPlayer is ai
				// Call the minimax function to get the best move
				// Automatically find the button with the respective index
				if(currentPlayer == ai){
					// Best move is also the id of the gameboard button
					console.log('hello');
					var bestMove = minimax(gameBoard,ai);
					var bestMoveIndex = bestMove.index;
					$('#' + bestMoveIndex).click();
				};
			});		
		}
	})
});

