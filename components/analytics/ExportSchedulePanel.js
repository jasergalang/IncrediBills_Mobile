// import React from "react";
// import { View, Text } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";

// export default function TipsSection({ type }) {
//   return (
//     <View className="px-4 pb-6">
//       <LinearGradient
//         colors={
//           type === "utility" ? ["#fef3c7", "#fde68a"] : ["#ede9fe", "#c7d2fe"]
//         }
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         className="rounded-2xl p-5 border-2 border-amber-200"
//       >
//         <View className="flex-row items-center gap-3 mb-3">
//           <View
//             className={`w-10 h-10 ${type === "utility" ? "bg-amber-500" : "bg-purple-500"} rounded-xl items-center justify-center`}
//           >
//             <Ionicons name="bulb" size={20} color="#fff" />
//           </View>
//           <Text
//             className={`text-base font-bold ${type === "utility" ? "text-amber-900" : "text-purple-900"}`}
//           >
//             {type === "utility" ? "Saving Tips" : "Game Tips"}
//           </Text>
//         </View>
//         {type === "utility" ? (
//           <>
//             <Text className="text-sm text-amber-800 mb-2">
//               • Switch to LED bulbs to save up to 75% on lighting costs
//             </Text>
//             <Text className="text-sm text-amber-800">
//               • Fix leaking faucets to save up to 10% on water bills
//             </Text>
//           </>
//         ) : (
//           <>
//             <Text className="text-sm text-purple-800 mb-2">
//               • Play daily to earn streak bonuses
//             </Text>
//             <Text className="text-sm text-purple-800">
//               • Complete challenges for extra points
//             </Text>
//           </>
//         )}
//       </LinearGradient>
//     </View>
//   );
// // }
// import React, { useState } from "react";
// import { View, Text, Pressable, Modal, Alert } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";

// export default function ExportSchedulePanel({
//   profile,
//   kpiData,
//   timeSeriesData,
//   categoryBreakdown,
//   dateRange,
//   selectedCategories,
//   totalAmount,
// }) {
//   const [showExportMenu, setShowExportMenu] = useState(false);
//   const [isExporting, setIsExporting] = useState(false);

//   const handleExportPDF = async () => {
//     setIsExporting(true);
//     try {
//       // Simulate export delay
//       await new Promise((resolve) => setTimeout(resolve, 1500));
      
//       const analyticsData = {
//         kpiData,
//         timeSeriesData,
//         categoryBreakdown,
//         dateRange,
//         selectedCategories,
//         totalAmount,
//       };

//       const userName = profile?.firstName && profile?.lastName
//         ? `${profile.firstName} ${profile.lastName}`
//         : profile?.name || "User";

//       // TODO: Implement actual PDF export logic
//       console.log("Exporting PDF for:", userName, analyticsData);
      
//       setShowExportMenu(false);
//       Alert.alert("✅ Success", "PDF report has been downloaded successfully!");
//     } catch (error) {
//       console.error("Error exporting PDF:", error);
//       Alert.alert("❌ Error", "Failed to export PDF. Please try again.");
//     } finally {
//       setIsExporting(false);
//     }
//   };

//   const handleExportExcel = async () => {
//     setIsExporting(true);
//     try {
//       // Simulate export delay
//       await new Promise((resolve) => setTimeout(resolve, 1500));
      
//       const userName = profile?.firstName && profile?.lastName
//         ? `${profile.firstName} ${profile.lastName}`
//         : profile?.name || "User";

//       // TODO: Implement actual Excel export logic
//       console.log("Exporting Excel for:", userName);
      
//       setShowExportMenu(false);
//       Alert.alert("✅ Success", "Excel report has been downloaded successfully!");
//     } catch (error) {
//       console.error("Error exporting Excel:", error);
//       Alert.alert("❌ Error", "Failed to export Excel. Please try again.");
//     } finally {
//       setIsExporting(false);
//     }
//   };

//   const handleEmailReport = () => {
//     setShowExportMenu(false);
//     Alert.alert("📧 Email Report", "This feature will be available soon!");
//   };

//   const handleScheduleReport = () => {
//     setShowExportMenu(false);
//     Alert.alert("⏰ Schedule Report", "Automated delivery coming soon!");
//   };

//   return (
//     <View className="px-4 pb-6">
//       <LinearGradient
//         colors={["#9333ea", "#ec4899"]}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         className="rounded-2xl p-6"
//       >
//         {/* Header */}
//         <View className="items-center mb-4">
//           <Text className="text-2xl font-bold text-white text-center mb-2">
//             Schedule Automated Reports
//           </Text>
//           <Text className="text-white/90 text-center text-sm">
//             Get detailed analytics reports delivered to your inbox weekly or monthly
//           </Text>
//         </View>

//         {/* Action Buttons */}
//         <View className="gap-3 mb-4">
//           <Pressable
//             className="bg-white rounded-xl py-3 px-4 active:opacity-80"
//             onPress={() => Alert.alert("📅 Weekly Reports", "Feature coming soon!")}
//           >
//             <Text className="text-purple-600 font-semibold text-center">
//               📅 Weekly Reports
//             </Text>
//           </Pressable>

//           <View className="flex-row gap-3">
//             <Pressable
//               className="flex-1 bg-white/20 backdrop-blur rounded-xl py-3 px-4 active:opacity-80"
//               onPress={() => Alert.alert("📊 Monthly Summary", "Feature coming soon!")}
//             >
//               <Text className="text-white font-semibold text-center text-sm">
//                 📊 Monthly Summary
//               </Text>
//             </Pressable>

//             <Pressable
//               className="flex-1 bg-white/20 backdrop-blur rounded-xl py-3 px-4 active:opacity-80"
//               onPress={() => Alert.alert("⚙️ Custom Schedule", "Feature coming soon!")}
//             >
//               <Text className="text-white font-semibold text-center text-sm">
//                 ⚙️ Custom Schedule
//               </Text>
//             </Pressable>
//           </View>
//         </View>

//         {/* Export Options Button */}
//         <Pressable
//           onPress={() => setShowExportMenu(true)}
//           disabled={isExporting}
//           className={`bg-white/20 backdrop-blur rounded-xl py-3 px-4 active:opacity-80 ${
//             isExporting ? "opacity-50" : ""
//           }`}
//         >
//           <Text className="text-white font-semibold text-center">
//             {isExporting ? "⏳ Exporting..." : "📥 Export Options"}
//           </Text>
//         </Pressable>

//         {/* User Info */}
//         {profile && (
//           <Text className="text-white/70 text-xs text-center mt-4">
//             Reports will be personalized for {profile.firstName} {profile.lastName}
//           </Text>
//         )}
//       </LinearGradient>

//       {/* Export Options Modal */}
//       <Modal
//         visible={showExportMenu}
//         transparent
//         animationType="fade"
//         onRequestClose={() => setShowExportMenu(false)}
//       >
//         <Pressable
//           className="flex-1 bg-black/50 justify-center items-center px-4"
//           onPress={() => setShowExportMenu(false)}
//         >
//           <Pressable
//             className="bg-white rounded-2xl w-full max-w-sm overflow-hidden"
//             onPress={(e) => e.stopPropagation()}
//           >
//             {/* Modal Header */}
//             <View className="bg-purple-50 px-4 py-3 border-b border-slate-200">
//               <Text className="text-lg font-bold text-slate-800 text-center">
//                 Export Options
//               </Text>
//             </View>

//             {/* Export PDF */}
//             <Pressable
//               onPress={handleExportPDF}
//               disabled={isExporting}
//               className="flex-row items-center px-4 py-4 active:bg-slate-50"
//             >
//               <View className="w-10 h-10 bg-red-100 rounded-xl items-center justify-center mr-3">
//                 <Text className="text-xl">📄</Text>
//               </View>
//               <View className="flex-1">
//                 <Text className="font-semibold text-slate-700">Export as PDF</Text>
//                 <Text className="text-xs text-slate-500">Complete analytics report</Text>
//               </View>
//               <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
//             </Pressable>

//             {/* Divider */}
//             <View className="h-px bg-slate-100" />

//             {/* Export Excel */}
//             <Pressable
//               onPress={handleExportExcel}
//               disabled={isExporting}
//               className="flex-row items-center px-4 py-4 active:bg-slate-50"
//             >
//               <View className="w-10 h-10 bg-green-100 rounded-xl items-center justify-center mr-3">
//                 <Text className="text-xl">📊</Text>
//               </View>
//               <View className="flex-1">
//                 <Text className="font-semibold text-slate-700">Export as Excel</Text>
//                 <Text className="text-xs text-slate-500">Spreadsheet with all data</Text>
//               </View>
//               <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
//             </Pressable>

//             {/* Divider */}
//             <View className="h-px bg-slate-100" />

//             {/* Email Report */}
//             <Pressable
//               onPress={handleEmailReport}
//               disabled={isExporting}
//               className="flex-row items-center px-4 py-4 active:bg-slate-50"
//             >
//               <View className="w-10 h-10 bg-blue-100 rounded-xl items-center justify-center mr-3">
//                 <Text className="text-xl">📧</Text>
//               </View>
//               <View className="flex-1">
//                 <Text className="font-semibold text-slate-700">Email Report</Text>
//                 <Text className="text-xs text-slate-500">Send to your inbox</Text>
//               </View>
//               <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
//             </Pressable>

//             {/* Divider */}
//             <View className="h-px bg-slate-100" />

//             {/* Schedule Report */}
//             <Pressable
//               onPress={handleScheduleReport}
//               disabled={isExporting}
//               className="flex-row items-center px-4 py-4 active:bg-slate-50"
//             >
//               <View className="w-10 h-10 bg-purple-100 rounded-xl items-center justify-center mr-3">
//                 <Text className="text-xl">⏰</Text>
//               </View>
//               <View className="flex-1">
//                 <Text className="font-semibold text-slate-700">Schedule Report</Text>
//                 <Text className="text-xs text-slate-500">Automated delivery</Text>
//               </View>
//               <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
//             </Pressable>

//             {/* Cancel Button */}
//             <Pressable
//               onPress={() => setShowExportMenu(false)}
//               className="px-4 py-4 bg-slate-50 active:bg-slate-100"
//             >
//               <Text className="text-slate-600 font-semibold text-center">Cancel</Text>
//             </Pressable>
//           </Pressable>
//         </Pressable>
//       </Modal>
//     </View>
//   );
// }

import React, { useState } from "react";
import { View, Text, Pressable, Modal, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { exportToPDF, exportToExcel } from "../../utils/exportUtils";

export default function ExportSchedulePanel({
  profile,
  kpiData,
  timeSeriesData,
  categoryBreakdown,
  rollingAverages,
  anomalies,
  peakUsageData,
  dateRange,
  selectedCategories,
  totalAmount,
}) {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const analyticsData = {
        kpiData,
        timeSeriesData,
        categoryBreakdown,
        rollingAverages,
        anomalies,
        peakUsageData,
        dateRange,
        selectedCategories,
        totalAmount,
      };

      const userName = profile?.firstName && profile?.lastName
        ? `${profile.firstName} ${profile.lastName}`
        : profile?.name || "User";

      await exportToPDF(analyticsData, userName);
      
      setShowExportMenu(false);
      Alert.alert("✅ Success", "PDF report has been generated and ready to share!");
    } catch (error) {
      console.error("Error exporting PDF:", error);
      Alert.alert("❌ Error", "Failed to export PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportExcel = async () => {
    setIsExporting(true);
    try {
      const analyticsData = {
        kpiData,
        timeSeriesData,
        categoryBreakdown,
        rollingAverages,
        anomalies,
        peakUsageData,
        dateRange,
        selectedCategories,
        totalAmount,
      };

      const userName = profile?.firstName && profile?.lastName
        ? `${profile.firstName} ${profile.lastName}`
        : profile?.name || "User";

      await exportToExcel(analyticsData, userName);
      
      setShowExportMenu(false);
      Alert.alert("✅ Success", "Excel report has been generated and ready to share!");
    } catch (error) {
      console.error("Error exporting Excel:", error);
      Alert.alert("❌ Error", "Failed to export Excel. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleEmailReport = () => {
    setShowExportMenu(false);
    Alert.alert("📧 Email Report", "This feature will be available soon!");
  };

  const handleScheduleReport = () => {
    setShowExportMenu(false);
    Alert.alert("⏰ Schedule Report", "Automated delivery coming soon!");
  };

  return (
    <View className="px-4 pb-6">
      <LinearGradient
        colors={["#9333ea", "#ec4899"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-2xl p-6"
      >
        {/* Header */}
        <View className="items-center mb-4">
          <Text className="text-2xl font-bold text-white text-center mb-2">
            Schedule Automated Reports 📧
          </Text>
          <Text className="text-white/90 text-center text-sm">
            Get detailed analytics reports delivered to your inbox weekly or monthly
          </Text>
        </View>

        {/* Action Buttons */}
        <View className="gap-3 mb-4">
          <Pressable
            className="bg-white rounded-xl py-3 px-4 active:opacity-80"
            onPress={() => Alert.alert("📅 Weekly Reports", "Feature coming soon!")}
          >
            <Text className="text-purple-600 font-semibold text-center">
              📅 Weekly Reports
            </Text>
          </Pressable>

          <View className="flex-row gap-3">
            <Pressable
              className="flex-1 bg-white/20 backdrop-blur rounded-xl py-3 px-4 active:opacity-80"
              onPress={() => Alert.alert("📊 Monthly Summary", "Feature coming soon!")}
            >
              <Text className="text-white font-semibold text-center text-sm">
                📊 Monthly Summary
              </Text>
            </Pressable>

            <Pressable
              className="flex-1 bg-white/20 backdrop-blur rounded-xl py-3 px-4 active:opacity-80"
              onPress={() => Alert.alert("⚙️ Custom Schedule", "Feature coming soon!")}
            >
              <Text className="text-white font-semibold text-center text-sm">
                ⚙️ Custom Schedule
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Export Options Button */}
        <Pressable
          onPress={() => setShowExportMenu(true)}
          disabled={isExporting}
          className={`bg-white/20 backdrop-blur rounded-xl py-3 px-4 active:opacity-80 ${
            isExporting ? "opacity-50" : ""
          }`}
        >
          <Text className="text-white font-semibold text-center">
            {isExporting ? "⏳ Exporting..." : "📥 Export Options"}
          </Text>
        </Pressable>

        {/* User Info */}
        {profile && (
          <Text className="text-white/70 text-xs text-center mt-4">
            Reports will be personalized for {profile.firstName} {profile.lastName}
          </Text>
        )}
      </LinearGradient>

      {/* Export Options Modal */}
      <Modal
        visible={showExportMenu}
        transparent
        animationType="fade"
        onRequestClose={() => setShowExportMenu(false)}
      >
        <Pressable
          className="flex-1 bg-black/50 justify-center items-center px-4"
          onPress={() => setShowExportMenu(false)}
        >
          <Pressable
            className="bg-white rounded-2xl w-full max-w-sm overflow-hidden"
            onPress={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <View className="bg-purple-50 px-4 py-3 border-b border-slate-200">
              <Text className="text-lg font-bold text-slate-800 text-center">
                Export Options
              </Text>
            </View>

            {/* Export PDF */}
            <Pressable
              onPress={handleExportPDF}
              disabled={isExporting}
              className="flex-row items-center px-4 py-4 active:bg-slate-50"
            >
              <View className="w-10 h-10 bg-red-100 rounded-xl items-center justify-center mr-3">
                <Text className="text-xl">📄</Text>
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-slate-700">Export as PDF</Text>
                <Text className="text-xs text-slate-500">Complete analytics report</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
            </Pressable>

            {/* Divider */}
            <View className="h-px bg-slate-100" />

            {/* Export Excel */}
            <Pressable
              onPress={handleExportExcel}
              disabled={isExporting}
              className="flex-row items-center px-4 py-4 active:bg-slate-50"
            >
              <View className="w-10 h-10 bg-green-100 rounded-xl items-center justify-center mr-3">
                <Text className="text-xl">📊</Text>
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-slate-700">Export as Excel</Text>
                <Text className="text-xs text-slate-500">Spreadsheet with all data</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
            </Pressable>

            {/* Divider */}
            <View className="h-px bg-slate-100" />

            {/* Email Report */}
            <Pressable
              onPress={handleEmailReport}
              disabled={isExporting}
              className="flex-row items-center px-4 py-4 active:bg-slate-50"
            >
              <View className="w-10 h-10 bg-blue-100 rounded-xl items-center justify-center mr-3">
                <Text className="text-xl">📧</Text>
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-slate-700">Email Report</Text>
                <Text className="text-xs text-slate-500">Send to your inbox</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
            </Pressable>

            {/* Divider */}
            <View className="h-px bg-slate-100" />

            {/* Schedule Report */}
            <Pressable
              onPress={handleScheduleReport}
              disabled={isExporting}
              className="flex-row items-center px-4 py-4 active:bg-slate-50"
            >
              <View className="w-10 h-10 bg-purple-100 rounded-xl items-center justify-center mr-3">
                <Text className="text-xl">⏰</Text>
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-slate-700">Schedule Report</Text>
                <Text className="text-xs text-slate-500">Automated delivery</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
            </Pressable>

            {/* Cancel Button */}
            <Pressable
              onPress={() => setShowExportMenu(false)}
              className="px-4 py-4 bg-slate-50 active:bg-slate-100"
            >
              <Text className="text-slate-600 font-semibold text-center">Cancel</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}