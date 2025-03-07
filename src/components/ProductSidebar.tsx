// components/ProductSidebar.tsx
import React, { useEffect, useState } from 'react';
import { Card, List, Button, Spin } from 'antd';

interface RelatedProduct {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductSidebarProps {
  category: string;
  currentProductId: number;
}

const ProductSidebar: React.FC<ProductSidebarProps> = ({ category, currentProductId }) => {
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchRelatedProducts() {
      setLoading(true);
      try {
        const res = await fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`);
        const data: RelatedProduct[] = await res.json();
        // Filter out the current product from the related products
        const filtered = data.filter((p) => p.id !== currentProductId);
        setRelatedProducts(filtered);
      } catch (error) {
        console.error("Error fetching related products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRelatedProducts();
  }, [category, currentProductId]);

  return (
    <div style={{ width: '100%', maxWidth: '300px' }}>
      <Card title="Related Products" style={{ marginBottom: '20px' }}>
        {loading ? (
          <Spin />
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={relatedProducts}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '50%' }}
                    />
                  }
                  title={<a href={`/product/${item.id}`}>{item.title}</a>}
                  description={`$${item.price}`}
                />
              </List.Item>
            )}
          />
        )}
      </Card>

      <Card title="Share This Product" style={{ marginBottom: '20px' }}>
        <Button type="primary" style={{ marginRight: '10px' }}>
          Facebook
        </Button>
        <Button type="primary">Twitter</Button>
      </Card>

      <Card title="Additional Info">
        <p>Free shipping on orders over $50.</p>
        <p>30-day return policy.</p>
      </Card>
    </div>
  );
};

export default ProductSidebar;
