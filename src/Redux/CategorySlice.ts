import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Category} from '../types.ts';
import {deleteCategory, fetchCategories, postCategory} from './CategoryThunks.ts';
import {RootState} from './store.ts';

export interface CategoryState {
  categories: Category[];
  isLoading: boolean;
}

const initialState: CategoryState = {
  categories: [],
  isLoading: false,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.isLoading = false;
      })
      builder
      .addCase(postCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postCategory.rejected, (state) => {
        state.isLoading = false;
      })
      builder
      .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<string>) => {
        state.categories = state.categories.filter(category => category.id !== action.payload);
      });
  },
  selectors: {
    selectLoading: (state) => state.isLoading,
    selectCategory: (state) => state.categories
  }
});

export const {selectLoading, selectCategory} = categorySlice.selectors;
export const categorySelector = (state: RootState) => state.category.categories;
export const categoryReducer = categorySlice.reducer;
