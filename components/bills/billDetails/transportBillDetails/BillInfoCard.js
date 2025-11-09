import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function BillInfoCard({ bill }) {
  return (
    <View className="p-4">
      <LinearGradient
        colors={["#6b7280", "#4b5563"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-2xl p-5"
      >
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-white/80 text-sm mb-1">Upload Date</Text>
            <Text className="text-white font-bold text-lg">{bill.date}</Text>
          </View>
          <View className="bg-white/20 px-3 py-2 rounded-xl">
            <View className="flex-row items-center gap-1">
              <Ionicons name="checkmark-circle" size={16} color="#fff" />
              <Text className="text-white font-semibold text-sm">Uploaded</Text>
            </View>
          </View>
        </View>

        <View className="flex-row items-center gap-4">
          <View className="flex-1 bg-white/20 rounded-xl p-3">
            <Text className="text-white/80 text-xs mb-1">File Size</Text>
            <Text className="text-white font-bold text-base">2.1 MB</Text>
          </View>
          <View className="flex-1 bg-white/20 rounded-xl p-3">
            <Text className="text-white/80 text-xs mb-1">Format</Text>
            <Text className="text-white font-bold text-base">JPG</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}