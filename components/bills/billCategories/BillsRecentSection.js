import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function BillsRecentSection({
  activeTab,
  setActiveTab,
  utilities,
  recentBills,
  filteredBills,
}) {
  return (
    <View className="bg-white rounded-2xl border border-slate-200 mx-4 p-4 mb-6">
      <View className="flex-row items-center justify-between mb-4">
        <View>
          <Text className="text-lg font-bold text-slate-900 mb-1">
            Recent Bills
          </Text>
          <Text className="text-xs text-slate-600">
            View and manage your bills
          </Text>
        </View>
        <TouchableOpacity className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 rounded-xl">
          <View className="px-4 py-2 rounded-xl flex-row items-center gap-2">
            <Ionicons name="add" size={16} color="#fff" />
            <Text className="text-white font-semibold text-xs">Add Bill</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-4"
      >
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "all" ? "bg-blue-600" : "bg-slate-100"
            }`}
          >
            <Text
              className={`font-semibold text-sm ${
                activeTab === "all" ? "text-white" : "text-slate-600"
              }`}
            >
              All Bills ({recentBills.length})
            </Text>
          </TouchableOpacity>
          {utilities.map((util) => (
            <TouchableOpacity
              key={util.id}
              onPress={() => setActiveTab(util.id)}
              className={`px-4 py-2 rounded-lg ${
                activeTab === util.id ? "bg-blue-600" : "bg-slate-100"
              }`}
            >
              <Text
                className={`font-semibold text-sm ${
                  activeTab === util.id ? "text-white" : "text-slate-600"
                }`}
              >
                {util.icon} {util.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View className="space-y-3">
        {filteredBills.map((bill) => (
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
                  <Text className="text-xs text-slate-600">
                    {bill.provider}
                  </Text>
                </View>
              </View>
              <TouchableOpacity>
                <Ionicons
                  name="ellipsis-horizontal"
                  size={20}
                  color="#64748b"
                />
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
                  {bill.dueDate}
                </Text>
              </View>
              <View>
                <View
                  className={`px-3 py-1 rounded-full ${
                    bill.status === "paid" ? "bg-green-100" : "bg-amber-100"
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      bill.status === "paid"
                        ? "text-green-700"
                        : "text-amber-700"
                    }`}
                  >
                    {bill.status === "paid" ? "✓ Paid" : "⏳ Pending"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
