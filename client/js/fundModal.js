import ExpenseItem from "./expenseItem.js";
import UI from "./ui.js";
import Store from "./store.js";
export default class FundModal {
  static showModal() {
    const div = document.createElement("div");
    div.id = "form-calculator-content";
    div.innerHTML = `
        <header id="form-calculator-header">Expense</header>
        <input type="hidden" id="form-calculator-category" value="2" />
        <input type="hidden" id="form-calculator-id" value="2" />
        <div class="form-group">
          <input type="text" id="form-calculator-title" class="form-control" placeholder="Title" />
        </div>
        <select id="form-calculator-type">
        <option value="0">Category</option>
          <option value="1">Misc Expense</option>
          <option value="2">Education</option>
          <option value="3">Shopping</option>
          <option value="4">Personal Care</option>
          <option value="5">Health & Fitness</option>
          <option value="6">Food & Dining</option>
          <option value="7">Gifts and Donations</option>
          <option value="8">Investments</option>
          <option value="9">Bills & Utilities</option>
          <option value = "10"> Auto & Transport</option>
          <option value = "11">Fees and Charges</option>
          <option value="12">Business Services</option>
          <option>Taxes</option>
        </select>
        <div class="form-group">
          <input type="text" id="form-calculator-amount" class="form-control" placeholder="Amount" />
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
    formHeader.innerHTML = `Edit Item`;

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

    const formSubmit = document.querySelector("#form-calculator-submit");
    formSubmit.style.display = "none";

    const formEditSubmit = document.querySelector(
      "#form-calculator-edit-submit"
    );
    formEditSubmit.style.display = "block";
  }

  static hideModal() {
    const form = document.querySelector("#calculator-modal");
    form.style = "display:hidden;";
    const content = document.querySelector("#form-calculator-content");
    content.parentNode.removeChild(content);
  }

  static validate(e) {
    const title = document.querySelector("#form-calculator-title").value;
    const amount = document.querySelector("#form-calculator-amount").value;
    const category = document.querySelector("#form-calculator-category").value;
    const type = document.querySelector("#form-calculator-type").value;
    const alertText = "Please fill out all form fields.";
    const numberAlertText = "Please enter valid number";
    console.log("validate");

    if (title === "" || amount === "") {
      UI.showAlert(alertText);
    } else if (!Number(amount)) {
      UI.showAlert(numberAlertText);
    } else {
      const id = Helper.generateUUIDv4();
      const item = new ExpenseItem(id, category, title, amount, type);
      UI.addItemToList(item);
      Store.addItem(item);
      UI.buildItemChart(category);
      // UI.hideModal();
      UI.clearFields();
    }
  }

  static editSubmit(e) {
    const title = document.querySelector("#form-calculator-title").value;
    const amount = document.querySelector("#form-calculator-amount").value;
    const category = document.querySelector("#form-calculator-category").value;
    const type = document.querySelector("#form-calculator-type").value;
    const id = document.querySelector("#form-calculator-id").value;
    const alertText = "Please fill out all form fields.";
    const numberAlertText = "Please enter valid number";

    if (title === "" || amount === "") {
      UI.showAlert(alertText);
    } else if (!Number(amount)) {
      UI.showAlert(numberAlertText);
    } else {
      const item = new ExpenseItem(id, category, title, amount, type);
      UI.updateItem(item);
      Store.editItem(item);
      UI.buildItemChart(category);
      this.hideModal();
    }
  }
}
