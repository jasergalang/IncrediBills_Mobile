import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DashboardHeader({ navigation }) {
  return (
    <View className="bg-white border-b border-slate-200 px-4 py-4">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-2xl font-bold text-slate-900">Dashboard</Text>
          <Text className="text-sm text-slate-600">Welcome back! 👋</Text>
        </View>
        <View className="flex-row gap-2">
          <TouchableOpacity className="w-10 h-10 rounded-xl bg-blue-100 items-center justify-center">
            <Text style={{ fontSize: 20 }}>🔔</Text>
            <View className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            className="w-10 h-10 rounded-xl bg-slate-100 items-center justify-center"
          >
            <Text style={{ fontSize: 20 }}>☰</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
