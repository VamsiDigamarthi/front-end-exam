import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../Core/urls";

const initialState = {
  loading: false,
  afterStudentGiveAdminFetchFeedback: [],
  error: "",
};

export const afterStudentGiveFeedBackAdminFetch = createAsyncThunk(
  "admin/studetfeedbackadminfetch",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await API.get("/admin/all-student-feedback", {
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
      .addCase(afterStudentGiveFeedBackAdminFetch.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        afterStudentGiveFeedBackAdminFetch.fulfilled,
        (state, action) => {
          state.loading = false;
          state.afterStudentGiveAdminFetchFeedback = action.payload;
          state.error = "";
        }
      )
      .addCase(afterStudentGiveFeedBackAdminFetch.rejected, (state, action) => {
        state.loading = false;
        state.afterStudentGiveAdminFetchFeedback = [];
        state.error = action.payload || action.error.message;
      });
  },
});

export default tokenSlice.reducer;
