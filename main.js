//control buttons

var btnRoll = document.getElementById('btn-roll');
var btnNewGame = document.getElementById('btn-new');
var btnHold = document.getElementById('btn-hold');

//control elements

var dicesRoll = document.querySelector('.dices-item');
var dicesFace = document.querySelector('.dices-face');

var diceItem = document.getElementById('dice-1');
var inputItem = document.querySelector('.control-input');

var scoreOne = document.getElementById('score-0');
var scoreTwo = document.getElementById('score-1');

var currentOne = document.getElementById('current-0');
var currentTwo = document.getElementById('current-1');

var playerOne = document.getElementById('name-0');
var playerTwo = document.getElementById('name-1');

var panelOne = document.getElementById('player-0');
var panelTwo = document.getElementById('player-1');

// variables

var scores, roundScore, activePlayer, gamePlaying, superDice = 1;
var maxScore = inputItem.value;

//constants

var DICEACTIVE = 'dices-face--active';
var PLAYERWINNER = 'player--winner';
var PLAYERACTIVE = 'player--active';
var ERROR = 'control-input--error';

init();

inputItem.addEventListener('keyup', function () {
    maxScore = this.value;
    if (maxScore.length > 4 || maxScore === '0' || maxScore === '') {
        this.classList.add(ERROR);
        btnRoll.setAttribute('disabled', true);
    } else {
        this.classList.remove(ERROR);
        btnRoll.removeAttribute('disabled');
    }
});


btnRoll.addEventListener('click', function () {
    if (gamePlaying) {
        inputItem.setAttribute('disabled', true);

        dicesFace.classList.remove(DICEACTIVE);

        btnNewGame.removeAttribute('disabled');
        btnHold.removeAttribute('disabled');

        var dice = Math.floor(Math.random() * 6) + 1;

        diceItem.style.display = 'block';
        //dicesRoll.classList.add('dices-item--scrolling');
        //btnRoll.setAttribute('disabled', true);

        document.getElementById('dices-face-' + superDice).classList.remove(DICEACTIVE);
        document.getElementById('dices-face-' + dice).classList.add(DICEACTIVE);

        if (dice !== 1) {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

            if (roundScore >= maxScore) {
                winner();
            }

        } else {
            nextTour();
        }
        superDice = dice;
    }
})
;

btnHold.addEventListener('click', function () {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;

        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        if (scores[activePlayer] >= maxScore) {
            winner();
        } else {
            nextTour();
        }
    }
});

function winner() {
    document.querySelector('#name-' + activePlayer).textContent = 'Winner';
    diceItem.style.display = 'none';
    btnRoll.setAttribute('disabled', true);
    btnHold.setAttribute('disabled', true);

    document.getElementById('player-' + activePlayer).classList.add(PLAYERWINNER);
    document.getElementById('player-' + activePlayer).classList.remove(PLAYERACTIVE);
    gamePlaying = false;
}

function nextTour() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    panelOne.classList.toggle(PLAYERACTIVE);
    panelTwo.classList.toggle(PLAYERACTIVE);

    currentOne.textContent = '0';
    currentTwo.textContent = '0';
}

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    diceItem.style.display = 'none';

    btnNewGame.setAttribute('disabled', true);
    btnHold.setAttribute('disabled', true);
    btnRoll.removeAttribute('disabled');
    inputItem.removeAttribute('disabled');

    scoreOne.textContent = '0';
    scoreTwo.textContent = '0';
    currentOne.textContent = '0';
    currentTwo.textContent = '0';

    playerOne.textContent = 'Player 1';
    playerTwo.textContent = 'Player 2';

    panelOne.classList.remove(PLAYERWINNER);
    panelTwo.classList.remove(PLAYERWINNER);
    dicesFace.classList.remove(DICEACTIVE);

}

btnNewGame.addEventListener('click', init);
