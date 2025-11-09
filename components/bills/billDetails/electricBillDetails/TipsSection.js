import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function TipsSection() {
  return (
    <View className="px-4 pb-6">
      <LinearGradient
        colors={["#ecfdf5", "#d1fae5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-2xl p-5 border-2 border-green-200"
      >
        <View className="flex-row items-center gap-3 mb-3">
          <View className="w-12 h-12 bg-green-500 rounded-xl items-center justify-center">
            <Ionicons name="bulb" size={24} color="#fff" />
          </View>
          <Text className="text-base font-bold text-green-900">
            Energy Saving Tips
          </Text>
        </View>

        <View className="space-y-2">
          <View className="flex-row items-start gap-2">
            <Text className="text-green-600 mt-0.5">•</Text>
            <Text className="text-sm text-green-800 flex-1">
              Switch to LED bulbs to reduce energy consumption by up to 75%
            </Text>
          </View>
          <View className="flex-row items-start gap-2">
            <Text className="text-green-600 mt-0.5">•</Text>
            <Text className="text-sm text-green-800 flex-1">
              Unplug appliances when not in use to avoid phantom loads
            </Text>
          </View>
          <View className="flex-row items-start gap-2">
            <Text className="text-green-600 mt-0.5">•</Text>
            <Text className="text-sm text-green-800 flex-1">
              Use inverter air conditioners for better energy efficiency
            </Text>
          </View>
          <View className="flex-row items-start gap-2">
            <Text className="text-green-600 mt-0.5">•</Text>
            <Text className="text-sm text-green-800 flex-1">
              Set AC temperature to 24-26°C for optimal cooling and savings
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
