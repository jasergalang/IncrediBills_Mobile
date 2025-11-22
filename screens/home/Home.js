import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  StatusBar,
  ScrollView,
  RefreshControl,
} from "react-native";
import HomeHeader from "../../components/home/HomeHeader";
import WelcomeCard from "../../components/home/WelcomeCard";
import StatsCards from "../../components/home/StatsCards";
import QuickActions from "../../components/home/QuickActions";
import RecentBills from "../../components/home/RecentBills";
import SpendingOverview from "../../components/home/SpendingOverview";
import UpcomingBills from "../../components/home/UpcomingBills";
import AchievementsBanner from "../../components/home/AchievementsBanner";
import { useAuth } from "../../context/auth";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import { useBills } from "../../hooks/useBills";
import { useFocusEffect } from "@react-navigation/native";
export default function Home({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();
  const [userData, setUserData] = useState({
    name: "",
    profilePic: null,
    level: 0,
    points: 0,
  });

  const {
    recentBills,
    spendingData,
    upcomingBills,
    statsData,
    refreshBills,
  } = useBills();
  const fetchUserProfile = async () => {
    if (!user?.token) return;

    try {
      const res = await axios.get(`${baseURL}/api/user/profile`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const u = res.data.user;

      setUserData({
        name: `${u.firstName || ""} ${u.lastName || ""}`.trim(),
        profilePic: u.profilePic?.[0]?.url || null,
        level: u.level || 0,
        points: u.points || 0,
      });
    } catch (error) {
      console.log("Fetch user error:", error.response?.data || error.message);
    }
  };


  useEffect(() => {
    fetchUserProfile();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      await Promise.all([
        fetchUserProfile(),
        refreshBills(),
      ]);
    } finally {
      setTimeout(() => setRefreshing(false), 800);
    }
  };

  useFocusEffect(
    useCallback(() => {
      refreshBills();
    }, [])
  );


  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <HomeHeader navigation={navigation} />
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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