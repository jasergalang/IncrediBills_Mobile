// import React, { useState, useEffect } from 'react';
// import { View, ActivityIndicator, Alert } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useSelector, useDispatch } from "react-redux";
// import { useAuth } from "../../context/auth";
// import { fetchUser, updateUser } from "../../redux/slices/user/userSlice";
// import SettingsHeader from '../../components/settings/SettingsHeader';
// import ProfileSection from '../../components/settings/ProfileSection';
// import NotificationSection from '../../components/settings/NotificationSection';
// import SecuritySection from '../../components/settings/SecuritySection';
// import { useNavigation } from '@react-navigation/native';

// export default function Settings() {
//     const dispatch = useDispatch();
//     const { token } = useAuth();
//     const navigation = useNavigation();

//     // ✅ Get user data from Redux
//     const { userData, loading, updating } = useSelector((state) => state.user);
//     const [activeTab, setActiveTab] = useState("profile");

//     // Profile state - initialize with empty values
//     const [profile, setProfile] = useState({
//         firstName: "",
//         lastName: "",
//         email: "",
//         phoneNumber: "",
//         address: "",
//         profilePic: null,
//         family: {
//             _id: "",
//             name: "",
//             invitationCode: "",
//         },
//     });

//     // Notification Preferences State
//     const [notifications, setNotifications] = useState({
//         emailNotifications: true,
//         billReminders: true,
//         usageAlerts: true,
//         pushNotifications: false,
//     });

//     // Privacy & Security Settings
//     const [privacySettings, setPrivacySettings] = useState({
//         twoFactorAuth: false,
//         biometricLogin: false,
//         shareUsageData: false,
//     });

//     // ✅ Fetch user data when component mounts
//     useEffect(() => {
//         dispatch(fetchUser());
//     }, [dispatch]);

//     // ✅ Update local profile state when userData changes
//     useEffect(() => {
//         if (userData) {
//             setProfile({
//                 firstName: userData.firstName || "",
//                 lastName: userData.lastName || "",
//                 email: userData.email || "",
//                 phoneNumber: userData.phoneNumber || "",
//                 address: userData.address || "",
//                 profilePic: userData.profilePic || null,
//                 family: {
//                     _id: userData.family?._id || "",
//                     name: userData.family?.name || "",
//                     invitationCode: userData.family?.invitationCode || "",
//                 },
//             });
//         }
//     }, [userData]);

//     // Get profile picture URL from userData
//     const profilePicUrl = userData?.profilePic || null;

//     // ✅ Handle profile update
//     const handleUpdateProfile = async (updatedFields) => {
//         try {
//             const resultAction = await dispatch(updateUser(updatedFields));

//             if (updateUser.rejected.match(resultAction)) {
//                 throw new Error(resultAction.payload || "Update failed");
//             }

//             Alert.alert("Success", "Profile updated successfully!");
//         } catch (err) {
//             console.error("Update error:", err);
//             Alert.alert(
//                 "Update Failed",
//                 err?.message || "Failed to update profile"
//             );
//         }
//     };

//     const handleChangePassword = () => {
//         console.log("Change password pressed");
//         // Navigate to change password screen or show modal
//         // navigation.navigate('ChangePassword');
//     };

//     // Show loading indicator while fetching user data
//     if (loading) {
//         return (
//             <SafeAreaView className="flex-1 bg-slate-50 items-center justify-center">
//                 <ActivityIndicator size="large" color="#3b82f6" />
//             </SafeAreaView>
//         );
//     }

//     return (
//         <SafeAreaView className="flex-1 bg-slate-50">
//             <View className="flex-1">
//                 {/* Header with Tabs */}
//                 <SettingsHeader 
//                     activeTab={activeTab} 
//                     setActiveTab={setActiveTab} 
//                     navigation={navigation}
//                 />

//                 {/* Content based on active tab */}
//                 {activeTab === "profile" && (
//                     <ProfileSection
//                         profile={profile}
//                         setProfile={setProfile}
//                         profilePicUrl={profilePicUrl}
//                         onChangePassword={handleChangePassword}
//                         onUpdateProfile={handleUpdateProfile}
//                         isUpdating={updating}
//                     />
//                 )}

//                 {activeTab === "notifications" && (
//                     <NotificationSection
//                         notifications={notifications}
//                         setNotifications={setNotifications}
//                     />
//                 )}

//                 {activeTab === "security" && (
//                     <SecuritySection
//                         privacySettings={privacySettings}
//                         setPrivacySettings={setPrivacySettings}
//                     />
//                 )}
//             </View>
//         </SafeAreaView>
//     );
// }

import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../../context/auth";
import { fetchUser, updateUser } from "../../redux/slices/user/userSlice";
import SettingsHeader from '../../components/settings/SettingsHeader';
import ProfileSection from '../../components/settings/ProfileSection';
import NotificationSection from '../../components/settings/NotificationSection';
import SecuritySection from '../../components/settings/SecuritySection';
import NotificationPanel from "../../components/prediction/NotificationPanel";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useExpoNotifications } from "../../hooks/prediction/useExpoNotif";

export default function Settings() {
    const dispatch = useDispatch();
    const { token } = useAuth();
    const navigation = useNavigation();

    const { userData, loading, updating } = useSelector((state) => state.user);
    const [activeTab, setActiveTab] = useState("profile");
    const [showNotifPanel, setShowNotifPanel] = useState(false);

    const { unreadCount, markAllRead, fetchUnreadCount } = useExpoNotifications(token);

    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
        profilePic: null,
        family: { _id: "", name: "", invitationCode: "" },
    });

    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        billReminders: true,
        usageAlerts: true,
        pushNotifications: false,
    });

    const [privacySettings, setPrivacySettings] = useState({
        twoFactorAuth: false,
        biometricLogin: false,
        shareUsageData: false,
    });

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    useFocusEffect(
        React.useCallback(() => {
            if (token) fetchUnreadCount();
        }, [token])
    );

    useEffect(() => {
        if (userData) {
            setProfile({
                firstName: userData.firstName || "",
                lastName: userData.lastName || "",
                email: userData.email || "",
                phoneNumber: userData.phoneNumber || "",
                address: userData.address || "",
                profilePic: userData.profilePic || null,
                family: {
                    _id: userData.family?._id || "",
                    name: userData.family?.name || "",
                    invitationCode: userData.family?.invitationCode || "",
                },
            });
        }
    }, [userData]);

    const profilePicUrl = userData?.profilePic || null;

    const handleUpdateProfile = async (updatedFields) => {
        try {
            const resultAction = await dispatch(updateUser(updatedFields));
            if (updateUser.rejected.match(resultAction)) {
                throw new Error(resultAction.payload || "Update failed");
            }
            Alert.alert("Success", "Profile updated successfully!");
        } catch (err) {
            Alert.alert("Update Failed", err?.message || "Failed to update profile");
        }
    };

    const handleChangePassword = () => {
        console.log("Change password pressed");
    };

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
                <SettingsHeader
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    navigation={navigation}
                    unreadCount={unreadCount}
                    onBellPress={() => setShowNotifPanel(true)}
                />

                {activeTab === "profile" && (
                    <ProfileSection
                        profile={profile}
                        setProfile={setProfile}
                        profilePicUrl={profilePicUrl}
                        onChangePassword={handleChangePassword}
                        onUpdateProfile={handleUpdateProfile}
                        isUpdating={updating}
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

            <NotificationPanel
                visible={showNotifPanel}
                onClose={() => setShowNotifPanel(false)}
                authToken={token}
                onMarkAllRead={markAllRead}
            />
        </SafeAreaView>
    );
}