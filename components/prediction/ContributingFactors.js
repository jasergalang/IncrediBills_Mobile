// components/prediction/ContributingFactors.js
import React from "react";
import { View, Text } from "react-native";

// Fake data for contributing factors
const fakeFactors = [
  {
    factor: "High Electricity Usage",
    description: "Frequent use of high-wattage appliances increases electricity bills.",
    percentage: 75,
    impact: "High",
    color: "yellow",
    icon: "💡",
  },
  {
    factor: "Water Leakage",
    description: "Leaks in pipes and taps can lead to unexpectedly high water bills.",
    percentage: 40,
    impact: "Medium",
    color: "blue",
    icon: "💧",
  },
  {
    factor: "Internet Overuse",
    description: "Streaming and gaming during peak hours increase your internet charges.",
    percentage: 60,
    impact: "Medium",
    color: "purple",
    icon: "🌐",
  },
  {
    factor: "Gas Usage",
    description: "Frequent cooking or heating increases gas bills.",
    percentage: 30,
    impact: "Low",
    color: "orange",
    icon: "🔥",
  },
];

export default function ContributingFactors() {
  return (
    <View className="bg-white rounded-2xl border border-slate-200 p-4 mb-6">
      <Text className="text-xl font-bold text-slate-900 mb-4">
        Contributing Factors
      </Text>

      {fakeFactors.map((factor, index) => (
        <View
          key={index}
          className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4"
        >
          <View className="flex-row items-start gap-4">
            <View
              className={`w-12 h-12 bg-${factor.color}-100 rounded-xl items-center justify-center flex-shrink-0`}
            >
              <Text className="text-2xl">{factor.icon}</Text>
            </View>
            <View className="flex-1">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="font-bold text-slate-900">{factor.factor}</Text>
                <View
                  className={`px-2 py-1 rounded-full ${
                    factor.impact === "High"
                      ? "bg-red-100"
                      : factor.impact === "Medium"
                      ? "bg-amber-100"
                      : "bg-green-100"
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      factor.impact === "High"
                        ? "text-red-700"
                        : factor.impact === "Medium"
                        ? "text-amber-700"
                        : "text-green-700"
                    }`}
                  >
                    {factor.impact} Impact
                  </Text>
                </View>
              </View>
              <Text className="text-sm text-slate-600 mb-3">{factor.description}</Text>

              {/* Progress bar */}
              <View className="flex-row items-center gap-2">
                <View className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <View
                    className={`h-full bg-${factor.color}-500 rounded-full`}
                    style={{ width: `${factor.percentage}%` }}
                  />
                </View>
                <Text className="text-sm font-bold text-slate-900">
                  {factor.percentage}%
                </Text>
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}
