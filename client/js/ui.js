import Store from "./store.js";

export default class UI {
  static displayItems() {
    const items = Store.getItems();
    items.forEach((item) => UI.addItemToList(item));
    this.addChartToSection();
  }

  static addItemToList(item) {
    const list = document.querySelector(`#item-list-${item.category}`);
    const listItem = document.createElement("li");
    listItem.className = item.id;
    listItem.innerHTML = `
    <button id="${item.id}" class="list-item">${item.title}: $${item.amount}</button>
    <span id="item-menu-${item.id}" class="hidden"><button class="edit">Edit [/] </button><button class="delete">Delete [x]</button></span>
    `;
    list.appendChild(listItem);
  }

  static addChartToSection() {
    const section = document.querySelector("#section-1");
    const sectionAddChart = document.createElement("div");
    sectionAddChart.className = "rectangle";
    sectionAddChart.innerHTML = `<div class="inner-rectangle"></div>`;
    //  section.appendChild(sectionAddChart);
  }

  static deleteItem(e) {
    if (e.classList.contains("delete")) {
      e.parentElement.parentElement.remove();
    }
    Store.removeItem(e.parentElement.parentElement.className);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#amount").value = "";
  }

  static showAlert(className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    // const container = document.querySelector(".form");
    // const form = document.querySelector("#item-form");
    // container.insertBefore(div, form);
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
        <label for="title">Title: </label>
        <input type="text" id="title" class="form-control" />
      </div>
      <div class="form-group">
      <label for="amount">Amount: </label>
        <input type="text" id="amount" class="form-control" />
      </div>
      <input type="submit" class="add-item" value="Save [+]" />
      <input type="submit" class="add-item" value="Cancel [-]" />`;
    const formContainer = document.getElementById("item-form");
    formContainer.appendChild(div);
  }

  static toggleItemMenu(e) {
    const itemMenu = document.getElementById(`item-menu-${e}`);
    if (itemMenu.classList.length) {
      itemMenu.classList = "";
    } else {
      itemMenu.classList = "hidden";
    }
    return;
  }
}