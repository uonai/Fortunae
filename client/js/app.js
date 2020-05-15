import UI from "./ui.js";
import Store from "./store.js";
import Helper from "./helper.js";
import Item from "./item.js";
import Recommendation from "./recommendation.js";
// import Menu from "./menu.js";
import HistoryChart from "./historyChart.js";
import Chart from "./chart.js";

document.addEventListener(
  "DOMContentLoaded",
  UI.displayItems(),
  Recommendation.displayRecommendations(),
  Chart.loadChart(),
  Store.loadCompleteDatabase()
);

// SAVE
document.querySelector("#form-submit").addEventListener("click", (e) => {
  e.preventDefault();

  const title = document.querySelector("#form-title").value;
  const amount = document.querySelector("#form-amount").value;
  const category = document.querySelector("#form-category").value;
  const alertText = "Please fill out all form fields.";
  const numberAlertText = "Please enter valid number";

  if (title === "" || amount === "") {
    UI.showAlert(alertText);
  } else if (!Number(amount)) {
    UI.showAlert(numberAlertText);
  } else {
    const id = Helper.generateUUIDv4();
    const item = new Item(id, category, title, amount);
    UI.addItemToList(item);
    Store.addItem(item);
    UI.buildItemChart(category);
    // UI.hideModal();
    UI.clearFields();
  }
});

//EDIT
document.querySelector("#form-edit-submit").addEventListener("click", (e) => {
  e.preventDefault();

  const title = document.querySelector("#form-title").value;
  const amount = document.querySelector("#form-amount").value;
  const category = document.querySelector("#form-category").value;
  const id = document.querySelector("#form-id").value;
  const alertText = "Please fill out all form fields.";
  const numberAlertText = "Please enter valid number";

  if (title === "" || amount === "") {
    UI.showAlert(alertText);
  } else if (!Number(amount)) {
    UI.showAlert(numberAlertText);
  } else {
    const item = new Item(id, category, title, amount);
    UI.updateItem(item);
    Store.editItem(item);
    UI.buildItemChart(category);
    UI.hideModal();
    UI.clearFields();
  }
});

document.querySelector("#form-cancel").addEventListener("click", () => {
  UI.hideModal();
  UI.clearFields();
});

document.querySelector("#modal-close").addEventListener("click", () => {
  UI.hideModal();
  UI.clearFields();
});

document.querySelectorAll(".add-item").forEach((item) => {
  item.addEventListener("click", (e) => {
    UI.showModal(e.target);
  });
});

document.querySelectorAll(".delete").forEach((item) => {
  item.addEventListener("click", (e) => {
    Store.removeItem(
      e.target.parentElement.parentElement.parentElement.className
    );
    UI.deleteItem(e.target);
  });
});

document.querySelector("#save").onclick = () => {
  Store.saveJSON();
};

document.addEventListener("click", (e) => {
  const isButton = e.target.nodeName === "BUTTON";

  //this should be a switch statement
  if (!isButton) {
    return;
  }

  if (isButton && e.target.className === "list-item") {
    UI.toggleItemMenu(e.target.id);
    return;
  }

  if (isButton && e.target.className === "delete") {
    UI.deleteItem(e.target);
  }

  if (isButton && e.target.className == "edit") {
    UI.showEditItemModal(e.target);
  }

  if (isButton && e.target.id === "close-modal") {
    UI.hideModal();
  }

  if (isButton && e.target.className === "menu") {
    Menu.showModal(e.target);
  }

  if (isButton && e.target.id === "child-window") {
    UI.openChild();
  }

  if (isButton && e.target.id === "sankey-button") {
    UI.openSankey();
  }

  if (isButton && e.target.id === "main-button") {
    UI.showModal(e.target);
  }

  return;
});

// hotkeys
document.addEventListener("keyup", doc_keyUp, false);

function doc_keyUp(e) {
  if (e.ctrlKey && e.keyCode == 83) {
    // ctrl + s
    Store.saveJSON();
  } else if (e.ctrlKey && e.keyCode == 49) {
    // ctrl + 1
    console.log("1");
  } else if (e.ctrlKey && e.keyCode == 50) {
    // ctrl + 2
    console.log("2");
  } else if (e.ctrlKey && e.keyCode == 51) {
    // ctrl + 3
    console.log("3");
  } else if (e.ctrlKey && e.keyCode == 52) {
    // ctrl + 4
    console.log("4");
  }
}
