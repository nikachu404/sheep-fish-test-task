import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/productsSlice';
import categoriesReducer from '../features/productCategoriesSlice';
import isUseEffectUsedSReducer from '../features/isUseEffectUsedSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    isUseEffectUsed: isUseEffectUsedSReducer
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
