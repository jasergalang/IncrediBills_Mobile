import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TransportActions() {
  return (
    <View className="px-4 pb-4">
      <Text className="text-base font-bold text-slate-900 mb-3">
        Quick Actions
      </Text>
      <View className="flex-row gap-3">
        <TouchableOpacity className="flex-1 bg-white rounded-2xl p-4 border border-slate-200">
          <View className="w-10 h-10 bg-gray-100 rounded-xl items-center justify-center mb-2">
            <Ionicons name="camera-outline" size={20} color="#6b7280" />
          </View>
          <Text className="font-semibold text-slate-900 text-sm">
            Scan Receipt
          </Text>
          <Text className="text-xs text-slate-600 mt-1">Use camera</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-white rounded-2xl p-4 border border-slate-200">
          <View className="w-10 h-10 bg-gray-100 rounded-xl items-center justify-center mb-2">
            <Ionicons name="folder-outline" size={20} color="#6b7280" />
          </View>
          <Text className="font-semibold text-slate-900 text-sm">
            View History
          </Text>
          <Text className="text-xs text-slate-600 mt-1">All receipts</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
