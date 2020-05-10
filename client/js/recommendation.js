import Store from "./store.js";

export default class Recommendation {
  // Load recommendations

  static displayRecommendations() {
    const salary = 100000;
    const items = Store.getItems();
    this.addSaveRecommendationToList(salary);
    this.addSpendRecommendationToList(salary);
    this.addInvestRecommendationToList(salary);
    console.log(items);
  }

  static addSaveRecommendationToList(salary) {
    const list = document.querySelector("#recommendation-list");

    const listItem = document.createElement("li");
    const save = Math.round((salary / 12) * 0.3);

    listItem.innerHTML = `
        <button class="list-item">Save: $${save} / m</button>
        `;
    list.appendChild(listItem);
  }

  static addSpendRecommendationToList(salary) {
    const list = document.querySelector(`#recommendation-list`);
    const listItem = document.createElement("li");
    const spend = Math.round((salary / 12) * 0.6);

    listItem.innerHTML = `
               <button class="list-item">Spend: $${spend} / m</button>
               `;
    list.appendChild(listItem);
  }

  static addInvestRecommendationToList(salary) {
    const list = document.querySelector(`#recommendation-list`);
    const listItem = document.createElement("li");
    const invest = Math.round((salary / 12) * 0.1);

    listItem.innerHTML = `
            <button class="list-item">Invest: $${invest} / m</button>
            `;
    list.appendChild(listItem);
  }
}
