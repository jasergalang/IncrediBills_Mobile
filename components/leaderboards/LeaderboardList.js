// components/leaderboards/LeaderboardList.js
import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

export default function LeaderboardList({ 
  leaderboardData = [], 
  currentUser = {}, 
  activeFilter = "global" 
}) {
  
  const getTrendIcon = (trend) => {
    if (trend === "up") return "↑";
    if (trend === "down") return "↓";
    return "→";
  };

  const getTrendColor = (trend) => {
    if (trend === "up") return "text-green-600";
    if (trend === "down") return "text-red-600";
    return "text-slate-400";
  };

  return (
    <View className="bg-white rounded-2xl border border-slate-200 mb-6">
      {/* Header */}
      <View className="p-4 border-b border-slate-100">
        <Text className="text-lg font-bold text-slate-900 mb-1">
          Leaderboard Rankings
        </Text>
        <Text className="text-xs text-slate-600">
          Top performers this month
        </Text>
      </View>

      <ScrollView className="p-4">
        <View className="space-y-3">
          {leaderboardData.map((user) => (
            <View
              key={user.id}
              className={`rounded-xl p-4 border ${
                user.rank <= 3 
                  ? "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100" 
                  : "bg-slate-50 border-slate-100"
              }`}
            >
              {/* Top Row: Rank + Avatar + Name */}
              <View className="flex-row items-center mb-3">
                <RankBadge rank={user.rank} />
                
                <View className="relative mr-3">
                  <View className={`w-12 h-12 rounded-full border-2 items-center justify-center ${
                    user.rank <= 3 ? "border-blue-200 bg-blue-100" : "border-slate-200 bg-slate-100"
                  }`}>
                    <Text className="text-xl">{user.avatar}</Text>
                  </View>
                  <View className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white bg-blue-600 items-center justify-center">
                    <Text className="text-xs font-bold text-white">{user.level}</Text>
                  </View>
                </View>

                <View className="flex-1">
                  <View className="flex-row items-center gap-2 mb-1">
                    <Text className="font-bold text-slate-900 text-sm" numberOfLines={1}>
                      {user.name}
                    </Text>
                    {user.isFriend && (
                      <View className="bg-blue-100 px-2 py-0.5 rounded-full">
                        <Text className="text-xs text-blue-700 font-semibold">
                          Friend
                        </Text>
                      </View>
                    )}
                  </View>
                  <View className="flex-row items-center gap-1">
                    <Text className="text-lg font-bold text-blue-600">
                      {user.points.toLocaleString()}
                    </Text>
                    <Text className={`text-sm font-bold ${getTrendColor(user.trend)}`}>
                      {getTrendIcon(user.trend)}
                    </Text>
                    <Text className="text-xs text-slate-500">pts</Text>
                  </View>
                </View>

                <TouchableOpacity className="bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 rounded-lg">
                  <Text className="text-white font-semibold text-xs">
                    {user.isFriend ? "Challenge" : "Follow"}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Stats Row */}
              <View className="flex-row items-center justify-between pt-3 border-t border-slate-200">
                <View className="flex-1">
                  <Text className="text-xs text-slate-600 mb-1">Monsters</Text>
                  <View className="flex-row items-center gap-1">
                    <Text className="text-sm">👹</Text>
                    <Text className="text-sm font-semibold text-slate-900">
                      {user.monstersDefeated}
                    </Text>
                  </View>
                </View>

                <View className="flex-1">
                  <Text className="text-xs text-slate-600 mb-1">Streak</Text>
                  <View className="flex-row items-center gap-1">
                    <Text className="text-sm">🔥</Text>
                    <Text className="text-sm font-semibold text-slate-900">
                      {user.streak} days
                    </Text>
                  </View>
                </View>

                <View className="flex-1">
                  <Text className="text-xs text-slate-600 mb-1">Savings</Text>
                  <View className="flex-row items-center gap-1">
                    <Text className="text-sm">💰</Text>
                    <Text className="text-sm font-semibold text-slate-900">
                      ₱{user.savings.toLocaleString()}
                    </Text>
                  </View>
                </View>

                {/* Badges */}
                {user.badges.length > 0 && (
                  <View className="flex-row gap-1">
                    {user.badges.slice(0, 2).map((badge, i) => (
                      <View
                        key={i}
                        className="w-7 h-7 bg-white rounded-lg items-center justify-center border border-slate-200"
                      >
                        <Text className="text-sm">{badge}</Text>
                      </View>
                    ))}
                    {user.badges.length > 2 && (
                      <View className="w-7 h-7 bg-slate-200 rounded-lg items-center justify-center">
                        <Text className="text-xs font-bold text-slate-600">
                          +{user.badges.length - 2}
                        </Text>
                      </View>
                    )}
                  </View>
                )}
              </View>
            </View>
          ))}

          {/* Current User if not in top leaderboard */}
          {currentUser.rank > leaderboardData.length && (
            <View className="rounded-xl p-4 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
              {/* Top Row: Rank + Avatar + Name */}
              <View className="flex-row items-center mb-3">
                <RankBadge rank={currentUser.rank} />
                
                <View className="relative mr-3">
                  <View className="w-12 h-12 rounded-full border-2 border-blue-300 bg-blue-200 items-center justify-center">
                    <Text className="text-xl">{currentUser.avatar}</Text>
                  </View>
                  <View className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white bg-blue-600 items-center justify-center">
                    <Text className="text-xs font-bold text-white">{currentUser.level}</Text>
                  </View>
                </View>

                <View className="flex-1">
                  <View className="flex-row items-center gap-2 mb-1">
                    <Text className="font-bold text-slate-900 text-sm" numberOfLines={1}>
                      {currentUser.name}
                    </Text>
                    <View className="bg-blue-600 px-2 py-0.5 rounded-full">
                      <Text className="text-xs text-white font-semibold">You</Text>
                    </View>
                  </View>
                  <View className="flex-row items-center gap-1">
                    <Text className="text-lg font-bold text-blue-600">
                      {currentUser.points.toLocaleString()}
                    </Text>
                    <Text className="text-xs text-slate-500">pts</Text>
                  </View>
                </View>
              </View>

              {/* Stats Row */}
              <View className="flex-row items-center justify-between pt-3 border-t border-blue-200">
                <View className="flex-1">
                  <Text className="text-xs text-slate-600 mb-1">Monsters</Text>
                  <View className="flex-row items-center gap-1">
                    <Text className="text-sm">👹</Text>
                    <Text className="text-sm font-semibold text-slate-900">
                      {currentUser.monstersDefeated}
                    </Text>
                  </View>
                </View>

                <View className="flex-1">
                  <Text className="text-xs text-slate-600 mb-1">Streak</Text>
                  <View className="flex-row items-center gap-1">
                    <Text className="text-sm">🔥</Text>
                    <Text className="text-sm font-semibold text-slate-900">
                      {currentUser.streak} days
                    </Text>
                  </View>
                </View>

                <View className="flex-1">
                  <Text className="text-xs text-slate-600 mb-1">Savings</Text>
                  <View className="flex-row items-center gap-1">
                    <Text className="text-sm">💰</Text>
                    <Text className="text-sm font-semibold text-slate-900">
                      ₱{currentUser.savings.toLocaleString()}
                    </Text>
                  </View>
                </View>

                {/* Badges */}
                {currentUser.badges.length > 0 && (
                  <View className="flex-row gap-1">
                    {currentUser.badges.slice(0, 2).map((badge, i) => (
                      <View
                        key={i}
                        className="w-7 h-7 bg-white rounded-lg items-center justify-center border border-blue-200"
                      >
                        <Text className="text-sm">{badge}</Text>
                      </View>
                    ))}
                    {currentUser.badges.length > 2 && (
                      <View className="w-7 h-7 bg-blue-200 rounded-lg items-center justify-center">
                        <Text className="text-xs font-bold text-blue-700">
                          +{currentUser.badges.length - 2}
                        </Text>
                      </View>
                    )}
                  </View>
                )}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

function RankBadge({ rank }) {
  if (rank === 1)
    return (
      <View className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full items-center justify-center border-2 border-yellow-200 mr-3">
        <Text className="text-xl">🥇</Text>
      </View>
    );
  if (rank === 2)
    return (
      <View className="w-10 h-10 bg-gradient-to-br from-slate-300 to-slate-400 rounded-full items-center justify-center border-2 border-slate-200 mr-3">
        <Text className="text-xl">🥈</Text>
      </View>
    );
  if (rank === 3)
    return (
      <View className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full items-center justify-center border-2 border-orange-200 mr-3">
        <Text className="text-xl">🥉</Text>
      </View>
    );
  return (
    <View className="w-10 h-10 bg-slate-100 rounded-full items-center justify-center border border-slate-200 mr-3">
      <Text className="text-sm font-bold text-slate-700">#{rank}</Text>
    </View>
  );
}