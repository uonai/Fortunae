/* global require */
import HistoryChart from "./components/charts/historyChart.js";
import Chart from "./components/charts/chart.js";
import Confirmation from "./confirmation.js";
import PopOut from "./utils/popOut.js";
import UI from "./ui.js";
import Recommendation from "./recommendation.js";
import Language from "./utils/language.js";

const ITEMS = "items";
const CURRENTRECORD = "currentRecord";
const DBPATH = "/db/";
const FILEUNAVAILABLE = "This file doesn't exist, can't delete";
const ERROROCCURRED = "An error ocurred updating the file";

const recordSavedTerminology = Language.getTerminology(
  "general",
  "recordSaved"
);

const recordClonedTerminology = Language.getTerminology(
  "general",
  "recordCloned"
);

const recordSelectedTerminology = Language.getTerminology(
  "general",
  "recordSelected"
);

const recordDeletedTerminology = Language.getTerminology(
  "general",
  "recordDeleted"
);

const fs = require("fs");
const { getCurrentWindow } = require("electron").remote;

export default class Store {
  static getSettings() {
    fs.readFile(__dirname + "/settings.json", (err, data) => {
      if (err) throw err;
      let settings = JSON.parse(data);
      localStorage.setItem("settings", JSON.stringify(settings));
      let global = document.documentElement;
      global.style.setProperty(
        "--foreground-color",
        settings.colors.foregroundColor
      );
      global.style.setProperty(
        "--background-color",
        settings.colors.backgroundColor
      );
      global.style.setProperty("--alert-color", settings.colors.alertColor);
      global.style.setProperty(
        "--confirmation-color",
        settings.colors.confirmationColor
      );

      this.getLanguage(settings.language);
    });
  }

  static getLanguage(language) {
    let file = language;

    fs.readdir(__dirname + "/language/", (err, languages) => {
      let languageDirectory = [];
      languages.forEach((language) => {
        languageDirectory.push(language);
      });

      localStorage.setItem("languages", JSON.stringify(languageDirectory));
    });

    fs.readFile(__dirname + "/language/" + file + ".json", (err, data) => {
      if (err) throw err;
      let language = JSON.parse(data);
      localStorage.setItem("language", JSON.stringify(language));
      this.buildApp();
    });
  }

  static buildApp() {
    Store.createRecordEmptyDatabase();
    Store.loadDatabase();
    Store.loadCompleteDatabase();
    PopOut.refreshChildWindows();
    Recommendation.displayRecommendations();
    Confirmation.showConfirmation();
    UI.buildUI();
    UI.displayItems();
  }

  static getItems() {
    let items;
    if (localStorage.getItem(ITEMS) === null) {
      this.loadDatabase();
      items = [];
    } else {
      items = JSON.parse(localStorage.getItem(ITEMS));
      this.loadDatabase();
    }

    return items;
  }

  static loadDatabase() {
    fs.readdir(__dirname + DBPATH, (err, files) => {
      let filesDirectory = [];
      if (filesDirectory.length == 0) {
        this.createRecordEmptyDatabase();
      }
      files.forEach((file) => {
        filesDirectory.push(file);
      });

      filesDirectory.sort(function (a, b) {
        return new Date(Date.now(b)) - new Date(Date.now(a));
      });
      // get most recent file
      const currentItem = localStorage.getItem(CURRENTRECORD);
      HistoryChart.setTimestamp(currentItem);

      localStorage.setItem("history", JSON.stringify(filesDirectory));
      const recentFile = filesDirectory.pop();
      if (localStorage.getItem(CURRENTRECORD) === null) {
        localStorage.setItem(CURRENTRECORD, recentFile);
        HistoryChart.setTimestamp(recentFile);
      }

      let rawData = fs.readFileSync(__dirname + DBPATH + recentFile);
      let items = JSON.parse(rawData);
      if (localStorage.getItem(ITEMS) == null) {
        localStorage.setItem(ITEMS, JSON.stringify(items));
      }
    });
  }

  static loadCompleteDatabase() {
    fs.readdir(__dirname + DBPATH, (err, files) => {
      let filesDirectory = [];
      files.forEach((file) => {
        filesDirectory.push(Number(file));
      });

      filesDirectory.sort(function (a, b) {
        return new Date(Date.now(b)) - new Date(Date.now(a));
      });

      const currentItem = localStorage.getItem(CURRENTRECORD);
      let filteredDirectory = [];
      filesDirectory.forEach((file) => {
        if (Number(file) <= Number(currentItem)) {
          filteredDirectory.push(file);
        }
      });

      let category1 = [];
      let category2 = [];
      let category3 = [];
      let category4 = [];
      filteredDirectory.forEach((file) => {
        let rawData = fs.readFileSync(__dirname + DBPATH + file);
        const items = JSON.parse(rawData);

        items.forEach((item) => {
          if (item.category == 1) {
            category1.push({
              item: item,
              date: file,
            });
          } else if (item.category == 2) {
            category2.push({ item: item, date: file });
          } else if (item.category == 3) {
            category3.push({ item: item, date: file });
          } else if (item.category == 4) {
            category4.push({ item: item, date: file });
          }
          return;
        });
      });
      localStorage.setItem(
        "category1ItemsHistorical",
        JSON.stringify(category1)
      );
      localStorage.setItem(
        "category2ItemsHistorical",
        JSON.stringify(category2)
      );
      localStorage.setItem(
        "category3ItemsHistorical",
        JSON.stringify(category3)
      );
      localStorage.setItem(
        "category4ItemsHistorical",
        JSON.stringify(category4)
      );
      Chart.loadChart();
      HistoryChart.loadHistoryChart();
    });
  }
  static addItem(item) {
    const items = Store.getItems();
    items.push(item);
    localStorage.setItem(ITEMS, JSON.stringify(items));
  }

  static editItem(item) {
    const items = Store.getItems();
    const foundIndex = items.findIndex((x) => x.id == item.id);
    items[foundIndex] = item;
    localStorage.setItem(ITEMS, JSON.stringify(items));
  }

  static removeItem(id) {
    const items = Store.getItems();
    items.forEach((item, index) => {
      if (item.id === id) {
        items.splice(index, 1);
      }
    });
    localStorage.setItem(ITEMS, JSON.stringify(items));
  }

  static createRecordEmptyDatabase() {
    const fileName = Math.round(new Date().getTime() / 1000);
    const json = JSON.stringify([]);
    fs.readdir(__dirname + DBPATH, (err, files) => {
      let filesDirectory = [];
      files.forEach((file) => {
        filesDirectory.push(Number(file));
      });
      if (filesDirectory.length == 0) {
        fs.writeFile(__dirname + DBPATH + fileName, json, (err) => {
          if (err) {
            alert(ERROROCCURRED + err.message);
            return;
          }
          this.resetData(fileName);
        });
      }
    });
  }

  static cloneRecord() {
    // generate unix timestamp
    const fileName = Math.round(new Date().getTime() / 1000);
    let items = JSON.parse(localStorage.getItem(ITEMS));
    const json = JSON.stringify(items);
    fs.writeFile(__dirname + DBPATH + fileName, json, "utf8", (err) => {
      if (err) {
        return;
      }
      this.resetData(fileName, "clone");
    });
  }

  static saveRecord() {
    const currentRecord = localStorage.getItem(CURRENTRECORD);
    let items = JSON.parse(localStorage.getItem(ITEMS));
    const json = JSON.stringify(items);
    fs.writeFile(__dirname + DBPATH + currentRecord, json, (err) => {
      if (err) {
        alert(ERROROCCURRED + err.message);
        return;
      }
      this.resetData(currentRecord, "save");
    });
  }

  static deleteRecord() {
    const currentRecord = localStorage.getItem(CURRENTRECORD);

    if (fs.existsSync(__dirname + DBPATH + currentRecord)) {
      fs.unlink(__dirname + DBPATH + currentRecord, (err) => {
        if (err) {
          alert(ERROROCCURRED + err.message);
          console.log(err);
          return;
        }
        // alert("The record has been deleted");
        localStorage.clear();
        this.getItems();
        Confirmation.writeConfirmation(recordDeletedTerminology);
        getCurrentWindow().reload();
        // getCurrentWindow().removeAllListeners();
        this.loadDatabase();
      });
    } else {
      alert(FILEUNAVAILABLE);
    }
  }
  static resetData(currentRecord, type) {
    localStorage.clear();
    localStorage.removeItem(ITEMS);
    localStorage.removeItem(CURRENTRECORD);
    localStorage.setItem(CURRENTRECORD, currentRecord);
    this.restoreItems(currentRecord, type);
  }

  static restoreItems(timestamp, type) {
    console.log(type);
    let rawData = fs.readFileSync(__dirname + DBPATH + timestamp);
    let items = JSON.parse(rawData);
    localStorage.removeItem(ITEMS);
    // this.getItems();
    localStorage.setItem(ITEMS, JSON.stringify(items));
    localStorage.setItem(CURRENTRECORD, timestamp);
    this.loadCompleteDatabase();
    this.loadDatabase();

    // this is an intense way to reload the window, need to find a different solution
    if (type === "save") {
      Confirmation.writeConfirmation(recordSavedTerminology);
    } else if (type === "clone") {
      Confirmation.writeConfirmation(recordClonedTerminology);
    } else if (type === "history") {
      Confirmation.writeConfirmation(recordSelectedTerminology);
    }
    getCurrentWindow().reload();
  }
}
