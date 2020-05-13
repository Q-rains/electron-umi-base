import react from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import hljs from 'highlight.js';
import Classnames from 'classnames';
import 'highlight.js/styles/tomorrow-night-eighties.css';
import 'github-markdown-css';

class Markdown extends react.PureComponent {
  static propTypes = {
    parseCallback: PropTypes.func,
    markdown: PropTypes.string,
  };

  static defaultProps = {
    parseCallback: (e, html) => html,
    markdown: '',
  };

  markedOption = {
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight(str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (err) {
          //
        }
      }

      try {
        return hljs.highlightAuto(str).value;
      } catch (err) {
        //
      }

      return ''; // use external default escaping
    },
  };

  constructor(props) {
    super(props);
    const { options, markdown, parseCallback } = this.props;

    const html = marked(markdown || '', { ...this.markedOption, ...options }, parseCallback);

    this.state = {
      parsedHtml: html,
    };
  }

  componentDidUpdate(prevProps) {
    const { options, markdown, parseCallback } = this.props;
    if (options !== prevProps.options || markdown !== prevProps.markdown) {
      const html = marked(markdown || '', { ...this.markedOption, ...options }, parseCallback);
      this.setState({
        parsedHtml: html,
      });
    }
  }

  render() {
    const { parsedHtml } = this.state;
    const { className } = this.props;


    return (
      <div
        className={Classnames('markdown-body', className)}
        dangerouslySetInnerHTML={{ __html: parsedHtml }}
      />
    );
  }
}

export default Markdown;
