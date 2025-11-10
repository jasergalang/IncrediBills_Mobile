import React from "react";
import { ScrollView, SafeAreaView, StatusBar } from "react-native";
import DetailsHeader from "../../../components/bills/billDetails/kitchenGasBillDetails/DetailsHeader.js";
import BillInfoCard from "../../../components/bills/billDetails/kitchenGasBillDetails/BillInfoCard.js";
import ScannedDataSection from "../../../components/bills/billDetails/kitchenGasBillDetails/ScannedDataSection.js";
import PredictionSection from "../../../components/bills/billDetails/kitchenGasBillDetails/PredictionSection.js";
import ComparisonChart from "../../../components/bills/billDetails/kitchenGasBillDetails/ComparisonChart.js";
import TipsSection from "../../../components/bills/billDetails/kitchenGasBillDetails/TipsSection.js";

export default function KitchenGasBillDetails({ route, navigation }) {
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