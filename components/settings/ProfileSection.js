import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ProfileSection({ profile, setProfile, onChangePassword }) {
  const [imagePreview, setImagePreview] = useState(profile?.profilePic?.[0]?.url || null);
  const [loading, setLoading] = useState(false);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImagePreview(result.assets[0].uri);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Success", "Your profile has been updated successfully.");
    }, 1000);
  };

  return (
    <ScrollView className="flex-1 bg-slate-50">
      <View className="p-4 space-y-4">
        {/* Profile Picture Section */}
        <View className="bg-white rounded-2xl border border-slate-200 p-6">
          <Text className="text-lg font-bold text-slate-900 mb-4">
            Profile Picture
          </Text>

          <View className="items-center mb-6">
            {/* Avatar Display */}
            <View className="relative">
              <View className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-600 items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <Image
                    source={{ uri: imagePreview }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                ) : (
                  <Text className="text-6xl">👤</Text>
                )}
              </View>
            </View>

            {/* Profile Actions */}
            <View className="mt-4 w-full space-y-2">
              <TouchableOpacity
                onPress={handleImagePick}
                className="px-6 py-3 bg-blue-600 rounded-xl items-center"
              >
                <Text className="text-white font-semibold">
                  📸 Upload Photo
                </Text>
              </TouchableOpacity>
              
              {imagePreview && (
                <TouchableOpacity
                  onPress={handleRemoveImage}
                  className="px-6 py-3 bg-red-100 rounded-xl items-center"
                >
                  <Text className="text-red-700 font-semibold">
                    ✕ Remove Photo
                  </Text>
                </TouchableOpacity>
              )}
              
              <Text className="text-sm text-slate-500 text-center mt-2">
                JPG, PNG up to 5MB
              </Text>
            </View>
          </View>
        </View>

        {/* Personal Information Section */}
        <View className="bg-white rounded-2xl border border-slate-200 p-6">
          <Text className="text-lg font-bold text-slate-900 mb-4">
            Personal Information
          </Text>

          <View className="space-y-4">
            {/* First Name */}
            <View>
              <Text className="text-sm font-semibold text-slate-700 mb-2">
                First Name
              </Text>
              <TextInput
                value={profile?.firstName || ""}
                onChangeText={(text) =>
                  setProfile({ ...profile, firstName: text })
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white"
                placeholder="Enter your first name"
              />
            </View>

            {/* Last Name */}
            <View>
              <Text className="text-sm font-semibold text-slate-700 mb-2">
                Last Name
              </Text>
              <TextInput
                value={profile?.lastName || ""}
                onChangeText={(text) =>
                  setProfile({ ...profile, lastName: text })
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white"
                placeholder="Enter your last name"
              />
            </View>

            {/* Email */}
            <View>
              <Text className="text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </Text>
              <TextInput
                value={profile?.email || ""}
                onChangeText={(text) =>
                  setProfile({ ...profile, email: text })
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white"
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Phone */}
            <View>
              <Text className="text-sm font-semibold text-slate-700 mb-2">
                Phone Number
              </Text>
              <TextInput
                value={profile?.phoneNumber || ""}
                onChangeText={(text) =>
                  setProfile({ ...profile, phoneNumber: text })
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white"
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
              />
            </View>

            {/* Address */}
            <View>
              <Text className="text-sm font-semibold text-slate-700 mb-2">
                Address
              </Text>
              <TextInput
                value={profile?.address || ""}
                onChangeText={(text) =>
                  setProfile({ ...profile, address: text })
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white"
                placeholder="Enter your address"
                multiline
              />
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row gap-3 mt-6">
            <TouchableOpacity
              onPress={handleSave}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl items-center"
            >
              <Text className="text-white font-semibold">
                {loading ? "💾 Saving..." : "💾 Save Changes"}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              disabled={loading}
              className="px-6 py-3 bg-slate-100 rounded-xl items-center"
            >
              <Text className="text-slate-700 font-semibold">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Family Information Section */}
        <View className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border border-slate-200 p-6">
          <Text className="text-lg font-bold text-slate-900 mb-4">
            Family Information
          </Text>

          <View className="space-y-4">
            {/* Family Name */}
            <View>
              <Text className="text-sm font-semibold text-slate-700 mb-2">
                Family Name 👨‍👩‍👧‍👦
              </Text>
              <View className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white flex-row items-center justify-between">
                <Text className="font-medium text-slate-600">
                  {profile?.family?.name || "Not set"}
                </Text>
                <Text className="text-xs text-slate-400">Read-only</Text>
              </View>
              <Text className="text-xs text-slate-400 mt-1">
                Family ID: {profile?.family?._id || "None"}
              </Text>
            </View>

            {/* Invitation Code */}
            <View>
              <Text className="text-sm font-semibold text-slate-700 mb-2">
                Invitation Code 🔑
              </Text>
              <View className="flex-row gap-2">
                <View className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-white">
                  <Text className="font-mono font-semibold text-slate-600">
                    {profile?.family?.invitationCode || "No code"}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    if (profile?.family?.invitationCode) {
                      Alert.alert("Copied", "Invitation code copied to clipboard!");
                    }
                  }}
                  disabled={!profile?.family?.invitationCode}
                  className="px-4 py-3 bg-blue-600 rounded-xl items-center justify-center"
                >
                  <Text className="text-white text-xl">📋</Text>
                </TouchableOpacity>
              </View>
              <Text className="text-xs text-slate-500 mt-2">
                Share this code with family members to invite them
              </Text>
            </View>
          </View>
        </View>

        {/* Password & Security Section */}
        <View className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
          <Text className="text-lg font-bold text-slate-900 mb-2">
            Password & Security
          </Text>
          <Text className="text-slate-600 mb-4 text-sm">
            Keep your account secure by using a strong password
          </Text>
          <TouchableOpacity
            onPress={onChangePassword}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl items-center"
          >
            <Text className="text-white font-semibold">
              🔑 Change Password
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}