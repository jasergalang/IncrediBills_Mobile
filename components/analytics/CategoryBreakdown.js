import React from "react";
import { View, Text } from "react-native";

export default function CategoryBreakdown({ categories }) {
  return (
    <View className="px-4 pb-4">
      <View className="bg-white rounded-2xl p-5 border border-slate-200">
        <Text className="text-base font-bold text-slate-900 mb-4">
          Category Breakdown
        </Text>
        {categories.map((cat, idx) => (
          <View key={idx} className="mb-3">
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-row items-center gap-2 flex-1">
                <Text className="text-xl">{cat.icon}</Text>
                <Text className="font-semibold text-slate-900 text-sm flex-1">
                  {cat.name}
                </Text>
              </View>
              <Text className="font-bold text-slate-900">{cat.percent}%</Text>
            </View>
            <View className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <View
                className={`h-full bg-${cat.color}-500 rounded-full`}
                style={{ width: `${cat.percent}%` }}
              />
            </View>
            <Text className="text-xs text-slate-500 mt-1">
              ₱{cat.amount.toLocaleString()}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
