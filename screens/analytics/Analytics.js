import React, { useState, useEffect, useMemo } from "react";
import { StatusBar, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AnalyticsHeader from "../../components/analytics/AnalyticsHeader";
import UtilityKPICards from "../../components/analytics/UtilityKPICards";
// import AnomalyAlerts from "../../components/analytics/AnomalyAlerts";
import SpendingTrendsChart from "../../components/analytics/SpendingTrendsChart";
import CategoryBreakdown from "../../components/analytics/CategoryBreakdown";
// import ExportSchedulePanel from "../../components/analytics/ExportSchedulePanel";
import GameKPICards from "../../components/analytics/GameKPICards";
import AchievementsProgress from "../../components/analytics/AchievementsProgress";
import RecentRewards from "../../components/analytics/RecentRewards";
import FilterPanel from "../../components/analytics/FilterPanel";

import { useDispatch, useSelector } from "react-redux";
import { fetchAnalytics } from "../../redux/slices/analytics/analyticsSlice";
import { utilities } from "../../constants/utilities";
import { fetchAllSavings } from "../../redux/slices/saved/savedSlice";
import { exportToPDF, exportToExcel } from "../../utils/exportUtils";

const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const CATEGORY_TO_SAVINGS_KEY = {
  electricity: "electric",
  water: "water",
  fuel: "transport",
  grocery: "grocery",
  miscellaneous: "miscellaneous",
  kitchenGas: "kitchenGas",
};

export default function Analytics({ navigation }) {
  const [dateRange, setDateRange] = useState("month");
  const [activeTab, setActiveTab] = useState("utility");
  const [selectedCategories, setSelectedCategories] = useState(["all"]);
  const [compareMode, setCompareMode] = useState(false);
  const [comparePeriod, setComparePeriod] = useState("previous");

  const dispatch = useDispatch();

  const { monthly = [] } = useSelector((state) => state.analytics);
  const { allBills = {} } = useSelector((state) => state.bills || {});
  const { allSavings = {} } = useSelector((state) => state.saved || {});

  useEffect(() => {
    dispatch(fetchAnalytics());
    dispatch(fetchAllSavings());
  }, [dispatch]);

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

  // ==========================================================
  // ======================= KPI LOGIC ========================
  // ==========================================================
  const utilityKPI = useMemo(() => {
    if (!allBills) {
      return { totalSpending: 0, totalSaved: 0, avgMonthly: 0, efficiency: 0, change: 0 };
    }

    const monthlyTotals = {};
    let totalAllTimeSpending = 0;
    let totalAllTimeSavings = 0;
    let mostRecentDate = null;

    Object.entries(allBills).forEach(([category, bills]) => {
      if (!selectedCategories.includes("all") && !selectedCategories.includes(category)) return;

      bills?.forEach((bill) => {
        const date = new Date(bill.billMonth || bill.date);
        const key = `${date.getFullYear()}-${date.getMonth()}`;

        if (!monthlyTotals[key]) monthlyTotals[key] = 0;
        monthlyTotals[key] += bill.cost || 0;
        totalAllTimeSpending += bill.cost || 0;

        if (!mostRecentDate || date > mostRecentDate) {
          mostRecentDate = date;
        }
      });
    });

    if (!mostRecentDate) {
      return { totalSpending: 0, totalSaved: 0, avgMonthly: 0, efficiency: 0, change: 0 };
    }

    const currentMonth = mostRecentDate.getMonth();
    const currentYear = mostRecentDate.getFullYear();
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const currentKey = `${currentYear}-${currentMonth}`;
    const previousKey = `${previousYear}-${previousMonth}`;

    const currentTotal = monthlyTotals[currentKey] || 0;
    const previousTotal = monthlyTotals[previousKey] || 0;

    let currentMonthSavings = 0;

    Object.entries(allBills).forEach(([category]) => {
      if (!selectedCategories.includes("all") && !selectedCategories.includes(category)) return;

      const savingsKey = CATEGORY_TO_SAVINGS_KEY[category];
      if (!savingsKey) return;

      allSavings?.[savingsKey]?.forEach((saving) => {
        const sDate = new Date(saving.month || saving.date || saving.createdAt);
        const savedCost = saving.savedCost || 0;

        totalAllTimeSavings += savedCost;

        if (sDate.getMonth() === currentMonth && sDate.getFullYear() === currentYear) {
          currentMonthSavings += savedCost;
        }
      });
    });

    const sortedMonths = Object.keys(monthlyTotals).sort();
    const avgMonthly =
      sortedMonths.length > 0
        ? Object.values(monthlyTotals).reduce((a, b) => a + b, 0) / sortedMonths.length
        : 0;

    const efficiency =
      totalAllTimeSpending > 0
        ? Math.min(100, Math.round((totalAllTimeSavings / totalAllTimeSpending) * 100))
        : 0;

    const change =
      previousTotal > 0
        ? Math.round(((currentTotal - previousTotal) / previousTotal) * 100)
        : 0;

    return {
      totalSpending: Math.round(currentTotal),
      totalSaved: Math.round(currentMonthSavings),
      avgMonthly: Math.round(avgMonthly),
      efficiency,
      change,
    };
  }, [allBills, selectedCategories, allSavings]);

  // ==========================================================
  // ================= SPENDING TREND CHART ===================
  // ==========================================================
  const spendingData = useMemo(() => {
    return monthly.map((m) => {
      const [yearStr, monthStr] = (m.month || "").split("-");
      const year = parseInt(yearStr, 10);
      const monthIndex = parseInt(monthStr, 10) - 1;

      let water = 0, electricity = 0, miscellaneous = 0,
          transport = 0, groceries = 0, kitchenGas = 0;

      if (selectedCategories.includes("all")) {
        water         = m.water         || 0;
        electricity   = m.electricity   || 0;
        miscellaneous = m.miscellaneous || 0;
        transport     = m.fuel          || 0;
        groceries     = m.grocery       || 0;
        kitchenGas    = m.kitchenGas    || 0;
      } else {
        if (selectedCategories.includes("water"))         water         = m.water         || 0;
        if (selectedCategories.includes("electricity"))   electricity   = m.electricity   || 0;
        if (selectedCategories.includes("miscellaneous")) miscellaneous = m.miscellaneous || 0;
        if (selectedCategories.includes("fuel"))          transport     = m.fuel          || 0;
        if (selectedCategories.includes("grocery"))       groceries     = m.grocery       || 0;
        if (selectedCategories.includes("kitchenGas"))    kitchenGas    = m.kitchenGas    || 0;
      }

      return {
        year,
        monthIndex,
        month: MONTH_NAMES[monthIndex],
        water,
        electricity,
        miscellaneous,
        transport,
        groceries,
        kitchenGas,
        amount: water + electricity + miscellaneous + transport + groceries + kitchenGas,
      };
    });
  }, [monthly, selectedCategories]);

  // ==========================================================
  // ================= CATEGORY BREAKDOWN =====================
  // ==========================================================
  const { categoryBreakdown, categoryTotalAmount } = useMemo(() => {
    const totals = {
      electricity:   0,
      water:         0,
      grocery:       0,
      fuel:          0,
      miscellaneous: 0,
      kitchenGas:    0,
    };

    Object.entries(allBills).forEach(([category, bills]) => {
      if (!selectedCategories.includes("all") && !selectedCategories.includes(category)) return;
      if (!(category in totals)) return;
      bills?.forEach((bill) => { totals[category] += bill.cost || 0; });
    });

    const totalAmount = Object.values(totals).reduce((sum, v) => sum + v, 0);

    const breakdown = [
      { category: "Electricity", amount: Math.round(totals.electricity), percentage: totalAmount > 0 ? Math.round((totals.electricity / totalAmount) * 100) : 0, color: "amber",   icon: "⚡" },
      { category: "Groceries",   amount: Math.round(totals.grocery),     percentage: totalAmount > 0 ? Math.round((totals.grocery   / totalAmount) * 100) : 0, color: "emerald", icon: "🛒" },
      { category: "Transport",   amount: Math.round(totals.fuel),        percentage: totalAmount > 0 ? Math.round((totals.fuel      / totalAmount) * 100) : 0, color: "gray",    icon: "⛽" },
      { category: "Miscellaneous", amount: Math.round(totals.miscellaneous), percentage: totalAmount > 0 ? Math.round((totals.miscellaneous / totalAmount) * 100) : 0, color: "orange", icon: "🔥" },
      { category: "Water",       amount: Math.round(totals.water),       percentage: totalAmount > 0 ? Math.round((totals.water     / totalAmount) * 100) : 0, color: "blue",    icon: "💧" },
      { category: "Kitchen Gas", amount: Math.round(totals.kitchenGas),  percentage: totalAmount > 0 ? Math.round((totals.kitchenGas/ totalAmount) * 100) : 0, color: "red",     icon: "🍳" },
    ].filter((cat) => cat.amount > 0);

    return { categoryBreakdown: breakdown, categoryTotalAmount: Math.round(totalAmount) };
  }, [allBills, selectedCategories]);

  // ==========================================================
  // ====================== EXPORT HANDLERS ===================
  // ==========================================================
  const handleExportPDF = async () => {
    try {
      const analyticsData = {
        kpiData: utilityKPI,
        timeSeriesData: spendingData,
        categoryBreakdown,
        dateRange,
        selectedCategories,
        totalAmount: categoryTotalAmount,
      };
      await exportToPDF(analyticsData);
      Alert.alert("✅ Success", "PDF report has been downloaded successfully!");
    } catch (error) {
      console.error("Error exporting PDF:", error);
      Alert.alert("❌ Error", "Failed to export PDF. Please try again.");
    }
  };

  const handleExportExcel = async () => {
    try {
      const analyticsData = {
        kpiData: utilityKPI,
        timeSeriesData: spendingData,
        categoryBreakdown,
        dateRange,
        selectedCategories,
        totalAmount: categoryTotalAmount,
      };
      await exportToExcel(analyticsData);
      Alert.alert("✅ Success", "Excel report has been downloaded successfully!");
    } catch (error) {
      console.error("Error exporting Excel:", error);
      Alert.alert("❌ Error", "Failed to export Excel. Please try again.");
    }
  };

  // ==========================================================
  // ======================== UI ==============================
  // ==========================================================
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
            {/* ✅ FilterPanel now receives export handlers */}
            <FilterPanel
              dateRange={dateRange}
              setDateRange={setDateRange}
              selectedCategories={selectedCategories}
              toggleCategory={toggleCategory}
              compareMode={compareMode}
              comparePeriod={comparePeriod}
              setComparePeriod={setComparePeriod}
              onExportPDF={handleExportPDF}
              onExportExcel={handleExportExcel}
            />

            <UtilityKPICards utilityKPI={utilityKPI} />

            <SpendingTrendsChart spendingData={spendingData} />

            <CategoryBreakdown
              categoryBreakdown={categoryBreakdown}
              totalAmount={categoryTotalAmount}
            />

            {/* <ExportSchedulePanel /> */}
          </>
        ) : (
          <>
            <GameKPICards gameKPI={{}} />
            <AchievementsProgress achievements={[]} />
            <RecentRewards rewards={[]} />
            {/* <ExportSchedulePanel
              kpiData={utilityKPI}
              timeSeriesData={spendingData}
              categoryBreakdown={categoryBreakdown}
              dateRange={dateRange}
              selectedCategories={selectedCategories}
              totalAmount={categoryTotalAmount}
            /> */}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}