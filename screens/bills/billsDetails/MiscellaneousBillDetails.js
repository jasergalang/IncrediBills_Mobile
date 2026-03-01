import React, { useEffect } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StatusBar, ActivityIndicator, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DetailsHeader from "../../../components/bills/billDetails/miscellaneousBillsDetails/DetailsHeader.js";
import BillInfoCard from "../../../components/bills/billDetails/miscellaneousBillsDetails/BillInfoCard.js";
import ScannedDataSection from "../../../components/bills/billDetails/miscellaneousBillsDetails/ScannedDataSection.js";
import PredictionSection from "../../../components/bills/billDetails/miscellaneousBillsDetails/PredictionSection.js";
import ComparisonChart from "../../../components/bills/billDetails/miscellaneousBillsDetails/ComparisonChart.js";
import TipsSection from "../../../components/bills/billDetails/miscellaneousBillsDetails/TipsSection.js";

import { fetchMiscellaneousBillDetails, clearRecommendations } from "../../../redux/slices/bills/miscellaneousSlice"

export default function MiscellaneousBillDetails({ route, navigation }) {
    const { id } = route.params;
    const dispatch = useDispatch();

    const { selectedBill: bill, detailsLoading, recommendations } = useSelector(
        (state) => state.miscellaneous
    );

    useEffect(() => {
        dispatch(fetchMiscellaneousBillDetails(id));
        return () => {
            dispatch(clearRecommendations());
        };
    }, [id]);

    // ✅ Guard: still loading or hasn't started yet
    if (detailsLoading || (!bill)) {
        if (detailsLoading) {
            return (
                <SafeAreaView className="flex-1 items-center justify-center bg-slate-50">
                    <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
                    <ActivityIndicator size="large" color="#ad65e4" />
                </SafeAreaView>
            );
        }
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
                <TipsSection recommendations={recommendations} />
            </ScrollView>
        </SafeAreaView>
    );
}