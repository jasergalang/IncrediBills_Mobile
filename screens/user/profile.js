import React, { useState, useEffect } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    StatusBar,
    ScrollView,
    Alert,
} from "react-native";
import { useAuth } from "../../context/auth";
import ProfileHeader from "../../components/user/profile/ProfileHeader";
import ProfileAvatarCard from "../../components/user/profile/ProfileAvatar";
import PersonalInformation from "../../components/user/profile/PersonalInformation";
import SecuritySection from "../../components/user/profile/SecuritySection";
import AccountActions from "../../components/user/profile/AccountActions";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import * as ImagePicker from "expo-image-picker";

export default function Profile({ navigation }) {
    const { logout, user, updateProfile } = useAuth();

    const [isEditing, setIsEditing] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [profilePic, setProfilePic] = useState(null);

    const name = `${firstName} ${lastName}`.trim();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const fetchUserProfile = async () => {
        if (!user?.token) return;

        try {
            const response = await axios.get(`${baseURL}/api/user/profile`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });

            const u = response.data.user;
            setEmail(u.email || "");
            setUsername(u.username || "");
            setFirstName(u.firstName || "");
            setLastName(u.lastName || "");
            setProfilePic(u.profilePic?.[0]?.url || null);

        } catch (error) {
            console.error(error.response?.data || error.message);
            Alert.alert("Error", "Failed to fetch profile. Please try again.");
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (!result.canceled) {
            setProfilePic(result.assets[0].uri); 
        }
    };

    const handleSaveProfile = async () => {
        try {
            const formData = new FormData();
            formData.append("firstName", firstName);
            formData.append("lastName", lastName);
            formData.append("email", email);
            formData.append("username", username);

            if (profilePic && !profilePic.startsWith("http")) {
                const filename = profilePic.split("/").pop();
                const match = /\.(\w+)$/.exec(filename);
                const type = match ? `image/${match[1]}` : `image`;

                formData.append("profilePic", {
                    uri: profilePic,
                    name: filename,
                    type,
                });
            }

            const response = await axios.put(`${baseURL}/api/user/update`, formData, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            updateProfile(response.data.user);
            Alert.alert("Success", "Profile updated successfully!");
            setIsEditing(false);

        } catch (error) {
            console.error(error.response?.data || error.message);
            Alert.alert("Error", "Failed to update profile.");
        }
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match.");
            return;
        }
        if (newPassword.length < 6) {
            Alert.alert("Error", "Password must be at least 6 characters.");
            return;
        }

        Alert.alert("Success", "Password changed successfully!");
        setShowChangePassword(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    const handleLogout = () => {
        Alert.alert("Logout", "Are you sure?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Logout",
                style: "destructive",
                onPress: () => {
                    logout();
                    navigation.replace("Login");
                },
            },
        ]);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
            <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

            <ProfileHeader
                navigation={navigation}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
            />

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <ProfileAvatarCard
                    name={name}
                    username={username}
                    image={profilePic}
                    pickImage={pickImage}
                    isEditing={isEditing}
                />

                <PersonalInformation
                    isEditing={isEditing}
                    email={email}
                    setEmail={setEmail}
                    username={username}
                    setUsername={setUsername}
                    firstName={firstName}
                    setFirstName={setFirstName}
                    lastName={lastName}
                    setLastName={setLastName}
                    onSave={handleSaveProfile}
                />

                <SecuritySection
                    showChangePassword={showChangePassword}
                    setShowChangePassword={setShowChangePassword}
                    currentPassword={currentPassword}
                    setCurrentPassword={setCurrentPassword}
                    newPassword={newPassword}
                    setNewPassword={setNewPassword}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
                    onChangePassword={handleChangePassword}
                />

                <AccountActions onLogout={handleLogout} />
            </ScrollView>
        </SafeAreaView>
    );
}
