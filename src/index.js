const {app, BrowserWindow, Menu} = require('electron');
if (require('electron-squirrel-startup')) {
  app.quit();
} // don't start the app multiple times during install
const path = require('path');
const keylogger = require('keylogger.js');

try {
  require('electron-reloader')(module)
} catch (_) {
}

const openAboutWindow = require('about-window').default;

(async () => {
  // prevent error message about hardware acceleration but is this a solution???
  // app.disableHardwareAcceleration();
  // app.commandLine.appendSwitch('force_high_performance_gpu');

  const mainWindow = await init();
  const {createMenu} = await import( './application-menu.mjs');
  const menu = createMenu({
    onGradient: v => mainWindow.webContents.send('gradient-change', v),
    onSize: v => mainWindow.webContents.send('size-change', v),
    onAbout: about
  })
  Menu.setApplicationMenu(menu);
})();

function init(menu) {
  return new Promise(resolve => {
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
        icon: path.join(__dirname, 'icon.png')
      });

      // Menu.setApplicationMenu(createMenu({
      //   onGradient: v => mainWindow.webContents.send('gradient-change', v),
      //   onSize: v => mainWindow.webContents.send('size-change', v),
      // }));

      mainWindow.loadFile(path.join(__dirname, 'index.html')).then();

      // mainWindow.webContents.openDevTools();

      keylogger.start((key, isKeyUp, keyCode) => {
        mainWindow.webContents.send('key-event', {key, isKeyUp, keyCode})
      });

      resolve(mainWindow);
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
  })
}

function about() {
  console.log('erfgrsfdrdgrdsggrsd')
  openAboutWindow({
    icon_path: path.join(__dirname, 'icon.png'),
    package_json_dir: path.join(__dirname, '..'),
    show_close_button: 'Close'
    // open_devtools: process.env.NODE_ENV !== 'production',
  })
}
