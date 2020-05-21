export default class PopOut {
  static openFund() {
    const { remote } = require("electron");
    const path = require("path");

    let win = new remote.BrowserWindow({
      parent: remote.getCurrentWindow(),
      backgroundColor: "#000",
      width: 500,
      height: 520,
      resizable: true,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        nodeIntegration: true,
      },
      frame: false,
    });

    const theUrl = "file://" + __dirname + "/fund.html";

    win.loadURL(theUrl);
  }

  static openSankey() {
    const { remote } = require("electron");
    const path = require("path");

    let win = new remote.BrowserWindow({
      parent: remote.getCurrentWindow(),
      width: 500,
      height: 520,
      backgroundColor: "#000",
      resizable: true,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        nodeIntegration: true,
      },
      frame: false,
    });

    const theUrl = "file://" + __dirname + "/sankey.html";

    win.loadURL(theUrl);
  }

  static openSpider() {
    const { remote } = require("electron");
    const path = require("path");

    let win = new remote.BrowserWindow({
      parent: remote.getCurrentWindow(),
      width: 500,
      height: 520,
      backgroundColor: "#000",
      resizable: false,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        nodeIntegration: true,
      },
      frame: false,
    });

    const theUrl = "file://" + __dirname + "/spider.html";

    win.loadURL(theUrl);
  }

  static openBurndown() {
    const { remote } = require("electron");
    const path = require("path");

    let win = new remote.BrowserWindow({
      parent: remote.getCurrentWindow(),
      width: 500,
      height: 520,
      backgroundColor: "#000",
      resizable: false,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        nodeIntegration: true,
      },
      if(win) {
        const pos = win.getPosition();
        Object.assign(opts, {
          x: pos[0] + 10,
          y: pos[1] + 10,
        });
      },
      frame: false,
    });

    const theUrl = "file://" + __dirname + "/burndown.html";

    win.loadURL(theUrl);
  }

  static reloadChildWindows() {
    console.log(
      "this is where we need to pass parent -> child window refresh1"
    );
  }
}
