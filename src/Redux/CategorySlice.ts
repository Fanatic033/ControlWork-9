import {createSlice} from '@reduxjs/toolkit';
import {Category} from '../types.ts';
import {postCategory} from './CategoryThunks.ts';
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
      .addCase(postCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postCategory.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const categorySelector = (state: RootState) => state.category.categories;
export const categoryReducer = categorySlice.reducer;
