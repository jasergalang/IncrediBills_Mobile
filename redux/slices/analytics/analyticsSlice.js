import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAnalyticsApi } from "../../../api/analyticsApi";
import { mergeMonthlyAnalytics } from "../../../utils/billUtils";

export const fetchAnalytics = createAsyncThunk(
  "analytics/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchAnalyticsApi();
      return {
        monthly: mergeMonthlyAnalytics(
          data.fetchAllWaterAnalytics.monthly,
          data.fetchAllElectricAnalytics.monthly,
          data.fetchAllGroceryAnalytics.monthly,
          data.fetchAllMiscellaneousAnalytics.monthly,
          data.fetchAllTransportFuelAnalytics.monthly
        ),
        yearly: data,
      };
    } catch {
      return rejectWithValue("Failed to fetch analytics");
    }
  }
);

const analyticsSlice = createSlice({
  name: "analytics",
  initialState: {
    monthly: [],
    yearly: {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAnalytics.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
    });
  },
});

export default analyticsSlice.reducer;
