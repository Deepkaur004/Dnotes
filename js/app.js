console.log("Welcome to notes app. This is app.js");

showNotes();
// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addtitle = document.getElementById('addtitle')
    let notes = localStorage.getItem("notesObj");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myobj = {
        title:addtitle.value ,
        text: addTxt.value
    }
    notesObj.push(myobj);
    localStorage.setItem("notesObj", JSON.stringify(notesObj));
    addTxt.value = "";
    addtitle.value = "";
    console.log(notesObj);

    showNotes();
});

//functions to show elemts from local storage
function showNotes() {
    let notes = localStorage.getItem("notesObj");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let html = "";

    notesObj.forEach(function (element, index) {
        html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title"> ${element.title}</h5>
                <p class="card-text">${element.text}</p>
                <button id = "${index}" onclick = "deleteNote(this.id)" class="btn btn-primary">Delete note</button>
            </div>
        </div> 
                    `;
    });

    let notesElm = document.getElementById('notes');

    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }

    else {
        notesElm.innerHTML = `Nothing to Show!`;
    }
}

//function to delete a note
function deleteNote(index) {
    console.log('i am deleted', index);

    let notes = localStorage.getItem("notesObj");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notesObj", JSON.stringify(notesObj));

    showNotes();
}

//function for filtering note texts
let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

    let inputVal = search.value;
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})

/*
Further Features:
1. Add Title
2. Mark a note as Important
3. Separate notes by user
4. Sync and host to web server 
*/    