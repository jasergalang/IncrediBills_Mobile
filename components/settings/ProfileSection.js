import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import ProfileAvatar from "./profile/ProfileAvatar";
import PersonalInformation from "./profile/PersonalInformation";
import FamilyInformation from "./profile/FamilyInformation";
import SecurityPassword from "./profile/SecurityPassword";

export default function ProfileSection({ profile, setProfile, profilePicUrl, onChangePassword }) {
  const [imagePreview, setImagePreview] = useState(null);

  // Update imagePreview when profilePicUrl changes
  useEffect(() => {
    setImagePreview(profilePicUrl);
  }, [profilePicUrl]);

  return (
    <ScrollView
      className="flex-1 bg-slate-50"
      contentContainerStyle={{ padding: 16 }}
      keyboardShouldPersistTaps="handled"
    >
      <View>

        <View className="mb-3">
          <ProfileAvatar
            profile={profile}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
          />
        </View>

        <View className="mb-3">
          <PersonalInformation
            profile={profile}
            setProfile={setProfile}
          />
        </View>

        <View className="mb-3">
          <FamilyInformation
            profile={profile}
            setProfile={setProfile}
          />
        </View>

        <View className="mb-3">
          <SecurityPassword
            profile={profile}
            onChangePassword={onChangePassword}
          />
        </View>

        <View style={{ height: 12 }} />

      </View>
    </ScrollView>
  );
}