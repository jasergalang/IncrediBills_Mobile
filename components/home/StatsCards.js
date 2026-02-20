import React from "react";
import { View, Text } from "react-native";

const getPercentageStyle = (value = 0) => {
  if (value > 0) {
    return {
      arrow: "↑",
      textColor: "text-green-600",
      bgColor: "bg-green-50",
    };
  }

  if (value < 0) {
    return {
      arrow: "↓",
      textColor: "text-red-600",
      bgColor: "bg-red-50",
    };
  }

  return {
    textColor: "text-blue-600",
    bgColor: "bg-blue-50",
  };
};

export default function StatsCards({ statsData }) {
  const totalSpentPct = getPercentageStyle(statsData.totalSpentChange);
  const savedPct = getPercentageStyle(statsData.savedChange);
  const predictionPct = getPercentageStyle(statsData.predictionChange);
  const billsPct = getPercentageStyle(statsData.billsChange);

  return (
    <View className="px-4 pb-4 p-4">
      <View className="flex-row gap-3 mb-3">
        {/* Total Bills Card */}
        <View className="flex-1 bg-white rounded-2xl p-4 border border-slate-200">
          <View className="flex-row items-start justify-between mb-2">
            <Text className="text-2xl">📊</Text>
            <View className={`${totalSpentPct.bgColor} px-2 py-1 rounded-full`}>
              <Text className={`text-xs font-semibold ${totalSpentPct.textColor}`}>
                {totalSpentPct.arrow} {Math.abs(statsData.totalSpentChange || 0)}%
              </Text>
            </View>
          </View>
          <Text className="text-sm text-slate-600 mb-1">Total Bills</Text>
          <Text className="text-xl font-bold text-slate-900">
            ₱{statsData.totalSpent?.toLocaleString() || 0}
          </Text>
          <Text className="text-xs text-slate-400">This Month</Text>
        </View>

        {/* Total Saved Card */}
        <View className="flex-1 bg-white rounded-2xl p-4 border border-slate-200">
          <View className="flex-row items-start justify-between mb-2">
            <Text className="text-2xl">💰</Text>
            <View className={`${savedPct.bgColor} px-2 py-1 rounded-full`}>
              <Text className={`text-xs font-semibold ${savedPct.textColor}`}>
                {savedPct.arrow} {Math.abs(statsData.savedChange || 0)}%
              </Text>
            </View>
          </View>
          <Text className="text-sm text-slate-600 mb-1">Total Saved</Text>
          <Text className="text-xl font-bold text-green-600">
            ₱{statsData.savedAmount?.toLocaleString() || 0}
          </Text>
          <Text className="text-xs text-slate-400">All Time</Text>
        </View>
      </View>

      <View className="flex-row gap-3">
        {/* Next Month Prediction Card */}
        <View className="flex-1 bg-white rounded-2xl p-4 border border-slate-200">
          <View className="flex-row items-start justify-between mb-2">
            <Text className="text-2xl">🎯</Text>
            <View className={`${predictionPct.bgColor} px-2 py-1 rounded-full`}>
              <Text className={`text-xs font-semibold ${predictionPct.textColor}`}>
                {predictionPct.arrow} {Math.abs(statsData.predictionChange || 0)}%
              </Text>
            </View>
          </View>
          <Text className="text-sm text-slate-600 mb-1">Next Month</Text>
          <Text className="text-xl font-bold text-slate-900">
            ₱{statsData.nextMonthPrediction?.toLocaleString() || 0}
          </Text>
          <Text className="text-xs text-slate-400">AI Prediction</Text>
        </View>

        {/* Bills Uploaded Card */}
        <View className="flex-1 bg-purple-600 rounded-2xl p-4 border border-slate-200">
          <View className="flex-row items-start justify-between mb-2">
            <Text className="text-2xl">🏆</Text>
            <View className={`${billsPct.bgColor} px-2 py-1 rounded-full`}>
              <Text className={`text-xs font-semibold ${billsPct.textColor}`}>
                 Level 12
              </Text>
            </View>
          </View>
          <Text className="text-sm text-white/90 mb-1">Your Points</Text>
          <Text className="text-xl font-bold text-white">
            850 XP
          </Text>
          <Text className="text-xs text-white/75">150 XP to Level 13</Text>
        </View>
      </View>
    </View>
  );
}

