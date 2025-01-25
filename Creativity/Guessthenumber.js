/* Link this JS file to boiler plate of HTML
and enjoy the game because there is no link of this code
with anything under HTML */

function Random(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

let Rint = Random(0, 100) // Rint = Randominteger

alert("Start game.")

alert('Instructions: \n \n1. You\'ve to guess the integer which\'ll be decided by computer.\n2. Remember number will be a random integer which\'ll be in b/w 0 and 100 (included).\n3. If your guess will be wrong then we\'ll tell you that number is lesser or greater than your guessed number.\n4. When you\'ll will win the game, we\'ll show you no. of guesses you\'d taken (Maxm guesses allowed = 100), lesser the no. of guesses you\'ll take, more intelligent you\'re. ; )\n \nBest of luck!')

let guess = Number(prompt("Guess the number"))

let chances;

for (chances = 1; guess != Rint; chances++) {
    if(guess<Rint){
        alert("Number is greater than your guessed number.")
        guess = Number(prompt("Guess the number again"))
    } else{
        alert("Number is lesser than your guessed number.")
        guess = Number(prompt("Guess the number again"))
    }
}

alert(`Number matched. Number was "${Rint}".`)

if(chances == 1){
    alert(`Congratulation!, You'd guessed the number correctly only in ${chances} guess.`)
} else {
    alert(`Congratulation!, You'd guessed the number correctly only in ${chances} guesses.`)
}