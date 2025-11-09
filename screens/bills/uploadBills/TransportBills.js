import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  RefreshControl,
} from "react-native";
import TransportHeader from "../../../components/bills/uploadBills/transportBills/TransportHeader.js";
import TransportSummaryCards from "../../../components/bills/uploadBills/transportBills/TransportSummaryCard.js";
import TransportBox from "../../../components/bills/uploadBills/transportBills/TransportBox.js";
import TransportActions from "../../../components/bills/uploadBills/transportBills/TransportActions.js";
import TransportRecent from "../../../components/bills/uploadBills/transportBills/TransportRecent.js";
import TransportTips from "../../../components/bills/uploadBills/transportBills/TransportTips.js";

export default function TransportBills({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [uploads, setUploads] = useState([
    {
      id: 1,
      name: "October Fuel Receipt.jpg",
      size: "2.1 MB",
      date: "Oct 15, 2024",
      status: "uploaded",
    },
    {
      id: 2,
      name: "September Gas Station.pdf",
      size: "1.8 MB",
      date: "Sep 20, 2024",
      status: "uploaded",
    },
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const removeUpload = (id) => {
    setUploads(uploads.filter((item) => item.id !== id));
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <TransportHeader navigation={navigation} />
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <TransportSummaryCards />
        <TransportBox navigation={navigation} />
        <TransportActions />
        <TransportRecent uploads={uploads} removeUpload={removeUpload} />
        <TransportTips />
      </ScrollView>
    </SafeAreaView>
  );
}
