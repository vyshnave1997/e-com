
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: string;
    count: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: {
    [key: number]: CartItem;
  };
}

const initialState: CartState = {
  items: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      if (state.items[product.id]) {
        state.items[product.id].quantity += 1;
      } else {
        state.items[product.id] = { ...product, quantity: 1 };
      }
    },
    increment: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      if (state.items[productId]) {
        state.items[productId].quantity += 1;
      }
    },
    decrement: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      if (state.items[productId] && state.items[productId].quantity > 1) {
        state.items[productId].quantity -= 1;
      } else {
        delete state.items[productId];
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      delete state.items[action.payload];
    },
  },
});

export const { addToCart, increment, decrement, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
