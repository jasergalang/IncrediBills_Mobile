import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function PredictionSection({ bill }) {
  const costDifference = bill.predictedCost - bill.scannedCost;
  const litersDiff = bill.predictedLiters - bill.scannedLiters;

  const costPercentage = bill.scannedCost
    ? ((costDifference / bill.scannedCost) * 100).toFixed(1)
    : "0.0";

  const consumptionPercentage = bill.scannedLiters
    ? ((litersDiff / bill.scannedLiters) * 100).toFixed(1)
    : "0.0";

  let formattedPredictedDate = "";
  if (bill.predictedDate) {
    const date = new Date(bill.predictedDate);
    formattedPredictedDate = date.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  } else {
    const nextMonthDate = new Date();
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
    formattedPredictedDate = nextMonthDate.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  }

  return (
    <View className="px-4 pb-4">
      {/* Section Header */}
      <View className="flex-row items-center gap-2 mb-3">
        <Text style={{ fontSize: 18 }}>📈</Text>
        <Text className="text-base font-bold text-slate-900">
          AI Prediction for Next Month
        </Text>
      </View>

      <LinearGradient
        colors={["#fce6e6", "#ffb1b1"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-2xl p-5 border-2 border-red-400"
      >
        {/* Header */}
        <View className="flex-row items-center gap-2 mb-4">
          <View className="w-10 h-10 bg-red-500 rounded-xl items-center justify-center">
            <Text style={{ fontSize: 18, color: "white" }}>📊</Text>
          </View>
          <View>
            <Text className="text-sm font-semibold text-slate-900">
              {formattedPredictedDate}
            </Text>
            <Text className="text-xs text-slate-600">
              Based on your usage pattern
            </Text>
          </View>
        </View>

        <View className="space-y-3">
          {/* Predicted Cost */}
          <View className="bg-white/70 rounded-xl p-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-sm text-slate-600">Predicted Cost</Text>
              <View
                className={`flex-row items-center gap-1 px-2 py-1 rounded-full ${costDifference > 0 ? "bg-red-100" : "bg-green-100"
                  }`}
              >
                <Text style={{ fontSize: 12 }}>
                  {costDifference > 0 ? "⬆️" : "⬇️"}
                </Text>
                <Text
                  className={`text-xs font-bold ${costDifference > 0
                      ? "text-red-600"
                      : "text-green-600"
                    }`}
                >
                  {Math.abs(costPercentage)}%
                </Text>
              </View>
            </View>

            <Text className="text-2xl font-bold text-red-600">
              ₱{bill.predictedCost.toFixed(2)}
            </Text>

            <Text className="text-xs text-slate-500 mt-1">
              {costDifference > 0 ? "+" : ""}₱
              {Math.abs(costDifference).toFixed(2)} vs current
            </Text>
          </View>

          {/* Predicted Consumption */}
          <View className="bg-white/70 rounded-xl p-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-sm text-slate-600">
                Predicted Consumption
              </Text>
              <View
                className={`flex-row items-center gap-1 px-2 py-1 rounded-full ${litersDiff > 0 ? "bg-red-100" : "bg-green-100"
                  }`}
              >
                <Text style={{ fontSize: 12 }}>
                  {litersDiff > 0 ? "⬆️" : "⬇️"}
                </Text>
                <Text
                  className={`text-xs font-bold ${litersDiff > 0
                      ? "text-red-600"
                      : "text-green-600"
                    }`}
                >
                  {Math.abs(consumptionPercentage)}%
                </Text>
              </View>
            </View>

            <Text className="text-2xl font-bold text-orange-600">
              {bill.predictedLiters.toFixed(2)} Liters
            </Text>

            <Text className="text-xs text-slate-500 mt-1">
              {litersDiff > 0 ? "+" : ""}
              {Math.abs(litersDiff).toFixed(1)} kWh vs current
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
