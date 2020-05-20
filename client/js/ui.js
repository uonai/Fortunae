import Store from "./store.js";

export default class UI {
  static displayItems() {
    const items = Store.getItems();
    if (items) {
      items.forEach((item) => UI.addItemToList(item));
    }

    this.buildItemChart(1);
    this.buildItemChart(2);
    this.buildItemChart(3);
    this.buildItemChart(4);
    this.buildItemChart(5);
  }

  static addItemToList(item) {
    if (item) {
      const list = document.querySelector(`#item-list-${item.category}`);
      const listItem = document.createElement("li");
      listItem.className = item.id;
      listItem.innerHTML = `
      <button id="${item.id}" class="list-item">${item.title}: $${item.amount}</button>
      <span id="item-menu-${item.id}" class="hidden">
      <button class="edit" data-id=${item.id} data-category=${item.category} data-title=${item.title} data-amount=${item.amount} data-type="${item.type}" data-remainingmonths=${item.remainingmonths}>Edit [/] </button>&nbsp;<button class="delete" data-category=${item.category}>Delete [x]</button></span>`;
      list.appendChild(listItem);
    }
  }

  static updateItem(item) {
    const list = document.querySelector(`#item-list-${item.category}`);
    const listItem = document.querySelector(`[class='${item.id}']`);
    listItem.className = item.id;
    listItem.innerHTML = `
      <button id="${item.id}" class="list-item">${item.title}: $${item.amount}</button>
      <span id="item-menu-${item.id}" class="hidden">
      <button class="edit" data-id=${item.id} data-category=${item.category} data-title=${item.title} data-amount=${item.amount} data-type="${item.type}">Edit [/] </button>&nbsp;<button class="delete" data-category=${item.category}>Delete [x]</button></span>`;
    list.appendChild(listItem);
  }

  // this should eventually be refactored
  static buildItemChart(category) {
    const categoryNumber = category.toString();
    const items = Store.getItems();
    let n = [];
    items.map(function (i) {
      i.category === categoryNumber ? n.push(Number(i.amount)) : "";
    });

    let nTotal = n.reduce((partial_sum, a) => partial_sum + a, 0);
    const chart = document.querySelector(`#item-chart-${categoryNumber}`);
    chart.innerHTML = "";
    items.forEach((item) => {
      if (item.category == categoryNumber) {
        const itemWidth = Math.round((item.amount / nTotal) * 99);
        const chart = document.querySelector(`#item-chart-${categoryNumber}`);
        const chartItem = document.createElement("div");
        chartItem.className = "inner-rectangle";
        chartItem.style.cssText = `width: ${itemWidth}%`;
        chart.appendChild(chartItem);
      }
    });
  }

  static deleteItem(e) {
    if (e.classList.contains("delete")) {
      e.parentElement.parentElement.remove();
    }
    Store.removeItem(e.parentElement.parentElement.className);
    this.buildItemChart(e.dataset.category);
  }

  static clearFields(e) {
    document.querySelector("#form-calculator-title").value = "";
    document.querySelector("#form-calculator-amount").value = "";
  }

  static showAlert(alertText) {
    const div = document.createElement("div");
    div.className = `alert`;
    div.innerHTML = `${alertText}`;
    const form = document.querySelector("#form-calculator-header");
    form.before(div);
    setTimeout(() => document.querySelector(".alert").remove(), 2000);
  }

  static hideCalculatorModal() {
    const form = document.querySelector("#calculator-modal");
    form.style = "display:hidden;";
    form.classList.remove("edit");
    form.classList.remove("new");
    const content = document.querySelector("#form-calculator-content");
    content.parentNode.removeChild(content);
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
