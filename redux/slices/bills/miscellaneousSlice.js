import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchAllMiscellaneousBillsApi,
    uploadMiscellaneousBillApi,
    fetchMiscellaneousBillByIdApi,
    fetchMiscellaneousPredictionsApi,
    triggerMiscellaneousPredictionApi,
} from "../../../api/bills/miscellaneousAPI";


export const fetchMiscellaneousBills = createAsyncThunk(
    "miscellaneous/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            return await fetchAllMiscellaneousBillsApi();
        } catch (err) {
            return rejectWithValue("Failed to fetch grocery bills");
        }
    }
);

export const uploadMiscellaneousBill = createAsyncThunk(
    "miscellaneous/upload",
    async (formData, { dispatch, rejectWithValue }) => {
        try {
            const data = await uploadMiscellaneousBillApi(formData);



            // refresh list
            dispatch(fetchMiscellaneousBills());

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

export const fetchMiscellaneousBillDetails = createAsyncThunk(
    "miscellaneous/fetchDetails",
    async (id, { rejectWithValue }) => {
        try {
            const bill = await fetchMiscellaneousBillByIdApi(id);
            const predictionsRes = await fetchMiscellaneousPredictionsApi();

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

const miscellaneousSlice = createSlice({
    name: "miscellaneous",
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
        removeMiscellaneousBillLocal: (state, action) => {
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
            .addCase(fetchMiscellaneousBills.pending, (state) => {
                state.loading = true;
                state.error = null; // ✅ Clear previous errors
            })
            .addCase(fetchMiscellaneousBills.fulfilled, (state, action) => {
                state.loading = false;
                state.count = action.payload.count || 0;
                state.bills = action.payload.bills || [];
                state.error = null;
            })
            .addCase(fetchMiscellaneousBills.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // upload
            .addCase(uploadMiscellaneousBill.pending, (state) => {
                state.uploading = true;
                state.error = null; // ✅ Clear previous errors
            })
            .addCase(uploadMiscellaneousBill.fulfilled, (state, action) => {
                state.uploading = false;
                state.error = null;

                if (action.payload?.recommendations) {
                    state.recommendations = action.payload.recommendations;
                }
            })
            .addCase(uploadMiscellaneousBill.rejected, (state, action) => {
                state.uploading = false;
                state.error = action.payload; // ✅ This is correct
            })

            .addCase(fetchMiscellaneousBillDetails.pending, (state) => {
                state.detailsLoading = true;
                state.error = null;
            })
            .addCase(fetchMiscellaneousBillDetails.fulfilled, (state, action) => {
                const { bill, matchedPrediction } = action.payload;

                state.detailsLoading = false;
                state.selectedBill = {
                    _id: bill._id,
                    name: bill.billImage?.[0]?.url.split("/").pop() || "Miscellaneous Bill",
                    scannedCost: bill.cost,
                    // scannedConsumption: bill.consumption,
                    scannedDate: new Date(bill.date).toLocaleDateString(),
                    status: bill.status,
                    purchaseType: bill.purchaseType,
                    predictedCost:
                        matchedPrediction?.predictedCost || bill.cost * 1.1,
                    // predictedConsumption:
                    //     matchedPrediction?.predictedConsumption ||
                    //     bill.consumption * 1.1,
                    predictedDate: matchedPrediction?.predictedDate || null,
                };
            })
            .addCase(fetchMiscellaneousBillDetails.rejected, (state, action) => {
                state.detailsLoading = false;
                state.error = action.payload;
            });
    },
});

export const { removeMiscellaneousBillLocal, clearRecommendations } = miscellaneousSlice.actions;
export default miscellaneousSlice.reducer;