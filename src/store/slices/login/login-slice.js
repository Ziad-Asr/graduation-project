import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "./thunk";

const initialState = {
  userLoginResponseInfo: null,
  userRegisterResponseInfo: null,
  loading: false,
  registerLoading: false,
  error: null,
  registerError: null,
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        if (typeof action.payload === "object" && action.payload !== null) {
          state.userLoginResponseInfo = action.payload;
        } else {
          state.error = "Invalid response data";
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.userLoginResponseInfo = null;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(register.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.registerLoading = false;
        if (typeof action.payload === "object" && action.payload !== null) {
          state.userRegisterResponseInfo = action.payload;
        } else {
          state.registerError = "Invalid response data";
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.registerLoading = false;
        state.userRegisterResponseInfo = null;
        state.registerError = action.payload || "Something went wrong";
      });
  },
});

export default loginSlice.reducer;
