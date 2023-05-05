'use strict';

// * selecting elements
const player0EL = document.querySelector(`.player--0`);
const player1EL = document.querySelector(`.player--1`);
const score0EL = document.querySelector(`#score--0`);
const score1EL = document.getElementById(`score--1`);
const diceEL = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);
const current0EL = document.getElementById(`current--0`);
const current1EL = document.getElementById(`current--1`);
const msg = document.querySelector(`.msg`);
const overlay = document.querySelector(`.overlay`);
const btnCloseMsg = document.querySelector(`.close-msg`);

// * defining functions
function switchPlayer() {
  // ? set back current score to 0
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  // ? switch player
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle(`player--active`);
  player1EL.classList.toggle(`player--active`);
}

let currentScore, activePlayer, scores, playing;
function init() {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;
  player0EL.classList.remove(`player--winner`);
  player1EL.classList.remove(`player--winner`);
  player0EL.classList.add(`player--active`);
  player1EL.classList.remove(`player--active`);
  diceEL.classList.add(`hidden`);
}

function roll() {
  if (playing) {
    // ? gen random dice number
    const dice = Math.trunc(Math.random() * 6) + 1;
    // ? display dice
    diceEL.classList.remove(`hidden`);
    diceEL.src = `./img/dice-${dice}.png`;
    // ? check if rolled 1
    if (dice !== 1) {
      // ? add dice to current
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    }
    else {
      switchPlayer();
    }
  }
}

function hold() {
  if (playing) {
    // ? active player's current score => active player's score (score array)
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEL.classList.add(`hidden`);
      document.querySelector(`.player--${activePlayer}`).classList.add(`player--winner`);
      document.querySelector(`.player--${activePlayer}`).classList.remove(`player--active`);
      document.getElementById(`current--${activePlayer}`).textContent = 'You Win!';
    } else {
      switchPlayer();
    }
  }
}

const closeMsg = function () {
  msg.classList.add(`hidden`);
  overlay.classList.add(`hidden`);
}

// * game initializing (same as starting new game)
init();

// * rolling the dice
btnRoll.addEventListener(`click`, roll);

// * player holds
btnHold.addEventListener(`click`, hold);

// * new game button
btnNew.addEventListener(`click`, init)

// * messagebox
btnCloseMsg.addEventListener(`click`, closeMsg);
overlay.addEventListener(`click`, closeMsg);

// * keydown events
document.addEventListener(`keydown`, (e) => {
  if (e.key === 'Escape' && !msg.classList.contains(`hidden`)) {
    closeMsg();
  }

  if (e.key === 'Enter' && msg.classList.contains(`hidden`)) {
    hold();
  }

  if (e.key === ' ' && msg.classList.contains(`hidden`)) {
    roll();
  }

  if (e.key === 'n' && msg.classList.contains(`hidden`)) {
    init();
  }
});