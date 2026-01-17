import React, { useEffect } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StatusBar, ActivityIndicator, Text } from "react-native";import DetailsHeader from "../../../components/bills/billDetails/transportBillDetails/DetailsHeader.js";
import BillInfoCard from "../../../components/bills/billDetails/transportBillDetails/BillInfoCard.js";
import ScannedDataSection from "../../../components/bills/billDetails/transportBillDetails/ScannedDataSection";
import PredictionSection from "../../../components/bills/billDetails/transportBillDetails/PredictionSection";
import ComparisonChart from "../../../components/bills/billDetails/transportBillDetails/ComparisonChart";
import TipsSection from "../../../components/bills/billDetails/transportBillDetails/TipsSection";

import { fetchTransportBillDetails } from "../../../redux/slices/bills/transportSlice.js";
import { useDispatch, useSelector } from "react-redux";
export default function TransportBillDetails({ route, navigation }) {

  const { id } = route.params;
  const dispatch = useDispatch();

  const { selectedBill: bill, detailsLoading } = useSelector(
    (state) => state.transport
  );

  useEffect(() => {
    dispatch(fetchTransportBillDetails(id));
  }, [id]);

  if (detailsLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#f91616" />
      </SafeAreaView>
    );
  }

  if (!bill) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
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
