import ExpenseItem from "../../models/expenseItem.js";
import UI from "../../ui.js";
import Store from "../../store.js";
import Helper from "../../utils/helper.js";
import Language from "../../utils/language.js";

const dropdownOptionsData = Language.getTerminology("expense", "categories");
let modalTitle = Language.getTerminology("expense", "modalTitle");
let placeholderTitle = Language.getTerminology("general", "title");
let placeholderAmount = Language.getTerminology("general", "amount");

export default class ExpenseModal {
  static showModal() {
    let dropdownOptions = Object.values(dropdownOptionsData);
    const div = document.createElement("div");

    div.id = "form-calculator-content";
    div.innerHTML = `
        <header id="form-calculator-header">${modalTitle}</header>
        <input type="hidden" id="form-calculator-category" value="2" />
        <input type="hidden" id="form-calculator-id" value="2" />
        <div class="form-group">
          <input type="text" id="form-calculator-title" class="form-control" placeholder=${placeholderTitle} />
        </div>
        <select id="form-calculator-type">
        </select>
        <div class="form-group">
          <input type="text" id="form-calculator-amount" class="form-control" placeholder=${placeholderAmount} />
        </div>

 `;
    const formContainer = document.querySelector("#modal-calculator-footer");
    const parent = document.querySelector("#modal-calculator-form");
    parent.insertBefore(div, formContainer);
    const form = document.querySelector("#calculator-modal");
    form.style = "display:block;";
    form.classList.add("new");

    const formType = document.querySelector("#form-calculator-type");
    for (var i = 0; i < dropdownOptions.length; i++) {
      var opt = document.createElement("option");
      opt.innerHTML = dropdownOptions[i];
      opt.value = dropdownOptions[i];
      formType.appendChild(opt);
    }

    const formTitle = document.querySelector("#form-calculator-title");
    formTitle.focus();
  }

  static showEditItemModal(e) {
    let dropdownOptions = Object.values(dropdownOptionsData);
    this.showModal();
    const form = document.querySelector("#calculator-modal");
    form.classList.add("edit");

    const formHeader = document.querySelector("#form-calculator-header");
    formHeader.innerHTML = `Edit Expense`;

    const formCategory = document.querySelector("#form-calculator-category");
    formCategory.value = `${e.dataset.category}`;

    const formId = document.querySelector("#form-calculator-id");
    formId.value = `${e.dataset.id}`;

    const modal = document.querySelector("#calculator-modal");
    modal.style.display = "block";

    const formTitle = document.querySelector("#form-calculator-title");
    formTitle.value = `${e.dataset.title}`;

    const formAmount = document.querySelector("#form-calculator-amount");
    formAmount.value = `${e.dataset.amount}`;

    const formType = document.querySelector("#form-calculator-type");
    const datasetType = `${e.dataset.type}`;
    for (var i = 0; i < dropdownOptions.length; i++) {
      if (dropdownOptions[i] == datasetType) {
        var option = i;
        formType.selectedIndex = option;
        return;
      }
    }
  }

  static validate(action) {
    const title = document.querySelector("#form-calculator-title").value;
    const amount = document.querySelector("#form-calculator-amount").value;
    const category = document.querySelector("#form-calculator-category").value;
    const type = document.querySelector("#form-calculator-type").value;
    const alertText = "Please fill out all form fields.";
    const numberAlertText = "Please enter valid number";

    if (title === "" || amount === "" || type === "Category") {
      UI.showAlert(alertText);
    } else if (!Number(amount)) {
      UI.showAlert(numberAlertText);
    } else {
      if (action == "submit") {
        const id = Helper.generateUUIDv4();
        const item = new ExpenseItem(id, category, title, amount, type);
        UI.addItemToList(item);
        Store.addItem(item);
        UI.buildItemChart(category);
        UI.hideCalculatorModal();
      } else {
        const id = document.querySelector("#form-calculator-id").value;
        const item = new ExpenseItem(id, category, title, amount, type);
        UI.updateItem(item);
        Store.editItem(item);
        UI.buildItemChart(category);
        UI.hideCalculatorModal();
      }
    }
  }
}
