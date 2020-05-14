import React from 'react';
import { Layout, Menu } from 'antd';
import Router from 'umi/router';
import { UserOutlined, VideoCameraOutlined, FileTextOutlined } from '@ant-design/icons';
import styles from './index.less';

import logo from '@/assets/logo.svg';

const { Content, Sider } = Layout;

class BasicLayout extends React.Component {

  handleMenuClick = e => {
    const { location } = this.props;
    if (location.pathname !== e.key) {
      Router.push(e.key);
    }
  };

  render() {

    const { location } = this.props;

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
        >
          <div className={styles.logo}>
            <img className='logo-img' src={logo} />
            MINIEYE
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['/']} selectedKeys={[location.pathname]}
                onClick={this.handleMenuClick}>
            <Menu.Item key="/" icon={<UserOutlined />}>
              page1
            </Menu.Item>
            <Menu.Item key="/page2" icon={<VideoCameraOutlined />}>
              page2
            </Menu.Item>
            <Menu.Item key="/docs" icon={<FileTextOutlined />}>
              文档
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '24px 16px 0' }}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }

}

export default BasicLayout;
