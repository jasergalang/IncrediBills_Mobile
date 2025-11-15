import React, { useEffect, useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StatusBar, ActivityIndicator } from "react-native";
import DetailsHeader from "../../../components/bills/billDetails/waterBillDetails/DetailsHeader";
import BillInfoCard from "../../../components/bills/billDetails/waterBillDetails/BillsInfoCard";
import ScannedDataSection from "../../../components/bills/billDetails/waterBillDetails/ScannedDataSection";
import PredictionSection from "../../../components/bills/billDetails/waterBillDetails/PredictionSection";
import ComparisonChart from "../../../components/bills/billDetails/waterBillDetails/ComparisonChart";
import TipsSection from "../../../components/bills/billDetails/waterBillDetails/TipsSection";
import baseURL from "../../../assets/common/baseUrl";
import { useAuth } from "../../../context/auth";
export default function WaterBillDetails({ route, navigation }) {
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
      const res = await fetch(`${baseURL}/api/water-bill/uploaded/${id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      if (!res.ok) throw new Error("Failed to fetch bill");

      const data = await res.json();

      const formattedBill = {
        _id: data._id,
        name: data.billImage?.[0]?.url.split("/").pop() || "Water Bill",
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
