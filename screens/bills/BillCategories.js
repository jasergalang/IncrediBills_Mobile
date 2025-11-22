import React, { useState, useCallback } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StatusBar } from "react-native";
import BillsHeader from "../../components/bills/billCategories/BillsHeader";
import BillsTotalCard from "../../components/bills/billCategories/BillsTotalCard";
import BillsUtilitiesGrid from "../../components/bills/billCategories/BillsUtilitiesGrid";
import BillsTrendsChart from "../../components/bills/billCategories/BillsTrendChart";
import BillsRecentSection from "../../components/bills/billCategories/BillsRecentSection";
import { useBills } from "../../hooks/useBills";
import { utilities } from "../../constants/utilities";
import { useFocusEffect } from "@react-navigation/native";

export default function BillCategories({ navigation }) {
  const [activeTab, setActiveTab] = useState("all");
  const [timeRange, setTimeRange] = useState("month");

  const {
    recentBills,
    latestAmounts,
    computedChanges,
    analytics,
    refreshBills
  } = useBills();

  const filteredBills =
    activeTab === "all"
      ? recentBills
      : recentBills.filter((bill) => bill.type === activeTab);

  // ✔ Compute total for all utilities
  const totalAmount = Object.values(latestAmounts).reduce((total, num) => total + num, 0);
  const totalChange = Object.values(computedChanges).reduce((total, num) => total + parseFloat(num), 0);

  // ✔ Fill utilities with dynamic amounts & changes
  const dynamicUtilities = utilities.map((u) => ({
    ...u,
    amount: latestAmounts[u.id] || 0,
    change: computedChanges[u.id] || 0
  }));

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

  useFocusEffect(
    useCallback(() => {
      refreshBills();
    }, [])
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <BillsHeader />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <BillsTotalCard totalAmount={totalAmount} totalChange={totalChange} />
        <BillsUtilitiesGrid
          utilities={dynamicUtilities}
          onPress={handleCategoryPress}
        />
        <BillsTrendsChart
          totalChange={totalChange}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          monthlyData={analytics.monthly}
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