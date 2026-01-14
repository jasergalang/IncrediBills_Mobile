// api/user/userAPI.js
import api from "./apiInstance";

// Fetch user profile
export const fetchUserProfileApi = async () => {
  const res = await api.get("/user/profile");
  return res.data; // { user }
};

// Update user profile
export const updateUserProfileApi = async (formData) => {
  const res = await api.put("/user/update", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data; // { user }
};

// Upload profile picture
export const uploadProfilePictureApi = async (imageUri) => {
  const formData = new FormData();
  
  const filename = imageUri.split("/").pop();
  const match = /\.(\w+)$/.exec(filename);
  const type = match ? `image/${match[1]}` : "image";

  formData.append("profilePic", {
    uri: imageUri,
    name: filename,
    type,
  });

  const res = await api.put("/user/update", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data; // { user }
};