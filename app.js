const main = document.querySelector(".main");
const buttons = document.querySelectorAll(".tab-btn");
const articles = document.querySelectorAll(".content");

main.addEventListener("click", function (e) {
  const id = e.target.dataset.id;

  if (id) {
    const element = document.getElementById(id);

    buttons.forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");

    articles.forEach((article) => article.classList.remove("active"));
    element.classList.add("active");
  }
});
