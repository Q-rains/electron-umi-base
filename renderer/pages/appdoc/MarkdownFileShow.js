import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';
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

  // todo 处理错误情况
  componentDidUpdate(prevProps) {
    const { filePath } = this.props;
    if (filePath !== prevProps.filePath) {
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
      isError: false,
      errorMsg: '',
    });

  }


  render() {
    const { fileData, isError, errorMsg } = this.state;

    if (isError) {
      return <Alert
        message="Error"
        description={errorMsg}
        type="error"
        showIcon
      />;
    }

    return (
      <Markdown markdown={fileData} />
    );
  }
}
