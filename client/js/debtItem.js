export default class DebtItem {
  constructor(
    id,
    category,
    title,
    amount,
    type,
    monthlyPayment,
    remainingMonths
  ) {
    this.id = id;
    this.category = category;
    this.title = title;
    this.amount = amount;
    this.type = type;
    this.monthlyPayment = monthlyPayment;
    this.remainingMonths = remainingMonths;
  }
}
