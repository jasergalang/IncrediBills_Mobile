import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPredictionsApi } from "../../../api/predictionsApi";

export const fetchPredictions = createAsyncThunk(
  "predictions/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchPredictionsApi();
      return {
        electricity: data.fetchAllElectricPrediction || [],
        water: data.fetchAllWaterPrediction || [],
      };
    } catch {
      return rejectWithValue("Failed to fetch predictions");
    }
  }
);

const predictionsSlice = createSlice({
  name: "predictions",
  initialState: {
    electricity: [],
    water: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPredictions.fulfilled, (state, action) => {
        state.electricity = action.payload.electricity;
        state.water = action.payload.water;
      });
  },
});

export default predictionsSlice.reducer;
