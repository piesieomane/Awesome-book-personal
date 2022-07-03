const submitBtn = document.querySelector(".submit-btn");
const title = document.querySelector(".title");
const author = document.querySelector(".author");
const displayBooks = document.querySelector(".book-shelf");
collection = [];

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = Date.now();
  }

  addBook() {
    if (!title.value && !author.value) return;
    const book = {
      author: this.author,
      title: this.title,
      id: this.id,
    };
    collection.push(book);
    localStorage.setItem("form", JSON.stringify(collection));
    title.value = "";
    author.value = "";
  }
}

class Books extends Book {
  renderBooks = () => {
    collection = JSON.parse(localStorage.getItem("form")) || [];
    displayBooks.innerHTML = "";
    collection.forEach((oneBook) => {
      console.log(oneBook);
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
    const newArr = collection.filter((item) => item.id !== targetId);
    collection.length = 0;
    console.log("dfvdcd", newArr);
    collection.push(...newArr);
    localStorage.setItem("form", JSON.stringify(collection));

    this.renderBooks();
  };
}

////////////////////////////////////
submitBtn.addEventListener("click", (e) => {
  const title1 = title.value;
  const author1 = author.value;
  e.preventDefault();
  const newBook = new Books(title1, author1, Date.now());
  console.log(newBook);
  newBook.addBook();
  newBook.renderBooks();
});
////////////////////////////////////
const mixcBook = new Books();
displayBooks.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    const targetId = parseInt(e.target.getAttribute("id"), 10);
    console.log(targetId);
    mixcBook.removeBook(targetId);
  }
});
