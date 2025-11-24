import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function PredictionSection({ bill }) {
  const costDifference = bill.predictedCost - bill.scannedCost;
  const consumptionDifference = bill.predictedConsumption - bill.scannedConsumption;
  const costPercentage = bill.scannedCost
    ? ((costDifference / bill.scannedCost) * 100).toFixed(1)
    : "0.0";
  const consumptionPercentage = bill.scannedConsumption
    ? ((consumptionDifference / bill.scannedConsumption) * 100).toFixed(1)
    : "0.0";

  let formattedPredictedDate = "";
  if (bill.predictedDate) {
    const date = new Date(bill.predictedDate);
    formattedPredictedDate = date.toLocaleString("default", { month: "long", year: "numeric" });
  } else {
    const nextMonthDate = new Date();
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
    formattedPredictedDate = nextMonthDate.toLocaleString("default", { month: "long", year: "numeric" });
  }

  return (
    <View className="px-4 pb-4">
      <View className="flex-row items-center gap-2 mb-3">
        <Ionicons name="trending-up-outline" size={20} color="#f59e0b" />
        <Text className="text-base font-bold text-slate-900">
          AI Prediction for Next Month
        </Text>
      </View>

      <LinearGradient
        colors={["#fefce8", "#fef3c7"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-2xl p-5 border-2 border-amber-200"
      >
        <View className="flex-row items-center gap-2 mb-4">
          <View className="w-10 h-10 bg-amber-500 rounded-xl items-center justify-center">
            <Ionicons name="stats-chart" size={20} color="#fff" />
          </View>
          <View>
            <Text className="text-sm font-semibold text-slate-900">{formattedPredictedDate}</Text>
            <Text className="text-xs text-slate-600">
              Based on your usage pattern
            </Text>
          </View>
        </View>

        <View className="space-y-3">
          <View className="bg-white/70 rounded-xl p-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-sm text-slate-600">Predicted Cost</Text>
              <View
                className={`flex-row items-center gap-1 px-2 py-1 rounded-full ${
                  costDifference > 0 ? "bg-red-100" : "bg-green-100"
                }`}
              >
                <Ionicons
                  name={costDifference > 0 ? "arrow-up" : "arrow-down"}
                  size={12}
                  color={costDifference > 0 ? "#dc2626" : "#16a34a"}
                />
                <Text
                  className={`text-xs font-bold ${
                    costDifference > 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {Math.abs(costPercentage)}%
                </Text>
              </View>
            </View>
            <Text className="text-2xl font-bold text-amber-600">
              ₱{bill.predictedCost.toFixed(2)}
            </Text>
            <Text className="text-xs text-slate-500 mt-1">
              {costDifference > 0 ? "+" : ""}₱
              {Math.abs(costDifference).toFixed(2)} vs current
            </Text>
          </View>

          <View className="bg-white/70 rounded-xl p-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-sm text-slate-600">
                Predicted Consumption
              </Text>
              <View
                className={`flex-row items-center gap-1 px-2 py-1 rounded-full ${
                  consumptionDifference > 0 ? "bg-red-100" : "bg-green-100"
                }`}
              >
                <Ionicons
                  name={consumptionDifference > 0 ? "arrow-up" : "arrow-down"}
                  size={12}
                  color={consumptionDifference > 0 ? "#dc2626" : "#16a34a"}
                />
                <Text
                  className={`text-xs font-bold ${
                    consumptionDifference > 0
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {Math.abs(consumptionPercentage)}%
                </Text>
              </View>
            </View>
            <Text className="text-2xl font-bold text-orange-600">
              {bill.predictedConsumption.toFixed(2)} kWh
            </Text>
            <Text className="text-xs text-slate-500 mt-1">
              {consumptionDifference > 0 ? "+" : ""}
              {Math.abs(consumptionDifference).toFixed(1)} kWh vs current
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
