import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../Core/urls";

const initialState = {
  loading: false,
  redTodos: [],
  error: "",
};

export const onFetchTododRed = createAsyncThunk(
  "admin/tods",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await API.get("/todo", {
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

const todoSlice = createSlice({
  name: "todos",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(onFetchTododRed.pending, (state) => {
        state.loading = true;
      })
      .addCase(onFetchTododRed.fulfilled, (state, action) => {
        state.loading = false;
        state.redTodos = action.payload;
        state.error = "";
      })
      .addCase(onFetchTododRed.rejected, (state, action) => {
        state.loading = false;
        state.redTodos = [];
        state.error = action.payload || action.error.message;
      });
  },
});

export default todoSlice.reducer;
