const submitBtn = document.querySelector(".submit-btn");
const title = document.querySelector(".title");
const author = document.querySelector(".author");
const displayBooks = document.querySelector(".book-shelf");

const collection = JSON.parse(localStorage.getItem("form")) || [];

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!(author.value && title.value)) return null;
  const book = { author: author.value, title: title.value, id: Date.now() };
  collection.push(book);
  localStorage.setItem("form", JSON.stringify(collection));
  title.value = "";
  author.value = "";
  renderBooks();
});

const renderBooks = () => {
  displayBooks.innerHTML = "";
  return collection.forEach((oneBook) => {
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

displayBooks.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    const targetId = parseInt(e.target.getAttribute("id"), 10);
    removeBook(targetId);
  }
});

const removeBook = (targetId) => {
  const newArr = collection.filter((item) => item.id !== targetId);
  collection.length = 0;
  collection.push(...newArr);
  localStorage.setItem("form", JSON.stringify(collection));
  renderBooks();
};
