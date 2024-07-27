import axiosApi from '../axiosApi.ts';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiTransaction, Transaction} from '../types.ts';
import {RootState} from './store.ts';

export const postTransaction = createAsyncThunk<Transaction, ApiTransaction,{state:RootState}>('transaction/postTransaction', async (newTransaction, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post('/transaction.json', newTransaction);
    return { ...newTransaction, id: response.data.name };
  } catch (e) {
    return rejectWithValue('error');
  }
});

export const fetchTransactions = createAsyncThunk<Transaction[],void,{state:RootState}>('transaction/fetchTransactions', async () => {
  const { data } = await axiosApi.get('/transaction.json');
  return Object.keys(data).map((key) => ({
    ...data[key],
    id: key,
  }));
});

export const editTransaction = createAsyncThunk<Transaction, Transaction,{state:RootState}>('transaction/editTransaction', async (updatedTransaction, { rejectWithValue }) => {
  try {
    await axiosApi.put(`/transaction/${updatedTransaction.id}.json`, updatedTransaction);
    return updatedTransaction;
  } catch (e) {
    return rejectWithValue('error');
  }
});

export const deleteTransaction = createAsyncThunk<string,string,{state:RootState}>('transaction/deleteTransaction', async (id) => {
  await axiosApi.delete(`/transaction/${id}.json`);
  return id;
});