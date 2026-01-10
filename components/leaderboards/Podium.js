// components/leaderboards/Podium.js
import React from "react";
import { View, Text } from "react-native";

export default function Podium({ topThree = [] }) {
  if (!topThree || topThree.length < 3) return null;
  const [first, second, third] = topThree;

  return (
    <View className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
      <Text className="text-xl font-bold text-slate-900 mb-4 text-center">
        Top Eco-Warriors 👑
      </Text>
      <View className="flex-row items-end justify-center space-x-4">
        <PlaceCard user={second} place={2} accent="slate" pointsColor="blue" />
        <PlaceCard user={first} place={1} accent="amber" pointsColor="amber" featured />
        <PlaceCard user={third} place={3} accent="orange" pointsColor="blue" />
      </View>
    </View>
  );
}

function PlaceCard({ user, place, accent, pointsColor = "blue", featured }) {
  const accentColors = {
    amber: "#f59e0b",
    orange: "#fb923c",
    slate: "#94a3b8",
  };

  const podiumColors = {
    1: ["#f59e0b", "#fbbf24"],
    2: ["#cbd5e1", "#94a3b8"],
    3: ["#fb923c", "#fb923c"],
  };

  const podiumHeights = {
    1: 120,
    2: 100,
    3: 100,
  };

  return (
    <View className="items-center" style={{ width: 100 }}>
      {/* Avatar + Crown + Level */}
      <View className="relative mb-2 items-center">
        {featured && <Text className="absolute -top-4 text-2xl">👑</Text>}
        <View
          className="rounded-full items-center justify-center border-4 border-white"
          style={{
            width: featured ? 72 : 56,
            height: featured ? 72 : 56,
            backgroundColor: "#f0f0f0",
          }}
        >
          <Text style={{ fontSize: featured ? 36 : 24 }}>{user.avatar}</Text>
        </View>
        <View
          className="absolute -bottom-2 -right-2 rounded-full border-2 border-white items-center justify-center"
          style={{
            width: 24,
            height: 24,
            backgroundColor: accentColors[accent] || "#94a3b8",
          }}
        >
          <Text className="text-white font-bold text-xs">{user.level}</Text>
        </View>
      </View>

      {/* Name & Points */}
      <View className="items-center mb-2">
        <Text className="font-bold text-slate-900 text-sm">{user.name}</Text>
        <Text
          className="font-bold text-lg"
          style={{ color: pointsColor === "amber" ? "#f59e0b" : "#2563eb" }}
        >
          {user.points.toLocaleString()}
        </Text>
        <Text className="text-xs text-slate-600">points</Text>
      </View>

      {/* Podium base */}
      <View
        className="rounded-t-xl w-full items-center justify-center border-4"
        style={{
          height: podiumHeights[place],
          backgroundColor: podiumColors[place][0],
          borderColor: "white",
        }}
      >
        <Text className="text-2xl mb-1">
          {place === 1 ? "🥇" : place === 2 ? "🥈" : "🥉"}
        </Text>
        <Text className="text-xl font-bold text-white">#{place}</Text>
      </View>
    </View>
  );
}
