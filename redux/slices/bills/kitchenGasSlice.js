// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import {
//     fetchAllKitchenGasBillsApi,
//     fetchKitchenGasBillByIdApi,
//     fetchKitchenGasPredictionsApi,
//     uploadKitchenGasBillApi,
//     triggerKitchenGasPredictionApi,
// } from "../../../api/bills/kitchenGasAPI";

// export const fetchKitchenGasBills = createAsyncThunk(
//     "kitchenGas/fetchAll",
//     async (_, { rejectWithValue }) => {
//         try {
//             return await fetchAllKitchenGasBillsApi();
//         } catch (err) {
//             return rejectWithValue("Failed to fetch kitchen gas bills");
//         }
//     }
// );

// export const uploadKitchenGasBill = createAsyncThunk(
//     "kitchenGas/upload",
//     async (formData, { dispatch, rejectWithValue }) => {
//         try {
//             const data = await uploadKitchenGasBillApi(formData);
//             dispatch(fetchKitchenGasBills()); // Refresh the list of bills after upload
//             return data;
//         } catch (err) {
//             const errorMessage = err?.response?.data?.message ||
//                 err?.message ||
//                 "Upload failed";
//             return rejectWithValue(errorMessage);
//         }
//     }
// );

// export const fetchKitchenGasBillDetails = createAsyncThunk(
//     "kitchenGas/fetchDetails",
//     async (id, { rejectWithValue }) => {
//         try {
//             const bill = await fetchKitchenGasBillByIdApi(id);
//             const predictionsRes = await fetchKitchenGasPredictionsApi();

//             let matchedPrediction = null;

//             if (predictionsRes?.predictions?.length) {
//                 const billDate = new Date(bill.date);
//                 const billMonth = billDate.getMonth();
//                 const billYear = billDate.getFullYear();

//                 const targetMonth = billMonth + 1 === 12 ? 0 : billMonth + 1;
//                 const targetYear = billMonth + 1 === 12 ? billYear + 1 : billYear;

//                 matchedPrediction = predictionsRes.predictions.find(p => {
//                     const d = new Date(p.predictedDate);
//                     return d.getMonth() === targetMonth && d.getFullYear() === targetYear;
//                 });
//             }

//             return { bill, prediction: matchedPrediction };
//         } catch (err) {
//             return rejectWithValue("Failed to fetch bill details");
//         }
//     }
// );

// const kitchenGasSlice = createSlice({
//     name: "kitchenGas",
//     initialState: {
//         count: 0,
//         bills: [],
//         selectedBill: null,
//         clearRecommendations: [],
//         detailsLoading: false,
//         loading: false,
//         uploading: false,
//         error: null,
//     },
//     reducers: {
//         removeKitchenGasBillLocally: (state, action) => {
//             state.bills = state.bills.filter(bill => bill.id !== action.payload);
//             state.count -= 1;
//         },
//         clearKitchenGasRecommendations: (state) => {
//             state.clearRecommendations = [];
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             // fetchKitchenGasBills
//             .addCase(fetchKitchenGasBills.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchKitchenGasBills.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.count = action.payload.count || 0;
//                 state.bills = action.payload.bills || [];
//                 state.error = null;
//             })
//             .addCase(fetchKitchenGasBills.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })

//             // uploadKitchenGasBill
//             .addCase(uploadKitchenGasBill.pending, (state) => {
//                 state.uploading = true;
//                 state.error = null;
//             })
//             .addCase(uploadKitchenGasBill.fulfilled, (state, action) => {
//                 state.uploading = false;
//                 state.error = null;
//                 if (action.payload?.recommendations) {
//                     state.recommendations = action.payload.recommendations;
//                 }
//             })
//             .addCase(uploadKitchenGasBill.rejected, (state, action) => {
//                 state.uploading = false;
//                 state.error = action.payload;
//             })

//             // fetchKitchenGasBillDetails
//             .addCase(fetchKitchenGasBillDetails.pending, (state) => {
//                 state.detailsLoading = true;
//                 state.error = null;
//             })
//             .addCase(fetchKitchenGasBillDetails.fulfilled, (state, action) => {
//                 const { bill, matchedPrediction } = action.payload;

//                 state.detailsLoading = false;
//                 state.selectedBill = {
//                     _id: bill._id,
//                     name: bill.billImage?.[0]?.url.split("/").pop() || "Kitchen Gas Bill",
//                     scannedCost: bill.cost,
//                     scannedCycleDays: bill.cycleDays,
//                     scannedDate: new Date(bill.date).toLocaleDateString(),
//                     status: bill.status,
//                     predictedCost:matchedPrediction?.predictedCost || bill.cost * 1.1,
//                     predictedCycleDays: matchedPrediction?.predictedCycleDays || bill.cycleDays,
//                     predictedDate: matchedPrediction?.predictedDate ? new Date(matchedPrediction.predictedDate).toLocaleDateString() : null,

//                 };
//             })
//             .addCase(fetchKitchenGasBillDetails.rejected, (state, action) => {
//                 state.detailsLoading = false;
//                 state.error = action.payload;
//             });
//     },
// });

// export const { removeKitchenGasBillLocally, clearKitchenGasRecommendations } = kitchenGasSlice.actions;
// export default kitchenGasSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAllKitchenGasBillsApi,
  fetchKitchenGasBillByIdApi,
  fetchKitchenGasPredictionsApi,
  uploadKitchenGasBillApi,
  triggerKitchenGasPredictionApi,
  updateKitchenGasBillApi,
} from "../../../api/bills/kitchenGasAPI";

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

      let matchedPrediction = null;

      if (predictionsRes?.predictions?.length) {
        const billDate = new Date(bill.date);
        const billMonth = billDate.getMonth();
        const billYear = billDate.getFullYear();

        const targetMonth = billMonth + 1 === 12 ? 0 : billMonth + 1;
        const targetYear = billMonth + 1 === 12 ? billYear + 1 : billYear;

        matchedPrediction = predictionsRes.predictions.find((p) => {
          const d = new Date(p.predictedDate);
          return d.getMonth() === targetMonth && d.getFullYear() === targetYear;
        });
      }

      return { bill, matchedPrediction };
    } catch (err) {
      return rejectWithValue("Failed to fetch bill details");
    }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

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
    removeKitchenGasBillLocally: (state, action) => {
      state.bills = state.bills.filter((bill) => bill._id !== action.payload);
      state.count -= 1;
    },
    clearKitchenGasRecommendations: (state) => {
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
        const { bill, matchedPrediction } = action.payload;

        state.detailsLoading = false;
        state.selectedBill = {
          _id: bill._id,
          name: bill.billImage?.[0]?.url.split("/").pop() || "Kitchen Gas Bill",
          scannedCost: bill.cost,
          scannedCycleDays: bill.cycleDays,
          scannedDate: new Date(bill.date).toLocaleDateString(),
          status: bill.status,
          predictedCost: matchedPrediction?.predictedCost || bill.cost * 1.1,
          predictedCycleDays: matchedPrediction?.predictedCycleDays || bill.cycleDays,
          predictedDate: matchedPrediction?.predictedDate
            ? new Date(matchedPrediction.predictedDate).toLocaleDateString()
            : null,
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
  removeKitchenGasBillLocally,
  clearKitchenGasRecommendations,
  clearKitchenGasError,
} = kitchenGasSlice.actions;

export default kitchenGasSlice.reducer;