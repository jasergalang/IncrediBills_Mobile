import React from "react";
import { View, Text } from "react-native";

export default function KitchenGasSummaryCards() {
  return (
    <View className="p-4">
      <View className="rounded-2xl p-6" style={{ backgroundColor: "#fed7aa" }}>
        <View className="flex-row items-center justify-between mb-4">
          <View className="w-12 h-12 bg-orange-500 rounded-xl items-center justify-center">
            <Text className="text-2xl">🔥</Text>
          </View>
          <View className="bg-white px-3 py-1 rounded-full">
            <Text className="text-xs font-semibold text-slate-600">
              This Month
            </Text>
          </View>
        </View>
        <Text className="text-sm font-semibold text-slate-600 mb-1">
          Kitchen Gas Bill
        </Text>
        <Text className="text-3xl font-bold text-slate-900 mb-2">₱550</Text>
        <Text className="text-xs text-orange-600 font-semibold">
          ↑ 5% from last month
        </Text>
      </View>

      <View className="flex-row gap-3 mt-3">
        <View className="flex-1 bg-white rounded-xl p-4">
          <Text className="text-xs font-semibold text-slate-600 mb-1">
            Provider
          </Text>
          <Text className="text-base font-bold text-slate-900">Petron</Text>
        </View>
        <View className="flex-1 bg-white rounded-xl p-4">
          <Text className="text-xs font-semibold text-slate-600 mb-1">
            Last Refill
          </Text>
          <Text className="text-base font-bold text-slate-900">Oct 15</Text>
        </View>
      </View>
    </View>
  );
}