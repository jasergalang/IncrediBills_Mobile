import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function PredictionSection({ bill }) {
  const hasPrediction =
    bill.predictedCost !== null && bill.predictedCycleDays !== null;

  const costDifference = hasPrediction
    ? (bill.predictedCost ?? 0) - (bill.scannedCost ?? 0)
    : 0;
  const cycleDaysDiff = hasPrediction
    ? (bill.predictedCycleDays ?? 0) - (bill.scannedCycleDays ?? 0)
    : 0;

  const costPercentage =
    hasPrediction && bill.scannedCost
      ? ((costDifference / bill.scannedCost) * 100).toFixed(1)
      : "0.0";

  const cycleDaysPercentage =
    hasPrediction && bill.scannedCycleDays
      ? ((cycleDaysDiff / bill.scannedCycleDays) * 100).toFixed(1)
      : "0.0";

  let formattedPredictedDate = "Next billing period";
  if (bill.predictedDate) {
    const date = new Date(bill.predictedDate);
    formattedPredictedDate = date.toLocaleString("default", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <View className="px-4 pb-4">
      <View className="flex-row items-center gap-2 mb-3">
        <Text style={{ fontSize: 18 }}>📈</Text>
        <Text className="text-base font-bold text-slate-900">
          AI Prediction for Next Cycle
        </Text>
      </View>

      <LinearGradient
        colors={["#fff7ed", "#fed7aa"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-2xl p-5 border-2 border-orange-400"
      >
        <View className="flex-row items-center gap-2 mb-4">
          <View className="w-10 h-10 bg-orange-500 rounded-xl items-center justify-center">
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

        {!hasPrediction ? (
          <View className="bg-white/70 rounded-xl p-4 items-center">
            <Text className="text-sm text-slate-500 text-center">
              No prediction available yet. Upload more bills to generate a forecast.
            </Text>
          </View>
        ) : (
          <View className="space-y-3">
            <View className="bg-white/70 rounded-xl p-4">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-sm text-slate-600">Predicted Cost</Text>
                <View
                  className={`flex-row items-center gap-1 px-2 py-1 rounded-full ${
                    costDifference > 0 ? "bg-red-100" : "bg-green-100"
                  }`}
                >
                  <Text style={{ fontSize: 12 }}>
                    {costDifference > 0 ? "⬆️" : "⬇️"}
                  </Text>
                  <Text
                    className={`text-xs font-bold ${
                      costDifference > 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {Math.abs(costPercentage)}%
                  </Text>
                </View>
              </View>
              <Text className="text-2xl font-bold text-orange-600">
                ₱{(bill.predictedCost ?? 0).toFixed(2)}
              </Text>
              <Text className="text-xs text-slate-500 mt-1">
                {costDifference > 0 ? "+" : ""}₱{Math.abs(costDifference).toFixed(2)} vs current
              </Text>
            </View>

            <View className="bg-white/70 rounded-xl p-4">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-sm text-slate-600">Predicted Cycle Days</Text>
                <View
                  className={`flex-row items-center gap-1 px-2 py-1 rounded-full ${
                    cycleDaysDiff > 0 ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  <Text style={{ fontSize: 12 }}>
                    {cycleDaysDiff > 0 ? "⬆️" : "⬇️"}
                  </Text>
                  <Text
                    className={`text-xs font-bold ${
                      cycleDaysDiff > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {Math.abs(cycleDaysPercentage)}%
                  </Text>
                </View>
              </View>
              <Text className="text-2xl font-bold text-amber-600">
                {bill.predictedCycleDays} days
              </Text>
              <Text className="text-xs text-slate-500 mt-1">
                {cycleDaysDiff > 0 ? "+" : ""}
                {Math.abs(cycleDaysDiff)} days vs current
                {cycleDaysDiff > 0 ? " (gas lasting longer 👍)" : " (gas running out faster)"}
              </Text>
            </View>
          </View>
        )}
      </LinearGradient>
    </View>
  );
}