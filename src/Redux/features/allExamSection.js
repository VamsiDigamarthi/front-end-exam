import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../Core/urls";

const initialState = {
  loading: false,
  reAllExamSections: [],
  error: "",
};

export const adminAllExamSections = createAsyncThunk(
  "admin/allExamSections",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await API.get("/admin/all-exam-sections", {
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
      .addCase(adminAllExamSections.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminAllExamSections.fulfilled, (state, action) => {
        state.loading = false;
        state.reAllExamSections = action.payload;
        state.error = "";
      })
      .addCase(adminAllExamSections.rejected, (state, action) => {
        state.loading = false;
        state.reAllExamSections = [];
        state.error = action.payload || action.error.message;
      });
  },
});

export default tokenSlice.reducer;
