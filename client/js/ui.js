import Store from "./store.js";

export default class UI {
  static displayItems() {
    const items = Store.getItems();
    console.log(items);
    UI.addChartToSection();
    if (items.length) {
      items.forEach((item) => UI.addItemToList(item));
    }
  }

  static addItemToList(item) {
    const list = document.querySelector("#item-list");

    const listItem = document.createElement("li");
    listItem.className = item.id;

    listItem.innerHTML = `
    <span>${item.title}</span>: $<span>${item.amount}</span>
    <a="#" class="delete">X</a>
    `;
    list.appendChild(listItem);
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
      el.parentElement.remove();
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

  static showModal() {
    const modal = document.querySelector(".form-container");
    modal.className += " show-modal";
  }

  static hideModal() {
    const modal = document.querySelector(".form-container");
    modal.className += "form-container";
  }
}
