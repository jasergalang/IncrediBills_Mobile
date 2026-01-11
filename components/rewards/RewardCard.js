import React from "react";
import { View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const colorStyles = {
  amber: {
    gradient: ["#fef3c7", "#fde68a"],
    primary: "#f59e0b",
    button: ["#f59e0b", "#d97706"],
  },
  blue: {
    gradient: ["#dbeafe", "#bfdbfe"],
    primary: "#3b82f6",
    button: ["#3b82f6", "#2563eb"],
  },
  emerald: {
    gradient: ["#d1fae5", "#a7f3d0"],
    primary: "#10b981",
    button: ["#10b981", "#059669"],
  },
  purple: {
    gradient: ["#e9d5ff", "#d8b4fe"],
    primary: "#a855f7",
    button: ["#a855f7", "#9333ea"],
  },
  violet: {
    gradient: ["#ede9fe", "#ddd6fe"],
    primary: "#8b5cf6",
    button: ["#8b5cf6", "#7c3aed"],
  },
  orange: {
    gradient: ["#fed7aa", "#fdba74"],
    primary: "#f97316",
    button: ["#f97316", "#ea580c"],
  },
  pink: {
    gradient: ["#fce7f3", "#fbcfe8"],
    primary: "#ec4899",
    button: ["#ec4899", "#db2777"],
  },
  indigo: {
    gradient: ["#e0e7ff", "#c7d2fe"],
    primary: "#6366f1",
    button: ["#6366f1", "#4f46e5"],
  },
  slate: {
    gradient: ["#e2e8f0", "#cbd5e1"],
    primary: "#64748b",
    button: ["#64748b", "#475569"],
  },
};

export default function RewardCard({ reward, userPoints, onRedeemClick }) {
  const affordable = userPoints.available >= reward.cost;
  const colors = colorStyles[reward.color] || colorStyles.blue;

  const getPopularityStyle = () => {
    switch (reward.popularity) {
      case "High":
        return { emoji: "🔥", text: "Popular", color: "text-green-600" };
      case "Medium":
        return { emoji: "📊", text: "Trending", color: "text-amber-600" };
      default:
        return { emoji: "💤", text: "Available", color: "text-slate-600" };
    }
  };

  const popularity = getPopularityStyle();

  return (
    <View
      className={`bg-white rounded-2xl border-2 overflow-hidden ${
        reward.featured ? "border-amber-300" : "border-slate-200"
      }`}
      style={reward.featured ? { shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5 } : {}}
    >
      {/* Featured Badge */}
      {reward.featured && (
        <LinearGradient
          colors={["#fbbf24", "#f97316"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="py-1.5 px-3"
        >
          <Text className="text-white text-xs font-bold text-center">
            ⭐ FEATURED
          </Text>
        </LinearGradient>
      )}

      <View className="p-5">
        {/* Icon */}
        <LinearGradient
          colors={colors.gradient}
          className="w-14 h-14 rounded-xl items-center justify-center mb-3 self-center"
          style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}
        >
          <Text className="text-2xl">{reward.icon}</Text>
        </LinearGradient>

        {/* Title - Fixed height container */}
        <View style={{ height: 44, marginBottom: 8 }} className="justify-center">
          <Text 
            className="font-bold text-slate-900 text-center text-sm leading-tight"
            numberOfLines={2}
          >
            {reward.name}
          </Text>
        </View>

        {/* Description - Fixed height container */}
        <View style={{ height: 36, marginBottom: 12 }}>
          <Text 
            className="text-xs text-slate-600 text-center leading-tight"
            numberOfLines={2}
          >
            {reward.description}
          </Text>
        </View>

        {/* Popularity & Stock */}
        <View className="flex-row items-center justify-between mb-3">
          <Text className={`${popularity.color} font-semibold text-xs`}>
            {popularity.emoji} {popularity.text}
          </Text>
          <Text className="text-slate-500 text-xs">
            {typeof reward.stock === "number"
              ? `${reward.stock} left`
              : reward.stock}
          </Text>
        </View>

        {/* Expiry - Fixed height container */}
        <View style={{ height: 16, marginBottom: 12 }}>
          {reward.expiryDays && (
            <Text className="text-xs text-slate-500 text-center">
              Valid {reward.expiryDays} days
            </Text>
          )}
        </View>

        {/* Divider */}
        <View className="h-px bg-slate-200 mb-3" />

        {/* Cost */}
        <View className="flex-row items-center justify-center gap-1 mb-3">
          <Text className="text-2xl font-bold" style={{ color: colors.primary }}>
            {reward.cost.toLocaleString()}
          </Text>
          <Text className="text-xs text-slate-600">pts</Text>
        </View>

        {/* Redeem Button */}
        {affordable ? (
          <Pressable onPress={() => onRedeemClick(reward)}>
            <LinearGradient
              colors={colors.button}
              className="py-3 rounded-xl"
              style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 }}
            >
              <Text className="text-white font-semibold text-center text-xs">
                Redeem Now
              </Text>
            </LinearGradient>
          </Pressable>
        ) : (
          <View className="bg-slate-100 py-3 rounded-xl">
            <Text className="text-slate-400 font-semibold text-center text-xs">
              Not Enough Points
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}