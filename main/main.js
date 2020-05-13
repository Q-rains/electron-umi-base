const path = require('path');
const url = require('url');
const fs = require('fs');
const { app, BrowserWindow } = require('electron');

const setApplicationMenu = require('./utils/menu');
const installDevtoolExt = require('./utils/installDevtoolExt');
const setIpc = require('./ipc/index');
const { NODE_ENV } = process.env;

let mainWindow = null;

const preloadPath = path.join(__dirname, '../dist/renderer/window_node_api.js');
const MAIN_WINDOW_CONFIG = {
  height: 720,
  width: 1280,
  webPreferences: {
    nodeIntegration: true,
    preload: fs.existsSync(preloadPath) ? preloadPath : null,
  },
};

function createWindow() {
  mainWindow = new BrowserWindow(MAIN_WINDOW_CONFIG);
  setApplicationMenu();

  if (NODE_ENV === 'development') {
    console.log('development');
    // 安装调试工具拓展
    installDevtoolExt();

    mainWindow.loadURL('http://localhost:8000/#/');
    mainWindow.webContents.openDevTools();
  } else {
    // mainWindow.webContents.openDevTools();
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, '../dist/renderer/index.html'),
        protocol: 'file:',
        slashes: true,
      }),
    );

  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', () => {
  createWindow();
  setIpc();

});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
