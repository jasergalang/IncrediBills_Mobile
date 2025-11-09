import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function TransportTips() {
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
            Fuel Saving Tips
          </Text>
        </View>

        <View className="space-y-2">
          <View className="flex-row items-start gap-2">
            <Text className="text-gray-600 mt-0.5">•</Text>
            <Text className="text-sm text-gray-800 flex-1">
              Maintain proper tire pressure to improve fuel efficiency by 3%
            </Text>
          </View>
          <View className="flex-row items-start gap-2">
            <Text className="text-gray-600 mt-0.5">•</Text>
            <Text className="text-sm text-gray-800 flex-1">
              Avoid aggressive driving to save up to 33% on fuel costs
            </Text>
          </View>
          <View className="flex-row items-start gap-2">
            <Text className="text-gray-600 mt-0.5">•</Text>
            <Text className="text-sm text-gray-800 flex-1">
              Use cruise control on highways for better fuel economy
            </Text>
          </View>
          <View className="flex-row items-start gap-2">
            <Text className="text-gray-600 mt-0.5">•</Text>
            <Text className="text-sm text-gray-800 flex-1">
              Remove excess weight from your vehicle to reduce fuel consumption
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
