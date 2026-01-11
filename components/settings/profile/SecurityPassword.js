import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SecurityPassword() {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = () => {
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

  return (
    <View className="bg-white rounded-2xl border border-slate-200 p-6">
      <Text className="text-lg font-bold text-slate-900 mb-2">
        Password & Security
      </Text>
      <Text className="text-slate-600 mb-6 text-sm leading-5">
        Keep your account secure by using a strong password
      </Text>

      {/* Change Password Toggle Button */}
      <TouchableOpacity
        onPress={() => setShowChangePassword(!showChangePassword)}
        className="px-6 py-3 bg-amber-500 rounded-xl items-center flex-row justify-center"
      >
        <Ionicons 
          name={showChangePassword ? "chevron-up" : "lock-closed"} 
          size={18} 
          color="#ffffff" 
          style={{ marginRight: 8 }}
        />
        <Text className="text-white font-semibold">
          {showChangePassword ? "Hide Password Form" : "🔑 Change Password"}
        </Text>
      </TouchableOpacity>

      {/* Change Password Form */}
      {showChangePassword && (
        <View className="mt-6 bg-amber-50 rounded-xl p-4 border border-amber-200">
          <View className="mb-4">
            <Text className="text-xs font-semibold text-slate-600 mb-2">
              Current Password
            </Text>
            <TextInput
              value={currentPassword}
              onChangeText={setCurrentPassword}
              className="text-base text-slate-900 p-3 bg-white rounded-lg border border-slate-200"
              secureTextEntry
              placeholder="Enter current password"
              placeholderTextColor="#94a3b8"
            />
          </View>

          <View className="mb-4">
            <Text className="text-xs font-semibold text-slate-600 mb-2">
              New Password
            </Text>
            <TextInput
              value={newPassword}
              onChangeText={setNewPassword}
              className="text-base text-slate-900 p-3 bg-white rounded-lg border border-slate-200"
              secureTextEntry
              placeholder="Enter new password"
              placeholderTextColor="#94a3b8"
            />
          </View>

          <View className="mb-4">
            <Text className="text-xs font-semibold text-slate-600 mb-2">
              Confirm New Password
            </Text>
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              className="text-base text-slate-900 p-3 bg-white rounded-lg border border-slate-200"
              secureTextEntry
              placeholder="Confirm new password"
              placeholderTextColor="#94a3b8"
            />
          </View>

          <TouchableOpacity
            onPress={handleChangePassword}
            className="bg-amber-600 rounded-xl p-4 items-center"
            activeOpacity={0.8}
          >
            <Text className="text-white font-bold text-base">
              🔐 Update Password
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}