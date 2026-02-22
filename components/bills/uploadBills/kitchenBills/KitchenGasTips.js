import React from "react";
import { View, Text } from "react-native";

export default function KitchenGasTips({ recommendations }) {

  const getImpactColor = (impact) => {
    switch (impact?.toLowerCase()) {
      case "high":
        return { bg: "bg-orange-200", text: "text-orange-800", border: "border-orange-400" };
      case "medium":
        return { bg: "bg-amber-200", text: "text-amber-800", border: "border-amber-400" };
      case "low":
        return { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-300" };
      default:
        return { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-300" };
    }
  };

  const getImpactIcon = (impact) => {
    switch (impact?.toLowerCase()) {
      case "high": return "🔥";
      case "medium": return "🍳";
      case "low": return "🫙";
      default: return "🔥";
    }
  };

  if (!recommendations || recommendations.length === 0) {
    return (
      <View className="px-4 pb-6">
        <View className="bg-orange-50 rounded-2xl p-4 border-2 border-orange-200">
          <View className="flex-row items-start gap-3">
            <View className="w-10 h-10 bg-orange-100 rounded-xl items-center justify-center">
              <Text className="text-2xl">🔥</Text>
            </View>
            <View className="flex-1">
              <Text className="text-sm font-bold text-orange-900 mb-2">
                Pro Tips
              </Text>
              <Text className="text-xs text-orange-700 mb-1">
                • Use lids while cooking to retain heat
              </Text>
              <Text className="text-xs text-orange-700 mb-1">
                • Match flame size to pot size
              </Text>
              <Text className="text-xs text-orange-700">
                • Turn off gas when not in use
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="px-4 pb-6">
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-lg font-bold text-gray-900">
          🔥 AI Kitchen Gas Recommendations
        </Text>
        <View className="bg-orange-200 px-3 py-1 rounded-full">
          <Text className="text-xs font-semibold text-orange-800">
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
              <View className="flex-row items-center gap-2 bg-orange-50 px-3 py-2 rounded-lg border border-orange-200">
                <Text className="text-lg">💰</Text>
                <View className="flex-1">
                  <Text className="text-xs text-orange-600 font-medium">
                    Estimated Monthly Gas Savings
                  </Text>
                  <Text className="text-sm font-bold text-orange-800">
                    ₱{tip.savingsEstimate.toLocaleString()}
                  </Text>
                </View>
              </View>
            )}
          </View>
        );
      })}

      <View className="mt-4 bg-orange-50 rounded-xl p-4 border border-orange-200">
        <View className="flex-row items-center gap-2 mb-2">
          <Text className="text-base">ℹ️</Text>
          <Text className="text-xs font-semibold text-slate-900">
            About these recommendations
          </Text>
        </View>
        <Text className="text-xs text-gray-700 leading-4">
          These kitchen gas recommendations are generated based on your usage
          patterns and gas spending. Improving cooking habits can significantly
          reduce your gas costs.
        </Text>
      </View>
    </View>
  );
}