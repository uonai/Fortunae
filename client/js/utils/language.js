export default class Language {
  static getTerminology(category, word) {
    let locale = JSON.parse(localStorage.getItem("language"));
    if (locale) {
      return locale[category][word];
    }
  }

  static getCategory(category) {
    let locale = JSON.parse(localStorage.getItem("language"));
    return locale[category];
  }

  // Remove all language specific parts from an amount and replace it with the
  // correct character, so it can be handled like a float later on. This allows
  // to insert strings like "1,99 EUR" or "$ 1,000.90".
  static delocalizeAmount(str) {
    let decimalPoint = Language.getTerminology('time', 'decimal');
    return str
      .replace(decimalPoint, '.') // Convert all language specific decimal points
      .replace(/[^0-9\.-]/g, '');  // Remove all not needed characters like a $ sign.
  }
}

