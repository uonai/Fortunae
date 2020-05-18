import HistoryChart from "./historyChart.js";

const fs = require("fs");
const { getCurrentWindow } = require("electron").remote;
const database = "/db/";
export default class Store {
  static getItems() {
    let items;
    if (localStorage.getItem("items") === null) {
      this.loadDatabase();
      items = [];
    } else {
      items = JSON.parse(localStorage.getItem("items"));
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
      const currentItem = localStorage.getItem("currentRecord");
      HistoryChart.setTimestamp(currentItem);

      localStorage.setItem("history", JSON.stringify(filesDirectory));
      const recentFile = filesDirectory[0];
      if (localStorage.getItem("currentRecord") === null) {
        localStorage.setItem("currentRecord", recentFile);
      }

      let rawData = fs.readFileSync(__dirname + database + recentFile);
      let items = JSON.parse(rawData);
      if (localStorage.getItem("items") === null) {
        localStorage.setItem("items", JSON.stringify(items));
      }
      HistoryChart.loadHistoryChart();
    });
  }

  static loadCompleteDatabase() {
    fs.readdir(__dirname + database, (err, files) => {
      let filesDirectory = [];
      files.forEach((file) => {
        filesDirectory.push(file);
      });

      filesDirectory.sort(function (a, b) {
        return new Date(Date.now(b)) - new Date(Date.now(a));
      });

      let category1 = [];
      let category2 = [];
      let category3 = [];
      let category4 = [];
      filesDirectory.forEach((file) => {
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
    localStorage.removeItem("items");
    // this.getItems();
    localStorage.setItem("items", JSON.stringify(items));
    localStorage.setItem("currentRecord", timestamp);
    this.loadCompleteDatabase();
    this.loadDatabase();

    // this is an intense way to reload the window, need to find a different solution
    getCurrentWindow().reload();
  }

  static addItem(item) {
    const items = Store.getItems();
    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));
  }

  static editItem(item) {
    const items = Store.getItems();
    const foundIndex = items.findIndex((x) => x.id == item.id);
    items[foundIndex] = item;
    localStorage.setItem("items", JSON.stringify(items));
  }

  static removeItem(id) {
    const items = Store.getItems();
    items.forEach((item, index) => {
      if (item.id === id) {
        items.splice(index, 1);
      }
    });
    localStorage.setItem("items", JSON.stringify(items));
  }

  static cloneRecord() {
    // generate unix timestamp
    const fileName = Math.round(new Date().getTime() / 1000);
    let items = JSON.parse(localStorage.getItem("items"));
    const json = JSON.stringify(items);
    fs.writeFile(__dirname + "/db/" + fileName, json, "utf8", (err) => {
      if (err) {
        return;
      }
      this.resetData(fileName);
    });
  }

  static saveRecord() {
    const currentRecord = localStorage.getItem("currentRecord");
    let items = JSON.parse(localStorage.getItem("items"));
    const json = JSON.stringify(items);
    fs.writeFile(__dirname + database + currentRecord, json, (err) => {
      if (err) {
        alert("An error ocurred updating the file" + err.message);
        return;
      }
      this.resetData(currentRecord);
    });
  }

  static deleteRecord() {
    const currentRecord = localStorage.getItem("currentRecord");

    if (fs.existsSync(__dirname + database + currentRecord)) {
      fs.unlink(__dirname + database + currentRecord, (err) => {
        if (err) {
          alert("An error ocurred updating the file" + err.message);
          console.log(err);
          return;
        }
        alert("The record has been deleted");
        localStorage.clear();
        this.loadDatabase();
        this.loadCompleteDatabase();
        getCurrentWindow().reload();
      });
    } else {
      alert("This file doesn't exist, can't delete");
    }
  }
  static resetData(currentRecord) {
    localStorage.clear();
    localStorage.removeItem("items");
    localStorage.removeItem("currentRecord");
    localStorage.setItem("currentRecord", currentRecord);
    this.restoreItems(currentRecord);
  }
}
