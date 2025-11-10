import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function KitchenGasBox({ pickImage, category }) {
  return (
    <TouchableOpacity
      onPress={pickImage}
      activeOpacity={0.7}
      className="border-2 border-dashed border-orange-300 rounded-2xl bg-orange-50 p-8 items-center justify-center mb-4"
    >
      <View className="w-16 h-16 bg-orange-100 rounded-full items-center justify-center mb-4">
        <Ionicons name="cloud-upload-outline" size={32} color="#f97316" />
      </View>
      <Text className="text-base font-semibold text-slate-900 mb-2">
        Tap to Upload
      </Text>
      <Text className="text-sm text-slate-600 text-center mb-4">
        Choose a file from your device or take a photo
      </Text>
      <View className="flex-row gap-2">
        <View className="bg-white px-3 py-1 rounded-full border border-slate-200">
          <Text className="text-xs text-slate-600 font-medium">PNG</Text>
        </View>
        <View className="bg-white px-3 py-1 rounded-full border border-slate-200">
          <Text className="text-xs text-slate-600 font-medium">JPG</Text>
        </View>
        <View className="bg-white px-3 py-1 rounded-full border border-slate-200">
          <Text className="text-xs text-slate-600 font-medium">PDF</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}