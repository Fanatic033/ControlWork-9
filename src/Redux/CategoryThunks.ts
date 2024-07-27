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


export const fetchCategories = createAsyncThunk<Category[], void, { state: RootState }>(
  'category/fetchCategories',
  async () => {
    const {data} = await axiosApi.get<{ [key: string]: ApiCategory }>('/category.json');
    return Object.keys(data).map((key) => ({
      ...data[key],
      id: key,
    }));
  })

export const deleteCategory = createAsyncThunk<string,string,{state:RootState}>(
  'category/deleteCategory',
  async (id) =>{
    const response = await axiosApi.delete(`/category/${id}.json`);
    return response.data
  }
)

export const editCategory = createAsyncThunk<Category,Category,{state:RootState}>('category/editCategory', async ({id,name,type}) => {
const response = await axiosApi.put(`/category/${id}.json`, {name,type})
  return response.data;
})