const path = require('path');
const url = require('url');
const fs = require('fs');
const { app, BrowserWindow } = require('electron');
const GLOBAL_CONFIG = require('./config/config.global');
const setApplicationMenu = require('./utils/menu');
const { isDevEnv } = require('./utils/util');
const AppUpdater = require('./utils/appUpdater');
const AppAutoUpdater = require('./utils/appAutoUpdater');
const setIpc = require('./ipc/index');

/* global 配置 */
global.GLOBAL_CONFIG = GLOBAL_CONFIG;

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

  if (isDevEnv()) {
    console.log('development');
    const installDevtoolExt = require('./utils/installDevtoolExt');
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
  setApplicationMenu(mainWindow);
  // 更新逻辑，两个方案选一
  // 1.基于electron-updater 和静态文件服务
  // const appUpdater = new AppUpdater(mainWindow);

  // 2.基于自带的 autoUpdate 和包版本管理服务
  const appUpdater = new AppAutoUpdater(mainWindow);

  setIpc(mainWindow, appUpdater);
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
