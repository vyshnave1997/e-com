// pages/cart.tsx
import { NextPage } from 'next';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { increment, decrement, removeFromCart } from '../redux/slices/cartSlice';
import { Button, List, Image, Typography } from 'antd';
import { toast } from 'react-toastify';
import styles from '../styles/Cart.module.scss';

const { Title, Text } = Typography;

const Cart: NextPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const itemsArray = Object.values(cartItems);
  const total = itemsArray.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleIncrement = (id: number) => {
    dispatch(increment(id));
  };

  const handleDecrement = (id: number) => {
    dispatch(decrement(id));
  };

  const handleCheckout = () => {
    itemsArray.forEach(item => {
      toast.success(`${item.title} shipped successfully!`, {
        position: 'top-right',
        autoClose: 3000,
      });
      dispatch(removeFromCart(item.id));
    });
  };

  return (
    <div className={styles.container}>
      <Title level={2}>Your Cart</Title>
      {itemsArray.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <>
          <List
            itemLayout="horizontal"
            dataSource={itemsArray}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button key="decr" onClick={() => handleDecrement(item.id)}>-</Button>,
                  <Text key="qty">{item.quantity}</Text>,
                  <Button key="incr" onClick={() => handleIncrement(item.id)}>+</Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Image width={80} src={item.image} alt={item.title} />}
                  title={item.title}
                  description={`$${item.price}`}
                />
              </List.Item>
            )}
          />
          <div className={styles.total}>
            <Title level={4}>Total: ${total.toFixed(2)}</Title>
            <Button 
              type="primary" 
              size="large" 
              onClick={handleCheckout}
              className={styles.checkoutButton}
            >
              Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
