import React from "react";
import { ScrollView, SafeAreaView, StatusBar } from "react-native";
import DetailsHeader from "../../../components/bills/billDetails/electricBillDetails/DetailsHeader.js";
import BillInfoCard from "../../../components/bills/billDetails/electricBillDetails/BillInfoCard.js";
import ScannedDataSection from "../../../components/bills/billDetails/electricBillDetails/ScannedDataSection.js";
import PredictionSection from "../../../components/bills/billDetails/electricBillDetails/PredictionSection.js";
import ComparisonChart from "../../../components/bills/billDetails/electricBillDetails/ComparisonChart.js";
import TipsSection from "../../../components/bills/billDetails/electricBillDetails/TipsSection.js";

export default function ElectricBillDetails({ route, navigation }) {
  const { bill } = route.params || {
    bill: {
      id: 1,
      name: "October Electric Bill.png",
      date: "Oct 12, 2024",
      scannedCost: 2850.0,
      scannedConsumption: 285,
      scannedDate: "Oct 12, 2024",
      predictedCost: 3120.0,
      predictedConsumption: 312,
      status: "uploaded",
    },
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      <DetailsHeader navigation={navigation} billName={bill.name} />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <BillInfoCard bill={bill} />
        <ScannedDataSection bill={bill} />
        <PredictionSection bill={bill} />
        <ComparisonChart bill={bill} />
        <TipsSection />
      </ScrollView>
    </SafeAreaView>
  );
}
