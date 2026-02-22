import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPredictionsApi } from "../../../api/predictionsApi";


const calculateChange = (predictions) => {
  if (!predictions || predictions.length < 2) return 0;
  
  const sorted = [...predictions].sort(
    (a, b) => new Date(b.predictedDate) - new Date(a.predictedDate)
  );
  
  const latest = sorted[0]?.predictedCost || 0;
  const previous = sorted[1]?.predictedCost || 0;
  
  if (previous === 0) return 0;
  return ((latest - previous) / previous * 100).toFixed(2);
};

export const fetchPredictions = createAsyncThunk(
  "predictions/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchPredictionsApi();
      
    
      return {
        electricity: data.fetchAllElectricPrediction || [],
        water: data.fetchAllWaterPrediction || [],
        fuel: data.fetchAllTransportPrediction || [],
        grocery: data.fetchAllGroceryPrediction || [],
        miscellaneous: data.fetchAllMiscellaneousPrediction || [],
        kitchenGas: data.fetchAllKitchenGasPrediction || [],
        // Compute changes for each category
        computedChanges: {
          electricity: calculateChange(data.fetchAllElectricPrediction),
          water: calculateChange(data.fetchAllWaterPrediction),
          fuel: calculateChange(data.fetchAllTransportPrediction),
          grocery: calculateChange(data.fetchAllGroceryPrediction),
          miscellaneous: calculateChange(data.fetchAllMiscellaneousPrediction),
          kitchenGas: calculateChange(data.fetchAllKitchenGasPrediction),
        },
      };
    } catch (error) {
      console.error("Predictions fetch error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch predictions"
      );
    }
  }
);

const predictionsSlice = createSlice({
  name: "predictions",
  initialState: {
    electricity: [],
    water: [],
    fuel: [],
    grocery: [],
    miscellaneous: [],
    computedChanges: {
      electricity: 0,
      water: 0,
      fuel: 0,
      grocery: 0,
      miscellaneous: 0,
      kitchenGas: 0,
    },
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPredictions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPredictions.fulfilled, (state, action) => {
        state.loading = false;
        state.electricity = action.payload.electricity;
        state.water = action.payload.water;
        state.fuel = action.payload.fuel;
        state.grocery = action.payload.grocery;
        state.miscellaneous = action.payload.miscellaneous;
        state.kitchenGas = action.payload.kitchenGas;
        state.computedChanges = action.payload.computedChanges;
      })
      .addCase(fetchPredictions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = predictionsSlice.actions;
export default predictionsSlice.reducer;