export default class ExpenseModal {
  static showModal(e) {
    const div = document.createElement("div");
    div.id = "modal";
    div.className = "modal-generated";
    div.innerHTML = `
    <div class="modal-content">
      <button id="modal-close"></button>
      <form id="modal-form">
        <header id="form-header"></header>
        <input type="hidden" id="form-category" value="" />
        <input type="hidden" id="form-calcultor-id" value="" />
        <div class="form-group">
          <input type="text" id="form-title" class="form-control" placeholder="Title" />
        </div>
        <div class="form-group">
          <input type="text" id="form-amount" class="form-control" placeholder="Amount" />
        </div>
        <select id="Category">
          <option value="2">Misc Expense</option>
          <option value="3">Education</option>
          <option value="3">Shopping</option>
          <option value="3">Personal Care</option>
          <option value="3">Health & Fitness</option>
          <option value="3">Kids</option>
          <option value="3">Food & Dining</option>
          <option value="">Gifts and Donations</option>
          <option value="">Investments</option>
          <option value="">Bills & Utilities</option>
          <option value = ""> Auto & Transport</option>
          <option value = "">Fees and Charges</option>
          <option>Business Services</option>
          <option>Taxes</option>
        </select>

        <div class="form-group">
          <input type="text" id="form-interest" class="form-control" placeholder="Interest" />
        </div>

        <div class="form-group">
          <input type="text" id="form-monthly-payment" class="form-control" placeholder="Monthly Payment" />
        </div>
        <input type="button" id="form-submit" value="Save [+]" />
        <input type="button" id="form-edit-submit" value="Save [+]" />
        <input type="button" id="form-cancel" value="Cancel [-]" />
    </div>
    </form>
  </div>`;
    const formContainer = document.querySelector("#item-form");
    formContainer.appendChild(div);
  }
}
