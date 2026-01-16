import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function BillHistory({ billsHistory = [], selectedCategory, selectedUtility}) {

  const amountColor = selectedUtility
    ? `text-${selectedUtility.color}-600`
    : "text-slate-600";

  // Empty state (same UX pattern as BillsRecentSection)
  if (!selectedCategory) {
    return (
      <View className="bg-white rounded-2xl border border-slate-200 p-8 mb-6 items-center">
        <Text className="text-5xl mb-3">📊</Text>
        <Text className="text-lg font-bold text-slate-900 mb-2">
          Select a Utility
        </Text>
        <Text className="text-sm text-slate-600 text-center">
          Choose a category to view bill history.
        </Text>
      </View>
    );
  }

  if (!billsHistory.length) {
    return (
      <View className="bg-white rounded-2xl border border-slate-200 p-8 mb-6 items-center">
        <Text className="text-5xl mb-3">📋</Text>
        <Text className="text-lg font-bold text-slate-900 mb-2">
          No Bills History
        </Text>
        <Text className="text-sm text-slate-600 text-center">
          No historical bills found for {selectedCategory}.
        </Text>
      </View>
    );
  }

  return (
    <View className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
      {/* Header */}
      <View className="mb-6">
        <View className="flex-row items-center justify-between mb-1">
          <Text className="text-xl font-bold text-slate-900">
            Bills History
          </Text>
          <TouchableOpacity className="px-4 py-2 bg-slate-100 rounded-xl">
            <Text className="text-sm font-semibold text-slate-700">
              Export CSV
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="text-sm text-slate-600">
          Past bills for {selectedCategory}
        </Text>
      </View>

      {/* Bills */}
      {billsHistory.map((bill) => (
        <View
          key={bill.id}
          className="border-b border-slate-100 py-3 last:border-b-0"
        >
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-sm font-medium text-slate-900">
              {bill.date}
            </Text>
            <View
              className={`px-3 py-1 rounded-full ${bill.status === "Success"
                ? "bg-green-100"
                : "bg-red-100"
                }`}
            >
              <Text
                className={`text-xs font-semibold ${bill.status === "Success"
                  ? "text-green-700"
                  : "text-red-700"
                  }`}
              >
                {bill.status === "Success" ? "✓ Paid" : "✗ Failed"}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center justify-between">
            <Text className={`text-lg font-bold ${amountColor}`}>
              ₱{bill.amount.toLocaleString()}
            </Text>

            <Text className="text-sm text-slate-600">
              {bill.provider}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}
