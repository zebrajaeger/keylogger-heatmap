const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const keylogger = require('keylogger.js');

try {
  require('electron-reloader')(module)
} catch (_) {
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1100,
    height: 401,
    // width: 1600,
    // height: 1000,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  mainWindow.loadFile(path.join(__dirname, 'index.html')).then();

  // mainWindow.webContents.openDevTools();

  keylogger.start((key, isKeyUp, keyCode) => {
    mainWindow.webContents.send('update-counter', {key, isKeyUp, keyCode})
  });
}

app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
