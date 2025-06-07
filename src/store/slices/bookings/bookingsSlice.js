import { createSlice } from "@reduxjs/toolkit";
import { fetchBookings } from "./thunk";

const initialState = {
  bookings: [],
  loading: false,
  error: null,
};

const bookingsSlice = createSlice({
  name: "bookingsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload || [];
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.bookings = [];
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default bookingsSlice.reducer;
