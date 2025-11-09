import React from "react";
import { View, Text } from "react-native";

export default function SpendingOverview({ spendingData }) {
  return (
    <View className="px-4 pb-4">
      <Text className="text-base font-bold text-slate-900 mb-3">
        Spending Overview
      </Text>
      <View className="bg-white rounded-2xl p-5 border border-slate-200">
        {spendingData.map((item, idx) => (
          <View key={idx} className="mb-3">
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-row items-center gap-2">
                <Text className="text-xl">{item.icon}</Text>
                <Text className="font-semibold text-slate-900 text-sm">
                  {item.category}
                </Text>
              </View>
              <Text className="font-bold text-slate-900">{item.percent}%</Text>
            </View>
            <View className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <View
                className={`h-full bg-${item.color}-500 rounded-full`}
                style={{ width: `${item.percent}%` }}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
