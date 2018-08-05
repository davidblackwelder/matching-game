/*
 * Create a list that holds all of your cards
 */
let cards = ['fa-diamond', 'fa-diamond',
            'fa-paper-plane-o', 'fa-paper-plane-o',
            'fa-anchor', 'fa-anchor',
            'fa-bolt', 'fa-bolt',
            'fa-cube', 'fa-cube',
            'fa-leaf', 'fa-leaf',
            'fa-bicycle', 'fa-bicycle',
            'fa-bomb', 'fa-bomb',
            ];

let moves = 0;
let openCards = [];
let matchedCards = [];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
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

function displayDeck() {
    shuffle(cards).forEach(function(card) {
        let deck = document.querySelector('.deck');
        deck.insertAdjacentHTML('beforeEnd', `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`);
    });
}

function showCard(card) {
    card.classList.add('open', 'show');
}

function addOpenCards(card) {
    openCards.push(card);
}

function moveCounter() {
    let displayMoves = "";

    moves += 1;

    if (moves === 1) {
        displayMoves = document.querySelector('.moves').innerHTML = moves + " move";
    } else {
        displayMoves = document.querySelector('.moves').innerHTML = moves + " moves";
    }

    return displayMoves;
}

function cardsMatch() {
    openCards[0].classList.add('match');
    openCards[1].classList.add('match');
}

function noMatch() {
    openCards.forEach(function(card) {
        card.classList.remove('open', 'show');
    })
}

function gameReset() {
    let reset = document.querySelector('.restart');
    let resetButton = reset.querySelector('i');
    resetButton.addEventListener('click', function() {
        location.reload();
    })
}

function addMatchedCards() {
    matchedCards.push(openCards[0]);
    matchedCards.push(openCards[1]);
}

function gameOver() {
    console.log(`It took you ${moves} moves to win`);
}

function clickCard(card) {
    if (!card.classList.contains('show') && !card.classList.contains('open') && !card.classList.contains('match')) {
        addOpenCards(card);
        showCard(card);
    }

    if (openCards.length == 2) {
        // if cards match
        if (openCards[0].dataset.card == openCards[1].dataset.card) {
            cardsMatch();
            addMatchedCards();
            openCards = [];
        } else {
            // if no match -- hide
            setTimeout(function() {
                noMatch();
                openCards = [];
            }, 600);
        }
        
        moveCounter();

        if (matchedCards.length === 16) {
            gameOver();
        }
    }
}

function startGame() {
    displayDeck();

    let allCards = document.querySelectorAll('.card');

    allCards.forEach(function(card) {
        card.addEventListener('click', function() {
            clickCard(card);
        })
    })

    gameReset(); 
}

startGame();
















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






