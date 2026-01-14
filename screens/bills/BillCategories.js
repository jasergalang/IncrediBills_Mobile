import React, { useState, useEffect } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StatusBar } from "react-native";
import BillsHeader from "../../components/bills/billCategories/BillsHeader";
import BillsTotalCard from "../../components/bills/billCategories/BillsTotalCard";
import BillsUtilitiesGrid from "../../components/bills/billCategories/BillsUtilitiesGrid";
import BillsTrendsChart from "../../components/bills/billCategories/BillsTrendChart";
import BillsRecentSection from "../../components/bills/billCategories/BillsRecentSection";
import { utilities } from "../../constants/utilities";
import { useFocusEffect } from "@react-navigation/native";

import { useSelector, useDispatch } from "react-redux";
import { fetchBills } from "../../redux/slices/bills/billSlice";
import { useAuth } from "../../context/auth";
import { fetchPredictions } from "../../redux/slices/prediction/predictionSlice";
import { fetchAnalytics } from "../../redux/slices/analytics/analyticsSlice";

export default function BillCategories({ navigation }) {
  const [activeTab, setActiveTab] = useState("all");
  const [timeRange, setTimeRange] = useState("month");

  const dispatch = useDispatch();
  const { token } = useAuth();
  
  // Redux state
  const bills = useSelector((state) => state.bills);
  const predictions = useSelector((state) => state.predictions);
  const analytics = useSelector((state) => state.analytics);
  
  const { latestAmounts, recentBills } = bills;
  const { computedChanges } = predictions;

  // Fetch data on mount
  useEffect(() => {
    if (token) {
      dispatch(fetchBills());
    }
  }, [dispatch, token]);

  // Refetch on focus
  useFocusEffect(
    React.useCallback(() => {
      if (token) {
        dispatch(fetchBills());
        dispatch(fetchPredictions());
        dispatch(fetchAnalytics());
      }
    }, [dispatch, token])
  );

  // Filter bills by active tab
  const filteredBills =
    activeTab === "all"
      ? recentBills
      : recentBills.filter((bill) => bill.type === activeTab);

  // Total amounts - All 5 categories
  const totalAmount = Object.values(latestAmounts || {}).reduce(
    (sum, amount) => sum + (amount || 0),
    0
  );

  // Total changes - All 5 categories
  const totalChange = Object.values(computedChanges || {}).reduce(
    (total, num) => total + parseFloat(num || 0),
    0
  );

  // Map utilities dynamically with latest data - All 5 categories
  const dynamicUtilities = utilities.map((u) => ({
    ...u,
    amount: latestAmounts?.[u.id] || 0,
    change: computedChanges?.[u.id] || 0,
  }));

  // Handle category press
  const handleCategoryPress = (category) => {
    const routes = {
      water: "WaterBills",
      electricity: "ElectricBills",
      fuel: "TransportBills",
      grocery: "GroceryBills",
      miscellaneous: "MiscellaneousBills",
    };
    navigation.navigate(routes[category.id] || "BillCategories", { category });
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <BillsHeader navigation={navigation} />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <BillsTotalCard 
          totalAmount={totalAmount} 
          totalChange={totalChange} 
        />
        <BillsUtilitiesGrid 
          utilities={dynamicUtilities} 
          onPress={handleCategoryPress} 
        />
        <BillsTrendsChart
          totalChange={totalChange}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          monthlyData={analytics?.monthly || []}
        />
        <BillsRecentSection
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          utilities={utilities}
          recentBills={recentBills || []}
          filteredBills={filteredBills || []}
        />
      </ScrollView>
    </SafeAreaView>
  );
}