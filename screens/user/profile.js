import React, { useState } from "react";
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

export default function Profile({ navigation }) {
    const { logout, user, updateProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);

    // User data state
    const [email, setEmail] = useState(user?.email || "user@example.com");
    const [username, setUsername] = useState(user?.username || "johndoe");
    const [name, setName] = useState(user?.name || "John Doe");

    // Password states
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSaveProfile = async () => {
        try {
            // Add your API call here
            // await updateProfile({ email, username, name });
            Alert.alert("Success", "Profile updated successfully!");
            setIsEditing(false);
        } catch (error) {
            Alert.alert("Error", "Failed to update profile. Please try again.");
        }
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            Alert.alert("Error", "New passwords do not match!");
            return;
        }
        if (newPassword.length < 6) {
            Alert.alert("Error", "Password must be at least 6 characters!");
            return;
        }
        try {
            // Add your API call here
            // await changePassword({ currentPassword, newPassword });
            Alert.alert("Success", "Password changed successfully!");
            setShowChangePassword(false);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            Alert.alert("Error", "Failed to change password. Please try again.");
        }
    };

    const handleLogout = () => {
        Alert.alert("Logout", "Are you sure you want to logout?", [
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
                <ProfileAvatarCard name={name} username={username} />

                <PersonalInformation
                    isEditing={isEditing}
                    email={email}
                    setEmail={setEmail}
                    username={username}
                    setUsername={setUsername}
                    name={name}
                    setName={setName}
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