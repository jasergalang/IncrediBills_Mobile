import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function GroceryHeader({ navigation, category }) {
  return (
    <View className="bg-white border-b border-slate-200 px-4 py-4">
      <View className="flex-row items-center justify-between">

        {/* Left: Back + Text */}
        <View className="flex-1 pr-4">
          <View className="flex-row items-center mb-1">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="w-8 h-8 rounded-lg bg-green-100 items-center justify-center mr-2"
            >
              <Text style={{ fontSize: 18 }}>❮</Text>
            </TouchableOpacity>

            <Text className="text-2xl font-bold text-slate-900">
              {category.icon} {category.name} Bills
            </Text>
          </View>

          <Text className="text-sm text-slate-600">
            Upload and manage your electricity bills
          </Text>
        </View>

        {/* Right: Icons */}
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