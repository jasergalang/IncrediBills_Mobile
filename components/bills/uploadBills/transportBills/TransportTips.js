// import React from "react";
// import { View, Text } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";

// export default function TransportTips() {
//   return (
//     <View className="px-4 pb-6">
//       <LinearGradient
//         colors={["#e5e7eb", "#d1d5db"]}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         className="rounded-2xl p-5 border-2 border-gray-200"
//       >
//         <View className="flex-row items-center gap-3 mb-3">
//           <View className="w-12 h-12 bg-gray-600 rounded-xl items-center justify-center">
//             <Ionicons name="bulb" size={24} color="#fff" />
//           </View>
//           <Text className="text-base font-bold text-gray-900">
//             Fuel Saving Tips
//           </Text>
//         </View>

//         <View className="space-y-2">
//           <View className="flex-row items-start gap-2">
//             <Text className="text-gray-600 mt-0.5">•</Text>
//             <Text className="text-sm text-gray-800 flex-1">
//               Maintain proper tire pressure to improve fuel efficiency by 3%
//             </Text>
//           </View>
//           <View className="flex-row items-start gap-2">
//             <Text className="text-gray-600 mt-0.5">•</Text>
//             <Text className="text-sm text-gray-800 flex-1">
//               Avoid aggressive driving to save up to 33% on fuel costs
//             </Text>
//           </View>
//           <View className="flex-row items-start gap-2">
//             <Text className="text-gray-600 mt-0.5">•</Text>
//             <Text className="text-sm text-gray-800 flex-1">
//               Use cruise control on highways for better fuel economy
//             </Text>
//           </View>
//           <View className="flex-row items-start gap-2">
//             <Text className="text-gray-600 mt-0.5">•</Text>
//             <Text className="text-sm text-gray-800 flex-1">
//               Remove excess weight from your vehicle to reduce fuel consumption
//             </Text>
//           </View>
//         </View>
//       </LinearGradient>
//     </View>
//   );
// }
import React from "react";
import { View, Text } from "react-native";

export default function TransportTips({ recommendations }) {

  const getImpactColor = (impact) => {
    switch (impact?.toLowerCase()) {
      case "high":
        return { bg: "bg-gray-200", text: "text-gray-800", border: "border-gray-400" };
      case "medium":
        return { bg: "bg-slate-200", text: "text-slate-800", border: "border-slate-400" };
      case "low":
        return { bg: "bg-zinc-200", text: "text-zinc-800", border: "border-zinc-400" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-300" };
    }
  };

  const getImpactIcon = (impact) => {
    switch (impact?.toLowerCase()) {
      case "high": return "⛽";
      case "medium": return "🚗";
      case "low": return "🛞";
      default: return "🚗";
    }
  };

  // Same fallback behavior as ElectricTips
  if (!recommendations || recommendations.length === 0) {
    return (
      <View className="px-4 pb-6">
        <View className="bg-gray-50 rounded-2xl p-4 border-2 border-gray-200">
          <View className="flex-row items-start gap-3">
            <View className="w-10 h-10 bg-gray-600 rounded-xl items-center justify-center">
              <Text className="text-2xl">⛽</Text>
            </View>
            <View className="flex-1">
              <Text className="text-sm font-bold text-gray-900 mb-2">
                Pro Tips
              </Text>
              <Text className="text-xs text-gray-700 mb-1">
                • Maintain proper tire pressure
              </Text>
              <Text className="text-xs text-gray-700 mb-1">
                • Avoid aggressive driving
              </Text>
              <Text className="text-xs text-gray-700">
                • Reduce unnecessary vehicle load
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
          🚗 AI Transport Recommendations
        </Text>
        <View className="bg-gray-200 px-3 py-1 rounded-full">
          <Text className="text-xs font-semibold text-gray-800">
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
              <View className="flex-row items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                <Text className="text-lg">💰</Text>
                <View className="flex-1">
                  <Text className="text-xs text-gray-600 font-medium">
                    Estimated Monthly Fuel Savings
                  </Text>
                  <Text className="text-sm font-bold text-gray-800">
                    ₱{tip.savingsEstimate.toLocaleString()}
                  </Text>
                </View>
              </View>
            )}
          </View>
        );
      })}

      <View className="mt-4 bg-gray-50 rounded-xl p-4 border border-gray-200">
        <View className="flex-row items-center gap-2 mb-2">
          <Text className="text-base">ℹ️</Text>
          <Text className="text-xs font-semibold text-slate-900">
            About these recommendations
          </Text>
        </View>
        <Text className="text-xs text-gray-700 leading-4">
          These transport recommendations are generated based on your travel
          patterns and fuel spending. Improving driving habits can significantly
          reduce fuel costs.
        </Text>
      </View>
    </View>
  );
}
