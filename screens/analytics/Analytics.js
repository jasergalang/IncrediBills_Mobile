import React, { useState, useEffect, useMemo } from "react";
import { StatusBar, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AnalyticsHeader from "../../components/analytics/AnalyticsHeader";
import UtilityKPICards from "../../components/analytics/UtilityKPICards";
import AnomalyAlerts from "../../components/analytics/AnomalyAlerts";
import SpendingTrendsChart from "../../components/analytics/SpendingTrendsChart";
import CategoryBreakdown from "../../components/analytics/CategoryBreakdown";
import TipsSection from "../../components/analytics/TipsSection";
import GameKPICards from "../../components/analytics/GameKPICards";
import AchievementsProgress from "../../components/analytics/AchievementsProgress";
import RecentRewards from "../../components/analytics/RecentRewards";
import FilterPanel from "../../components/analytics/FilterPanel";

import { useDispatch, useSelector } from "react-redux";
import { fetchAnalytics } from "../../redux/slices/analytics/analyticsSlice";
import { utilities } from "../../constants/utilities";

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function Analytics({ navigation }) {
  const [dateRange, setDateRange] = useState("month");
  const [activeTab, setActiveTab] = useState("utility");
  const [selectedCategories, setSelectedCategories] = useState(["all"]);
  const [compareMode, setCompareMode] = useState(false);
  const [comparePeriod, setComparePeriod] = useState("previous");

  const dispatch = useDispatch();
  const { monthly = [] } = useSelector((state) => state.analytics);
  const bills = useSelector((state) => state.bills || { latestAmounts: {} });
  const { latestAmounts } = bills;

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  // ==========================
  // 🏷️ TOGGLE CATEGORY FILTER
  // ==========================
  const toggleCategory = (category) => {
    if (category === "all") {
      setSelectedCategories(["all"]);
    } else {
      const newCategories = selectedCategories.filter((c) => c !== "all");
      if (newCategories.includes(category)) {
        const filtered = newCategories.filter((c) => c !== category);
        setSelectedCategories(filtered.length === 0 ? ["all"] : filtered);
      } else {
        setSelectedCategories([...newCategories, category]);
      }
    }
  };

  // ==========================
  // 📊 KPI SUMMARY
  // ==========================
  const utilityKPI = useMemo(() => {
    const monthsCount =
      dateRange === "month" ? 1 : dateRange === "3months" ? 3 : 6;

    const latestMonths = [...monthly].slice(-monthsCount);

    // Calculate total spending based on selected categories
    const totalSpending = latestMonths.reduce((sum, m) => {
      let monthTotal = 0;
      
      if (selectedCategories.includes("all")) {
        // Sum all available categories
        monthTotal = (m.electricity || 0) + 
                     (m.water || 0) + 
                     (m.fuel || 0) + 
                     (m.grocery || 0) + 
                     (m.miscellaneous || 0);
      } else {
        // Sum only selected categories
        selectedCategories.forEach((category) => {
          monthTotal += m[category] || 0;
        });
      }
      
      return sum + monthTotal;
    }, 0);

    // For current month display (using latestAmounts)
    let currentMonthTotal = 0;
    if (selectedCategories.includes("all")) {
      currentMonthTotal = Object.values(latestAmounts || {}).reduce(
        (sum, amount) => sum + (amount || 0),
        0
      );
    } else {
      selectedCategories.forEach((category) => {
        currentMonthTotal += latestAmounts?.[category] || 0;
      });
    }

    return {
      totalSpending: Math.round(totalSpending),
      currentMonthTotal: Math.round(currentMonthTotal),
      totalSaved: 0, // can re-add prediction logic later
      efficiency: 0,
      avgMonthly: monthsCount ? Math.round(totalSpending / monthsCount) : 0,
      change: 0,
    };
  }, [monthly, dateRange, selectedCategories, latestAmounts]);

  // ==========================
  // 📈 SPENDING TREND
  // ==========================
  const spendingData = useMemo(() => {
    return monthly.map((m) => {
      const monthIndex = parseInt(m.month?.split("-")[1], 10) - 1;
      
      let amount = 0;
      if (selectedCategories.includes("all")) {
        amount = (m.electricity || 0) + 
                 (m.water || 0) + 
                 (m.fuel || 0) + 
                 (m.grocery || 0) + 
                 (m.miscellaneous || 0);
      } else {
        selectedCategories.forEach((category) => {
          amount += m[category] || 0;
        });
      }

      return {
        month: MONTH_NAMES[monthIndex],
        amount,
      };
    });
  }, [monthly, selectedCategories]);

  // ==========================
  // 🧾 CATEGORY BREAKDOWN (latest month from monthly analytics)
  // ==========================
  const categories = useMemo(() => {
    // Get the latest month's data from monthly analytics (which sums all bills per month)
    const latest = monthly.length > 0 ? monthly[monthly.length - 1] : {};
    
    const monthlyAmountsData = {
      electricity: latest.electricity || 0,
      water: latest.water || 0,
      fuel: latest.fuel || 0,
      grocery: latest.grocery || 0,
      miscellaneous: latest.miscellaneous || 0,
    };

    // Calculate total based on selected categories
    let total = 0;
    if (selectedCategories.includes("all")) {
      total = Object.values(monthlyAmountsData).reduce((a, b) => a + b, 0);
    } else {
      selectedCategories.forEach((category) => {
        total += monthlyAmountsData[category] || 0;
      });
    }

    // Map to category objects and filter
    let filteredCategories = utilities.map((u) => ({
      name: u.name,
      amount: monthlyAmountsData[u.id] || 0,
      percent: total
        ? Math.round(((monthlyAmountsData[u.id] || 0) / total) * 100)
        : 0,
      icon: u.icon,
      color: u.color,
    }));

    // Filter categories based on selection
    if (selectedCategories.includes("all")) {
      // Show all categories with amounts > 0
      filteredCategories = filteredCategories.filter((cat) => cat.amount > 0);
    } else {
      // Show only selected categories - match by utility ID instead of name
      filteredCategories = filteredCategories.filter((cat) => {
        // Find the utility that matches this category
        const utility = utilities.find((u) => u.name === cat.name);
        return utility && selectedCategories.includes(utility.id);
      });
    }

    return filteredCategories;
  }, [selectedCategories, monthly]);

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
            <FilterPanel
              dateRange={dateRange}
              setDateRange={setDateRange}
              selectedCategories={selectedCategories}
              toggleCategory={toggleCategory}
              compareMode={compareMode}
              comparePeriod={comparePeriod}
              setComparePeriod={setComparePeriod}
            />

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