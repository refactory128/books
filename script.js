console.log("books");

let myLibrary = [];

class book {
  constructor(
    title = "none",
    author = "none",
    pages = 0,
    read = false,
    id = null
  ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
  }

  addToLibrary() {
    if (myLibrary.length === 0) {
      this.id = 0;
    } else {
      this.id = myLibrary[myLibrary.length - 1].id + 1;
    }
    myLibrary.push(this);
  }
}

function removeFromLibrary(id) {
  if (id >= 0 && id < myLibrary.length) {
    myLibrary.splice(id, 1);
  }
  displayLibrary();
}

const book1 = new book("Ender's Game", "Orson Scott Card", 100, true);
book1.addToLibrary();

const book2 = new book("Dune", "Frank Herbert", 101, true);
book2.addToLibrary();

const book3 = new book("Foundation", "Isaac Asimov", 103, false);
book3.addToLibrary();

function displayLibrary() {
  var el = document.querySelector("table");
  while (el.hasChildNodes()) {
    el.removeChild(el.lastChild);
  }

  var table = document.querySelector("table");
  var newRow = table.insertRow();
  var newCell;
  // Append a text node to the cell
  const bookExample = new book();
  for (const property in bookExample) {
    if (bookExample.hasOwnProperty(property)) {
      // Insert a cell at the end of the row
      newCell = newRow.insertCell();
      newCell.appendChild(document.createTextNode(property));
    }
  }
  // add books to table
  var i = 0;
  myLibrary.forEach((book) => {
    // Insert a row at the end of table

    book.id = i;
    i++;

    newRow = table.insertRow();

    // Append a text node to the cell
    for (const property in book) {
      if (book.hasOwnProperty(property)) {
        // Insert a cell at the end of the row
        if (property == "read") {
          var readBtn = document.createElement("BUTTON");
          readBtn.setAttribute("id", "read" + book.id);
          var t = document.createTextNode(
            book.read === true ? "read" : "not read"
          );
          readBtn.appendChild(t);
          newCell = newRow.insertCell();
          newCell.appendChild(readBtn);

          readBtn.addEventListener("click", (e) => {
            console.log("clicked" + e.target.id);
            if (e.target.id == "read" + book.id) {
              book.read = !book.read;
              displayLibrary();
            }
          });
        } else {
          newCell = newRow.insertCell();
          newCell.appendChild(document.createTextNode(book[property]));
        }
      }
    }

    var btn = document.createElement("BUTTON");
    btn.setAttribute("id", "remove" + book.id);
    var t = document.createTextNode("Remove");
    btn.appendChild(t);
    newCell = newRow.insertCell();
    newCell.appendChild(btn);

    btn.addEventListener("click", (e) => {
      console.log("clicked" + e.target.id);
      if (e.target.id == "remove" + book.id) {
        removeFromLibrary(book.id);
      }
    });
  });

  console.table(myLibrary);
}

function openForm() {
  console.log("openForm");
  document.getElementById("formAddBook").style.display = "block";
}

function closeForm() {
  console.log("closeForm");
  const bookForm = document.querySelector("#formAddBook");
  console.log(bookForm);
  bookForm.style.display = "none";
}

function addBook() {
  console.log("addBook");

  const title = document.querySelector("input[name=title]");
  const author = document.querySelector("input[name=author]");
  const pages = document.querySelector("input[name=pages]");
  const read = document.querySelector("input[name=read]");
  const message = document.querySelector("#message");

  if (
    title.checkValidity() &&
    author.checkValidity() &&
    pages.checkValidity() &&
    read.checkValidity()
  ) {
    const enteredBook = new book(
      title.value,
      author.value,
      pages.value,
      read.value
    );
    enteredBook.addToLibrary();
    closeForm();
    displayLibrary();
    message.innerHTML = "";
  } else {
    message.innerHTML = "Not All Fields Valid";
  }
}

displayLibrary();
