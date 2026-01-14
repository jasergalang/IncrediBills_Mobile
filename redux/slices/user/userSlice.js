import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchUserProfileApi,
  updateUserProfileApi,
  uploadProfilePictureApi,
} from "../../../api/userAPI";

export const fetchUser = createAsyncThunk(
  "user/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchUserProfileApi();
      return data.user;
    } catch (err) {
      console.error("❌ Fetch user error:", err);
      return rejectWithValue(
        err?.response?.data?.message || "Failed to fetch user profile"
      );
    }
  }
);

// Update user profile
export const updateUser = createAsyncThunk(
  "user/updateProfile",
  async (updatedData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      // Handle profile picture separately
      Object.keys(updatedData).forEach((key) => {
        if (key === "profilePic" && updatedData.profilePic) {
          // Skip if it's already a URL (no update needed)
          if (updatedData.profilePic.startsWith("http")) {
            return;
          }

          // Handle new image upload
          const filename = updatedData.profilePic.split("/").pop();
          const match = /\.(\w+)$/.exec(filename);
          const type = match ? `image/${match[1]}` : "image";

          formData.append("profilePic", {
            uri: updatedData.profilePic,
            name: filename,
            type,
          });
        } else if (updatedData[key] !== undefined && updatedData[key] !== null) {
          formData.append(key, updatedData[key]);
        }
      });

      const data = await updateUserProfileApi(formData);
      return data.user;
    } catch (err) {
      console.error("❌ Update user error:", err);
      return rejectWithValue(
        err?.response?.data?.message || "Failed to update profile"
      );
    }
  }
);

// Upload profile picture only
export const uploadProfilePicture = createAsyncThunk(
  "user/uploadProfilePicture",
  async (imageUri, { rejectWithValue }) => {
    try {
      const data = await uploadProfilePictureApi(imageUri);
      return data.user;
    } catch (err) {
      console.error("❌ Upload profile picture error:", err);
      return rejectWithValue(
        err?.response?.data?.message || "Failed to upload profile picture"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      phoneNumber: "",
      address: "",
      profilePic: null,
      level: 0,
      points: 0,
      family: {
        _id: "",
        name: "",
        invitationCode: "",
      },
    },
    loading: false,
    updating: false,
    error: null,
  },
  reducers: {
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    // Update local user data (optimistic update)
    updateUserLocal: (state, action) => {
      state.userData = { ...state.userData, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = {
          firstName: action.payload.firstName || "",
          lastName: action.payload.lastName || "",
          email: action.payload.email || "",
          username: action.payload.username || "",
          phoneNumber: action.payload.phoneNumber || "",
          address: action.payload.address || "",
          profilePic: action.payload.profilePic?.[0]?.url || null,
          level: action.payload.level || 0,
          points: action.payload.points || 0,
          family: {
            _id: action.payload.family?._id || "",
            name: action.payload.family?.name || "",
            invitationCode: action.payload.family?.invitationCode || "",
          },
        };
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update user
      .addCase(updateUser.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updating = false;
        state.userData = {
          ...state.userData,
          firstName: action.payload.firstName || state.userData.firstName,
          lastName: action.payload.lastName || state.userData.lastName,
          email: action.payload.email || state.userData.email,
          username: action.payload.username || state.userData.username,
          phoneNumber: action.payload.phoneNumber || state.userData.phoneNumber,
          address: action.payload.address || state.userData.address,
          profilePic: action.payload.profilePic?.[0]?.url || state.userData.profilePic,
          level: action.payload.level || state.userData.level,
          points: action.payload.points || state.userData.points,
        };
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      })

      // Upload profile picture
      .addCase(uploadProfilePicture.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(uploadProfilePicture.fulfilled, (state, action) => {
        state.updating = false;
        state.userData.profilePic = action.payload.profilePic?.[0]?.url || null;
        state.error = null;
      })
      .addCase(uploadProfilePicture.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, updateUserLocal } = userSlice.actions;
export default userSlice.reducer;