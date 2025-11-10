import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PredictionSection({ bill }) {
    const difference = bill.predictedCost - bill.scannedCost;
    const percentChange = ((difference / bill.scannedCost) * 100).toFixed(1);

    return (
        <View className="px-4 pb-4">
            <View className="flex-row items-center mb-3">
                <View className="w-8 h-8 bg-purple-100 rounded-lg items-center justify-center mr-2">
                    <Ionicons name="analytics" size={18} color="#a855f7" />
                </View>
                <Text className="text-lg font-bold text-slate-900">
                    Next Month Prediction
                </Text>
            </View>

            <View className="bg-white rounded-xl p-4">
                <View className="flex-row justify-between items-center mb-4 pb-4 border-b border-slate-100">
                    <View className="flex-1">
                        <Text className="text-xs font-semibold text-slate-600 mb-1">
                            Estimated Cost
                        </Text>
                        <Text className="text-2xl font-bold text-slate-900">
                            ₱{bill.predictedCost.toFixed(2)}
                        </Text>
                    </View>
                    <View className="w-px h-12 bg-slate-200 mx-4" />
                    <View className="flex-1">
                        <Text className="text-xs font-semibold text-slate-600 mb-1">
                            Estimated Items
                        </Text>
                        <Text className="text-2xl font-bold text-slate-900">
                            {bill.predictedItems}
                        </Text>
                    </View>
                </View>

                <View className="bg-green-50 rounded-xl p-3 border border-green-200">
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center flex-1">
                            <Ionicons
                                name={difference > 0 ? "trending-up" : "trending-down"}
                                size={20}
                                color={difference > 0 ? "#ef4444" : "#22c55e"}
                            />
                            <Text className="text-sm font-semibold text-slate-700 ml-2">
                                {difference > 0 ? "Expected Increase" : "Expected Savings"}
                            </Text>
                        </View>
                        <View className="flex-row items-center">
                            <Text
                                className={`text-lg font-bold ${difference > 0 ? "text-red-600" : "text-green-600"
                                    }`}
                            >
                                {difference > 0 ? "+" : ""}₱{Math.abs(difference).toFixed(2)}
                            </Text>
                            <Text
                                className={`text-sm font-semibold ml-2 ${difference > 0 ? "text-red-600" : "text-green-600"
                                    }`}
                            >
                                ({Math.abs(percentChange)}%)
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}