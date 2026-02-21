// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, ScrollView } from "react-native";

// const BILLS_PER_PAGE = 5;

// export default function BillsRecentSection({
//   activeTab,
//   setActiveTab,
//   utilities,
//   recentBills,
//   filteredBills,
// }) {
//   const [currentPage, setCurrentPage] = useState(1);

//   // Reset to page 1 when tab changes
//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//     setCurrentPage(1);
//   };

//   const totalBills = filteredBills.length;
//   const totalPages = Math.max(1, Math.ceil(totalBills / BILLS_PER_PAGE));

//   const paginatedBills = filteredBills.slice(
//     (currentPage - 1) * BILLS_PER_PAGE,
//     currentPage * BILLS_PER_PAGE
//   );

//   const goToPage = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   // Generate page numbers to show (show up to 3 page buttons)
//   const getPageNumbers = () => {
//     if (totalPages <= 3) {
//       return Array.from({ length: totalPages }, (_, i) => i + 1);
//     }
//     if (currentPage === 1) return [1, 2, 3];
//     if (currentPage === totalPages) return [totalPages - 2, totalPages - 1, totalPages];
//     return [currentPage - 1, currentPage, currentPage + 1];
//   };

//   return (
//     <View className="bg-white rounded-2xl border border-slate-200 mx-4 p-4 mb-6">
//       {/* Header */}
//       <View className="flex-row items-center justify-between mb-4">
//         <View>
//           <Text className="text-lg font-bold text-slate-900 mb-1">
//             Recent Bills
//           </Text>
//           <Text className="text-xs text-slate-600">
//             View and manage your bills ({recentBills.length} total)
//           </Text>
//         </View>
//         <TouchableOpacity
//           style={{ backgroundColor: "#4F46E5" }}
//           className="flex-row items-center gap-2 px-4 py-3 rounded-xl"
//         >
//           <Text className="text-white font-semibold text-sm">+ Add New Bill</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Category Tabs */}
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         className="mb-4"
//       >
//         <View className="flex-row gap-2">
//           <TouchableOpacity
//             onPress={() => handleTabChange("all")}
//             className={`px-4 py-2 rounded-lg ${
//               activeTab === "all" ? "bg-blue-600" : "bg-slate-100"
//             }`}
//           >
//             <Text
//               className={`font-semibold text-sm ${
//                 activeTab === "all" ? "text-white" : "text-slate-600"
//               }`}
//             >
//               All Bills ({recentBills.length})
//             </Text>
//           </TouchableOpacity>
//           {utilities.map((util) => (
//             <TouchableOpacity
//               key={util.id}
//               onPress={() => handleTabChange(util.id)}
//               className={`px-4 py-2 rounded-lg ${
//                 activeTab === util.id ? "bg-blue-600" : "bg-slate-100"
//               }`}
//             >
//               <Text
//                 className={`font-semibold text-sm ${
//                   activeTab === util.id ? "text-white" : "text-slate-600"
//                 }`}
//               >
//                 {util.icon} {util.name}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </ScrollView>

//       {/* Bills List */}
//       <View className="space-y-3">
//         {paginatedBills.length === 0 ? (
//           <View className="py-8 items-center">
//             <Text className="text-slate-400 text-sm">No bills found.</Text>
//           </View>
//         ) : (
//           paginatedBills.map((bill) => (
//             <View
//               key={bill.id}
//               className={`bg-${bill.color}-50 rounded-xl p-4 border border-${bill.color}-100`}
//             >
//               <View className="flex-row items-center justify-between mb-3">
//                 <View className="flex-row items-center gap-3 flex-1">
//                   <View
//                     className={`w-12 h-12 bg-${bill.color}-100 rounded-xl items-center justify-center`}
//                   >
//                     <Text className="text-2xl">{bill.icon}</Text>
//                   </View>
//                   <View className="flex-1">
//                     <Text className="font-bold text-slate-900 text-sm mb-1">
//                       {bill.name} Bill
//                     </Text>
//                     <Text className="text-xs text-slate-600">
//                       {bill.provider}
//                     </Text>
//                   </View>
//                 </View>
//                 <TouchableOpacity>
//                   <Text className="text-slate-400 text-lg">⋯</Text>
//                 </TouchableOpacity>
//               </View>
//               <View className="flex-row items-center justify-between">
//                 <View>
//                   <Text className="text-xs text-slate-600 mb-1">Amount</Text>
//                   <Text className={`text-lg font-bold text-${bill.color}-600`}>
//                     ₱{bill.amount.toLocaleString()}
//                   </Text>
//                 </View>
//                 <View>
//                   <Text className="text-xs text-slate-600 mb-1">Due Date</Text>
//                   <Text className="text-sm font-semibold text-slate-900">
//                     {bill.date}
//                   </Text>
//                 </View>
//                 <View>
//                   <View
//                     className={`px-3 py-1 rounded-full ${
//                       bill.status === "Success" ? "bg-green-100" : "bg-red-100"
//                     }`}
//                   >
//                     <Text
//                       className={`text-xs font-semibold ${
//                         bill.status === "Success"
//                           ? "text-green-700"
//                           : "text-red-700"
//                       }`}
//                     >
//                       {bill.status === "Success" ? "✓ Paid" : "✗ Failed"}
//                     </Text>
//                   </View>
//                 </View>
//               </View>
//             </View>
//           ))
//         )}
//       </View>

//       {/* Pagination Footer */}
//       {totalPages > 0 && (
//         <View className="flex-row items-center justify-between mt-4 pt-3 border-t border-slate-100">
//           {/* Left: Page info */}
//           <Text className="text-xs text-slate-500">
//             Page <Text className="font-bold text-slate-700">{currentPage}</Text>{" "}
//             of <Text className="font-bold text-slate-700">{totalPages}</Text>
//             {"  •  "}
//             <Text className="font-bold text-slate-700">{totalBills}</Text> total bills
//           </Text>

//           {/* Right: Pagination controls */}
//           <View className="flex-row items-center gap-1">
//             {/* Prev */}
//             <TouchableOpacity
//               onPress={() => goToPage(currentPage - 1)}
//               disabled={currentPage === 1}
//               className="w-8 h-8 rounded-lg items-center justify-center bg-slate-100"
//             >
//               <Text
//                 className={`text-sm font-semibold ${
//                   currentPage === 1 ? "text-slate-300" : "text-slate-600"
//                 }`}
//               >
//                 {"<"}
//               </Text>
//             </TouchableOpacity>

//             {/* Page numbers */}
//             {getPageNumbers().map((page) => (
//               <TouchableOpacity
//                 key={page}
//                 onPress={() => goToPage(page)}
//                 className={`w-8 h-8 rounded-lg items-center justify-center ${
//                   currentPage === page ? "bg-blue-600" : "bg-slate-100"
//                 }`}
//               >
//                 <Text
//                   className={`text-xs font-semibold ${
//                     currentPage === page ? "text-white" : "text-slate-600"
//                   }`}
//                 >
//                   {page}
//                 </Text>
//               </TouchableOpacity>
//             ))}

//             {/* Next */}
//             <TouchableOpacity
//               onPress={() => goToPage(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               className="w-8 h-8 rounded-lg items-center justify-center bg-slate-100"
//             >
//               <Text
//                 className={`text-sm font-semibold ${
//                   currentPage === totalPages ? "text-slate-300" : "text-slate-600"
//                 }`}
//               >
//                 {">"}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}
//     </View>
//   );
// }

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";

const BILLS_PER_PAGE = 5;

function EditBillModal({ bill, visible, onClose, onSave }) {
  const [provider, setProvider] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Success");
  const [date, setDate] = useState("");
  const [feedback, setFeedback] = useState("");

  React.useEffect(() => {
    if (bill) {
      setProvider(bill.provider || "");
      setAmount(bill.amount?.toString() || "");
      setStatus(bill.status || "Success");
      setDate(bill.date || "");
      setFeedback("");
    }
  }, [bill]);

  if (!bill) return null;

  const handleSave = () => {
    onSave({ ...bill, provider, amount: parseFloat(amount) || 0, status, date, feedback });
    onClose();
  };

  const headerColors = {
    electricity: "#F59E0B",
    water: "#3B82F6",
    fuel: "#10B981",
    grocery: "#8B5CF6",
    kitchenGas: "#EF4444",
    miscellaneous: "#6B7280",
  };
  const headerColor = headerColors[bill.type] || "#4F46E5";

  const SummaryRow = ({ label, value, colored, statusVal }) => (
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 9, borderBottomWidth: 1, borderBottomColor: "#E2E8F0" }}>
      <Text style={{ fontSize: 12, color: "#64748B" }}>{label}</Text>
      {statusVal ? (
        <View style={{ backgroundColor: statusVal === "Success" ? "#DCFCE7" : "#FEE2E2", paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 }}>
          <Text style={{ fontSize: 11, fontWeight: "700", color: statusVal === "Success" ? "#16A34A" : "#DC2626" }}>
            {statusVal === "Success" ? "✓ Paid" : "✗ Failed"}
          </Text>
        </View>
      ) : (
        <Text style={{ fontSize: 12, fontWeight: "700", color: colored ? "#4F46E5" : "#1E293B" }}>{value}</Text>
      )}
    </View>
  );

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable
        style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.55)", justifyContent: "center", alignItems: "center", padding: 16 }}
        onPress={onClose}
      >
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ width: "100%", maxHeight: "92%" }}>
          <Pressable onPress={() => {}}>
            <View style={{ backgroundColor: "#fff", borderRadius: 18, overflow: "hidden", shadowColor: "#000", shadowOpacity: 0.25, shadowRadius: 20, elevation: 10 }}>

              {/* Header */}
              <View style={{ backgroundColor: headerColor, paddingHorizontal: 20, paddingVertical: 18, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
                  <View style={{ width: 46, height: 46, backgroundColor: "rgba(255,255,255,0.22)", borderRadius: 12, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: 24 }}>{bill.icon}</Text>
                  </View>
                  <View>
                    <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>Edit {bill.name} Bill</Text>
                    <Text style={{ color: "rgba(255,255,255,0.78)", fontSize: 12, marginTop: 2 }}>Update bill information</Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={onClose}
                  style={{ width: 34, height: 34, backgroundColor: "rgba(255,255,255,0.22)", borderRadius: 9, alignItems: "center", justifyContent: "center" }}
                >
                  <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* Body */}
              <ScrollView style={{ maxHeight: 500 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16 }}>
                <View style={{ flexDirection: "row", gap: 12 }}>

                  {/* Left: Form */}
                  <View style={{ flex: 1, gap: 12 }}>

                    {/* Basic Info */}
                    <View style={{ backgroundColor: "#F8FAFC", borderRadius: 13, padding: 14, borderWidth: 1, borderColor: "#E2E8F0" }}>
                      <View style={{ flexDirection: "row", alignItems: "center", gap: 7, marginBottom: 14 }}>
                        <Text style={{ fontSize: 15 }}>📋</Text>
                        <Text style={{ fontWeight: "bold", fontSize: 14, color: "#1E293B" }}>Basic Information</Text>
                      </View>

                      <Text style={{ fontSize: 11, color: "#64748B", marginBottom: 5 }}>Provider Name</Text>
                      <TextInput
                        value={provider}
                        onChangeText={setProvider}
                        style={{ backgroundColor: "#EAEEF4", borderRadius: 9, paddingHorizontal: 12, paddingVertical: 10, fontSize: 13, color: "#1E293B", marginBottom: 12 }}
                        placeholder="Provider name"
                        placeholderTextColor="#94A3B8"
                      />

                      <Text style={{ fontSize: 11, color: "#64748B", marginBottom: 5 }}>Amount (₱)</Text>
                      <View style={{ backgroundColor: "#EAEEF4", borderRadius: 9, flexDirection: "row", alignItems: "center", paddingHorizontal: 12, marginBottom: 12 }}>
                        <Text style={{ color: "#64748B", fontSize: 13, marginRight: 5 }}>₱</Text>
                        <TextInput
                          value={amount}
                          onChangeText={setAmount}
                          keyboardType="numeric"
                          style={{ flex: 1, paddingVertical: 10, fontSize: 13, color: "#1E293B" }}
                          placeholder="0.00"
                          placeholderTextColor="#94A3B8"
                        />
                      </View>

                      <Text style={{ fontSize: 11, color: "#64748B", marginBottom: 7 }}>Payment Status</Text>
                      <View style={{ flexDirection: "row", gap: 8 }}>
                        <TouchableOpacity
                          onPress={() => setStatus("Success")}
                          style={{
                            flex: 1, paddingVertical: 9, borderRadius: 9, alignItems: "center",
                            backgroundColor: status === "Success" ? "#DCFCE7" : "#EAEEF4",
                            borderWidth: 1.5,
                            borderColor: status === "Success" ? "#86EFAC" : "transparent",
                          }}
                        >
                          <Text style={{ fontSize: 12, fontWeight: "700", color: status === "Success" ? "#16A34A" : "#94A3B8" }}>✓ Paid</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => setStatus("Failed")}
                          style={{
                            flex: 1, paddingVertical: 9, borderRadius: 9, alignItems: "center",
                            backgroundColor: status === "Failed" ? "#FEE2E2" : "#EAEEF4",
                            borderWidth: 1.5,
                            borderColor: status === "Failed" ? "#FCA5A5" : "transparent",
                          }}
                        >
                          <Text style={{ fontSize: 12, fontWeight: "700", color: status === "Failed" ? "#DC2626" : "#94A3B8" }}>✗ Failed</Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* Date Info */}
                    <View style={{ backgroundColor: "#F8FAFC", borderRadius: 13, padding: 14, borderWidth: 1, borderColor: "#E2E8F0" }}>
                      <View style={{ flexDirection: "row", alignItems: "center", gap: 7, marginBottom: 14 }}>
                        <Text style={{ fontSize: 15 }}>📅</Text>
                        <Text style={{ fontWeight: "bold", fontSize: 14, color: "#1E293B" }}>Date Information</Text>
                      </View>
                      <Text style={{ fontSize: 11, color: "#64748B", marginBottom: 5 }}>Bill Date</Text>
                      <TextInput
                        value={date}
                        onChangeText={setDate}
                        style={{ backgroundColor: "#EAEEF4", borderRadius: 9, paddingHorizontal: 12, paddingVertical: 10, fontSize: 13, color: "#1E293B" }}
                        placeholder="MM/DD/YYYY"
                        placeholderTextColor="#94A3B8"
                      />
                    </View>
                  </View>

                  {/* Right: Summary + Feedback */}
                  <View style={{ flex: 1, gap: 12 }}>

                    {/* Bill Summary */}
                    <View style={{ backgroundColor: "#F8FAFC", borderRadius: 13, padding: 14, borderWidth: 1, borderColor: "#E2E8F0" }}>
                      <View style={{ flexDirection: "row", alignItems: "center", gap: 7, marginBottom: 6 }}>
                        <Text style={{ fontSize: 15 }}>📊</Text>
                        <Text style={{ fontWeight: "bold", fontSize: 14, color: "#1E293B" }}>Bill Summary</Text>
                      </View>
                      <SummaryRow label="Bill Type" value={`${bill.icon} ${bill.name} Bill`} />
                      <SummaryRow label="Provider" value={provider || bill.provider} />
                      <SummaryRow label="Amount" value={`₱${parseFloat(amount || 0).toLocaleString()}`} colored />
                      <SummaryRow label="Status" statusVal={status} />
                      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 9 }}>
                        <Text style={{ fontSize: 12, color: "#64748B" }}>Bill Date</Text>
                        <Text style={{ fontSize: 12, fontWeight: "700", color: "#1E293B" }}>{date || bill.date}</Text>
                      </View>
                    </View>

                    {/* Feedback */}
                    <View style={{ backgroundColor: "#F8FAFC", borderRadius: 13, padding: 14, borderWidth: 1, borderColor: "#E2E8F0" }}>
                      <View style={{ flexDirection: "row", alignItems: "center", gap: 7, marginBottom: 10 }}>
                        <Text style={{ fontSize: 15 }}>💬</Text>
                        <Text style={{ fontWeight: "bold", fontSize: 14, color: "#1E293B" }}>Feedback</Text>
                      </View>
                      <TextInput
                        value={feedback}
                        onChangeText={setFeedback}
                        multiline
                        numberOfLines={5}
                        textAlignVertical="top"
                        style={{ backgroundColor: "#EAEEF4", borderRadius: 9, paddingHorizontal: 12, paddingVertical: 10, fontSize: 13, color: "#1E293B", minHeight: 100 }}
                        placeholder="Add any feedback or observations..."
                        placeholderTextColor="#94A3B8"
                      />
                    </View>
                  </View>
                </View>
              </ScrollView>

              {/* Footer */}
              <View style={{ flexDirection: "row", gap: 10, padding: 16, borderTopWidth: 1, borderTopColor: "#E2E8F0" }}>
                <TouchableOpacity
                  onPress={onClose}
                  style={{ flex: 1, paddingVertical: 14, borderRadius: 11, alignItems: "center", backgroundColor: "#F1F5F9", borderWidth: 1, borderColor: "#E2E8F0" }}
                >
                  <Text style={{ fontWeight: "600", color: "#64748B", fontSize: 14 }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSave}
                  style={{ flex: 2, paddingVertical: 14, borderRadius: 11, alignItems: "center", backgroundColor: headerColor }}
                >
                  <Text style={{ fontWeight: "700", color: "#fff", fontSize: 14 }}>💾  Save Changes</Text>
                </TouchableOpacity>
              </View>

            </View>
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
}

export default function BillsRecentSection({
  activeTab,
  setActiveTab,
  utilities,
  recentBills,
  filteredBills,
}) {
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

  const handleSave = (updatedBill) => {
    // Dispatch update action here, e.g. dispatch(updateBill(updatedBill))
    console.log("Saved bill:", updatedBill);
    setModalVisible(false);
  };

  return (
    <View className="bg-white rounded-2xl border border-slate-200 mx-4 p-4 mb-6">

      <EditBillModal
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

      {/* Bills List — gap between cards */}
      <View style={{ gap: 12 }}>
        {paginatedBills.length === 0 ? (
          <View className="py-8 items-center">
            <Text className="text-slate-400 text-sm">No bills found.</Text>
          </View>
        ) : (
          paginatedBills.map((bill) => (
            <View
              key={bill.id}
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
                    ₱{bill.amount.toLocaleString()}
                  </Text>
                </View>
                <View>
                  <Text className="text-xs text-slate-600 mb-1">Due Date</Text>
                  <Text className="text-sm font-semibold text-slate-900">{bill.date}</Text>
                </View>
                <View>
                  <View className={`px-3 py-1 rounded-full ${bill.status === "Success" ? "bg-green-100" : "bg-red-100"}`}>
                    <Text className={`text-xs font-semibold ${bill.status === "Success" ? "text-green-700" : "text-red-700"}`}>
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
              <Text className={`text-sm font-semibold ${currentPage === 1 ? "text-slate-300" : "text-slate-600"}`}>{"<"}</Text>
            </TouchableOpacity>

            {getPageNumbers().map((page) => (
              <TouchableOpacity
                key={page}
                onPress={() => goToPage(page)}
                className={`w-8 h-8 rounded-lg items-center justify-center ${currentPage === page ? "bg-blue-600" : "bg-slate-100"}`}
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
              <Text className={`text-sm font-semibold ${currentPage === totalPages ? "text-slate-300" : "text-slate-600"}`}>{">"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}