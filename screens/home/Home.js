import React, { useState, useEffect } from "react";
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
export default function Home({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();

  const [userData, setUserData] = useState({
    name: "",
    profilePic: null,
    level: 0,
    points: 0,
  });

  const [statsData, setStatsData] = useState({
    totalSpent: 0,
    savedAmount: 0,
    billsUploaded: 0,
    efficiency: 0,
  });

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
  const getLatestBill = (bills) => {
    if (!Array.isArray(bills) || bills.length === 0) return null;
    return bills.reduce((latest, b) => {
      return new Date(b.date) > new Date(latest.date) ? b : latest;
    }, bills[0]);
  };

  const homeData = async () => {
    if (!user?.token) return;

    try {
      const [electricRes, waterRes, electricPredRes, waterPredRes] = await Promise.all([
        axios.get(`${baseURL}/api/electric-bill/all`, { headers: { Authorization: `Bearer ${user.token}` } }),
        axios.get(`${baseURL}/api/water-bill/all`, { headers: { Authorization: `Bearer ${user.token}` } }),
        axios.get(`${baseURL}/api/electric-bill/predictions`, { headers: { Authorization: `Bearer ${user.token}` } }),
        axios.get(`${baseURL}/api/water-bill/predictions`, { headers: { Authorization: `Bearer ${user.token}` } }),
      ]);

      const electricData = electricRes.data || { bills: [] };
      const waterData = waterRes.data || { bills: [] };
      const electricPredictions = (electricPredRes.data && electricPredRes.data.predictions) || [];
      const waterPredictions = (waterPredRes.data && waterPredRes.data.predictions) || [];

      const latestElectric = getLatestBill(electricData.bills);
      const latestWater = getLatestBill(waterData.bills);

      const matchPrediction = (latestBill, predictions) => {
        if (!latestBill) return null;
        return (predictions || []).find((pred) => {
          const p = new Date(pred.predictedDate);
          const b = new Date(latestBill.date);
          return p.getMonth() === b.getMonth() && p.getFullYear() === b.getFullYear();
        });
      };

      const computeForLatest = (latestBill, predictions) => {
        if (!latestBill) return { scanned: 0, predicted: 0, diff: 0 };
        const scanned = Number(latestBill.cost || 0);
        const match = matchPrediction(latestBill, predictions);
        const predicted = match?.predictedCost ?? (scanned ? scanned * 1.1 : 0);
        const diff = predicted - scanned;
        return { scanned, predicted, diff };
      };

      const e = computeForLatest(latestElectric, electricPredictions);
      const w = computeForLatest(latestWater, waterPredictions);

      const totalSpent = Number(e.scanned || 0) + Number(w.scanned || 0);

      const savedAmount = [e.diff, w.diff].reduce((s, v) => s + (v > 0 ? v : 0), 0);

      const billsUploaded =
        (Array.isArray(electricData.bills) ? electricData.bills.length : 0) +
        (Array.isArray(waterData.bills) ? waterData.bills.length : 0);

      setStatsData((prev) => ({
        ...prev,
        totalSpent: Math.round(totalSpent * 100) / 100,
        savedAmount: Math.round(savedAmount * 100) / 100,
        billsUploaded,
      }));
    } catch (err) {
      console.log("homeData error:", err?.response?.data || err.message || err);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    homeData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    Promise.resolve()
      .then(() => Promise.all([fetchUserProfile(), homeData()]))
      .finally(() => setTimeout(() => setRefreshing(false), 800));
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
