const { app, BrowserWindow } = require("electron");
const path = require("path");
const { ipcMain } = require("electron");
const url = require("url");
const ipc = require("ipc");
require("v8-compile-cache");

require("electron-reload")(__dirname, {
  electron: path.join(__dirname, "node_modules", ".bin", "electron"),
});

let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 680,
    backgroundColor: "#000",
    resizable: false,
    webPreferences: {
      devTools: false,
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
    frame: false,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file",
      slashes: true,
    })
  );

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  mainWindow.setMenuBarVisibility(false);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

ipcMain.on("request-mainprocess-action", (event, arg) => {
  console.log(arg);
});

// catch item refresh

function createFundChart() {
  fundChart = new BrowserWindow({
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

  fundChart.loadURL(
    url.format({
      pathname: path.join(__dirname, "fund.html"),
      protocol: "file",
      slashes: true,
    })
  );

  fundChart.on("closed", () => {
    fundChart = null;
  });
}

// BURNDOWN CHART
function createBurndownChart() {
  burndownChart = new BrowserWindow({
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

  burndownChart.loadURL(
    url.format({
      pathname: path.join(__dirname, "burndown.html"),
      protocol: "file",
      slashes: true,
    })
  );

  burndownChart.on("closed", () => {
    burndownChart = null;
  });
}

function createSpiderChart() {
  spiderChart = new BrowserWindow({
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

  spiderChart.loadURL(
    url.format({
      pathname: path.join(__dirname, "spider.html"),
      protocol: "file",
      slashes: true,
    })
  );

  spiderChart.on("closed", () => {
    spiderChart = null;
  });
}

function createSankeyChart() {
  sankeyChart = new BrowserWindow({
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

  sankeyChart.loadURL(
    url.format({
      pathname: path.join(__dirname, "sankey.html"),
      protocol: "file",
      slashes: true,
    })
  );

  sankeyChart.on("closed", () => {
    sankeyChart = null;
  });
}

function createTome() {
  tome = new BrowserWindow({
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

  tome.loadURL(
    url.format({
      pathname: path.join(__dirname, "tome.html"),
      protocol: "file",
      slashes: true,
    })
  );

  tome.on("closed", () => {
    tome = null;
  });
}

ipcMain.on("fund:open", function () {
  createFundChart();
});

ipcMain.on("burndown:open", function () {
  createBurndownChart();
});

ipcMain.on("spider:open", function () {
  createSpiderChart();
});

ipcMain.on("sankey:open", function () {
  createSankeyChart();
});

ipcMain.on("tome:open", function () {
  createTome();
});

ipcMain.on("window:refresh", function () {
  if (typeof fundChart !== "undefined") {
    if (fundChart !== null) {
      fundChart.reload();
    }
  }

  if (typeof spiderChart !== "undefined") {
    if (spiderChart !== null) {
      spiderChart.reload();
    }
  }

  if (typeof burndownChart !== "undefined") {
    if (burndownChart !== null) {
      burndownChart.reload();
    }
  }

  if (typeof sankeyChart !== "undefined") {
    if (sankeyChart !== null) {
      sankeyChart.reload();
    }
  }
  if (typeof tome !== "undefined") {
    if (tome !== null) {
      tome.reload();
    }
  }
  return;
  // reloads window
  // addWindow.reload();
  //closes window
  //addWindow.close();
});

ipcMain.on("window:close", function () {
  if (typeof fundChart !== "undefined") {
    fundChart = null;
  }

  if (typeof spiderChart !== "undefined") {
    spiderChart = null;
  }

  if (burndownChart !== "undefined") {
    console.log("close burndown");
    burndownChart = null;
  }

  if (typeof sankeyChart !== "undefined") {
    sankeyChart = null;
  }

  if (typeof tome !== "undefined") {
    tome = null;
  }
  // reloads window
  // addWindow.reload();
  //closes window
  //addWindow.close();
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
