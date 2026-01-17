import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchElectricBillsApi,
    uploadElectricBillApi,
    fetchElectricBillByIdApi,
    fetchElectricPredictionsApi,
    triggerElectricPredictionApi,
} from "../../../api/bills/electricityAPI";


export const fetchElectricBills = createAsyncThunk(
    "electric/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            return await fetchElectricBillsApi();
        } catch (err) {
            return rejectWithValue("Failed to fetch electric bills");
        }
    }
);

export const uploadElectricBill = createAsyncThunk(
    "electric/upload",
    async (formData, { dispatch, rejectWithValue }) => {
        try {
            const data = await uploadElectricBillApi(formData);

            // // fire-and-forget prediction
            // triggerElectricPredictionApi().catch(err => {
            //     console.warn("Prediction failed:", err);
            // });

            // refresh list
            dispatch(fetchElectricBills());

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

export const fetchElectricBillDetails = createAsyncThunk(
    "electric/fetchDetails",
    async (id, { rejectWithValue }) => {
        try {
            const bill = await fetchElectricBillByIdApi(id);
            const predictionsRes = await fetchElectricPredictionsApi();

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

const electricSlice = createSlice({
    name: "electric",
    initialState: {
        count: 0,
        bills: [],
        selectedBill: null,
        detailsLoading: false,
        loading: false,
        uploading: false,
        error: null,
    },
    reducers: {
        removeElectricBillLocal: (state, action) => {
            state.bills = state.bills.filter(b => b._id !== action.payload);
            state.count -= 1;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetch
            .addCase(fetchElectricBills.pending, (state) => {
                state.loading = true;
                state.error = null; // ✅ Clear previous errors
            })
            .addCase(fetchElectricBills.fulfilled, (state, action) => {
                state.loading = false;
                state.count = action.payload.count || 0;
                state.bills = action.payload.bills || [];
                state.error = null;
            })
            .addCase(fetchElectricBills.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // upload
            .addCase(uploadElectricBill.pending, (state) => {
                state.uploading = true;
                state.error = null; // ✅ Clear previous errors
            })
            .addCase(uploadElectricBill.fulfilled, (state) => {
                state.uploading = false;
                state.error = null;
            })
            .addCase(uploadElectricBill.rejected, (state, action) => {
                state.uploading = false;
                state.error = action.payload; // ✅ This is correct
            })

            // details
            .addCase(fetchElectricBillDetails.pending, (state) => {
                state.detailsLoading = true;
                state.error = null;
            })
            .addCase(fetchElectricBillDetails.fulfilled, (state, action) => {
                const { bill, matchedPrediction } = action.payload;

                state.detailsLoading = false;
                state.selectedBill = {
                    _id: bill._id,
                    name: bill.billImage?.[0]?.url.split("/").pop() || "Electric Bill",
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
            .addCase(fetchElectricBillDetails.rejected, (state, action) => {
                state.detailsLoading = false;
                state.error = action.payload;
            });
    },
});

export const { removeElectricBillLocal } = electricSlice.actions;
export default electricSlice.reducer;