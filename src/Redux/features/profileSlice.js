import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../Core/urls";

const initialState = {
  loading: false,
  profile: null,
  error: "",
};

export const onProfileSection = createAsyncThunk(
  "admin/profileSection",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await API.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token here
        },
      });

      // console.log(response.data);
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
      .addCase(onProfileSection.pending, (state) => {
        state.loading = true;
      })
      .addCase(onProfileSection.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = "";
      })
      .addCase(onProfileSection.rejected, (state, action) => {
        state.loading = false;
        state.profile = [];
        state.error = action.payload || action.error.message;
      });
  },
});

export default tokenSlice.reducer;
