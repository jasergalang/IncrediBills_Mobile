import React from "react";
import { ScrollView, SafeAreaView, StatusBar } from "react-native";
import DetailsHeader from "../../../components/bills/billDetails/transportBillDetails/DetailsHeader.js";
import BillInfoCard from "../../../components/bills/billDetails/transportBillDetails/BillInfoCard.js";
import ScannedDataSection from "../../../components/bills/billDetails/transportBillDetails/ScannedDataSection";
import PredictionSection from "../../../components/bills/billDetails/transportBillDetails/PredictionSection";
import ComparisonChart from "../../../components/bills/billDetails/transportBillDetails/ComparisonChart";
import TipsSection from "../../../components/bills/billDetails/transportBillDetails/TipsSection";

export default function TransportBillDetails({ route, navigation }) {
  const { bill } = route.params || {
    bill: {
      id: 1,
      name: "October Fuel Receipt.jpg",
      date: "Oct 15, 2024",
      scannedCost: 1020.0,
      scannedLiters: 25.5,
      scannedDate: "Oct 15, 2024",
      predictedCost: 1150.0,
      predictedLiters: 28.2,
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
