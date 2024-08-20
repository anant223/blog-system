import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slice/authSlice"
import dbSlice from "../slice/dbSlice";
const appStore = configureStore({
  reducer: {
    auth: authSlice,
    article: dbSlice,
  },
});

export default appStore;