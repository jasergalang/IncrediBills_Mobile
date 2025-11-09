import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function ElectricTips() {
  return (
    <View className="px-4 pb-6">
      <LinearGradient
        colors={["#fef3c7", "#fde68a"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-2xl p-4 border-2 border-amber-200"
      >
        <View className="flex-row items-start gap-3">
          <View className="w-10 h-10 bg-amber-500 rounded-xl items-center justify-center">
            <Text className="text-2xl">💡</Text>
          </View>
          <View className="flex-1">
            <Text className="text-sm font-bold text-amber-900 mb-2">
              Pro Tips
            </Text>
            <Text className="text-xs text-amber-700 mb-1">
              • Ensure the bill is clearly visible and readable
            </Text>
            <Text className="text-xs text-amber-700 mb-1">
              • Use good lighting when taking photos
            </Text>
            <Text className="text-xs text-amber-700">
              • Supported formats: PNG, JPG, PDF
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
