export default class PopOut {
  static openChild() {
    const { remote } = require("electron");
    const path = require("path");

    let win = new remote.BrowserWindow({
      parent: remote.getCurrentWindow(),
      width: 900,
      height: 600,
      // modal: true,
      resizable: true,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        nodeIntegration: true,
      },
      frame: false,
    });

    const theUrl = "file://" + __dirname + "/index-child.html";

    win.loadURL(theUrl);
  }

  static openSankey() {
    const { remote } = require("electron");
    const path = require("path");

    let win = new remote.BrowserWindow({
      parent: remote.getCurrentWindow(),
      width: 500,
      height: 550,
      // modal: true,
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

  static openRadar() {
    const { remote } = require("electron");
    const path = require("path");

    let win = new remote.BrowserWindow({
      parent: remote.getCurrentWindow(),
      width: 500,
      height: 550,
      modal: false,
      resizable: false,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        nodeIntegration: true,
      },
      frame: false,
    });

    const theUrl = "file://" + __dirname + "/radar.html";

    win.loadURL(theUrl);
  }
}
