import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function WelcomeCard({ userData }) {
  return (
    <View className="p-4">
      <LinearGradient
        colors={["#2563eb", "#4f46e5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-2xl p-5"
      >
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-1">
            <Text className="text-white/80 text-sm mb-1">Good Morning,</Text>
            <Text className="text-white font-bold text-xl">
              {userData.name}
            </Text>
          </View>
          <View className="w-14 h-14 bg-white/20 rounded-full items-center justify-center">
            <Text className="text-3xl">👤</Text>
          </View>
        </View>
        <View className="flex-row items-center gap-4">
          <View className="flex-1 bg-white/20 rounded-xl p-3">
            <Text className="text-white/80 text-xs mb-1">Level</Text>
            <Text className="text-white font-bold text-xl">
              {userData.level}
            </Text>
          </View>
          <View className="flex-1 bg-white/20 rounded-xl p-3">
            <Text className="text-white/80 text-xs mb-1">Points</Text>
            <Text className="text-white font-bold text-xl">
              {userData.points}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
