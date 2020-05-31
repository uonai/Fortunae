import SettingsItem from "../../models/settingsItem.js";
import UI from "../../ui.js";
import Store from "../../store.js";
import Helper from "../../utils/helper.js";
import Language from "../../utils/language.js";

const dropdownOptionsData = JSON.parse(localStorage.getItem("languages"));

let modalTitle = Language.getTerminology("settings", "title");
let foregroundTerminology = Language.getTerminology("settings", "foreground");
let backgroundTerminology = Language.getTerminology("settings", "background");
let alertTerminology = Language.getTerminology("settings", "alert");
let confirmationTerminology = Language.getTerminology(
  "settings",
  "confirmation"
);
let languageTerminology = Language.getTerminology("settings", "language");
let editItem = Language.getTerminology("settings", "editItem");

let settings = JSON.parse(localStorage.getItem("settings"));

export default class SettingsModal {
  static showModal() {
    let dropdownOptions = dropdownOptionsData;
    const div = document.createElement("div");
    div.id = "form-calculator-content";
    div.innerHTML = `
          <header id="form-calculator-header">${modalTitle}</header>
          <input type="hidden" id="form-calculator-category" value="6" />
          <input type="hidden" id="form-calculator-id" value="6" />
          <div class="form-group">
          <label>${languageTerminology}</label>
          <select id="form-calculator-type">
          </select>
          </div>
          <div class="form-group">
          <label>${foregroundTerminology}</label>
            <input type="text" id="form-calculator-foreground" class="form-control" placeholder="${settings.foregroundColor}" />
          </div>
          <div class="form-group">
          <label>${backgroundTerminology}</label>
            <input type="text" id="form-calculator-background" class="form-control" placeholder="${settings.backgroundColor}" />
          </div>
          <div class="form-group">
          <label>${alertTerminology}</label>
            <input type="text" id="form-calculator-alert" class="form-control" placeholder="${settings.alertColor}" />
          </div>
          <div class="form-group">
          <label>${confirmationTerminology}</label>
            <input type="text" id="form-calculator-confirmation" class="form-control" placeholder="${settings.confirmationColor}" />
          </div>
   `;
    const formContainer = document.querySelector("#modal-calculator-footer");
    const parent = document.querySelector("#modal-calculator-form");
    parent.insertBefore(div, formContainer);
    const form = document.querySelector("#calculator-modal");
    form.style = "display:block; top: 150px;";
    form.classList.add("new");

    const formType = document.querySelector("#form-calculator-type");

    Object.values(dropdownOptions).forEach((value) => {
      console.log(value);
      let opt = document.createElement("option");
      opt.innerHTML = value;
      opt.value = value;
      opt.id = value;
      formType.appendChild(opt);
    });
    formType.focus();
  }

  static showEditItemModal(e) {
    let dropdownOptions = dropdownOptionsData;
    this.showModal();

    const form = document.querySelector("#calculator-modal");
    form.classList.add("edit");

    const formHeader = document.querySelector("#form-calculator-header");
    formHeader.innerHTML = `${editItem}`;

    const modal = document.querySelector("#calculator-modal");
    modal.style.display = "block";

    const formType = document.querySelector("#form-calculator-type");
    const datasetType = `${settings.language}`;
    Object.values(dropdownOptions).forEach((value) => {
      if (value == datasetType) {
        formType.selectedIndex = dropdownOptions.findIndex(
          (item) => item == value
        );
        console.log(formType.selectedIndex);
        return;
      }
    });

    const foregroundColor = document.querySelector(
      "#form-calculator-foreground"
    );
    foregroundColor.value = settings.foregroundColor;

    const backgroundColor = document.querySelector(
      "#form-calculator-background"
    );
    backgroundColor.value = settings.backgroundColor;

    const alertColor = document.querySelector("#form-calculator-alert");
    alertColor.value = settings.alertColor;

    const confirmationColor = document.querySelector(
      "#form-calculator-confirmation"
    );
    confirmationColor.value = settings.confirmationColor;
  }

  static validate() {
    const language = document.querySelector("#form-calculator-type");
    const languageSelectedValue =
      language.options[language.selectedIndex].innerHTML;
    console.log(languageSelectedValue);

    const foregroundColor = document.querySelector(
      "#form-calculator-foreground"
    ).value;
    const backgroundColor = document.querySelector(
      "#form-calculator-background"
    ).value;
    const alertColor = document.querySelector("#form-calculator-alert").value;
    const confirmationColor = document.querySelector(
      "#form-calculator-confirmation"
    ).value;
    const alertText = "Please fill out all form fields.";
    const numberAlertText =
      "Please enter valid HEX in all fields. Example format: #fff .";
    const foregroundBackgroundAlertText =
      "Foreground and background colors should contrast.";

    if (
      foregroundColor === "" ||
      backgroundColor === "" ||
      alertColor === "" ||
      confirmationColor === ""
    ) {
      UI.showAlert(alertText);
    } else if (
      Helper.checkIfHex(foregroundColor) == false ||
      Helper.checkIfHex(backgroundColor) == false ||
      Helper.checkIfHex(alertColor) == false ||
      Helper.checkIfHex(confirmationColor) == false
    ) {
      console.log(foregroundColor);
      UI.showAlert(numberAlertText);
    } else if (foregroundColor == backgroundColor) {
      UI.showAlert(foregroundBackgroundAlertText);
    } else {
      console.log(foregroundColor);
      const item = new SettingsItem(
        languageSelectedValue,
        foregroundColor,
        backgroundColor,
        alertColor,
        confirmationColor
      );
      // UI.updateSettings(item);
      Store.editSettings(item);
      //  UI.buildItemChart(category);
      UI.hideCalculatorModal();
    }
  }
}
