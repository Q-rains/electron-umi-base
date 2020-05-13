const { ipcMain } = require('electron');

module.exports = function() {
  ipcMain.on('pageMessage', (event, data) => {
    console.log('-----------------------');
    console.log('页面发送了消息：');
    console.log(data);
    console.log('-----------------------');
  });

};
