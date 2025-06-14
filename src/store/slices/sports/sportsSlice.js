import { createSlice } from "@reduxjs/toolkit";
import { fetchSports, addSport, updateSport } from "./thunk";

const initialState = {
  sports: [],
  currentSport: null,
  loading: false,
  error: null,
};

const sportsSlice = createSlice({
  name: "sports",
  initialState,
  reducers: {
    clearCurrentSport: (state) => {
      state.currentSport = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSports.fulfilled, (state, action) => {
        state.loading = false;
        state.sports = action.payload || [];
      })
      .addCase(fetchSports.rejected, (state, action) => {
        state.loading = false;
        state.sports = [];
        state.error = action.payload || "Something went wrong";
      })

      .addCase(addSport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSport.fulfilled, (state, action) => {
        state.loading = false;
        state.sports.push(action.payload);
      })
      .addCase(addSport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      .addCase(updateSport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSport.fulfilled, (state, action) => {
        state.loading = false;
        state.sports = state.sports.map((sport) =>
          sport.id === action.payload.id ? action.payload : sport
        );
        state.currentSport = action.payload;
      })
      .addCase(updateSport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { clearCurrentSport } = sportsSlice.actions;
export default sportsSlice.reducer;
