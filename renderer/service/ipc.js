import Router from 'umi/router';

const { ipcRenderer } = window.electron;

export const listenIpcOpenPage = function() {
  ipcRenderer.on('openPage', (event, msg) => {
    if (msg === 'doc') {
      Router.push('/docs');
    }
  });
};
