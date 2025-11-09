import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ScannedDataSection({ bill }) {
  return (
    <View className="px-4 pb-4">
      <Text className="text-base font-bold text-slate-900 mb-3">
        Scanned Information
      </Text>
      <View className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <View className="flex-row items-center p-4 border-b border-slate-100">
          <View className="w-10 h-10 bg-blue-100 rounded-xl items-center justify-center mr-3">
            <Ionicons name="cash-outline" size={20} color="#2563eb" />
          </View>
          <View className="flex-1">
            <Text className="text-xs text-slate-500 mb-1">Bill Amount</Text>
            <Text className="text-lg font-bold text-slate-900">
              ₱{bill.scannedCost.toFixed(2)}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center p-4 border-b border-slate-100">
          <View className="w-10 h-10 bg-indigo-100 rounded-xl items-center justify-center mr-3">
            <Ionicons name="water-outline" size={20} color="#4f46e5" />
          </View>
          <View className="flex-1">
            <Text className="text-xs text-slate-500 mb-1">Consumption</Text>
            <Text className="text-lg font-bold text-slate-900">
              {bill.scannedConsumption} m³
            </Text>
          </View>
        </View>

        <View className="flex-row items-center p-4">
          <View className="w-10 h-10 bg-purple-100 rounded-xl items-center justify-center mr-3">
            <Ionicons name="calendar-outline" size={20} color="#9333ea" />
          </View>
          <View className="flex-1">
            <Text className="text-xs text-slate-500 mb-1">Billing Date</Text>
            <Text className="text-lg font-bold text-slate-900">
              {bill.scannedDate}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
