import Link from 'next/link';
import { useState } from 'react';
import { Card, Tag, Button, Rate, message } from 'antd';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { Product } from '../redux/slices/cartSlice';
import styles from '../styles/ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isWishlisted) {
      setIsWishlisted(true);
      message.success('Added to wish list');
      toast.success('Added to wishlist!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <Card hoverable className={styles.card}>
      <Link href={`/product/${product.id}`} legacyBehavior>
        <a>
          <div className={styles.imageWrapper}>
            <img src={product.image} alt={product.title} className={styles.image} />
            {product.id % 2 === 0 && (
              <Tag color="gold" className={styles.bestSelling}>
                Best Selling
              </Tag>
            )}
            <Button
              type="text"
              className={styles.wishlistButton}
              onClick={handleWishlistClick}
              icon={
                isWishlisted ? (
                  <AiFillHeart style={{ color: '#1677ff', fontSize: '1.2rem' }} />
                ) : (
                  <AiOutlineHeart style={{ color: '#1677ff', fontSize: '1.2rem' }} />
                )
              }
            />
          </div>
          <div className={styles.info}>
            <h2 className={styles.title}>{product.title}</h2>
            {product.rating !== undefined && (
              <div className={styles.rating}>
                <Rate disabled defaultValue={Number(product.rating.rate)} allowHalf style={{ fontSize: '0.8rem' }} />
                <span className={styles.reviewCount}>({product.rating?.count ?? 0})</span>
              </div>
            )}
            <p className={styles.price}>${product.price.toFixed(2)}</p>
          </div>
        </a>
      </Link>
    </Card>
  );
};

export default ProductCard;
