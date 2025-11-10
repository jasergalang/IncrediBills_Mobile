import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function KitchenGasActions() {
    const actions = [
        {
            icon: "calendar-outline",
            label: "Schedule Refill",
            color: "#f97316",
        },
        {
            icon: "notifications-outline",
            label: "Set Reminder",
            color: "#f97316",
        },
        {
            icon: "document-text-outline",
            label: "View History",
            color: "#f97316",
        },
    ];

    return (
        <View className="px-4 pb-4">
            <Text className="text-lg font-bold text-slate-900 mb-3">
                Quick Actions
            </Text>
            <View className="flex-row gap-3">
                {actions.map((action, index) => (
                    <TouchableOpacity
                        key={index}
                        className="flex-1 bg-white rounded-xl p-4 items-center"
                        activeOpacity={0.7}
                    >
                        <View
                            className="w-12 h-12 rounded-xl items-center justify-center mb-2"
                            style={{ backgroundColor: "#fed7aa" }}
                        >
                            <Ionicons name={action.icon} size={24} color={action.color} />
                        </View>
                        <Text className="text-xs font-semibold text-slate-700 text-center">
                            {action.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}