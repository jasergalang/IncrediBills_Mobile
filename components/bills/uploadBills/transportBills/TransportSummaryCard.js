import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function TransportSummaryCards() {
  return (
    <View className="p-4">
      <View className="flex-row gap-3 mb-3">
        <LinearGradient
          colors={["#6b7280", "#4b5563"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="flex-1 rounded-2xl p-4"
        >
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-3xl">⛽</Text>
            <View className="bg-white/20 px-2 py-1 rounded-full">
              <Text className="text-white text-xs font-bold">+12%</Text>
            </View>
          </View>
          <Text className="text-2xl font-bold text-white mb-1">₱1,850</Text>
          <Text className="text-white/80 text-xs">This Month</Text>
        </LinearGradient>
        <View className="flex-1 bg-white rounded-2xl p-4 border border-slate-200">
          <Text className="text-2xl mb-2">🚗</Text>
          <Text className="text-xl font-bold text-slate-900 mb-1">45.5 L</Text>
          <Text className="text-slate-600 text-xs">Total Liters</Text>
        </View>
      </View>
      <View className="flex-row gap-3">
        <View className="flex-1 bg-white rounded-2xl p-4 border border-slate-200">
          <View className="flex-row items-center gap-2 mb-2">
            <Ionicons name="receipt-outline" size={16} color="#6b7280" />
            <Text className="text-xs text-slate-600">Receipts</Text>
          </View>
          <Text className="text-xl font-bold text-slate-900">8</Text>
        </View>
        <View className="flex-1 bg-white rounded-2xl p-4 border border-slate-200">
          <View className="flex-row items-center gap-2 mb-2">
            <Ionicons name="cash-outline" size={16} color="#6b7280" />
            <Text className="text-xs text-slate-600">Avg/Fill</Text>
          </View>
          <Text className="text-xl font-bold text-slate-900">₱231</Text>
        </View>
      </View>
    </View>
  );
}
