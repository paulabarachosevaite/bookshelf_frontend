import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import bookService from "./bookService";

const initialState = {
  book: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createBook = createAsyncThunk(
  "book/create",
  async (bookData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookService.createBook(bookData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getBook = createAsyncThunk(
  "books/get",
  async (bookId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookService.getBook(bookId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "books/delete",
  async (bookId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookService.deleteBook(bookId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.book = action.payload;
      })
      .addCase(createBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.book = action.payload;
      })
      .addCase(getBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deleteBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBook.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.book = null;
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const {reset} = bookSlice.actions;
export default bookSlice.reducer;
