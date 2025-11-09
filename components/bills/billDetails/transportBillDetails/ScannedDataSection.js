import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ScannedDataSection({ bill }) {
  return (
    <View className="px-4 pb-4">
      <View className="flex-row items-center gap-2 mb-3">
        <View className="w-8 h-8 bg-gray-100 rounded-lg items-center justify-center">
          <Ionicons name="scan" size={18} color="#6b7280" />
        </View>
        <Text className="text-base font-bold text-slate-900">Scanned Data</Text>
      </View>

      <View className="bg-white rounded-2xl p-5 border border-slate-200">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-1">
            <Text className="text-sm text-slate-600 mb-1">Total Cost</Text>
            <Text className="text-2xl font-bold text-gray-700">
              ₱{bill.scannedCost.toFixed(2)}
            </Text>
          </View>
          <View className="flex-1 items-end">
            <Text className="text-sm text-slate-600 mb-1">Liters</Text>
            <Text className="text-2xl font-bold text-gray-700">
              {bill.scannedLiters} L
            </Text>
          </View>
        </View>

        <View className="pt-4 border-t border-slate-100">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-sm text-slate-600">Price per Liter</Text>
            <Text className="text-sm font-semibold text-slate-900">
              ₱{(bill.scannedCost / bill.scannedLiters).toFixed(2)}
            </Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-sm text-slate-600">Date</Text>
            <Text className="text-sm font-semibold text-slate-900">
              {bill.scannedDate}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
