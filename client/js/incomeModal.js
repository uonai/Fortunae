export default class IncomeModal {
  static showModal(e) {
    const div = document.createElement("div");
    div.id = "form-calculator-content";
    div.innerHTML = `
        <header id="form-calculator-header">Income Calculator</header>
        <input type="hidden" id="form-calculator-category" value="4" />
        <input type="hidden" id="form-calculator-id" value="" />
        <div class="form-group">
          <input type="text" id="form-calculator-title" class="form-control" placeholder="Title" />
        </div>
        <select id="category">
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
}
