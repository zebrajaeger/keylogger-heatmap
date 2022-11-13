# keylogger-heatmap

This project is just for fun. I don't see any usefully scenario - except to learn a little.  
Works on Windows and should work on macOS, but I can run it only on top of Windows.
Linux ist not supported yet, because [keylogger.js-0.0.4](https://www.npmjs.com/package/keylogger.js) does not support this OS.

## Develop

### Prerequisites

- node-gyp
- windows-build-tools (for Windows only)

These libs are the tools to compile native code (what we need, because we have to hook into the OS to receive global key events). 
Run this command from a Windows powershell with administrator rights:

    npm install --global node-gyp windows-build-tools

Now you can install the required packages of this project:

    npm install

### Run the application

    npm start

## Build a Release

    npm run make

This is only for the current platform.
