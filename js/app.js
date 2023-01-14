showNotes();

//When user creates a note and tap to the add button add it to the local storage
let addBtn = document.querySelector("#addBtn");
// console.log(addBtn);

addBtn.addEventListener("click", (e) => {
    let addTitle = document.getElementById("addTitle");
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notesObj");

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }

    notesObj.push(myObj);
    localStorage.setItem("notesObj", JSON.stringify(notesObj));

    addTitle.value = " ";
    addTxt.value = " ";

    console.log(notesObj);

    showNotes();
})

// function to show notes from the localStorage
function showNotes() {
    let notes = localStorage.getItem("notesObj");

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = " ";

    notesObj.forEach((element, index) => {
        html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body note-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">${element.text}</p>
          <button id = "${index}" onclick = "deleteNote(this.id)" class="btn btn-primary">Delete note</button>
        </div>
      </div>`
    });

    let notesElement = document.getElementById("notes");

    if (notesObj.length != 0) {
        notesElement.innerHTML = html;
    }
    else {
        notesElement.innerHTML = `Nothing To Show!`;
    }

}

//Function to Delete a note
function deleteNote(index) {
    console.log("I am deleted ", index);

    let notes = localStorage.getItem("notesObj");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notesObj", JSON.stringify(notesObj));
    showNotes();
}

//Function for filtering the text
let search = document.querySelector("#searchNote");

search.addEventListener("input", () => {
    let inputValue = search.value;
    let noteCards = document.querySelectorAll(".noteCard");
    Array.from(noteCards).forEach((element) => {
        let titleText = element.getElementsByTagName("h5")[0].innerText;
        if (titleText.includes(inputValue)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})
