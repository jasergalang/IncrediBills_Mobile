import { createAsyncThunk } from "@reduxjs/toolkit";

// The thunk now accepts the 'accessToken' as an argument
export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (accessToken, { rejectWithValue }) => {
    try {
      // Use the access token to fetch user info
      const userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const userInfo = await userInfoResponse.json();
      console.log(userInfo);
      return userInfo;
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);