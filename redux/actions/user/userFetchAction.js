// redux/user/userActions.js
import axios from "axios";
import baseURL from "../../../assets/common/baseUrl";

// Action types
export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";

// Fetch user
export const fetchUser = (token) => async (dispatch) => {
    if (!token) return;

    dispatch({ type: FETCH_USER_REQUEST });

    try {
        const response = await axios.get(`${baseURL}/api/user/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const u = response.data.user;
        const userData = {
            firstName: u.firstName || "",
            lastName: u.lastName || "",
            email: u.email || "",
            username: u.username || "",
            profilePic: u.profilePic?.[0]?.url || null,
            level: u.level || 0,
            points: u.points || 0,
        };

        dispatch({ type: FETCH_USER_SUCCESS, payload: userData });
    } catch (err) {
        dispatch({ type: FETCH_USER_FAILURE, payload: err.response?.data || err.message });
    }
};

// Update user
export const updateUser = (token, updatedData) => async (dispatch) => {
    if (!token) return;

    dispatch({ type: UPDATE_USER_REQUEST });

    try {
        const formData = new FormData();
        Object.keys(updatedData).forEach((key) => {
            if (key === "profilePic" && updatedData.profilePic && !updatedData.profilePic.startsWith("http")) {
                const filename = updatedData.profilePic.split("/").pop();
                const match = /\.(\w+)$/.exec(filename);
                const type = match ? `image/${match[1]}` : "image";

                formData.append("profilePic", {
                    uri: updatedData.profilePic,
                    name: filename,
                    type,
                });
            } else if (updatedData[key]) {
                formData.append(key, updatedData[key]);
            }
        });

        const res = await axios.put(`${baseURL}/api/user/update`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });

        const updatedUser = res.data.user;
        dispatch({ type: UPDATE_USER_SUCCESS, payload: updatedUser });
    } catch (err) {
        dispatch({ type: UPDATE_USER_FAILURE, payload: err.response?.data || err.message });
    }
};
