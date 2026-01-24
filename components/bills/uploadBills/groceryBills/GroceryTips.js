// import React from "react";
// import { View, Text } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// export default function GroceryTips({ category }) {
//     const tips = [
//         "Make a shopping list to avoid impulse buying",
//         "Buy in bulk for items you use frequently",
//         "Compare prices across different stores",
//         "Look for sales and use coupons when available",
//     ];

//     return (
//         <View className="px-4 pb-6">
//             <View className="bg-green-50 rounded-2xl p-4 border border-green-200">
//                 <View className="flex-row items-center mb-3">
//                     <View className="w-8 h-8 bg-green-500 rounded-lg items-center justify-center mr-2">
//                         <Ionicons name="bulb" size={18} color="white" />
//                     </View>
//                     <Text className="text-base font-bold text-slate-900">
//                         Money Saving Tips
//                     </Text>
//                 </View>
//                 {tips.map((tip, index) => (
//                     <View key={index} className="flex-row items-start mb-2">
//                         <Text className="text-green-500 mr-2">•</Text>
//                         <Text className="text-sm text-slate-700 flex-1">{tip}</Text>
//                     </View>
//                 ))}
//             </View>
//         </View>
//     );
// }

import React from "react";
import { View, Text } from "react-native";

export default function GroceryTips({ recommendations }) {

    const getImpactColor = (impact) => {
        switch (impact?.toLowerCase()) {
            case "high":
                return { bg: "bg-green-100", text: "text-green-700", border: "border-green-300" };
            case "medium":
                return { bg: "bg-lime-100", text: "text-lime-700", border: "border-lime-300" };
            case "low":
                return { bg: "bg-emerald-100", text: "text-emerald-700", border: "border-emerald-300" };
            default:
                return { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-300" };
        }
    };

    const getImpactIcon = (impact) => {
        switch (impact?.toLowerCase()) {
            case "high": return "🛒";
            case "medium": return "🥦";
            case "low": return "🥬";
            default: return "🛒";
        }
    };

    // Same fallback logic as ElectricTips
    if (!recommendations || recommendations.length === 0) {
        return (
            <View className="px-4 pb-6">
                <View className="bg-green-50 rounded-2xl p-4 border-2 border-green-200">
                    <View className="flex-row items-start gap-3">
                        <View className="w-10 h-10 bg-green-500 rounded-xl items-center justify-center">
                            <Text className="text-2xl">🛒</Text>
                        </View>
                        <View className="flex-1">
                            <Text className="text-sm font-bold text-green-900 mb-2">
                                Pro Tips
                            </Text>
                            <Text className="text-xs text-green-700 mb-1">
                                • Track your grocery expenses weekly
                            </Text>
                            <Text className="text-xs text-green-700 mb-1">
                                • Avoid shopping when hungry
                            </Text>
                            <Text className="text-xs text-green-700">
                                • Compare unit prices
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
                                <Text className="text-lg">💰</Text>
                                <View className="flex-1">
                                    <Text className="text-xs text-green-600 font-medium">
                                        Estimated Monthly Savings
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
                    <Text className="text-xs font-semibold text-lime-900">
                        About these recommendations
                    </Text>
                </View>

                <Text className="text-xs text-green-700 leading-4">
                    These grocery recommendations are generated based on your spending habits
                    and purchase history. Small changes can lead to big savings.
                </Text>
            </View>
        </View>
    );
}
