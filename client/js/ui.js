import Store from "./store.js";

export default class UI {
  static displayItems() {
    const items = Store.getItems();
    if (items) {
      items.forEach((item) => UI.addItemToList(item));
    }

    this.buildItemChart(1);
    this.buildItemChart(2);
    this.buildItemChart(3);
    this.buildItemChart(4);
  }

  static addItemToList(item) {
    console.log(item.category);
    console.log(item.id);
    if (item) {
      const list = document.querySelector(`#item-list-${item.category}`);
      const listItem = document.createElement("li");
      listItem.className = item.id;
      console.log(listItem);
      listItem.innerHTML = `
      <button id="${item.id}" class="list-item">${item.title}: $${item.amount}</button>
      <span id="item-menu-${item.id}" class="hidden">
      <button class="edit" data-id=${item.id} data-category=${item.category} data-title=${item.title} data-amount=${item.amount} data-type=${item.type} data-remainingmonths=${item.remainingmonths}>Edit [/] </button>&nbsp;<button class="delete" data-category=${item.category}>Delete [x]</button></span>`;
      list.appendChild(listItem);
    }
  }

  static updateItem(item) {
    const list = document.querySelector(`#item-list-${item.category}`);
    const listItem = document.querySelector(`[class='${item.id}']`);
    listItem.className = item.id;
    listItem.innerHTML = `
      <button id="${item.id}" class="list-item">${item.title}: $${item.amount}</button>
      <span id="item-menu-${item.id}" class="hidden">
      <button class="edit" data-id=${item.id} data-category=${item.category} data-title=${item.title} data-amount=${item.amount} data-type=${item.type} data-remainingmonths=${item.remainingmonths}>Edit [/] </button>&nbsp;<button class="delete" data-category=${item.category}>Delete [x]</button></span>`;
    list.appendChild(listItem);
  }

  // this should eventually be refactored
  static buildItemChart(category) {
    const categoryNumber = category.toString();
    const items = Store.getItems();
    let n = [];
    items.map(function (i) {
      i.category === categoryNumber ? n.push(Number(i.amount)) : "";
    });

    let nTotal = n.reduce((partial_sum, a) => partial_sum + a, 0);
    const chart = document.querySelector(`#item-chart-${categoryNumber}`);
    chart.innerHTML = "";
    items.forEach((item) => {
      if (item.category == categoryNumber) {
        const itemWidth = Math.round((item.amount / nTotal) * 99.5);
        const chart = document.querySelector(`#item-chart-${categoryNumber}`);
        // const chart = document.querySelector(`#item-chart-${item.category}`);
        const chartItem = document.createElement("div");
        chartItem.className = "inner-rectangle";
        chartItem.style.cssText = `width: ${itemWidth}%`;
        chart.appendChild(chartItem);
      }
    });
  }

  static deleteItem(e) {
    if (e.classList.contains("delete")) {
      e.parentElement.parentElement.remove();
    }
    Store.removeItem(e.parentElement.parentElement.className);
    this.buildItemChart(e.dataset.category);
  }

  static clearFields(e) {
    document.querySelector("#form-calculator-title").value = "";
    document.querySelector("#form-calculator-amount").value = "";
  }

  static showAlert(alertText) {
    const div = document.createElement("div");
    div.className = `alert`;
    div.innerHTML = `${alertText}`;
    // const form = document.querySelector("#form-header");
    const form = document.querySelector("#form-calculator-header");
    form.before(div);
    setTimeout(() => document.querySelector(".alert").remove(), 2000);
  }

  // static showEditItemModal(e) {
  //   console.log(e);
  //   console.log(e.dataset.category);
  //   const formHeader = document.querySelector("#form-header");
  //   formHeader.innerHTML = `Edit Item`;

  //   const formCategory = document.querySelector("#form-category");
  //   formCategory.value = `${e.dataset.category}`;

  //   const formId = document.querySelector("#form-id");
  //   formId.value = `${e.dataset.id}`;

  //   const modal = document.querySelector("#main-modal");
  //   modal.style.display = "block";

  //   const formTitle = document.querySelector("#form-title");
  //   formTitle.value = `${e.dataset.title}`;

  //   const formAmount = document.querySelector("#form-amount");
  //   formAmount.value = `${e.dataset.amount}`;

  //   const formSubmit = document.querySelector("#form-submit");
  //   formSubmit.style.display = "none";

  //   const formEditSubmit = document.querySelector("#form-edit-submit");
  //   formEditSubmit.style.display = "block";
  // }

  // static showModal(e) {
  //   console.log(e);
  //   const formHeader = document.querySelector("#form-header");
  //   formHeader.innerHTML = `${e.dataset.title}`;

  //   const formCategory = document.querySelector("#form-category");
  //   formCategory.value = `${e.id}`;

  //   const modal1 = document.querySelector("#main-modal");
  //   modal1.style.display = "block";

  //   const formSubmit = document.querySelector("#form-submit");
  //   formSubmit.style.display = "block";

  //   const formEditSubmit = document.querySelector("#form-edit-submit");
  //   formEditSubmit.style.display = "none";
  // }

  // static hideModal(e) {
  //   console.log(e.parentElement.parentElement.id);
  //   const modal = document.querySelector("#main-modal");
  //   modal.style.display = "none";
  // }

  static hideCalculatorModal() {
    const form = document.querySelector("#calculator-modal");
    form.style = "display:hidden;";
    const content = document.querySelector("#form-calculator-content");
    content.parentNode.removeChild(content);
  }

  static toggleItemMenu(e) {
    const itemMenu = document.getElementById(`item-menu-${e}`);
    if (itemMenu.classList.length) {
      itemMenu.classList = "";
    } else {
      itemMenu.classList = "hidden";
    }
    return;
  }
}
