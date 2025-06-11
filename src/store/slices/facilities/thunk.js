import { createAsyncThunk } from "@reduxjs/toolkit";
import { useGetData } from "../../../hooks/useGetData";
import { toast } from "react-toastify";
import baseURL from "../../../Api/baseURL";

export const fetchFacilities = createAsyncThunk(
  "facilities/fetchFacilities",
  async (_, { rejectWithValue }) => {
    try {
      const role = JSON.parse(localStorage.getItem("userData"))?.role;
      const ownerID = JSON.parse(localStorage.getItem("userData"))?.id;
      let response;

      if (role === "Admin") {
        response = await useGetData(`/Facilities?isOwner=false`);
      } else {
        response = await useGetData(`/Facilities?ownerId=${ownerID}`);
      }

      return response?.data;
    } catch (error) {
      let errorMessage = "An error occurred while fetching facilities.";
      if (error.messege.includes("Network Error")) {
        errorMessage = "No internet connection. Please check your connection.";
      } else if (error.response) {
        const { statusCode, messege } = error.response.data;
        if (statusCode === 400 && messege) {
          errorMessage = messege;
        }
      }
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchFacilityById = createAsyncThunk(
  "facilities/fetchFacilityById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await useGetData(`/Facilities/${id}`);
      return response?.data;
    } catch (error) {
      let errorMessage = "An error occurred while fetching facility details.";
      if (error.messege.includes("Network Error")) {
        errorMessage = "No internet connection. Please check your connection.";
      } else if (error.response) {
        const { statusCode, messege } = error.response.data;
        if (statusCode === 400 && messege) {
          errorMessage = messege;
        }
      }
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const addFacility = createAsyncThunk(
  "facilities/addFacility",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await baseURL.post("/Facilities", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response;
    } catch (error) {
      let errorMessage = "Failed to add facility.";
      if (error?.response?.data?.messege) {
        errorMessage = error.response.data.messege;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateFacility = createAsyncThunk(
  "facilities/updateFacility",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await baseURL.put(`/Facilities`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response;
    } catch (error) {
      let errorMessage = "Failed to update facility.";
      if (error?.response?.data?.messege) {
        errorMessage = error.response.data.messege;
      }
      return rejectWithValue(errorMessage);
    }
  }
);
