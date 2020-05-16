import UI from "./ui.js";
import Store from "./store.js";
import Helper from "./helper.js";
import Item from "./item.js";
import ExpenseItem from "./expenseItem.js";
import Recommendation from "./recommendation.js";
import Menu from "./menu.js";
import HistoryChart from "./historyChart.js";
import Chart from "./chart.js";
import DebtModal from "./debtModal.js";
import ExpenseModal from "./expenseModal.js";
import IncomeModal from "./incomeModal.js";
import PopOut from "./popOut.js";

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

document.querySelector("#modal-close").addEventListener("click", (e) => {
  UI.hideModal(e.target);
  UI.clearFields(e.target);
});

// EXPENSE FORM CALCULATOR SUBMIT
document
  .querySelector("#form-calculator-submit")
  .addEventListener("click", (e) => {
    e.preventDefault();
    const category = document.querySelector("#form-calculator-category").value;
    console.log(category);
    switch (category) {
      case "2":
        ExpenseModal.validate("submit");
        break;
      case "3":
        DebtModal.validate("submit");
        break;
      case "4":
        IncomeModal.validate("submit");
        break;
      default:
        console.log("none found");
    }
  });

document
  .querySelector("#modal-calculator-close")
  .addEventListener("click", (e) => {
    console.log(e);
    UI.hideCalculatorModal();
  });

document
  .querySelector("#form-calculator-cancel")
  .addEventListener("click", () => {
    console.log(e);
    UI.hideCalculatorModal();
  });

document
  .querySelector("#form-calculator-edit-submit")
  .addEventListener("click", (e) => {
    e.preventDefault();
    console.log(e);
    const category = document.querySelector("#form-calculator-category").value;

    switch (category) {
      case "2":
        ExpenseModal.validate("edit");
        break;
      case "3":
        DebtModal.validate("edit");
        break;
      case "4":
        IncomeModal.validate("edit");
        break;
      default:
        console.log("none found");
    }
  });

document.querySelectorAll(".add-item").forEach((item) => {
  item.addEventListener("click", (e) => {
    console.log(e.target.id);
    if (e.target.id == 1) {
      UI.showModal(e.target);
    } else if (e.target.id == 2) {
      ExpenseModal.showModal(e);
    } else if (e.target.id == 3) {
      DebtModal.showModal(e);
    } else IncomeModal.showModal(e);
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
    console.log(e.target.dataset.category);
    switch (e.target.dataset.category) {
      // case "1":
      //   UI.showEditItemModal(e.target);
      //   break;
      case "2":
        ExpenseModal.showEditItemModal(e.target);
        break;
      case "3":
        DebtModal.showEditItemModal(e.target);
        break;
      case "4":
        IncomeModal.showEditItemModal(e.target);
        break;
    }
  }

  // if (isButton && e.target.id === "close-modal") {
  //   UI.hideModal();
  // }

  if (isButton && e.target.className === "menu") {
    Menu.showModal(e.target);
  }

  if (isButton && e.target.id === "child-window") {
    PopOut.openChild();
  }

  if (isButton && e.target.id === "sankey-button") {
    PopOut.openSankey();
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
    ExpenseModal.showModal();
    console.log("2");
  } else if (e.ctrlKey && e.keyCode == 51) {
    DebtModal.showModal(e);
    console.log("3");
  } else if (e.ctrlKey && e.keyCode == 52) {
    IncomeModal.showModal(e);
    console.log("4");
  }
}
