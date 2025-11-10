import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

export default function BillsTrendsChart({
  timeRange,
  setTimeRange,
  monthlyData,
}) {
  return (
    <View className="bg-white rounded-2xl border border-slate-200 mx-4 p-4 mb-4">
      <View className="flex-row items-center justify-between mb-4">
        <View>
          <Text className="text-lg font-bold text-slate-900 mb-1">
            Bills Trends
          </Text>
          <Text className="text-xs text-slate-600">
            Compare costs over time
          </Text>
        </View>
      </View>
      <View className="flex-row gap-2 mb-4">
        {["week", "month", "year"].map((range) => (
          <TouchableOpacity
            key={range}
            onPress={() => setTimeRange(range)}
            className={`flex-1 py-2 rounded-lg ${
              timeRange === range ? "bg-blue-600" : "bg-slate-100"
            }`}
          >
            <Text
              className={`text-center text-sm font-semibold ${
                timeRange === range ? "text-white" : "text-slate-600"
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View className="flex-row flex-wrap gap-3 mb-4">
        {[
          { color: "#3b82f6", name: "Water" },
          { color: "#f59e0b", name: "Electricity" },
          { color: "#f97316", name: "Gas" },
          { color: "#ef4444", name: "Fuel" },
          { color: "#22c55e", name: "Grocery" },
        ].map((item) => (
          <View key={item.name} className="flex-row items-center gap-2">
            <View
              className="w-3 h-3 rounded"
              style={{ backgroundColor: item.color }}
            />
            <Text className="text-xs font-medium text-slate-700">
              {item.name}
            </Text>
          </View>
        ))}
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-4 pb-4">
          {monthlyData.map((data, index) => (
            <View key={index} className="items-center gap-2">
              <View className="flex-row items-end gap-1 h-32">
                <View className="items-center w-6">
                  <View
                    className="w-full bg-blue-500 rounded-t"
                    style={{ height: `${(data.water / 4000) * 100}%` }}
                  />
                </View>
                <View className="items-center w-6">
                  <View
                    className="w-full bg-amber-500 rounded-t"
                    style={{
                      height: `${(data.electricity / 4000) * 100}%`,
                    }}
                  />
                </View>
                <View className="items-center w-6">
                  <View
                    className="w-full bg-orange-500 rounded-t"
                    style={{ height: `${(data.gas / 4000) * 100}%` }}
                  />
                </View>
                <View className="items-center w-6">
                  <View
                    className="w-full bg-red-500 rounded-t"
                    style={{ height: `${(data.fuel / 4000) * 100}%` }}
                  />
                </View>
                <View className="items-center w-6">
                  <View
                    className="w-full bg-green-500 rounded-t"
                    style={{ height: `${(data.grocery / 4000) * 100}%` }}
                  />
                </View>
              </View>
              <Text className="text-xs font-semibold text-slate-600">
                {data.month}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <View className="flex-row justify-between items-center mt-2 pt-2 border-t border-slate-200">
        <Text className="text-xs text-slate-600">Total Spending Trend</Text>
        <Text className="text-xs font-bold text-green-600">
          ↓ 12.5% reduction
        </Text>
      </View>
    </View>
  );
}
