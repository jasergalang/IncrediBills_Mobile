import React from "react";
import { View, Text } from "react-native";

export default function ScannedDataSection({ bill }) {
  return (
    <View className="px-4 pb-4">
      <Text className="text-base font-bold text-slate-900 mb-3">
        Scanned Information
      </Text>

      <View className="bg-white rounded-2xl border border-slate-200 overflow-hidden">

        {/* Bill Amount */}
        <View className="flex-row items-center p-4 border-b border-slate-100">
          <View className="w-10 h-10 bg-red-100 rounded-xl items-center justify-center mr-3">
            <Text style={{ fontSize: 20 }}>💰</Text>
          </View>
          <View className="flex-1">
            <Text className="text-xs text-slate-500 mb-1">Bill Amount</Text>
            <Text className="text-lg font-bold text-slate-900">
              ₱{bill.scannedCost.toFixed(2)}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center p-4 border-b border-slate-100">
          <View className="w-10 h-10 bg-orange-100 rounded-xl items-center justify-center mr-3">
            <Text style={{ fontSize: 20 }}>⛽</Text>
          </View>
          <View className="flex-1">
            <Text className="text-xs text-slate-500 mb-1">Consumption</Text>
            <Text className="text-lg font-bold text-slate-900">
              {bill.scannedLiters} Liters
            </Text>
          </View>
        </View>
        <View className="flex-row items-center p-4">
          <View className="w-10 h-10 bg-red-100 rounded-xl items-center justify-center mr-3">
            <Text style={{ fontSize: 20 }}>📅</Text>
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
