import NeedItem from "../../models/needItem.js";
import UI from "../../ui.js";
import Store from "../../store.js";
import Helper from "../../utils/helper.js";
export default class NeedModal {
  static showModal() {
    const div = document.createElement("div");
    div.id = "form-calculator-content";
    div.innerHTML = `
        <header id="form-calculator-header">Budget Item</header>
        <input type="hidden" id="form-calculator-category" value="5" />
        <input type="hidden" id="form-calculator-id" value="5" />
        <div class="form-group">
          <input type="text" id="form-calculator-title" class="form-control" placeholder="Title" />
        </div>
        <select id="form-calculator-type">
        <option value="0">Category</option>
        <option value="Need">Need</option>
        <option value="Want">Want</option>
        <option value="Debt">Debt</option>
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

    const form = document.querySelector("#calculator-modal");
    form.classList.add("edit");

    const formHeader = document.querySelector("#form-calculator-header");
    formHeader.innerHTML = `Edit Budget Item`;

    const formCategory = document.querySelector("#form-calculator-category");
    formCategory.value = `${e.dataset.category}`;

    const formId = document.querySelector("#form-calculator-id");
    formId.value = `${e.dataset.id}`;

    const modal = document.querySelector("#calculator-modal");
    modal.style.display = "block";

    const formTitle = document.querySelector("#form-calculator-title");
    formTitle.value = `${e.dataset.title}`;

    const formType = document.querySelector("#form-calculator-type");
    formType.selectedIndex = `${e.dataset.type}`;

    const formAmount = document.querySelector("#form-calculator-amount");
    formAmount.value = `${e.dataset.amount}`;
  }

  static validate(action) {
    const title = document.querySelector("#form-calculator-title").value;
    const amount = document.querySelector("#form-calculator-amount").value;
    const category = document.querySelector("#form-calculator-category").value;
    const type = document.querySelector("#form-calculator-type").value;
    const alertText = "Please fill out all form fields.";
    const numberAlertText = "Please enter valid number";

    if (title === "" || amount === "") {
      UI.showAlert(alertText);
    } else if (!Number(amount)) {
      UI.showAlert(numberAlertText);
    } else {
      if (action == "submit") {
        const id = Helper.generateUUIDv4();
        const item = new NeedItem(id, category, title, amount, type);
        UI.addItemToList(item);
        Store.addItem(item);
        UI.buildItemChart(category);
        UI.hideCalculatorModal();
      } else {
        const id = document.querySelector("#form-calculator-id").value;
        const item = new NeedItem(id, category, title, amount, type);
        UI.updateItem(item);
        Store.editItem(item);
        UI.buildItemChart(category);
        UI.hideCalculatorModal();
      }
    }
  }
}
