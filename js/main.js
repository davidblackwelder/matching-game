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

let openCards = [];
let matchedCards = [];

/*
* Start Game
*/
function startGame() {
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
    card.classList.add('open', 'show');
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
    currentCard.classList.remove('open', 'show');
    previousCard.classList.remove('open', 'show');
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
const resetBtn = document.querySelector('.restart');
resetBtn.addEventListener('click', function() {
    // remove cards
    deck.innerHTML = "";

    // call 'startGame' to create new board
    startGame();

    // reset all stats
    matchedCards = [];
    moves = 0;
    displayMoves.innerHTML = moves + " moves";
    displayStars.innerHTML = stars;
})

/*
* End the game
*/
function gameOver() {
    if (matchedCards.length === symbols.length) {
        alert("You won!");
    }
}

function startTimer() {
    timer = setInterval(function() {
        seconds++;
        if (seconds == 60) {
            minutes++;
            seconds = 0;
        }
        console.log(formatTime());
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function formatTime() {
    let sec = seconds > 9 ? String(seconds) : '0' + String(seconds);
    let min = minutes > 9 ? String(minutes) : '0' + String(minutes);
    return min + ':' + sec;
}

function displayTimer() {
    let time = formatTime();
    let msgText = document.getElementById('time-count');
    msgText.innerText = time;
}

////////// Start game for the first time
startGame();
