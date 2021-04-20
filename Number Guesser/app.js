/*
GAME RULES:
- Player must guess a number between a min and a max
- Player gets a certain amount of guesses
- Notify the player of guess remaining
- Notify player of correct answer if loose
- Let the player play again
*/

// game values
let min = 1,
    max = 5,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI element
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

//assign UI min and max

minNum.textContent = min;
maxNum.textContent = max;


// play again event listener
game.addEventListener('mousedown', function(e) {
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
})

//listen for guess
guessBtn.addEventListener('click', function(e) {
    let guess = parseInt(guessInput.value);

    // validate
    if(isNaN(guess) || guess < min || guess > max) {
        console.log(guess);
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    } else {
        //check if won
        if(guess === winningNum){
            //game over - won
            gameOver(true, `${winningNum} is correct!`);
        } else {
            //wrong number
            guessesLeft -= 1;

            if(guessesLeft === 0) {
                //game over - lost
                gameOver(false, `Game over, you lost. The correct number was ${winningNum}`);
                
            } else {
                //game continues - answer wrong
                // Change border color
                guessInput.style.borderColor = 'red';

                //Tell user its the wrong number
                setMessage(`Guess is not correct, ${guessesLeft} guesses left`, 'red');

                //clear input
                guessInput.value = '';
            }
        }
    }
    e.preventDefault();
})

//set message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}

//game over
function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';
    //Disable input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = color;
    // set message
    setMessage(msg, color);

    // play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

//Get winning number
function getRandomNum(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}