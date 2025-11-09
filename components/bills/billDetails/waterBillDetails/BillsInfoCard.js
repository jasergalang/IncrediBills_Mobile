import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function BillInfoCard({ bill }) {
  return (
    <View className="p-4">
      <LinearGradient
        colors={["#eff6ff", "#dbeafe"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-2xl p-5 border-2 border-blue-200"
      >
        <View className="flex-row items-center gap-3 mb-4">
          <View className="w-14 h-14 bg-blue-500 rounded-2xl items-center justify-center">
            <Text className="text-3xl">💧</Text>
          </View>
          <View className="flex-1">
            <Text className="text-lg font-bold text-slate-900 mb-1">
              Water Bill
            </Text>
            <View className="flex-row items-center gap-2">
              <Ionicons name="calendar-outline" size={14} color="#64748b" />
              <Text className="text-sm text-slate-600">{bill.scannedDate}</Text>
            </View>
          </View>
          <View
            className={`px-3 py-1 rounded-full ${
              bill.status === "uploaded" ? "bg-green-100" : "bg-amber-100"
            }`}
          >
            <Text
              className={`text-xs font-bold ${
                bill.status === "uploaded" ? "text-green-700" : "text-amber-700"
              }`}
            >
              {bill.status === "uploaded" ? "Verified" : "Processing"}
            </Text>
          </View>
        </View>

        <View className="bg-white/60 rounded-xl p-4">
          <View className="flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-sm text-slate-600 mb-1">Total Amount</Text>
              <Text className="text-3xl font-bold text-blue-600">
                ₱{bill.scannedCost.toFixed(2)}
              </Text>
            </View>
            <View className="w-px h-12 bg-slate-300"></View>
            <View className="flex-1 items-end">
              <Text className="text-sm text-slate-600 mb-1">Consumption</Text>
              <Text className="text-3xl font-bold text-indigo-600">
                {bill.scannedConsumption} m³
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
