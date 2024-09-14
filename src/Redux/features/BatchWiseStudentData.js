import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../Core/urls";

const initialState = {
  loading: false,
  restudents: [],
  error: "",
};

export const adminBatchWiseStudent = createAsyncThunk(
  "admin/batchWiseStudent",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await API.get("/admin/batch-wise-student", {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token here
        },
      });

      console.log(response.data);
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
      .addCase(adminBatchWiseStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminBatchWiseStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.restudents = action.payload;
        state.error = "";
      })
      .addCase(adminBatchWiseStudent.rejected, (state, action) => {
        state.loading = false;
        state.restudents = [];
        state.error = action.payload || action.error.message;
      });
  },
});

export default tokenSlice.reducer;
