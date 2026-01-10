import React, { useState }from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, ScrollView, View, } from "react-native";
import SettingsHeader from '../../components/settings/SettingsHeader';
import SettingsTabs from '../../components/settings/SettingsTab';
import ProfileSection from '../../components/settings/ProfileSection';
import NotificationSection from '../../components/settings/NotificationSection';
import SecuritySection from '../../components/settings/SecuritySection';
export default function Settings() {
    const [activeTab, setActiveTab] = useState("profile");

    // User Profile State
    const [profile, setProfile] = useState({
        firstName: "Juan",
        lastName: "Dela Cruz",
        email: "juan.delacruz@email.com",
        phoneNumber: "+63 917 123 4567",
        address: "123 Manila Street, Quezon City",
        profilePic: [],
        family: {
            _id: "fam123",
            name: "Dela Cruz Family",
            invitationCode: "DELCRUZ2024",
        },
    });

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
    };
 return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="flex-1">
        {/* Header with Tabs */}
        <SettingsHeader activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content based on active tab */}
        {activeTab === "profile" && (
          <ProfileSection
            profile={profile}
            setProfile={setProfile}
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
