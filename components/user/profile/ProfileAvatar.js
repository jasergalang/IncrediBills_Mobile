import React from "react";
import { View, Text, Image } from "react-native";

export default function ProfileAvatarCard({ name, username, image }) {
    const firstLetter = name?.charAt(0).toUpperCase();

    return (
        <View className="p-4">
            <View className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6">
                <View className="items-center">
                    <View className="w-24 h-24 bg-white rounded-full items-center justify-center mb-4 shadow-lg overflow-hidden">
                        {image ? (
                            <Image
                                source={{ uri: image }}
                                className="w-full h-full rounded-full"
                                resizeMode="cover"
                            />
                        ) : (
                            <Text className="text-4xl font-bold text-blue-500">{firstLetter}</Text>
                        )}
                    </View>
                    <Text className="text-2xl font-bold text-blue-500 mb-1">{name}</Text>
                    <Text className="text-black-100 text-sm">@{username}</Text>
                </View>
            </View>
        </View>
    );
}
