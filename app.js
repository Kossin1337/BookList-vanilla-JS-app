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
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const bookList = document.querySelector(".books-display");

    const bookInfo = document.createElement("div");
    bookInfo.className = "books-row";

    bookInfo.innerHTML = `
      <h3 class="book-info">${book.title}</h3>
      <h3 class="book-info">${book.author}</h3>
      <h3 class="book-info book-isbn">${book.isbn}</h3>
      <button class="delete-btn"><i class="fas fa-times"></i></button>
    `;

    bookList.appendChild(bookInfo);
  }

  static deleteBook(element, isbn) {
    element.parentElement.remove();
    Store.removeBook(isbn);
    UI.showAlert("Book deleted", "success");
  }

  static showAlert(message, className) {
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${className}`;
    alertDiv.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector(".book-form");
    container.insertBefore(alertDiv, form);
    // Vanish in 3 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 2000);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}

/* Store Class: Handles Storage */
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

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
    UI.showAlert("Please fill in all fields!", "danger");
  } else {
    // Instatiate book
    const book = new Book(title, author, isbn);
    console.log(book);

    // Add Book to UI
    UI.addBookToList(book);

    // Add Book to Store
    Store.addBook(book);

    // Show success message
    UI.showAlert("Book added", "info");

    // Clear fields
    UI.clearFields();
  }
});

/* Event: remove a book */
document.querySelector(".books-display").addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    // console.log(`button: ${e.target.previousElementSibling.textContent}`);
    UI.deleteBook(e.target, e.target.previousElementSibling.textContent);
  } else if (e.target.classList.contains("fa-times")) {
    // console.log(`i tag: ${e.target.parentElement.previousElementSibling.textContent}`);
    UI.deleteBook(
      e.target.parentElement,
      e.target.parentElement.previousElementSibling.textContent
    );
  }
});
