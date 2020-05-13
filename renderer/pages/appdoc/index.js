import React from 'react';
import Router from 'umi/router';
import { Menu, Layout, Card } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import MarkdownFileShow from './MarkdownFileShow';

import styles from './index.less';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const { remote } = window.electron;
const APP_DOC_TREE = remote.getGlobal('APP_DOC_TREE');


export default class AppDocs extends React.PureComponent {

  state = {
    activeFilePath: '',
    activeFileName: '',
  };

  handleMenuClick = e => {
    const { location } = this.props;
    if (e.key === '/') {
      Router.push(e.key);
    } else {
      this.setState({
        activeFilePath: e.key,
        activeFileName: e.item.props.name,
      });
    }
  };

  generateMenuItem(menuItems) {
    if (!menuItems || !Array.isArray(menuItems)) {
      return null;
    }

    return menuItems.map(item => {
      const { path, name, children, type } = item;
      if (type === 'directory') {
        return (
          <SubMenu key={path} icon={<UserOutlined />} title={name}>
            {this.generateMenuItem(children)}
          </SubMenu>
        );
      }

      if (type === 'file') {
        return (
          <Menu.Item key={path} name={name}>{name}</Menu.Item>
        );
      }

    });

  }

  renderSliderMenu() {
    if (APP_DOC_TREE && Array.isArray(APP_DOC_TREE.children)) {
      const { path, name, children, type } = APP_DOC_TREE;

      return (
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ minHeight: '100%' }}
          onClick={this.handleMenuClick}
        >
          <Menu.Item key='/'>返回应用</Menu.Item>
          {this.generateMenuItem(children)}
        </Menu>
      );
    }
  }

  render() {
    const { activeFilePath, activeFileName } = this.state;

    return (
      <Layout className={styles.pageLayout}>
        <Sider breakpoint="lg"
               collapsedWidth="0">
          {this.renderSliderMenu()}
        </Sider>
        <Content className={styles.pageContent}>
          <Card title={activeFileName}>
            <MarkdownFileShow
              filePath={activeFilePath}
            />
          </Card>

        </Content>
      </Layout>
    );
  }
}


