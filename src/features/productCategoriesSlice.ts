import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ProductsState {
  categories: string[]
}

const initialState: ProductsState = {
  categories: []
};

export const productCategoriesSlice = createSlice({
  name: 'productCategories',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    }
  }
});

export const { set } = productCategoriesSlice.actions;
export default productCategoriesSlice.reducer;
