const main = document.querySelector(".main");
const buttons = document.querySelectorAll(".tab-btn");
const articles = document.querySelectorAll(".content");
const form = document.querySelector(".pizza-form");
const alert = document.querySelector(".alert");
const pizzaName = document.getElementById("pizza-name");
const pizzaPrice = document.getElementById("pizza-price");
const pizzaHeat = document.getElementById("pizza-heat");
const pizzaToppings = document.getElementsByClassName("pizza-toppings");
const pizzaPhoto = document.getElementById("pizza-photo");
const toppingsContainer = document.getElementById("toppings-container");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".pizza-container");
const list = document.querySelector(".pizza-list");
const clearBtn = document.querySelector(".clear-btn");

let editElement;
let editFlag = false;
let editID = "";

// Tabs
main.addEventListener("click", function (e) {
  const id = e.target.dataset.id;

  if (id === "pizza-list" || id === "form") {
    const element = document.getElementById(id);

    buttons.forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");

    articles.forEach((article) => article.classList.remove("active"));
    element.classList.add("active");
  }
});

// Form
form.addEventListener("submit", addItem);

clearBtn.addEventListener("click", clearItems);

window.addEventListener("DOMContentLoaded", setupItems);

function addItem(e) {
  e.preventDefault();

  const pizzaNameValue = pizzaName.value;
  const pizzaPriceValue = pizzaPrice.value;
  const pizzaHeatValue = pizzaHeat.value;
  const pizzaPhotoValue = pizzaPhoto.value;
  const id = new Date().getTime().toString();

  let pizzaToppingsValue = [];

  for (let topping of pizzaToppings) {
    pizzaToppingsValue.push(topping.value);
  }

  if (!editFlag) {
    const element = document.createElement("article");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("pizza-item");
    element.innerHTML = `<p class="title">${pizzaNameValue}</p>
    <p class="title">${pizzaPriceValue}</p>
    <p class="title">${pizzaHeatValue}</p>
    <p class="title">${pizzaToppingsValue.join(", ")}</p> 
    <p class="title">${pizzaPhotoValue}</p>

            <div class="btn-container">
            
              <button type="button" class="edit-btn button">
                <i class="fas fa-edit"></i>
              </button>
               
              <button type="button" class="delete-btn button">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `;

    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);
    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);

    list.appendChild(element);

    displayAlert("Pizza added to the menu", "success");

    container.classList.add("show-container");

    addToLocalStorage(id, pizzaNameValue);
    addToLocalStorage(id, pizzaPriceValue);
    addToLocalStorage(id, pizzaHeatValue);
    addToLocalStorage(id, pizzaPhotoValue);
    addToLocalStorage(id, pizzaToppingsValue);

    setBackToDefault();
  } else if (value !== "" && editFlag) {
    editElement.innerHTML = value;
    displayAlert("Pizza changed", "success");

    editLocalStorage(editID, value);

    setBackToDefault();
  } else {
    displayAlert("Please enter pizza info", "danger");
  }
}

function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 2000);
}

function clearItems() {
  const items = document.querySelectorAll(".pizza-item");

  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
  }

  container.classList.remove("show-container");
  displayAlert("empty list", "danger");
  setBackToDefault();
  localStorage.removeItem("list");
}

function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;

  list.removeChild(element);

  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  displayAlert("item removed", "danger");

  setBackToDefault();

  removeFromLocalStorage(id);
}

function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;

  editElement = e.currentTarget.parentElement.previousElementSibling;

  pizza.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  //
  submitBtn.textContent = "edit";
}

function setBackToDefault() {
  pizzaName.value = "";
  pizzaPrice.value = "";
  pizzaHeat.value = "";
  pizzaPhoto.value = "";

  for (let topping of pizzaToppings) {
    topping.value = "";
  }

  editFlag = false;
  editID = "";
  submitBtn.textContent = "submit";
}

function addToLocalStorage(id, value) {
  const pizza = { id, value };
  let items = getLocalStorage();
  items.push(pizza);
  localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

function removeFromLocalStorage(id) {
  let items = getLocalStorage();

  items = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });

  localStorage.setItem("list", JSON.stringify(items));
}
function editLocalStorage(id, value) {
  let items = getLocalStorage();

  items = items.map(function (item) {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}

function setupItems() {
  let items = getLocalStorage();

  if (items.length > 0) {
    items.forEach(function (item) {
      createListItem(item.id, item.value);
    });
    container.classList.add("show-container");
  }
}

function createListItem(id, value) {
  const element = document.createElement("article");
  let attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  element.classList.add("pizza-item");
  element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn button">
                <i class="fas fa-edit"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn button">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `;

  const deleteBtn = element.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteItem);
  const editBtn = element.querySelector(".edit-btn");
  editBtn.addEventListener("click", editItem);

  list.appendChild(element);
}

function addTopping() {
  const element = document.createElement("input");

  let type = document.createAttribute("type");
  let placeholder = document.createAttribute("placeholder");
  let maxlength = document.createAttribute("maxlength");

  type.value = "text";
  placeholder.value = "e.g. More cheese";
  maxlength.value = "30";

  element.setAttributeNode(type);
  element.setAttributeNode(placeholder);
  element.setAttributeNode(maxlength);
  element.classList.add("pizza-toppings");

  toppingsContainer.appendChild(element);
}
