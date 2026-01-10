import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from '../../actions/user/loginActions';
import Toast from 'react-native-toast-message';


const initialState = {
    user: null,
    loading: false,
    error: null,
};
const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
            )
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                   
            }
            )
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                // FIX: action.payload is already the string message you sent from the thunk
                state.error = action.payload; 
            }); 
    },
});
export default loginSlice.reducer;