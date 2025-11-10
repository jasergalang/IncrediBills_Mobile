import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function BillInfoCard({ bill }) {
    return (
        <View className="p-4">
            <View className="rounded-2xl p-6" style={{ backgroundColor: "#fed7aa" }}>
                <View className="flex-row items-center justify-between mb-4">
                    <View className="w-14 h-14 bg-orange-500 rounded-xl items-center justify-center">
                        <Text className="text-3xl">🔥</Text>
                    </View>
                    <View
                        className={`px-3 py-1 rounded-full ${bill.status === "uploaded" ? "bg-green-100" : "bg-yellow-100"
                            }`}
                    >
                        <Text
                            className={`text-xs font-semibold ${bill.status === "uploaded"
                                    ? "text-green-700"
                                    : "text-yellow-700"
                                }`}
                        >
                            {bill.status === "uploaded" ? "✓ Processed" : "Processing..."}
                        </Text>
                    </View>
                </View>
                <Text className="text-sm font-semibold text-slate-600 mb-1">
                    Kitchen Gas Bill
                </Text>
                <Text className="text-4xl font-bold text-slate-900 mb-2">
                    ₱{bill.scannedCost.toFixed(2)}
                </Text>
                <View className="flex-row items-center">
                    <Ionicons name="calendar-outline" size={14} color="#64748b" />
                    <Text className="text-xs text-slate-600 ml-1">{bill.date}</Text>
                </View>
            </View>
        </View>
    );
}