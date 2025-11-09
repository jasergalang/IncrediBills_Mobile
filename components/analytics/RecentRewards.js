import React from "react";
import { View, Text } from "react-native";

export default function RecentRewards({ rewards }) {
  return (
    <View className="px-4 pb-6">
      <View className="bg-white rounded-2xl p-5 border border-slate-200">
        <Text className="text-base font-bold text-slate-900 mb-4">
          Recent Rewards 🎁
        </Text>
        {rewards.map((reward, idx) => (
          <View
            key={idx}
            className="flex-row items-center gap-3 p-3 bg-purple-50 rounded-xl mb-2"
          >
            <View className="w-10 h-10 bg-purple-100 rounded-xl items-center justify-center">
              <Text className="text-xl">{reward.icon}</Text>
            </View>
            <View className="flex-1">
              <Text className="font-semibold text-slate-900 text-sm">
                {reward.name}
              </Text>
            </View>
            <Text className="font-bold text-purple-600">{reward.points}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
