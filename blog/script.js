let actionBtn = document.querySelector("#addBtn");
let saveBtn = document.querySelector("#saveBtn");
let cancelBtn = document.querySelector("#cancelBtn");
let modal = document.querySelector("#addModal");

actionBtn.addEventListener("click", toggleClass);
cancelBtn.addEventListener("click", toggleClass);
saveBtn.addEventListener("click", saveArticle);

function toggleClass() {
  modal.classList.toggle("show-modal");
}

function saveArticle() {
  console.log("article saved");
  modal.classList.toggle("show-modal");
}
