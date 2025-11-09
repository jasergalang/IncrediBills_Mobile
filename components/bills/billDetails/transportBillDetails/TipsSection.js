import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function TipsSection() {
  return (
    <View className="px-4 pb-6">
      <LinearGradient
        colors={["#e5e7eb", "#d1d5db"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-2xl p-5 border-2 border-gray-200"
      >
        <View className="flex-row items-center gap-3 mb-3">
          <View className="w-12 h-12 bg-gray-600 rounded-xl items-center justify-center">
            <Ionicons name="bulb" size={24} color="#fff" />
          </View>
          <Text className="text-base font-bold text-gray-900">
            Fuel Efficiency Tips
          </Text>
        </View>

        <View className="space-y-2">
          <View className="flex-row items-start gap-2 mb-2">
            <Text className="text-gray-600 mt-0.5">•</Text>
            <Text className="text-sm text-gray-800 flex-1">
              Maintain steady speed to save up to 15% on fuel costs
            </Text>
          </View>
          <View className="flex-row items-start gap-2 mb-2">
            <Text className="text-gray-600 mt-0.5">•</Text>
            <Text className="text-sm text-gray-800 flex-1">
              Check tire pressure regularly for optimal fuel economy
            </Text>
          </View>
          <View className="flex-row items-start gap-2 mb-2">
            <Text className="text-gray-600 mt-0.5">•</Text>
            <Text className="text-sm text-gray-800 flex-1">
              Avoid idling for more than 30 seconds to reduce waste
            </Text>
          </View>
          <View className="flex-row items-start gap-2">
            <Text className="text-gray-600 mt-0.5">•</Text>
            <Text className="text-sm text-gray-800 flex-1">
              Plan routes ahead to minimize unnecessary driving
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
