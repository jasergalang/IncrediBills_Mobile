import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function BillsUtilitiesGrid({ utilities, onPress }) {
  return (
    <View className="px-4 pb-4">
      <Text className="text-lg font-bold text-slate-900 mb-4">
        Utilities Overview
      </Text>
      <View className="flex-row flex-wrap gap-3">
        {utilities.map((utility) => (
          <TouchableOpacity
            key={utility.id}
            onPress={() => onPress(utility)}
            activeOpacity={0.7}
            className="w-[48%]"
          >
            <View
              className="rounded-2xl p-4"
              style={{
                backgroundColor: utility.backgroundColor,
                borderColor: utility.backgroundColor // border matches background
              }}
            >
              <View className="w-10 h-10 bg-white rounded-xl items-center justify-center mb-3">
                <Text className="text-2xl">{utility.icon}</Text>
              </View>
              <Text className="text-sm font-semibold text-slate-600 mb-1">
                {utility.name}
              </Text>
              <Text className="text-xl font-bold text-slate-900 mb-1">
                ₱{utility.amount}
              </Text>
              <Text
                className={`text-xs font-semibold ${utility.change < 0 ? "text-green-600" : "text-red-600"
                  }`}
              >
                {utility.change < 0 ? "↓" : "↑"} {Math.abs(utility.change)}%{" "}
                {utility.change < 0 ? "saved" : "increase"}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}