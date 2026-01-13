import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllBillsData } from "../../../api/bills/fetchAllBills";
import { utilities } from "../../../constants/utilities";
import {
  getLatestBill,
  transformBills,
  mergeMonthlyAnalytics,
  formatBillDate,
} from "../../../utils/billUtils";
import { computeChange } from "../../../utils/predictionUtils";

// Async thunk
export const fetchBills = createAsyncThunk(
  "bills/fetchBills",
  async (_, { rejectWithValue }) => {
    try {
      const {
        electricData,
        waterData,
        electricPred,
        waterPred,
        electricAnalytics,
        waterAnalytics,
      } = await fetchAllBillsData();

      const latestElectric = getLatestBill(electricData.bills);
      const latestWater = getLatestBill(waterData.bills);

      const latestAmounts = {
        electricity: latestElectric?.cost || 0,
        water: latestWater?.cost || 0,
        gas: 0,
        fuel: 0,
        grocery: 0,
      };

      const computedChanges = {
        electricity: computeChange(latestElectric, electricPred.predictions ?? []),
        water: computeChange(latestWater, waterPred.predictions ?? []),
        gas: 0,
        fuel: 0,
        grocery: 0,
      };

      const allBills = transformBills(electricData, waterData);
      const recentBills = allBills.slice(0, 5);

      // Upcoming bills
      const formatPred = (preds) =>
        (preds || []).map((p) => ({ ...p, date: p.predictedDate }));
      const upcomingBills = [];

      const predictedElectric = getLatestBill(formatPred(electricPred.predictions ?? []));
      const predictedWater = getLatestBill(formatPred(waterPred.predictions ?? []));

      if (predictedElectric) {
        const util = utilities.find((u) => u.id === "electricity");
        upcomingBills.push({
          id: "electricity",
          type: util.name,
          amount: Number(predictedElectric.predictedCost || 0),
          dueDate: formatBillDate(predictedElectric.date),
          icon: util.icon,
          color: util.color,
        });
      }

      if (predictedWater) {
        const util = utilities.find((u) => u.id === "water");
        upcomingBills.push({
          id: "water",
          type: util.name,
          amount: Number(predictedWater.predictedCost || 0),
          dueDate: formatBillDate(predictedWater.date),
          icon: util.icon,
          color: util.color,
        });
      }

      // Categories
      const totalSum = latestAmounts.electricity + latestAmounts.water;
      const categories = utilities.map((u) => {
        const amt = latestAmounts[u.id] || 0;
        return {
          category: u.name,
          amount: amt,
          percent: totalSum > 0 ? Math.round((amt / totalSum) * 100) : 0,
          icon: u.icon,
          color: u.color,
        };
      });

      // Stats
      const predictionsByCategory = {
        electricity: predictedElectric?.predictedCost ?? latestAmounts.electricity,
        water: predictedWater?.predictedCost ?? latestAmounts.water,
        gas: 0,
        fuel: 0,
        grocery: 0,
      };

      const currentTotal = latestAmounts.electricity + latestAmounts.water;
      const nextMonthPrediction =
        predictionsByCategory.electricity + predictionsByCategory.water;

      const percentChange = (current, next) =>
        !current || current === 0 ? 0 : Math.round(((next - current) / current) * 100);

      const predictionChanges = {
        electricity: percentChange(latestAmounts.electricity, predictionsByCategory.electricity),
        water: percentChange(latestAmounts.water, predictionsByCategory.water),
      };

      const savedAmount =
        Math.max(latestAmounts.electricity - predictionsByCategory.electricity, 0) +
        Math.max(latestAmounts.water - predictionsByCategory.water, 0);

      const billsUploaded = (electricData.bills?.length || 0) + (waterData.bills?.length || 0);

      const statsData = {
        totalSpent: Math.round(currentTotal),
        nextMonthPrediction: Math.round(nextMonthPrediction),
        predictionChange: percentChange(currentTotal, nextMonthPrediction),
        savedAmount: Math.round(savedAmount),
        savedChange: percentChange(currentTotal, currentTotal - savedAmount),
        billsUploaded,
        billsChange: billsUploaded > 0 ? 100 : 0,
        categoryPredictions: {
          electricity: {
            current: latestAmounts.electricity,
            predicted: predictionsByCategory.electricity,
            percentChange: predictionChanges.electricity,
          },
          water: {
            current: latestAmounts.water,
            predicted: predictionsByCategory.water,
            percentChange: predictionChanges.water,
          },
        },
      };

      const analytics = {
        monthly: mergeMonthlyAnalytics(waterAnalytics.monthly ?? [], electricAnalytics.monthly ?? []),
        yearly: {
          water: waterAnalytics.yearly ?? {},
          electricity: electricAnalytics.yearly ?? {},
        },
      };

      return {
        latestAmounts,
        computedChanges,
        recentBills,
        upcomingBills,
        categories,
        statsData,
        analytics,
      };
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch bills");
    }
  }
);

// Slice
const billSlice = createSlice({
  name: "bills",
  initialState: {
    latestAmounts: {},
    computedChanges: {},
    recentBills: [],
    upcomingBills: [],
    categories: [],
    statsData: {},
    analytics: { monthly: [], yearly: {} },
    loading: false,
    error: null,
  },
  reducers: {},
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

export default billSlice.reducer;