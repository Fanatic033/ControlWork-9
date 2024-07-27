import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../axiosApi.ts';
import {ApiCategory, Category} from '../types.ts';
import {RootState} from './store.ts';

export const postCategory = createAsyncThunk<ApiCategory, { name: string; type: 'income' | 'expense'; }, {
  rejectValue: string
}>('category/postCategory', async (newCategory, {rejectWithValue}) => {
  try {
    const response = await axiosApi.post('/category.json', newCategory);
    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});

export const fetchCategories = createAsyncThunk<Category[],void,{state:RootState}>('category/fetchCategories',
  async
  )

// СДЕЛАТЬ Лист вывести все категории сделать форму для отправки категории сделать модалку
