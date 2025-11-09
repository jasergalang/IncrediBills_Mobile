import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function PredictionSection({ bill }) {
  const costDiff = bill.predictedCost - bill.scannedCost;
  const litersDiff = bill.predictedLiters - bill.scannedLiters;

  return (
    <View className="px-4 pb-4">
      <View className="flex-row items-center gap-2 mb-3">
        <View className="w-8 h-8 bg-purple-100 rounded-lg items-center justify-center">
          <Ionicons name="analytics" size={18} color="#9333ea" />
        </View>
        <Text className="text-base font-bold text-slate-900">
          AI Prediction (Next Month)
        </Text>
      </View>

      <LinearGradient
        colors={["#faf5ff", "#f3e8ff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-2xl p-5 border-2 border-purple-200"
      >
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-1">
            <Text className="text-sm text-purple-700 mb-1">Predicted Cost</Text>
            <Text className="text-2xl font-bold text-purple-900">
              ₱{bill.predictedCost.toFixed(2)}
            </Text>
            <View className="flex-row items-center gap-1 mt-1">
              <Ionicons
                name={costDiff > 0 ? "trending-up" : "trending-down"}
                size={14}
                color={costDiff > 0 ? "#dc2626" : "#16a34a"}
              />
              <Text
                className={`text-xs font-semibold ${
                  costDiff > 0 ? "text-red-600" : "text-green-600"
                }`}
              >
                {costDiff > 0 ? "+" : ""}₱{Math.abs(costDiff).toFixed(2)}
              </Text>
            </View>
          </View>
          <View className="flex-1 items-end">
            <Text className="text-sm text-purple-700 mb-1">
              Predicted Liters
            </Text>
            <Text className="text-2xl font-bold text-purple-900">
              {bill.predictedLiters} L
            </Text>
            <View className="flex-row items-center gap-1 mt-1">
              <Ionicons
                name={litersDiff > 0 ? "trending-up" : "trending-down"}
                size={14}
                color={litersDiff > 0 ? "#dc2626" : "#16a34a"}
              />
              <Text
                className={`text-xs font-semibold ${
                  litersDiff > 0 ? "text-red-600" : "text-green-600"
                }`}
              >
                {litersDiff > 0 ? "+" : ""}
                {Math.abs(litersDiff).toFixed(1)} L
              </Text>
            </View>
          </View>
        </View>

        <View className="bg-white/60 rounded-xl p-3">
          <View className="flex-row items-center gap-2">
            <Ionicons name="information-circle" size={16} color="#9333ea" />
            <Text className="text-xs text-purple-800 flex-1">
              Based on your driving patterns and fuel price trends
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
