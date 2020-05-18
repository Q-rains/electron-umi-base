import React from 'react';
import lodash from 'lodash';
import { Button, Input, Table, Tag, Divider, Modal, Space } from 'antd';
import { getApiTestHttpError, getApiList } from '@/service/testapi';
import { confirmPromise, delay } from '@/utils/util';
import styles from './index.css';
import Link from 'umi/link';

const { Search } = Input;
const { ipcRenderer } = window.electron;

export default class DemoPage1 extends React.PureComponent {
  state = {
    listData: [],
    nowUrl: '',
    modalVisible: false,
    tableLoading: false,
  };

  handleSendMessage = (value) => {

    ipcRenderer.send('pageMessage', value);
    let myNotification = new window.Notification('通知', {
      body: `向main-process发送了：${value} ,请在控制台查看输出`,
    });

    myNotification.onclick = (e) => {
      console.log('通知被点击');
    };

  };

  handleTestHttpErrorClick = async () => {
    const res = await getApiTestHttpError();
    console.log(res);
  };

  handleTestRequestListClick = async () => {
    const res = await getApiList();
    if (!res || !res.data) {
      return;
    }
    this.setState({
      listData: res.data.list,
    });
  };

  handleResetList = () => {
    this.setState({
      listData: [],
    });
  };

  handleModalCancel = () => {
    this.setState({
      modalVisible: false,
    });
  };

  showBigImg(url) {
    this.setState({
      nowUrl: url,
      modalVisible: true,
    });
  }

  handleDelListItem = async (id) => {
    const { listData } = this.state;

    const cfm = await confirmPromise({
      title: `确定删除：${id} 吗？`,
      okType: 'danger',
    });

    if (!cfm) {
      return;
    }

    this.setState({
      tableLoading: true,
    });

    // 一些异步逻辑操作,此处用delay代替
    await delay(5000);

    // 更新state数据;
    const newData = [...listData];
    lodash.remove(newData, (item) => item.id === id);
    this.setState({
      listData: newData,
      tableLoading: false,
    });


  };


  renderList() {
    const { listData, tableLoading } = this.state;
    if (!listData || !listData.length) {
      return null;
    }

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
      },
      {
        title: '城市',
        dataIndex: 'city',
      },
      {
        title: 'value',
        dataIndex: 'value',
        render: val => <Tag color='green'>{val}</Tag>,
      },
      {
        title: 'type',
        dataIndex: 'type',
        render: (val, record) => {
          let color = 'green';
          if (val === 1) {
            color = 'red';
          }
          if (val === 2) {
            color = 'geekblue';
          }

          return <Tag color={color}>{`type:${val}-value:${record.value}`}</Tag>;
        },
      },
      {
        title: '图片',
        dataIndex: 'imgUrl',
        render: val => <img src={val} className={styles.tableImg} alt="" onClick={() => this.showBigImg(val)} />,
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <a onClick={() => this.showBigImg(record.imgUrl)}>查看大图</a>
            <a onClick={() => this.handleDelListItem(record.id)}>Delete</a>
          </Space>
        ),
      },
    ];

    return (
      <Table
        loading={tableLoading}
        rowKey='id'
        columns={columns}
        dataSource={listData}
        size='small'
      />);


  }

  render() {
    const { nowUrl, modalVisible } = this.state;

    return (
      <div className={styles.normal}>
        <h3>这是demo页1</h3>
        <Link to='/page2'>
          <Button>to page2</Button>
        </Link>
        <Divider />
        <div>
          <Search
            placeholder="向main-process发送消息"
            onSearch={this.handleSendMessage}
            style={{ width: 400 }}
          />
        </div>
        <Divider />
        <div>
          <Button onClick={this.handleTestRequestListClick}>axios请求数据</Button>
          <Button onClick={this.handleResetList} style={{ marginLeft: 8 }}>清除数据</Button>
          {this.renderList()}
        </div>
        <Divider />
        <div>
          <Button onClick={this.handleTestHttpErrorClick}>axios请求发生http错误</Button>
        </div>
        <Modal
          width={960}
          visible={modalVisible}
          onCancel={this.handleModalCancel}
          footer={null}
        >
          <img className={styles.bigImg} src={nowUrl} alt="" />
        </Modal>
      </div>

    );
  }


}
