import DebtItem from "./debtItem.js";
import UI from "./ui.js";
import Store from "./store.js";
import Helper from "./helper.js";

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
        <option value="0">Category</option>
        <option value="Secured">Secured</option>
        <option value="Unsecured">Unsecured</option>
        <option value="Revolving">Revolving</option>
        <option value="Non-revolving">Non-revolving</option>
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
  }

  static showEditItemModal(e) {
    this.showModal();
    console.log(e);
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

    const formType = document.querySelector("#form-calculator-type");
    console.log(e.dataset.type);
    formType.selectedIndex = `${e.dataset.type}`;

    const formAmount = document.querySelector("#form-calculator-amount");
    formAmount.value = `${e.dataset.amount}`;

    const formRemainingMonths = document.querySelector(
      "#form-calculator-remaining-months"
    );
    formRemainingMonths.value = `${e.dataset.remainingmonths}`;

    // const formSubmit = document.querySelector("#form-calculator-submit");
    // formSubmit.style.display = "none";

    const formEditSubmit = document.querySelector(
      "#form-calculator-edit-submit"
    );
    formEditSubmit.style.display = "block";
  }

  static validate(action) {
    console.log(action);
    const title = document.querySelector("#form-calculator-title").value;
    const amount = document.querySelector("#form-calculator-amount").value;
    const category = document.querySelector("#form-calculator-category").value;
    const type = document.querySelector("#form-calculator-type").value;
    const remainingmonths = document.querySelector(
      "#form-calculator-remaining-months"
    ).value;
    console.log(remainingmonths);
    const alertText = "Please fill out all form fields.";
    const numberAlertText = "Please enter valid number";
    console.log("validate");

    if (title === "" || amount === "") {
      UI.showAlert(alertText);
    } else if (!Number(amount)) {
      UI.showAlert(numberAlertText);
    } else {
      if (action == "submit") {
        console.log("submit");
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
        console.log("edit");
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
