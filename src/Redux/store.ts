import {configureStore} from '@reduxjs/toolkit';
import {categoryReducer} from './CategorySlice.ts';

const store = configureStore({
  reducer: {
    category: categoryReducer,
  }
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;