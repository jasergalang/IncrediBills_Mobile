import React, { useMemo } from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function MiscellaneousSummaryCards({ miscellaneousBills }) {
  const totalUploads = miscellaneousBills?.bills?.length || 0;
  const processedCount = miscellaneousBills?.bills?.filter(b => b.status === "Success").length || 0;
  const successRate = totalUploads > 0 ? Math.round((processedCount / totalUploads) * 100) : 0;

  // Get the latest bill by comparing dates
  const latestBill = miscellaneousBills?.bills?.reduce((latest, bill) => {
    if (!latest) return bill;
    return new Date(bill.date) > new Date(latest.date) ? bill : latest;
  }, null) || {};

  const purchaseType = latestBill.purchaseType || "N/A";

  // Calculate total cost for the latest month with bills
  const currentMonthData = useMemo(() => {
    if (!miscellaneousBills?.bills || miscellaneousBills.bills.length === 0) {
      return {
        totalCost: 0,
        billCount: 0,
        month: null,
        year: null
      };
    }

    // Find the latest bill to determine which month to show
    const latestBillDate = miscellaneousBills.bills.reduce((latest, bill) => {
      const billDate = new Date(bill.date);
      return !latest || billDate > latest ? billDate : latest;
    }, null);

    const targetMonth = latestBillDate.getMonth();
    const targetYear = latestBillDate.getFullYear();

    // Filter bills for the latest month and calculate total
    const monthBills = miscellaneousBills.bills.filter(bill => {
      const billDate = new Date(bill.date);
      return billDate.getMonth() === targetMonth && 
             billDate.getFullYear() === targetYear;
    });

    const totalCost = monthBills.reduce((sum, bill) => {
      return sum + (bill.cost || 0);
    }, 0);

    return {
      totalCost,
      billCount: monthBills.length,
      month: targetMonth,
      year: targetYear
    };
  }, [miscellaneousBills?.bills]);

  // Format date as "Month Year" - use the latest bill's month
  const billDateFormatted = currentMonthData.month !== null
    ? new Date(currentMonthData.year, currentMonthData.month).toLocaleString("en-US", { 
        month: "long", 
        year: "numeric" 
      })
    : "N/A";

  // Format last purchase date
  const lastPurchaseDate = latestBill.date
    ? new Date(latestBill.date).toLocaleString("en-US", { 
        month: "short", 
        day: "numeric",
        year: "numeric" 
      })
    : "N/A";

  return (
    <View className="p-4">
      <LinearGradient
        colors={["#ceace5", "#ad65e4"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-2xl p-6 mb-3"
      >
        <View className="flex-row items-center justify-between mb-4">
          <View className="w-12 h-12 bg-purple-500 rounded-xl items-center justify-center">
            <Text className="text-2xl">📦</Text>
          </View>
          <View className="bg-white px-3 py-1 rounded-full">
            <Text className="text-xs font-semibold text-slate-600">
              {currentMonthData.billCount} {currentMonthData.billCount === 1 ? 'bill' : 'bills'} this month
            </Text>
          </View>
        </View>

        <Text className="text-sm font-semibold text-slate-600 mb-1">{billDateFormatted}</Text>
        <Text className="text-3xl font-bold text-slate-900 mb-2">
          ₱{currentMonthData.totalCost.toFixed(2)}
        </Text>
        <Text className="text-xs text-green-600 font-semibold">
          {successRate > 0 ? `↑ ${successRate}% success rate` : "No processed bills yet"}
        </Text>
      </LinearGradient>

      <View className="flex-row gap-3 mt-3">
        <View className="flex-1 bg-white rounded-xl p-4">
          <Text className="text-xs font-semibold text-slate-600 mb-1">Latest Type</Text>
          <Text className="text-base font-bold text-slate-900">{purchaseType}</Text>
        </View>
        <View className="flex-1 bg-white rounded-xl p-4">
          <Text className="text-xs font-semibold text-slate-600 mb-1">Last Purchase</Text>
          <Text className="text-base font-bold text-slate-900">{lastPurchaseDate}</Text>
        </View>
      </View>
    </View>
  );
}