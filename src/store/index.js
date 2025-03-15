import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import loginReducer from "./slices/login/login-slice";

const store = configureStore({
  reducer: {
    loginSlice: loginReducer,
  },
  middleware: [thunk],
});

export default store;
