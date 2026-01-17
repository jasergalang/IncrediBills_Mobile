import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchAllTransportBillsApi,
    uploadTransportBillApi,
    triggerTransportPredictionApi
} from "../../../api/bills/transportAPI";


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



            // refresh list
            dispatch(fetchTransportBills());

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

const transportSlice = createSlice({
    name: "transport",
    initialState: {
        count: 0,
        bills: [],
        loading: false,
        uploading: false,
        error: null,
    },
    reducers: {
        removetransportBillLocal: (state, action) => {
            state.bills = state.bills.filter(b => b._id !== action.payload);
            state.count -= 1;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetch
            .addCase(fetchTransportBills.pending, (state) => {
                state.loading = true;
                state.error = null; // ✅ Clear previous errors
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

            // upload
            .addCase(uploadTransportBill.pending, (state) => {
                state.uploading = true;
                state.error = null; // ✅ Clear previous errors
            })
            .addCase(uploadTransportBill.fulfilled, (state) => {
                state.uploading = false;
                state.error = null;
            })
            .addCase(uploadTransportBill.rejected, (state, action) => {
                state.uploading = false;
                state.error = action.payload; // ✅ This is correct
            });
    },
});

export const { removeTransportBillLocal } = transportSlice.actions;
export default transportSlice.reducer;