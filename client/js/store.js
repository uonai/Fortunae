import HistoryChart from "./components/charts/historyChart.js";
import Chart from "./components/charts/chart.js";
import PopOut from "./popOut.js";

const ITEMS = "items";
const CURRENTRECORD = "currentRecord";
const DBPATH = "/db/";
const FILEUNAVAILABLE = "This file doesn't exist, can't delete";
const ERROROCCURRED = "An error ocurred updating the file";

const fs = require("fs");
const { getCurrentWindow } = require("electron").remote;
const database = DBPATH;
export default class Store {
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
    fs.readdir(__dirname + database, (err, files) => {
      let filesDirectory = [];
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

      let rawData = fs.readFileSync(__dirname + database + recentFile);
      let items = JSON.parse(rawData);
      if (localStorage.getItem(ITEMS) == null) {
        localStorage.setItem(ITEMS, JSON.stringify(items));
      }
      HistoryChart.loadHistoryChart();
    });
    this.loadCompleteDatabase();
  }

  static loadCompleteDatabase() {
    fs.readdir(__dirname + database, (err, files) => {
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
        let rawData = fs.readFileSync(__dirname + database + file);
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
    });
  }

  static restoreItems(timestamp) {
    let rawData = fs.readFileSync(__dirname + database + timestamp);
    let items = JSON.parse(rawData);
    localStorage.removeItem(ITEMS);
    // this.getItems();
    localStorage.setItem(ITEMS, JSON.stringify(items));
    localStorage.setItem(CURRENTRECORD, timestamp);
    this.loadCompleteDatabase();
    this.loadDatabase();

    // this is an intense way to reload the window, need to find a different solution
    getCurrentWindow().reload();
    PopOut.refreshChildWindows();
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

  static cloneRecord() {
    // generate unix timestamp
    const fileName = Math.round(new Date().getTime() / 1000);
    let items = JSON.parse(localStorage.getItem(ITEMS));
    const json = JSON.stringify(items);
    fs.writeFile(__dirname + DBPATH + fileName, json, "utf8", (err) => {
      if (err) {
        return;
      }
      this.resetData(fileName);
    });
  }

  static saveRecord() {
    const currentRecord = localStorage.getItem(CURRENTRECORD);
    let items = JSON.parse(localStorage.getItem(ITEMS));
    const json = JSON.stringify(items);
    fs.writeFile(__dirname + database + currentRecord, json, (err) => {
      if (err) {
        alert(ERROROCCURRED + err.message);
        return;
      }
      this.resetData(currentRecord);
    });
  }

  static deleteRecord() {
    const currentRecord = localStorage.getItem(CURRENTRECORD);

    if (fs.existsSync(__dirname + database + currentRecord)) {
      fs.unlink(__dirname + database + currentRecord, (err) => {
        if (err) {
          alert(ERROROCCURRED + err.message);
          console.log(err);
          return;
        }
        // alert("The record has been deleted");
        localStorage.clear();
        this.getItems();
        getCurrentWindow().reload();
      });
    } else {
      alert(FILEUNAVAILABLE);
    }
  }
  static resetData(currentRecord) {
    localStorage.clear();
    localStorage.removeItem(ITEMS);
    localStorage.removeItem(CURRENTRECORD);
    localStorage.setItem(CURRENTRECORD, currentRecord);
    this.restoreItems(currentRecord);
  }
}
