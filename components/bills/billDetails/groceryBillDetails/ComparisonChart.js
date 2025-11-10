import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ComparisonChart({ bill }) {
    const months = [
        { month: "Jul", cost: 3800 },
        { month: "Aug", cost: 3650 },
        { month: "Sep", cost: 3900 },
        { month: "Oct", cost: bill.scannedCost },
        { month: "Nov", cost: bill.predictedCost, isPrediction: true },
    ];

    const maxCost = Math.max(...months.map((m) => m.cost));

    return (
        <View className="px-4 pb-4">
            <View className="flex-row items-center mb-3">
                <View className="w-8 h-8 bg-green-100 rounded-lg items-center justify-center mr-2">
                    <Ionicons name="bar-chart" size={18} color="#22c55e" />
                </View>
                <Text className="text-lg font-bold text-slate-900">
                    Spending Trends
                </Text>
            </View>

            <View className="bg-white rounded-xl p-4">
                <View className="flex-row justify-between items-end h-40 mb-4">
                    {months.map((item, index) => {
                        const height = (item.cost / maxCost) * 100;
                        return (
                            <View key={index} className="flex-1 items-center">
                                <View className="w-full px-1">
                                    <View
                                        className={`w-full rounded-t-lg ${item.isPrediction ? "bg-green-300" : "bg-green-500"
                                            }`}
                                        style={{ height: `${height}%` }}
                                    />
                                </View>
                                <Text className="text-xs font-semibold text-slate-600 mt-2">
                                    {item.month}
                                </Text>
                                <Text className="text-xs text-slate-500">
                                    ₱{item.cost.toFixed(0)}
                                </Text>
                            </View>
                        );
                    })}
                </View>

                <View className="flex-row items-center justify-center space-x-4">
                    <View className="flex-row items-center">
                        <View className="w-3 h-3 rounded-full bg-green-500 mr-1" />
                        <Text className="text-xs text-slate-600">Actual</Text>
                    </View>
                    <View className="flex-row items-center">
                        <View className="w-3 h-3 rounded-full bg-green-300 mr-1" />
                        <Text className="text-xs text-slate-600">Predicted</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}