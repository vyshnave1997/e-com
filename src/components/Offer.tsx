// components/Offer.tsx
import React from 'react';
import { Card, Typography } from 'antd';
import styles from './Offer.module.scss';
import { Product } from '../redux/slices/cartSlice';

const { Title, Text } = Typography;

interface OfferProps {
  product: Product;
  offerText?: string;
}

const Offer: React.FC<OfferProps> = ({ product, offerText = "Special Offer! Get 20% off!" }) => {
  return (
    <Card className={styles.offerCard} hoverable>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.title} className={styles.image} />
      </div>
      <div className={styles.offerText}>
        <Title level={4}>{offerText}</Title>
        <Text>{product.title}</Text>
      </div>
    </Card>
  );
};

export default Offer;
