import React from 'react';
import styles from './index.css';
import { Card, Button, Input, Divider } from 'antd';
import Link from 'umi/link';

const { Search } = Input;
const { ipcRenderer, shell } = window.electron;
const path = window.path;

export default class DemoPage1 extends React.PureComponent {

  handleSendMessage = (value) => {

    ipcRenderer.send('pageMessage', value);
    let myNotification = new window.Notification('通知', {
      body: `向main-process发送了：${value} ,请在控制台查看输出`,
    });

    myNotification.onclick = (e) => {
      console.log('通知被点击');
    };

  };


  render() {
    console.log(ipcRenderer);
    console.log(path);
    return (
      <div className={styles.normal}>
        <h3>这是demo页1</h3>
        <Link to='/page2'>
          <Button>to page2</Button>
        </Link>
        <div style={{ marginTop: 12 }}>
          <Search
            placeholder="向main-process发送消息"
            onSearch={this.handleSendMessage}
            style={{ width: 400 }}
          />
        </div>
      </div>

    );
  }


}
