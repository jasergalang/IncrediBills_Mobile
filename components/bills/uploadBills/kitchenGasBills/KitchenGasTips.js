import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function KitchenGasTips() {
    const tips = [
        "Keep your gas tank in a well-ventilated area",
        "Check for leaks regularly with soapy water",
        "Turn off the valve when not in use",
        "Schedule regular refills to avoid running out",
    ];

    return (
        <View className="px-4 pb-6">
            <View className="bg-orange-50 rounded-2xl p-4 border border-orange-200">
                <View className="flex-row items-center mb-3">
                    <View className="w-8 h-8 bg-orange-500 rounded-lg items-center justify-center mr-2">
                        <Ionicons name="bulb" size={18} color="white" />
                    </View>
                    <Text className="text-base font-bold text-slate-900">
                        Safety Tips
                    </Text>
                </View>
                {tips.map((tip, index) => (
                    <View key={index} className="flex-row items-start mb-2">
                        <Text className="text-orange-500 mr-2">•</Text>
                        <Text className="text-sm text-slate-700 flex-1">{tip}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}