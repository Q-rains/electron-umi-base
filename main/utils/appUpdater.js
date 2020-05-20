const { dialog } = require('electron');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');

const updateURL = 'http://127.0.0.1:8090/demo/update/';

class AppUpdater {
  constructor(mainWindow) {
    this.mainWindow = mainWindow;
    log.transports.file.level = 'debug';

    // 设置是否自动下载，默认是true,当点击检测到新版本时，会自动下载安装包，所以设置为false
    autoUpdater.autoDownload = false;
    autoUpdater.logger = log;
    autoUpdater.setFeedURL(updateURL);

    autoUpdater.on('checking-for-update', () => {
      log.info('Checking for update...');
      mainWindow.webContents.send('appUpdater', 'checking-for-update');
    });

    autoUpdater.on('update-available', (ev, info) => {
      log.info('Update available.');
      mainWindow.webContents.send('appUpdater', 'update-available', info);
      dialog.showMessageBox({
        type: 'info',
        title: '发现新版本',
        message: '发现可下载的更新，现在下载吗？',
        buttons: ['现在下载', '以后下载'],
      }, (buttonIndex) => {
        if (buttonIndex === 0) {
          autoUpdater.downloadUpdate();
        }
      });
    });

    autoUpdater.on('update-not-available', (ev, info) => {
      log.info('Update not available.');
      mainWindow.webContents.send('appUpdater', 'update-not-available', info);
    });

    autoUpdater.on('error', (ev, err) => {
      mainWindow.webContents.send('appUpdater', 'error', err);
    });

    autoUpdater.on('download-progress', (progress) => {
      mainWindow.webContents.send('appUpdater', 'download-progress', progress);
    });

    autoUpdater.on('update-downloaded', (ev, info) => {
      mainWindow.webContents.send('appUpdater', 'update-downloaded', info);
    });

    console.log('check update');
    autoUpdater.checkForUpdatesAndNotify();

  }

  checkForUpdates() {
    return autoUpdater.checkForUpdates();
    // autoUpdater.checkForUpdatesAndNotify();
  };

}

module.exports = AppUpdater;
