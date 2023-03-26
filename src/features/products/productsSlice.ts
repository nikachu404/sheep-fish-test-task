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
    }
  }
});

export const { set } = productsSlice.actions;
export default productsSlice.reducer;
