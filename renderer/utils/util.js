import { Modal } from 'antd';

export const delay = function(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
};

export const confirmPromise = function(options) {
  return new Promise(resolve => {
    Modal.confirm({
      ...options,
      onOk() {
        resolve(true);
      },
      onCancel() {
        resolve(false);
      },
    });
  });
};
