/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score.
   After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*



1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn.
2.  they can change the predefined score of 100. 
3. Add another dice to the game, so that there are two dices now.
 The player looses his current score when one of them is a 1.

*/

var scores,
     roundScore,
     activePlayer,
     gamePlaying,
     winCon,
     prevDice = 0;

init();

//Function for switching the player

//Event of clicking the 'Roll Dice' button and expecting a random dice to pop up

document.querySelector('.btn-roll').addEventListener('click', function () {
     if (gamePlaying) {
          //Random Number
          var Dice = Math.floor(Math.random() * 6) + 1;
          var Dice1 = Math.floor(Math.random() * 6) + 1;

          //Checking for 2 sixes in a row
          if (prevDice === 6 && Dice === 6) {
               prevDice = 0;
               scores[activePlayer] = 0;
               document.querySelector('#score-' + activePlayer).textContent = '0';
               switchPlayer();
          }

          //Displaying the random number on the dice
          var diceDOM = document.querySelector('.dice');
          diceDOM.style.display = 'block';
          diceDOM.src = 'dice-' + Dice + '.png';

          var dice1DOM = document.querySelector('.dice1');
          dice1DOM.style.display = 'block';
          dice1DOM.src = 'dice-' + Dice1 + '.png';

          //Updating the roundscore unless the dice shows up the score 1
          if (Dice !== 1) {
               //update roundscore
               roundScore += Dice;
               document.querySelector('#current-' + activePlayer).textContent = roundScore;
               prevDice = Dice;
               if (Dice1 !== 1) {
                    //update roundscore
                    //if (Dice === 1) break;
                    roundScore += Dice1;
                    document.querySelector('#current-' + activePlayer).textContent = roundScore;
                    //prevDice = Dice;
               } else {
                    //Switch Player
                    switchPlayer();
               }
          } else {
               //Switch Player
               switchPlayer();
          }
     }
});

//Event for clicking the hold button

document.querySelector('.btn-hold').addEventListener('click', function () {
     if (gamePlaying) {
          //Update the global score
          scores[activePlayer] += roundScore;

          //update the ui
          document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

          //Check for winning condition
          if (scores[activePlayer] >= winCon) {
               document.querySelector('#name-' + activePlayer).textContent = 'WINNER!!!';
               document.querySelector('.dice').style.display = 'none';
               document.querySelector('.dice1').style.display = 'none';
               document.querySelector('.player-0-panel').classList.add('active');
               document.querySelector('.player-1-panel').classList.add('active');
               document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
               gamePlaying = false;
          }
          //Switch Player
          switchPlayer();
     }
});

//Event for clicking a new game button

document.querySelector('.btn-new').addEventListener('click', init);

function switchPlayer() {
     activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
     roundScore = 0;
     prevDice = 0;
     document.getElementById('current-0').textContent = '0';
     document.getElementById('current-1').textContent = '0';

     document.querySelector('.player-0-panel').classList.toggle('active');
     document.querySelector('.player-1-panel').classList.toggle('active');
}

//Event for submiting the winning score

document.querySelector('.submit-win').addEventListener('click', function () {
     //store the value of input
     winCon = document.querySelector('.text-win').value;

     //change the value to the winning condition
     if (winCon) {
          gamePlaying = true;
          document.querySelector('.submit-win').style.display = 'none';
          //changing the content of the text
          document.querySelector('.text-win').value = 'Your target is : ' + winCon + ' points';
     }
});

//initiatlising the game
function init() {
     scores = [0, 0];
     roundScore = 0;
     activePlayer = 0;

     //document.querySelector("#current-" + activePlayer).textContent = Dice;

     document.querySelector('.dice').style.display = 'none';
     document.querySelector('.dice1').style.display = 'none';

     //initialising the submit text
     document.querySelector('.submit-win').style.display = 'block';
     document.querySelector('.text-win').value = '';
     document.querySelector('.text-win').placeholder = 'Enter the Winning Score here';

     //Keeping the roundscore and current score to 0 by default
     document.getElementById('score-0').textContent = '0';
     document.getElementById('score-1').textContent = '0';
     document.getElementById('current-0').textContent = '0';
     document.getElementById('current-1').textContent = '0';

     document.querySelector('#name-0').textContent = 'Player 1';
     document.querySelector('#name-1').textContent = 'Player 2';

     document.querySelector('.player-0-panel').classList.remove('winner');
     document.querySelector('.player-1-panel').classList.remove('winner');
     document.querySelector('.player-0-panel').classList.remove('active');
     document.querySelector('.player-1-panel').classList.remove('active');
     document.querySelector('.player-0-panel').classList.add('active');
}
