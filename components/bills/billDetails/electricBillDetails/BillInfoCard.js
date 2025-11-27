import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function BillInfoCard({ bill }) {
  return (
    <View className="p-4">
      <LinearGradient
        colors={["#fffbeb", "#fef3c7"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-2xl p-5 border-2 border-amber-200"
      >
        <View className="flex-row items-center gap-3 mb-4">
          <View className="w-14 h-14 bg-amber-500 rounded-2xl items-center justify-center">
            <Text className="text-3xl">⚡</Text>
          </View>

          <View className="flex-1">
            <Text className="text-lg font-bold text-slate-900 mb-1">
              Electricity Bill
            </Text>
            <View className="flex-row items-center gap-2">
              <Ionicons name="calendar-outline" size={14} color="#64748b" />
              <Text className="text-sm text-slate-600">
                {bill.scannedDate || "N/A"}
              </Text>
            </View>
          </View>

           <View
            className={`px-3 py-1 rounded-full ${
              bill.status === "Success" ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <Text
              className={`text-xs font-bold ${
                bill.status === "Success"
                  ? "text-green-700"
                  : "text-red-700"
              }`}
            >
              {bill.status === "Success" ? "Verified" : "Failed"}
            </Text>
          </View>
        </View>

        <View className="bg-white/60 rounded-xl p-4">
          <View className="flex-row justify-between items-center">
            
            <View className="flex-1">
              <Text className="text-sm text-slate-600 mb-1">Total Amount</Text>
              <Text className="text-3xl font-bold text-amber-600">
                ₱{bill.scannedCost.toFixed(2)}
              </Text>
            </View>

            <View className="w-px h-12 bg-slate-300"></View>

            <View className="flex-1 items-end">
              <Text className="text-sm text-slate-600 mb-1">Consumption</Text>
              <Text className="text-3xl font-bold text-orange-600">
                {bill.scannedConsumption} kWh
              </Text>
            </View>

          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
