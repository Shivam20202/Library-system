import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './booksSlice';

// Configure the Redux store with the books reducer
const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});

export default store;
