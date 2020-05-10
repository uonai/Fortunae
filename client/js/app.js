import UI from "./ui.js";
import Store from "./store.js";
import Helper from "./helper.js";
import Item from "./item.js";
import Recommendation from "./recommendation.js";
import Menu from "./menu.js";
import HistoryChart from "./historyChart.js";
//import Chart from "./chart.js";

document.addEventListener(
  "DOMContentLoaded",
  UI.displayItems(),
  Recommendation.displayRecommendations(),
  HistoryChart.loadHistoryChart()
  //Chart.loadChart()
);

document.querySelector("#item-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const amount = document.querySelector("#amount").value;
  const category = document.querySelector("#category").value;
  // const alertText = "Please fill out all form fields.";

  if (title === "" || amount === "") {
    // UI.showAlert(alertText);
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
    UI.showModal(e);
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

document.getElementById("save").onclick = () => {
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

  if (isButton && e.target.className === "close-form") {
    console.log("close form");
    UI.hideModal();
  }

  if (isButton && e.target.className == "cancel-item") {
    console.log("cancel");
    UI.hideModal(e);
  }

  if (isButton && e.target.className === "menu") {
    console.log("menu button");
    Menu.showModal(e);
  }

  return;
});
