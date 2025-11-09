import React from "react";
import { View, Text } from "react-native";

export default function AchievementsProgress({ achievements }) {
  return (
    <View className="px-4 pb-4">
      <View className="bg-white rounded-2xl p-5 border border-slate-200">
        <Text className="text-base font-bold text-slate-900 mb-4">
          Achievement Progress
        </Text>
        {achievements.map((ach, idx) => (
          <View key={idx} className="mb-4">
            <View className="flex-row items-center gap-3 mb-2">
              <Text className="text-2xl">{ach.icon}</Text>
              <View className="flex-1">
                <Text className="font-semibold text-slate-900 text-sm">
                  {ach.name}
                </Text>
                <Text className="text-xs text-slate-600">
                  {ach.progress}% Complete
                </Text>
              </View>
              <Text className="font-bold text-purple-600">{ach.progress}%</Text>
            </View>
            <View className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <View
                className="h-full bg-purple-500 rounded-full"
                style={{ width: `${ach.progress}%` }}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
