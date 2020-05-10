export default class Menu {
  static showModal(e) {
    const div = document.createElement("div");
    div.className = "form";
    div.innerHTML = `
        <button class="close-form"><img src="./images/close.svg" width="12px"></button>
          <header>Settings</header>
          <input type="hidden" id="category" value=${e.target.id}> 
          <div class="form-group">
            <label for="title">Title: </label>
            <input type="text" id="title" class="form-control" />
          </div>
          <div class="form-group">
          <label for="amount">Amount: </label>
            <input type="text" id="amount" class="form-control" />
          </div>
          <input type="submit" class="add-item" value="Save [+]" />
          <input type="submit" class="add-item" value="Cancel [-]" />`;
    const formContainer = document.getElementById("item-form");
    formContainer.appendChild(div);
  }
}
