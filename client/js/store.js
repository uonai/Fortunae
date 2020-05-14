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

      localStorage.setItem("history", JSON.stringify(filesDirectory));
      const recentFile = filesDirectory[0];
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

    // this is an intense way to reload the window, need to find a different solution
    getCurrentWindow().reload();
  }

  static addItem(item) {
    const items = Store.getItems();
    console.log(items);
    items.push(item);
    console.log(items);
    localStorage.setItem("items", JSON.stringify(items));
  }

  static editItem(item) {
    const items = Store.getItems();
    console.log(items);
    const foundIndex = items.findIndex((x) => x.id == item.id);
    items[foundIndex] = item;
    console.log(items);
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

  static saveJSON() {
    // generate unix timestamp
    let fileName = Math.round(new Date().getTime() / 1000);
    console.log(fileName);
    let items = JSON.parse(localStorage.getItem("items"));
    const json = JSON.stringify(items);
    fs.writeFile(__dirname + "/db/" + fileName, json, "utf8", (err) => {
      if (err) {
        return;
      }
      getCurrentWindow().reload();
    });

    // this.saveHistory(fileName);
    // this.getCurrentWindow().reload();
  }
}
