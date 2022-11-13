const {app, BrowserWindow, Menu} = require('electron');
if (require('electron-squirrel-startup')) app.quit(); // don't start the app multiple times during install
const path = require('path');
const keylogger = require('keylogger.js');
const {createMenu} = require('./application-menu');

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
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });
    Menu.setApplicationMenu(createMenu({
        onGradient: v => mainWindow.webContents.send('gradient-change', v),
        onSize: v => mainWindow.webContents.send('size-change', v),
    }));


    mainWindow.loadFile(path.join(__dirname, 'index.html')).then();

    // mainWindow.webContents.openDevTools();

    keylogger.start((key, isKeyUp, keyCode) => {
        mainWindow.webContents.send('key-event', {key, isKeyUp, keyCode})
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
