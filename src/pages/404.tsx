// pages/404.tsx
import { NextPage } from 'next';
import Link from 'next/link';
import { Button, Typography } from 'antd';
import styles from '../styles/404.module.scss';

const { Title, Text } = Typography;

const Custom404: NextPage = () => {
  return (
    <div className={styles.container}>
      <Title level={1}>404</Title>
      <Title level={3}>Page Not Found</Title>
      <Text>
        Sorry, the page you are looking for does not exist. It might have been removed or the URL may be incorrect.
      </Text>
      <Link href="/" legacyBehavior>
        <a>
          <Button type="primary" style={{ marginTop: '20px' }}>Go Home</Button>
        </a>
      </Link>
    </div>
  );
};

export default Custom404;
