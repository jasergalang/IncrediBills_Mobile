import React from 'react'
import { View, Text } from 'react-native';
export default function LeaderboardHeader() {
    return (
        <View className="bg-white border-b border-slate-200 px-4 py-4">
            <Text className="text-2xl font-bold text-slate-900 mb-1">
                Leaderboard 🏆
            </Text>
            <Text className="text-sm text-slate-600">
                Compete with eco-warriors worldwide and climb to the top!
            </Text>
        </View>
    )
}
