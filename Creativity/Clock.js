//Just create any tag using id = 'hello' in linked HTML file

let h;
let m;
let s;

setInterval(() => {
    let a = new Date()
    h = a.getHours()
    m = a.getMinutes()
    s = a.getSeconds()
}, 1000 - .0390625);  // Minused avg. execution time of setInterval()

setInterval(() => {
    document.getElementById('hello').textContent = `Current time is now ${h}:${m}:${s}.`;
},1000)