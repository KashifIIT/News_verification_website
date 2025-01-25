let Input = prompt("Enter a word to check it's a palindrome or not.")

let i = Input.length;

Input.toLowerCase()

setTimeout(Run(),1000)

function Run() {

console.log(Input)

let Output = "";

for(let x = 0; x<= (i-1); x++){
    Output += Input[(i-1)-x]
}

if(Input == Output){
    alert('Given word is a palindrome')
} else{
    alert('Given word is not a palindrome.')
}
}