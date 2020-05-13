import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import Markdown from '@/components/Markdown';

const fsPromises = window.fsPromises;

export default class markdownFileShow extends React.PureComponent {
  static propTypes = {
    filePath: PropTypes.string,
  };

  static defaultProps = {
    filePath: '',
  };

  state = {
    fileData: '',
    isError: false,
    errorMsg: '',
  };

  componentDidUpdate(prevProps) {
    const { filePath } = this.props;
    if (filePath !== prevProps.filePath) {
      // todo 读取本地文件
      this.readLocalMarkdownFile(filePath);
    }
  }

  async readLocalMarkdownFile(filePath) {
    if (!filePath) {
      return;
    }

    const fileData = await fsPromises.readFile(filePath, 'utf-8').catch(e => {
      this.setState({
        isError: true,
        errorMsg: e.toString(),
      });
      return '';
    });

    this.setState({
      fileData: fileData,
    });
    console.log(fileData);
  }


  render() {
    const { fileData } = this.state;

    return (
      <Markdown markdown={fileData} />
    );
  }
}
