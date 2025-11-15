import React, { useEffect, useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StatusBar, ActivityIndicator } from "react-native";
import DetailsHeader from "../../../components/bills/billDetails/electricBillDetails/DetailsHeader.js";
import BillInfoCard from "../../../components/bills/billDetails/electricBillDetails/BillInfoCard.js";
import ScannedDataSection from "../../../components/bills/billDetails/electricBillDetails/ScannedDataSection.js";
import PredictionSection from "../../../components/bills/billDetails/electricBillDetails/PredictionSection.js";
import ComparisonChart from "../../../components/bills/billDetails/electricBillDetails/ComparisonChart.js";
import TipsSection from "../../../components/bills/billDetails/electricBillDetails/TipsSection.js";
import baseURL from "../../../assets/common/baseUrl.js";
import { useAuth } from "../../../context/auth.js";

export default function ElectricBillDetails({ route, navigation }) {
  const { id } = route.params;
  const [bill, setBill] = useState(null);
  const { token, getToken } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBillDetails();
  }, [id]);
  const fetchBillDetails = async () => {
    const userToken = token || (await getToken());
    try {
      const res = await fetch(`${baseURL}/api/electric-bill/uploaded/${id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      if (!res.ok) throw new Error("Failed to fetch bill");

      const data = await res.json();


      const formattedBill = {
        _id: data._id,
        name: data.billImage?.[0]?.url.split("/").pop() || "Electric Bill",
        scannedCost: data.cost,
        scannedConsumption: data.consumption,
        scannedDate: new Date(data.date).toLocaleDateString(),
        status: data.status,
        predictedCost: data.cost * 1.1,
        predictedConsumption: data.consumption * 1.1, 
      };

      setBill(formattedBill);
    } catch (err) {
      console.error("Error fetching bill:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#f59e0b" />
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
