import { Button } from 'antd';
import React from 'react';

const { ipcRenderer } = window.electron;

const status = {
  'checking-for-update': { checking: true, msg: '正在检查更新中......' },
  'update-available': { checkIng: false, msg: '检查到新版本' },
  'update-not-available': { checkIng: false, msg: '已是最新版本，不用更新' },
  'download-progress': { downloadIng: true, msg: '正在下载中' },
  'update-downloaded': { downloadIng: false, downloaded: true, msg: '下载完成' },
  error: {
    checking: false,
    downloadIng: false,
    downloaded: false,
    msg: '检查更新出错',
    process: 0,
  },
};

export default class AppUpdate extends React.PureComponent {

  state = {
    checking: false,
    downloadIng: false,
    downloaded: false,
    msg: '',
    process: 0,
  };

  // todo 测试完资源服务器，完成后续更新逻辑

  componentDidMount() {
    ipcRenderer.on('appUpdater', this.handleCheckUpdateListener);
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('appUpdater', this.handleCheckUpdateListener);
  }

  handleCheckUpdateListener = (event, updateEventName, data) => {

    let mergeState = {};

    if (updateEventName === 'download-progress') {
      mergeState.process = data;
    }

    if (updateEventName === 'error') {
      mergeState.msg = `${status.error.msg} : ${data.toString()}`;
    }


    this.setState({
      ...status[updateEventName],
      ...mergeState,
    });


  };


  handleCheckUpdate = () => {
    ipcRenderer.send('appUpdater', 'check');
    this.setState({
      checking: true,
    });
  };


  render() {
    const { checking, msg } = this.state;

    return (
      <div>
        <Button type="primary" loading={checking}
                onClick={this.handleCheckUpdate}>{checking ? '检查中...' : '检查更新'}</Button>
        <p>{msg}</p>
      </div>);
  }
}
