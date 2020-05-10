import Store from "./store.js";

export default class UI {
  static displayItems() {
    const items = Store.getItems();
    UI.addChartToSection();
    items.forEach((item) => UI.addItemToList(item));
  }

  static addItemToList(item) {
    console.log(item);
    const list = document.querySelector(`#item-list-${item.category}`);
    console.log(list);

    const listItem = document.createElement("li");
    listItem.className = item.id;

    listItem.innerHTML = `
    <button id="${item.id}" class="list-item">${item.title}: $${item.amount}</button>
    <span id="item-menu-${item.id}" class="hidden"><button class="edit">Edit: [/]</button><button class="delete">Delete: [x]</button></span>
    `;
    list.appendChild(listItem);
  }

  static openMenu(e) {
    e.preventDefault();
    console.log(e);
  }

  static addChartToSection() {
    const section = document.querySelector(".section-container");
    const sectionAddChart = document.createElement("div");
    sectionAddChart.className = "rectangle";
    sectionAddChart.innerHTML = `<div class="inner-rectangle"></div>`;
    section.appendChild(sectionAddChart);
  }

  static deleteItem(e) {
    if (e.classList.contains("delete")) {
      console.log(e.parentElement.parentElement);
      e.parentElement.parentElement.remove();
    }
    Store.removeItem(e.parentElement.parentElement.className);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#amount").value = "";
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    const container = document.querySelector(".form");
    const form = document.querySelector("#item-form");
    container.insertBefore(div, form);
    setTimeout(() => document.querySelector(".alert").remove(), 2000);
  }

  static showModal(e) {
    const div = document.createElement("div");
    div.className = "form";
    div.innerHTML = `
    <button class="close-form"><img src="./images/close.svg" width="12px"></button>
      <header>${e.target.dataset.title}</header>
      <input type="hidden" id="category" value=${e.target.id}> 
      <div class="form-group">
        <label for="title"></label>
        <input type="text" id="title" class="form-control" />
      </div>
      <div class="form-group">
        <input type="text" id="amount" class="form-control" />
      </div>
      <input type="submit" class="add-item" value="Save [+]" />
      <input type="submit" class="add-item" value="Cancel [-]" />`;
    const formContainer = document.getElementById("item-form");
    formContainer.appendChild(div);
  }

  static showListItemMenu(e) {
    e.preventDefault;
    console.log(e);
    const itemMenu = document.getElementById(`item-menu-${e}`);
    if (itemMenu.classList.length) {
      itemMenu.classList = "";
      console.log(itemMenu);
    } else {
      itemMenu.classList = "hidden";
    }

    // if (itemMenu) {
    //   itemMenu.parentNode.removeChild(itemMenu);
    // } else {
    //   const itemMenu = document.createElement("span");
    //   itemMenu.id = "item-menu";
    //   itemMenu.innerHTML = `<button><a="#" class="edit">Edit: [/] </a></button><button><a="#" class="delete">Delete: [x]</a></button>`;
    //   button.after(itemMenu);
    // }
    return;
  }
}
