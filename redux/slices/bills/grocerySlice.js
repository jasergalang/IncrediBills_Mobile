import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchAllGroceryBillsApi,
    uploadGroceryBillApi,
    fetchGroceryBillByIdApi,
    fetchGroceryPredictionsApi,
    triggerGroceryPredictionApi
} from "../../../api/bills/groceryAPI";


export const fetchGroceryBills = createAsyncThunk(
    "grocery/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            return await fetchAllGroceryBillsApi();
        } catch (err) {
            return rejectWithValue("Failed to fetch grocery bills");
        }
    }
);

export const uploadGroceryBill = createAsyncThunk(
    "grocery/upload",
    async (formData, { dispatch, rejectWithValue }) => {
        try {
            const data = await uploadGroceryBillApi(formData);



            // refresh list
            dispatch(fetchGroceryBills());

            return data;
        } catch (err) {
            // ✅ FIX: Extract the error message properly
            const errorMessage = err?.response?.data?.message ||
                err?.message ||
                "Upload failed";
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchGroceryBillDetails = createAsyncThunk(
    "grocery/fetchDetails",
    async (id, { rejectWithValue }) => {
        try {
            const bill = await fetchGroceryBillByIdApi(id);
            const predictionsRes = await fetchGroceryPredictionsApi();

            let matchedPrediction = null;

            if (predictionsRes?.predictions?.length) {
                const billDate = new Date(bill.date);
                const billMonth = billDate.getMonth();
                const billYear = billDate.getFullYear();

                const targetMonth = billMonth + 1 === 12 ? 0 : billMonth + 1;
                const targetYear = billMonth + 1 === 12 ? billYear + 1 : billYear;

                matchedPrediction = predictionsRes.predictions.find(p => {
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

const grocerySlice = createSlice({
    name: "grocery",
    initialState: {
        count: 0,
        bills: [],
        selectedBill: null,
        recommendations: [],
        detailsLoading: false,
        loading: false,
        uploading: false,
        error: null,
    },
    reducers: {
        removeGroceryBillLocal: (state, action) => {
            state.bills = state.bills.filter(b => b._id !== action.payload);
            state.count -= 1;
        },
        clearRecommendations: (state) => { // ✅ Add this
            state.recommendations = [];
        },
    },
    extraReducers: (builder) => {
        builder
            // fetch
            .addCase(fetchGroceryBills.pending, (state) => {
                state.loading = true;
                state.error = null; // ✅ Clear previous errors
            })
            .addCase(fetchGroceryBills.fulfilled, (state, action) => {
                state.loading = false;
                state.count = action.payload.count || 0;
                state.bills = action.payload.bills || [];
                state.error = null;
            })
            .addCase(fetchGroceryBills.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // upload
            .addCase(uploadGroceryBill.pending, (state) => {
                state.uploading = true;
                state.error = null; // ✅ Clear previous errors
            })
            .addCase(uploadGroceryBill.fulfilled, (state, action) => {
                state.uploading = false;
                state.error = null;

                if (action.payload?.recommendations) {
                    state.recommendations = action.payload.recommendations;
                }
            })
            .addCase(uploadGroceryBill.rejected, (state, action) => {
                state.uploading = false;
                state.error = action.payload; // ✅ This is correct
            })

            .addCase(fetchGroceryBillDetails.pending, (state) => {
                state.detailsLoading = true;
                state.error = null;
            })
            .addCase(fetchGroceryBillDetails.fulfilled, (state, action) => {
                const { bill, matchedPrediction } = action.payload;

                state.detailsLoading = false;
                state.selectedBill = {
                    _id: bill._id,
                    name: bill.billImage?.[0]?.url.split("/").pop() || "Grocery Bill",
                    scannedCost: bill.cost,
                    scannedQuantity: bill.quantity,
                    scannedDate: new Date(bill.date).toLocaleDateString(),
                    status: bill.status,
                    predictedCost:
                        matchedPrediction?.predictedCost || bill.cost * 1.1,
                    predictedQuantity:
                        matchedPrediction?.predictedQuantity ||
                        bill.consumption * 1.1,
                    predictedDate: matchedPrediction?.predictedDate || null,
                };
            })
            .addCase(fetchGroceryBillDetails.rejected, (state, action) => {
                state.detailsLoading = false;
                state.error = action.payload;
            });
    },
});

export const { removeGroceryBillLocal, clearRecommendations } = grocerySlice.actions;
export default grocerySlice.reducer;