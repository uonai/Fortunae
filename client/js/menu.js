export default class Menu {
  static showModal(e) {
    const div = document.createElement("div");
    div.className = "form";
    div.innerHTML = `
      <button class="close-form">x</button>
      <header>Settings</header>
      <input type="hidden" id="category" value=""> 
      <div class="form-group">
      <label for="amount">Salary: </label>
        <input type="text" id="salary" class="form-control" />
      </div>
      <input type="submit" class="add-item" value="Save [+]" />
      <input type="submit" class="add-item" value="Cancel [-]" />`;
    const formContainer = document.querySelector("#item-form");
    formContainer.appendChild(div);
  }
}
