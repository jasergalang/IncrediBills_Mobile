import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function KitchenGasBox({ navigation }) {
  return (
    <View className="px-4 pb-4">
      <TouchableOpacity
        onPress={() => navigation.navigate("UploadDocument")}
        activeOpacity={0.7}
        className="bg-white rounded-2xl p-8 border-2 border-dashed border-orange-300 items-center"
      >
        <View className="w-16 h-16 bg-orange-100 rounded-full items-center justify-center mb-4">
          <Ionicons name="cloud-upload-outline" size={32} color="#f97316" />
        </View>
        <Text className="text-lg font-bold text-slate-900 mb-2">
          Upload Kitchen Gas Bill
        </Text>
        <Text className="text-sm text-slate-600 text-center mb-4">
          Take a photo or select from gallery
        </Text>
        <View className="bg-orange-500 px-6 py-3 rounded-xl">
          <Text className="text-white font-semibold">Select File</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}