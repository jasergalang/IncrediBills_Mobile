// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import {
//     fetchAllTransportBillsApi,
//     uploadTransportBillApi,
//     fetchTransportBillByIdApi,
//     fetchTransportPredictionsApi,
//     triggerTransportPredictionApi
// } from "../../../api/bills/transportAPI";


// export const fetchTransportBills = createAsyncThunk(
//     "transport/fetchAll",
//     async (_, { rejectWithValue }) => {
//         try {
//             return await fetchAllTransportBillsApi();
//         } catch (err) {
//             return rejectWithValue("Failed to fetch transport bills");
//         }
//     }
// );

// export const uploadTransportBill = createAsyncThunk(
//     "transport/upload",
//     async (formData, { dispatch, rejectWithValue }) => {
//         try {
//             const data = await uploadTransportBillApi(formData);



//             // refresh list
//             dispatch(fetchTransportBills());

//             return data;
//         } catch (err) {
//             // ✅ FIX: Extract the error message properly
//             const errorMessage = err?.response?.data?.message ||
//                 err?.message ||
//                 "Upload failed";
//             return rejectWithValue(errorMessage);
//         }
//     }
// );

// export const fetchTransportBillDetails = createAsyncThunk(
//     "transport/fetchDetails",
//     async (id, { rejectWithValue }) => {
//         try {
//             const bill = await fetchTransportBillByIdApi(id);
//             const predictionsRes = await fetchTransportPredictionsApi();

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

//             return { bill, matchedPrediction };
//         } catch (err) {
//             return rejectWithValue("Failed to fetch bill details");
//         }
//     }
// );

// const transportSlice = createSlice({
//     name: "transport",
//     initialState: {
//         count: 0,
//         bills: [],
//         selectedBill: null,
//         recommendations: [],
//         detailsLoading: false,
//         loading: false,
//         uploading: false,
//         error: null,
//     },
//     reducers: {
//         removetransportBillLocal: (state, action) => {
//             state.bills = state.bills.filter(b => b._id !== action.payload);
//             state.count -= 1;
//         },
//         clearRecommendations: (state) => { // ✅ Add this
//             state.recommendations = [];
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             // fetch
//             .addCase(fetchTransportBills.pending, (state) => {
//                 state.loading = true;
//                 state.error = null; // ✅ Clear previous errors
//             })
//             .addCase(fetchTransportBills.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.count = action.payload.count || 0;
//                 state.bills = action.payload.bills || [];
//                 state.error = null;
//             })
//             .addCase(fetchTransportBills.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })

//             // upload
//             .addCase(uploadTransportBill.pending, (state) => {
//                 state.uploading = true;
//                 state.error = null; // ✅ Clear previous errors
//             })
//             .addCase(uploadTransportBill.fulfilled, (state, action) => {
//                 state.uploading = false;
//                 state.error = null;

//                 if (action.payload?.recommendations) {
//                     state.recommendations = action.payload.recommendations;
//                 }
//             })
//             .addCase(uploadTransportBill.rejected, (state, action) => {
//                 state.uploading = false;
//                 state.error = action.payload; // ✅ This is correct
//             })

//             // details
//             .addCase(fetchTransportBillDetails.pending, (state) => {
//                 state.detailsLoading = true;
//                 state.error = null;
//             })
//             .addCase(fetchTransportBillDetails.fulfilled, (state, action) => {
//                 const { bill, matchedPrediction } = action.payload;

//                 state.detailsLoading = false;
//                 state.selectedBill = {
//                     _id: bill._id,
//                     name: bill.billImage?.[0]?.url.split("/").pop() || "Transport Fuel Bill",
//                     scannedCost: bill.cost,
//                     scannedLiters: bill.liters,
//                     scannedDate: new Date(bill.date).toLocaleDateString(),
//                     status: bill.status,
//                     predictedCost:
//                         matchedPrediction?.predictedCost || bill.cost * 1.1,
//                     predictedLiters:
//                         matchedPrediction?.predictedLiters ||
//                         bill.liters * 1.1,
//                     predictedDate: matchedPrediction?.predictedDate || null,
//                 };
//             })
//             .addCase(fetchTransportBillDetails.rejected, (state, action) => {
//                 state.detailsLoading = false;
//                 state.error = action.payload;
//             });
//     },
// });

// export const { removeTransportBillLocal, clearRecommendations } = transportSlice.actions;
// export default transportSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAllTransportBillsApi,
  uploadTransportBillApi,
  fetchTransportBillByIdApi,
  fetchTransportPredictionsApi,
  triggerTransportPredictionApi,
  updateTransportBillApi,
} from "../../../api/bills/transportAPI";

// ─── Thunks ───────────────────────────────────────────────────────────────────

export const fetchTransportBills = createAsyncThunk(
  "transport/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAllTransportBillsApi();
    } catch (err) {
      return rejectWithValue("Failed to fetch transport bills");
    }
  }
);

export const uploadTransportBill = createAsyncThunk(
  "transport/upload",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const data = await uploadTransportBillApi(formData);
      dispatch(fetchTransportBills());
      return data;
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || err?.message || "Upload failed";
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateTransportBill = createAsyncThunk(
  "transport/update",
  async ({ billId, updatedData }, { dispatch, rejectWithValue }) => {
    try {
      const data = await updateTransportBillApi(billId, updatedData);
      dispatch(fetchTransportBills());
      return data;
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || err?.message || "Update failed";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchTransportBillDetails = createAsyncThunk(
  "transport/fetchDetails",
  async (id, { rejectWithValue }) => {
    try {
      const bill = await fetchTransportBillByIdApi(id);
      const predictionsRes = await fetchTransportPredictionsApi();

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

const transportSlice = createSlice({
  name: "transport",
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
    removeTransportBillLocal: (state, action) => {
      state.bills = state.bills.filter((b) => b._id !== action.payload);
      state.count -= 1;
    },
    clearRecommendations: (state) => {
      state.recommendations = [];
    },
    clearTransportError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ── fetchTransportBills ────────────────────────────────────────────────
      .addCase(fetchTransportBills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransportBills.fulfilled, (state, action) => {
        state.loading = false;
        state.count = action.payload.count || 0;
        state.bills = action.payload.bills || [];
        state.error = null;
      })
      .addCase(fetchTransportBills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ── uploadTransportBill ────────────────────────────────────────────────
      .addCase(uploadTransportBill.pending, (state) => {
        state.uploading = true;
        state.error = null;
      })
      .addCase(uploadTransportBill.fulfilled, (state, action) => {
        state.uploading = false;
        state.error = null;
        if (action.payload?.recommendations) {
          state.recommendations = action.payload.recommendations;
        }
      })
      .addCase(uploadTransportBill.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload;
      })

      // ── updateTransportBill ────────────────────────────────────────────────
      .addCase(updateTransportBill.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateTransportBill.fulfilled, (state) => {
        state.updating = false;
        state.error = null;
      })
      .addCase(updateTransportBill.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      })

      // ── fetchTransportBillDetails ──────────────────────────────────────────
      .addCase(fetchTransportBillDetails.pending, (state) => {
        state.detailsLoading = true;
        state.error = null;
      })
      .addCase(fetchTransportBillDetails.fulfilled, (state, action) => {
        const { bill, matchedPrediction } = action.payload;

        state.detailsLoading = false;
        state.selectedBill = {
          _id: bill._id,
          name: bill.billImage?.[0]?.url.split("/").pop() || "Transport Fuel Bill",
          scannedCost: bill.cost,
          scannedLiters: bill.liters,
          scannedDate: new Date(bill.date).toLocaleDateString(),
          status: bill.status,
          predictedCost: matchedPrediction?.predictedCost || bill.cost * 1.1,
          predictedLiters: matchedPrediction?.predictedLiters || bill.liters * 1.1,
          predictedDate: matchedPrediction?.predictedDate || null,
        };
        state.error = null;
      })
      .addCase(fetchTransportBillDetails.rejected, (state, action) => {
        state.detailsLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  removeTransportBillLocal,
  clearRecommendations,
  clearTransportError,
} = transportSlice.actions;

export default transportSlice.reducer;