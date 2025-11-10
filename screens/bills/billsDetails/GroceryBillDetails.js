import React from "react";
import { ScrollView, SafeAreaView, StatusBar } from "react-native";
import DetailsHeader from "../../../components/bills/billDetails/groceryBillDetails/DetailsHeader";
import BillInfoCard from "../../../components/bills/billDetails/groceryBillDetails/BillInfoCard";
import ScannedDataSection from "../../../components/bills/billDetails/groceryBillDetails/ScannedDataSection";
import PredictionSection from "../../../components/bills/billDetails/groceryBillDetails/PredictionSection";
import ComparisonChart from "../../../components/bills/billDetails/groceryBillDetails/ComparisonChart";
import TipsSection from "../../../components/bills/billDetails/groceryBillDetails/TipsSection";

export default function GroceryBillDetails({ route, navigation }) {
  const { bill } = route.params || {
    bill: {
      id: 1,
      name: "October Grocery Receipt.png",
      date: "Oct 15, 2024",
      scannedCost: 3500.0,
      scannedItems: 45,
      scannedDate: "Oct 15, 2024",
      predictedCost: 3200.0,
      predictedItems: 42,
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