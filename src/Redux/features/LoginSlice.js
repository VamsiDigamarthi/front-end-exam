import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../Core/urls";

const initialState = {
  loading: false,
  token: localStorage.getItem("token") || "",
  error: "",
  role: localStorage.getItem("role") || "",
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ userData, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.post("/auth/login", userData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      navigate("/");
      console.log(response.data);
      return response.data;
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        // console.log(err.response.data.message);
        return rejectWithValue(err.response.data.message);
      } else {
        // console.log(err.message);
        return rejectWithValue(err.message);
      }
    }
  }
);

const tokenSlice = createSlice({
  name: "token",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.error = "";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.token = "";
      state.error = action.payload || action.error.message;
    });
  },
});

export default tokenSlice.reducer;
