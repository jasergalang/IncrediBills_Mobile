import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchWaterBillsApi,
    uploadWaterBillApi,
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

const waterSlice = createSlice({
    name: "water",
    initialState: {
        count: 0,
        bills: [],
        loading: false,
        uploading: false,
        error: null,
    },
    reducers: {
        removeWaterBillLocal: (state, action) => {
            state.bills = state.bills.filter(b => b._id !== action.payload);
            state.count -= 1;
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
            .addCase(uploadWaterBill.fulfilled, (state) => {
                state.uploading = false;
                state.error = null;
            })
            .addCase(uploadWaterBill.rejected, (state, action) => {
                state.uploading = false;
                state.error = action.payload;
            });
    },
});

export const { removeWaterBillLocal } = waterSlice.actions;
export default waterSlice.reducer;