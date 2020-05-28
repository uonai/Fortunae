const electron = require("electron");
const { ipcRenderer } = electron;

export default class PopOut {
  static openFund() {
    ipcRenderer.send("fund:open");
  }

  static openSankey() {
    ipcRenderer.send("sankey:open");
  }

  static openSpider() {
    ipcRenderer.send("spider:open");
  }

  static openBurndown() {
    ipcRenderer.send("burndown:open");
  }

  static openTome() {
    ipcRenderer.send("tome:open");
  }

  static openChildWindow() {
    ipcRenderer.send("window:open");
  }

  static refreshChildWindows() {
    ipcRenderer.send("window:refresh");
  }

  static closeChildWindows() {
    ipcRenderer.send("window:close");
  }
}
