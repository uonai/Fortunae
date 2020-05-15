export default class IncomeModal {
  static showModal(e) {
    const div = document.createElement("div");
    div.id = "calculator-modal";
    div.className = "modal-generated";
    div.innerHTML = `
    <div class="modal-calculator-content">
      <button id="modal-calculator-close"></button>
      <form id="modal-calculator-form">
        <header id="form-calculator-header">Income Calculator</header>
        <input type="hidden" id="form-calculator-category" value="4" />
        <input type="hidden" id="form-calculator-id" value="" />
        <div class="form-group">
          <input type="text" id="form-calculator-title" class="form-control" placeholder="Title" />
        </div>
        <div class="form-group">
          <input type="text" id="form-calculator-amount" class="form-control" placeholder="Amount" />
        </div>
        <select id="Category">
          <option value="1">Passive</option>
          <option value="2">Active</option>
          <option value="3">Portfolio</option>
        </select>

        <div class="form-group">
          <input type="text" id="form-calculator-interest" class="form-control" placeholder="Interest" />
        </div>

        <div class="form-group">
          <input type="text" id="form-calculator-monthly-payment" class="form-control" placeholder="Monthly Payment" />
        </div>
        <input type="button" id="form-calculator-submit" value="Save [+]" />
        <input type="button" id="form-calculator-edit-submit" value="Save [+]" />
        <input type="button" id="form-calculator-cancel" value="Cancel [-]" />
    </div>
    </form>
  </div>`;
    const formContainer = document.querySelector("#item-form");
    formContainer.appendChild(div);
  }
}
