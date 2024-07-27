import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction } from '../types';
import {deleteTransaction, editTransaction, fetchTransactions, postTransaction} from './TransactionThunks.ts';

export interface TransactionState {
  transactions: Transaction[];
  isLoading: boolean;
}

export const initialState: TransactionState = {
  transactions: [],
  isLoading: false,
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
        state.transactions = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchTransactions.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(postTransaction.fulfilled, (state, action: PayloadAction<Transaction>) => {
        state.transactions.push(action.payload);
      })
      .addCase(editTransaction.fulfilled, (state, action: PayloadAction<Transaction>) => {
        const index = state.transactions.findIndex((tran) => tran.id === action.payload.id);
        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
      })
      .addCase(deleteTransaction.fulfilled, (state, action: PayloadAction<string>) => {
        state.transactions = state.transactions.filter((tran) => tran.id !== action.payload);
      });
  },
  selectors:{
    selectTransactions: (state) => state.transactions,
  }
});
export const {selectTransactions} = transactionSlice.selectors;

export const selectLoading = (state: { transactions: TransactionState }) => state.transactions.isLoading;
export const transactionReducer =  transactionSlice.reducer;
