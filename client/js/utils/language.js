export default class Language {
  static getTerminology(category, word) {
    let locale = JSON.parse(localStorage.getItem("language"));
    return locale[category][word];
  }

  static getCategory(category) {
    let locale = JSON.parse(localStorage.getItem("language"));
    return locale[category];
  }
}
