import UI from "./ui.js";
import Store from "./store.js";
import Recommendation from "./recommendation.js";
import Chart from "./chart.js";
import DebtModal from "./debtModal.js";
import ExpenseModal from "./expenseModal.js";
import IncomeModal from "./incomeModal.js";
import FundModal from "./fundModal.js";
import NeedModal from "./needModal.js";
import PopOut from "./popOut.js";

document.addEventListener(
  "DOMContentLoaded",
  UI.displayItems(),
  Recommendation.displayRecommendations(),
  Chart.loadChart(),
  Store.loadCompleteDatabase()
);

// EXPENSE FORM CALCULATOR SUBMIT
document
  .querySelector("#form-calculator-submit")
  .addEventListener("click", (e) => {
    e.preventDefault();
    const category = document.querySelector("#form-calculator-category").value;
    switch (category) {
      case "1":
        FundModal.validate("submit");
        break;
      case "2":
        ExpenseModal.validate("submit");
        break;
      case "3":
        DebtModal.validate("submit");
        break;
      case "4":
        IncomeModal.validate("submit");
        break;
      case "5":
        NeedModal.validate("submit");
        break;
      default:
        console.log("none found");
    }
  });

document
  .querySelector("#modal-calculator-close")
  .addEventListener("click", (e) => {
    UI.hideCalculatorModal();
  });

document
  .querySelector("#form-calculator-cancel")
  .addEventListener("click", () => {
    UI.hideCalculatorModal();
  });

document
  .querySelector("#form-calculator-edit-submit")
  .addEventListener("click", (e) => {
    e.preventDefault();
    const category = document.querySelector("#form-calculator-category").value;

    switch (category) {
      case "1":
        FundModal.validate("edit");
        break;
      case "2":
        ExpenseModal.validate("edit");
        break;
      case "3":
        DebtModal.validate("edit");
        break;
      case "4":
        IncomeModal.validate("edit");
        break;
      case "5":
        NeedModal.validate("edit");
        break;
      default:
        console.log("none found");
    }
  });

document.querySelectorAll(".add-item").forEach((item) => {
  item.addEventListener("click", (e) => {
    switch (e.target.id) {
      case "1":
        FundModal.showModal(e);
        break;
      case "2":
        ExpenseModal.showModal(e);
        break;
      case "3":
        DebtModal.showModal(e);
        break;
      case "4":
        IncomeModal.showModal(e);
        break;
      case "5":
        NeedModal.showModal(e);
        break;
      default:
        console.log("none found");
    }
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

document.querySelector("#save-record").onclick = () => {
  Store.saveRecord();
};

document.querySelector("#clone-record").onclick = () => {
  Store.cloneRecord();
};

document.querySelector("#delete-record").onclick = () => {
  Store.deleteRecord();
};

document.addEventListener("click", (e) => {
  const isButton = e.target.nodeName === "BUTTON";

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
    switch (e.target.dataset.category) {
      case "1":
        FundModal.showEditItemModal(e.target);
        break;
      case "2":
        ExpenseModal.showEditItemModal(e.target);
        break;
      case "3":
        DebtModal.showEditItemModal(e.target);
        break;
      case "4":
        IncomeModal.showEditItemModal(e.target);
        break;
      case "5":
        NeedModal.showEditItemModal(e.target);
        break;
      default:
        console.log("none found");
    }
  }

  // if (isButton && e.target.id === "close-modal") {
  //   UI.hideModal();
  // }

  if (isButton && e.target.className === "menu") {
    Menu.showModal(e.target);
  }

  if (isButton && e.target.id === "child-window") {
    PopOut.openFund();
  }

  if (isButton && e.target.id === "sankey-button") {
    PopOut.openSankey();
  }

  if (isButton && e.target.id === "radar-button") {
    PopOut.openSpider();
  }

  if (isButton && e.target.id === "burndown-button") {
    PopOut.openBurndown();
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
    FundModal.showModal();
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
