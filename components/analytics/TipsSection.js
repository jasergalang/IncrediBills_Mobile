import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function TipsSection({ type }) {
  return (
    <View className="px-4 pb-6">
      <LinearGradient
        colors={
          type === "utility" ? ["#fef3c7", "#fde68a"] : ["#ede9fe", "#c7d2fe"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-2xl p-5 border-2 border-amber-200"
      >
        <View className="flex-row items-center gap-3 mb-3">
          <View
            className={`w-10 h-10 ${type === "utility" ? "bg-amber-500" : "bg-purple-500"} rounded-xl items-center justify-center`}
          >
            <Ionicons name="bulb" size={20} color="#fff" />
          </View>
          <Text
            className={`text-base font-bold ${type === "utility" ? "text-amber-900" : "text-purple-900"}`}
          >
            {type === "utility" ? "Saving Tips" : "Game Tips"}
          </Text>
        </View>
        {type === "utility" ? (
          <>
            <Text className="text-sm text-amber-800 mb-2">
              • Switch to LED bulbs to save up to 75% on lighting costs
            </Text>
            <Text className="text-sm text-amber-800">
              • Fix leaking faucets to save up to 10% on water bills
            </Text>
          </>
        ) : (
          <>
            <Text className="text-sm text-purple-800 mb-2">
              • Play daily to earn streak bonuses
            </Text>
            <Text className="text-sm text-purple-800">
              • Complete challenges for extra points
            </Text>
          </>
        )}
      </LinearGradient>
    </View>
  );
}
