// src/store/slices/courts/courtsSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchCourts } from "./thunk";

const courtsSlice = createSlice({
  name: "courts",
  initialState: {
    courts: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourts.fulfilled, (state, action) => {
        state.loading = false;
        state.courts = action.payload;
        state.error = null;
      })
      .addCase(fetchCourts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch courts";
      });
  },
});

export default courtsSlice.reducer;
