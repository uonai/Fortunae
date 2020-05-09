// Item Class: Represents an item

class Item {
  constructor(id, title, amount) {
    this.id = id;
    this.title = title;
    this.amount = amount;
  }
}

class Helper {
  static generateUUIDv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }
}
// UI Class: Handles UI Tasks

class UI {
  static displayItems() {
    const items = Store.getItems();
    console.log(items);
    UI.addButtonToSection();
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

  static addButtonToSection() {
    const section = document.querySelector(".section-container");
    const sectionAddButton = document.createElement("button");
    sectionAddButton.innerHTML = "Add Fund [+]";
    section.appendChild(sectionAddButton);
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
      console.log("test");
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
}

// Store Class: Handles Storage

class Store {
  static getItems() {
    let items;
    if (localStorage.getItem("items") === null) {
      items = [];
    } else {
      items = JSON.parse(localStorage.getItem("items"));
    }
    console.log(items);
    return items;
  }

  static addItem(item) {
    const items = Store.getItems();
    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));
  }

  static removeItem(id) {
    const items = Store.getItems();

    items.forEach((item, index) => {
      if (item.id === id) {
        items.splice(index, 1);
      }
    });

    localStorage.setItem("items", JSON.stringify(items));
  }
}

// Event: Display Items
document.addEventListener("DOMContentLoaded", UI.displayItems);

// Event: Add an Item
document.querySelector("#item-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const amount = document.querySelector("#amount").value;

  // Validation

  if (title === "" || amount === "") {
    UI.showAlert("Please fill out all form fields.", "error");
  } else {
    // Instantiate item
    const id = Helper.generateUUIDv4();
    console.log(id);
    const item = new Item(id, title, amount);
    UI.addItemToList(item);
    Store.addItem(item);
    UI.clearFields();
    console.log(item);
  }
});

// Event: Remove an Item
document.querySelector("#item-list").addEventListener("click", (e) => {
  Store.removeItem(e.target.parentElement.className);
  UI.deleteItem(e.target);
});
