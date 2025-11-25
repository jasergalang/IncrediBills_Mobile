import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function UtilityKPICards({ utilityKPI }) {
    const {
    totalSpending = 0,
    totalSaved = 0,
    avgMonthly = 0,
    efficiency = 0,
    change = 0,
  } = utilityKPI || {};
  return (
    <View className="px-4 py-4">
      <View className="flex-row gap-3 mb-3">
        <LinearGradient
          colors={["#2563eb", "#4f46e5"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="flex-1 rounded-2xl p-4"
        >
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-3xl">💰</Text>
            <View className="bg-white/20 px-2 py-1 rounded-full">
              <Text className="text-white text-xs font-bold">
                {change > 0 ? "↑" : "↓"}
                {Math.abs(change)}%
              </Text>
            </View>
          </View>
          <Text className="text-2xl font-bold text-white mb-1">
            ₱{totalSpending.toLocaleString()}
          </Text>
          <Text className="text-white/80 text-xs">Total Spending</Text>
        </LinearGradient>
        <LinearGradient
          colors={["#10b981", "#059669"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="flex-1 rounded-2xl p-4"
        >
          <Text className="text-3xl mb-2">💵</Text>
          <Text className="text-2xl font-bold text-white mb-1">
            ₱{totalSaved.toLocaleString()}
          </Text>
          <Text className="text-white/80 text-xs">Total Saved</Text>
        </LinearGradient>
      </View>
      <View className="flex-row gap-3">
        <View className="flex-1 bg-white rounded-2xl p-4 border border-slate-200">
          <Text className="text-2xl mb-2">📊</Text>
          <Text className="text-xl font-bold text-slate-900 mb-1">
            ₱{avgMonthly.toLocaleString()}
          </Text>
          <Text className="text-slate-600 text-xs">Avg. Monthly</Text>
        </View>
        <View className="flex-1 bg-white rounded-2xl p-4 border border-slate-200">
          <Text className="text-2xl mb-2">⚡</Text>
          <Text className="text-xl font-bold text-slate-900 mb-1">
            {efficiency}%
          </Text>
          <Text className="text-slate-600 text-xs">Efficiency</Text>
        </View>
      </View>
    </View>
  );
}
