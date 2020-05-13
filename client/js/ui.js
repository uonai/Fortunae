import Store from "./store.js";

export default class UI {
  static displayItems() {
    const items = Store.getItems();
    if (items) {
      items.forEach((item) => UI.addItemToList(item));
    }

    this.buildItemChart();
    console.log("ran");
  }

  static addItemToList(item) {
    if (item) {
      console.log(item);
      console.log("add item");
      const list = document.querySelector(`#item-list-${item.category}`);
      const listItem = document.createElement("li");
      listItem.className = item.id;
      listItem.innerHTML = `
      <button id="${item.id}" class="list-item">${item.title}: $${item.amount}</button>
      <span id="item-menu-${item.id}" class="hidden"><button class="edit">Edit [/] </button>&nbsp;<button class="delete">Delete [x]</button></span>
      `;
      list.appendChild(listItem);
    }
  }

  static buildItemChart() {
    const items = Store.getItems();
    let n = [];
    console.log(items);
    items.map(function (i) {
      const iNumber = Number(i.amount);
      n.push(iNumber);
    });

    let nTotal = n.reduce((partial_sum, a) => partial_sum + a, 0);

    if (nTotal) {
      const chart = document.querySelector(`#item-chart-1`);
      chart.innerHTML = "";
      items.forEach((item) => {
        if (item.category === 1 || 2 || 3 || 4) {
          const itemWidth = Math.round((item.amount / nTotal) * 100);
          const chart = document.querySelector(`#item-chart-1`);
          // const chart = document.querySelector(`#item-chart-${item.category}`);
          const chartItem = document.createElement("div");
          chartItem.className = "inner-rectangle";
          chartItem.style.cssText = `width: ${itemWidth}%`;
          chart.appendChild(chartItem);
          console.log(chartItem);
        }
      });
    }
  }

  // static addChartToSection() {
  //   const section = document.querySelector("#section-1");
  //   const sectionAddChart = document.createElement("div");
  //   sectionAddChart.className = "rectangle";
  //   sectionAddChart.innerHTML = `<div class="inner-rectangle"></div>`;
  //   //  section.appendChild(sectionAddChart);
  // }

  static deleteItem(e) {
    if (e.classList.contains("delete")) {
      e.parentElement.parentElement.remove();
    }
    Store.removeItem(e.parentElement.parentElement.className);
    UI.buildItemChart();
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

  static showModal(e) {
    console.log("show-modal");
    const formHeader = document.getElementById("form-header");
    formHeader.innerHTML = `${e.target.dataset.title}`;

    const formCategory = document.getElementById("form-category");
    formCategory.value = `${e.target.id}`;

    const modal = document.getElementById("main-modal");
    modal.style.display = "block";
  }

  // THIS SHOULD NOT WORK LIKE THIS IN PRODUCTION.
  // innerHTML is a very heavy way to do this
  static hideModal() {
    console.log("hide modal");
    const modal = document.getElementById("main-modal");
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
