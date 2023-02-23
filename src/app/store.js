import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import listReducer from "../features/lists/listSlice";
import bookReducer from "../features/book/bookSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lists: listReducer,
    book: bookReducer,
  },
});
