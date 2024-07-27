import {configureStore} from '@reduxjs/toolkit';
import {categoryReducer} from './CategorySlice.ts';
import {transactionReducer} from './TransactionSlice.ts';

const store = configureStore({
  reducer: {
    category: categoryReducer,
    transactions: transactionReducer,
  }
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;