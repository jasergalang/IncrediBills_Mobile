import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TipsSection() {
    const tips = [
        {
            icon: "flame-outline",
            title: "Use Medium Heat",
            description: "Cook on medium heat to conserve gas",
        },
        {
            icon: "checkmark-circle-outline",
            title: "Regular Maintenance",
            description: "Check for leaks and clean burners regularly",
        },
        {
            icon: "timer-outline",
            title: "Efficient Cooking",
            description: "Use lids on pots to reduce cooking time",
        },
    ];

    return (
        <View className="px-4 pb-6">
            <View className="flex-row items-center mb-3">
                <View className="w-8 h-8 bg-orange-100 rounded-lg items-center justify-center mr-2">
                    <Ionicons name="bulb" size={18} color="#f97316" />
                </View>
                <Text className="text-lg font-bold text-slate-900">
                    Gas Saving Tips
                </Text>
            </View>

            <View className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                {tips.map((tip, index) => (
                    <View
                        key={index}
                        className={`flex-row items-start ${index < tips.length - 1 ? "mb-4 pb-4 border-b border-orange-200" : ""
                            }`}
                    >
                        <View className="w-10 h-10 bg-white rounded-lg items-center justify-center mr-3">
                            <Ionicons name={tip.icon} size={20} color="#f97316" />
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