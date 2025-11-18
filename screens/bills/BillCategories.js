import React, { useState, useEffect } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StatusBar } from "react-native";
import BillsHeader from "../../components/bills/billCategories/BillsHeader";
import BillsTotalCard from "../../components/bills/billCategories/BillsTotalCard";
import BillsUtilitiesGrid from "../../components/bills/billCategories/BillsUtilitiesGrid";
import BillsTrendsChart from "../../components/bills/billCategories/BillsTrendChart";
import BillsRecentSection from "../../components/bills/billCategories/BillsRecentSection";
import { utilities, monthlyData, transformBills,  } from "../../constants/BillsData";
import baseURL from "../../assets/common/baseUrl";
import { useAuth } from "../../context/auth";

export default function BillCategories({ navigation }) {
  const [activeTab, setActiveTab] = useState("all");
  const [timeRange, setTimeRange] = useState("month");
  const [recentBills, setRecentBills] = useState([]);
  const { token, getToken } = useAuth();

  useEffect(() => {
    fetchAllBills();
  }, []);

  const handleCategoryPress = (category) => {
    const routes = {
      water: "WaterBills",
      electricity: "ElectricBills",
      fuel: "TransportBills",
      gas: "KitchenGasBills",
      grocery: "GroceryBills",
    };
    navigation.navigate(routes[category.id] || "BillCategories", { category });
  };

  const fetchAllBills = async () => {
    const userToken = token || (await getToken());
    if (!userToken) return;

    try {
      const [electricRes, waterRes] = await Promise.all([
        fetch(`${baseURL}/api/electric-bill/all`, {
          headers: { Authorization: `Bearer ${userToken}` }
        }),
        fetch(`${baseURL}/api/water-bill/all`, {
          headers: { Authorization: `Bearer ${userToken}` }
        }),
      ]);

      const electricData = await electricRes.json();
      const waterData = await waterRes.json();

      const allBills = transformBills(electricData, waterData);
      setRecentBills(allBills);
    } catch (err) {
      console.error("Error fetching bills:", err);
    }
  };

  const filteredBills =
    activeTab === "all"
      ? recentBills
      : recentBills.filter((bill) => bill.type === activeTab);

  const totalAmount = utilities.reduce((sum, util) => sum + util.amount, 0);

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <BillsHeader />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <BillsTotalCard totalAmount={totalAmount} />
        <BillsUtilitiesGrid
          utilities={utilities}
          onPress={handleCategoryPress}
        />
        <BillsTrendsChart
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          monthlyData={monthlyData}
        />
        <BillsRecentSection
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          utilities={utilities}
          recentBills={recentBills}
          filteredBills={filteredBills}
        />
      </ScrollView>
    </SafeAreaView>
  );
}