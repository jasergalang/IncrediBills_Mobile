import React from "react";
import { View, Text } from "react-native";

export default function SummaryCards({ summaryData }) {
  return (
    <View className="pb-2 mb-2">
      <View className="flex-row gap-3 mb-3">
        {/* Current Bills Card */}
        <View className="flex-1 bg-white rounded-2xl p-4 border border-slate-200">
          <View className="flex-row items-start justify-between mb-2">
            <Text className="text-2xl">📊</Text>
            <View className="px-2 py-1 rounded-full bg-slate-100">
              <Text className="text-xs font-semibold text-slate-600">
                Current
              </Text>
            </View>
          </View>
          <Text className="text-xl font-bold text-slate-900">
            ₱{summaryData.totalBills?.toLocaleString() || 0}
          </Text>
          <Text className="text-xs text-slate-400">This Month</Text>
        </View>

        {/* Savings Card */}
        <View className="flex-1 bg-white rounded-2xl p-4 border border-slate-200">
          <View className="flex-row items-start justify-between mb-2">
            <Text className="text-2xl">🔮</Text>

              <Text className="text-xs font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                Predicted
              </Text>
         
          </View>
          <Text className="text-xl font-bold text-black-600">
            ₱{summaryData.savings?.toLocaleString() || 0}
          </Text>
          <Text className="text-xs text-slate-400">Next Month</Text>
        </View>
      </View>

      <View className="flex-row gap-3">
        {/* Predicted Bills Card */}
        <View className="flex-1 bg-white rounded-2xl p-4 border border-slate-200">
          <View className="flex-row items-start justify-between mb-2">
            <Text className="text-2xl">💰</Text>

              <Text className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                Savings
              </Text>
            
          </View>
          <Text className="text-xl font-bold text-green-500">
            ₱{summaryData.predicted?.toLocaleString() || 0}
          </Text>
          <Text className="text-xs text-slate-400">AI Prediction</Text>
        </View>

        {/* Accuracy Card */}
        <View className="flex-1 bg-white rounded-2xl p-4 border border-slate-200">
          <View className="flex-row items-start justify-between mb-2">
            <Text className="text-2xl">🎯</Text>
              <Text className="text-xs font-semibold text-green-700 bg-green-300 px-3 py-1 rounded-full">
                Accuracy
              </Text>
          
          </View>
          <Text className="text-xl font-bold text-blue-600">
            {summaryData.accuracy || 0}%
          </Text>
          <Text className="text-xs text-slate-400">Confidence</Text>
        </View>
      </View>
    </View>
  );
}
