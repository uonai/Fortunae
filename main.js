const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
const { ipcMain } = require("electron");
const url = require("url");

require("electron-reload")(__dirname, {
  electron: path.join(__dirname, "node_modules", ".bin", "electron"),
});

let mainWindow;
let childWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    resizable: false,
    webPreferences: {
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

  childWindow = new BrowserWindow({
    width: 900,
    height: 600,
    parent: mainWindow,
    modal: false,
    show: true,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
    frame: false,
  });

  childWindow.loadURL(`file://${__dirname}/index-child.html`);

  // open all dev tools
  var windows = BrowserWindow.getAllWindows();
  windows[1].openDevTools();

  // childWindow.once("ready-to-show", () => {
  //   childWindow.show();
  // });
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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
