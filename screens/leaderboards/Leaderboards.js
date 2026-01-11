import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, ScrollView, View } from "react-native";
import { useSelector } from "react-redux";

import LeaderboardHeader from "../../components/leaderboards/LeaderboardHeader";
import UserCard from "../../components/leaderboards/UserCard";
import CategoryLeaders from "../../components/leaderboards/CategoryLeaders";
import FilterTabs from "../../components/leaderboards/FilterTabs";
import Podium from "../../components/leaderboards/Podium";
import LeaderboardList from "../../components/leaderboards/LeaderboardList";
import CTASection from "../../components/leaderboards/CTASection";
export default function Leaderboards() {
    const user = useSelector((state) => state.user?.userData);
    const sample = {
        avatar: "🧑",
        level: 5,
        rank: 12,
        badges: ["🏆", "🔥"],
        points: 12500,
        monstersDefeated: 42,
        streak: 7,
        savings: 1840,
    };
    const [selectedFilter, setSelectedFilter] = useState("Global");

    const topThree = [
        { avatar: "👑", name: "Alice", points: 1200, level: 5 },
        { avatar: "🥈", name: "Bob", points: 950, level: 4 },
        { avatar: "🥉", name: "Charlie", points: 800, level: 3 }
    ];

    const leaderboardData = [
        { id: 1, avatar: "👩", level: 8, name: "Alice", points: 20000, rank: 1, monstersDefeated: 50, streak: 10, savings: 5000, badges: ["🏆"], trend: "up" },
        { id: 2, avatar: "🧑", level: 6, name: "Bob", points: 18000, rank: 2, monstersDefeated: 42, streak: 7, savings: 4000, badges: ["🔥"], trend: "up" },
        { id: 3, avatar: "🧑‍🦱", level: 5, name: "Charlie", points: 16000, rank: 3, monstersDefeated: 35, streak: 5, savings: 3000, badges: [], trend: "down" },
        { id: 4, avatar: "🧑‍🦰", level: 4, name: "David", points: 15000, rank: 4, monstersDefeated: 30, streak: 4, savings: 2500, badges: [], trend: "flat" },
    ];

    const currentUser = {
        avatar: "🧑",
        level: 5,
        name: "You",
        points: 12500,
        rank: 12,
        monstersDefeated: 42,
        streak: 7,
        savings: 1840,
        badges: ["🏆", "🔥"],
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-50">
            <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
            <LeaderboardHeader />
            <ScrollView
                contentContainerStyle={{ paddingVertical: 16 }}
                className="px-4"
                showsVerticalScrollIndicator={false}
            >
                <UserCard currentUser={sample} />
                <CategoryLeaders />
                <FilterTabs
                    selectedFilter={selectedFilter}
                    setSelectedFilter={setSelectedFilter}
                />
                <Podium topThree={topThree} />
                <LeaderboardList
                    leaderboardData={leaderboardData}
                    currentUser={currentUser}
                />
                <CTASection />
            </ScrollView>
        </SafeAreaView>
    )
}
