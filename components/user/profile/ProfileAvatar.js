import React from "react";
import { View, Text } from "react-native";

export default function ProfileAvatarCard({ name, username }) {
    return (
        <View className="p-4">
            <View className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6">
                <View className="items-center">
                    <View className="w-24 h-24 bg-white rounded-full items-center justify-center mb-4 shadow-lg">
                        <Text className="text-4xl font-bold text-blue-500">
                            {name.charAt(0).toUpperCase()}
                        </Text>
                    </View>
                    <Text className="text-2xl font-bold text-white mb-1">{name}</Text>
                    <Text className="text-blue-100 text-sm">@{username}</Text>
                </View>
            </View>
        </View>
    );
}