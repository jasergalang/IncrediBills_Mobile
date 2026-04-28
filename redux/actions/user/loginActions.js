import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import axios from 'axios';

/*
GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID, 
}); */

export const loginUser = createAsyncThunk(
    'login/loginUser',
    async (_, thunkAPI) => { 
        try {
            // 1. Google Sign In
            await GoogleSignin.hasPlayServices();
            const googleRes = await GoogleSignin.signIn();
            const googleUser = googleRes.data.user;
            
            //console.log("✅ Google Success:", googleUser.email);

            // 2. Check Backend (with error handling specific to Network)
            let backendStatus = { exists: false }; 
            
            try {
                 // Ensure you are using the correct IP here. 
                 // Use a hardcoded string like '192.168.x.x' temporarily if process.env fails.
                 const ip = process.env.BASEIP || '192.168.1.5'; // <--- CHANGE THIS TO YOUR IP
                 
                 const res = await axios.get(`http://${ip}:3000/api/user/check-account`, { 
                    params: { email: googleUser.email } 
                });
                
                backendStatus = res.data; // Expecting { exists: true/false, ... }
                //console.log("✅ Backend Response:", backendStatus);

            } catch (netError) {
                console.error("❌ Backend Connection Failed:", netError.message);
                // If backend is down, we might want to stop here or treat as "not registered"
                throw new Error(`Cannot connect to server: ${netError.message}`);
            }

            // 3. Return combined data
            return {
                ...googleUser,
                // This allows your UI to decide: 
                // If isRegistered is true -> Go to Home
                // If isRegistered is false -> Go to Register Screen
                isRegistered: backendStatus.exists === true 
            };
            
        } catch (error) {
            console.error("Login Action Error:", error);
            
            if (isErrorWithCode(error)) {
                // ... (Your existing switch case for Google errors)
                 switch (error.code) {
                    case statusCodes.SIGN_IN_CANCELLED:
                        return thunkAPI.rejectWithValue('User cancelled the login');
                    case statusCodes.IN_PROGRESS:
                        return thunkAPI.rejectWithValue('Login already in progress');
                    case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                        return thunkAPI.rejectWithValue('Google Play Services not available');
                    default:
                         return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
                }
            }
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);