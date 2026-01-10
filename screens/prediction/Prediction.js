// ...existing code...
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, ScrollView, View } from "react-native";
import PredictionHeader from "../../components/prediction/PredictionHeader";
import UtilityPicker from "../../components/prediction/UtilityPicker";
import { utilities } from "../../constants/utilities";
import SummaryCards from "../../components/prediction/SummaryCards";
import PredictionChart from "../../components/prediction/PredictionChart";
import BillHistory from "../../components/prediction/BillHistory";
import ContributingFactors from "../../components/prediction/ContributingFactors";
// ...existing code...

export default function Prediction() {
  const [selectedUtility, setSelectedUtility] = useState(null);
  const summaryData = {
    totalBills: 3500,
    savings: 1200,
    predicted: 4000,
    accuracy: 92,
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <PredictionHeader />
      <ScrollView
        contentContainerStyle={{ paddingVertical: 16 }}
        className="px-4"
        showsVerticalScrollIndicator={false}
      >
        <UtilityPicker
          utilities={utilities}
          selectedUtility={selectedUtility}
          setSelectedUtility={setSelectedUtility}
        />
        <SummaryCards summaryData={summaryData} />
        <PredictionChart />
        <BillHistory />
        <ContributingFactors />
      </ScrollView>
    </SafeAreaView>
  );
}
// ...existing code...