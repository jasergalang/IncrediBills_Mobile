import React from "react";
import { View, Text, } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function GrocerySummaryCards({ category, groceryBills }) {
    const totalUploads = groceryBills?.bills?.length || 0;
    const processedCount = groceryBills?.bills?.filter(b => b.status === "Success").length || 0;
    const successRate = totalUploads > 0 ? Math.round((processedCount / totalUploads) * 100) : 0;

    // Get the latest bill by comparing dates
    const latestBill = groceryBills?.bills?.reduce((latest, bill) => {
        if (!latest) return bill;
        return new Date(bill.date) > new Date(latest.date) ? bill : latest;
    }, null) || {};

    const store = latestBill.store || "N/A";

    const cost = latestBill.cost || 0;

    // Format date as "Month Year"
    const billDateFormatted = latestBill.date
        ? new Date(latestBill.date).toLocaleString("en-US", { month: "long", year: "numeric" })
        : "N/A";

    return (
        <View className="p-4">
            <LinearGradient
                colors={["#bbf7d0", "#22c55e"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="rounded-2xl p-4"
            >

                <View className="flex-row items-center justify-between mb-4">
                    <View className="w-12 h-12 bg-green-500 rounded-xl items-center justify-center">
                        <Text className="text-2xl">🛒</Text>
                    </View>
                    <View className="bg-white px-3 py-1 rounded-full">
                        <Text className="text-xs font-semibold text-slate-600">This Month</Text>
                    </View>
                </View>

                <Text className="text-sm font-semibold text-slate-600 mb-1">{billDateFormatted}</Text>
                <Text className="text-3xl font-bold text-slate-900 mb-2">₱{cost}</Text>
                <Text className="text-xs text-green-600 font-semibold">
                    {successRate > 0 ? `↑ ${successRate}% success rate` : "No processed bills yet"}
                </Text>

            </LinearGradient>

            <View className="flex-row gap-3 mt-3">
                <View className="flex-1 bg-white rounded-xl p-4">
                    <Text className="text-xs font-semibold text-slate-600 mb-1">
                        Provider
                    </Text>
                    <Text className="text-base font-bold text-slate-900">
                        {store}
                    </Text>
                </View>
                <View className="flex-1 bg-white rounded-xl p-4">
                    <Text className="text-xs font-semibold text-slate-600 mb-1">
                        Last Purchase
                    </Text>
                    <Text className="text-base font-bold text-slate-900">{billDateFormatted}</Text>
                </View>
            </View>
        </View>
    );
}