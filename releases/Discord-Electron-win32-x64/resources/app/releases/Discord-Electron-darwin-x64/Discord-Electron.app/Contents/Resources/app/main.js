const AppName = 'Discord';
const height = 750;
const width = 1200;

const electron = require('electron');
const Tray = require('tray');
const Menu = require('menu');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const AppIcon = __dirname + '/images/app.png';

// Report crashes to our server.
electron.crashReporter.start();

var mainWindow = null;
var sysTray = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

var shouldQuit = app.makeSingleInstance(function(commandLine, workingDirectory) {
  if (mainWindow) {
    showAndCenter(mainWindow);
  }
  return true;
});

if (shouldQuit) {
  app.quit();
  return;
}

app.on('ready', function() {
  sysTray = new Tray(AppIcon);
  var contextMenu = Menu.buildFromTemplate([
    { label: 'Show', click: function() { showAndCenter(mainWindow); } },
    { label: 'Quit', click: function() { app.quit(); } }
  ]);
  sysTray.setToolTip(AppName);
  sysTray.setContextMenu(contextMenu);

  mainWindow = new BrowserWindow({ icon: AppIcon, width: width, height: height });
  center(mainWindow);
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  mainWindow.on('minimize', function() {
    mainWindow.hide();
  });
});

function showAndCenter(win) {
  win.show();
  center(win);
  win.focus();
}

function center(win) {
  var electronScreen = electron.screen;
  var size = electronScreen.getPrimaryDisplay().workAreaSize;
  var x = Math.round(size['width'] / 2 - width / 2);
  var y = Math.round(size['height'] / 2 - height / 2);
  win.setPosition(x, y);
}
