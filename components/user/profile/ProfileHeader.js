import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileHeader({ navigation, isEditing, setIsEditing }) {
    return (
        <View className="bg-white border-b border-slate-200">
            <View className="px-4 py-3 flex-row items-center justify-between">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="w-10 h-10 items-center justify-center"
                >
                    <Ionicons name="arrow-back" size={24} color="#334155" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-slate-900">My Profile</Text>
                <TouchableOpacity
                    onPress={() => setIsEditing(!isEditing)}
                    className="w-10 h-10 items-center justify-center"
                >
                    <Ionicons
                        name={isEditing ? "close" : "create-outline"}
                        size={24}
                        color="#3b82f6"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}