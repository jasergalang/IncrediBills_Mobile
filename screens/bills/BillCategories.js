import React, { useState } from "react";
import { ScrollView, SafeAreaView, StatusBar } from "react-native";
import BillsHeader from "../../components/bills/BillsHeader";
import BillsTotalCard from "../../components/bills/BillsTotalCard";
import BillsUtilitiesGrid from "../../components/bills/BillsUtilitiesGrid";
import BillsTrendsChart from "../../components/bills/BillsTrendChart";
import BillsRecentSection from "../../components/bills/BillsRecentSection";
import { utilities, monthlyData, recentBills } from "../../constants/BillsData"; // Move your data to a constants file or keep here

export default function BillCategories({ navigation }) {
  const [activeTab, setActiveTab] = useState("all");
  const [timeRange, setTimeRange] = useState("month");

  const handleCategoryPress = (category) => {
    if (category.id === "water") {
      navigation.navigate("WaterBills", { category });
    } else if (category.id === "electricity") {
      navigation.navigate("ElectricBills", { category });
    } else if (category.id === "fuel") {
      navigation.navigate("TransportBills", { category });
    } else {
      navigation.navigate("BillCategories", { category });
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
