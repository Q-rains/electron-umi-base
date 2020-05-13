import { Button,Card } from 'antd';
import router from 'umi/router';

export default function() {
  return (
    <Card title="Test">
      <h1>This is Test Page1</h1>
      <Button type='primary' onClick={()=>{router.go(-1)}}>Go Back</Button>
    </Card>);
}
