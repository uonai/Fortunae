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
        // this sort isn't working as expected
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
