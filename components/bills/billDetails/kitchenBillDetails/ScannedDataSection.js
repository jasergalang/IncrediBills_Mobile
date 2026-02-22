import React from "react";
import { View, Text } from "react-native";

export default function ScannedDataSection({ bill }) {
  return (
    <View className="px-4 pb-4">
      <Text className="text-base font-bold text-slate-900 mb-3">
        Scanned Information
      </Text>

      <View className="bg-white rounded-2xl border border-slate-200 overflow-hidden">

        {/* Bill Amount */}
        <View className="flex-row items-center p-4 border-b border-slate-100">
          <View className="w-10 h-10 bg-orange-100 rounded-xl items-center justify-center mr-3">
            <Text style={{ fontSize: 20 }}>💰</Text>
          </View>
          <View className="flex-1">
            <Text className="text-xs text-slate-500 mb-1">Bill Amount</Text>
            <Text className="text-lg font-bold text-slate-900">
              ₱{bill.scannedCost?.toFixed(2) ?? "0.00"}
            </Text>
          </View>
        </View>

        {/* Cylinders */}
        <View className="flex-row items-center p-4 border-b border-slate-100">
          <View className="w-10 h-10 bg-orange-100 rounded-xl items-center justify-center mr-3">
            <Text style={{ fontSize: 20 }}>🔥</Text>
          </View>
          <View className="flex-1">
            <Text className="text-xs text-slate-500 mb-1">Cylinders</Text>
            <Text className="text-lg font-bold text-slate-900">
              {bill.scannedCylinders ?? "—"} × {bill.cylinderSize ?? "N/A"}
            </Text>
          </View>
        </View>

        {/* Cycle Days */}
        <View className="flex-row items-center p-4 border-b border-slate-100">
          <View className="w-10 h-10 bg-amber-100 rounded-xl items-center justify-center mr-3">
            <Text style={{ fontSize: 20 }}>🔄</Text>
          </View>
          <View className="flex-1">
            <Text className="text-xs text-slate-500 mb-1">Cycle Days</Text>
            <Text className="text-lg font-bold text-slate-900">
              {bill.scannedCycleDays ?? "—"} days
            </Text>
          </View>
        </View>

        {/* Provider */}
        <View className="flex-row items-center p-4 border-b border-slate-100">
          <View className="w-10 h-10 bg-orange-100 rounded-xl items-center justify-center mr-3">
            <Text style={{ fontSize: 20 }}>🏪</Text>
          </View>
          <View className="flex-1">
            <Text className="text-xs text-slate-500 mb-1">Provider</Text>
            <Text className="text-lg font-bold text-slate-900">
              {bill.provider ?? "N/A"}
            </Text>
          </View>
        </View>

        {/* Payment Status */}
        <View className="flex-row items-center p-4 border-b border-slate-100">
          <View className="w-10 h-10 bg-green-100 rounded-xl items-center justify-center mr-3">
            <Text style={{ fontSize: 20 }}>💳</Text>
          </View>
          <View className="flex-1">
            <Text className="text-xs text-slate-500 mb-1">Payment Status</Text>
            <View
              className={`self-start px-3 py-1 rounded-full ${
                bill.paymentStatus === "Paid"
                  ? "bg-green-100"
                  : bill.paymentStatus === "Pending"
                  ? "bg-yellow-100"
                  : "bg-red-100"
              }`}
            >
              <Text
                className={`text-sm font-bold ${
                  bill.paymentStatus === "Paid"
                    ? "text-green-700"
                    : bill.paymentStatus === "Pending"
                    ? "text-yellow-700"
                    : "text-red-700"
                }`}
              >
                {bill.paymentStatus ?? "N/A"}
              </Text>
            </View>
          </View>
        </View>

        {/* Billing Date */}
        <View className="flex-row items-center p-4">
          <View className="w-10 h-10 bg-orange-100 rounded-xl items-center justify-center mr-3">
            <Text style={{ fontSize: 20 }}>📅</Text>
          </View>
          <View className="flex-1">
            <Text className="text-xs text-slate-500 mb-1">Billing Date</Text>
            <Text className="text-lg font-bold text-slate-900">
              {bill.scannedDate ?? "N/A"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}