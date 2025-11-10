import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function GroceryHeader({ navigation, category }) {
    return (
        <View className="px-4 py-3 bg-white border-b border-slate-200">
            <View className="flex-row items-center justify-between">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="w-10 h-10 items-center justify-center"
                >
                    <Ionicons name="arrow-back" size={24} color="#334155" />
                </TouchableOpacity>
                <View className="flex-1 items-center">
                    <View className="flex-row items-center gap-2">
                        <Text className="text-3xl">{category.icon}</Text>
                        <Text className="text-lg font-bold text-slate-900">
                            {category.name} Bills
                        </Text>
                    </View>
                </View>
                <View className="w-10" />
            </View>
        </View>
    );
}