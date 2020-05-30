import Language from "./utils/language.js";

const saveTerminology = Language.getTerminology("recommendation", "save");
const spendTerminology = Language.getTerminology("recommendation", "spend");
const investTerminology = Language.getTerminology("recommendation", "invest");
const emergencyFundTerminology = Language.getTerminology(
  "recommendation",
  "emergencyFund"
);
const needSourceOfIncomeTerminology = Language.getTerminology(
  "recommendation",
  "needSourceOfIncome"
);
const noDataAvailableTerminology = Language.getTerminology(
  "general",
  "noDataAvailable"
);

export default class Recommendation {
  static displayRecommendations() {
    const data = JSON.parse(localStorage.getItem("items"));
    let incomeItems = [];
    let fundItems = [];
    if (data) {
      if (data.length) {
        console.log("data available");
        data.forEach((item) => {
          if (item.category == "4") {
            incomeItems.push(Number(item.amount));
          }
          if (item.category == "1" && item.type == "emergency") {
            fundItems.push(Number(item.amount));
          }
          if (item.category == "1" && item.type == "saving") {
            fundItems.push(Number(item.amount));
          }
        });

        const income = incomeItems.reduce((a, b) => a + b, 0);
        const emergencyFund = fundItems.reduce((a, b) => a + b, 0);
        console.log(emergencyFund);
        if (income && emergencyFund >= income * 3) {
          this.addSaveRecommendationToList(income);
          this.addSpendRecommendationToList(income);
          this.addInvestRecommendationToList(income);
        } else if (income) {
          // this.addSaveRecommendationToList(income);
          this.addSpendRecommendationToList(income);
          this.addEmergencyFundRecommendationToList(income);
          // this.addInvestRecommendationToList(income);
        } else {
          const list = document.querySelector("#recommendation-list");

          const listItem = document.createElement("li");

          listItem.innerHTML = `
            <button class="list-item">${needSourceOfIncomeTerminology}</button>
            `;
          list.appendChild(listItem);
        }
        return;
      } else {
        const list = document.querySelector("#recommendation-list");

        const listItem = document.createElement("li");

        listItem.innerHTML = `
          <button class="list-item">${noDataAvailableTerminology}</button>
          `;
        list.appendChild(listItem);
      }
    }
  }

  static addSaveRecommendationToList(salary) {
    const list = document.querySelector("#recommendation-list");

    const listItem = document.createElement("li");
    const save = Math.round(salary * 0.3);

    listItem.innerHTML = `
        <button class="list-item">${saveTerminology}: ${save}</button>
        `;
    list.appendChild(listItem);
  }

  static addSpendRecommendationToList(salary) {
    const list = document.querySelector(`#recommendation-list`);
    const listItem = document.createElement("li");
    const spend = Math.round(salary * 0.6);

    listItem.innerHTML = `
               <button class="list-item">${spendTerminology}: ${spend}</button>
               `;
    list.appendChild(listItem);
  }

  static addInvestRecommendationToList(salary) {
    const list = document.querySelector(`#recommendation-list`);
    const listItem = document.createElement("li");
    const invest = Math.round(salary * 0.1);

    listItem.innerHTML = `
            <button class="list-item">${investTerminology}: ${invest}</button>
            `;
    list.appendChild(listItem);
  }

  static addEmergencyFundRecommendationToList(salary) {
    const list = document.querySelector(`#recommendation-list`);
    const listItem = document.createElement("li");
    const emergencyFund = Math.round(salary * 0.4);

    listItem.innerHTML = `
            <button class="list-item">${emergencyFundTerminology}: ${emergencyFund}</button>
            `;
    list.appendChild(listItem);
  }
}
