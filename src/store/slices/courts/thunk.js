// src/store/slices/courts/thunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useGetData } from "../../../hooks/useGetData";
import { toast } from "react-toastify";
import baseURL from "../../../Api/baseURL";

export const fetchCourts = createAsyncThunk(
  "courts/fetchCourts",
  async (_, { rejectWithValue }) => {
    try {
      const role = JSON.parse(localStorage.getItem("userData"))?.role;
      const ownerID = JSON.parse(localStorage.getItem("userData"))?.id;
      let response;

      if (role === "Admin") {
        response = await useGetData(`/Court/GetAll?isOwner=false`);
      } else {
        response = await useGetData(`/Court/GetAll?ownerId=${ownerID}`);
      }

      return response;
    } catch (error) {
      let errorMessage = "An error occurred while fetching courts.";
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

export const fetchCourtById = createAsyncThunk(
  "courts/fetchCourtById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await useGetData(`/Court/GetById?id=${id}`);
      return response;
    } catch (error) {
      let errorMessage = "An error occurred while fetching court details.";
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

export const addCourt = createAsyncThunk(
  "courts/addCourt",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await baseURL.post("/Court/add", formData);
      return response.data;
    } catch (error) {
      let errorMessage = "Failed to add court.";
      if (error?.response?.data?.messege) {
        errorMessage = error.response.data.messege;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateCourt = createAsyncThunk(
  "courts/updateCourt",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await baseURL.put("/Court", formData);
      return response.data;
    } catch (error) {
      let errorMessage = "Failed to update court.";
      if (error?.response?.data?.messege) {
        errorMessage = error.response.data.messege;
      }
      return rejectWithValue(errorMessage);
    }
  }
);
