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

const firebasedatabase = firebaseApp.database(); //It'll give access to Firebase database. ->
const firestore = firebaseApp.firestore(); //It'll give access to Firebase firestore. ->

let Signout = document.getElementById('Sign_out')

// Creating system for creating profile page.

let email; // I defined it outside so that i can use it anywhere i want in my whole code.
firebase.auth().onAuthStateChanged((user) => { //onAuthStateChanged is asynchronomous function
  if (user) {
    email = user.email;
  } else {
    console.log("You're not signed in.");
  }
})

firebasedatabase.ref(`${email}`).get()
  .then((data) => {
    let Role = data().Role
    console.log(Role)
  })

Signout.addEventListener("click", () => {
  firebase.auth().signOut()
    .then(() => {
      alert('User signed out successfully');
      window.location.href = "/Main_Page/index.html";
    })
    .catch((error) => {
      console.error('Sign out error:', error);
    });
})

let i = 0; //For adding Headline in news.
document.getElementById('Processing').showModal()

let Realvalue;

firestore.collection("Postnews").orderBy("timestamp", "desc").get()
  .then(async (Documents) => {

    Documents.forEach(async (doc) => {
      let Headline = doc.data().Headline
      let Description = doc.data().Description
      let Summary = doc.data().Summary
      let Evidence = doc.data().Evidence

      let Fakevalue;
      let Like;
      let Maxmlike;
      let Dislike;
      let MaxmDislike;
      let Mightfakevalue;
      let Mightrealvalue;

      let Vote = firestore.collection(`${Headline}`).doc(`${Headline}`)

      await firestore.collection(`${Headline}`).doc(`${Headline}`).get()
        .then((doc) => {
          Like = doc.data().Like
          Realvalue = doc.data().Real
          Fakevalue = doc.data().Fake
          Maxmlike = doc.data().Like + 1
          Dislike = doc.data().Dislike
          MaxmDislike = doc.data().Dislike + 1
          Mightfakevalue = doc.data().Mightfake
          Mightrealvalue = doc.data().Mightreal
        })



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

      const commentButton = document.createElement('button');
      commentButton.classList.add('btn');
      const commentIcon = document.createElement('i');
      commentIcon.classList.add('fas', 'fa-comment');
      commentButton.appendChild(commentIcon);
      let commentbuttonspan = document.createElement('span')
      commentbuttonspan.textContent = ' Comment'
      commentButton.append(commentbuttonspan)

      const voteSelect = document.createElement('select');
      voteSelect.classList.add('btn');
      const voteDefaultOption = document.createElement('option');
      voteDefaultOption.disabled = true;
      voteDefaultOption.selected = true;
      voteDefaultOption.textContent = 'Vote news';
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

      Getting.onSnapshot((doc) => {
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

      voteSelect.addEventListener("change", async (event) => {
        let selectedValue = event.target.value;

        if (selectedValue == "It's real.") {

          await Vote.update({
            Real: firebase.firestore.FieldValue.increment(1)
          }) .then(() => {
            Option2.disabled = true
            Option3.disabled = true
            Option4.disabled = true

            Option1.addEventListener("click", RemovingOption1)

            async function RemovingOption1 () {
              await Vote.update({
                Real: firebase.firestore.FieldValue.increment(-1)
              }).then(() => {
                alert('Down vote successfully done.')
                Option2.disabled = false
                Option3.disabled = false
                Option4.disabled = false
              })
              Option1.removeEventListener("click", RemovingOption1)
            }
          })

        } else if (selectedValue == "It might be real.") {

          await Vote.update({
            Mightreal: firebase.firestore.FieldValue.increment(1)
          }) .then(() => {
            Option1.disabled = true
            Option3.disabled = true
            Option4.disabled = true

            Option2.addEventListener("click", RemovingOption2)

            async function RemovingOption2 () {
              await Vote.update({
                Mightreal: firebase.firestore.FieldValue.increment(-1)
              }).then(() => {
                alert('Down vote successfully done.')
                Option1.disabled = false
                Option3.disabled = false
                Option4.disabled = false
              })
              Option2.removeEventListener("click", RemovingOption2)
            }
          })

        } else if (selectedValue == "It might be fake.") {

          await Vote.update({
            Mightfake: firebase.firestore.FieldValue.increment(1)
          }) .then(() => {
            Option1.disabled = true
            Option2.disabled = tru3
            Option4.disabled = true

            Option3.addEventListener("click", RemovingOption3)

            async function RemovingOption3 () {
              await Vote.update({
                Mightfake: firebase.firestore.FieldValue.increment(-1)
              }).then(() => {
                alert('Down vote successfully done.')
                Option1.disabled = false
                Option2.disabled = false
                Option4.disabled = false
              })
              Option3.removeEventListener("click", RemovingOption3)
            }
          })

        } else {

          await Vote.update({
            Fake: firebase.firestore.FieldValue.increment(1)
          }) .then(() => {
            Option1.disabled = true
            Option2.disabled = true
            Option3.disabled = true

            Option4.addEventListener("click", RemovingOption4)

            async function RemovingOption4 () {
              await Vote.update({
                Fake : firebase.firestore.FieldValue.increment(-1)
              }).then(() => {
                alert('Down vote successfully done.')
                Option1.disabled = false
                Option2.disabled = false
                Option3.disabled = false
              })
              Option4.removeEventListener("click", RemovingOption4)
            }
          })

        }

        alert("Voted successfully.")

      });

      // Create Bookmark checkbox and label
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = 'bookmark-heart';

      const bookmarkLabel = document.createElement('label');
      bookmarkLabel.classList.add('btn');
      bookmarkLabel.htmlFor = 'bookmark-heart';
      bookmarkLabel.style.margin = 'auto 5px';
      bookmarkLabel.textContent = 'Bookmark';

      // Append all elements to action-buttons div
      actionButtonsDiv.appendChild(likeButton);
      actionButtonsDiv.appendChild(dislikeButton);
      actionButtonsDiv.appendChild(commentButton);
      actionButtonsDiv.appendChild(voteSelect);
      actionButtonsDiv.appendChild(percentSelect);
      actionButtonsDiv.appendChild(checkbox);
      actionButtonsDiv.appendChild(bookmarkLabel);

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

        Likebuttonspan.textContent = ` ${++Like}`
        likeButton.removeEventListener("click", Forliking)
        likeButton.addEventListener("click", Forremovinglike)
        Vote.update({
          Like: firebase.firestore.FieldValue.increment(1)
        })
      }

      const Forremovinglike = () => {
        likeButton.style.color = ""

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
        dislikeButtonspan.textContent = `\t${--Dislike}`

        dislikeButton.removeEventListener("click", Forremovingdislike)
        dislikeButton.addEventListener("click", Fordisliking)

        Vote.update({
          Dislike: firebase.firestore.FieldValue.increment(-1)
        })
      }

      dislikeButton.addEventListener("click", Fordisliking)

      firestore.collection(`${Headline}`).doc(`${Headline}`).onSnapshot((doc) => { //It's for onspot change of like & dislike on others users when someone other user will click on Like/Dislike
        Like = doc.data().Like
        Likebuttonspan.textContent = ` ${Like}`
        Dislike = doc.data().Dislike
        dislikeButtonspan.textContent = ` ${Dislike}`
      })

      let a = document.getElementsByTagName('h2')[i]
      a.addEventListener("click", () => {

        Shownews.textContent = ''

        let divGoback = document.createElement('div') // Added externally for adding border around News content without including button under it.
        divGoback.setAttribute('id', 'Goback')
        divGoback.innerHTML = divGoback.innerHTML + `
        <button class="Goback"><a class="Anchor" href = "Read_news.html">Go back</a></button><br><br>
        `
        Shownews.before(divGoback)

        let Showcasingnews = document.createElement('div')
        document.documentElement.append(Showcasingnews)

        let h21 = document.createElement('h2')
        h21.innerHTML = `<u>Headline</u>:`
        Showcasingnews.append(h21)

        let div0 = document.createElement('h3')
        div0.textContent = `${Headline}`
        Showcasingnews.append(div0)

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

        Showcasingnews.style.border = `2px solid`
        Showcasingnews.style.padding = '10px 10px'
        Showcasingnews.style.margin = '7px'
        Showcasingnews.style.borderRadius = '10px'
      });
      i++
    })
    document.getElementById('Processing').close()
  }).catch((error) => {
    document.getElementById('Processing').close()
    alert("Please check your network connectivity.")
    console.log(error)
  })
