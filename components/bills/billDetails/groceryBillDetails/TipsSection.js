import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function TipsSection({ recommendations }) {
  const getImpactColor = (impact) => {
    switch (impact?.toLowerCase()) {
      case "high":
        return { bg: "bg-green-100", text: "text-green-700", border: "border-green-300" };
      case "medium":
        return { bg: "bg-emerald-100", text: "text-emerald-700", border: "border-emerald-300" };
      case "low":
        return { bg: "bg-teal-100", text: "text-teal-700", border: "border-teal-300" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-300" };
    }
  };

  const getImpactIcon = (impact) => {
    switch (impact?.toLowerCase()) {
      case "high": return "🛒";
      case "medium": return "🧾";
      case "low": return "🏷️";
      default: return "🛒";
    }
  };

  if (!recommendations || recommendations.length === 0) {
    return (
      <View className="px-4 pb-6">
        <LinearGradient
          colors={["#ecfdf5", "#d1fae5"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-2xl p-5 border-2 border-green-200"
        >
          <View className="flex-row items-center gap-3 mb-3">
            <View className="w-12 h-12 bg-green-500 rounded-xl items-center justify-center">
              <Text style={{ fontSize: 22, color: "white" }}>💡</Text>
            </View>
            <Text className="text-base font-bold text-green-900">
              Money Saving Tips
            </Text>
          </View>
          <View className="space-y-2">
            <View className="flex-row items-start gap-2">
              <Text className="text-green-600 mt-0.5">•</Text>
              <Text className="text-sm text-green-800 flex-1">
                Plan your purchases to avoid impulse buying
              </Text>
            </View>
            <View className="flex-row items-start gap-2">
              <Text className="text-green-600 mt-0.5">•</Text>
              <Text className="text-sm text-green-800 flex-1">
                Check for sales and use coupons when shopping
              </Text>
            </View>
            <View className="flex-row items-start gap-2">
              <Text className="text-green-600 mt-0.5">•</Text>
              <Text className="text-sm text-green-800 flex-1">
                Purchase frequently used items in larger quantities
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View className="px-4 pb-6">
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-lg font-bold text-gray-900">
          🛒 AI Grocery Recommendations
        </Text>
        <View className="bg-green-100 px-3 py-1 rounded-full">
          <Text className="text-xs font-semibold text-green-700">
            Powered by AI
          </Text>
        </View>
      </View>

      {recommendations.map((tip, index) => {
        const colors = getImpactColor(tip.impact);
        const icon = getImpactIcon(tip.impact);

        return (
          <View
            key={index}
            className={`bg-white rounded-2xl p-4 border-2 ${colors.border} shadow-sm mb-3`}
          >
            <View className="flex-row items-start gap-3 mb-3">
              <View className={`w-10 h-10 ${colors.bg} rounded-xl items-center justify-center`}>
                <Text className="text-xl">{icon}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold text-gray-900 mb-1">
                  {tip.title}
                </Text>
                <View className={`${colors.bg} px-2 py-1 rounded-md self-start`}>
                  <Text className={`text-xs font-semibold ${colors.text} capitalize`}>
                    {tip.impact} Impact
                  </Text>
                </View>
              </View>
            </View>

            <Text className="text-xs text-gray-700 leading-5 mb-3">
              {tip.description}
            </Text>

            {tip.savingsEstimate > 0 && (
              <View className="flex-row items-center gap-2 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                <Text className="text-lg">🧾</Text>
                <View className="flex-1">
                  <Text className="text-xs text-green-600 font-medium">
                    Estimated Monthly Grocery Savings
                  </Text>
                  <Text className="text-sm font-bold text-green-700">
                    ₱{tip.savingsEstimate.toLocaleString()}
                  </Text>
                </View>
              </View>
            )}
          </View>
        );
      })}

      <View className="mt-4 bg-green-50 rounded-xl p-4 border border-green-200">
        <View className="flex-row items-center gap-2 mb-2">
          <Text className="text-base">ℹ️</Text>
          <Text className="text-xs font-semibold text-green-700">
            About these recommendations
          </Text>
        </View>
        <Text className="text-xs text-green-700 leading-4">
          These recommendations are based on your grocery spending trends and
          billing data. Small changes can lead to big savings over time.
        </Text>
      </View>
    </View>
  );
}