import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/login/login-slice";
import { thunk } from "redux-thunk";

const store = configureStore({
  reducer: {
    loginSlice: loginReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
