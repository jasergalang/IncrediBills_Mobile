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
  const { userData, fetchUserProfile } = useUser();
  
  const { recentBills, spendingData, upcomingBills, statsData, refreshBills } = useBills();

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserProfile();
      refreshBills();
    }, [])
  );
  if (!userData) {
    return <View className="flex-1 bg-white" />; 
  }

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
