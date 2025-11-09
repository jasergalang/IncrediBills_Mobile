import React from "react";
import { View, Text } from "react-native";

export default function ComparisonChart({ bill }) {
  const maxValue = Math.max(bill.scannedConsumption, bill.predictedConsumption);
  const currentPercent = (bill.scannedConsumption / maxValue) * 100;
  const predictedPercent = (bill.predictedConsumption / maxValue) * 100;

  return (
    <View className="px-4 pb-4">
      <Text className="text-base font-bold text-slate-900 mb-3">
        Usage Comparison
      </Text>
      <View className="bg-white rounded-2xl p-5 border border-slate-200">
        {/* Current Month */}
        <View className="mb-4">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-sm font-semibold text-slate-700">
              Current Month
            </Text>
            <Text className="text-sm font-bold text-amber-600">
              {bill.scannedConsumption} kWh
            </Text>
          </View>
          <View className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <View
              className="h-full bg-amber-500 rounded-full"
              style={{ width: `${currentPercent}%` }}
            />
          </View>
        </View>

        {/* Predicted Next Month */}
        <View>
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-sm font-semibold text-slate-700">
              Predicted Next Month
            </Text>
            <Text className="text-sm font-bold text-orange-600">
              {bill.predictedConsumption} kWh
            </Text>
          </View>
          <View className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <View
              className="h-full bg-orange-500 rounded-full"
              style={{ width: `${predictedPercent}%` }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
