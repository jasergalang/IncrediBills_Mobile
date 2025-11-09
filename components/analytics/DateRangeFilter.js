import React from "react";
import { View, TouchableOpacity, Text, ScrollView } from "react-native";

export default function DateRangeFilter({ dateRange, setDateRange }) {
  const ranges = ["week", "month", "3months", "6months"];
  return (
    <View className="px-4 pt-4 pb-2">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-2">
          {ranges.map((range) => (
            <TouchableOpacity
              key={range}
              onPress={() => setDateRange(range)}
              className={`px-4 py-2 rounded-lg ${dateRange === range ? "bg-blue-600" : "bg-slate-100"}`}
            >
              <Text
                className={`font-semibold text-sm ${dateRange === range ? "text-white" : "text-slate-600"}`}
              >
                {range === "3months"
                  ? "3M"
                  : range === "6months"
                    ? "6M"
                    : range.charAt(0).toUpperCase() + range.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
