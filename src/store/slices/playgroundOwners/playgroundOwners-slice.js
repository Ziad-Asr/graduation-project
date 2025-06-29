import { createSlice } from "@reduxjs/toolkit";
import { fetchPlaygroundOwners, approveOwner } from "./thunk";

const initialState = {
  owners: [],
  loading: false,
  error: null,
};

const playgroundOwnersSlice = createSlice({
  name: "playgroundOwnersSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaygroundOwners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlaygroundOwners.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(action.payload)) {
          state.owners = action.payload;
        } else {
          state.error = "Invalid response data";
        }
      })
      .addCase(fetchPlaygroundOwners.rejected, (state, action) => {
        state.loading = false;
        state.owners = [];
        state.error = action.payload || "Something went wrong";
      })
      .addCase(approveOwner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveOwner.fulfilled, (state, action) => {
        state.loading = false;
        state.owners = state.owners.map((owner) =>
          owner.id === action.payload.ownerId
            ? { ...owner, isApproved: true }
            : owner
        );
      })
      .addCase(approveOwner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to approve owner";
      });
  },
});

export default playgroundOwnersSlice.reducer;
