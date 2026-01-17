import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RecentBills({ bills, navigation }) {
  return (
    <View className="px-4 pb-4">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-base font-bold text-slate-900">Recent Bills</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Upload")}>
          <Text className="text-sm font-semibold text-blue-600">View All</Text>
        </TouchableOpacity>
      </View>

      {/* Bills List */}
      {bills.map((bill) => (
        <View
          key={bill.id}
          className="bg-white rounded-2xl p-4 mb-3 border border-slate-200"
        >
          <View className="flex-row items-center gap-3">
            <View
              className={`w-12 h-12 bg-${bill.color}-100 rounded-xl items-center justify-center`}
            >
              <Text className="text-2xl">{bill.icon}</Text>
            </View>

            <View className="flex-1">
              <Text className="font-semibold text-slate-900">
                {bill.name} Bill
              </Text>
              <Text className="text-xs text-slate-600">{bill.date}</Text>
            </View>

            <View className="items-end">
              <Text className="font-bold text-slate-900">
                ₱{bill.amount.toLocaleString()}
              </Text>

              <View
                className={`px-2 py-1 rounded-full mt-1 ${
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
                  {bill.status === "Success" ? "✓ Verified" : "✕ Failed"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      ))}

      {/* Add New Bill Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Upload")}
        className="flex-row items-center justify-center bg-blue-600 py-4 rounded-2xl mt-2"
        activeOpacity={0.8}
      >
        <Ionicons name="add-circle-outline" size={20} color="white" />
        <Text className="text-white font-bold ml-2">Add New Bill</Text>
      </TouchableOpacity>
    </View>
  );
}
