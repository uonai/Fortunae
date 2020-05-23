export default class Recommendation {
  static displayRecommendations() {
    const data = JSON.parse(localStorage.getItem("items"));
    let incomeItems = [];
    data.forEach((item) => {
      if (item.category == "4") {
        incomeItems.push(Number(item.amount));
      }
    });

    const income = incomeItems.reduce((a, b) => a + b, 0);
    if (income) {
      this.addSaveRecommendationToList(income);
      this.addSpendRecommendationToList(income);
      this.addInvestRecommendationToList(income);
    }
  }

  static addSaveRecommendationToList(salary) {
    const list = document.querySelector("#recommendation-list");

    const listItem = document.createElement("li");
    const save = Math.round(salary * 0.3);

    listItem.innerHTML = `
        <button class="list-item">Save: $${save} / m</button>
        `;
    list.appendChild(listItem);
  }

  static addSpendRecommendationToList(salary) {
    const list = document.querySelector(`#recommendation-list`);
    const listItem = document.createElement("li");
    const spend = Math.round(salary * 0.6);

    listItem.innerHTML = `
               <button class="list-item">Spend: $${spend} / m</button>
               `;
    list.appendChild(listItem);
  }

  static addInvestRecommendationToList(salary) {
    const list = document.querySelector(`#recommendation-list`);
    const listItem = document.createElement("li");
    const invest = Math.round(salary * 0.1);

    listItem.innerHTML = `
            <button class="list-item">Invest: $${invest} / m</button>
            `;
    list.appendChild(listItem);
  }
}
