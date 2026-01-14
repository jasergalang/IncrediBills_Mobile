import React from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StatusBar } from "react-native";
import DetailsHeader from "../../../components/bills/billDetails/miscellaneousBillsDetails/DetailsHeader.js";
import BillInfoCard from "../../../components/bills/billDetails/miscellaneousBillsDetails/BillInfoCard.js";
import ScannedDataSection from "../../../components/bills/billDetails/miscellaneousBillsDetails/ScannedDataSection.js";
import PredictionSection from "../../../components/bills/billDetails/miscellaneousBillsDetails/PredictionSection.js";
import ComparisonChart from "../../../components/bills/billDetails/miscellaneousBillsDetails/ComparisonChart.js";
import TipsSection from "../../../components/bills/billDetails/miscellaneousBillsDetails/TipsSection.js";

export default function MiscellaneousBillDetails({ route, navigation }) {
    const { bill } = route.params || {
        bill: {
            id: 1,
            name: "October Gas Receipt.jpg",
            date: "Oct 15, 2024",
            scannedCost: 550.0,
            scannedKg: 11.0,
            scannedDate: "Oct 15, 2024",
            predictedCost: 580.0,
            predictedKg: 11.5,
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