import DebtItem from "../../models/debtItem.js";
import UI from "../../ui.js";
import Store from "../../store.js";
import Helper from "../../utils/helper.js";

export default class DeleteDialog {
  static showDialog() {
    const dialog = document.querySelector("#dialog");
    dialog.style = "display:block;";
  }

  static hideDialog() {
    const dialog = document.querySelector("#dialog");
    dialog.style = "display:hidden;";
  }
}
