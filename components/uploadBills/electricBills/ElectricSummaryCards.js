import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function ElectricSummaryCards() {
  return (
    <View className="p-4">
      <View className="flex-row gap-3 mb-6">
        <View className="flex-1">
          <LinearGradient
            colors={["#fef3c7", "#fde68a"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="rounded-2xl p-4 border-2 border-amber-200"
          >
            <View className="w-10 h-10 bg-amber-500 rounded-xl items-center justify-center mb-3">
              <Text className="text-2xl">⚡</Text>
            </View>
            <Text className="text-sm font-semibold text-slate-600 mb-1">
              Total Uploads
            </Text>
            <Text className="text-2xl font-bold text-amber-600">18</Text>
            <Text className="text-xs text-green-600 font-semibold mt-1">
              ↑ 4 this month
            </Text>
          </LinearGradient>
        </View>
        <View className="flex-1">
          <LinearGradient
            colors={["#f0fdf4", "#dcfce7"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="rounded-2xl p-4 border-2 border-green-200"
          >
            <View className="w-10 h-10 bg-green-500 rounded-xl items-center justify-center mb-3">
              <Text className="text-2xl">✓</Text>
            </View>
            <Text className="text-sm font-semibold text-slate-600 mb-1">
              Processed
            </Text>
            <Text className="text-2xl font-bold text-green-600">22</Text>
            <Text className="text-xs text-slate-500 font-semibold mt-1">
              91% success rate
            </Text>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
}
