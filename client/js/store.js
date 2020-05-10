import Helper from "./helper.js";

export default class Store {
  static getItems() {
    let items;
    if (localStorage.getItem("items") === null) {
      items = [];
    } else {
      items = JSON.parse(localStorage.getItem("items"));
    }
    return items;
  }

  static addItem(item) {
    const items = Store.getItems();
    items.push(item);
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
    const fs = require("fs");

    // save main
    const fileName = Helper.generateUUIDv4();
    const items = JSON.stringify(localStorage.getItem("items"));
    fs.writeFile(__dirname + "/db/" + fileName, items, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      alert("file saved");
    });

    this.saveHistory(fileName);
  }

  static saveHistory(guid) {
    const fs = require("fs");
    // history
    const fileName = "filehistory";
    const content = guid.toString();
    console.log(content);
    fs.writeFile(__dirname + "/db/history/" + fileName, content, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      alert("file saved");
    });
  }
}
