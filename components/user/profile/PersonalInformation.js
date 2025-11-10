import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PersonalInformation({
    isEditing,
    email,
    setEmail,
    username,
    setUsername,
    name,
    setName,
    onSave,
}) {
    return (
        <View className="px-4 pb-4">
            <View className="flex-row items-center mb-3">
                <View className="w-8 h-8 bg-blue-100 rounded-lg items-center justify-center mr-2">
                    <Ionicons name="person" size={18} color="#3b82f6" />
                </View>
                <Text className="text-lg font-bold text-slate-900">
                    Personal Information
                </Text>
            </View>

            {/* Email */}
            <View className="bg-white rounded-2xl p-4 mb-3 border border-slate-200">
                <View className="flex-row items-center mb-2">
                    <Ionicons name="mail-outline" size={18} color="#64748b" />
                    <Text className="text-xs font-semibold text-slate-600 ml-2">
                        Email Address
                    </Text>
                </View>
                {isEditing ? (
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        className="text-base text-slate-900 p-3 bg-slate-50 rounded-lg"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                ) : (
                    <Text className="text-base font-semibold text-slate-900">{email}</Text>
                )}
            </View>

            {/* Username */}
            <View className="bg-white rounded-2xl p-4 mb-3 border border-slate-200">
                <View className="flex-row items-center mb-2">
                    <Ionicons name="at-outline" size={18} color="#64748b" />
                    <Text className="text-xs font-semibold text-slate-600 ml-2">
                        Username
                    </Text>
                </View>
                {isEditing ? (
                    <TextInput
                        value={username}
                        onChangeText={setUsername}
                        className="text-base text-slate-900 p-3 bg-slate-50 rounded-lg"
                        autoCapitalize="none"
                    />
                ) : (
                    <Text className="text-base font-semibold text-slate-900">@{username}</Text>
                )}
            </View>

            {/* Name */}
            <View className="bg-white rounded-2xl p-4 mb-3 border border-slate-200">
                <View className="flex-row items-center mb-2">
                    <Ionicons name="person-outline" size={18} color="#64748b" />
                    <Text className="text-xs font-semibold text-slate-600 ml-2">
                        Full Name
                    </Text>
                </View>
                {isEditing ? (
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        className="text-base text-slate-900 p-3 bg-slate-50 rounded-lg"
                    />
                ) : (
                    <Text className="text-base font-semibold text-slate-900">{name}</Text>
                )}
            </View>

            {/* Save Button */}
            {isEditing && (
                <TouchableOpacity
                    onPress={onSave}
                    className="bg-blue-500 rounded-2xl p-4 items-center mb-4 shadow-sm"
                    activeOpacity={0.8}
                >
                    <Text className="text-white font-bold text-base">
                        💾 Save Changes
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
}