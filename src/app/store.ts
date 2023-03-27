import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import isUseEffectUsedSReducer from '../features/IsUseEffectUsedSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    isUseEffectUsed: isUseEffectUsedSReducer
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
