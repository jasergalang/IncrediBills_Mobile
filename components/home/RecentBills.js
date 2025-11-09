import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RecentBills({ bills, navigation }) {
  return (
    <View className="px-4 pb-4">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-base font-bold text-slate-900">Recent Bills</Text>
        <TouchableOpacity>
          <Text className="text-sm font-semibold text-blue-600">View All</Text>
        </TouchableOpacity>
      </View>
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
              <Text className="font-semibold text-slate-900">{bill.type}</Text>
              <Text className="text-xs text-slate-600">{bill.date}</Text>
            </View>
            <View className="items-end">
              <Text className="font-bold text-slate-900">
                ₱{bill.amount.toLocaleString()}
              </Text>
              <View className="bg-green-100 px-2 py-1 rounded-full mt-1">
                <Text className="text-xs font-bold text-green-700">Paid</Text>
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}
