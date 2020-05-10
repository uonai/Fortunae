const fs = require("fs");

export default class Store {
  static getItems() {
    let items;
    if (localStorage.getItem("items") === null) {
      const database = "/db/";

      fs.readdir(__dirname + database, (err, files) => {
        let filesDirectory = [];
        files.forEach((file) => {
          filesDirectory.push(file);
          console.log(filesDirectory);
        });

        filesDirectory.sort(function (a, b) {
          // this sort isn't working as expected
          return new Date(Date.now(b)) - new Date(Date.now(a));
        });
        const recentFile = filesDirectory[0];
        let rawData = fs.readFileSync(__dirname + database + recentFile);
        let items = JSON.parse(rawData);
        localStorage.setItem("items", JSON.stringify(items));
      });

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
    const fileName = Date.now();
    let items = JSON.parse(localStorage.getItem("items"));
    const json = JSON.stringify(items);
    fs.writeFile(__dirname + "/db/" + fileName, json, "utf8", (err) => {
      if (err) {
        console.log(err);
        return;
      }
      alert("file saved");
    });

    // this.saveHistory(fileName);
  }
}
