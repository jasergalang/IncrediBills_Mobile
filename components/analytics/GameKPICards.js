import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function GameKPICards({ gameKPI }) {
  return (
    <View className="px-4 py-4">
      <View className="flex-row gap-3 mb-3">
        <LinearGradient
          colors={["#9333ea", "#7c3aed"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="flex-1 rounded-2xl p-4"
        >
          <Text className="text-3xl mb-2">🏆</Text>
          <Text className="text-2xl font-bold text-white mb-1">
            {gameKPI.totalPoints.toLocaleString()}
          </Text>
          <Text className="text-white/80 text-xs">Total Points</Text>
        </LinearGradient>
        <LinearGradient
          colors={["#f59e0b", "#d97706"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="flex-1 rounded-2xl p-4"
        >
          <Text className="text-3xl mb-2">⭐</Text>
          <Text className="text-2xl font-bold text-white mb-1">
            Level {gameKPI.level}
          </Text>
          <Text className="text-white/80 text-xs">Current Level</Text>
        </LinearGradient>
      </View>
      <View className="flex-row gap-3">
        <View className="flex-1 bg-white rounded-2xl p-4 border border-slate-200">
          <Text className="text-2xl mb-2">🎯</Text>
          <Text className="text-xl font-bold text-slate-900 mb-1">
            #{gameKPI.rank}
          </Text>
          <Text className="text-slate-600 text-xs">Global Rank</Text>
        </View>
        <View className="flex-1 bg-white rounded-2xl p-4 border border-slate-200">
          <Text className="text-2xl mb-2">🔥</Text>
          <Text className="text-xl font-bold text-slate-900 mb-1">
            {gameKPI.streak} Days
          </Text>
          <Text className="text-slate-600 text-xs">Current Streak</Text>
        </View>
      </View>
    </View>
  );
}
