import DebtItem from "../../models/debtItem.js";
import UI from "../../ui.js";
import Store from "../../store.js";
import Helper from "../../utils/helper.js";

const dropdownOptions = [
  "Category",
  "Secured",
  "Unsecured",
  "Revolving",
  "Non-revolving",
];
export default class DebtModal {
  static showModal() {
    const div = document.createElement("div");
    div.id = "form-calculator-content";
    div.innerHTML = `
        <header id="form-calculator-header">Debt Calculator</header>
        <input type="hidden" id="form-calculator-category" value="3" />
        <input type="hidden" id="form-calculator-id" value="3" />
        <div class="form-group">
          <input type="text" id="form-calculator-title" class="form-control" placeholder="Title" />
        </div>
        <select id="form-calculator-type">
      </select>
        <div class="form-group">
        <input type="text" id="form-calculator-amount" class="form-control" placeholder="Monthly Payment" />
      </div>
      <div class="form-group">
      <input type="text" id="form-calculator-remaining-months" class="form-control" placeholder="Remaining Months" />
    </div>
        
        `;
    const formContainer = document.querySelector("#modal-calculator-footer");
    const parent = document.querySelector("#modal-calculator-form");
    parent.insertBefore(div, formContainer);
    const form = document.querySelector("#calculator-modal");
    form.style = "display:block;";

    const formType = document.querySelector("#form-calculator-type");

    for (var i = 0; i < dropdownOptions.length; i++) {
      var opt = document.createElement("option");
      opt.innerHTML = dropdownOptions[i];
      opt.value = dropdownOptions[i];
      formType.appendChild(opt);
    }
  }

  static showEditItemModal(e) {
    this.showModal();
    const form = document.querySelector("#calculator-modal");
    form.classList.add("edit");

    const formHeader = document.querySelector("#form-calculator-header");
    formHeader.innerHTML = `Edit Debt`;

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

    const formRemainingMonths = document.querySelector(
      "#form-calculator-remaining-months"
    );
    formRemainingMonths.value = `${e.dataset.remainingmonths}`;
  }

  static validate(action) {
    const title = document.querySelector("#form-calculator-title").value;
    const amount = document.querySelector("#form-calculator-amount").value;
    const category = document.querySelector("#form-calculator-category").value;
    const type = document.querySelector("#form-calculator-type").value;
    const remainingmonths = document.querySelector(
      "#form-calculator-remaining-months"
    ).value;
    const alertText = "Please fill out all form fields.";
    const numberAlertText = "Please enter valid number";

    if (title === "" || amount === "") {
      UI.showAlert(alertText);
    } else if (!Number(amount)) {
      UI.showAlert(numberAlertText);
    } else {
      if (action == "submit") {
        const id = Helper.generateUUIDv4();
        const item = new DebtItem(
          id,
          category,
          title,
          amount,
          type,
          remainingmonths
        );
        UI.addItemToList(item);
        Store.addItem(item);
        UI.buildItemChart(category);
        UI.hideCalculatorModal();
      } else {
        const id = document.querySelector("#form-calculator-id").value;
        const item = new DebtItem(
          id,
          category,
          title,
          amount,
          type,
          remainingmonths
        );
        UI.updateItem(item);
        Store.editItem(item);
        UI.buildItemChart(category);
        UI.hideCalculatorModal();
      }
    }
  }
}