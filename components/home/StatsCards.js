import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function StatsCards({ statsData }) {
  return (
    <View className="px-4 pb-4">
      <View className="flex-row gap-3 mb-3">
        <View className="flex-1 bg-white rounded-2xl p-4 border border-slate-200">
          <Text className="text-2xl mb-2">💰</Text>
          <Text className="text-sm text-slate-600 mb-1">Total Spent</Text>
          <Text className="text-xl font-bold text-slate-900">
            ₱{statsData.totalSpent.toLocaleString()}
          </Text>
        </View>
        <View className="flex-1 bg-white rounded-2xl p-4 border border-slate-200">
          <Text className="text-2xl mb-2">💵</Text>
          <Text className="text-sm text-slate-600 mb-1">Saved</Text>
          <Text className="text-xl font-bold text-green-600">
            ₱{statsData.savedAmount.toLocaleString()}
          </Text>
        </View>
      </View>
      <View className="flex-row gap-3">
        <View className="flex-1 bg-white rounded-2xl p-4 border border-slate-200">
          <Text className="text-2xl mb-2">📄</Text>
          <Text className="text-sm text-slate-600 mb-1">Bills Paid</Text>
          <Text className="text-xl font-bold text-slate-900">
            {statsData.billsPaid}
          </Text>
        </View>
        <View className="flex-1 bg-white rounded-2xl p-4 border border-slate-200">
          <Text className="text-2xl mb-2">⚡</Text>
          <Text className="text-sm text-slate-600 mb-1">Efficiency</Text>
          <Text className="text-xl font-bold text-blue-600">
            {statsData.efficiency}%
          </Text>
        </View>
      </View>
    </View>
  );
}
