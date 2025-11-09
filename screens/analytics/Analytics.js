import React, { useState } from "react";
import { SafeAreaView, StatusBar, ScrollView } from "react-native";
import AnalyticsHeader from "../../components/analytics/AnalyticsHeader";
import DateRangeFilter from "../../components/analytics/DateRangeFilter";
import UtilityKPICards from "../../components/analytics/UtilityKPICards";
import AnomalyAlerts from "../../components/analytics/AnomalyAlerts";
import SpendingTrendsChart from "../../components/analytics/SpendingTrendsChart";
import CategoryBreakdown from "../../components/analytics/CategoryBreakdown";
import TipsSection from "../../components/analytics/TipsSection";
import GameKPICards from "../../components/analytics/GameKPICards";
import AchievementsProgress from "../../components/analytics/AchievementsProgress";
import RecentRewards from "../../components/analytics/RecentRewards";

export default function Analytics({ navigation }) {
  const [dateRange, setDateRange] = useState("month");
  const [activeTab, setActiveTab] = useState("utility"); // utility, games

  // KPI Data
  const utilityKPI = {
    totalSpending: 8250,
    change: -9.3,
    avgMonthly: 4125,
    totalSaved: 1850,
    efficiency: 92,
  };

  const gameKPI = {
    totalPoints: 12450,
    level: 12,
    rank: 23,
    streak: 15,
  };

  // Recent spending data
  const spendingData = [
    { month: "Jul", amount: 7040 },
    { month: "Aug", amount: 7705 },
    { month: "Sep", amount: 7230 },
    { month: "Oct", amount: 7835 },
    { month: "Nov", amount: 8250 },
  ];

  // Category breakdown
  const categories = [
    {
      name: "Electricity",
      amount: 2850,
      percent: 35,
      icon: "⚡",
      color: "amber",
    },
    {
      name: "Groceries",
      amount: 2200,
      percent: 27,
      icon: "🛒",
      color: "emerald",
    },
    { name: "Transport", amount: 1020, percent: 12, icon: "⛽", color: "gray" },
    { name: "Water", amount: 450, percent: 5, icon: "💧", color: "blue" },
    { name: "Others", amount: 1180, percent: 14, icon: "📊", color: "slate" },
  ];

  // Anomalies
  const anomalies = [
    {
      category: "Electricity",
      icon: "⚡",
      normal: 2850,
      actual: 4200,
      severity: "high",
    },
    {
      category: "Water",
      icon: "💧",
      normal: 450,
      actual: 680,
      severity: "medium",
    },
  ];

  // Game achievements
  const achievements = [
    { icon: "🏆", name: "Bill Master", progress: 80 },
    { icon: "⚡", name: "Energy Saver", progress: 65 },
    { icon: "💰", name: "Budget Pro", progress: 90 },
  ];

  // Recent rewards
  const rewards = [
    { icon: "💎", name: "Diamond Badge", points: "+500" },
    { icon: "🏅", name: "Weekly Challenge", points: "+300" },
    { icon: "⚡", name: "Energy Saver", points: "+250" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <AnalyticsHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {activeTab === "utility" ? (
          <>
            <DateRangeFilter
              dateRange={dateRange}
              setDateRange={setDateRange}
            />
            <UtilityKPICards utilityKPI={utilityKPI} />
            <AnomalyAlerts anomalies={anomalies} />
            <SpendingTrendsChart spendingData={spendingData} />
            <CategoryBreakdown categories={categories} />
            <TipsSection type="utility" />
          </>
        ) : (
          <>
            <GameKPICards gameKPI={gameKPI} />
            <AchievementsProgress achievements={achievements} />
            <RecentRewards rewards={rewards} />
            <TipsSection type="games" />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
