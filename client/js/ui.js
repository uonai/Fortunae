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

  static deleteItem(el) {
    if (el.classList.contains("delete")) {
      console.log(el.parentElement.parentElement.parentElement);
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#amount").value = "";
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".form-container");
    const form = document.querySelector("#item-form");
    container.insertBefore(div, form);
    setTimeout(() => document.querySelector(".alert").remove(), 2000);
  }

  static showModal(e) {
    console.log(e.target);
    console.log("show modal ran");
    //const modal = document.querySelector(".form-container");
    // modal.className += " show-modal";
    const div = document.createElement("div");
    div.className = "form";
    div.innerHTML = `
    <button class="close-form"><img src="./images/close.svg" width="12px"></button>
    <form id="item-form">
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
      <input type="submit" class="add-item" value="Cancel [-]" />
    </form>`;
    const formContainer = document.getElementById("form-container");
    formContainer.appendChild(div);
  }

  static hideModal() {
    const modal = document.querySelector(".form-container");
    console.log("hide modal ran");
    // this needs to be fixed
    modal.className += "form-container";
  }

  static showListItemMenu(e) {
    e.preventDefault;
    console.log(e);
    // const buttonId = `#${e}`;
    // const button = document.querySelector(buttonId);
    // const itemMenu = document.getElementById("item-menu");

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
