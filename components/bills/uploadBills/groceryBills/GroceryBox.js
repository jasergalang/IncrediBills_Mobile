import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function GroceryBox({ pickImage, category }) {
  return (
    <TouchableOpacity
      onPress={pickImage}
      activeOpacity={0.7}
      className="bg-white rounded-2xl p-8 border-2 border-dashed border-green-300 items-center mb-4"
    >
      <View className="w-16 h-16 bg-green-100 rounded-full items-center justify-center mb-4">
        <Ionicons name="cloud-upload-outline" size={32} color="#22c55e" />
      </View>
      <Text className="text-lg font-bold text-slate-900 mb-2">
        Upload {category.name} Receipt
      </Text>
      <Text className="text-sm text-slate-600 text-center mb-4">
        Take a photo or select from gallery
      </Text>
      <View className="bg-green-500 px-6 py-3 rounded-xl">
        <Text className="text-white font-semibold">Select File</Text>
      </View>
    </TouchableOpacity>
  );
}