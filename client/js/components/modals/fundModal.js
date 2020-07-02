import FundItem from "../../models/fundItem.js";
import UI from "../../ui.js";
import Store from "../../store.js";
import Helper from "../../utils/helper.js";
import Language from "../../utils/language.js";

const dropdownOptionsData = Language.getTerminology("fund", "categories");

let modalTitle = Language.getTerminology("fund", "modalTitle");
let editItem = Language.getTerminology("fund", "editItem");
let placeholderTitle = Language.getTerminology("general", "title");
let placeholderAmount = Language.getTerminology("general", "amount");

export default class FundModal {
  static showModal() {
    let dropdownOptions = dropdownOptionsData;
    const div = document.createElement("div");
    div.id = "form-calculator-content";
    div.innerHTML = `
          <header id="form-calculator-header">${modalTitle}</header>
          <input type="hidden" id="form-calculator-category" value="1" />
          <input type="hidden" id="form-calculator-id" value="1" />
          <div class="form-group">
          <input type="text" id="form-calculator-title" class="form-control" placeholder=${placeholderTitle} autofocus />
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
    Object.keys(dropdownOptions).forEach((key) => {
      let opt = document.createElement("option");
      opt.innerHTML = dropdownOptions[key];
      opt.value = key;
      opt.id = key;
      formType.appendChild(opt);
    });

    const formTitle = document.querySelector("#form-calculator-title");
    formTitle.focus();
  }

  static showEditItemModal(e) {
    let dropdownOptions = dropdownOptionsData;
    this.showModal();
    const form = document.querySelector("#calculator-modal");
    form.classList.add("edit");

    const formHeader = document.querySelector("#form-calculator-header");
    formHeader.innerHTML = `${editItem}`;

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
    Object.keys(dropdownOptions).forEach((key) => {
      if (key == datasetType) {
        formType.selectedIndex = Object.keys(dropdownOptions).indexOf(key);
        return;
      }
    });
  }

  static validate(action) {
    const title = document.querySelector("#form-calculator-title").value;
    const category = document.querySelector("#form-calculator-category").value;
    const type = document.querySelector("#form-calculator-type").value;
    const alertText = "Please fill out all form fields.";
    const numberAlertText = "Please enter valid number";
    const localizedAmount = document.querySelector("#form-calculator-amount").value;
    const amount = Language.delocalizeAmount(localizedAmount);

    if (title === "" || amount === "" || type === "Category") {
      UI.showAlert(alertText);
    } else if (!Number(amount)) {
      UI.showAlert(numberAlertText);
    } else {
      if (action == "submit") {
        const id = Helper.generateUUIDv4();
        const item = new FundItem(id, category, title, amount, type);
        UI.addItemToList(item);
        Store.addItem(item);
        UI.buildItemChart(category);
        UI.hideCalculatorModal();
      } else {
        const id = document.querySelector("#form-calculator-id").value;
        const item = new FundItem(id, category, title, amount, type);
        UI.updateItem(item);
        Store.editItem(item);
        UI.buildItemChart(category);
        UI.hideCalculatorModal();
      }
    }
  }
}
