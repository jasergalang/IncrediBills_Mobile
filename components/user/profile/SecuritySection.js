import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SecuritySection({
    showChangePassword,
    setShowChangePassword,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    onChangePassword,
}) {
    return (
        <View className="px-4 pb-4">
            <View className="flex-row items-center mb-3">
                <View className="w-8 h-8 bg-purple-100 rounded-lg items-center justify-center mr-2">
                    <Ionicons name="shield-checkmark" size={18} color="#a855f7" />
                </View>
                <Text className="text-lg font-bold text-slate-900">Security</Text>
            </View>

            {/* Change Password Toggle */}
            <TouchableOpacity
                onPress={() => setShowChangePassword(!showChangePassword)}
                className="bg-white rounded-2xl p-4 mb-3 flex-row items-center justify-between border border-slate-200"
                activeOpacity={0.7}
            >
                <View className="flex-row items-center flex-1">
                    <View className="w-12 h-12 bg-purple-100 rounded-xl items-center justify-center mr-3">
                        <Ionicons name="lock-closed" size={22} color="#a855f7" />
                    </View>
                    <View className="flex-1">
                        <Text className="text-base font-bold text-slate-900 mb-1">
                            Change Password
                        </Text>
                        <Text className="text-xs text-slate-600">
                            Update your password regularly
                        </Text>
                    </View>
                </View>
                <Ionicons
                    name={showChangePassword ? "chevron-up" : "chevron-forward"}
                    size={20}
                    color="#94a3b8"
                />
            </TouchableOpacity>

            {/* Change Password Form */}
            {showChangePassword && (
                <View className="bg-white rounded-2xl p-4 mb-3 border border-purple-200">
                    <View className="mb-3">
                        <Text className="text-xs font-semibold text-slate-600 mb-2">
                            Current Password
                        </Text>
                        <TextInput
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                            className="text-base text-slate-900 p-3 bg-slate-50 rounded-lg border border-slate-200"
                            secureTextEntry
                            placeholder="Enter current password"
                            placeholderTextColor="#94a3b8"
                        />
                    </View>

                    <View className="mb-3">
                        <Text className="text-xs font-semibold text-slate-600 mb-2">
                            New Password
                        </Text>
                        <TextInput
                            value={newPassword}
                            onChangeText={setNewPassword}
                            className="text-base text-slate-900 p-3 bg-slate-50 rounded-lg border border-slate-200"
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
                            className="text-base text-slate-900 p-3 bg-slate-50 rounded-lg border border-slate-200"
                            secureTextEntry
                            placeholder="Confirm new password"
                            placeholderTextColor="#94a3b8"
                        />
                    </View>

                    <TouchableOpacity
                        onPress={onChangePassword}
                        className="bg-purple-500 rounded-xl p-4 items-center"
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