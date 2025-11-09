import React from "react";
import { View, Text } from "react-native";

export default function SpendingTrendsChart({ spendingData }) {
  const maxSpending = Math.max(...spendingData.map((d) => d.amount));
  return (
    <View className="px-4 pb-4">
      <View className="bg-white rounded-2xl p-5 border border-slate-200">
        <Text className="text-base font-bold text-slate-900 mb-4">
          Spending Trends
        </Text>
        <View className="h-48 flex-row items-end justify-between gap-2">
          {spendingData.map((data, idx) => {
            const height = (data.amount / maxSpending) * 100;
            return (
              <View key={idx} className="flex-1 items-center">
                <View className="w-full" style={{ height: "100%" }}>
                  <View
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
                    style={{ height: `${height}%`, marginTop: "auto" }}
                  />
                </View>
                <Text className="text-xs font-semibold text-slate-600 mt-2">
                  {data.month}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}
