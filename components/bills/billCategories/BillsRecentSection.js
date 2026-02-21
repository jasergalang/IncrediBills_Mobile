import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import BillModal from "./BillModal";


import { updateElectricBill } from "../../../redux/slices/bills/electricSlice";
import { updateWaterBill } from "../../../redux/slices/bills/waterSlice";
import { updateGroceryBill } from "../../../redux/slices/bills/grocerySlice";
import { updateMiscellaneousBill } from "../../../redux/slices/bills/miscellaneousSlice";
import { updateTransportBill } from "../../../redux/slices/bills/transportSlice";
import { updateKitchenGasBill } from "../../../redux/slices/bills/kitchenGasSlice";

const BILLS_PER_PAGE = 5;

// Maps bill type → correct update thunk
const updateThunkMap = {
  electricity: updateElectricBill,
  water: updateWaterBill,
  grocery: updateGroceryBill,
  miscellaneous: updateMiscellaneousBill,
  fuel: updateTransportBill,
  kitchenGas: updateKitchenGasBill,
};

// Maps the modal's flat fields → the backend field names each slice expects
const buildUpdatedData = (type, fields) => {
  const {
    provider, amount, status, date,
    consumption, billingPeriod,
    store, category, quantity,
    purchaseType,
    stationLocation, liters,
    cylinders, cylinderSize, cycleDays,
    feedback,
  } = fields;

  switch (type) {
    case "electricity":
    case "water":
      return { provider, cost: parseFloat(amount) || 0, consumption, status, date, billingPeriod, feedback };
    case "grocery":
      return { cost: parseFloat(amount) || 0, category, store, quantity, paymentStatus: status, date, feedback };
    case "miscellaneous":
      return { cost: parseFloat(amount) || 0, category, purchaseType, paymentStatus: status, date, feedback };
    case "fuel":
      return { cost: parseFloat(amount) || 0, liters, provider, stationLocation, paymentStatus: status, status, feedback };
    case "kitchenGas":
      return { cost: parseFloat(amount) || 0, provider, cylinders, cylinderSize, cycleDays, paymentStatus: status, date, feedback };
    default:
      return { cost: parseFloat(amount) || 0, provider, status, date, feedback };
  }
};

export default function BillsRecentSection({
  activeTab,
  setActiveTab,
  utilities,
  recentBills,
  filteredBills,
  navigation,
  onAddBill,
}) {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBill, setSelectedBill] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);


  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const totalBills = filteredBills.length;
  const totalPages = Math.max(1, Math.ceil(totalBills / BILLS_PER_PAGE));

  const paginatedBills = filteredBills.slice(
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

  const handleDotsPress = (bill) => {
    setSelectedBill(bill);
    setModalVisible(true);
  };

  const handleSave = (updatedFields) => {
    const { type, _id } = updatedFields;
    const thunk = updateThunkMap[type];

    if (thunk && _id) {
      const updatedData = buildUpdatedData(type, updatedFields);
      dispatch(thunk({ billId: _id, updatedData }));
    } else {
      console.warn("No update thunk found for type:", type);
    }

    setModalVisible(false);
  };

  return (
    <View className="bg-white rounded-2xl border border-slate-200 mx-4 p-4 mb-6">

      <BillModal
        bill={selectedBill}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
      />

      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <View>
          <Text className="text-lg font-bold text-slate-900 mb-1">Recent Bills</Text>
          <Text className="text-xs text-slate-600">
            View and manage your bills ({recentBills.length} total)
          </Text>
        </View>
        <TouchableOpacity
          onPress={onAddBill}  
          style={{ backgroundColor: "#4F46E5" }}
          className="flex-row items-center gap-2 px-4 py-3 rounded-xl"
        >
          <Text className="text-white font-semibold text-sm">+ Add New Bill</Text>
        </TouchableOpacity>
      </View>

      {/* Category Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={() => handleTabChange("all")}
            className={`px-4 py-2 rounded-lg ${activeTab === "all" ? "bg-blue-600" : "bg-slate-100"}`}
          >
            <Text className={`font-semibold text-sm ${activeTab === "all" ? "text-white" : "text-slate-600"}`}>
              All Bills ({recentBills.length})
            </Text>
          </TouchableOpacity>
          {utilities.map((util) => (
            <TouchableOpacity
              key={util.id}
              onPress={() => handleTabChange(util.id)}
              className={`px-4 py-2 rounded-lg ${activeTab === util.id ? "bg-blue-600" : "bg-slate-100"}`}
            >
              <Text className={`font-semibold text-sm ${activeTab === util.id ? "text-white" : "text-slate-600"}`}>
                {util.icon} {util.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bills List */}
      <View style={{ gap: 12 }}>
        {paginatedBills.length === 0 ? (
          <View className="py-8 items-center">
            <Text className="text-slate-400 text-sm">No bills found.</Text>
          </View>
        ) : (
          paginatedBills.map((bill) => (
            <View
              key={bill._id || bill.id}
              className={`bg-${bill.color}-50 rounded-xl p-4 border border-${bill.color}-100`}
            >
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center gap-3 flex-1">
                  <View className={`w-12 h-12 bg-${bill.color}-100 rounded-xl items-center justify-center`}>
                    <Text className="text-2xl">{bill.icon}</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="font-bold text-slate-900 text-sm mb-1">{bill.name} Bill</Text>
                    <Text className="text-xs text-slate-600">{bill.provider}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => handleDotsPress(bill)}
                  style={{ padding: 6, borderRadius: 8 }}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Text style={{ fontSize: 20, color: "#94A3B8", letterSpacing: 2 }}>⋯</Text>
                </TouchableOpacity>
              </View>
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-xs text-slate-600 mb-1">Amount</Text>
                  <Text className={`text-lg font-bold text-${bill.color}-600`}>
                    ₱{(bill.amount ?? bill.cost ?? 0).toLocaleString()}
                  </Text>
                </View>
                <View>
                  <Text className="text-xs text-slate-600 mb-1">Date</Text>
                  <Text className="text-sm font-semibold text-slate-900">{bill.date}</Text>
                </View>
                <View>
                  <View
                    className={`px-3 py-1 rounded-full ${bill.status === "Success" ? "bg-green-100" : "bg-red-100"
                      }`}
                  >
                    <Text
                      className={`text-xs font-semibold ${bill.status === "Success" ? "text-green-700" : "text-red-700"
                        }`}
                    >
                      {bill.status === "Success" ? "✓ Paid" : "✗ Failed"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))
        )}
      </View>

      {/* Pagination Footer */}
      {totalPages > 0 && (
        <View className="flex-row items-center justify-between mt-4 pt-3 border-t border-slate-100">
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
              <Text className={`text-sm font-semibold ${currentPage === 1 ? "text-slate-300" : "text-slate-600"}`}>
                {"<"}
              </Text>
            </TouchableOpacity>

            {getPageNumbers().map((page) => (
              <TouchableOpacity
                key={page}
                onPress={() => goToPage(page)}
                className={`w-8 h-8 rounded-lg items-center justify-center ${currentPage === page ? "bg-blue-600" : "bg-slate-100"
                  }`}
              >
                <Text className={`text-xs font-semibold ${currentPage === page ? "text-white" : "text-slate-600"}`}>
                  {page}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              onPress={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-8 h-8 rounded-lg items-center justify-center bg-slate-100"
            >
              <Text className={`text-sm font-semibold ${currentPage === totalPages ? "text-slate-300" : "text-slate-600"}`}>
                {">"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}