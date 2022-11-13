const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    onKeyEvent: (callback) => ipcRenderer.on('key-event', callback),
    onGradientChange: (callback) => ipcRenderer.on('gradient-change', callback),
    onSizeChange: (callback) => ipcRenderer.on('size-change', callback)
})
