import styles from './index.css';
import { Button } from 'antd';
import Link from 'umi/link';

const { ipcRenderer } = window.electron;
const path = window.path;

export default function() {

  console.log(ipcRenderer);
  console.log(path);
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />

      <Link to='/page1'>
        <Button>to page1</Button>
      </Link>
      <ul className={styles.list}>
        <li>To get started, edit <code>src/pages/index.js</code> and save to reload.</li>
        <li>
          <a href="https://umijs.org/guide/getting-started.html">
            Getting Started
          </a>
        </li>
      </ul>
    </div>
  );
}
