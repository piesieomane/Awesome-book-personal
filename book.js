const submitBtn = document.querySelector(".submit-btn");
const title = document.querySelector(".title");
const author = document.querySelector(".author");
const displayBooks = document.querySelector(".book-shelf");

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = Date.now();
  }

  collection = JSON.parse(localStorage.getItem("form")) || [];

  addBook() {
    if (!title.value && !author.value) return;
    const book = {
      author: this.author,
      title: this.title,
      id: this.id,
    };
    this.collection.push(book);
    localStorage.setItem("form", JSON.stringify(this.collection));
    title.value = "";
    author.value = "";
  }
}

class Books extends Book {
  renderBooks = () => {
    this.collection = JSON.parse(localStorage.getItem("form")) || [];
    displayBooks.innerHTML = "";
    this.collection.forEach((oneBook) => {
      const renderBook = document.createElement("div");
      renderBook.classList.add("class-book");
      const p = document.createElement("p");
      const info = document.createElement("div");
      p.textContent = `"${oneBook.title}" by ${oneBook.author}`;
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.classList.add("remove-btn");
      removeBtn.setAttribute("id", oneBook.id);
      info.appendChild(p);
      info.appendChild(removeBtn);
      renderBook.appendChild(info);
      displayBooks.appendChild(renderBook);
    });
  };

  removeBook = (targetId) => {
    const newArr = this.collection.filter((item) => item.id !== targetId);
    this.collection.length = 0;
    this.collection.push(...newArr);
    localStorage.setItem("form", JSON.stringify(this.collection));
    this.renderBooks();
  };
}

////////////////////////////////////
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const newBook = new Books(title, author, Date.now());
  newBook.addBook();
  newBook.renderBooks();
});
////////////////////////////////////
const mixcBook = new Books();
displayBooks.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    const targetId = parseInt(e.target.getAttribute("id"), 10);
    mixcBook.removeBook(targetId);
  }
});
