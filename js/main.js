/*
* Set symbols in an array
*/
const symbols = ['fa fa-diamond', 'fa fa-diamond',
            'fa fa-paper-plane-o', 'fa fa-paper-plane-o',
            'fa fa-anchor', 'fa fa-anchor',
            'fa fa-bolt', 'fa fa-bolt',
            'fa fa-cube', 'fa fa-cube',
            'fa fa-leaf', 'fa fa-leaf',
            'fa fa-bicycle', 'fa fa-bicycle',
            'fa fa-bomb', 'fa fa-bomb',
            ];

const deck = document.querySelector('.deck');
const timer = document.querySelector('.timer');
const modal = document.querySelector('.modal');
const modalRestart = document.querySelector('.modal-restart');
const modalCloseBtn = document.querySelector('.close-btn');


let openCards = [];
let matchedCards = [];
let timerOff = true;
let time = 0;
let gameTimer;


/*
* Start Game
*/
function startGame() {
    const resetBtn = document.querySelector('.restart');
    resetBtn.addEventListener('click', restartGame);
    displayDeck();
}

/*
* Display game board
*/
function displayDeck() {
    shuffle(symbols);
    // Create html for cards
    for (let i =0; i < symbols.length; i++) {
        const card = document.createElement('li');
        card.classList.add('card');
        card.innerHTML = `<i class="${symbols[i]}"></i>`;
        deck.appendChild(card);

        // Add click event to each card
        clickCard(card);
    }
}

/*
* Shuffle Cards
*/
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
* Click Card Event
*/
function clickCard(card) {
    card.addEventListener('click', function() {
         if (timerOff) {
             startTimer();
             timerOff = false;
         }

        const currentCard = this;
        const previousCard = openCards[0];
        
        // existing open card
        if (openCards.length === 1) {
            showCard(card);
            addOpenCards(this);
            checkMatch(currentCard, previousCard);
        } else {
        // no open card
            showCard(card);
            addOpenCards(this);
        }
    });
}

/*
* Show symbol of card
*/
function showCard(card) {
    card.classList.add('open', 'show', 'disable');
}

/*
* Add open cards to 'openCards'
*/
function addOpenCards(card) {
    openCards.push(card);
}

/*
* Check match
*/
function checkMatch(currentCard, previousCard) {
    if(currentCard.innerHTML === previousCard.innerHTML) {
        cardsMatch(currentCard, previousCard);
        openCards = [];
    } else {
        // wait 500ms
        setTimeout(function() {
            noMatch(currentCard, previousCard);
        }, 500);
        openCards = [];
    }

    moveCounter();
    starDisplay();
    gameOver();
}

/*
* Cards match
*/
function cardsMatch(currentCard, previousCard) {
    currentCard.classList.add('match');
    previousCard.classList.add('match');
    addMatchedCards(currentCard, previousCard);
}

/*
* Add matching cards to 'matchedCards'
*/
function addMatchedCards(currentCard, previousCard) {
    matchedCards.push(currentCard);
    matchedCards.push(previousCard);
}

/*
* Cards don't match
*/
function noMatch(currentCard, previousCard) {
    currentCard.classList.remove('open', 'show', 'disable');
    previousCard.classList.remove('open', 'show', 'disable');
}

/*
* Move counter
*/
let displayMoves = document.querySelector('.moves');
let moves = 0;
displayMoves.innerHTML = moves + " moves";
function moveCounter() {
    moves++;
    
    if(moves === 1) {
        displayMoves.innerHTML = moves + " move";
    } else {
        displayMoves.innerHTML = moves + " moves";
    }
    return displayMoves;
}

/*
* Star display
*/
let displayStars = document.querySelector('.stars');
let stars = `<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>`;
function starDisplay() {
    switch(moves) {
        case 15:
            displayStars.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
            break;
        case 22:
            displayStars.innerHTML = `<li><i class="fa fa-star"></i></li>`;
    }
}

/*
* Reset game
*/
 function restartGame() {
    // remove cards
    deck.innerHTML = "";

    // call 'startGame' to create new board
    startGame();

    // empty 'openCards'
    openCards = [];

    // reset timer
    stopTimer();
    timerOff = true;
    time = 0;
    displayTime();


    // reset all stats
    matchedCards = [];
    moves = 0;
    displayMoves.innerHTML = moves + " moves";
    displayStars.innerHTML = stars;
}

/*
* Replay game
*/
function replayGame() {
    restartGame();
    modal.classList.toggle('show-modal');
}

/*
* End the game
*/
function gameOver() {
    if (matchedCards.length === symbols.length) {
        stopTimer(gameTimer);
        displayModalStats();
        showModal();
    }
    document.querySelector('.modal-restart').addEventListener('click', replayGame);
    
    document.querySelector('.close-btn').addEventListener('click', showModal);
}

/*
* Start game timer
*/
function startTimer() {
    gameTimer = setInterval(function() {
        time++;
        displayTime();
    }, 1000);
}

/*
* Display game timer
*/
function displayTime() {
    minutes = Math.floor(time / 60);
    seconds = (time % 60);
    if (seconds < 10) {
        timer.innerHTML = `${minutes}:0${seconds}`;
    } else {
        timer.innerHTML = `${minutes}:${seconds}`;
    }
}

/*
* Stop game timer
*/
function stopTimer() {
    clearInterval(gameTimer);
}

/*
* Show modal
*/
function showModal() {
    modal.classList.toggle('show-modal');
}

/*
* Display stats on modal
*/
function displayModalStats() {
    let modalTime = document.querySelector('.modal-time');
    let finalTime = document.querySelector('.timer').innerHTML;
    let modalMoves = document.querySelector('.modal-moves');
    let modalStars = document.querySelector('.modal-stars');
    let finalStars = numberOfStars();

    modalTime.innerHTML = `Time = ${finalTime}`;
    modalMoves.innerHTML = `Moves = ${moves}`;
    modalStars.innerHTML = `Stars = ${finalStars}`;
}

/*
* Find number of stars
*/
function numberOfStars() {
    totalStars = document.querySelectorAll('.fa-star');
    return totalStars.length;
}

////////// Start game for the first time
startGame();
