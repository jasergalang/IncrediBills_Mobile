import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

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
            <Text style={{ fontSize: 22, color: "white" }}>💡</Text>
          </View>
          <Text className="text-base font-bold text-green-900">
            Water Saving Tips
          </Text>
        </View>

        <View className="space-y-2">
          <View className="flex-row items-start gap-2">
            <Text className="text-green-600 mt-0.5">•</Text>
            <Text className="text-sm text-green-800 flex-1">
              Fix leaking faucets and pipes to save up to 10% on water bills
            </Text>
          </View>
          <View className="flex-row items-start gap-2">
            <Text className="text-green-600 mt-0.5">•</Text>
            <Text className="text-sm text-green-800 flex-1">
              Use water-efficient appliances and fixtures
            </Text>
          </View>
          <View className="flex-row items-start gap-2">
            <Text className="text-green-600 mt-0.5">•</Text>
            <Text className="text-sm text-green-800 flex-1">
              Collect rainwater for watering plants and cleaning
            </Text>
          </View>
          <View className="flex-row items-start gap-2">
            <Text className="text-green-600 mt-0.5">•</Text>
            <Text className="text-sm text-green-800 flex-1">
              Take shorter showers and turn off taps when not in use
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
