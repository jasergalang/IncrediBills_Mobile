import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ScannedDataSection({ bill }) {
    return (
        <View className="px-4 pb-4">
            <View className="flex-row items-center mb-3">
                <View className="w-8 h-8 bg-green-100 rounded-lg items-center justify-center mr-2">
                    <Ionicons name="scan" size={18} color="#22c55e" />
                </View>
                <Text className="text-lg font-bold text-slate-900">
                    Scanned Information
                </Text>
            </View>

            <View className="bg-white rounded-xl p-4">
                <View className="flex-row justify-between items-center mb-4 pb-4 border-b border-slate-100">
                    <View className="flex-1">
                        <Text className="text-xs font-semibold text-slate-600 mb-1">
                            Total Cost
                        </Text>
                        <Text className="text-2xl font-bold text-slate-900">
                            ₱{bill.scannedCost.toFixed(2)}
                        </Text>
                    </View>
                    <View className="w-px h-12 bg-slate-200 mx-4" />
                    <View className="flex-1">
                        <Text className="text-xs font-semibold text-slate-600 mb-1">
                            Total Items
                        </Text>
                        <Text className="text-2xl font-bold text-slate-900">
                            {bill.scannedItems}
                        </Text>
                    </View>
                </View>

                <View className="space-y-3">
                    <View className="flex-row justify-between items-center">
                        <Text className="text-sm text-slate-600">Average per Item</Text>
                        <Text className="text-sm font-bold text-slate-900">
                            ₱{(bill.scannedCost / bill.scannedItems).toFixed(2)}
                        </Text>
                    </View>
                    <View className="flex-row justify-between items-center">
                        <Text className="text-sm text-slate-600">Purchase Date</Text>
                        <Text className="text-sm font-bold text-slate-900">
                            {bill.scannedDate}
                        </Text>
                    </View>
                    <View className="flex-row justify-between items-center">
                        <Text className="text-sm text-slate-600">Store</Text>
                        <Text className="text-sm font-bold text-slate-900">
                            SM Supermarket
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}