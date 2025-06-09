import { createAsyncThunk } from "@reduxjs/toolkit";
import { useInsertData } from "../../../hooks/useInsertData";

export const login = createAsyncThunk(
  "login",
  async ({ email, password, isAdmin }, { rejectWithValue }) => {
    try {
      const endpoint = isAdmin ? "/OwnerAuth/OwnerLogin" : "/AdminAuth/login";
      const response = await useInsertData(endpoint, { email, password });

      console.log("response");
      console.log(response);

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
      let errorMessage = "An error occurred while processing your request.";

      if (error.message.includes("Network Error")) {
        errorMessage = "No internet connection. Please check your connection.";
      } else if (error.response) {
        const { statusCode, messege, errors } = error.response.data;

        if (statusCode === 400) {
          if (messege) {
            errorMessage = messege;
          } else if (errors && Array.isArray(errors)) {
            errorMessage = errors.join(", ");
          }
        }
      }

      return rejectWithValue(errorMessage);
    }
  }
);

export const register = createAsyncThunk(
  "/auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const requiredFields = [
        "firstName",
        "lastName",
        "email",
        "password",
        "confirmedPassword",
        "phoneNumber",
      ];

      const missingFields = requiredFields.filter((field) => !data[field]);
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
      }

      const response = await useInsertData(`/Auth/register`, data);

      if (response && response.user && response.token) {
        return response;
      } else {
        throw new Error("Invalid response from server.");
      }
    } catch (error) {
      let errorMessage = "An error occurred during registration.";

      if (error.message.includes("Network Error")) {
        errorMessage = "No internet connection. Please check your connection.";
      } else if (error.response) {
        const { statusCode, messege } = error.response;
        if (statusCode === 400 && messege) {
          errorMessage = messege;
        }
      } else if (error.message.includes("Missing required fields")) {
        errorMessage = error.message;
      }

      return rejectWithValue(errorMessage);
    }
  }
);
