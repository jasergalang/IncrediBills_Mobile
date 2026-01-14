import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import PredictionHeader from "../../components/prediction/PredictionHeader";
import UtilityPicker from "../../components/prediction/UtilityPicker";
import SummaryCards from "../../components/prediction/SummaryCards";
import PredictionChart from "../../components/prediction/PredictionChart";
import BillHistory from "../../components/prediction/BillHistory";
import ContributingFactors from "../../components/prediction/ContributingFactors";
import AIAction from "../../components/prediction/AIAction";

import { utilities } from "../../constants/utilities";
import { fetchBills } from "../../redux/slices/bills/billSlice";
import { useAuth } from "../../context/auth";

export default function Prediction() {
  const [selectedUtility, setSelectedUtility] = useState(null);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { token } = useAuth();

  // 🔥 SAME SOURCE AS BillCategories
  const { recentBills } = useSelector((state) => state.bills);
  const summaryData = {
    totalBills: 3500,
    savings: 1200,
    predicted: 4000,
    accuracy: 92,
  };
  useFocusEffect(
    React.useCallback(() => {
      if (token) {
        dispatch(fetchBills());
      }
    }, [dispatch, token])
  );

  // 🔥 SAME FILTER LOGIC
  const filteredBills = selectedUtility
    ? recentBills?.filter(
      (bill) => bill.type === selectedUtility.id
    )
    : [];

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <PredictionHeader navigation={navigation} />

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

        {/* 🔥 REAL DATA */}
        <BillHistory
          billsHistory={filteredBills}
          selectedCategory={selectedUtility?.name}
        />

        <ContributingFactors />
        <AIAction />
      </ScrollView>
    </SafeAreaView>
  );
}
