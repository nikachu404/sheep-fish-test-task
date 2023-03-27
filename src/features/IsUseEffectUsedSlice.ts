import { createSlice } from '@reduxjs/toolkit';

// Стан Redux, що містить інформацію про використання useEffect в компоненті ProductList
const initialState = {
  isUseEffectUsed: false
};

export const isUseEffectUsedSlice = createSlice({
  name: 'isUseEffectUsed',
  initialState,
  reducers: {
    setUseEffectUsed: (state) => {
      state.isUseEffectUsed = true;
    }
  }
});

export const { setUseEffectUsed } = isUseEffectUsedSlice.actions;
export default isUseEffectUsedSlice.reducer;
