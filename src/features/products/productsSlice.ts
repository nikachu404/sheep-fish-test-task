import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { type Product } from '../../types/Product';

interface ProductsState {
  products: Product[]
}

const initialState: ProductsState = {
  products: []
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    add: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    take: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    }
  }
});

export const { set, add, take } = productsSlice.actions;
export default productsSlice.reducer;
