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
        fetchAllGroceryBill,
        fetchAllTransportBill,
        fetchAllMiscellaneousBill,
        fetchAllKitchenGasBill,
      } = await fetchAllBills();

      // Get latest bills for each category
      const latestElectric = getLatestBill(fetchAllElectricBill);
      const latestWater = getLatestBill(fetchAllWaterBill);
      const latestGrocery = getLatestBill(fetchAllGroceryBill);
      const latestTransport = getLatestBill(fetchAllTransportBill);
      const latestMiscellaneous = getLatestBill(fetchAllMiscellaneousBill);
      const latestKitchenGas = getLatestBill(fetchAllKitchenGasBill);

      // Combine all bills for recent bills section
      const allBills = [
        ...fetchAllElectricBill,
        ...fetchAllWaterBill,
        ...fetchAllGroceryBill,
        ...fetchAllTransportBill,
        ...fetchAllMiscellaneousBill,
        ...fetchAllKitchenGasBill,
      ];

      return {
        latestAmounts: {
          electricity: latestElectric?.cost || 0,
          water: latestWater?.cost || 0,
          grocery: latestGrocery?.cost || 0,
          fuel: latestTransport?.cost || 0,
          miscellaneous: latestMiscellaneous?.cost || 0,
          kitchenGas: latestKitchenGas?.cost || 0,
        },
        recentBills: transformBills(
          { bills: fetchAllElectricBill },
          { bills: fetchAllWaterBill },
          { bills: fetchAllGroceryBill },
          { bills: fetchAllTransportBill },
          { bills: fetchAllMiscellaneousBill },
          { bills: fetchAllKitchenGasBill }
        ),
        billsUploaded:
          fetchAllElectricBill.length +
          fetchAllWaterBill.length +
          fetchAllGroceryBill.length +
          fetchAllTransportBill.length +
          fetchAllMiscellaneousBill.length +
          fetchAllKitchenGasBill.length,
        // Store all bills by category for detailed views
        allBills: {
          electricity: fetchAllElectricBill,
          water: fetchAllWaterBill,
          grocery: fetchAllGroceryBill,
          fuel: fetchAllTransportBill,
          miscellaneous: fetchAllMiscellaneousBill,
          kitchenGas: fetchAllKitchenGasBill,
        },
      };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch bills");
    }
  }
);

const billsSlice = createSlice({
  name: "bills",
  initialState: {
    latestAmounts: {
      electricity: 0,
      water: 0,
      grocery: 0,
      fuel: 0,
      miscellaneous: 0,
      kitchenGas: 0,
    },
    recentBills: [],
    billsUploaded: 0,
    allBills: {
      electricity: [],
      water: [],
      grocery: [],
      fuel: [],
      miscellaneous: [],
      kitchenGas: [],
    },
    loading: false,
    error: null,
  },
  reducers: {
    // Add a reducer to clear error if needed
    clearError: (state) => {
      state.error = null;
    },
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

export const { clearError } = billsSlice.actions;
export default billsSlice.reducer;