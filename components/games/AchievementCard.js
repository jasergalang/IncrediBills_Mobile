import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function AchievementCard({ achievement }) {
    const getRarityColor = (rarity) => {
        switch (rarity) {
            case "common":
                return { bg: "bg-slate-100", text: "text-slate-700" };
            case "rare":
                return { bg: "bg-blue-100", text: "text-blue-700" };
            case "epic":
                return { bg: "bg-purple-100", text: "text-purple-700" };
            case "legendary":
                return { bg: "bg-amber-100", text: "text-amber-700" };
            default:
                return { bg: "bg-slate-100", text: "text-slate-700" };
        }
    };

    const rarityColor = getRarityColor(achievement.rarity);

    return (
        <View className="bg-white rounded-2xl border border-slate-200 p-4 mb-4">
            <View className="flex-row gap-3">
                {/* Achievement Icon */}
                <LinearGradient
                    colors={["#fbbf24", "#f97316"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="w-16 h-16 rounded-xl items-center justify-center"
                >
                    <Text className="text-3xl">{achievement.icon}</Text>
                </LinearGradient>

                {/* Achievement Details */}
                <View className="flex-1">
                    <View className="flex-row items-start justify-between mb-2">
                        <Text className="text-base font-bold text-slate-900 flex-1">
                            {achievement.title}
                        </Text>
                        <View className={`${rarityColor.bg} px-2 py-1 rounded-full ml-2`}>
                            <Text className={`text-xs font-semibold ${rarityColor.text}`}>
                                {achievement.rarity.toUpperCase()}
                            </Text>
                        </View>
                    </View>
                    <Text className="text-sm text-slate-600 mb-2">
                        {achievement.description}
                    </Text>
                    <View className="flex-row items-center justify-between">
                        <Text className="text-xs text-slate-500">
                            Unlocked: {achievement.unlockedDate}
                        </Text>
                        <TouchableOpacity>
                            <Ionicons name="share-social" size={18} color="#3b82f6" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}