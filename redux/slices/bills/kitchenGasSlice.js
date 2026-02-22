import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAllKitchenGasBillsApi,
  fetchKitchenGasBillByIdApi,
  fetchKitchenGasPredictionsApi,
  uploadKitchenGasBillApi,
  updateKitchenGasBillApi,
} from "../../../api/bills/kitchenGasAPI";

// FIXED: Use latestPrediction (sorted by predictedDate desc) instead of
// month-matching, because predictedDate is based on cycle days and may
// land several months ahead — not necessarily the next calendar month.

// ─── Thunks ───────────────────────────────────────────────────────────────────

export const fetchKitchenGasBills = createAsyncThunk(
  "kitchenGas/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAllKitchenGasBillsApi();
    } catch (err) {
      return rejectWithValue("Failed to fetch kitchen gas bills");
    }
  }
);

export const uploadKitchenGasBill = createAsyncThunk(
  "kitchenGas/upload",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const data = await uploadKitchenGasBillApi(formData);
      dispatch(fetchKitchenGasBills());
      return data;
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || err?.message || "Upload failed";
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateKitchenGasBill = createAsyncThunk(
  "kitchenGas/update",
  async ({ billId, updatedData }, { dispatch, rejectWithValue }) => {
    try {
      const data = await updateKitchenGasBillApi(billId, updatedData);
      dispatch(fetchKitchenGasBills());
      return data;
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || err?.message || "Update failed";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchKitchenGasBillDetails = createAsyncThunk(
  "kitchenGas/fetchDetails",
  async (id, { rejectWithValue }) => {
    try {
      const bill = await fetchKitchenGasBillByIdApi(id);
      const predictionsRes = await fetchKitchenGasPredictionsApi();

      // Sort predictions by predictedDate descending and take the latest one.
      // We do NOT match by calendar month because cycle-day-based predictions
      // can land any number of weeks/months ahead.
      let latestPrediction = null;

      if (predictionsRes?.predictions?.length) {
        const sorted = [...predictionsRes.predictions].sort(
          (a, b) => new Date(b.predictedDate) - new Date(a.predictedDate)
        );
        latestPrediction = sorted[0];
      }

      console.log("📊 [KitchenGas] Bill:", bill._id, "| Prediction:", latestPrediction);

      return { bill, latestPrediction };
    } catch (err) {
      console.error("fetchKitchenGasBillDetails error:", err);
      return rejectWithValue("Failed to fetch bill details");
    }
  }
);

const kitchenGasSlice = createSlice({
  name: "kitchenGas",
  initialState: {
    count: 0,
    bills: [],
    selectedBill: null,
    recommendations: [],
    detailsLoading: false,
    loading: false,
    uploading: false,
    updating: false,
    error: null,
  },
  reducers: {
    removeKitchenGasBillLocal: (state, action) => {
      state.bills = state.bills.filter((bill) => bill._id !== action.payload);
      state.count -= 1;
    },
    clearRecommendations: (state) => {
      state.recommendations = [];
    },
    clearKitchenGasError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ── fetchKitchenGasBills ───────────────────────────────────────────────
      .addCase(fetchKitchenGasBills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKitchenGasBills.fulfilled, (state, action) => {
        state.loading = false;
        state.count = action.payload.count || 0;
        state.bills = action.payload.bills || [];
        state.error = null;
      })
      .addCase(fetchKitchenGasBills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ── uploadKitchenGasBill ──────────────────────────────────────────────
      .addCase(uploadKitchenGasBill.pending, (state) => {
        state.uploading = true;
        state.error = null;
      })
      .addCase(uploadKitchenGasBill.fulfilled, (state, action) => {
        state.uploading = false;
        state.error = null;
        if (action.payload?.recommendations) {
          state.recommendations = action.payload.recommendations;
        }
      })
      .addCase(uploadKitchenGasBill.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload;
      })

      // ── updateKitchenGasBill ──────────────────────────────────────────────
      .addCase(updateKitchenGasBill.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateKitchenGasBill.fulfilled, (state) => {
        state.updating = false;
        state.error = null;
      })
      .addCase(updateKitchenGasBill.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      })

      // ── fetchKitchenGasBillDetails ────────────────────────────────────────
      .addCase(fetchKitchenGasBillDetails.pending, (state) => {
        state.detailsLoading = true;
        state.error = null;
      })
      .addCase(fetchKitchenGasBillDetails.fulfilled, (state, action) => {
        const { bill, latestPrediction } = action.payload;

        state.detailsLoading = false;
        state.selectedBill = {
          _id: bill._id,
          name: bill.billImage?.[0]?.url?.split("/").pop() || "Kitchen Gas Bill",
          status: bill.status,

          // ── Scanned fields (direct from DB model) ─────────────────────────
          scannedCost: bill.cost,
          scannedCylinders: bill.cylinders,
          cylinderSize: bill.cylinderSize,
          scannedCycleDays: bill.cycleDays,
          provider: bill.provider,
          paymentStatus: bill.paymentStatus,
          scannedDate: new Date(bill.date).toLocaleDateString(),

          // ── Predicted fields (from actual DB prediction, no fallback math) ─
          predictedCost: latestPrediction?.predictedCost ?? null,
          predictedCycleDays: latestPrediction?.predictedCycleDays ?? null,
          predictedDate: latestPrediction?.predictedDate ?? null,
        };
        state.error = null;
      })
      .addCase(fetchKitchenGasBillDetails.rejected, (state, action) => {
        state.detailsLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  removeKitchenGasBillLocal,
  clearRecommendations,
  clearKitchenGasError,
} = kitchenGasSlice.actions;

export default kitchenGasSlice.reducer;