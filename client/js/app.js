import UI from "./ui.js";
import Store from "./store.js";
import Helper from "./helper.js";
import Item from "./item.js";

// Event: Display Items
document.addEventListener("DOMContentLoaded", UI.displayItems);

// Event: Add an Item
document.querySelector("#item-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const amount = document.querySelector("#amount").value;
  const category = document.querySelector("#category").value;
  console.log(e);
  console.log(title);
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

document.querySelectorAll(".delete").forEach((item) => {
  item.addEventListener("click", (e) => {
    console.log(e.target.parentElement.parentElement.parentElement);
    Store.removeItem(
      e.target.parentElement.parentElement.parentElement.className
    );
    UI.deleteItem(e.target);
  });
});

// listen for button click events
document.addEventListener("click", (e) => {
  const isButton = e.target.nodeName === "BUTTON";
  if (!isButton) {
    console.log("not button");
    return;
  }

  if (isButton && e.target.className === "list-item") {
    UI.toggleItemMenu(e.target.id);
    return;
  }

  if (isButton && e.target.className === "delete") {
    UI.deleteItem(e.target);
  }

  return;
});
