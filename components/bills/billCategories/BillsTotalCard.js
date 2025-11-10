import React from "react";
import { View, Text } from "react-native";

export default function BillsTotalCard({ totalAmount }) {
  return (
    <View className="p-4">
      <View
        className="rounded-2xl p-6"
        style={{ backgroundColor: "#eff6ff" }}
      >
        <View className="flex-row items-center justify-between mb-4">
          <View className="w-12 h-12 bg-blue-500 rounded-xl items-center justify-center">
            <Text className="text-2xl">💰</Text>
          </View>
          <View className="bg-white px-3 py-1 rounded-full">
            <Text className="text-xs font-semibold text-slate-600">
              This Month
            </Text>
          </View>
        </View>
        <Text className="text-sm font-semibold text-slate-600 mb-1">
          Total Bills
        </Text>
        <Text className="text-3xl font-bold text-slate-900 mb-2">
          ₱{totalAmount.toLocaleString()}
        </Text>
        <Text className="text-xs text-green-600 font-semibold">
          ↓ 8.5% from last month
        </Text>
      </View>
    </View>
  );
}