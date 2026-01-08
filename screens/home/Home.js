import React, { useState, useCallback } from "react";
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
import { useBills } from "../../hooks/useBills";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from '../../redux/actions/userAction';
import { useAuth } from "../../context/auth";

export default function Home({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const { recentBills, spendingData, upcomingBills, statsData, refreshBills } = useBills();
  const { token } = useAuth();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([fetchUserProfile(), refreshBills()]);
    } finally {
      setTimeout(() => setRefreshing(false), 800);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (token) {
        dispatch(fetchUser(token));
      }
      refreshBills();
    }, [token])
  );


  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <HomeHeader navigation={navigation} />
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <WelcomeCard userData={userData} />
        <StatsCards statsData={statsData} />
        <QuickActions navigation={navigation} />
        <AchievementsBanner navigation={navigation} />
        <RecentBills bills={recentBills} navigation={navigation} />
        <SpendingOverview spendingData={spendingData} />
        <UpcomingBills bills={upcomingBills} navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
}
