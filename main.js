const electron = require('electron');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
const Menu = require('menu');
const Tray = require('tray');

// Report crashes to our server.
electron.crashReporter.start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// Application icon
var appIcon = __dirname + '/images/discord.png';

// Prepare the system tray
var sysTray = null;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Set screen size
  var height = 750;
  var width = 1200;

  // Get screen size
  var electronScreen = electron.screen;
  var size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create tray menu
  sysTray = new Tray(appIcon);
  var contextMenu = Menu.buildFromTemplate([
    { label: 'Show' },
    { label: 'Quit' }
  ]);
  sysTray.setToolTip('Discord');
  sysTray.setContextMenu(contextMenu);

  // Create the browser window.
  mainWindow = new BrowserWindow({ icon: appIcon, width: width, height: height, x: Math.round(size['width'] / 2 - width / 2), y: Math.round(size['height'] / 2 - height / 2) });

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
