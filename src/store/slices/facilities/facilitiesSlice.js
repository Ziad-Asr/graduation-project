import { createSlice } from "@reduxjs/toolkit";
import {
  fetchFacilities,
  addFacility,
  fetchFacilityById,
  updateFacility,
} from "./thunk";

const initialState = {
  facilities: [],
  currentFacility: null,
  loading: false,
  error: null,
};

const facilitiesSlice = createSlice({
  name: "facilities",
  initialState,
  reducers: {
    clearCurrentFacility: (state) => {
      state.currentFacility = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH ALL FACILITIES
      .addCase(fetchFacilities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFacilities.fulfilled, (state, action) => {
        state.loading = false;
        // Ensure we only store serializable data
        state.facilities =
          action.payload?.map((facility) => ({
            id: facility.id,
            name: facility.name,
            ownerId: facility.ownerId,
            openingTime: facility.openingTime,
            closingTime: facility.closingTime,
            imageUrl: facility.imageUrl,
            address: {
              streetAddress: facility.address?.streetAddress,
              city: facility.address?.city,
              latitude: facility.address?.latitude,
              longitude: facility.address?.longitude,
            },
          })) || [];
      })
      .addCase(fetchFacilities.rejected, (state, action) => {
        state.loading = false;
        state.facilities = [];
        state.error = action.payload || "Something went wrong";
      })

      // FETCH FACILITY BY ID
      .addCase(fetchFacilityById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFacilityById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentFacility = {
          id: action.payload.id,
          name: action.payload.name,
          ownerId: action.payload.ownerId,
          openingTime: action.payload.openingTime,
          closingTime: action.payload.closingTime,
          imageUrl: action.payload.imageUrl,
          address: {
            streetAddress: action.payload.address?.streetAddress,
            city: action.payload.address?.city,
            latitude: action.payload.address?.latitude,
            longitude: action.payload.address?.longitude,
          },
        };
      })
      .addCase(fetchFacilityById.rejected, (state, action) => {
        state.loading = false;
        state.currentFacility = null;
        state.error = action.payload || "Something went wrong";
      })

      // ADD FACILITY
      .addCase(addFacility.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFacility.fulfilled, (state, action) => {
        state.loading = false;
        // Ensure we only store serializable data
        const newFacility = {
          id: action.payload.id,
          name: action.payload.name,
          ownerId: action.payload.ownerId,
          openingTime: action.payload.openingTime,
          closingTime: action.payload.closingTime,
          imageUrl: action.payload.imageUrl,
          address: {
            streetAddress: action.payload.address?.streetAddress,
            city: action.payload.address?.city,
            latitude: action.payload.address?.latitude,
            longitude: action.payload.address?.longitude,
          },
        };
        state.facilities.push(newFacility);
      })
      .addCase(addFacility.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      // UPDATE FACILITY
      .addCase(updateFacility.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFacility.fulfilled, (state, action) => {
        state.loading = false;
        const updatedFacility = {
          id: action.payload.id,
          name: action.payload.name,
          ownerId: action.payload.ownerId,
          openingTime: action.payload.openingTime,
          closingTime: action.payload.closingTime,
          imageUrl: action.payload.imageUrl,
          address: {
            streetAddress: action.payload.address?.streetAddress,
            city: action.payload.address?.city,
            latitude: action.payload.address?.latitude,
            longitude: action.payload.address?.longitude,
          },
        };
        state.facilities = state.facilities.map((facility) =>
          facility.id === updatedFacility.id ? updatedFacility : facility
        );
        state.currentFacility = updatedFacility;
      })
      .addCase(updateFacility.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { clearCurrentFacility } = facilitiesSlice.actions;
export default facilitiesSlice.reducer;
