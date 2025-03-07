
import { useState, useEffect } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { Layout, Select, Slider, Button, Modal } from 'antd';
import ProductCard from '../components/ProductCard';
import styles from '../styles/Home.module.scss';
import { Product } from '../redux/slices/cartSlice';

const { Sider, Content } = Layout;

interface HomeProps {
  products: (Product & { color: string })[];
  categories: string[];
}

const Home: NextPage<HomeProps> = ({ products, categories }) => {

  const availableColors = ["Red", "Blue", "Green", "Black", "White", "Yellow"];


  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>(''); // can be 'asc' or 'desc'
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [minRating, setMinRating] = useState<number>(0);


  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);


  const prices = products.map((p) => p.price);
  const minPrice = Math.floor(Math.min(...prices));
  const maxPrice = Math.ceil(Math.max(...prices));

  useEffect(() => {
    if (products.length > 0) {
      setPriceRange([minPrice, maxPrice]);
    }
  }, [minPrice, maxPrice, products.length]);


  const filteredProducts = products.filter((product) => {
    if (selectedCategory && product.category !== selectedCategory) return false;
    if (selectedColor && product.color !== selectedColor) return false;
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    if (product.rating && Number(product.rating.rate) < minRating) return false;
    return true;
  });


  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'asc') return a.price - b.price;
    if (sortOrder === 'desc') return b.price - a.price;
    return 0;
  });


  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedColor('');
    setSortOrder('');
    setPriceRange([minPrice, maxPrice]);
    setMinRating(0);
  };


  const showCategoryModal = () => setIsCategoryModalVisible(true);
  const handleCategoryModalOk = () => setIsCategoryModalVisible(false);
  const handleCategoryModalCancel = () => setIsCategoryModalVisible(false);


  const toggleSort = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const sortButtonText =
    sortOrder === 'asc'
      ? "Sort: Low to High"
      : sortOrder === 'desc'
      ? "Sort: High to Low"
      : "Sort: Low to High";

  return (
    <Layout className={styles.layout}>

      <div className={styles.desktopSider}>
        <Sider width={300} className={styles.sider}>
          <div className={styles.sidebarContent}>
            <h3>Filter by Category</h3>
            <Select
              style={{ width: '100%' }}
              placeholder="Select category"
              value={selectedCategory || undefined}
              onChange={(value) => setSelectedCategory(value)}
              allowClear
            >
              {categories.map((category) => (
                <Select.Option key={category} value={category}>
                  {category}
                </Select.Option>
              ))}
            </Select>

            <h3 style={{ marginTop: '20px' }}>Filter by Color</h3>
            <Select
              style={{ width: '100%' }}
              placeholder="Select color"
              value={selectedColor || undefined}
              onChange={(value) => setSelectedColor(value)}
              allowClear
            >
              {availableColors.map((color) => (
                <Select.Option key={color} value={color}>
                  {color}
                </Select.Option>
              ))}
            </Select>

            <h3 style={{ marginTop: '20px' }}>Sort by Price</h3>
            <Select
              style={{ width: '100%' }}
              placeholder="Sort order"
              value={sortOrder || undefined}
              onChange={(value) => setSortOrder(value)}
              allowClear
            >
              <Select.Option value="asc">Low to High</Select.Option>
              <Select.Option value="desc">High to Low</Select.Option>
            </Select>

            <h3 style={{ marginTop: '20px' }}>Price Range</h3>
            <Slider
              range
              min={minPrice}
              max={maxPrice}
              defaultValue={[minPrice, maxPrice]}
              value={priceRange}
              onChange={(value) => setPriceRange(value as [number, number])}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>

            <h3 style={{ marginTop: '20px' }}>Minimum Rating</h3>
            <Slider
              min={0}
              max={5}
              step={0.5}
              value={minRating}
              onChange={(value) => setMinRating(value)}
            />
            <span>{minRating} ★</span>

            <Button style={{ marginTop: '20px' }} onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </Sider>
      </div>


      <Content className={styles.content}>
        <div className={styles.productGrid}>
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Content>

      <div className={styles.mobileBottomBar}>
        <Button type="primary" onClick={toggleSort}>
          {sortButtonText}
        </Button>
        <Button type="default" onClick={showCategoryModal}>
          Select Category
        </Button>
        <Button type="default" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>


      <Modal
        title="Select Category"
        visible={isCategoryModalVisible}
        onOk={handleCategoryModalOk}
        onCancel={handleCategoryModalCancel}
        footer={null}
      >
        <Select
          style={{ width: '100%' }}
          placeholder="Select category"
          value={selectedCategory || undefined}
          onChange={(value) => {
            setSelectedCategory(value);
            handleCategoryModalOk();
          }}
          allowClear
        >
          {categories.map((category) => (
            <Select.Option key={category} value={category}>
              {category}
            </Select.Option>
          ))}
        </Select>
      </Modal>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('https://fakestoreapi.com/products');
  const products: Product[] = await res.json();


  const availableColors = ["Red", "Blue", "Green", "Black", "White", "Yellow"];


  const productsWithColor = products.map((product) => ({
    ...product,
    color: availableColors[Math.floor(Math.random() * availableColors.length)],
  }));

  const categories = [...new Set(products.map((product) => product.category))];

  return {
    props: {
      products: productsWithColor,
      categories,
    },
  };
};

export default Home;
