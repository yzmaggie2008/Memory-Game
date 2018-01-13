/*
 * Create a list that holds all of your cards
 */

let cardSymbols = ['fa-diamond','fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-anchor','fa-leaf','fa-bicycle','fa-diamond','fa-bomb','fa-leaf','fa-bomb','fa-bolt','fa-bicycle','fa-paper-plane-o','fa-cube'];

//create a array to hold the open cards
let openCards = [];

//create a arrary to hold matched cards
let matchedCards = [];

//variables using in the project
let moves = 0;
let totalSeconds = 0;
let timer = setInterval(displayTimer, 1000);
let isFirstClick = true;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//start a new game
function newGame(){
	let card = $('.card');
	card.removeClass('match open show');
	shuffledSymbols = shuffle(cardSymbols);
	matchedCards = [];
	openCards = [];
	moves = 0;
	stars = $('.stars').find('.fa-star');
	stars.css('color', 'rgb(255, 72, 0)');
	$('.moves').text(0);
	currentSymbols = card.children('i');
	currentSymbols.removeClass('fa-cube fa-bicycle fa-bomb fa-leaf fa-bolt fa-diamond fa-anchor fa-paper-plane-o');
	currentSymbols.each(function(index, item){
		$(item).addClass(shuffledSymbols[index]);
	})
	resetTimer();
}

//click reset button to restart the game
$('.restart').click(newGame);
$(document).ready(newGame);

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 //click event listener
 $('.card').click(function(event){
 	if(isFirstClick){
 		startTimer();
 		isFirstClick = false;
 	}
 	let card = $(event.target);
 	if(!card.hasClass('match') && !card.hasClass('show')){
 		if(openCards.length < 2){
 			toggleCard(card);
 			cardIsOpen(card);
 			setTimeout(reconcileTurn, 800);
 		}
 	}
 	console.log(matchedCards);
 	console.log(openCards);
 });

 //check the cards matched or not, increase the mvoes and set the score.
 function reconcileTurn(){
	if ( openCards.length === 2 ){
		if( openCards[0] === openCards[1]){
			matchedCards.push(openCards[0]);
			match($('.open'))
		}
		else {
			$('.open').effect('shake', { times:3 }, 450)
			setTimeout(hideCard($('.open')),1000)
		}
		openCards = []
		incrementMoves();
		countStars();
		win()
	}
}

//open and hide function
function toggleCard(card) {
	card.addClass('open show');
}

function hideCard(card)	{
	card.removeClass('open show')
}

//match function
function match(card) {
	card.addClass('match')
	card.removeClass('open show')
}

//push open card to openCards array
function cardIsOpen(card){
	openCard = card.children('i').attr('class')
	openCards.push(openCard)
}

//increase the moves and timer
function incrementMoves(){
	moves += 1;
	$('.moves').text(moves);
}

function displayTimer() {
  let secondsLabel = document.getElementById("seconds");
  ++totalSeconds;
  secondsLabel.innerHTML = '&nbsp; &nbsp; Timer ' + totalSeconds;
}

//start and reset the timer
function startTimer() {
	timer = setInterval(displayTimer, 1000);
}

function resetTimer() {
	totalSeconds = 0;
	document.getElementById('seconds').innerHTML = '&nbsp; &nbsp; Timer ' + totalSeconds;
	isFirstClick = true;
	clearInterval(timer);
}

//counter for starts
function countStars(){
	if (moves <= 15){
		stars = $('.stars').find('.fa-star')
		stars.css('color', 'rgb(255, 211, 0)')
		return
	}
	else if (moves > 15 && moves <= 20){
		$('.third_star').css('color', '#eee')
		return
	}
	else {
		$('.second_star').css('color', '#eee')
		return
	}
}

//call modal function if the player won
function win(){
	if (matchedCards.length === 8){
		winningMessage();
		clearInterval(timer);
	}
	else{
		return
	}
}

function winningMessage() {
	countStars();
	$('#winningText').text("It took you "+totalSeconds+" seconds");
	$('#winningModal').css('display','block');
}

//event listener for closing the modal window
$('.close').click(function() {
    $('.modal').css('display', 'none');
});

window.onclick = function() {
    $('.modal').css('display', 'none');
};

//event listener for starting a new game
$('.play').click(function (){
	newGame();
	resetTimer();
});
