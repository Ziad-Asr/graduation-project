import { createSlice } from "@reduxjs/toolkit";
import { login } from "./thunk";

const initialState = {
  userLoginResponseInfo: null,
  loading: false,
  error: null,
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
      });
  },
});

export default loginSlice.reducer;
