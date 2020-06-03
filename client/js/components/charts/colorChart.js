const fs = require("fs");

const SETTINGS = "settings";
const SETTINGSFILE = "/settings.json";
fs.readFile(__dirname + SETTINGSFILE, (err, data) => {
  if (err) throw err;
  let settings = JSON.parse(data);
  localStorage.setItem(SETTINGS, JSON.stringify(settings));
  let global = document.documentElement;
  global.style.setProperty("--foreground-color", settings.foregroundColor);
  global.style.setProperty("--background-color", settings.backgroundColor);
  global.style.setProperty("--alert-color", settings.alertColor);
  global.style.setProperty("--confirmation-color", settings.confirmationColor);
});
