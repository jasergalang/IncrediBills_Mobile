// hooks/useUser.js
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../context/auth";
import baseURL from "../assets/common/baseUrl";

export function useUser() {
    const { user, updateProfile } = useAuth();
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        profilePic: null,
        level: 0,
        points: 0,
    });
    const [loading, setLoading] = useState(false);

    const fetchUserProfile = useCallback(async () => {
        if (!user?.token) return;
        setLoading(true);

        try {
            const response = await axios.get(`${baseURL}/api/user/profile`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });

            const u = response.data.user;
            setUserData({
                firstName: u.firstName || "",
                lastName: u.lastName || "",
                email: u.email || "",
                username: u.username || "",
                profilePic: u.profilePic?.[0]?.url || null,
                level: u.level || 0,
                points: u.points || 0,
            });
        } catch (err) {
            console.error("Fetch user error:", err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    }, [user?.token]);

    const saveProfile = useCallback(
        async ({ firstName, lastName, email, username, profilePic }) => {
            if (!user?.token) return null;

            try {
                const formData = new FormData();
                formData.append("firstName", firstName);
                formData.append("lastName", lastName);
                formData.append("email", email);
                formData.append("username", username);

                if (profilePic && !profilePic.startsWith("http")) {
                    const filename = profilePic.split("/").pop();
                    const match = /\.(\w+)$/.exec(filename);
                    const type = match ? `image/${match[1]}` : "image";

                    formData.append("profilePic", {
                        uri: profilePic,
                        name: filename,
                        type,
                    });
                }

                const res = await axios.put(`${baseURL}/api/user/update`, formData, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                        "Content-Type": "multipart/form-data",
                    },
                });

                const updatedUser = res.data.user;
                setUserData((prev) => ({
                    ...prev,
                    ...updatedUser,
                    profilePic: updatedUser.profilePic?.[0]?.url || prev.profilePic,
                }));

                updateProfile(updatedUser);

                return updatedUser;
            } catch (err) {
                console.error("Update profile error:", err.response?.data || err.message);
                return null;
            }
        },
        [user?.token, updateProfile]
    );

    useEffect(() => {
        fetchUserProfile();
    }, [fetchUserProfile]);

    return {
        userData,
        fetchUserProfile,
        saveProfile,
        loading
    };
}
