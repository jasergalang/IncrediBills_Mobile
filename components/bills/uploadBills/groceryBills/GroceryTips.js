import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function GroceryTips({ category }) {
    const tips = [
        "Make a shopping list to avoid impulse buying",
        "Buy in bulk for items you use frequently",
        "Compare prices across different stores",
        "Look for sales and use coupons when available",
    ];

    return (
        <View className="px-4 pb-6">
            <View className="bg-green-50 rounded-2xl p-4 border border-green-200">
                <View className="flex-row items-center mb-3">
                    <View className="w-8 h-8 bg-green-500 rounded-lg items-center justify-center mr-2">
                        <Ionicons name="bulb" size={18} color="white" />
                    </View>
                    <Text className="text-base font-bold text-slate-900">
                        Money Saving Tips
                    </Text>
                </View>
                {tips.map((tip, index) => (
                    <View key={index} className="flex-row items-start mb-2">
                        <Text className="text-green-500 mr-2">•</Text>
                        <Text className="text-sm text-slate-700 flex-1">{tip}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}