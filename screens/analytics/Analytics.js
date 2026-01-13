import React, { useState, useEffect, useMemo } from "react";
import { StatusBar, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

import { useDispatch, useSelector } from "react-redux";
import { fetchAnalytics } from "../../redux/slices/analytics/analyticsSlice";
import { utilities } from "../../constants/utilities";

const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function Analytics({ navigation }) {
  const [dateRange, setDateRange] = useState("month");
  const [activeTab, setActiveTab] = useState("utility");

  const dispatch = useDispatch();
  const { monthly = [] } = useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  // ==========================
  // 📊 KPI SUMMARY (same as old hook)
  // ==========================
  const utilityKPI = useMemo(() => {
    const monthsCount =
      dateRange === "month" ? 1 : dateRange === "3months" ? 3 : 6;

    const latestMonths = [...monthly].slice(-monthsCount);

    const totalSpending = latestMonths.reduce(
      (sum, m) => sum + (m.electricity || 0) + (m.water || 0),
      0
    );

    return {
      totalSpending: Math.round(totalSpending),
      totalSaved: 0, // can re-add prediction logic later
      efficiency: 0,
      avgMonthly: monthsCount ? Math.round(totalSpending / monthsCount) : 0,
      change: 0,
    };
  }, [monthly, dateRange]);

  // ==========================
  // 📈 SPENDING TREND (fixed)
  // ==========================
  const spendingData = useMemo(() => {
    return monthly.map((m) => {
      const monthIndex = parseInt(m.month?.split("-")[1], 10) - 1;
      return {
        month: MONTH_NAMES[monthIndex],
        amount: (m.electricity || 0) + (m.water || 0),
      };
    });
  }, [monthly]);

  // ==========================
  // 🧾 CATEGORY BREAKDOWN (latest month)
  // ==========================
  const categories = useMemo(() => {
    if (!monthly.length) return [];

    const latest = monthly[monthly.length - 1];
    const latestAmounts = {
      electricity: latest.electricity || 0,
      water: latest.water || 0,
    };

    const total = Object.values(latestAmounts).reduce((a, b) => a + b, 0);

    return utilities.map((u) => ({
      name: u.name,
      amount: latestAmounts[u.id] || 0,
      percent: total
        ? Math.round(((latestAmounts[u.id] || 0) / total) * 100)
        : 0,
      icon: u.icon,
      color: u.color,
    }));
  }, [monthly]);

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

      <AnalyticsHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        navigation={navigation}
      />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {activeTab === "utility" ? (
          <>
            <DateRangeFilter dateRange={dateRange} setDateRange={setDateRange} />

            <UtilityKPICards utilityKPI={utilityKPI} />

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
