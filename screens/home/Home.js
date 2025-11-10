import React, { useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  StatusBar,
  ScrollView,
  RefreshControl,
} from "react-native";
import HomeHeader from "../../components/home/HomeHeader";
import WelcomeCard from "../../components/home/WelcomeCard";
import StatsCards from "../../components/home/StatsCards"; // <-- Make sure this matches your filename!
import QuickActions from "../../components/home/QuickActions";
import RecentBills from "../../components/home/RecentBills";
import SpendingOverview from "../../components/home/SpendingOverview";
import UpcomingBills from "../../components/home/UpcomingBills";
import AchievementsBanner from "../../components/home/AchievementsBanner";

export default function Home({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);

  const userData = {
    name: "Juan Dela Cruz",
    level: 12,
    points: 850,
  };

  const statsData = {
    totalSpent: 8250,
    savedAmount: 1850,
    billsPaid: 24,
    efficiency: 92,
  };

  const recentBills = [
    {
      id: 1,
      type: "Electricity",
      amount: 2850,
      date: "Nov 5",
      status: "paid",
      icon: "⚡",
      color: "amber",
    },
    {
      id: 2,
      type: "Water",
      amount: 450,
      date: "Nov 3",
      status: "paid",
      icon: "💧",
      color: "blue",
    },
    {
      id: 3,
      type: "Internet",
      amount: 1699,
      date: "Nov 1",
      status: "paid",
      icon: "📡",
      color: "purple",
    },
  ];

  const upcomingBills = [
    {
      id: 1,
      type: "Electricity",
      amount: 3100,
      dueDate: "Dec 5",
      icon: "⚡",
      color: "amber",
    },
    {
      id: 2,
      type: "Water",
      amount: 520,
      dueDate: "Dec 8",
      icon: "💧",
      color: "blue",
    },
  ];

  const spendingData = [
    {
      category: "Electricity",
      amount: 2850,
      percent: 35,
      icon: "⚡",
      color: "amber",
    },
    { category: "Water", amount: 450, percent: 5, icon: "💧", color: "blue" },
    {
      category: "Internet",
      amount: 1699,
      percent: 21,
      icon: "📡",
      color: "purple",
    },
    {
      category: "Groceries",
      amount: 2200,
      percent: 27,
      icon: "🛒",
      color: "green",
    },
    {
      category: "Others",
      amount: 1051,
      percent: 12,
      icon: "📊",
      color: "slate",
    },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

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
