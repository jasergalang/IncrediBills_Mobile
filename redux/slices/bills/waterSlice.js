import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchWaterBillsApi,
    uploadWaterBillApi,
    fetchWaterBillByIdApi,
    fetchWaterPredictionsApi,
    triggerWaterPredictionApi,
} from "../../../api/bills/waterAPI";


export const fetchWaterBills = createAsyncThunk(
    "water/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            return await fetchWaterBillsApi();
        } catch (err) {
            return rejectWithValue("Failed to fetch water bills");
        }
    }
);

export const uploadWaterBill = createAsyncThunk(
    "water/upload",
    async (formData, { dispatch, rejectWithValue }) => {
        try {
            const data = await uploadWaterBillApi(formData);

            // ✅ Don't trigger prediction here - backend handles it now
            // Refresh list to show new upload
            dispatch(fetchWaterBills());

            return data;
        } catch (err) {
            console.error("❌ Water upload error details:", {
                message: err.message,
                code: err.code,
                response: err?.response?.data,
            });

            // ✅ Extract the error message properly with better fallbacks
            let errorMessage = "Upload failed";

            if (err.code === 'ECONNABORTED') {
                errorMessage = "Upload timeout. The bill may still be processing.";
            } else if (err.message === 'Network Error') {
                errorMessage = "Network error. Please check your connection.";
            } else if (err?.response?.data?.message) {
                errorMessage = err.response.data.message;
            } else if (err?.message) {
                errorMessage = err.message;
            }

            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchWaterBillDetails = createAsyncThunk(
    "water/fetchDetails",
    async (id, { rejectWithValue }) => {
        try {
            const bill = await fetchWaterBillByIdApi(id);
            const predictionsRes = await fetchWaterPredictionsApi();

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

const waterSlice = createSlice({
    name: "water",
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
        removeWaterBillLocal: (state, action) => {
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
            .addCase(fetchWaterBills.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWaterBills.fulfilled, (state, action) => {
                state.loading = false;
                state.count = action.payload.count || 0;
                state.bills = action.payload.bills || [];
                state.error = null;
            })
            .addCase(fetchWaterBills.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // upload
            .addCase(uploadWaterBill.pending, (state) => {
                state.uploading = true;
                state.error = null;
            })
            .addCase(uploadWaterBill.fulfilled, (state, action) => {
                state.uploading = false;
                state.error = null;
                 // Store recommendations from response
                if (action.payload?.recommendations) {
                    state.recommendations = action.payload.recommendations;
                }
            })
            .addCase(uploadWaterBill.rejected, (state, action) => {
                state.uploading = false;
                state.error = action.payload;
            })

            // details
            .addCase(fetchWaterBillDetails.pending, (state) => {
                state.detailsLoading = true;
                state.error = null;
            })
            .addCase(fetchWaterBillDetails.fulfilled, (state, action) => {
                const { bill, matchedPrediction } = action.payload;

                state.detailsLoading = false;
                state.selectedBill = {
                    _id: bill._id,
                    name: bill.billImage?.[0]?.url.split("/").pop() || "Water Bill",
                    scannedCost: bill.cost,
                    scannedConsumption: bill.consumption,
                    scannedDate: new Date(bill.date).toLocaleDateString(),
                    status: bill.status,
                    predictedCost:
                        matchedPrediction?.predictedCost || bill.cost * 1.1,
                    predictedConsumption:
                        matchedPrediction?.predictedConsumption ||
                        bill.consumption * 1.1,
                    predictedDate: matchedPrediction?.predictedDate || null,
                };
            })
            .addCase(fetchWaterBillDetails.rejected, (state, action) => {
                state.detailsLoading = false;
                state.error = action.payload;
            });
    },
});

export const { removeWaterBillLocal, clearRecommendations } = waterSlice.actions;
export default waterSlice.reducer;