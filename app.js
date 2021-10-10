const main = document.querySelector(".main");
const tabButtonContainer = document.querySelector(".tab-button-container");
const tabButtons = document.querySelectorAll(".tab-button");
const tabScreens = document.querySelectorAll(".content");
const form = document.querySelector(".pizza-form");
const alert = document.querySelector(".alert");
const alertForm = document.querySelectorAll(".alert-form");
const pizzaName = document.getElementById("pizza-name");
const pizzaPrice = document.getElementById("pizza-price");
const pizzaHeat = document.getElementById("pizza-heat");
const pizzaToppings = document.getElementsByClassName("pizza-toppings");
const pizzaPhoto = document.getElementById("pizza-photo");
const pizzaHeatButtons = document.querySelector(".pizza-heat-buttons");
const pizzaHeatButton1 = document.getElementById("pizza-heat-button-1");
const pizzaHeatButton2 = document.getElementById("pizza-heat-button-2");
const pizzaHeatButton3 = document.getElementById("pizza-heat-button-3");
const toppingsContainer = document.getElementById("toppings-container");
const submitButton = document.getElementById("submit-button");
const pizzaContainer = document.querySelector(".pizza-container");
const pizzaList = document.querySelector(".pizza-list");
const clearButton = document.querySelector(".clear-button");
const mainEdit = document.querySelector(".main-edit");
const formEdit = document.querySelector(".pizza-form-edit");
const pizzaNameEdit = document.getElementById("pizza-name-edit");
const pizzaPriceEdit = document.getElementById("pizza-price-edit");
const pizzaHeatEdit = document.getElementById("pizza-heat-edit");
const pizzaToppingsEdit = document.getElementsByClassName(
  "pizza-toppings-edit",
);
const pizzaPhotoEdit = document.getElementById("pizza-photo-edit");
const pizzaHeatButtonsEdit = document.querySelector(".pizza-heat-buttons-edit");
const pizzaHeatButton1Edit = document.getElementById(
  "pizza-heat-button-1-edit",
);
const pizzaHeatButton2Edit = document.getElementById(
  "pizza-heat-button-2-edit",
);
const pizzaHeatButton3Edit = document.getElementById(
  "pizza-heat-button-3-edit",
);
const toppingsContainerEdit = document.getElementById(
  "toppings-container-edit",
);

let editElement;
let editFlag = false;
let editID = "";
let heatButtonsClasses = { button1: false, button2: false, button3: false };
let heatButtonsClassesEdit = { button1: false, button2: false, button3: false };

// Tabs
tabButtonContainer.addEventListener("click", toggleTabs);

function toggleTabs(e, path) {
  let id, target;

  if (e || !path) {
    target = e.target;
    id = target.dataset.id;
  } else if (path === "pizza-menu-container") {
    target = document.getElementById("tab-button-menu");
    id = path;
  } else if (path === "form") {
    target = document.getElementById("tab-button-form");
    id = path;
  }

  if (id === "pizza-menu-container" || id === "form") {
    const element = document.getElementById(id);

    tabButtons.forEach((button) => button.classList.remove("active"));
    target.classList.add("active");

    tabScreens.forEach((article) => article.classList.remove("active"));
    element.classList.add("active");
  }
}

function goToForm() {
  toggleTabs(null, "form");
  scrollToTop();
}

function goToPizzaMenu() {
  toggleTabs(null, "pizza-menu-container");
  scrollToTop();
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Form
form.addEventListener("submit", addPizza);
formEdit.addEventListener("submit", savePizza);
pizzaHeatButton1.addEventListener("mouseenter", handleHeatButtonsHoveringIn);
pizzaHeatButton2.addEventListener("mouseenter", handleHeatButtonsHoveringIn);
pizzaHeatButton3.addEventListener("mouseenter", handleHeatButtonsHoveringIn);
pizzaHeatButton1.addEventListener("mouseleave", handleHeatButtonsHoveringOut);
pizzaHeatButton2.addEventListener("mouseleave", handleHeatButtonsHoveringOut);
pizzaHeatButton3.addEventListener("mouseleave", handleHeatButtonsHoveringOut);
pizzaHeatButton1Edit.addEventListener(
  "mouseenter",
  handleHeatButtonsHoveringInEdit,
);
pizzaHeatButton2Edit.addEventListener(
  "mouseenter",
  handleHeatButtonsHoveringInEdit,
);
pizzaHeatButton3Edit.addEventListener(
  "mouseenter",
  handleHeatButtonsHoveringInEdit,
);
pizzaHeatButton1Edit.addEventListener(
  "mouseleave",
  handleHeatButtonsHoveringOutEdit,
);
pizzaHeatButton2Edit.addEventListener(
  "mouseleave",
  handleHeatButtonsHoveringOutEdit,
);
pizzaHeatButton3Edit.addEventListener(
  "mouseleave",
  handleHeatButtonsHoveringOutEdit,
);
window.addEventListener("DOMContentLoaded", setupPizzas);

function addPizza(e) {
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

  const pizzaValues = {
    pizzaNameValue,
    pizzaPriceValue,
    pizzaHeatValue,
    pizzaPhotoValue,
    pizzaToppingsValue,
    id,
  };

  for (let pizza of pizzaList.querySelectorAll(".pizza-name-title .name")) {
    if (pizzaNameValue === pizza.innerHTML) {
      return displayAlertForm("Please enter a unique pizza name", "danger");
    }
  }

  const element = setPizza(pizzaValues);

  pizzaList.appendChild(element);

  displayAlert("Pizza added to the menu", "success");

  pizzaContainer.classList.add("show-container");

  addToSessionStorage(id, pizzaValues);

  setBackToDefault();

  goToPizzaMenu();
}

function savePizza(e) {
  e.preventDefault();

  const pizzaNameValue = pizzaNameEdit.value;
  const pizzaPriceValue = pizzaPriceEdit.value;
  const pizzaHeatValue = pizzaHeatEdit.value;
  const pizzaPhotoValue = pizzaPhotoEdit.value;

  let pizzaToppingsValue = [];

  for (let topping of pizzaToppingsEdit) {
    pizzaToppingsValue.push(topping.value);
  }

  const pizzaValues = {
    pizzaNameValue,
    pizzaPriceValue,
    pizzaHeatValue,
    pizzaPhotoValue,
    pizzaToppingsValue,
    id: editElement.dataset.id,
  };

  for (let pizza of pizzaList.querySelectorAll(".pizza-name-title .name")) {
    if (
      pizzaNameValue === pizza.innerHTML &&
      !pizza.parentElement.parentElement.parentElement === editElement
    ) {
      return displayAlertForm("Please enter a unique pizza name", "danger");
    }
  }

  editElement.remove();
  pizzaList.appendChild(setPizza(pizzaValues));

  main.style.display = "grid";
  mainEdit.style.display = "none";

  displayAlert("Pizza saved", "success");

  editSessionStorage(editID, pizzaValues);

  setBackToDefault();

  goToPizzaMenu();
}

function setPizza({
  pizzaNameValue,
  pizzaHeatValue,
  pizzaPriceValue,
  pizzaPhotoValue,
  pizzaToppingsValue,
  id,
}) {
  const element = document.createElement("article");

  let attr = document.createAttribute("data-id");

  attr.value = id;
  element.setAttributeNode(attr);
  element.classList.add("pizza-item");
  pizzaPhotoValue
    ? (element.style.background =
        "linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)), url(" +
        pizzaPhotoValue +
        ")")
    : null;

  element.innerHTML = `
  <div>
    <div class="button-container"> 
      <button type="button" class="edit-button button"> 
        <img src="./assets/pencil.png"/>
      </button>
      
      <button type="button" class="delete-button button">
        <img src="./assets/bin.png"/>
      </button>
    </div> 
  </div>

  <div
    id="pizza-item-info"
    data-name="${pizzaNameValue}" 
    data-heat="${pizzaHeatValue}" 
    data-toppings=" ${pizzaToppingsValue.join("#key#")}" 
    data-price="${pizzaPriceValue}" 
    data-photo="${pizzaPhotoValue}"
  >
    <h2 class='pizza-name-title'>
     <span class='name'>${pizzaNameValue}</span>

      ${
        pizzaHeatValue
          ? `
              <img src='./assets/flame${pizzaHeatValue}.png' 
                class='heat-icon' 
                alt='heat icon'
              /> 
            `
          : ""
      }
     
    </h2> 

    <h4 id="pizza-toppings-value" class='pizza-toppings-title'>
      ${pizzaToppingsValue.join(", ")} 

      <span id="pizza-price-value" class='dots-border'></span>
      
      €${pizzaPriceValue}
    </h4>   
  </div> 
  `;

  const deleteButton = element.querySelector(".delete-button");
  const editButton = element.querySelector(".edit-button");

  deleteButton.addEventListener("click", deletePizza);
  editButton.addEventListener("click", editPizza);

  return element;
}

function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 2000);
}

function displayAlertForm(text, action) {
  for (let alert of alertForm) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    setTimeout(() => {
      alert.textContent = "";
      alert.classList.remove(`alert-${action}`);
    }, 2000);
  }
}

function clearPizzas() {
  const pizzas = document.querySelectorAll(".pizza-item");

  if (pizzas.length > 0) {
    pizzas.forEach((pizza) => pizzaList.removeChild(pizza));
  }

  pizzaContainer.classList.remove("show-container");

  setBackToDefault();

  window.sessionStorage.removeItem("list");
}

function deletePizza(e) {
  const element = e.currentTarget.parentElement.parentElement.parentElement;
  const id = element.dataset.id;

  pizzaList.removeChild(element);

  if (pizzaList.children.length === 0) {
    pizzaContainer.classList.remove("show-container");
  }

  displayAlert("Pizza removed", "danger");

  setBackToDefault();

  removeFromSessionStorage(id);
}

function editPizza(e) {
  const element = e.currentTarget.parentElement.parentElement.parentElement;
  const dataset = element.querySelector("#pizza-item-info").dataset;
  const name = dataset.name;
  const heat = dataset.heat;
  const price = dataset.price;
  const photo = dataset.photo;
  const toppings = dataset.toppings
    // .replace(/\s/g, "")
    .split("#key#")
    .filter((topping) => topping);

  editElement = element;
  pizzaNameEdit.value = name;
  pizzaHeatEdit.value = heat;
  pizzaPriceEdit.value = price;
  pizzaPhotoEdit.value = photo;

  setToppingsEdit(toppings);

  editFlag = true;
  editID = element.dataset.id;

  mainEdit.style.display = "grid";
  main.style.display = "none";
}

function setToppings(toppings) {
  const inputContainer = document.getElementById("input-container");
  const pizzaToppings = document.getElementById("pizza-toppings");
  const pizzaToppings2 = document.getElementById("pizza-toppings2");

  pizzaToppings.value = toppings[0];
  pizzaToppings2.value = toppings[1];

  if (toppings.length > 2) {
    for (let i = 2; i < toppings.length; i++) {
      inputContainer.appendChild(createPizzaToppingsInput(toppings[i]));
    }
  }
}

function setToppingsEdit(toppings) {
  const inputContainer = document.getElementById("input-container-edit");
  const pizzaToppings = document.getElementById("pizza-toppings-edit");
  const pizzaToppings2 = document.getElementById("pizza-toppings2-edit");

  pizzaToppings.value = toppings[0];
  pizzaToppings2.value = toppings[1];

  if (toppings.length > 2) {
    for (let i = 2; i < toppings.length; i++) {
      inputContainer.appendChild(createPizzaToppingsInput(toppings[i], true));
    }
  }
}

function createPizzaToppingsInput(toppings, isEdit = false) {
  const element = document.createElement("input");
  const edit = isEdit ? "-edit" : "";

  let type = document.createAttribute("type");
  let value = document.createAttribute("value");
  let placeholder = document.createAttribute("placeholder");
  let maxlength = document.createAttribute("maxlength");

  type.value = "text";
  value.value = toppings || "";
  placeholder.value = "e.g. Pickles";
  maxlength.value = "30";

  element.setAttributeNode(type);
  element.setAttributeNode(value);
  element.setAttributeNode(placeholder);
  element.setAttributeNode(maxlength);
  element.classList.add("pizza-toppings" + edit);
  element.classList.add("pizza-toppings-optional" + edit);

  return element;
}

function addTopping() {
  toppingsContainer.appendChild(createPizzaToppingsInput());
}

function addToppingEdit() {
  toppingsContainerEdit.appendChild(createPizzaToppingsInput("", true));
}

function setupPizzas() {
  let items = getSessionStorage();

  if (items.length > 0) {
    items.forEach((item) => {
      createListPizza(item.id, item.value);
    });

    pizzaContainer.classList.add("show-container");
  }

  setupClearButton();
  scrollToTop();
}

function setupClearButton() {
  if (pizzaList.firstChild) {
    clearButton.removeEventListener("click", goToForm);
    clearButton.addEventListener("click", clearPizzas);
    clearButton.innerHTML = "clear pizzas";
  } else {
    clearButton.removeEventListener("click", clearPizzas);
    clearButton.addEventListener("click", goToForm);
    clearButton.innerHTML = "add pizza";
  }
}

function createListPizza(id, value) {
  const element = setPizza({
    pizzaNameValue: value.pizzaNameValue,
    pizzaHeatValue: value.pizzaHeatValue,
    pizzaPriceValue: value.pizzaPriceValue,
    pizzaPhotoValue: value.pizzaPhotoValue,
    pizzaToppingsValue: value.pizzaToppingsValue,
    id,
  });

  pizzaList.appendChild(element);
}

function setBackToDefault() {
  const optionalToppings = document.querySelectorAll(
    ".pizza-toppings-optional",
  );

  pizzaName.value = "";
  pizzaPrice.value = "";
  pizzaHeat.value = "";
  pizzaPhoto.value = "";
  pizzaNameEdit.value = "";
  pizzaPriceEdit.value = "";
  pizzaHeatEdit.value = "";
  pizzaPhotoEdit.value = "";

  for (let topping of pizzaToppings) {
    topping.id === "pizza-toppings"
      ? (topping.value = "Tomato sauce")
      : (topping.value = "Cheese");
  }

  for (let topping of pizzaToppingsEdit) {
    topping.id === "pizza-toppings"
      ? (topping.value = "Tomato sauce")
      : (topping.value = "Cheese");
  }

  for (let topping of optionalToppings) {
    topping.parentNode.removeChild(topping);
  }

  editFlag = false;
  editID = "";

  setupClearButton();
}

function addToSessionStorage(id, value) {
  const pizza = { id, value };
  let items = getSessionStorage();
  items.push(pizza);
  window.sessionStorage.setItem("list", JSON.stringify(items));
}

function getSessionStorage() {
  return window.sessionStorage.getItem("list")
    ? JSON.parse(window.sessionStorage.getItem("list"))
    : [];
}

function removeFromSessionStorage(id) {
  let items = getSessionStorage();

  items = items.filter((item) => {
    if (item.id !== id) {
      return item;
    }
  });

  window.sessionStorage.setItem("list", JSON.stringify(items));
}

function editSessionStorage(id, value) {
  let items = getSessionStorage();

  items = items.map((item) => {
    if (item.id === id) {
      item.value = value;
    }

    return item;
  });

  window.sessionStorage.setItem("list", JSON.stringify(items));
}

function handleHeatButtonsHoveringIn(e) {
  heatButtonsClasses.button1 = pizzaHeatButton1.classList.contains("active");
  heatButtonsClasses.button2 = pizzaHeatButton2.classList.contains("active");
  heatButtonsClasses.button3 = pizzaHeatButton3.classList.contains("active");

  if (e.target === pizzaHeatButton1) {
    pizzaHeatButton1.classList.add("active");
    pizzaHeatButton2.classList.remove("active");
    pizzaHeatButton3.classList.remove("active");
  } else if (e.target === pizzaHeatButton2) {
    pizzaHeatButton1.classList.add("active");
    pizzaHeatButton2.classList.add("active");
    pizzaHeatButton3.classList.remove("active");
  } else {
    pizzaHeatButton1.classList.add("active");
    pizzaHeatButton2.classList.add("active");
    pizzaHeatButton3.classList.add("active");
  }
}

function handleHeatButtonsHoveringOut() {
  heatButtonsClasses.button1
    ? pizzaHeatButton1.classList.add("active")
    : pizzaHeatButton1.classList.remove("active");
  heatButtonsClasses.button2
    ? pizzaHeatButton2.classList.add("active")
    : pizzaHeatButton2.classList.remove("active");
  heatButtonsClasses.button3
    ? pizzaHeatButton3.classList.add("active")
    : pizzaHeatButton3.classList.remove("active");
}

function setHeatButton(button) {
  if (button === 1) {
    pizzaHeat.value = 1;
    pizzaHeatButton1.classList.add("active");
    pizzaHeatButton2.classList.remove("active");
    pizzaHeatButton3.classList.remove("active");
    heatButtonsClasses.button1 = true;
    heatButtonsClasses.button2 = false;
    heatButtonsClasses.button3 = false;
  } else if (button === 2) {
    pizzaHeat.value = 2;
    pizzaHeatButton1.classList.add("active");
    pizzaHeatButton2.classList.add("active");
    pizzaHeatButton3.classList.remove("active");
    heatButtonsClasses.button1 = true;
    heatButtonsClasses.button2 = true;
    heatButtonsClasses.button3 = false;
  } else {
    pizzaHeat.value = 3;
    pizzaHeatButton1.classList.add("active");
    pizzaHeatButton2.classList.add("active");
    pizzaHeatButton3.classList.add("active");
    heatButtonsClasses.button1 = true;
    heatButtonsClasses.button2 = true;
    heatButtonsClasses.button3 = true;
  }
}

function handleHeatButtonsHoveringInEdit(e) {
  heatButtonsClassesEdit.button1 =
    pizzaHeatButton1Edit.classList.contains("active");
  heatButtonsClassesEdit.button2 =
    pizzaHeatButton2Edit.classList.contains("active");
  heatButtonsClassesEdit.button3 =
    pizzaHeatButton3Edit.classList.contains("active");

  if (e.target === pizzaHeatButton1) {
    pizzaHeatButton1Edit.classList.add("active");
    pizzaHeatButton2Edit.classList.remove("active");
    pizzaHeatButton3Edit.classList.remove("active");
  } else if (e.target === pizzaHeatButton2) {
    pizzaHeatButton1Edit.classList.add("active");
    pizzaHeatButton2Edit.classList.add("active");
    pizzaHeatButton3Edit.classList.remove("active");
  } else {
    pizzaHeatButton1Edit.classList.add("active");
    pizzaHeatButton2Edit.classList.add("active");
    pizzaHeatButton3Edit.classList.add("active");
  }
}

function handleHeatButtonsHoveringOutEdit() {
  heatButtonsClassesEdit.button1
    ? pizzaHeatButton1Edit.classList.add("active")
    : pizzaHeatButton1Edit.classList.remove("active");
  heatButtonsClassesEdit.button2
    ? pizzaHeatButton2Edit.classList.add("active")
    : pizzaHeatButton2Edit.classList.remove("active");
  heatButtonsClassesEdit.button3
    ? pizzaHeatButton3Edit.classList.add("active")
    : pizzaHeatButton3Edit.classList.remove("active");
}

function setHeatButtonEdit(button) {
  if (button === 1) {
    pizzaHeatEdit.value = 1;
    pizzaHeatButton1Edit.classList.add("active");
    pizzaHeatButton2Edit.classList.remove("active");
    pizzaHeatButton3Edit.classList.remove("active");
    heatButtonsClassesEdit.button1 = true;
    heatButtonsClassesEdit.button2 = false;
    heatButtonsClassesEdit.button3 = false;
  } else if (button === 2) {
    pizzaHeatEdit.value = 2;
    pizzaHeatButton1Edit.classList.add("active");
    pizzaHeatButton2Edit.classList.add("active");
    pizzaHeatButton3Edit.classList.remove("active");
    heatButtonsClassesEdit.button1 = true;
    heatButtonsClassesEdit.button2 = true;
    heatButtonsClassesEdit.button3 = false;
  } else {
    pizzaHeatEdit.value = 3;
    pizzaHeatButton1Edit.classList.add("active");
    pizzaHeatButton2Edit.classList.add("active");
    pizzaHeatButton3Edit.classList.add("active");
    heatButtonsClassesEdit.button1 = true;
    heatButtonsClassesEdit.button2 = true;
    heatButtonsClassesEdit.button3 = true;
  }
}
