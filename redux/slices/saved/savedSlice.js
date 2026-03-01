import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllSavingsApi } from "../../../api/savingsAPI";

export const fetchAllSavings = createAsyncThunk(
  "savings/fetchAllSavings",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchAllSavingsApi();
      // console.log("fetchAllSavings data:", JSON.stringify(data));
      return {
        electric: data.fetchAllElectricSavings,
        water: data.fetchAllWaterSavings,
        transport: data.fetchAllTransportSavings,
        grocery: data.fetchAllGrocerySavings,
        miscellaneous: data.fetchAllMiscellaneousSavings,
        kitchenGas: data.fetchAllKitchenGasSavings,
      };
    } catch (error) {
      // console.log("fetchAllSavings error:", error?.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Failed to fetch savings");
    }
  }
);

const savedSlice = createSlice({
  name: "savings",
  initialState: {
    allSavings: {
      electric: [],
      water: [],
      transport: [],
      grocery: [],
      miscellaneous: [],
      kitchenGas: [],
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSavings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSavings.fulfilled, (state, action) => {
        state.loading = false;
        state.allSavings = action.payload;
      })
      .addCase(fetchAllSavings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default savedSlice.reducer;