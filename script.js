console.log("books");

let myLibrary = [];

function book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

}

book.prototype.addToLibrary = function() { 
    myLibrary.push(this);
}

const book1 = new book("Ender's Game","Orson Scott Card", 100,true);
book1.addToLibrary();

const book2 = new book("Dune", "Frank Herbert",101,true);
book2.addToLibrary();

const book3 = new book("Foundation", "Isaac Asimov",103,false);
book3.addToLibrary();

console.table(myLibrary);

myLibrary.forEach(book => {
    const table = document.querySelector('table');
    // Insert a row at the end of table
    var newRow = table.insertRow();

    // Insert a cell at the end of the row
    var newCell = newRow.insertCell();

    // Append a text node to the cell
    for(const property in book){  
        newCell.appendChild(document.createTextNode(book[property]));
    }
})