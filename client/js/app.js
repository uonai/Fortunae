import UI from "./ui.js";
import Store from "./store.js";
import Helper from "./helper.js";
import Item from "./item.js";

// Event: Display Items
document.addEventListener("DOMContentLoaded", UI.displayItems);

// Event: Add an Item
document.querySelector("#form-container").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const amount = document.querySelector("#amount").value;
  const category = document.querySelector("#category").value;

  // Validation

  if (title === "" || amount === "") {
    UI.showAlert("Please fill out all form fields.", "error");
  } else {
    const id = Helper.generateUUIDv4();
    const item = new Item(id, category, title, amount);

    UI.addItemToList(item);
    Store.addItem(item);
    UI.clearFields();
  }
});

document.querySelectorAll(".add-item").forEach((item) => {
  item.addEventListener("click", (e) => {
    console.log(e.target);
    UI.showModal(e);
  });
});

document.querySelector("#item-list").addEventListener("click", (e) => {
  console.log(e.target.parentElement.parentElement.parentElement);
  Store.removeItem(
    e.target.parentElement.parentElement.parentElement.className
  );
  UI.deleteItem(e.target);
});

// listen for button click events
document.addEventListener("click", (event) => {
  const isButton = event.target.nodeName === "BUTTON";
  if (!isButton) {
    console.log("not button");
    return;
  }

  if (isButton && event.target.className === "list-item") {
    console.log(event.target.id);
    UI.showListItemMenu(event.target.id);
    return;
  }

  console.log("is button");
  console.dir(event.target.id);
});
