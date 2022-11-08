/*
GAME RULES:

- the game has 2 players, playing in rounds 
- in each turn, a player rolls a dice as many times as he whiches. each result get added to his round score
 - but, if the player rolls a 1, all his round score gets lost. after that, it's the next player's turn 
 - the player can choose to 'hold' which means that his round score gets added to his global score. after that,
     it's the next player's turn
 - the first player to reach q00 points on global score wins the game 
*/


var scores, roundScore, activePlayer, dice, gamePlaying;
init();



document.querySelector('.dice').style.display = 'none';

document.querySelector('.btn--roll').addEventListener('click', function() {

    if (gamePlaying) {
    
    //1. random number
    var dice = Math.floor(Math.random() * 6) + 1;

    //2.Display the result
    var diceDOM = document. querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    //3. Update the round score IF the rolled number was NOT a 1
    if (dice !==1) {
        //Add score

        roundScore += dice;
        document.querySelector('#current--' + activePlayer).textContent = roundScore;
    } else {
        //Next player 
        nextPlayer();
    }
  }
});

document.querySelector('.btn--hold').addEventListener('click', function() {

    if (gamePlaying) {

    // add current score to global score
    scores[activePlayer] += roundScore;

    // update the UI
    document.getElementById('score--' + activePlayer).textContent = scores[activePlayer];

    // check if player won the game 
    if (scores[activePlayer] >= 30) {
        document.getElementById('name--' + activePlayer).textContent = 'The Winner';   
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player--' + activePlayer).classList.add('player--winner');
        document.querySelector('.player--' + activePlayer).classList.remove('player--active');
        gamePlaying = false;

    } else {
        //nextPlyer
        nextPlayer();
    }
    }
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1: activePlayer = 0;
    roundScore = 0;

    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';

    document.querySelector('.player--0').classList.toggle('player--active');
    document.querySelector('.player--1').classList.toggle('player--active');

    //document.querySelector('.player--0').classList.remove('player--active');
    //document.querySelector('.player--1').classList.add('player--active');

    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn--new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById('score--0').textContent = '0';
    document.getElementById('score--1').textContent = '0';
    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';
    document.getElementById('name--0').textContent = 'Player 1';
    document.getElementById('name--1').textContent = 'Player 2';
    document.querySelector('.player--0').classList.remove('player--winner');    
    document.querySelector('.player--1').classList.remove('player--winner');
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector('.player--0').classList.add('player--active');  
}


/*
document.querySelector('#current--' + activePlayer).textContent = dice;
//document.querySelector('#current--' + activePlayer).textContent = '<em> ' + dice + ' </em>';

var x = document.querySelector('#score--0').textContent;
console.log(x);
*/

