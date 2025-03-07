
import { GetServerSideProps, NextPage } from 'next';
import ProductCard from '../../components/ProductCard';
import styles from '../../styles/Home.module.scss';
import { Product } from '../../redux/slices/cartSlice';

interface CategoryPageProps {
  products: Product[];
  category: string;
}

const CategoryPage: NextPage<CategoryPageProps> = ({ products, category }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Category: {category}</h1>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const category = params?.category as string;
  const res = await fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`);
  const products: Product[] = await res.json();

  return {
    props: {
      products,
      category,
    },
  };
};

export default CategoryPage;
