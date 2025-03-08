import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Layout, Menu, Badge, Dropdown, Button, Input, Drawer } from 'antd';
import { FaShoppingCart, FaLanguage, FaUser, FaList, FaBars } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import styles from './Navbar.module.scss';

const { Header } = Layout;
const { SubMenu } = Menu;
const { Search } = Input;

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = Object.values(cartItems).reduce((acc, item) => acc + item.quantity, 0);

  const [categories, setCategories] = useState<string[]>([]);
  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch('https://fakestoreapi.com/products/categories');
      const data = await res.json();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  const languageMenu = (
    <Menu>
      <Menu.Item key="en">English</Menu.Item>
      <Menu.Item key="es">Español</Menu.Item>
      <Menu.Item key="fr">Français</Menu.Item>
    </Menu>
  );

  const [mobileVisible, setMobileVisible] = useState(false);
  const openDrawer = () => setMobileVisible(true);
  const closeDrawer = () => setMobileVisible(false);

  return (
    <>
      <Header className={styles.header}>
        <div className={styles.leftSection}>
          <div className={styles.logo}>
            <Link href="/" legacyBehavior>
              <a>E‑Comm</a>
            </Link>
          </div>
        </div>

        <div className={styles.centerSection}>
          <Menu mode="horizontal" theme="dark" className={styles.menu}>
            <Menu.Item key="search" className={styles.searchItem}>
              <Search
                placeholder="Search products..."
                onSearch={(value) => console.log('Search:', value)}
                enterButton
              />
            </Menu.Item>
            <SubMenu key="categories" title="Categories">
              {categories.map((cat) => (
                <Menu.Item key={cat}>
                  <Link href={`/category/${cat}`} legacyBehavior>
                    <a>{cat}</a>
                  </Link>
                </Menu.Item>
              ))}
            </SubMenu>
            <Menu.Item key="deals">
              <Link href="/deals" legacyBehavior>
                <a>Deals</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="customerService">
              <Link href="/customer-service" legacyBehavior>
                <a>Customer Service</a>
              </Link>
            </Menu.Item>
          </Menu>
        </div>

        <div className={styles.rightSection}>
          <Dropdown overlay={languageMenu}>
            <Button type="link" className={styles.language}>
              <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                <FaLanguage style={{ marginRight: 4 }} /> EN
              </span>
            </Button>
          </Dropdown>
          <Link href="/login" legacyBehavior>
            <a className={styles.login}>
              <FaUser style={{ marginRight: 4 }} /> Sign In
            </a>
          </Link>
          <Link href="/orders" legacyBehavior>
            <a className={styles.orders}>
              <FaList style={{ marginRight: 4 }} /> Orders
            </a>
          </Link>
          <Link href="/cart" legacyBehavior>
            <a className={styles.cart}>
              <Badge count={totalItems} color="blue" showZero>
                <FaShoppingCart style={{ fontSize: '24px', color: 'white' }} />
              </Badge>
            </a>
          </Link>
          <Button
            type="link"
            className={styles.hamburger}
            onClick={openDrawer}
          >
            <FaBars style={{ fontSize: '24px', color: '#fff' }} />
          </Button>
        </div>
      </Header>

      <Drawer
        title="Menu"
        placement="right"
        onClose={closeDrawer}
        visible={mobileVisible}
        bodyStyle={{ padding: 0 }}
      >
        <Menu mode="inline" style={{ borderRight: 0 }}>
          <Menu.Item key="search-mobile">
            <Search
              placeholder="Search products..."
              onSearch={(value) => {
                console.log('Search:', value);
                closeDrawer();
              }}
              enterButton
            />
          </Menu.Item>
          <SubMenu key="categories-mobile" title="Categories">
            {categories.map((cat) => (
              <Menu.Item key={cat}>
                <Link href={`/category/${cat}`} legacyBehavior>
                  <a onClick={closeDrawer}>{cat}</a>
                </Link>
              </Menu.Item>
            ))}
          </SubMenu>
          <Menu.Item key="deals-mobile">
            <Link href="/deals" legacyBehavior>
              <a onClick={closeDrawer}>Deals</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="customerService-mobile">
            <Link href="/customer-service" legacyBehavior>
              <a onClick={closeDrawer}>Customer Service</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="login-mobile">
            <Link href="/login" legacyBehavior>
              <a onClick={closeDrawer}>
                <FaUser style={{ marginRight: 4 }} /> Sign In
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key="cart-mobile">
            <Link href="/cart" legacyBehavior>
              <a onClick={closeDrawer}>
                <Badge count={totalItems} showZero>
                  <FaShoppingCart style={{ fontSize: '24px', color: 'blue' }} />
                </Badge>
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key="darkmode-mobile" onClick={() => { toggleDarkMode(); closeDrawer(); }}>
            {darkMode ? 'Disable Dark Mode' : 'Enable Dark Mode'}
          </Menu.Item>
        </Menu>
      </Drawer>
    </>
  );
};

export default Navbar;
