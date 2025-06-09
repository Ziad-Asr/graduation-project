import { createAsyncThunk } from "@reduxjs/toolkit";
import { useInsertData } from "../../../hooks/useInsertData";

export const login = createAsyncThunk(
  "login",
  async ({ email, password, isAdmin }, { rejectWithValue }) => {
    try {
      const endpoint = isAdmin ? "/OwnerAuth/OwnerLogin" : "/AdminAuth/login";
      const response = await useInsertData(endpoint, { email, password });

      if (!response || !response.data || !response.data.token) {
        throw new Error("Invalid response from server.");
      }

      const {
        token,
        name,
        email: userEmail,
        role,
        phoneNumber,
      } = response.data;

      localStorage.setItem("userToken", token);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          name: name || null,
          email: userEmail || null,
          phoneNumber: phoneNumber || null,
          role: role || null,
        })
      );

      return response.data;
    } catch (error) {
      // Handle network errors
      if (error.message.includes("Network Error")) {
        return rejectWithValue(
          "No internet connection. Please check your connection."
        );
      }

      // Handle API errors
      if (error.response) {
        const { statusCode, messege, errors } = error.response.data;

        if (statusCode === 400 || statusCode === 401) {
          if (errors && Array.isArray(errors) && errors.length > 0) {
            return rejectWithValue(errors[0]);
          } else if (messege) {
            return rejectWithValue(messege);
          }
        }
      }

      // Handle any other errors
      return rejectWithValue("An error occurred during login.");
    }
  }
);

export const register = createAsyncThunk(
  "register",
  async (data, { rejectWithValue }) => {
    try {
      const requiredFields = [
        "firstName",
        "lastName",
        "email",
        "password",
        "confirmPassword",
        "phoneNumber",
      ];

      const missingFields = requiredFields.filter((field) => !data[field]);
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
      }

      const response = await useInsertData("/OwnerAuth/OwnerRegister", data);

      // If we get here, the request was successful (status 200)
      return response.data;
    } catch (error) {
      // Handle network errors
      if (error.message.includes("Network Error")) {
        return rejectWithValue(
          "No internet connection. Please check your connection."
        );
      }

      // Handle API errors
      if (error.response) {
        const { statusCode, messege, errors } = error.response.data;

        if (statusCode === 400) {
          if (errors && Array.isArray(errors) && errors.length > 0) {
            return rejectWithValue(errors[0]); // Return first error from array
          } else if (messege) {
            return rejectWithValue(messege);
          }
        }
      }

      // Handle validation errors
      if (error.message.includes("Missing required fields")) {
        return rejectWithValue(error.message);
      }

      // Handle any other errors
      return rejectWithValue("An error occurred during registration.");
    }
  }
);
