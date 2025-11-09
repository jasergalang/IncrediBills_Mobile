import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TransportHeader({ navigation }) {
  return (
    <View className="bg-white border-b border-slate-200 px-4 py-4">
      <View className="flex-row items-center gap-3">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-10 h-10 rounded-xl bg-slate-100 items-center justify-center"
        >
          <Ionicons name="arrow-back" size={20} color="#000" />
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="text-xl font-bold text-slate-900">
            ⛽ Transport Fuel
          </Text>
          <Text className="text-sm text-slate-600">
            Upload & manage fuel bills
          </Text>
        </View>
        <TouchableOpacity className="w-10 h-10 rounded-xl bg-gray-100 items-center justify-center">
          <Ionicons name="settings-outline" size={20} color="#6b7280" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
