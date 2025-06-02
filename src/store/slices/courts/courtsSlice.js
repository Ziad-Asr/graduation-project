// src/store/slices/courts/courtsSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchCourts, addCourt, fetchCourtById, updateCourt } from "./thunk";

const initialState = {
  courts: [],
  currentCourt: null,
  loading: false,
  error: null,
};

const courtsSlice = createSlice({
  name: "courts",
  initialState,
  reducers: {
    clearCurrentCourt: (state) => {
      state.currentCourt = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH ALL COURTS
      .addCase(fetchCourts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourts.fulfilled, (state, action) => {
        state.loading = false;
        state.courts = action.payload || [];
      })
      .addCase(fetchCourts.rejected, (state, action) => {
        state.loading = false;
        state.courts = [];
        state.error = action.payload || "Something went wrong";
      })

      // FETCH COURT BY ID
      .addCase(fetchCourtById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourtById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCourt = action.payload;
      })
      .addCase(fetchCourtById.rejected, (state, action) => {
        state.loading = false;
        state.currentCourt = null;
        state.error = action.payload || "Something went wrong";
      })

      // ADD COURT
      .addCase(addCourt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCourt.fulfilled, (state, action) => {
        state.loading = false;
        state.courts.push(action.payload);
      })
      .addCase(addCourt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      // UPDATE COURT
      .addCase(updateCourt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCourt.fulfilled, (state, action) => {
        state.loading = false;
        state.courts = state.courts.map((court) =>
          court.id === action.payload.id ? action.payload : court
        );
        state.currentCourt = action.payload;
      })
      .addCase(updateCourt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { clearCurrentCourt } = courtsSlice.actions;
export default courtsSlice.reducer;
