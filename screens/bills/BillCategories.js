import React, { useState, useEffect } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StatusBar } from "react-native";
import BillsHeader from "../../components/bills/billCategories/BillsHeader";
import BillsTotalCard from "../../components/bills/billCategories/BillsTotalCard";
import BillsUtilitiesGrid from "../../components/bills//billCategories/BillsUtilitiesGrid";
import BillsTrendsChart from "../../components/bills//billCategories/BillsTrendChart";
import BillsRecentSection from "../../components/bills//billCategories/BillsRecentSection";
import { utilities, monthlyData } from "../../constants/BillsData"; // Move your data to a constants file or keep here
import baseURL from "../../assets/common/baseUrl";
import { useAuth } from "../../context/auth";

export default function BillCategories({ navigation }) {
  const [activeTab, setActiveTab] = useState("all");
  const [timeRange, setTimeRange] = useState("month");

  const [recentBills, setRecentBills] = useState([]);
  const { token, getToken } = useAuth();
  const formatDate = (date) => {
    if (!date) return "Unknown Date";
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };
  useEffect(() => {
    fetchAllBills();
  }, []);

  const handleCategoryPress = (category) => {
    if (category.id === "water") {
      navigation.navigate("WaterBills", { category });
    } else if (category.id === "electricity") {
      navigation.navigate("ElectricBills", { category });
    } else if (category.id === "fuel") {
      navigation.navigate("TransportBills", { category });
    } else if (category.id === "gas") {
      navigation.navigate("KitchenGasBills", { category });
    } else if (category.id === "grocery") {
      navigation.navigate("GroceryBills", { category });
    } else {
      navigation.navigate("BillCategories", { category });
    }
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

      // Standardize for UI format
      const formattedElectric = electricData.bills.map(b => ({
        id: b._id,
        type: "electricity",
        name: "Electricity",
        icon: "⚡",
        provider: "Meralco",
        amount: b.cost || 0,
        dueDate: formatDate(b.date),
        status: b.status,
        color: "amber",
        createdAt: b.createdAt
      }));

      const formattedWater = waterData.bills.map(b => ({
        id: b._id,
        type: "water",
        name: "Water",
        icon: "💧",
        provider: "Manila Water",
        amount: b.cost || 0,
        dueDate: formatDate(b.date),
        status: b.status,
        color: "blue",
        createdAt: b.createdAt
      }));

      // Combine + Sort by createdAt desc
      const allBills = [...formattedElectric, ...formattedWater].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

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
