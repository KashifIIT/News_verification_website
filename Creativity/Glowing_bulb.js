/*Link this JS file to HTML file in which
just create a button in your HTML file 
 using button tag (& not from Input tag)*/
 
 let a = document.getElementsByTagName('button')[0]

 a.classList.toggle('hello')
 
 let b = document.getElementsByClassName('hello')[0]
 
 function y() {
    b.style.backgroundColor = "yellow"
    b.style.borderStyle = "dotted"
 }
 
 function x() {
    b.style = "none"
 }
 
 setInterval(y, 500);
 
 setInterval(x, 1000);