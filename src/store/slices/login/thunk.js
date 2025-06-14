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
        id,
      } = response.data;

      localStorage.setItem("userToken", token);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          id: id || null,
          name: name || null,
          email: userEmail || null,
          phoneNumber: phoneNumber || null,
          role: role || null,
        })
      );

      return response.data;
    } catch (error) {
      if (error.message.includes("Network Error")) {
        return rejectWithValue(
          "No internet connection. Please check your connection."
        );
      }

      if (error.response) {
        const { success, message, errors } = error.response.data;
        if (success === false) {
          if (errors && Array.isArray(errors) && errors.length > 0) {
            return rejectWithValue(errors[0]);
          } else if (message) {
            return rejectWithValue(message);
          }
        }
      }

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

      return response.data;
    } catch (error) {
      if (error.message.includes("Network Error")) {
        return rejectWithValue(
          "No internet connection. Please check your connection."
        );
      }

      if (error.response) {
        const { success, message, errors } = error.response.data;

        if (success === false) {
          if (errors && Array.isArray(errors) && errors.length > 0) {
            return rejectWithValue(errors[0]);
          } else if (message) {
            return rejectWithValue(message);
          }
        }
      }

      if (error.message.includes("Missing required fields")) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue("An error occurred during registration.");
    }
  }
);
