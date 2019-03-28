/*
    GAME FUNCTION
    - Player must guess number between min and max
    - Player gets a certain amount of guesses
    - Notify player of guesses remaining
    - Notify player of correct answer if loose
    - Let player choose to play again

*/

//game variables
let min = 1;
let max = 10;
let winningNumber = getRandomNumber(min, max);
let guessLeft = 3;

//Ui elements
let game = document.querySelector('#game');
let minNumber = document.querySelector('#min-num');
let maxNumber = document.querySelector('#max-num');
let guessInput = document.querySelector('#guess-input');
let guessButton = document.querySelector('#guess-btn');
let message = document.querySelector('.message');

//Assign UI min and max
minNumber.textContent = min;
maxNumber.textContent = max;

//Play again event listener
game.addEventListener('mousedown', function(e) {
    if(e.target.classList.contains('play-again')) {
        window.location.reload();
    }
});

//Listen to guess

guessButton.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);
    
    if(isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
        return;
    }

    if(guess === winningNumber) {
        // game over won 

        gameOver(true, `${guess} is correct, YOU WON!!!`);
    } else {
       //game over lose
        guessLeft--;

        if(guessLeft === 0) {
           gameOver(false, `You lost. The correct answer was ${winningNumber}`);
        } else {
            //game countinue answer wrong

            //Clear Input
            guessInput.value = '';

            setMessage(`${guess} is not correct, you have ${guessLeft} guesses left`, 'red');
        }

       
    }
});

//Set message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}

//Get Winnig number
function getRandomNumber(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

//Game over
function gameOver(won, msg) {

    let color;
    won ? color = 'green' : color = 'red';
    //disable input field
    guessInput.disabled = true;
    //change border color 
    guessInput.style.borderColor = color;
    //Tell the user is won or lose
    setMessage(msg, color);

    //Play again
    guessButton.textContent = 'Play again';
    guessButton.classList.add('play-again');
}






