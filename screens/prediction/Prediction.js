import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import PredictionHeader from "../../components/prediction/PredictionHeader";
import UtilityPicker from "../../components/prediction/UtilityPicker";
import SummaryCards from "../../components/prediction/SummaryCards";
import PredictionChart from "../../components/prediction/PredictionChart";
import BillHistory from "../../components/prediction/BillHistory";
import AlertModal from "../../components/prediction/AlertModal";
import NotificationPanel from "../../components/prediction/NotificationPanel";

import { utilities } from "../../constants/utilities";
import { fetchBills } from "../../redux/slices/bills/billSlice";
import { useAuth } from "../../context/auth";
import { fetchPredictions, selectPredictionsData } from "../../redux/slices/prediction/predictionSlice";
import { useExpoNotifications } from "../../hooks/prediction/useExpoNotif";

const defaultUtility = utilities.find((u) => u.id === "water") || utilities[0];

export default function Prediction() {
  const [selectedUtility, setSelectedUtility] = React.useState(defaultUtility);
  const [showAlertModal, setShowAlertModal] = React.useState(false);
  const [showNotifPanel, setShowNotifPanel] = React.useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { token } = useAuth();

  const {
    expoPushToken,
    permissionStatus,
    unreadCount,
    markAllRead,
    fetchUnreadCount,
  } = useExpoNotifications(token);

  const { recentBills } = useSelector((state) => state.bills);

  // Memoized selector — no more Redux warning
  const predictions = useSelector(selectPredictionsData);
  const predictedAmount = predictions[selectedUtility?.id]?.predictedCost || null;

  useFocusEffect(
    React.useCallback(() => {
      if (token) {
        dispatch(fetchBills());
        dispatch(fetchPredictions());
        fetchUnreadCount();
      }
    }, [dispatch, token])
  );

  const filteredBills = selectedUtility
    ? recentBills?.filter((bill) => bill.type === selectedUtility.id)
    : [];

  // Bell → open notification history panel
  const handleBellPress = () => {
    setShowNotifPanel(true);
  };

  // Set Alert → open alert modal
  const handleSetAlert = () => {
    setShowAlertModal(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      <PredictionHeader
        navigation={navigation}
        unreadCount={unreadCount}
        onBellPress={handleBellPress}
        onSetAlert={handleSetAlert}
      />

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
        <SummaryCards selectedUtility={selectedUtility} />
        <PredictionChart selectedUtility={selectedUtility} bills={filteredBills} />
        <BillHistory
          billsHistory={filteredBills}
          selectedCategory={selectedUtility?.name}
          selectedUtility={selectedUtility}
        />
      </ScrollView>

      {/* Alert threshold setter */}
      <AlertModal
        visible={showAlertModal}
        onClose={() => setShowAlertModal(false)}
        selectedUtility={selectedUtility}
        predictedAmount={predictedAmount}
        expoPushToken={expoPushToken}
        permissionStatus={permissionStatus}
      />

      {/* Notification history panel — opens when bell is tapped */}
      <NotificationPanel
        visible={showNotifPanel}
        onClose={() => setShowNotifPanel(false)}
        authToken={token}
        onMarkAllRead={markAllRead} // syncs badge in parent
      />
    </SafeAreaView>
  );
}