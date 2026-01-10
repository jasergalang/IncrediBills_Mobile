// components/prediction/BillHistory.js
import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Fake data for bill history
const fakeBills = [
  {
    id: 1,
    name: "Electricity",
    provider: "MERALCO",
    amount: 2500,
    date: "Dec 5, 2025",
    status: "Success",
    color: "yellow",
    icon: "💡",
  },
  {
    id: 2,
    name: "Water",
    provider: "Maynilad",
    amount: 1200,
    date: "Dec 7, 2025",
    status: "Success",
    color: "blue",
    icon: "💧",
  },
  {
    id: 3,
    name: "Internet",
    provider: "PLDT",
    amount: 1800,
    date: "Dec 10, 2025",
    status: "Success",
    color: "purple",
    icon: "🌐",
  },
  {
    id: 4,
    name: "Gas",
    provider: "Petron",
    amount: 950,
    date: "Dec 12, 2025",
    status: "Pending",
    color: "orange",
    icon: "🔥",
  },
  {
    id: 5,
    name: "Maintenance",
    provider: "Condo Mgmt",
    amount: 2000,
    date: "Dec 18, 2025",
    status: "Failed",
    color: "red",
    icon: "🛠️",
  },
];

export default function BillHistory() {
  if (!fakeBills || fakeBills.length === 0) {
    return (
      <View className="bg-white rounded-2xl border border-slate-200 p-6 mb-6 items-center">
        <Text className="text-5xl mb-3">📋</Text>
        <Text className="text-lg font-bold text-slate-900 mb-1">
          No Bills History
        </Text>
        <Text className="text-sm text-slate-600">
          No historical bills found yet.
        </Text>
      </View>
    );
  }

  // Summary stats
  const averageBill = Math.round(
    fakeBills.reduce((sum, b) => sum + b.amount, 0) / fakeBills.length
  );
  const lowestBill = Math.min(...fakeBills.map((b) => b.amount));
  const highestBill = Math.max(...fakeBills.map((b) => b.amount));

  return (
    <View className="bg-white rounded-2xl border border-slate-200 p-4 mb-6">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <View>
          <Text className="text-lg font-bold text-slate-900 mb-1">
            Bill History
          </Text>
          <Text className="text-sm text-slate-600">
            Your recent bills summary
          </Text>
        </View>
        <TouchableOpacity className="px-4 py-2 bg-slate-100 rounded-xl">
          <Text className="text-sm font-semibold text-slate-700">Export CSV</Text>
        </TouchableOpacity>
      </View>

      {/* Summary Stats */}
      <View className="flex-row justify-between mb-6">
        <View className="flex-1 bg-blue-50 rounded-xl p-4 mr-2">
          <Text className="text-sm text-slate-600 mb-1">Average Bill</Text>
          <Text className="text-2xl font-bold text-blue-600">
            ₱{averageBill.toLocaleString()}
          </Text>
        </View>
        <View className="flex-1 bg-emerald-50 rounded-xl p-4 mx-1">
          <Text className="text-sm text-slate-600 mb-1">Lowest Bill</Text>
          <Text className="text-2xl font-bold text-emerald-600">
            ₱{lowestBill.toLocaleString()}
          </Text>
        </View>
        <View className="flex-1 bg-red-50 rounded-xl p-4 ml-2">
          <Text className="text-sm text-slate-600 mb-1">Highest Bill</Text>
          <Text className="text-2xl font-bold text-red-600">
            ₱{highestBill.toLocaleString()}
          </Text>
        </View>
      </View>

      {/* Bill Items */}
      <ScrollView className="space-y-3">
        {fakeBills.map((bill) => (
          <View
            key={bill.id}
            className={`bg-${bill.color}-50 rounded-xl p-4 border border-${bill.color}-100`}
          >
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center gap-3 flex-1">
                <View
                  className={`w-12 h-12 bg-${bill.color}-100 rounded-xl items-center justify-center`}
                >
                  <Text className="text-2xl">{bill.icon}</Text>
                </View>
                <View className="flex-1">
                  <Text className="font-bold text-slate-900 text-sm mb-1">
                    {bill.name} Bill
                  </Text>
                  <Text className="text-xs text-slate-600">{bill.provider}</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Ionicons name="ellipsis-horizontal" size={20} color="#64748b" />
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-xs text-slate-600 mb-1">Amount</Text>
                <Text className={`text-lg font-bold text-${bill.color}-600`}>
                  ₱{bill.amount.toLocaleString()}
                </Text>
              </View>
              <View>
                <Text className="text-xs text-slate-600 mb-1">Due Date</Text>
                <Text className="text-sm font-semibold text-slate-900">
                  {bill.date}
                </Text>
              </View>
              <View>
                <View
                  className={`px-3 py-1 rounded-full ${
                    bill.status === "Success"
                      ? "bg-green-100"
                      : bill.status === "Failed"
                      ? "bg-red-100"
                      : "bg-amber-100"
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      bill.status === "Success"
                        ? "text-green-700"
                        : bill.status === "Failed"
                        ? "text-red-700"
                        : "text-amber-700"
                    }`}
                  >
                    {bill.status === "Success"
                      ? "✓ Paid"
                      : bill.status === "Pending"
                      ? "⏳ Pending"
                      : "✗ Overdue"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
