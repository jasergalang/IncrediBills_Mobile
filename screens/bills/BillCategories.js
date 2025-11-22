import React, { useState, useEffect } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StatusBar } from "react-native";
import BillsHeader from "../../components/bills/billCategories/BillsHeader";
import BillsTotalCard from "../../components/bills/billCategories/BillsTotalCard";
import BillsUtilitiesGrid from "../../components/bills/billCategories/BillsUtilitiesGrid";
import BillsTrendsChart from "../../components/bills/billCategories/BillsTrendChart";
import BillsRecentSection from "../../components/bills/billCategories/BillsRecentSection";
import { utilities, transformBills, computeMonthlyTotals, mergeMonthlyAnalytics } from "../../constants/BillsData";
import baseURL from "../../assets/common/baseUrl";
import { useAuth } from "../../context/auth";
import { useIsFocused } from "@react-navigation/native";

export default function BillCategories({ navigation }) {
  const [activeTab, setActiveTab] = useState("all");
  const [timeRange, setTimeRange] = useState("month");
  const [recentBills, setRecentBills] = useState([]);
  const { token, getToken } = useAuth();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchAllBills();
    }
  }, [isFocused]);


  const [realTotals, setRealTotals] = useState({
    water: 0,
    electricity: 0,
    gas: 0,
    fuel: 0,
    grocery: 0,
  });

  const [analytics, setAnalytics] = useState({
    monthly: [],
    yearly: []
  });

  const [computedChanges, setComputedChanges] = useState({
    water: 0,
    electricity: 0,
    gas: 0,
    fuel: 0,
    grocery: 0,
  });

  const [latestAmounts, setLatestAmounts] = useState({
    water: 0,
    electricity: 0,
    gas: 0,
    fuel: 0,
    grocery: 0,
  });

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
      const [electricRes, waterRes, electricAnalyticsRes, waterAnalyticsRes] =
        await Promise.all([
          fetch(`${baseURL}/api/electric-bill/all`, {
            headers: { Authorization: `Bearer ${userToken}` }
          }),
          fetch(`${baseURL}/api/water-bill/all`, {
            headers: { Authorization: `Bearer ${userToken}` }
          }),
          fetch(`${baseURL}/api/electric-bill/analytics`, {
            headers: { Authorization: `Bearer ${userToken}` }
          }),
          fetch(`${baseURL}/api/water-bill/analytics`, {
            headers: { Authorization: `Bearer ${userToken}` }
          }),
        ]);

      const electricData = await electricRes.json();
      const waterData = await waterRes.json();
      const electricAnalytics = await electricAnalyticsRes.json();
      const waterAnalytics = await waterAnalyticsRes.json();

      const [electricPredRes, waterPredRes] = await Promise.all([
        fetch(`${baseURL}/api/electric-bill/predictions`, {
          headers: { Authorization: `Bearer ${userToken}` }
        }),
        fetch(`${baseURL}/api/water-bill/predictions`, {
          headers: { Authorization: `Bearer ${userToken}` }
        })
      ]);

      const electricPredJson = electricPredRes.ok ? await electricPredRes.json() : { predictions: [] };
      const waterPredJson = waterPredRes.ok ? await waterPredRes.json() : { predictions: [] };

      const getLatestBill = (bills) => {
        if (!bills || bills.length === 0) return null;
        return bills.reduce((latest, b) => {
          return new Date(b.date) > new Date(latest.date) ? b : latest;
        }, bills[0]);
      };

      const computeChange = (latestBill, predictions) => {
        if (!latestBill) return 0;
        const match = (predictions || []).find((pred) => {
          const p = new Date(pred.predictedDate);
          const b = new Date(latestBill.date);
          return p.getMonth() === b.getMonth() && p.getFullYear() === b.getFullYear();
        });
        const predictedCost = match?.predictedCost ?? (latestBill.cost ? latestBill.cost * 1.1 : 0);
        const scanned = latestBill.cost || 0;
        if (!predictedCost || !scanned) return 0;
        const change = ((scanned - predictedCost) / predictedCost) * 100;
        Math.round(change * 10) / 10;

        return change.toFixed(2);
      };

      const latestElectric = getLatestBill(electricData.bills);
      const latestWater = getLatestBill(waterData.bills);
      const electricChange = computeChange(latestElectric, electricPredJson.predictions);
      const waterChange = computeChange(latestWater, waterPredJson.predictions);

      setComputedChanges((prev) => ({
        ...prev,
        electricity: electricChange,
        water: waterChange,
      }));

      setLatestAmounts((prev) => ({
        ...prev,
        electricity: latestElectric?.cost || 0,
        water: latestWater?.cost || 0,
      }));

      const allBills = transformBills(electricData, waterData);
      setRecentBills(allBills);

      const totals = computeMonthlyTotals(
        electricData.bills,
        waterData.bills
      );
      setRealTotals(totals);

      const mergedMonthly = mergeMonthlyAnalytics(
        waterAnalytics.monthly,
        electricAnalytics.monthly
      );

      setAnalytics({
        monthly: mergedMonthly,
        yearly: {
          water: waterAnalytics.yearly,
          electricity: electricAnalytics.yearly
        }
      });

    } catch (err) {
      console.error("Error fetching analytics:", err);
    }
  };

  // useEffect(() => {
  //   fetchAllBills();
  // }, []);
  useEffect(() => {
    if (isFocused) {
      fetchAllBills();
    }
  }, [isFocused]);

  const filteredBills =
    activeTab === "all"
      ? recentBills
      : recentBills.filter((bill) => bill.type === activeTab);

  const totalAmount = Object.values(latestAmounts).reduce((sum, v) => sum + v, 0);
  const totalChange = Object.values(computedChanges).reduce((sum, v) => sum + parseFloat(v), 0);

  const dynamicUtilities = utilities.map(u => ({
    ...u,
    amount: latestAmounts[u.id] || realTotals[u.id] || 0,
    change: computedChanges[u.id] ?? u.change
  }));


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