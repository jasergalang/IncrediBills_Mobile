import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StatusBar, ActivityIndicator, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import DetailsHeader from "../../../components/bills/billDetails/kitchenBillDetails/DetailsHeader";
import BillInfoCard from "../../../components/bills/billDetails/kitchenBillDetails/BillInfoCard";

import { fetchKitchenGasBillDetails } from "../../../redux/slices/bills/kitchenGasSlice";

export default function KitchenGasBillDetails({ route, navigation }) {
  const { id } = route.params;
  const dispatch = useDispatch();

    const { selectedBill: bill, detailsLoading } = useSelector(
        (state) => state.kitchenGasSlice
    );

    useEffect(() => {
        dispatch(fetchKitchenGasBillDetails(id));
    }, [id]);

    if (detailsLoading) {
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
            </ScrollView>
        </SafeAreaView>
    );
}