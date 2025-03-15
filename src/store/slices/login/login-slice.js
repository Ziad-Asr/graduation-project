import { createSlice } from "@reduxjs/toolkit";
import { login } from "./thunk";

const initialState = {
  userLoginResponseInfo: {},
  error: false,
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      if (typeof action.payload === "object" && action.payload !== null) {
        state.userLoginResponseInfo = action.payload;
      } else {
        state.error = true;
      }
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default loginSlice.reducer;
