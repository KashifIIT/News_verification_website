const firebaseApp = firebase.initializeApp({

    apiKey: "AIzaSyCbD6PheRomf84v5FzgeSLCnINva69eZnc",
    authDomain: "kanewsif-website.firebaseapp.com",
    projectId: "kanewsif-website",
    storageBucket: "kanewsif-website.firebasestorage.app",
    messagingSenderId: "655712364187",
    appId: "1:655712364187:web:f046011d9fa957e618083e",
});

const firestore = firebaseApp.database(); //It'll give access to Firebase database. ->

let Post_news_reference = firebasedatabase.ref("Postnews") //Please check what it'll do.

function Appending() {
    let Body = document.getElementById('body')
    //I add backtick instead of adding double quotes, it's beacuse of i can't click enter as how i'd given below, but this feature is available in backtick.
    Body.innerHTML = Body.innerHTML + `
    <div class="Readnews"
    <h2 id="${Topic}">Hello</h2> 
        <hr>
        <div class="action-buttons">

            <button class="btn"><i class="fas fa-thumbs-up"></i>Like</button>

            <button class="btn"><i class="fas fa-thumbs-down"></i> Dislike</button>

            <button class="btn"><i class="fas fa-comment"></i> Comment</button>

            <select class="btn">
                <option disabled selected>Vote news</option>
                <option value="It's real">It's real</option>
                <option value="It might be react">It might be real</option>
                <option value="It might be fake">It might be fake</option>
                <option value="It's fake">It's fake</option>
            </select>

            <select class="btn">
                <option disabled selected>% of Voting</option>
                <option disabled>22%</option>
                <option disabled>38%</option>
                <option disabled>27%</option>
                <option disabled>13%</option>
            </select>


            <input type="checkbox">
            <label style=" margin: auto 5px;" for="bookmark-heart">Bookmark</label>

        </div>

    </div><br><br>`
}