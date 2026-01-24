// import React from "react";
// import { View, Text } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// export default function MiscellaneousTips() {
//     const tips = [
//         "Keep your gas tank in a well-ventilated area",
//         "Check for leaks regularly with soapy water",
//         "Turn off the valve when not in use",
//         "Schedule regular refills to avoid running out",
//     ];

//     return (
//         <View className="px-4 pb-6">
//             <View className="bg-orange-50 rounded-2xl p-4 border border-orange-200">
//                 <View className="flex-row items-center mb-3">
//                     <View className="w-8 h-8 bg-orange-500 rounded-lg items-center justify-center mr-2">
//                         <Ionicons name="bulb" size={18} color="white" />
//                     </View>
//                     <Text className="text-base font-bold text-slate-900">
//                         Safety Tips
//                     </Text>
//                 </View>
//                 {tips.map((tip, index) => (
//                     <View key={index} className="flex-row items-start mb-2">
//                         <Text className="text-orange-500 mr-2">•</Text>
//                         <Text className="text-sm text-slate-700 flex-1">{tip}</Text>
//                     </View>
//                 ))}
//             </View>
//         </View>
//     );
// }

import React from "react";
import { View, Text } from "react-native";

export default function MiscellaneousTips({ recommendations }) {

    const getImpactColor = (impact) => {
        switch (impact?.toLowerCase()) {
            case "high":
                return { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-300" };
            case "medium":
                return { bg: "bg-indigo-100", text: "text-indigo-700", border: "border-indigo-300" };
            case "low":
                return { bg: "bg-violet-100", text: "text-violet-700", border: "border-violet-300" };
            default:
                return { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-300" };
        }
    };

    const getImpactIcon = (impact) => {
        switch (impact?.toLowerCase()) {
            case "high": return "💊";      // medicine / essential
            case "medium": return "📦";    // subscriptions / services
            case "low": return "👕";       // clothing / discretionary
            default: return "🧾";
        }
    };

    // Same fallback logic as ElectricTips
    if (!recommendations || recommendations.length === 0) {
        return (
            <View className="px-4 pb-6">
                <View className="bg-purple-50 rounded-2xl p-4 border-2 border-purple-200">
                    <View className="flex-row items-start gap-3">
                        <View className="w-10 h-10 bg-purple-500 rounded-xl items-center justify-center">
                            <Text className="text-2xl">🧾</Text>
                        </View>
                        <View className="flex-1">
                            <Text className="text-sm font-bold text-purple-900 mb-2">
                                Expense Tips
                            </Text>
                            <Text className="text-xs text-purple-700 mb-1">
                                • Review subscriptions you no longer use
                            </Text>
                            <Text className="text-xs text-purple-700 mb-1">
                                • Track medical and pharmacy expenses
                            </Text>
                            <Text className="text-xs text-purple-700">
                                • Set a monthly budget for miscellaneous spending
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
                    🧾 AI Expense Recommendations
                </Text>
                <View className="bg-purple-100 px-3 py-1 rounded-full">
                    <Text className="text-xs font-semibold text-purple-700">
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
                            <View className="flex-row items-center gap-2 bg-purple-50 px-3 py-2 rounded-lg border border-purple-200">
                                <Text className="text-lg">💰</Text>
                                <View className="flex-1">
                                    <Text className="text-xs text-purple-600 font-medium">
                                        Estimated Monthly Savings
                                    </Text>
                                    <Text className="text-sm font-bold text-purple-700">
                                        ₱{tip.savingsEstimate.toLocaleString()}
                                    </Text>
                                </View>
                            </View>
                        )}
                    </View>
                );
            })}

            <View className="mt-4 bg-purple-50 rounded-xl p-4 border border-purple-200">
                <View className="flex-row items-center gap-2 mb-2">
                    <Text className="text-base">ℹ️</Text>
                    <Text className="text-xs font-semibold text-indigo-900">
                        About these recommendations
                    </Text>
                </View>
                <Text className="text-xs text-purple-700 leading-4">
                    These recommendations analyze your miscellaneous spending such as
                    medicine, subscriptions, pet care, school, and shopping expenses to
                    help you stay within budget.
                </Text>
            </View>
        </View>
    );
}
