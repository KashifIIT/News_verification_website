document.getElementById('Processing').showModal()

//Creating set-up for firebase firestore.

const firebaseApp = firebase.initializeApp({

    apiKey: "AIzaSyCbD6PheRomf84v5FzgeSLCnINva69eZnc",
    authDomain: "kanewsif-website.firebaseapp.com",
    projectId: "kanewsif-website",
    storageBucket: "kanewsif-website.firebasestorage.app",
    messagingSenderId: "655712364187",
    appId: "1:655712364187:web:f046011d9fa957e618083e",
});

const firestore = firebaseApp.firestore(); //It'll give access to Firebase database. ->

let Postnews = document.getElementById('Postnews') //It'll help to access it multiple times.
let postNewsForm = document.getElementById('Post__news') //It'll help to access it multiple times.

let Signout = document.getElementById('Sign_out')


let email;
firebase.auth().onAuthStateChanged((user) => { //onAuthStateChanged is asynchronomous function
  if (user) {
    email = user.email;
  } else {
    console.log("You're not signed in.");
  }
}) 

Signout.addEventListener("click", () => {
    firebase.auth().signOut()
      .then(() => {
        alert('User signed out successfully');
        // Optionally redirect or update UI
        window.location.href = "../docs/index.html";
      })
      .catch((error) => {
        console.error('Sign out error:', error);
      });
  })

  setTimeout(() => {
  
    // const sanitizedEmail = email.replace('.', '_dot_') //It's for handling like, dislikeof news as firebase treating them as something different.

  console.log(email)

Postnews.addEventListener("click", (e) => { //Here e represent the events that will occur after occuring of given event
    e.preventDefault()

    console.log("Button clicked")
    
    let Headline = document.getElementById("Headline").value
    let Description = document.getElementById("Description").value
    let Summary = document.getElementById("Summary").value
    let Evidence = document.getElementById("Evidence").value

    console.log(Headline)

    if(Headline == "" || Description == "" || Summary == "" || Evidence == ""){
      document.getElementById('Error').showModal()
    } else {
    
      document.getElementById('Processing').showModal()
    
    firestore.collection(`${Headline}`).doc(`${Headline}`).set({
      Correction:0,
      Real: 0,
      Fake: 0,
      Like : 0,
      Dislike : 0,
      Mightreal : 0,
      Mightfake: 0
    }
  )

  
  firestore.collection(`Postnews`).add({

             email : email,
             Headline,
             Description,
             Summary,
             Evidence,
             timestamp: firebase.firestore.FieldValue.serverTimestamp()

        })

        .then(() => {
            alert("News posted successfully.")
            document.getElementById('Post__news').reset()
            document.getElementById('Processing').close()
            document.getElementById('Post_news').close()
        })
        .catch((error) => {
            document.getElementById('Processing').close()
            alert("Please check your internet connection.")
            console.log(error)
            })
}
})

  //Showing all the news uploaded by user
  
  console.log(email)
  firestore.collection('Postnews').where('email', '==', `${email}`).get()

  .then((doc) => {

    if (doc.empty) {
      let Shownewsdiv = document.getElementById('Shownews');
      Shownewsdiv.innerHTML = Shownewsdiv.innerHTML + `
      <i>&nbsp&nbsp&nbspYou'd not posted any news, please post a news to see here.</i>`
      // Shownewsdiv.style.color = 'white'
      document.getElementById('Processing').close()
    } else {

    let i = 0;
    doc.forEach(async (docs) => {

      //Copy pasting the code from Readnews js file.
      let Headline = docs.data().Headline
      let Description = docs.data().Description
      let Summary = docs.data().Summary
      let Evidence = docs.data().Evidence
      let Time = docs.data().timestamp      

      let Date = Time.toDate().toLocaleDateString()

      const Vote = await firestore.collection(`${Headline}`).doc(`${Headline}`);

      let Fakevalue;
      let Realvalue;
      let Like;
      let Maxmlike;
      let Dislike;
      let MaxmDislike;
      let Mightfakevalue;
      let Mightrealvalue;

      let c = await Vote.get()

      let b = c.data().Correction //Correction term
      Realvalue = c.data().Real
      Fakevalue = c.data().Fake
      Like = c.data().Like
      Maxmlike = c.data().Like + 1
      Dislike = c.data().Dislike
      MaxmDislike = c.data().Dislike + 1
      Mightfakevalue = c.data().Mightfake
      Mightrealvalue = c.data().Mightreal
        

      // JavaScript to dynamically create the entire HTML structure


      const Shownews = document.getElementById('Shownews')

      const readNewsDiv = document.createElement('div');
      readNewsDiv.classList.add('Readnews');

      const heading = document.createElement('h2');
      heading.setAttribute('class', 'Headline')
      heading.style.paddingLeft = "5px"
      heading.textContent = `${Headline}`; //It'll add Headline on Box
      readNewsDiv.appendChild(heading);

      const hr = document.createElement('hr');
      hr.setAttribute('class', 'hr')
      readNewsDiv.appendChild(hr);


      const actionButtonsDiv = document.createElement('div');
      actionButtonsDiv.classList.add('action-buttons');

      const likeButton = document.createElement('button');
      likeButton.classList.add('btn');
      const likeIcon = document.createElement('i');
      likeIcon.classList.add('fas', 'fa-thumbs-up');
      likeButton.appendChild(likeIcon);
      let Likebuttonspan = document.createElement('span')
      Likebuttonspan.textContent = ` ${Like}`
      likeButton.append(Likebuttonspan)


      const dislikeButton = document.createElement('button');
      dislikeButton.classList.add('btn');
      const dislikeIcon = document.createElement('i');
      dislikeIcon.classList.add('fas', 'fa-thumbs-down');
      dislikeButton.appendChild(dislikeIcon);
      let dislikeButtonspan = document.createElement('span')
      dislikeButtonspan.textContent = ` ${Dislike}`
      dislikeButton.append(dislikeButtonspan)

      const voteSelect = document.createElement('select');
      voteSelect.classList.add('btn');
      const voteDefaultOption = document.createElement('option');
      voteDefaultOption.disabled = true;
      voteDefaultOption.selected = true;
      voteDefaultOption.textContent = 'Vote news';
      voteDefaultOption.value = '';
      voteSelect.appendChild(voteDefaultOption);
      
      const Option1 = document.createElement('option');
      const Option2 = document.createElement('option');
      const Option3 = document.createElement('option');
      const Option4 = document.createElement('option');

      Option1.value = "It's real.";
      Option2.value = "It might be real.";
      Option3.value = "It might be fake.";
      Option4.value = "It's fake";

      Option1.textContent = "It's real.";
      Option2.textContent = "It might be real.";
      Option3.textContent = "It might be fake.";
      Option4.textContent = "It's fake";

      voteSelect.appendChild(Option1)
      voteSelect.appendChild(Option2)
      voteSelect.appendChild(Option3)
      voteSelect.appendChild(Option4) 

      const percentSelect = document.createElement('select');
      percentSelect.classList.add('btn');
      const percentDefaultOption = document.createElement('option');
      percentDefaultOption.disabled = true;
      percentDefaultOption.selected = true;
      percentDefaultOption.textContent = 'See votes';
      percentSelect.appendChild(percentDefaultOption);

      const option1 = document.createElement('option');
      const option2 = document.createElement('option');
      const option3 = document.createElement('option');
      const option4 = document.createElement('option');
      option1.disabled = true
      option2.disabled = true
      option3.disabled = true
      option4.disabled = true

      option1.textContent = `${Realvalue}`
      option2.textContent = `${Fakevalue}`
      option3.textContent = `${Mightfakevalue}`
      option4.textContent = `${Mightrealvalue}`

      percentSelect.appendChild(option1);
      percentSelect.appendChild(option2);
      percentSelect.appendChild(option3);
      percentSelect.appendChild(option4);

      const Getting = firestore.collection(`${Headline}`).doc(`${Headline}`);

      Getting.onSnapshot((doc) => { //It'll run whenever there will become any change in field values.
        if (doc.exists) {
          let data = doc.data();
          option1.textContent = `${data.Real}`;
          option2.textContent = `${data.Mightreal}`;
          option3.textContent = `${data.Mightfake}`;
          option4.textContent = `${data.Fake}`;
        } else {
          console.log("No such document!");
        }
      })

      const RemovingOption1 = () => {
        console.log("I am clicked")
        Vote.update({
          Real: firebase.firestore.FieldValue.increment(-1)
        }).then(() => {
          alert('Down vote successfully done.')
          Option2.disabled = false
          Option3.disabled = false
          Option4.disabled = false
          console.log("done")
          voteSelect.removeEventListener("change", voteselectRemover);
          voteSelect.addEventListener("change", voteselect);
        }).catch((error) => {
          alert(error);
        })
      }

      function RemovingOption2() {
        Vote.update({
          Mightreal: firebase.firestore.FieldValue.increment(-1)
        }).then(() => {
          alert('Down vote successfully done.')
          Option1.disabled = false
          Option3.disabled = false
          Option4.disabled = false
          voteSelect.removeEventListener("change", voteselectRemover);
          voteSelect.addEventListener("change", voteselect);
        })
      }

      function RemovingOption3() {
        Vote.update({
          Mightfake: firebase.firestore.FieldValue.increment(-1)
        }).then(() => {
          alert('Down vote successfully done.')
          Option1.disabled = false
          Option2.disabled = false
          Option4.disabled = false
          voteSelect.removeEventListener("change", voteselectRemover);
          voteSelect.addEventListener("change", voteselect);
        })
      }

      function RemovingOption4() {
        Vote.update({
          Fake: firebase.firestore.FieldValue.increment(-1)
        }).then(() => {
          alert('Down vote successfully done.')
          Option1.disabled = false
          Option2.disabled = false
          Option3.disabled = false
          voteSelect.removeEventListener("change", voteselectRemover);
          voteSelect.addEventListener("change", voteselect);
        })
      }

      const voteselectRemover = async () => {
        let selectedValue = event.target.value;
        voteSelect.value = ""

        console.log("I am selected")

        if (selectedValue == "It's real.") {

          RemovingOption1();

        } else if (selectedValue == "It might be real.") {

          RemovingOption2();

        } else if (selectedValue == "It might be fake.") {

          RemovingOption3();

        } else {

          RemovingOption4()

        }
      }

      const voteselect = async () => {
        let selectedValue = event.target.value;

        if (selectedValue == "It's real.") {

          Vote.update({
            Real: firebase.firestore.FieldValue.increment(1)
          }).then(() => {
            Option2.disabled = true
            Option3.disabled = true
            Option4.disabled = true
            alert("Voted successfully.")
            voteSelect.removeEventListener("change", voteselect);
            voteSelect.addEventListener("change", voteselectRemover);
          })

        } else if (selectedValue == "It might be real.") {

          Vote.update({
            Mightreal: firebase.firestore.FieldValue.increment(1)
          }).then(() => {
            Option1.disabled = true
            Option3.disabled = true
            Option4.disabled = true
            alert("Voted successfully.")
            voteSelect.removeEventListener("change", voteselect);
            voteSelect.addEventListener("change", voteselectRemover);
          })

        } else if (selectedValue == "It might be fake.") {

          Vote.update({
            Mightfake: firebase.firestore.FieldValue.increment(1)
          }).then(() => {
            Option1.disabled = true
            Option2.disabled = true
            Option4.disabled = true
            alert("Voted successfully.")
            voteSelect.removeEventListener("change", voteselect);
            voteSelect.addEventListener("change", voteselectRemover);
          })

        } else {

          Vote.update({
            Fake: firebase.firestore.FieldValue.increment(1)
          }).then(() => {
            Option1.disabled = true
            Option2.disabled = true
            Option3.disabled = true
            alert("Voted successfully.")
            voteSelect.removeEventListener("change", voteselect);
            voteSelect.addEventListener("change", voteselectRemover);
          })

        }
        voteSelect.value = "";
      }

      voteSelect.addEventListener("change", voteselect);

      let spanDate = document.createElement('span');
      spanDate.textContent = `Posted on: ${Date}`
      spanDate.style.paddingLeft = '15px'

      // Appending all the elements to action-buttons div
      actionButtonsDiv.appendChild(likeButton);
      actionButtonsDiv.appendChild(dislikeButton);
      actionButtonsDiv.appendChild(voteSelect);
      actionButtonsDiv.appendChild(percentSelect);
      actionButtonsDiv.appendChild(spanDate);


      // Append action-buttons div to main div
      readNewsDiv.appendChild(actionButtonsDiv);

      // Append the complete structure to the body
      let divofShownews = document.getElementById('Shownews')
      divofShownews.appendChild(readNewsDiv);

      //Creating system for like/dislike

      
      const Forliking = () => {

        if (dislikeButtonspan.textContent == ` ${MaxmDislike}`) {
          Forremovingdislike()
        }

        likeButton.style.color = "#4078e6"
        likeButton.style.backgroundColor = "white"

        Likebuttonspan.textContent = ` ${++Like}`
        likeButton.removeEventListener("click", Forliking)
        likeButton.addEventListener("click", Forremovinglike)
        Vote.update({
          Like: firebase.firestore.FieldValue.increment(1)
        })
      }

      const Forremovinglike = () => {
        likeButton.style.color = ""
        likeButton.style.backgroundColor = ""

        Likebuttonspan.textContent = ` ${--Like}`

        likeButton.removeEventListener("click", Forremovinglike)
        likeButton.addEventListener("click", Forliking)

        Vote.update({ //It's asynchronomous function
          Like: firebase.firestore.FieldValue.increment(-1)
        })

      }

      likeButton.addEventListener("click", Forliking)

      const Fordisliking = () => {

        if (Likebuttonspan.textContent == ` ${Maxmlike}`) {
          Forremovinglike()
        }

        dislikeButton.style.color = "#cf2929"
        dislikeButton.style.backgroundColor = "white"
        dislikeButtonspan.textContent = ` ${++Dislike}`

        dislikeButton.removeEventListener("click", Fordisliking)

        //Adding javascript for removing color of dislike and for decreasing value of Dislike
        dislikeButton.addEventListener("click", Forremovingdislike)
        Vote.update({ //It's asynchronomous function.
          Dislike: firebase.firestore.FieldValue.increment(1)
        })
      }

      const Forremovingdislike = () => {
        dislikeButton.style.color = ""
        dislikeButton.style.backgroundColor = ""

        dislikeButtonspan.textContent = `\t${--Dislike}`

        dislikeButton.removeEventListener("click", Forremovingdislike)
        dislikeButton.addEventListener("click", Fordisliking)

        Vote.update({
          Dislike: firebase.firestore.FieldValue.increment(-1)
        })
      }

      dislikeButton.addEventListener("click", Fordisliking)


      console.log(i)
      let a = document.getElementsByTagName('h2')[i]
      a.addEventListener("click", () => {
        
        Shownews.textContent = ''
        
        let divGoback = document.createElement('div') // Added externally for adding border around News content without including button under it.
        divGoback.setAttribute('id','Goback')
        divGoback.innerHTML =  divGoback.innerHTML + `
        <button class="Goback"><a class="Anchor" href = "Journalist.html">Go back</a></button><br><br>
        `
        Shownews.before(divGoback)
        
        let Showcasingnews = document.createElement('div')
        Shownews.append(Showcasingnews)

        let h21 = document.createElement('h2')
        h21.innerHTML = `<u>Headline</u>:  ${Headline}`
        Showcasingnews.append(h21)

        let hr1 = document.createElement('hr')
        Showcasingnews.append(hr1)

        let h22 = document.createElement('h2')
        h22.innerHTML = `<u>Description</u>:`
        Showcasingnews.append(h22)

        let div1 = document.createElement('div')
        div1.textContent = `${Description}`
        Showcasingnews.append(div1)

        let hr2 = document.createElement('hr')
        Showcasingnews.append(hr2)

        let h23 = document.createElement('h2')
        h23.innerHTML = `<u>Summary</u>:`
        Showcasingnews.append(h23)

        let div2 = document.createElement('div')
        div2.textContent = `${Summary}`
        Showcasingnews.append(div2)

        let hr3 = document.createElement('hr')
        Showcasingnews.append(hr3)

        let h24 = document.createElement('h2')
        h24.innerHTML = `<u>Evidence(s)</u>:`
        Showcasingnews.append(h24)

        let div3 = document.createElement('div')
        div3.textContent = `${Evidence}`
        Showcasingnews.append(div3)

        Showcasingnews.style.border = `1px solid gray`
        Showcasingnews.style.padding = '10px 10px'
        Showcasingnews.style.marginLeft = '14px'
        Showcasingnews.style.borderRadius = '10px';
        Showcasingnews.style.backgroundColor=`white`;

      });
      i++
      document.getElementById('Processing').close() 
    }) } }).catch((error) => {
      document.getElementById('Processing').close()
      alert("Please check your network connectivity.")
      console.log(error)
    })
},1000)
