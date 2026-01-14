import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchElectricBillsApi,
    uploadElectricBillApi,
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

const electricSlice = createSlice({
    name: "electric",
    initialState: {
        count: 0,
        bills: [],
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
            });
    },
});

export const { removeElectricBillLocal } = electricSlice.actions;
export default electricSlice.reducer;