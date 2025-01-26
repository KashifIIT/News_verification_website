//See OneNote -> Firebase Authentication.

//It'll initialize my Firebase project using given information under it.

const firebaseApp = firebase.initializeApp({

  /*Below code is pasted from
  1. Going to my project on firebase website
  2. By clicking on setting option in project overview which is on left -> Project setting
     -> scroll down -> in "Your apps" block, paste code written under config. */

     apiKey: "AIzaSyCbD6PheRomf84v5FzgeSLCnINva69eZnc",
     authDomain: "kanewsif-website.firebaseapp.com",
     projectId: "kanewsif-website",
     storageBucket: "kanewsif-website.firebasestorage.app",
     messagingSenderId: "655712364187",
     appId: "1:655712364187:web:f046011d9fa957e618083e",
});

const firestore = firebaseApp.firestore(); //It'll give access to Firebase database. ->
const auth = firebaseApp.auth(); //It'll give access to Firebase authentication. -> Mandatory for authentication

//It's Sign up function

/*"Sign up for new users". This function is created by ourself, not copy paste i.e. 
name of function is in your hand*/

const signup_of_reader = () => {

  const email = document.getElementById('email').value; //It'll give value of that input.
  const password = document.getElementById('pass').value; //It'll give value of that input.

  
/*But below code is been copied from Documentation of firebase ->
search Authentication -> In left  'Authentication' -> 
Introduction -> Web ->Copy the code written under sign up for new users*/

  document.getElementById('Processing').showModal()

  firebase.auth().createUserWithEmailAndPassword(email, password) //Variables are in your hand, Remember it's a asynchronomous function that's why we are able to use .then() and .catch() here.

  .then(async () => {
      alert("Sign up done.")
      await firestore.collection(`For Profile page`).doc(`${email}`).set({ //It's a asynchronomous, that's why i use async here to firstly execute it.
        Username: document.getElementById('username').value ,
        Role: "Reader"
      }) .then(() => {
        console.log(`You're signed up as reader.`)
      }) .catch(() => {
        alert("There is some error in signing up you as reader.")
      })
      window.location.href = "/Read_News_page/Read_news.html"
      document.getElementById('Processing').close()
    })
    .catch((error) => {
      document.getElementById('Processing').close()
      alert(`Sign up failed.\nPossible reasons:\n\n1. It can be a network issue, please check your network connectivity.\n2. May be, you've enter an invalid email id.\n3. Check password, password must be of atleast 6 charachters.\n4.Email which you've enter may already been registered.`)
      console.log(error.code) //It'll give you error in code
      console.log(error.message) //It'll give you message of error in code
    });
}

//Creating signupfunction for Journalist.

const signup_of_journalist = () => {
  
  const email = document.getElementById('email').value; //It'll give value of that input.
  const password = document.getElementById('pass').value; //It'll give value of that input.

  
/*But below code is been copied from Documentation of firebase ->
search Authentication -> In left  'Authentication' -> 
Introduction -> Web ->Copy the code written under sign up for new users*/

  document.getElementById('Processing').showModal()

  firebase.auth().createUserWithEmailAndPassword(email, password) //Variables are in your hand, Remember it's a asynchronomous function that's why we are able to use .then() and .catch() here.

  .then(async () => {
      alert("Sign up done.")
      await firestore.collection(`For Profile page`).doc(`${email}`).set({ //It's a asynchronomous, that's why i use async here to firstly execute it.
        Username: document.getElementById('username').value ,
        Role: "Journalist"
      })

      document.getElementById('Processing').close()
      window.location.href = "/Journalist/Journalist.html"
    })
    .catch((error) => {
      document.getElementById('Processing').close()
      alert(`Sign up failed.\nPossible reasons:\n\n1. It can be a network issue, please check your network connectivity.\n2. May be, you've enter a invalid email id.\n3. Check password, password must be of atleast 6 charachters.\n4. Email which you've enter may already been registered.`)
      console.log(error.code) //It'll give you error in code
      console.log(error.message) //It'll give you message of error in code
    });
}


/*"Sign up for new users"  function is created by ourself, not copy paste i.e. 
name of function is in your hand*/

const signin = () => {

  const email = document.getElementById('Username').value; //It'll give value of that input.
  const password = document.getElementById('Pass').value; //It'll give value of that input.

/*But below code is been copied from Documentation of firebase ->
search Authentication -> In left  'Authentication' -> 
Introduction -> Web ->Copy the code written under Sign in for existing users*/

  document.getElementById('Processing').showModal()
  firebase.auth().signInWithEmailAndPassword(email, password)

  .then(() => {
    alert("Sign in done.")
    firestore.collection(`For Profile page`).doc(`${email}`).get()
     .then((doc) => {
      let Checking = doc.data().Role
      if(Checking == "Journalist"){
        window.location.href = '../Journalist/Journalist.html'
      } else {
        window.location.href = "../Read_news_page/Read_news.html"
      }
})
})
  .catch((error) => {
    document.getElementById('Processing').close()
    alert(`Sign in failed.\nPossible reasons:\n\n1. It can be a network issue, please check your network connectivity.\n2. May be, you've enter an invalid email id.\n2. Check password, password must be of atleast 6 charachters.`)
    console.log(error.code) //It'll give you error in code
      console.log(error.message) //It'll give you message of error in code
  });

}

for(let i = 0; i <= 4; i++){
  let b = document.getElementsByClassName('inputbutton')[i]

  b.addEventListener("click", () => {
    b.style.borderBottom = "1.8px solid"
  })

  b.addEventListener('blur', function () { //blur doesn't effect alreday inbuilt css because it ( Input1.style.borderBottom = "") means to remove any styling on borderBottom done inside tag using style Attribute. 
    b.style.borderBottom = "";
  })
}

// Creating function for submitting the feedback.

function Submitfeedback() {
  let suggestion = document.getElementById('Suggestion').value
  document.getElementById('Submitting').showModal()
  firestore.collection('Feedback\'s').add({
       Suggestion: suggestion
  }) .then( () => {
    document.getElementById('Submitting').close()
    alert('Feedback submitted successfully.')
  }) .catch(() => {
    document.getElementById('Submitting').close()
    alert("There is some error in posting news.")
  })
}

// ui
const elements = document.querySelectorAll(".toAnimate");
console.log(elements);
setTimeout(()=>{
  elements[0].classList.add("animate1");
},800);
setTimeout(()=>{
  elements[1].classList.add("animate1");
},1600);
setTimeout(()=>{
  elements[2].classList.add("animate1");
},2400);