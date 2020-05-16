import IncomeItem from "./incomeItem.js";
import UI from "./ui.js";
import Store from "./store.js";
import Helper from "./helper.js";
export default class IncomeModal {
  static showModal(e) {
    const div = document.createElement("div");
    div.id = "form-calculator-content";
    div.innerHTML = `
        <header id="form-calculator-header">Income Calculator</header>
        <input type="hidden" id="form-calculator-category" value="4" />
        <input type="hidden" id="form-calculator-id" value="4" />
        <div class="form-group">
          <input type="text" id="form-calculator-title" class="form-control" placeholder="Title" />
        </div>
        <select id="form-calculator-type">
        <option value="0">Category</option> 
          <option value="1">Passive</option>
          <option value="2">Active</option>
          <option value="3">Portfolio</option>
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
  static hideModal() {
    const form = document.querySelector("#calculator-modal");
    form.style = "display:hidden;";
    const content = document.querySelector("#form-calculator-content");
    content.parentNode.removeChild(content);
  }

  static showEditItemModal(e) {
    this.showModal();
    console.log(e);
    const formHeader = document.querySelector("#form-calculator-header");
    formHeader.innerHTML = `Edit Income`;

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
        const item = new IncomeItem(id, category, title, amount, type);
        UI.addItemToList(item);
        Store.addItem(item);
        UI.buildItemChart(category);
        UI.hideCalculatorModal();
      } else {
        console.log("edit");
        const id = document.querySelector("#form-calculator-id").value;
        const item = new IncomeItem(id, category, title, amount, type);
        UI.updateItem(item);
        Store.editItem(item);
        UI.buildItemChart(category);
        UI.hideCalculatorModal();
      }
    }
  }
}
