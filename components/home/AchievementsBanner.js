import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function AchievementsBanner({ navigation }) {
  return (
    <View className="px-4 pb-4">
      <TouchableOpacity onPress={() => navigation.navigate("Games")}>
        <LinearGradient
          colors={["#9333ea", "#7c3aed"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-2xl p-5"
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-white font-bold text-lg mb-1">
                🏆 New Achievement!
              </Text>
              <Text className="text-white/80 text-sm mb-3">
                You've earned the "Bill Master" badge
              </Text>
              <View className="bg-white/20 self-start px-3 py-2 rounded-lg">
                <Text className="text-white font-semibold text-sm">
                  View Rewards →
                </Text>
              </View>
            </View>
            <Text className="text-6xl">🎉</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
