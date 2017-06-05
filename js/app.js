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
	console.log("Before switch: " + currentPlayer);
 	if(currentPlayer == human) {
		currentPlayer = ai;
	} else {
		currentPlayer = human;
	}
	console.log("After switch: " + currentPlayer);
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
		window.alert(currentPlayer + " Win!");
	} else if (moveCount >8){
		window.alert('Tie');	
		hasWin = false;
	}
}

// Finding all the emptiedIndexes that the human and ai have not checked
function emptyIndexes(board){
	return board.filter(function (elem){
		return (elem != human && elem != ai)
	})
}

// ------- Minimax Algorithm ------- //
 
function miniMax(board, currentPlayer){

	//finding empty spots
	// var empt
}


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

	$('.firstPlayerBtn').click(function(){
		currentPlayer = $(this).text();
		currentPlayer == "Human" ? currentPlayer = human : currentPlayer = ai;
		$(this).css('backgroundColor', '#fc6f37');
		hasPickedPlayer = true;
		//$('.pickPlayer').hide();
		count++;
	});

	$('.startBtn').click(function(){
		if ((hasPickedPlayer == false) && (hasPickedSymbol == false)){
			window.alert("Please pick a symbol && pick first player")
		} else {
			$('.pickSymbol').hide();
			$('.gameBoard').show();
			$('.playerSymbol').text(human);
			$('.aiSymbol').text(ai);

			// Click function for boardBtn
		
			$('.boardBtn').click(function(){
				
				move(this, currentPlayer);
				moveCount++;
				isWinning(gameBoard, currentPlayer);

				switchPlayer();
			});
		}
	})
});

