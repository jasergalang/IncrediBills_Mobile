import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllBills } from "../../../api/billsAPI";
import { getLatestBill, transformBills } from "../../../utils/billUtils";

export const fetchBills = createAsyncThunk(
  "bills/fetchBills",
  async (_, { rejectWithValue }) => {
    try {
      const {
        fetchAllElectricBill,
        fetchAllWaterBill,
      } = await fetchAllBills();

      const latestElectric = getLatestBill(fetchAllElectricBill);
      const latestWater = getLatestBill(fetchAllWaterBill);

      return {
        latestAmounts: {
          electricity: latestElectric?.cost || 0,
          water: latestWater?.cost || 0,
        },
        recentBills: transformBills(
          { bills: fetchAllElectricBill },
          { bills: fetchAllWaterBill }
        ).slice(0, 5),
        billsUploaded:
          fetchAllElectricBill.length + fetchAllWaterBill.length,
      };
    } catch (err) {
      return rejectWithValue("Failed to fetch bills");
    }
  }
);

const billsSlice = createSlice({
  name: "bills",
  initialState: {
    latestAmounts: {},
    recentBills: [],
    billsUploaded: 0,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBills.fulfilled, (state, action) => {
        state.loading = false;
        Object.assign(state, action.payload);
      })
      .addCase(fetchBills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default billsSlice.reducer;