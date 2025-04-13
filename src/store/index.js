import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/login/login-slice";
import usersReducer from "./slices/users/users-slice";
import playgroundOwnersReducer from "./slices/playgroundOwners/playgroundOwners-slice";
import facilitiesReducer from "./slices/facilities/facilitiesSlice";
import { thunk } from "redux-thunk";

const store = configureStore({
  reducer: {
    loginSlice: loginReducer,
    usersSlice: usersReducer,
    playgroundOwnersSlice: playgroundOwnersReducer,
    facilitiesSlice: facilitiesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
