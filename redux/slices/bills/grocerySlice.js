import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchAllGroceryBillsApi,
    uploadGroceryBillApi,
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

const grocerySlice = createSlice({
    name: "grocery",
    initialState: {
        count: 0,
        bills: [],
        loading: false,
        uploading: false,
        error: null,
    },
    reducers: {
        removeGroceryBillLocal: (state, action) => {
            state.bills = state.bills.filter(b => b._id !== action.payload);
            state.count -= 1;
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
            .addCase(uploadGroceryBill.fulfilled, (state) => {
                state.uploading = false;
                state.error = null;
            })
            .addCase(uploadGroceryBill.rejected, (state, action) => {
                state.uploading = false;
                state.error = action.payload; // ✅ This is correct
            });
    },
});

export const { removeGroceryBillLocal } = grocerySlice.actions;
export default grocerySlice.reducer;