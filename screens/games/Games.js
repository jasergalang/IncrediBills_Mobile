import React, { useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import PlayerStatsCard from "../../components/games/PlayerStatsCard";
import QuestCard from "../../components/games/QuestCard";
import AchievementCard from "../../components/games/AchievementCard";

export default function Games({ navigation }) {
    const [activeTab, setActiveTab] = useState("quests");

    const playerStats = {
        level: 12,
        currentXP: 2340,
        requiredXP: 3000,
        totalPoints: 850,
        monstersDefeated: 47,
        streak: 15,
    };

    const activeQuests = [
        {
            id: 1,
            title: "Water Warrior",
            description: "Reduce water consumption by 15%",
            monster: "Aqua Polluter",
            monsterIcon: "💧",
            category: "water",
            progress: 75,
            reward: 150,
            color: "#3b82f6",
            bgColor: "#dbeafe",
            difficulty: "Medium",
            deadline: "3 days left",
        },
        {
            id: 2,
            title: "Energy Saver",
            description: "Pay electricity bill 5 days early",
            monster: "Volt Demon",
            monsterIcon: "⚡",
            category: "electricity",
            progress: 100,
            reward: 200,
            color: "#f59e0b",
            bgColor: "#fef3c7",
            difficulty: "Easy",
            deadline: "Completed!",
            completed: true,
        },
        {
            id: 3,
            title: "Gas Guardian",
            description: "Keep kitchen gas usage under 500₱",
            monster: "Flame Beast",
            monsterIcon: "🔥",
            category: "kitchen",
            progress: 60,
            reward: 120,
            color: "#f97316",
            bgColor: "#fed7aa",
            difficulty: "Hard",
            deadline: "5 days left",
        },
        {
            id: 4,
            title: "Fuel Fighter",
            description: "Reduce transport fuel by 10%",
            monster: "Smoke Monster",
            monsterIcon: "⛽",
            category: "transport",
            progress: 45,
            reward: 180,
            color: "#6b7280",
            bgColor: "#f3f4f6",
            difficulty: "Medium",
            deadline: "7 days left",
        },
        {
            id: 5,
            title: "Grocery Guardian",
            description: "Minimize food waste this week",
            monster: "Waste Wraith",
            monsterIcon: "🛒",
            category: "groceries",
            progress: 30,
            reward: 100,
            color: "#22c55e",
            bgColor: "#bbf7d0",
            difficulty: "Easy",
            deadline: "2 days left",
        },
    ];

    const recentAchievements = [
        {
            id: 1,
            title: "First Blood",
            description: "Defeated your first pollution monster",
            icon: "🏆",
            unlockedDate: "Oct 20, 2024",
            rarity: "common",
        },
        {
            id: 2,
            title: "Water Master",
            description: "Reduced water usage for 30 days straight",
            icon: "💧",
            unlockedDate: "Oct 25, 2024",
            rarity: "rare",
        },
        {
            id: 3,
            title: "Early Bird",
            description: "Paid all bills early for 3 months",
            icon: "🐦",
            unlockedDate: "Oct 28, 2024",
            rarity: "epic",
        },
        {
            id: 4,
            title: "Energy Champion",
            description: "Saved 500₱ on electricity bills",
            icon: "⚡",
            unlockedDate: "Oct 15, 2024",
            rarity: "legendary",
        },
    ];

    return (
        <SafeAreaView className="flex-1 bg-slate-50">
            <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

            {/* Header */}
            <View className="bg-white border-b border-slate-200">
                <View className="px-4 py-3 flex-row items-center justify-between">
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="w-10 h-10 items-center justify-center"
                    >
                        <Ionicons name="arrow-back" size={24} color="#334155" />
                    </TouchableOpacity>
                    <View className="flex-1 items-center">
                        <Text className="text-lg font-bold text-slate-900">
                            Gamification
                        </Text>
                        <Text className="text-xs text-slate-600">Battle Pollution Monsters</Text>
                    </View>
                    <View className="w-10" />
                </View>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Player Stats Card */}
                <PlayerStatsCard playerStats={playerStats} activeQuests={activeQuests} />

                {/* Tab Navigation */}
                <View className="px-4 py-4">
                    <View className="flex-row gap-3">
                        <TouchableOpacity
                            onPress={() => setActiveTab("quests")}
                            className={`flex-1 py-3 rounded-xl ${activeTab === "quests" ? "bg-blue-500" : "bg-white border border-slate-200"
                                }`}
                            activeOpacity={0.7}
                        >
                            <Text
                                className={`text-center font-bold text-sm ${activeTab === "quests" ? "text-white" : "text-slate-600"
                                    }`}
                            >
                                🎯 Active Quests
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setActiveTab("achievements")}
                            className={`flex-1 py-3 rounded-xl ${activeTab === "achievements" ? "bg-blue-500" : "bg-white border border-slate-200"
                                }`}
                            activeOpacity={0.7}
                        >
                            <Text
                                className={`text-center font-bold text-sm ${activeTab === "achievements" ? "text-white" : "text-slate-600"
                                    }`}
                            >
                                🏆 Achievements
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Active Quests Tab */}
                {activeTab === "quests" && (
                    <View className="px-4 pb-6">
                        <View className="flex-row items-center justify-between mb-4">
                            <View className="flex-row items-center">
                                <View className="w-8 h-8 bg-blue-100 rounded-lg items-center justify-center mr-2">
                                    <Ionicons name="game-controller" size={18} color="#3b82f6" />
                                </View>
                                <Text className="text-lg font-bold text-slate-900">
                                    Monster Battles
                                </Text>
                            </View>
                            <TouchableOpacity className="bg-green-500 px-3 py-2 rounded-lg">
                                <Text className="text-white font-semibold text-xs">+ New Quest</Text>
                            </TouchableOpacity>
                        </View>

                        {activeQuests.map((quest) => (
                            <QuestCard key={quest.id} quest={quest} />
                        ))}
                    </View>
                )}

                {/* Achievements Tab */}
                {activeTab === "achievements" && (
                    <View className="px-4 pb-6">
                        <View className="flex-row items-center justify-between mb-4">
                            <View className="flex-row items-center">
                                <View className="w-8 h-8 bg-amber-100 rounded-lg items-center justify-center mr-2">
                                    <Ionicons name="trophy" size={18} color="#f59e0b" />
                                </View>
                                <Text className="text-lg font-bold text-slate-900">
                                    Trophy Collection
                                </Text>
                            </View>
                            <View className="flex-row gap-2">
                                <TouchableOpacity className="bg-white border border-slate-200 px-3 py-2 rounded-lg">
                                    <Text className="text-slate-700 font-semibold text-xs">All</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className="bg-white border border-slate-200 px-3 py-2 rounded-lg">
                                    <Text className="text-slate-700 font-semibold text-xs">Recent</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {recentAchievements.map((achievement) => (
                            <AchievementCard key={achievement.id} achievement={achievement} />
                        ))}

                        {/* Social Share Section */}
                        <LinearGradient
                            colors={["#a855f7", "#ec4899"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            className="rounded-2xl p-6 mt-4"
                        >
                            <Text className="text-xl font-bold text-white mb-2">
                                Share Your Achievements!
                            </Text>
                            <Text className="text-white/90 text-sm mb-4">
                                Show off your eco-warrior status to your friends
                            </Text>
                            <View className="flex-row gap-2">
                                <TouchableOpacity className="flex-1 bg-white/20 backdrop-blur-sm py-3 rounded-xl items-center">
                                    <Ionicons name="logo-facebook" size={20} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity className="flex-1 bg-white/20 backdrop-blur-sm py-3 rounded-xl items-center">
                                    <Ionicons name="logo-twitter" size={20} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity className="flex-1 bg-white/20 backdrop-blur-sm py-3 rounded-xl items-center">
                                    <Ionicons name="logo-instagram" size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                        </LinearGradient>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}