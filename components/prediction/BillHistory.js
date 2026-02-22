import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import BillHistoryModal from "./BillHistoryModal";

const BILLS_PER_PAGE = 5;

export default function BillHistory({ billsHistory = [], selectedCategory, selectedUtility }) {
  const [selectedBill, setSelectedBill] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);

  const predictions = useSelector((state) => state.predictions);
  const utilityId = selectedUtility?.id;
  const utilityPredictions = predictions?.[utilityId] || [];

  const latestPrediction =
    utilityPredictions.length > 0
      ? [...utilityPredictions].sort(
          (a, b) => new Date(b.predictedDate) - new Date(a.predictedDate)
        )[0]?.predictedCost ?? 0
      : 0;

  // Reset to page 1 when utility changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedUtility?.id]);

  const totalBills = billsHistory.length;
  const totalPages = Math.max(1, Math.ceil(totalBills / BILLS_PER_PAGE));

  const paginatedBills = billsHistory.slice(
    (currentPage - 1) * BILLS_PER_PAGE,
    currentPage * BILLS_PER_PAGE
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getPageNumbers = () => {
    if (totalPages <= 3) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage === 1) return [1, 2, 3];
    if (currentPage === totalPages) return [totalPages - 2, totalPages - 1, totalPages];
    return [currentPage - 1, currentPage, currentPage + 1];
  };

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
        <View className="mb-2">
          <Text className="text-xl font-bold text-slate-900">Bills History</Text>
          <Text className="text-sm text-slate-500 mt-0.5">Past bills for {selectedCategory}</Text>
        </View>

        {/* Bills */}
        {paginatedBills.map((bill, index) => {
          const isLast = index === paginatedBills.length - 1;
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
            </View>
          );
        })}

        {/* ── Stats Cards: Lowest & Highest ── */}
        {(() => {
          const amounts = billsHistory.map((b) => b.cost ?? b.amount ?? 0).filter((v) => v > 0);
          if (amounts.length === 0) return null;
          const lowestVal = Math.min(...amounts);
          const highestVal = Math.max(...amounts);
          const lowestBill = billsHistory.find((b) => (b.cost ?? b.amount ?? 0) === lowestVal);
          const highestBill = billsHistory.find((b) => (b.cost ?? b.amount ?? 0) === highestVal);
          return (
            <View className="flex-row gap-3 mt-3 mb-1">
              {/* Lowest */}
              <View className="flex-1 rounded-xl p-3" style={{ backgroundColor: "#f0fdf4" }}>
                <Text className="text-xs text-slate-500 font-medium mb-1">Lowest</Text>
                <Text className="text-lg font-bold" style={{ color: "#16a34a" }}>
                  ₱{lowestVal.toLocaleString()}
                </Text>
                <Text className="text-xs mt-0.5" style={{ color: "#86efac" }}>
                  {lowestBill?.date ?? "—"}
                </Text>
              </View>

              {/* Highest */}
              <View className="flex-1 rounded-xl p-3" style={{ backgroundColor: "#fff1f2" }}>
                <Text className="text-xs text-slate-500 font-medium mb-1">Highest</Text>
                <Text className="text-lg font-bold" style={{ color: "#dc2626" }}>
                  ₱{highestVal.toLocaleString()}
                </Text>
                <Text className="text-xs mt-0.5" style={{ color: "#fca5a5" }}>
                  {highestBill?.date ?? "—"}
                </Text>
              </View>
            </View>
          );
        })()}

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <View className="flex-row items-center justify-between mt-3 pt-3 border-t border-slate-100">
            <Text className="text-xs text-slate-500">
              Page <Text className="font-bold text-slate-700">{currentPage}</Text>{" "}
              of <Text className="font-bold text-slate-700">{totalPages}</Text>
              {"  •  "}
              <Text className="font-bold text-slate-700">{totalBills}</Text> total bills
            </Text>

            <View className="flex-row items-center gap-1">
              <TouchableOpacity
                onPress={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-8 h-8 rounded-lg items-center justify-center bg-slate-100"
              >
                <Text
                  className={`text-sm font-semibold ${
                    currentPage === 1 ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {"<"}
                </Text>
              </TouchableOpacity>

              {getPageNumbers().map((page) => (
                <TouchableOpacity
                  key={page}
                  onPress={() => goToPage(page)}
                  className={`w-8 h-8 rounded-lg items-center justify-center ${
                    currentPage === page ? "bg-blue-600" : "bg-slate-100"
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      currentPage === page ? "text-white" : "text-slate-600"
                    }`}
                  >
                    {page}
                  </Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                onPress={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-8 h-8 rounded-lg items-center justify-center bg-slate-100"
              >
                <Text
                  className={`text-sm font-semibold ${
                    currentPage === totalPages ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {">"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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