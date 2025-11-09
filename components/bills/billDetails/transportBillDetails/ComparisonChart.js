import React from "react";
import { View, Text } from "react-native";

export default function ComparisonChart({ bill }) {
  const maxValue = Math.max(bill.scannedCost, bill.predictedCost);
  const scannedHeight = (bill.scannedCost / maxValue) * 100;
  const predictedHeight = (bill.predictedCost / maxValue) * 100;

  return (
    <View className="px-4 pb-4">
      <Text className="text-base font-bold text-slate-900 mb-3">
        Cost Comparison
      </Text>

      <View className="bg-white rounded-2xl p-5 border border-slate-200">
        <View className="h-48 flex-row items-end justify-around gap-8">
          <View className="flex-1 items-center">
            <View className="w-full items-center" style={{ height: "100%" }}>
              <View
                className="w-full bg-gray-500 rounded-t-xl"
                style={{ height: `${scannedHeight}%`, marginTop: "auto" }}
              />
            </View>
            <Text className="text-sm font-semibold text-slate-900 mt-3">
              Current
            </Text>
            <Text className="text-xs text-slate-600">
              ₱{bill.scannedCost.toFixed(2)}
            </Text>
          </View>

          <View className="flex-1 items-center">
            <View className="w-full items-center" style={{ height: "100%" }}>
              <View
                className="w-full bg-purple-500 rounded-t-xl"
                style={{ height: `${predictedHeight}%`, marginTop: "auto" }}
              />
            </View>
            <Text className="text-sm font-semibold text-slate-900 mt-3">
              Predicted
            </Text>
            <Text className="text-xs text-slate-600">
              ₱{bill.predictedCost.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
