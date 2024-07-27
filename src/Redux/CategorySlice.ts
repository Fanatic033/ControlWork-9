import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Category} from '../types.ts';
import {deleteCategory, editCategory, fetchCategories, postCategory} from './CategoryThunks.ts';

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
      });
    builder
      .addCase(postCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postCategory.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<string>) => {
        state.categories = state.categories.filter(category => category.id !== action.payload);
      });
    builder
      .addCase(editCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        state.isLoading = false;
        const index = state.categories.findIndex((category) => category.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(editCategory.rejected, (state) => {
        state.isLoading = false;
      });
  },
  selectors: {
    selectLoading: (state) => state.isLoading,
    selectCategory: (state) => state.categories
  }
});

export const {selectLoading, selectCategory} = categorySlice.selectors;
export const categoryReducer = categorySlice.reducer;
