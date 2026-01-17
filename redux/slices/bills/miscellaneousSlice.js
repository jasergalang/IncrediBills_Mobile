import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchAllMiscellaneousBillsApi,
    uploadMiscellaneousBillApi,
    triggerMiscellaneousPredictionApi
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

const miscellaneousSlice = createSlice({
    name: "miscellaneous",
    initialState: {
        count: 0,
        bills: [],
        loading: false,
        uploading: false,
        error: null,
    },
    reducers: {
        removeMiscellaneousBillLocal: (state, action) => {
            state.bills = state.bills.filter(b => b._id !== action.payload);
            state.count -= 1;
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
            .addCase(uploadMiscellaneousBill.fulfilled, (state) => {
                state.uploading = false;
                state.error = null;
            })
            .addCase(uploadMiscellaneousBill.rejected, (state, action) => {
                state.uploading = false;
                state.error = action.payload; // ✅ This is correct
            });
    },
});

export const { removeMiscellaneousBillLocal } = miscellaneousSlice.actions;
export default miscellaneousSlice.reducer;