import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AccountActions({ onLogout }) {
    return (
        <View className="px-4 pb-6">
            <View className="flex-row items-center mb-3">
                <View className="w-8 h-8 bg-slate-100 rounded-lg items-center justify-center mr-2">
                    <Ionicons name="settings" size={18} color="#64748b" />
                </View>
                <Text className="text-lg font-bold text-slate-900">
                    Account Actions
                </Text>
            </View>

            {/* Logout */}
            <TouchableOpacity
                onPress={onLogout}
                className="bg-red-50 rounded-2xl p-4 flex-row items-center justify-center border-2 border-red-200"
                activeOpacity={0.7}
            >
                <View className="w-10 h-10 bg-red-100 rounded-lg items-center justify-center mr-3">
                    <Ionicons name="log-out-outline" size={22} color="#ef4444" />
                </View>
                <Text className="text-red-600 font-bold text-base">
                    Logout from Account
                </Text>
            </TouchableOpacity>
        </View>
    );
}