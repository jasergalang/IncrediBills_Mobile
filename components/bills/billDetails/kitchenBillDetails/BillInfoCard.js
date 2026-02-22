import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function BillInfoCard({ bill }) {
  return (
    <View className="p-4">
      <LinearGradient
        colors={["#fff7ed", "#fed7aa"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-2xl p-5 border-2 border-orange-400"
      >
        <View className="flex-row items-center gap-3 mb-4">
          <View className="w-14 h-14 bg-orange-500 rounded-2xl items-center justify-center">
            <Text className="text-3xl">🔥</Text>
          </View>

          <View className="flex-1">
            <Text className="text-lg font-bold text-slate-900 mb-1">
              Kitchen Gas Bill
            </Text>
            <Text className="text-sm text-slate-600">
              {bill.scannedDate || "N/A"}
            </Text>
          </View>

          <View
            className={`px-3 py-1 rounded-full ${
              bill.status === "Success" ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <Text
              className={`text-xs font-bold ${
                bill.status === "Success" ? "text-green-700" : "text-red-700"
              }`}
            >
              {bill.status === "Success" ? "Verified" : "Failed"}
            </Text>
          </View>
        </View>

        {/* Total Amount + Cycle Days */}
        <View className="bg-white/60 rounded-xl p-4">
          <View className="flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-sm text-slate-600 mb-1">Total Amount</Text>
              <Text className="text-3xl font-bold text-orange-600">
                ₱{bill.scannedCost?.toFixed(2) ?? "0.00"}
              </Text>
            </View>

            <View className="w-px h-12 bg-slate-300" />

            <View className="flex-1 items-end">
              <Text className="text-sm text-slate-600 mb-1">Cycle Days</Text>
              <Text className="text-3xl font-bold text-orange-600">
                {bill.scannedCycleDays ?? "—"}
                <Text className="text-base font-semibold text-slate-600"> days</Text>
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}