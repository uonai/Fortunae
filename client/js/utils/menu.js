const remote = require("electron").remote;
document.getElementById("close-window").addEventListener("click", function (e) {
  var window = remote.getCurrentWindow();
  window.close();
});
document.getElementById("minimize-window");

if (document.length) {
  document.addEventListener("click", function (e) {
    var window = remote.getCurrentWindow();
    window.minimize();
  });
}

document.addEventListener("keydown", function (e) {
  if (e.which === 123) {
    require("remote").getCurrentWindow().toggleDevTools();
  } else if (e.which === 116) {
    location.reload();
  }
});
