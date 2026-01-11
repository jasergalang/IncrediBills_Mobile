import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../../context/auth";
import { fetchUser } from "../../redux/actions/user/userFetchAction";
import SettingsHeader from '../../components/settings/SettingsHeader';
import ProfileSection from '../../components/settings/ProfileSection';
import NotificationSection from '../../components/settings/NotificationSection';
import SecuritySection from '../../components/settings/SecuritySection';
import { useNavigation } from '@react-navigation/native';

export default function Settings() {
    const dispatch = useDispatch();
    const { token } = useAuth();
    const { userData, loading } = useSelector((state) => state.user);
    const [activeTab, setActiveTab] = useState("profile");
    const navigation = useNavigation();

    // Profile state - initialize with empty values
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
        profilePic: [],
        family: {
            _id: "",
            name: "",
            invitationCode: "",
        },
    });

    // Fetch user data when component mounts
    useEffect(() => {
        if (token) {
            dispatch(fetchUser(token));
        }
    }, [token, dispatch]);

    // Update profile state when userData changes
    useEffect(() => {
        if (userData) {
            setProfile({
                firstName: userData.firstName || "",
                lastName: userData.lastName || "",
                email: userData.email || "",
                phoneNumber: userData.phoneNumber || "",
                address: userData.address || "",
                profilePic: userData.profilePic || [],
                family: {
                    _id: userData.family?._id || "",
                    name: userData.family?.name || "",
                    invitationCode: userData.family?.invitationCode || "",
                },
            });
        }
    }, [userData]);

    // Get profile picture URL from userData
    const profilePicUrl = userData?.profilePic?.[0]?.url || userData?.profilePic || null;

    // Notification Preferences State
    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        billReminders: true,
        usageAlerts: true,
        pushNotifications: false,
    });

    // Privacy & Security Settings
    const [privacySettings, setPrivacySettings] = useState({
        twoFactorAuth: false,
        biometricLogin: false,
        shareUsageData: false,
    });

    const handleChangePassword = () => {
        console.log("Change password pressed");
        // You can navigate to a change password screen or show a modal
    };

    // Show loading indicator while fetching user data
    if (loading) {
        return (
            <SafeAreaView className="flex-1 bg-slate-50 items-center justify-center">
                <ActivityIndicator size="large" color="#3b82f6" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-slate-50">
            <View className="flex-1">
                {/* Header with Tabs */}
                <SettingsHeader activeTab={activeTab} setActiveTab={setActiveTab} navigation={navigation}/>

                {/* Content based on active tab */}
                {activeTab === "profile" && (
                    <ProfileSection
                        profile={profile}
                        setProfile={setProfile}
                        profilePicUrl={profilePicUrl}
                        onChangePassword={handleChangePassword}
                    />
                )}

                {activeTab === "notifications" && (
                    <NotificationSection
                        notifications={notifications}
                        setNotifications={setNotifications}
                    />
                )}

                {activeTab === "security" && (
                    <SecuritySection
                        privacySettings={privacySettings}
                        setPrivacySettings={setPrivacySettings}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}