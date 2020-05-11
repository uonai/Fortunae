import Store from "./store.js";

export default class UI {
  static displayItems() {
    const items = Store.getItems();
    items.forEach((item) => UI.addItemToList(item));
    this.addChartToSection();
    console.log("ran");
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

  // static showAlert(className) {
  //   const div = document.createElement("div");
  //   div.className = `alert alert-${className}`;
  //   alert("fill out form");
  //   // const container = document.querySelector(".form");
  //   // const form = document.querySelector("#item-form");
  //   // container.insertBefore(div, form);
  //   setTimeout(() => document.querySelector(".alert").remove(), 2000);
  // }

  static showModal(e) {
    const div = document.createElement("div");
    div.className = "form";
    div.innerHTML = `
    <button class="close-form"></button>
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
      <button type="cancel" class="cancel-item">Cancel [-]<button/>`;
    const formContainer = document.getElementById("item-form");
    formContainer.appendChild(div);
  }

  // THIS SHOULD NOT WORK LIKE THIS IN PRODUCTION.
  // innerHTML is a very heavy way to do this
  static hideModal() {
    const formContainer = document.getElementById("item-form");
    formContainer.innerHTML = "";
  }

  static openChild() {
    const { remote } = require("electron");
    const path = require("path");

    let win = new remote.BrowserWindow({
      parent: remote.getCurrentWindow(),
      width: 900,
      height: 600,
      // modal: true,
      resizable: false,
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
