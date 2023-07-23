import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../Config/api";

export const getStatistics = createAsyncThunk(
  "stat/getStat",
  async (body, { rejectWithValue }) => {
    try {
      const { data: Statistics } = await Api.post(`/firms/statistics`, body);
      return Statistics?.data;
    } catch (message) {
      return rejectWithValue(message);
    }
  }
);

const statSlice = createSlice({
  name: "stat",
  initialState: {
    loading: true,
    error: null,
    data: [],
  },
  extraReducers: {
    [getStatistics.pending]: (state) => {
      state.loading = true;
    },
    [getStatistics.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    },
    [getStatistics.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default statSlice.reducer;
