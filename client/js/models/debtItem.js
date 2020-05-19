export default class DebtItem {
  constructor(id, category, title, amount, type, remainingmonths) {
    this.id = id;
    this.category = category;
    this.title = title;
    this.amount = amount;
    this.type = type;
    this.remainingmonths = remainingmonths;
  }
}
