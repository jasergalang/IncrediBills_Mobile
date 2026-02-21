import React, { useState, useCallback, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, ScrollView, RefreshControl } from "react-native";
import HomeHeader from "../../components/home/HomeHeader";
import StatsCards from "../../components/home/StatsCards";
import QuickActions from "../../components/home/QuickActions";
import RecentBills from "../../components/home/RecentBills";
import SpendingOverview from "../../components/home/SpendingOverview";
import { useFocusEffect } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/slices/user/userSlice";
import { fetchBills } from "../../redux/slices/bills/billSlice";
import { fetchPredictions } from "../../redux/slices/prediction/predictionSlice";
import { fetchAnalytics } from "../../redux/slices/analytics/analyticsSlice";
import { utilities } from "../../constants/utilities";
import { getLatestBill, formatBillDate } from "../../utils/billUtils";

export default function Home({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  const { userData } = useSelector((state) => state.user);
  const bills = useSelector(
    (state) => state.bills || { latestAmounts: {}, recentBills: [] }
  );
  const predictions = useSelector(
    (state) => state.predictions || { electricity: [], water: [] }
  );
  const analytics = useSelector((state) => state.analytics || { monthly: [] });

  const { latestAmounts, recentBills, loading } = bills;
  
  const fetchAll = async () => {
    await Promise.all([
      dispatch(fetchUser()),
      dispatch(fetchBills()),
      dispatch(fetchPredictions()),
      dispatch(fetchAnalytics()),
    ]);
  };

  useFocusEffect(
    useCallback(() => {
      fetchAll();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAll();
    setRefreshing(false);
  };

  const statsData = useMemo(() => {
    const allBills = bills.allBills;

    if (!allBills) {
      return {
        totalSpent: 0,
        totalSpentChange: 0,
        nextMonthPrediction: 0,
        predictionChange: 0,
        billsUploaded: 0,
        savedAmount: 0,
        savedChange: 0,
      };
    }

    // 🔹 Step 1: Get latest month across ALL categories
    let latestDate = null;

    Object.values(allBills).forEach((categoryBills) => {
      categoryBills.forEach((bill) => {
        const billDate = new Date(bill.billMonth || bill.date);
        if (!latestDate || billDate > latestDate) {
          latestDate = billDate;
        }
      });
    });

    if (!latestDate) return {};

    const latestMonth = latestDate.getMonth();
    const latestYear = latestDate.getFullYear();

    // 🔹 Step 2: Get actual total for that month
    let actualTotal = 0;
    const categoriesWithLatestMonth = [];

    Object.entries(allBills).forEach(([key, categoryBills]) => {
      const match = categoryBills.find((bill) => {
        const d = new Date(bill.billMonth || bill.date);
        return (
          d.getMonth() === latestMonth &&
          d.getFullYear() === latestYear
        );
      });

      if (match) {
        actualTotal += match.cost || 0;
        categoriesWithLatestMonth.push(key);
      }
    });

    // 🔹 Step 3: Get next month prediction
    let predictedTotal = 0;

    const nextMonthDate = new Date(latestYear, latestMonth + 1);

    categoriesWithLatestMonth.forEach((key) => {
      const categoryPredictions = predictions[key] || [];

      const match = categoryPredictions.find((pred) => {
        const d = new Date(pred.predictedDate);
        return (
          d.getMonth() === nextMonthDate.getMonth() &&
          d.getFullYear() === nextMonthDate.getFullYear()
        );
      });

      if (match) {
        predictedTotal += match.predictedCost || 0;
      }
    });

    // 🔹 Step 4: Compute saved
    const savedAmount = predictedTotal - actualTotal;

    const predictionChange =
      actualTotal > 0
        ? Math.round(((predictedTotal - actualTotal) / actualTotal) * 100)
        : 0;

    return {
      totalSpent: Math.round(actualTotal),
      totalSpentChange: 0, // optional if you want month-to-month change
      nextMonthPrediction: Math.round(predictedTotal),
      predictionChange,
      billsUploaded: bills.billsUploaded || 0,
      savedAmount: Math.round(savedAmount),
      savedChange: predictionChange,
    };
  }, [bills.allBills, predictions]);
  const latestPerCategoryBills = useMemo(() => {
    const allBills = bills.allBills;
    if (!allBills) return [];

    const result = [];

    Object.entries(allBills).forEach(([key, categoryBills]) => {
      if (!categoryBills || categoryBills.length === 0) return;

      // Sort descending by date
      const sorted = [...categoryBills].sort(
        (a, b) =>
          new Date(b.billMonth || b.date) -
          new Date(a.billMonth || a.date)
      );

      const latest = sorted[0];

      const util = utilities.find((u) => u.id === key);

      if (latest && util) {
        result.push({
          id: `${key}-${latest._id || latest.id}`,
          name: util.name,
          amount: latest.cost || 0,
          date: formatBillDate(latest.billMonth || latest.date),
          icon: util.icon,
          color: util.color,
          backgroundColor: util.backgroundColor2,
          status: latest.status || "Success",
        });
      }
    });

    return result;
  }, [bills.allBills]);
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <HomeHeader navigation={navigation} userData={userData} />
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing || loading}
            onRefresh={onRefresh}
          />
        }
      >
        <StatsCards statsData={statsData} />
        <QuickActions navigation={navigation} />
        <RecentBills bills={latestPerCategoryBills} navigation={navigation} />
        <SpendingOverview allBills={bills.allBills} />
      </ScrollView>
    </SafeAreaView>
  );
}