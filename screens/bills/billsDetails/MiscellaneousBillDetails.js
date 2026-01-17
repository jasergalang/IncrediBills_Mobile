import React, {useEffect} from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StatusBar, ActivityIndicator, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DetailsHeader from "../../../components/bills/billDetails/miscellaneousBillsDetails/DetailsHeader.js";
import BillInfoCard from "../../../components/bills/billDetails/miscellaneousBillsDetails/BillInfoCard.js";
import ScannedDataSection from "../../../components/bills/billDetails/miscellaneousBillsDetails/ScannedDataSection.js";
import PredictionSection from "../../../components/bills/billDetails/miscellaneousBillsDetails/PredictionSection.js";
import ComparisonChart from "../../../components/bills/billDetails/miscellaneousBillsDetails/ComparisonChart.js";
import TipsSection from "../../../components/bills/billDetails/miscellaneousBillsDetails/TipsSection.js";

import { fetchMiscellaneousBillDetails } from "../../../redux/slices/bills/miscellaneousSlice"
export default function MiscellaneousBillDetails({ route, navigation }) {
    const { id } = route.params;
    const dispatch = useDispatch();

    const { selectedBill: bill, detailsLoading } = useSelector(
        (state) => state.miscellaneous
    );

    useEffect(() => {
        dispatch(fetchMiscellaneousBillDetails(id));
    }, [id]);

    if (detailsLoading) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="#ad65e4" />
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