// 

import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, ScrollView } from "react-native";
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
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import { useAuth } from '../../context/auth';
import { utilities } from "../../constants/utilities";
export default function Analytics({ navigation }) {
  const [dateRange, setDateRange] = useState("month");
  const [activeTab, setActiveTab] = useState("utility");
  const [utilityKPI, setUtilityKPI] = useState({});
  const [spendingData, setSpendingData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [anomalies, setAnomalies] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const { token, getToken } = useAuth();
  const getPredictionForMonth = (predictions = [], month) => {
    const match = predictions.find(p =>
      p.predictedDate?.startsWith(month)
    );
    return match ? Number(match.predictedCost) : null;
  };


  const fetchUtilityData = async (range) => {
    try {
      const userToken = token || (await getToken());
      if (!userToken) return;

      const headers = { Authorization: `Bearer ${userToken}` };

      const [waterAnalytics, electricAnalytics, waterPred, electricPred] =
        await Promise.all([
          axios.get(`${baseURL}/api/water-bill/analytics`, { headers }),
          axios.get(`${baseURL}/api/electric-bill/analytics`, { headers }),
          axios.get(`${baseURL}/api/water-bill/predictions`, { headers }),
          axios.get(`${baseURL}/api/electric-bill/predictions`, { headers }),
        ]);

      const wData = waterAnalytics.data.monthly ?? {};
      const eData = electricAnalytics.data.monthly ?? {};

      const monthCount = range === "month" ? 1 : range === "3months" ? 3 : 6;

      const getLatestMonthsList = (monthlyData, count) =>
        Object.keys(monthlyData)
          .sort((a, b) => (a < b ? 1 : -1))
          .slice(0, count);

      const waterMonths = getLatestMonthsList(wData, monthCount);
      const electricMonths = getLatestMonthsList(eData, monthCount);

      // Totals calculation
      let totalSpent = 0;
      let totalSaved = 0;

      const sumUtility = (months, data, predictions) => {
        let spent = 0;
        let saved = 0;
        months.forEach((month) => {
          const actual = data[month]?.totalCost || 0;
          const predicted =
            getPredictionForMonth(predictions.data.predictions, month) ?? actual * 1.1;
          spent += actual;
          saved += Math.max(predicted - actual, 0);
        });
        return { spent, saved };
      };

      const waterTotals = sumUtility(waterMonths, wData, waterPred);
      const electricTotals = sumUtility(electricMonths, eData, electricPred);

      totalSpent = waterTotals.spent + electricTotals.spent;
      totalSaved = waterTotals.saved + electricTotals.saved;

      const efficiency = totalSpent > 0 ? Math.round((totalSaved / totalSpent) * 100) : 0;

      setUtilityKPI({
        totalSpending: Math.round(totalSpent),
        totalSaved: Math.round(totalSaved),
        efficiency,
        avgMonthly: Math.round(totalSpent / monthCount),
        change: 0,
      });

      // --- CATEGORY LOGIC USING UTILITIES CONSTANT ---
      const latestAmounts = {
        electricity: eData[electricMonths[0]]?.totalCost || 0,
        water: wData[waterMonths[0]]?.totalCost || 0,
        gas: 0,
        fuel: 0,
        grocery: 0,
      };

      const totalAmount = Object.values(latestAmounts).reduce((a, b) => a + b, 0);

      const categoriesData = utilities.map((u) => ({
        name: u.name,
        amount: latestAmounts[u.id] || 0,
        percent: totalAmount > 0 ? Math.round((latestAmounts[u.id] || 0) / totalAmount * 100) : 0,
        icon: u.icon,
        color: u.color,
      }));

      setCategories(categoriesData);
      // --- SPENDING DATA PREPARATION ---
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      // Combine keys from all utilities
      const monthsSet = new Set([...Object.keys(wData), ...Object.keys(eData)]);
      const allMonthsSorted = Array.from(monthsSet).sort(); // YYYY-MM ascending

      // Compute total amount per month (sum of all utilities)
      const spendingDataArray = allMonthsSorted.map((monthKey) => {
        const totalAmount =
          (wData[monthKey]?.totalCost || 0) +
          (eData[monthKey]?.totalCost || 0);
        const monthAbbrev = monthNames[parseInt(monthKey.split("-")[1], 10) - 1];

        return {
          month: monthAbbrev,
          amount: totalAmount, // total for the month
        };
      });

      setSpendingData(spendingDataArray);


    } catch (error) {
      console.error("Error fetching utility data:", error);
    }
  };

  // Calculate KPI when the date range changes
  const calculateKPI = (range) => {
    fetchUtilityData(range);
  };

  useEffect(() => {
    calculateKPI(dateRange);
  }, [dateRange]);

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <AnalyticsHeader activeTab={activeTab} setActiveTab={setActiveTab} />
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
            <GameKPICards gameKPI={{}} /> {/* Replace with actual game data */}
            <AchievementsProgress achievements={achievements} />
            <RecentRewards rewards={rewards} />
            <TipsSection type="games" />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
