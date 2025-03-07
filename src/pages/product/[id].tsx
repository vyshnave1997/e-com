
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps, NextPage } from 'next';
import { Button, Rate, Modal, Input, message, Tag } from 'antd';
import { FacebookFilled, TwitterSquareFilled, LinkedinFilled, HeartOutlined } from '@ant-design/icons';
import { addToCart, increment, decrement, Product } from '../../redux/slices/cartSlice';
import { RootState } from '../../redux/store';
import ProductSidebar from '../../components/ProductSidebar';
import Reviews, { Review } from '../../components/Reviews';
import styles from '../../styles/ProductDetail.module.scss';

const { TextArea } = Input;

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: NextPage<ProductDetailProps> = ({ product }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItem = useSelector((state: RootState) => state.cart.items[product.id]);


  const [isReviewModalVisible, setReviewModalVisible] = useState(false);
  const [reviewText, setReviewText] = useState('');

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    message.success('Product added to cart');
  };

  const handleIncrement = () => {
    dispatch(increment(product.id));
  };

  const handleDecrement = () => {
    dispatch(decrement(product.id));
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleBuyNow = () => {
    dispatch(addToCart(product));
    router.push('/checkout');
  };

  const handleAddToWishlist = () => {

    message.info('Product added to wishlist');
  };

  const handleWriteReview = () => {
    setReviewModalVisible(true);
  };

  const handleReviewOk = () => {
  
    message.success('Thank you for your review!');
    setReviewModalVisible(false);
    setReviewText('');
  };

  const handleReviewCancel = () => {
    setReviewModalVisible(false);
  };


  const dummyReviews: Review[] = [
    { id: 1, reviewer: 'John Doe', rating: 4, comment: 'Great product, highly recommended!' },
    { id: 2, reviewer: 'Jane Smith', rating: 5, comment: 'Excellent quality and fast shipping.' },
    { id: 3, reviewer: 'Sam Wilson', rating: 3, comment: 'Average product, does the job.' },
  ];

  return (
    <>
      <div className={styles.header}>
        <Button type="link" onClick={handleGoBack} className={styles.backButton}>
          ← Go Back
        </Button>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.productContent}>
          <img src={product.image} alt={product.title} className={styles.image} />
          <div className={styles.details}>
            <h1>
              {product.title}
              {product.id % 2 === 0 && (
                <Tag color="gold" style={{ marginLeft: '10px' }}>
                  Best Selling
                </Tag>
              )}
            </h1>
            <p className={styles.price}>${product.price}</p>
            <p>{product.description}</p>
            <p className={styles.category}>Category: {product.category}</p>
        
            {product.rating && (
              <div className={styles.rating}>
                <Rate disabled defaultValue={Number(product.rating?.rate)} allowHalf />
                <span className={styles.reviewCount}>({product.rating?.count || 0} reviews)</span>
              </div>
            )}
            <div className={styles.actionButtons}>
              {cartItem ? (
                <div className={styles.cartControls}>
                  <Button size="large" onClick={handleDecrement}>-</Button>
                  <span>{cartItem.quantity}</span>
                  <Button size="large" onClick={handleIncrement}>+</Button>
                </div>
              ) : (
                <Button size="large" onClick={handleAddToCart}>Add to Cart</Button>
              )}
              <Button size="large" type="primary" onClick={handleBuyNow}>
                Buy Now
              </Button>
              <Button size="large" onClick={handleAddToWishlist} icon={<HeartOutlined />} />
            </div>
            <div className={styles.socialShare}>
              <span>Share:</span>
              <Button type="link" icon={<FacebookFilled />} />
              <Button type="link" icon={<TwitterSquareFilled />} />
              <Button type="link" icon={<LinkedinFilled />} />
            </div>
            <div className={styles.reviewSection}>
              <Button onClick={handleWriteReview}>Write a Review</Button>
            </div>
          </div>
          <Reviews reviews={dummyReviews} />
        </div>
        <ProductSidebar category={product.category} currentProductId={product.id} />
      </div>
      <Modal
        title="Write a Review"
        visible={isReviewModalVisible}
        onOk={handleReviewOk}
        onCancel={handleReviewCancel}
        okText="Submit"
      >
        <TextArea
          rows={4}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Share your thoughts about this product..."
        />
      </Modal>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id;
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product: Product = await res.json();

  return {
    props: {
      product,
    },
  };
};

export default ProductDetail;
