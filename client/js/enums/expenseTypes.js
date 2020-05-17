export default class Enums {
  static expenseTypes = {
    1: "Misc Expense",
    2: "Education",
    3: "Shoppping",
    4: "Personal Care",
    5: "Health & Fitness",
    6: "Food & Dining",
    7: "Gifts and Donations",
    8: "Investments",
    9: "Bills & Utilities",
    10: "Auto & Trsnsport",
    11: "Fees & Charges",
    12: "Business Services",
  };

  static getExpenseValue(key) {
    return expenseTypes[key];
  }
}
