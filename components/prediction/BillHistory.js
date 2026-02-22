import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import BillHistoryModal from "./BillHistoryModal";

export default function BillHistory({ billsHistory = [], selectedCategory, selectedUtility }) {
  const [selectedBill, setSelectedBill] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);

  const predictions = useSelector((state) => state.predictions);
  const utilityId = selectedUtility?.id;
  const utilityPredictions = predictions?.[utilityId] || [];

  // Find the latest predicted cost for the utility
  const latestPrediction =
    utilityPredictions.length > 0
      ? [...utilityPredictions].sort(
          (a, b) => new Date(b.predictedDate) - new Date(a.predictedDate)
        )[0]?.predictedCost ?? 0
      : 0;

  const handleOpenModal = (bill) => {
    setSelectedBill(bill);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedBill(null);
  };

  const amountColor = selectedUtility
    ? `text-${selectedUtility.color}-600`
    : "text-slate-600";

  if (!selectedCategory) {
    return (
      <View className="bg-white rounded-2xl border border-slate-200 p-8 mb-6 items-center">
        <Text className="text-5xl mb-3">📊</Text>
        <Text className="text-lg font-bold text-slate-900 mb-2">Select a Utility</Text>
        <Text className="text-sm text-slate-600 text-center">
          Choose a category to view bill history.
        </Text>
      </View>
    );
  }

  if (!billsHistory.length) {
    return (
      <View className="bg-white rounded-2xl border border-slate-200 p-8 mb-6 items-center">
        <Text className="text-5xl mb-3">📋</Text>
        <Text className="text-lg font-bold text-slate-900 mb-2">No Bills History</Text>
        <Text className="text-sm text-slate-600 text-center">
          No historical bills found for {selectedCategory}.
        </Text>
      </View>
    );
  }

  return (
    <>
      <View className="bg-white rounded-2xl border border-slate-200 p-3 mb-6">
        {/* Header */}
        <View className="">
          <Text className="text-xl font-bold text-slate-900">Bills History</Text>
          <Text className="text-sm text-slate-500 mt-0.5">Past bills for {selectedCategory}</Text>
        </View>

        {/* Bills */}
        {billsHistory.map((bill, index) => {
          const isLast = index === billsHistory.length - 1;
          const amount = bill.cost ?? bill.amount ?? 0;

          return (
            <View
              key={bill.id ?? bill._id ?? index}
              style={{
                borderBottomWidth: isLast ? 0 : 1,
                borderBottomColor: "#E2E8F0",
                paddingVertical: 10,
              }}
            >
              {/* Row 1: Date + Status badge + three-dot */}
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-sm font-semibold text-slate-700">{bill.date}</Text>

                <View className="flex-row items-center gap-2">
                  <View
                    className={`px-3 py-1 rounded-full ${
                      bill.status === "Success" ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    <Text
                      className={`text-xs font-semibold ${
                        bill.status === "Success" ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      {bill.status === "Success" ? "✓ Paid" : "✗ Failed"}
                    </Text>
                  </View>

                  {/* Three-dot button */}
                  <TouchableOpacity
                    onPress={() => handleOpenModal(bill)}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      backgroundColor: "#F1F5F9",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 16, color: "#64748B", lineHeight: 18 }}>⋯</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Row 2: Amount + Provider */}
              <View className="flex-row items-center justify-between">
                <Text className={`text-lg font-bold ${amountColor}`}>
                  ₱{amount.toLocaleString()}
                </Text>
                <Text className="text-sm text-slate-500">{bill.provider ?? bill.store ?? "—"}</Text>
              </View>

              {/* Divider line accent */}
              {!isLast && (
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 1,
                    backgroundColor: "#E2E8F0",
                  }}
                />
              )}
            </View>
          );
        })}
      </View>

      <BillHistoryModal
        bill={selectedBill}
        visible={modalVisible}
        onClose={handleCloseModal}
        predictedCost={latestPrediction}
        selectedUtility={selectedUtility}
      />
    </>
  );
}