export default class DebtModal {
  static showModal(e) {
    const div = document.createElement("div");
    div.id = "form-calculator-content";
    div.innerHTML = `
        <header id="form-calculator-header">Debt Calculator</header>
        <input type="hidden" id="form-calculator-category" value="3" />
        <input type="hidden" id="form-calculator-id" value="" />
        <div class="form-group">
          <input type="text" id="form-calculator-title" class="form-control" placeholder="Title" />
        </div>
        <div class="form-group">
          <input type="text" id="form-calculator-amount" class="form-control" placeholder="Amount" />
        </div>
        <select id="Category">
          <option value="1">Secured</option>
          <option value="2">Unsecured</option>
          <option value="3">Revolving</option>
          <option value="4">Non-revolving</option>
        </select>

        <div class="form-group">
          <input type="text" id="form-calculator-interest" class="form-control" placeholder="Interest" />
        </div>

        <div class="form-group">
          <input type="text" id="form-calculator-monthly-payment" class="form-control" placeholder="Monthly Payment" />
        </div>`;
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
}
