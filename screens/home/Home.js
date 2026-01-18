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
  const { monthly = [] } = analytics;

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

  // Categories (SpendingOverview) - using monthly analytics like Analytics screen
  const categories = useMemo(() => {
    // Get the latest month's data from monthly analytics (same as Analytics screen)
    const latest = monthly.length > 0 ? monthly[monthly.length - 1] : {};
    
    const monthlyAmountsData = {
      electricity: latest.electricity || 0,
      water: latest.water || 0,
      fuel: latest.fuel || 0,
      grocery: latest.grocery || 0,
      miscellaneous: latest.miscellaneous || 0,
    };

    // Calculate total
    const total = Object.values(monthlyAmountsData).reduce((a, b) => a + b, 0);

    // Map to category objects and filter out zero amounts
    return utilities
      .map((u) => {
        const amount = monthlyAmountsData[u.id] || 0;
        return {
          category: u.name,
          amount,
          percent: total ? Math.round((amount / total) * 100) : 0,
          icon: u.icon,
          color: u.color,
        };
      })
      .filter((cat) => cat.amount > 0);
  }, [monthly]);

  // Upcoming Bills (from predictions)
  const upcomingBills = useMemo(() => {
    const bills = [];

    const predictionCategories = [
      { key: 'electricity', id: 'electricity' },
      { key: 'water', id: 'water' },
      { key: 'fuel', id: 'fuel' },
      { key: 'grocery', id: 'grocery' },
      { key: 'miscellaneous', id: 'miscellaneous' },
    ];

    predictionCategories.forEach(({ key, id }) => {
      const latestPrediction = getLatestBill(predictions[key] || []);

      if (latestPrediction) {
        const util = utilities.find((u) => u.id === id);

        if (util) {
          bills.push({
            id,
            type: util.name,
            amount: latestPrediction.predictedCost || 0,
            dueDate: formatBillDate(latestPrediction.predictedDate),
            icon: util.icon,
            color: util.color,
          });
        }
      }
    });

    return bills;
  }, [predictions]);

  // StatsCards data - using monthly analytics for current month total
  const statsData = useMemo(() => {
    // Get current month total from latest monthly analytics (same as Analytics screen)
    const latest = monthly.length > 0 ? monthly[monthly.length - 1] : {};
    const currentTotal = (latest.electricity || 0) + 
                        (latest.water || 0) + 
                        (latest.fuel || 0) + 
                        (latest.grocery || 0) + 
                        (latest.miscellaneous || 0);

    // Get previous month total for percentage calculation
    const previous = monthly.length > 1 ? monthly[monthly.length - 2] : {};
    const previousTotal = (previous.electricity || 0) + 
                         (previous.water || 0) + 
                         (previous.fuel || 0) + 
                         (previous.grocery || 0) + 
                         (previous.miscellaneous || 0);

    const predictedTotal = upcomingBills.reduce(
      (sum, bill) => sum + (bill?.amount || 0),
      0
    );

    const totalSpentChange = previousTotal > 0
      ? Math.round(((currentTotal - previousTotal) / previousTotal) * 100)
      : 0;

    const predictionChange = currentTotal > 0
      ? Math.round(((predictedTotal - currentTotal) / currentTotal) * 100)
      : 0;

    return {
      totalSpent: Math.round(currentTotal),
      totalSpentChange,
      nextMonthPrediction: Math.round(predictedTotal),
      predictionChange,
      billsUploaded: bills.billsUploaded || 0,
      savedAmount: 0, // Can be calculated based on budget vs actual
      savedChange: 0,
      billsChange: 0,
    };
  }, [monthly, upcomingBills, bills.billsUploaded]);

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
        <RecentBills bills={recentBills.slice(0, 5)} navigation={navigation} />
        <SpendingOverview spendingData={categories} />
        <UpcomingBills bills={upcomingBills} navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
}