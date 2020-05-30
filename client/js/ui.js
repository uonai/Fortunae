import Store from "./store.js";
import Language from "./utils/language.js";

const editTerminology = Language.getTerminology("general", "edit");
const deleteTerminology = Language.getTerminology("general", "delete");

export default class UI {
  static buildUI() {
    const fundsHeaderTerminology = Language.getTerminology("fund", "title");
    const fundsHeader = document.querySelector(`#funds-header`);
    fundsHeader.innerHTML = `${fundsHeaderTerminology}`;

    const expensesHeaderTerminology = Language.getTerminology(
      "expense",
      "title"
    );
    const expensesHeader = document.querySelector(`#expenses-header`);
    expensesHeader.innerHTML = `${expensesHeaderTerminology}`;

    const debtsHeaderTerminology = Language.getTerminology("debt", "title");
    const debtsHeader = document.querySelector(`#debts-header`);
    debtsHeader.innerHTML = `${debtsHeaderTerminology}`;

    const incomesHeaderTerminology = Language.getTerminology("income", "title");
    const incomesHeader = document.querySelector(`#incomes-header`);
    incomesHeader.innerHTML = `${incomesHeaderTerminology}`;

    const budgetHeaderTerminology = Language.getTerminology("budget", "title");
    const budgetHeader = document.querySelector(`#budget-header`);
    budgetHeader.innerHTML = `${budgetHeaderTerminology}`;

    const recommendationsHeaderTerminology = Language.getTerminology(
      "general",
      "recommendations"
    );
    const recommendationsHeader = document.querySelector(
      `#recommendations-header`
    );
    recommendationsHeader.innerHTML = `${recommendationsHeaderTerminology}`;

    const trendDataHeaderTerminology = Language.getTerminology(
      "general",
      "trendData"
    );
    const trendDataHeader = document.querySelector(`#trend-data-header`);
    trendDataHeader.innerHTML = `${trendDataHeaderTerminology}`;

    const historyHeaderTerminology = Language.getTerminology(
      "general",
      "history"
    );
    const historyHeader = document.querySelector(`#history-header`);
    historyHeader.innerHTML = `${historyHeaderTerminology}`;

    const tomeTerminology = Language.getTerminology("general", "tome");
    const tomeButton = document.querySelector(`#tome-button`);
    tomeButton.innerHTML = `${tomeTerminology} [?]`;

    const saveTerminology = Language.getTerminology("general", "save");
    const saveButton = document.querySelector(`#save-record`);
    saveButton.innerHTML = `${saveTerminology}`;

    const cloneTerminology = Language.getTerminology("general", "clone");
    const cloneButton = document.querySelector(`#clone-record`);
    cloneButton.innerHTML = `${cloneTerminology}`;

    const deleteTerminology = Language.getTerminology("general", "delete");
    const deleteButton = document.querySelector(`#delete-record`);
    deleteButton.innerHTML = `${deleteTerminology}`;

    const addFundTerminology = Language.getTerminology("fund", "addItem");
    const addFundButton = document.getElementById("1");
    addFundButton.innerHTML = `${addFundTerminology} [+]`;

    const addExpenseTerminology = Language.getTerminology("expense", "addItem");
    const addExpenseButton = document.getElementById("2");
    addExpenseButton.innerHTML = `${addExpenseTerminology} [+]`;

    const addDebtTerminology = Language.getTerminology("debt", "addItem");
    const addDebtButton = document.getElementById("3");
    addDebtButton.innerHTML = `${addDebtTerminology} [+]`;

    const addIncomeTerminology = Language.getTerminology("income", "addItem");
    const addIncomeButton = document.getElementById("4");
    addIncomeButton.innerHTML = `${addIncomeTerminology} [+]`;

    const dialogHeaderTerminology = Language.getTerminology(
      "delete",
      "confirmation"
    );
    const dialogHeader = document.getElementById("dialog-header");
    dialogHeader.innerHTML = `${dialogHeaderTerminology}`;

    const dialogSubtextTerminology = Language.getTerminology(
      "delete",
      "confirmationSubtext"
    );
    const dialogSubtext = document.getElementById("dialog-subtext");
    dialogSubtext.innerHTML = `${dialogSubtextTerminology}`;

    const dialogConfirmTerminology = Language.getTerminology(
      "general",
      "confirm"
    );
    const dialogConfirm = document.getElementById("dialog-confirm");
    dialogConfirm.value = `${dialogConfirmTerminology} [✓]`;

    const dialogDenyTerminology = Language.getTerminology("general", "deny");
    const dialogDeny = document.getElementById("dialog-cancel");
    dialogDeny.value = `${dialogDenyTerminology} [x]`;

    const formCalculatorEditSubmitTerminology = Language.getTerminology(
      "general",
      "saveEdits"
    );
    const formCalculatorEditSubmit = document.getElementById(
      "form-calculator-edit-submit"
    );
    formCalculatorEditSubmit.value = `${formCalculatorEditSubmitTerminology} [+]`;

    const formCalculatorSubmitTerminology = Language.getTerminology(
      "general",
      "saveNew"
    );
    const formCalculatorSubmit = document.getElementById(
      "form-calculator-submit"
    );
    formCalculatorSubmit.value = `${formCalculatorSubmitTerminology} [+]`;

    const formCalculatorCancelTerminology = Language.getTerminology(
      "general",
      "cancel"
    );
    const formCalculatorCancel = document.getElementById(
      "form-calculator-cancel"
    );
    formCalculatorCancel.value = `${formCalculatorCancelTerminology} [-]`;
  }

  static displayItems() {
    const items = Store.getItems();
    if (items) {
      items.forEach((item) => UI.addItemToList(item));
    }

    this.buildItemChart(1);
    this.buildItemChart(2);
    this.buildItemChart(3);
    this.buildItemChart(4);
    this.buildItemChart(5);
  }

  static addItemToList(item) {
    if (item) {
      const list = document.querySelector(`#item-list-${item.category}`);
      const listItem = document.createElement("li");
      listItem.className = item.id;
      listItem.innerHTML = `
      <button id="${item.id}" class="list-item">${item.title}: ${item.amount}</button>
      <span id="item-menu-${item.id}" class="hidden">
      <button class="edit"  data-id=${item.id} data-category=${item.category} data-title=${item.title} data-amount=${item.amount} data-type="${item.type}">${editTerminology} [/] </button>&nbsp;<button class="delete" data-category=${item.category}>${deleteTerminology} [x]</button></span>`;
      list.appendChild(listItem);
    }
  }

  static updateItem(item) {
    const list = document.querySelector(`#item-list-${item.category}`);
    const listItem = document.querySelector(`[class='${item.id}']`);
    listItem.className = item.id;
    listItem.innerHTML = `
      <button id="${item.id}" class="list-item">${item.title}: ${item.amount}</button>
      <span id="item-menu-${item.id}" class="hidden">
      <button class="edit" data-item="${item}" data-id=${item.id} data-category=${item.category} data-title=${item.title} data-amount=${item.amount} data-type="${item.type}">${editTerminology} [/] </button>&nbsp;<button class="delete" data-category=${item.category}>${deleteTerminology} [x]</button></span>`;
    list.appendChild(listItem);
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
        const itemWidth = Math.round((item.amount / nTotal) * 99);
        const chart = document.querySelector(`#item-chart-${categoryNumber}`);
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
    document.querySelector("#form-calculator-title").value = "";
    document.querySelector("#form-calculator-amount").value = "";
  }

  static showAlert(alertText) {
    const div = document.createElement("div");
    div.className = `alert`;
    div.innerHTML = `${alertText}`;
    const form = document.querySelector("#form-calculator-header");
    form.before(div);
    setTimeout(() => document.querySelector(".alert").remove(), 2000);
  }

  static hideCalculatorModal() {
    const form = document.querySelector("#calculator-modal");
    form.style = "display:hidden;";
    form.classList.remove("edit");
    form.classList.remove("new");
    const content = document.querySelector("#form-calculator-content");
    content.parentNode.removeChild(content);
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
