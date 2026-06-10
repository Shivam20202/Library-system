import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_BOOKS } from '../data/books';

// Counter for generating unique book IDs
let bookIdCounter = Math.max(...INITIAL_BOOKS.map(b => b.id || 0)) + 1;

// Redux slice for managing the books list state
const booksSlice = createSlice({
  name: 'books',
  initialState: {
    items: INITIAL_BOOKS,
  },
  reducers: {
    // Prepend the new book so it appears first on Browse page
    addBook: (state, action) => {
      const newBook = {
        ...action.payload,
        id: bookIdCounter++,
        popular: false,
      };
      state.items.unshift(newBook);
    },
  },
});

export const { addBook } = booksSlice.actions;
export default booksSlice.reducer;
