import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TipsSection() {
    const tips = [
        {
            icon: "list-outline",
            title: "Make a Shopping List",
            description: "Plan your purchases to avoid impulse buying",
        },
        {
            icon: "pricetag-outline",
            title: "Look for Discounts",
            description: "Check for sales and use coupons when shopping",
        },
        {
            icon: "calendar-outline",
            title: "Buy in Bulk",
            description: "Purchase frequently used items in larger quantities",
        },
    ];

    return (
        <View className="px-4 pb-6">
            <View className="flex-row items-center mb-3">
                <View className="w-8 h-8 bg-green-100 rounded-lg items-center justify-center mr-2">
                    <Ionicons name="bulb" size={18} color="#22c55e" />
                </View>
                <Text className="text-lg font-bold text-slate-900">
                    Money Saving Tips
                </Text>
            </View>

            <View className="bg-green-50 rounded-xl p-4 border border-green-200">
                {tips.map((tip, index) => (
                    <View
                        key={index}
                        className={`flex-row items-start ${index < tips.length - 1 ? "mb-4 pb-4 border-b border-green-200" : ""
                            }`}
                    >
                        <View className="w-10 h-10 bg-white rounded-lg items-center justify-center mr-3">
                            <Ionicons name={tip.icon} size={20} color="#22c55e" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-sm font-bold text-slate-900 mb-1">
                                {tip.title}
                            </Text>
                            <Text className="text-xs text-slate-600">{tip.description}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
}