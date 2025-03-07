// components/Reviews.tsx
import React from 'react';
import { List, Avatar, Rate } from 'antd';

export interface Review {
  id: number;
  reviewer: string;
  rating: number;
  comment: string;
}

interface ReviewsProps {
  reviews: Review[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Reviews</h2>
      <List
        itemLayout="vertical"
        dataSource={reviews}
        renderItem={(review) => (
          <List.Item key={review.id}>
            <List.Item.Meta
              avatar={<Avatar>{review.reviewer.charAt(0)}</Avatar>}
              title={review.reviewer}
              description={<Rate disabled defaultValue={review.rating} />}
            />
            <p>{review.comment}</p>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Reviews;
