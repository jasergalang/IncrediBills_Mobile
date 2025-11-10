import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function PlayerStatsCard({ playerStats, activeQuests }) {
    const xpPercentage = (playerStats.currentXP / playerStats.requiredXP) * 100;

    return (
        <View className="p-4">
            <LinearGradient
                colors={["#6366f1", "#8b5cf6", "#ec4899"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="rounded-2xl p-6"
            >
                {/* Top Section: Level & Name */}
                <View className="flex-row items-center mb-4">
                    <View className="w-20 h-20 bg-white/20 rounded-full items-center justify-center border-4 border-white/40 mr-4">
                        <Text className="text-3xl font-bold text-white">{playerStats.level}</Text>
                    </View>
                    <View className="flex-1">
                        <Text className="text-2xl font-bold text-white mb-1">
                            Pollution Fighter
                        </Text>
                        <Text className="text-white/80 text-sm">
                            Level {playerStats.level} Eco Warrior
                        </Text>
                    </View>
                </View>

                {/* XP Progress Bar */}
                <View className="mb-4">
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-white font-semibold text-sm">
                            {playerStats.currentXP} / {playerStats.requiredXP} XP
                        </Text>
                        <Text className="text-white font-semibold text-sm">
                            {Math.round(xpPercentage)}%
                        </Text>
                    </View>
                    <View className="h-3 bg-white/20 rounded-full overflow-hidden">
                        <View
                            className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"
                            style={{ width: `${xpPercentage}%` }}
                        />
                    </View>
                    <Text className="text-xs text-white/70 mt-2">
                        {playerStats.requiredXP - playerStats.currentXP} XP to next level
                    </Text>
                </View>

                {/* Stats Grid */}
                <View className="flex-row flex-wrap gap-2">
                    <View className="flex-1 min-w-[45%] bg-white/10 rounded-xl p-3 border border-white/20">
                        <Text className="text-2xl mb-1">⭐</Text>
                        <Text className="text-xl font-bold text-white mb-1">
                            {playerStats.totalPoints}
                        </Text>
                        <Text className="text-xs text-white/80">Total Points</Text>
                    </View>
                    <View className="flex-1 min-w-[45%] bg-white/10 rounded-xl p-3 border border-white/20">
                        <Text className="text-2xl mb-1">👹</Text>
                        <Text className="text-xl font-bold text-white mb-1">
                            {playerStats.monstersDefeated}
                        </Text>
                        <Text className="text-xs text-white/80">Defeated</Text>
                    </View>
                    <View className="flex-1 min-w-[45%] bg-white/10 rounded-xl p-3 border border-white/20">
                        <Text className="text-2xl mb-1">🔥</Text>
                        <Text className="text-xl font-bold text-white mb-1">
                            {playerStats.streak}
                        </Text>
                        <Text className="text-xs text-white/80">Day Streak</Text>
                    </View>
                    <View className="flex-1 min-w-[45%] bg-white/10 rounded-xl p-3 border border-white/20">
                        <Text className="text-2xl mb-1">🎯</Text>
                        <Text className="text-xl font-bold text-white mb-1">
                            {activeQuests.length}
                        </Text>
                        <Text className="text-xs text-white/80">Active Quests</Text>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
}