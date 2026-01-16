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
import { fetchPredictions } from "../../redux/slices/prediction/predictionSlice";

export default function Prediction() {
  const [selectedUtility, setSelectedUtility] = useState(null);

  useEffect(() => {
    // Set Water as default
    const waterUtility = utilities.find(u => u.id === "water");
    setSelectedUtility(waterUtility);
  }, []);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { token } = useAuth();

  const { recentBills } = useSelector((state) => state.bills);

  useFocusEffect(
    React.useCallback(() => {
      if (token) {
        dispatch(fetchBills());
        dispatch(fetchPredictions()); // 🔥 FETCH PREDICTIONS
      }
    }, [dispatch, token])
  );


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

        <SummaryCards
          selectedUtility={selectedUtility} />
        <PredictionChart />

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
