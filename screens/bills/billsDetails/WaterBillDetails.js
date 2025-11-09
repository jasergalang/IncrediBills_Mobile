import React from "react";
import { ScrollView, SafeAreaView, StatusBar } from "react-native";
import DetailsHeader from "../../../components/bills/billDetails/waterBillDetails/DetailsHeader";
import BillInfoCard from "../../../components/bills/billDetails/waterBillDetails/BillsInfoCard";
import ScannedDataSection from "../../../components/bills/billDetails/waterBillDetails/ScannedDataSection";
import PredictionSection from "../../../components/bills/billDetails/waterBillDetails/PredictionSection";
import ComparisonChart from "../../../components/bills/billDetails/waterBillDetails/ComparisonChart";
import TipsSection from "../../../components/bills/billDetails/waterBillDetails/TipsSection";

export default function WaterBillDetails({ route, navigation }) {
  const { bill } = route.params || {
    bill: {
      id: 1,
      name: "October Water Bill.png",
      date: "Oct 15, 2024",
      scannedCost: 1250.0,
      scannedConsumption: 25.5,
      scannedDate: "Oct 15, 2024",
      predictedCost: 1340.0,
      predictedConsumption: 27.2,
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
