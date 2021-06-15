import styles from './index.less';
import {Button} from 'antd';
import {Link} from 'umi'

export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <div>
        <Link to={'/page2'}>
          <Button>to Page 2</Button>
        </Link>
      </div>
    </div>
  );
}
