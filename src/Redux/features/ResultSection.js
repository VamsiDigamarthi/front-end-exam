import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../Core/urls";

const initialState = {
  loading: false,
  reResultData: [],
  error: "",
};

export const adminResultData = createAsyncThunk(
  "admin/resultData",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await API.get("/admin/all-results", {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token here
        },
      });
      return response.data;
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

const tokenSlice = createSlice({
  name: "token",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(adminResultData.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminResultData.fulfilled, (state, action) => {
        state.loading = false;
        state.reResultData = action.payload;
        state.error = "";
      })
      .addCase(adminResultData.rejected, (state, action) => {
        state.loading = false;
        state.reResultData = [];
        state.error = action.payload || action.error.message;
      });
  },
});

export default tokenSlice.reducer;
