import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import DetailsHeader from "../../../components/bills/billDetails/waterBillDetails/DetailsHeader";
import BillInfoCard from "../../../components/bills/billDetails/waterBillDetails/BillInfoCard";
import ScannedDataSection from "../../../components/bills/billDetails/waterBillDetails/ScannedDataSection";
import PredictionSection from "../../../components/bills/billDetails/waterBillDetails/PredictionSection";
import ComparisonChart from "../../../components/bills/billDetails/waterBillDetails/ComparisonChart";
import TipsSection from "../../../components/bills/billDetails/waterBillDetails/TipsSection";

import { fetchWaterBillDetails } from "../../../redux/slices/bills/waterSlice";

export default function WaterBillDetails({ route, navigation }) {
  const { id } = route.params;
  const dispatch = useDispatch();

  const { selectedBill: bill, detailsLoading } = useSelector(
    (state) => state.water
  );

  useEffect(() => {
    dispatch(fetchWaterBillDetails(id));
  }, [id]);

  if (detailsLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-slate-50">
        <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
        <ActivityIndicator size="large" color="#3b82f6" />
      </SafeAreaView>
    );
  }

  if (!bill) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-slate-50">
        <Text>Failed to load bill details.</Text>
      </SafeAreaView>
    );
  }

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
