import React, { useState, useCallback, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, ScrollView, RefreshControl } from "react-native";
import HomeHeader from "../../components/home/HomeHeader";
import WelcomeCard from "../../components/home/WelcomeCard";
import StatsCards from "../../components/home/StatsCards";
import QuickActions from "../../components/home/QuickActions";
import RecentBills from "../../components/home/RecentBills";
import SpendingOverview from "../../components/home/SpendingOverview";
import UpcomingBills from "../../components/home/UpcomingBills";
import AchievementsBanner from "../../components/home/AchievementsBanner";
import { useFocusEffect } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/slices/user/userSlice"; // ✅ New import
import { fetchBills } from "../../redux/slices/bills/billSlice";
import { fetchPredictions } from "../../redux/slices/prediction/predictionSlice";
import { fetchAnalytics } from "../../redux/slices/analytics/analyticsSlice";
import { utilities } from "../../constants/utilities";
import { getLatestBill, formatBillDate } from "../../utils/billUtils";

export default function Home({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  // ✅ Redux state - no need for token anymore
  const { userData } = useSelector((state) => state.user);
  const bills = useSelector(
    (state) => state.bills || { latestAmounts: {}, recentBills: [] }
  );
  const predictions = useSelector(
    (state) => state.predictions || { electricity: [], water: [] }
  );
  const analytics = useSelector((state) => state.analytics);

  const { latestAmounts, recentBills, loading } = bills;

  // ✅ Fetch all data
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

  // =======================
  // 📊 DERIVED UI DATA
  // =======================

  // Categories (SpendingOverview)
  // const categories = useMemo(() => {
  //   const total =
  //     (latestAmounts?.electricity || 0) +
  //     (latestAmounts?.water || 0);

  //   return utilities.map((u) => {
  //     const amount = latestAmounts?.[u.id] || 0;
  //     return {
  //       category: u.name,
  //       amount,
  //       percent: total ? Math.round((amount / total) * 100) : 0,
  //       icon: u.icon,
  //       color: u.color,
  //     };
  //   });
  // }, [latestAmounts]);
  const categories = useMemo(() => {
    const total = Object.values(latestAmounts || {}).reduce(
      (sum, amount) => sum + (amount || 0),
      0
    );

    return utilities.map((u) => {
      const amount = latestAmounts?.[u.id] || 0;
      return {
        category: u.name,
        amount,
        percent: total ? Math.round((amount / total) * 100) : 0,
        icon: u.icon,
        color: u.color,
      };
    });
  }, [latestAmounts]);

  // Upcoming Bills (from predictions)
  const upcomingBills = useMemo(() => {
    const bills = [];

    const electric = getLatestBill(predictions.electricity || []);
    const water = getLatestBill(predictions.water || []);

    if (electric) {
      const util = utilities.find((u) => u.id === "electricity");
      bills.push({
        id: "electricity",
        type: util.name,
        amount: electric.predictedCost || 0,
        dueDate: formatBillDate(electric.predictedDate),
        icon: util.icon,
        color: util.color,
      });
    }

    if (water) {
      const util = utilities.find((u) => u.id === "water");
      bills.push({
        id: "water",
        type: util.name,
        amount: water.predictedCost || 0,
        dueDate: formatBillDate(water.predictedDate),
        icon: util.icon,
        color: util.color,
      });
    }

    return bills;
  }, [predictions]);

  // StatsCards data
  // const statsData = useMemo(() => {
  //   const currentTotal =
  //     (latestAmounts?.electricity || 0) +
  //     (latestAmounts?.water || 0);

  //   const predictedTotal =
  //     (upcomingBills[0]?.amount || 0) +
  //     (upcomingBills[1]?.amount || 0);

  //   const percentChange =
  //     currentTotal > 0
  //       ? Math.round(((predictedTotal - currentTotal) / currentTotal) * 100)
  //       : 0;

  //   return {
  //     totalSpent: Math.round(currentTotal),
  //     nextMonthPrediction: Math.round(predictedTotal),
  //     predictionChange: percentChange,
  //     billsUploaded: bills.billsUploaded || 0,
  //   };
  // }, [latestAmounts, upcomingBills]);
  const statsData = useMemo(() => {
    const currentTotal = Object.values(latestAmounts || {}).reduce(
      (sum, amount) => sum + (amount || 0),
      0
    );

    const predictedTotal = upcomingBills.reduce(
      (sum, bill) => sum + (bill?.amount || 0),
      0
    );

    const percentChange =
      currentTotal > 0
        ? Math.round(((predictedTotal - currentTotal) / currentTotal) * 100)
        : 0;

    return {
      totalSpent: Math.round(currentTotal),
      nextMonthPrediction: Math.round(predictedTotal),
      predictionChange: percentChange,
      billsUploaded: bills.billsUploaded || 0,
    };
  }, [latestAmounts, upcomingBills, bills.billsUploaded]);
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <HomeHeader navigation={navigation} />
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
        <WelcomeCard userData={userData} />
        <StatsCards statsData={statsData} />
        <QuickActions navigation={navigation} />
        <AchievementsBanner navigation={navigation} />
        <RecentBills bills={recentBills} navigation={navigation} />
        <SpendingOverview spendingData={categories} />
        <UpcomingBills bills={upcomingBills} navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
}