import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import listService from "./listService";

const initialState = {
  lists: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createList = createAsyncThunk(
  "lists/create",
  async (listData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await listService.createList(listData, token);
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

export const getList = createAsyncThunk(
  "lists/get",
  async (listId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await listService.getList(listId, token);
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

export const getAllLists = createAsyncThunk(
  "lists/all",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await listService.getAllLists(token);
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

export const addBook = createAsyncThunk(
  "lists/add",
  async ({bookId, listId}, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await listService.addBook(bookId, listId, token);
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

export const deleteList = createAsyncThunk(
  "lists/delete",
  async (listId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await listService.deleteList(listId, token);
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

export const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.lists = state.lists.push(action.payload);
      })
      .addCase(createList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.lists = action.payload;
      })
      .addCase(getList.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getAllLists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllLists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.lists = action.payload;
      })
      .addCase(getAllLists.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(addBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.lists = {
          ...state.lists,
          books: state.lists.books.concat(action.payload),
        };
      })
      .addCase(addBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deleteList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteList.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.lists = null;
      })
      .addCase(deleteList.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const {reset} = listsSlice.actions;
export default listsSlice.reducer;
