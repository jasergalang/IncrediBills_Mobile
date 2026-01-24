// import React from "react";
// import { View, Text } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";

// export default function UploadTips() {
//   return (
//     <View className="px-4 pb-6">
//       <LinearGradient
//         colors={["#fefce8", "#fef3c7"]}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         className="rounded-2xl p-4 border-2 border-amber-200"
//       >
//         <View className="flex-row items-start gap-3">
//           <View className="w-10 h-10 bg-amber-500 rounded-xl items-center justify-center">
//             <Text className="text-2xl">💡</Text>
//           </View>
//           <View className="flex-1">
//             <Text className="text-sm font-bold text-amber-900 mb-2">
//               Pro Tips
//             </Text>
//             <Text className="text-xs text-amber-700 mb-1">
//               • Ensure the bill is clearly visible and readable
//             </Text>
//             <Text className="text-xs text-amber-700 mb-1">
//               • Use good lighting when taking photos
//             </Text>
//             <Text className="text-xs text-amber-700">
//               • Supported formats: PNG, JPG, PDF
//             </Text>
//           </View>
//         </View>
//       </LinearGradient>
//     </View>
//   );
// }
import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function WaterTips({ recommendations }) {
  const getImpactColor = (impact) => {
    switch (impact?.toLowerCase()) {
      case "high":
        return { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-300" };
      case "medium":
        return { bg: "bg-cyan-100", text: "text-cyan-700", border: "border-cyan-300" };
      case "low":
        return { bg: "bg-sky-100", text: "text-sky-700", border: "border-sky-300" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-300" };
    }
  };

  const getImpactIcon = (impact) => {
    switch (impact?.toLowerCase()) {
      case "high": return "🚿";
      case "medium": return "💧";
      case "low": return "🚰";
      default: return "💧";
    }
  };

  // Default tips (no AI data yet)
  if (!recommendations || recommendations.length === 0) {
    return (
      <View className="px-4 pb-6">
        <LinearGradient
          colors={["#ecfeff", "#cffafe"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-2xl p-4 border-2 border-cyan-200"
        >
          <View className="flex-row items-start gap-3">
            <View className="w-10 h-10 bg-cyan-500 rounded-xl items-center justify-center">
              <Text className="text-2xl">💧</Text>
            </View>
            <View className="flex-1">
              <Text className="text-sm font-bold text-cyan-900 mb-2">
                Water Saving Tips
              </Text>
              <Text className="text-xs text-cyan-700 mb-1">
                • Fix leaking faucets immediately
              </Text>
              <Text className="text-xs text-cyan-700 mb-1">
                • Use water-efficient fixtures
              </Text>
              <Text className="text-xs text-cyan-700">
                • Monitor monthly water usage
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
          💧 AI Water Recommendations
        </Text>
        <View className="bg-cyan-100 px-3 py-1 rounded-full">
          <Text className="text-xs font-semibold text-cyan-700">
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
              <View className="flex-row items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
                <Text className="text-lg">🚰</Text>
                <View className="flex-1">
                  <Text className="text-xs text-blue-600 font-medium">
                    Estimated Monthly Water Savings
                  </Text>
                  <Text className="text-sm font-bold text-blue-700">
                    {tip.savingsEstimate.toLocaleString()} liters
                  </Text>
                </View>
              </View>
            )}
          </View>
        );
      })}

      <View className="mt-4 bg-cyan-50 rounded-xl p-4 border border-cyan-200">
        <View className="flex-row items-center gap-2 mb-2">
          <Text className="text-base">ℹ️</Text>
          <Text className="text-xs font-semibold text-blue-700">
            About these recommendations
          </Text>
        </View>
        <Text className="text-xs text-cyan-700 leading-4">
          These recommendations are based on your water consumption trends and billing data.
          Small changes can lead to big savings over time.
        </Text>
      </View>
    </View>
  );
}
