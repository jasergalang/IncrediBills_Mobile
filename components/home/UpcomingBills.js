import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function UpcomingBills({ bills }) {
  return (
    <View className="px-4 pb-6">
      <Text className="text-base font-bold text-slate-900 mb-3">
        Upcoming Bills
      </Text>
      {bills.map((bill) => (
        <LinearGradient
          key={bill.id}
          colors={["#fef3c7", "#fde68a"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-2xl p-4 mb-3 border-2 border-amber-200"
        >
          <View className="flex-row items-center gap-3">
            <View
              className={`w-12 h-12 bg-${bill.color}-500 rounded-xl items-center justify-center`}
            >
              <Text className="text-2xl">{bill.icon}</Text>
            </View>
            <View className="flex-1">
              <Text className="font-bold text-slate-900">{bill.type}</Text>
              <Text className="text-xs text-slate-600">
                Due: {bill.dueDate}
              </Text>
            </View>
            <Text className="font-bold text-amber-900">
              ₱{bill.amount.toLocaleString()}
            </Text>
          </View>
        </LinearGradient>
      ))}
    </View>
  );
}
