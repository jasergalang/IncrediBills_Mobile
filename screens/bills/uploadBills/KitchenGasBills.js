import React, { useState } from "react";
import {
    View,
    SafeAreaView,
    StatusBar,
    ScrollView,
    RefreshControl,
} from "react-native";
import KitchenGasHeader from "../../../components/bills/uploadBills/kitchenGasBills/KitchenGasHeader";
import KitchenGasSummaryCards from "../../../components/bills/uploadBills/kitchenGasBills/KitchenGasSummaryCards";
import KitchenGasBox from "../../../components/bills/uploadBills/kitchenGasBills/KitchenGasBox.js";
import KitchenGasActions from "../../../components/bills/uploadBills/kitchenGasBills/KitchenGasActions.js";
import KitchenGasRecent from "../../../components/bills/uploadBills/kitchenGasBills/KitchenGasRecent.js";
import KitchenGasTips from "../../../components/bills/uploadBills/kitchenGasBills/KitchenGasTips.js";

export default function KitchenGasBills({ navigation }) {
    const [refreshing, setRefreshing] = useState(false);
    const [uploads, setUploads] = useState([
        {
            id: 1,
            name: "October Gas Receipt.jpg",
            size: "1.9 MB",
            date: "Oct 15, 2024",
            status: "uploaded",
        },
        {
            id: 2,
            name: "September Petron Bill.pdf",
            size: "1.5 MB",
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
            <KitchenGasHeader navigation={navigation} />
            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <KitchenGasSummaryCards />
                <KitchenGasBox navigation={navigation} />
                <KitchenGasActions />
                <KitchenGasRecent uploads={uploads} removeUpload={removeUpload} />
                <KitchenGasTips />
            </ScrollView>
        </SafeAreaView>
    );
}