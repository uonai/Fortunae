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
  }

  static addItemToList(item) {
    if (item) {
      const list = document.querySelector(`#item-list-${item.category}`);
      console.log(list);
      const listItem = document.createElement("li");
      listItem.className = item.id;
      console.log(listItem);
      listItem.innerHTML = `
      <button id="${item.id}" class="list-item">${item.title}: $${item.amount}</button>
      <span id="item-menu-${item.id}" class="hidden">
      <button class="edit" data-id=${item.id} data-category=${item.category} data-title=${item.title} data-amount=${item.amount}>Edit [/] </button>&nbsp;<button class="delete" data-category=${item.category}>Delete [x]</button></span>`;
      list.appendChild(listItem);
    }
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
        const itemWidth = Math.round((item.amount / nTotal) * 100);
        const chart = document.querySelector(`#item-chart-${categoryNumber}`);
        // const chart = document.querySelector(`#item-chart-${item.category}`);
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

  static clearFields() {
    document.querySelector("#form-title").value = "";
    document.querySelector("#form-amount").value = "";
  }

  static showAlert(alertText) {
    const div = document.createElement("div");
    div.className = `alert`;
    div.innerHTML = `${alertText}`;
    const form = document.querySelector("#form-header");
    form.before(div);
    setTimeout(() => document.querySelector(".alert").remove(), 2000);
  }

  static editItem(e) {
    console.log(e);
    console.log(e.dataset.category);
    const formHeader = document.querySelector("#form-header");
    formHeader.innerHTML = `${e.dataset.title}`;

    const formCategory = document.querySelector("#form-category");
    formCategory.value = `${e.dataset.category}`;

    const modal = document.querySelector("#main-modal");
    modal.style.display = "block";

    const formTitle = document.querySelector("#form-title");
    formTitle.value = `${e.dataset.title}`;

    const formAmount = document.querySelector("#form-amount");
    formAmount.value = `${e.dataset.amount}`;
  }

  static showModal(e) {
    const formHeader = document.querySelector("#form-header");
    formHeader.innerHTML = `${e.dataset.title}`;

    const formCategory = document.querySelector("#form-category");
    formCategory.value = `${e.id}`;

    const modal = document.querySelector("#main-modal");
    modal.style.display = "block";
  }

  static hideModal() {
    const modal = document.querySelector("#main-modal");
    modal.style.display = "none";
  }

  static openChild() {
    const { remote } = require("electron");
    const path = require("path");

    let win = new remote.BrowserWindow({
      parent: remote.getCurrentWindow(),
      width: 900,
      height: 600,
      // modal: true,
      resizable: true,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        nodeIntegration: true,
      },
      frame: false,
    });

    const theUrl = "file://" + __dirname + "/index-child.html";

    win.loadURL(theUrl);
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
