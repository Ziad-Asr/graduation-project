import { createSlice } from "@reduxjs/toolkit";
import { fetchFacilities } from "./thunk";

const initialState = {
  facilities: [],
  loading: false,
  error: null,
};

const facilitiesSlice = createSlice({
  name: "facilities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFacilities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFacilities.fulfilled, (state, action) => {
        state.loading = false;
        state.facilities = action.payload; // Assuming payload is the array of facilities
      })
      .addCase(fetchFacilities.rejected, (state, action) => {
        state.loading = false;
        state.facilities = [];
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default facilitiesSlice.reducer;
