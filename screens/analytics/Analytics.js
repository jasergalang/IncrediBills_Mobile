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
import { useAnalytics } from "../../hooks/useAnalytics";

export default function Analytics({ navigation }) {
  const [dateRange, setDateRange] = useState("month");
  const [activeTab, setActiveTab] = useState("utility");

  const { utilityKPI, spendingData, categories } = useAnalytics(dateRange);
  
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
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <AnalyticsHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {activeTab === "utility" ? (
          <>
            <DateRangeFilter dateRange={dateRange} setDateRange={setDateRange} />
            <UtilityKPICards utilityKPI={utilityKPI} />
            {/* <AnomalyAlerts anomalies={[]} /> */}
            <AnomalyAlerts anomalies={anomalies} /> 
            <SpendingTrendsChart spendingData={spendingData} />
            <CategoryBreakdown categories={categories} />
            <TipsSection type="utility" />
          </>
        ) : (
          <>
            <GameKPICards gameKPI={{}} />
            <AchievementsProgress achievements={[]} />
            <RecentRewards rewards={[]} />
            <TipsSection type="games" />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
