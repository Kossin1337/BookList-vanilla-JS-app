/* Book class: represents a book */
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

/* UI Class: Handle UI Tasks */
class UI {
  static displayBooks() {
    const StoredBooks = [
      {
        title: "Harry Potter 1",
        author: "jk",
        isbn: "69696969",
      },
      {
        title: "Harry Potter 2",
        author: "jk rrr",
        isbn: "13371337",
      },
    ];

    const books = StoredBooks;

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const bookList = document.querySelector(".books-display");

    const bookInfo = document.createElement("div");
    bookInfo.className = "books-row";

    bookInfo.innerHTML = `
      <h3 class="book-info">${book.title}</h3>
      <h3 class="book-info">${book.author}</h3>
      <h3 class="book-info">${book.isbn}</h3>
      <button class="delete-btn"><i class="fas fa-times"></i></button>
    `;

    bookList.appendChild(bookInfo);
  }

  static deleteBook(element) {
    if (element.classList.contains("delete-btn")) {
      element.parentElement.remove();
    } else if (element.classList.contains("fa-times")) {
      element.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}

/* Store Class: Handles Storage */

/* Event: Display Books */
document.addEventListener("DOMContentLoaded", UI.displayBooks);

/* Event: Add a Book */
document.querySelector(".book-form").addEventListener("submit", (e) => {
  // Prevent actual submit
  e.preventDefault();

  // getting form values ( not sure about the value )
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  // Form Validation
  if (title === "" || author === "" || isbn === "") {
    alert("Please fill in all fields!");
  } else {
    // Instatiate book
    const book = new Book(title, author, isbn);
    console.log(book);

    // Add Book to list
    UI.addBookToList(book);

    // Clear fields
    UI.clearFields();
  }
});

/* Event: remove a book */
document.querySelector(".books-display").addEventListener("click", (e) => {
  UI.deleteBook(e.target);
});
