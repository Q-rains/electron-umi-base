import React from 'react';
import Router from 'umi/router';
import Link from 'umi/link';
import { Menu, Layout, Card } from 'antd';
import { UserOutlined, DoubleLeftOutlined, FileMarkdownOutlined } from '@ant-design/icons';
import MarkdownFileShow from './MarkdownFileShow';

import styles from './index.less';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const { remote } = window.electron;
const APP_DOC_PATH = remote.getGlobal('GLOBAL_CONFIG').APP_DOC_PATH;
const APP_DOC_TREE = window.dirTree(APP_DOC_PATH, { extensions: /\.md/ });

export default class AppDocs extends React.PureComponent {

  state = {
    activeFilePath: '',
    activeFileName: '',
  };

  handleMenuClick = e => {

    this.setState({
      activeFilePath: e.key,
      activeFileName: e.item.props.name,
    });

  };

  generateMenuItem(menuItems) {
    if (!menuItems || !Array.isArray(menuItems)) {
      return null;
    }

    return menuItems.map(item => {
      const { path, name, children, type } = item;
      if (type === 'directory') {
        return (
          <SubMenu key={path} title={name}>
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
      const { children } = APP_DOC_TREE;

      return (
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ minHeight: '100%' }}
          onClick={this.handleMenuClick}
        >
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
          <Link to="/">
            <div className={styles.goback}>

              <DoubleLeftOutlined /> 返回
            </div>
          </Link>
          {this.renderSliderMenu()}
        </Sider>
        <Content className={styles.pageContent}>
          <Card title={activeFileName}>
            {activeFilePath ? <MarkdownFileShow
              filePath={activeFilePath}
            /> : <p>请查看你需要的文档</p>}
          </Card>

        </Content>
      </Layout>
    );
  }
}


