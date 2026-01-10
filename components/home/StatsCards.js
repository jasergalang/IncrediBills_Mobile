// import React from "react";
// import { View, Text } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";

// export default function StatsCards({ statsData }) {
//   return (
//     <View className="px-4 pb-4">
//       <View className="flex-row gap-3 mb-3">
//         <View className="flex-1 bg-white rounded-2xl p-4 border border-slate-200">
//           <Text className="text-2xl mb-2">📊</Text>
//           <Text className="text-sm text-slate-600 mb-1">Total Bills</Text>
//           <Text className="text-xl font-bold text-slate-900">
//             ₱{statsData.totalSpent.toLocaleString()}
//           </Text>
//           <Text className="text-xs text-slate-400">This Month</Text>
//         </View>
//         <View className="flex-1 bg-white rounded-2xl p-4 border border-slate-200">
//           <Text className="text-2xl mb-2">💰  </Text>
//           <Text className="text-sm text-slate-600 mb-1">Total Saved</Text>
//           <Text className="text-xl font-bold text-green-600">
//             ₱{statsData.savedAmount.toLocaleString()}
//           </Text>
//           <Text className="text-xs text-slate-400">All Time</Text>
//         </View> 
//       </View>
//       <View className="flex-row gap-3">
//         <View className="flex-1 bg-white rounded-2xl p-4 border border-slate-200">
//           <Text className="text-2xl mb-2">🎯</Text>
//           <Text className="text-sm text-slate-600 mb-1">Next Month</Text>
//           <Text className="text-xl font-bold text-slate-900">
//             {statsData.billsUploaded}
//           </Text>
//           <Text className="text-xs text-slate-400">AI Prediction</Text>
//         </View>
//         <View className="flex-1 bg-white rounded-2xl p-4 border border-slate-200">
//           <Text className="text-2xl mb-2">📄</Text>
//           <Text className="text-sm text-slate-600 mb-1">This Month</Text>
//           <Text className="text-xl font-bold text-blue-600">
//             {statsData.billsUploaded}
//           </Text>
//         </View>
//       </View>
//     </View>
//   );
// }
import React from "react";
import { View, Text } from "react-native";

/**
 * Helper to determine arrow + colors based on percentage value
 */
const getPercentageStyle = (value = 0) => {
  if (value > 0) {
    return {
      arrow: "↑",
      textColor: "text-green-600",
      bgColor: "bg-green-50",
    };
  }

  if (value < 0) {
    return {
      arrow: "↓",
      textColor: "text-red-600",
      bgColor: "bg-red-50",
    };
  }

  return {
    // arrow: "→",
    textColor: "text-blue-600",
    bgColor: "bg-blue-50",
  };
};

export default function StatsCards({ statsData }) {
  const totalSpentPct = getPercentageStyle(statsData.totalSpentChange);
  const savedPct = getPercentageStyle(statsData.savedChange);
  const predictionPct = getPercentageStyle(statsData.predictionChange);
  const billsPct = getPercentageStyle(statsData.billsChange);

  return (
    <View className="px-4 pb-4">
      <View className="flex-row gap-3 mb-3">
        {/* Total Bills Card */}
        <View className="flex-1 bg-white rounded-2xl p-4 border border-slate-200">
          <View className="flex-row items-start justify-between mb-2">
            <Text className="text-2xl">📊</Text>
            <View className={`${totalSpentPct.bgColor} px-2 py-1 rounded-full`}>
              <Text className={`text-xs font-semibold ${totalSpentPct.textColor}`}>
                {totalSpentPct.arrow} {Math.abs(statsData.totalSpentChange || 0)}%
              </Text>
            </View>
          </View>
          <Text className="text-sm text-slate-600 mb-1">Total Bills</Text>
          <Text className="text-xl font-bold text-slate-900">
            ₱{statsData.totalSpent?.toLocaleString() || 0}
          </Text>
          <Text className="text-xs text-slate-400">This Month</Text>
        </View>

        {/* Total Saved Card */}
        <View className="flex-1 bg-white rounded-2xl p-4 border border-slate-200">
          <View className="flex-row items-start justify-between mb-2">
            <Text className="text-2xl">💰</Text>
            <View className={`${savedPct.bgColor} px-2 py-1 rounded-full`}>
              <Text className={`text-xs font-semibold ${savedPct.textColor}`}>
                {savedPct.arrow} {Math.abs(statsData.savedChange || 0)}%
              </Text>
            </View>
          </View>
          <Text className="text-sm text-slate-600 mb-1">Total Saved</Text>
          <Text className="text-xl font-bold text-green-600">
            ₱{statsData.savedAmount?.toLocaleString() || 0}
          </Text>
          <Text className="text-xs text-slate-400">All Time</Text>
        </View>
      </View>

      <View className="flex-row gap-3">
        {/* Next Month Prediction Card */}
        <View className="flex-1 bg-white rounded-2xl p-4 border border-slate-200">
          <View className="flex-row items-start justify-between mb-2">
            <Text className="text-2xl">🎯</Text>
            <View className={`${predictionPct.bgColor} px-2 py-1 rounded-full`}>
              <Text className={`text-xs font-semibold ${predictionPct.textColor}`}>
                {predictionPct.arrow} {Math.abs(statsData.predictionChange || 0)}%
              </Text>
            </View>
          </View>
          <Text className="text-sm text-slate-600 mb-1">Next Month</Text>
          <Text className="text-xl font-bold text-slate-900">
            ₱{statsData.nextMonthPrediction?.toLocaleString() || 0}
          </Text>
          <Text className="text-xs text-slate-400">AI Prediction</Text>
        </View>

        {/* Bills Uploaded Card */}
        <View className="flex-1 bg-white rounded-2xl p-4 border border-slate-200">
          <View className="flex-row items-start justify-between mb-2">
            <Text className="text-2xl">📄</Text>
            <View className={`${billsPct.bgColor} px-2 py-1 rounded-full`}>
              <Text className={`text-xs font-semibold ${billsPct.textColor}`}>
                {billsPct.arrow} {Math.abs(statsData.billsChange || 0)}%
              </Text>
            </View>
          </View>
          <Text className="text-sm text-slate-600 mb-1">This Month</Text>
          <Text className="text-xl font-bold text-blue-600">
            {statsData.billsUploaded || 0}
          </Text>
          <Text className="text-xs text-slate-400">Bills Uploaded</Text>
        </View>
      </View>
    </View>
  );
}

// import React from "react";
// import { View, Text } from "react-native";

// export default function StatsCards({ statsData }) {
//   return (
//     <View className="px-4 pb-4">
//       <View className="flex-row gap-3 mb-3">
//         {/* Total Bills Card */}
//         <View className="flex-1 bg-white rounded-2xl p-4 border border-slate-200">
//           <View className="flex-row items-start justify-between mb-2">
//             <Text className="text-2xl">📊</Text>
//             <View className="bg-red-50 px-2 py-1 rounded-full">
//               <Text className="text-xs font-semibold text-red-600">
//                 ↑ {statsData.totalSpentChange || 0}%
//               </Text>
//             </View>
//           </View>
//           <Text className="text-sm text-slate-600 mb-1">Total Bills</Text>
//           <Text className="text-xl font-bold text-slate-900">
//             ₱{statsData.totalSpent.toLocaleString()}
//           </Text>
//           <Text className="text-xs text-slate-400">This Month</Text>
//         </View>

//         {/* Total Saved Card */}
//         <View className="flex-1 bg-white rounded-2xl p-4 border border-slate-200">
//           <View className="flex-row items-start justify-between mb-2">
//             <Text className="text-2xl">💰</Text>
//             <View className="bg-green-50 px-2 py-1 rounded-full">
//               <Text className="text-xs font-semibold text-green-600">
//                 ↑ {statsData.savedChange || 0}%
//               </Text>
//             </View>
//           </View>
//           <Text className="text-sm text-slate-600 mb-1">Total Saved</Text>
//           <Text className="text-xl font-bold text-green-600">
//             ₱{statsData.savedAmount.toLocaleString()}
//           </Text>
//           <Text className="text-xs text-slate-400">All Time</Text>
//         </View> 
//       </View>

//       <View className="flex-row gap-3">
//         {/* Next Month Prediction Card */}
//         <View className="flex-1 bg-white rounded-2xl p-4 border border-slate-200">
//           <View className="flex-row items-start justify-between mb-2">
//             <Text className="text-2xl">🎯</Text>
//             <View className={`px-2 py-1 rounded-full ${(statsData.predictionChange || 0) < 0 ? 'bg-green-50' : 'bg-red-50'}`}>
//               <Text className={`text-xs font-semibold ${(statsData.predictionChange || 0) < 0 ? 'text-green-600' : 'text-red-600'}`}>
//                 {(statsData.predictionChange || 0) < 0 ? '↓' : '↑'} {Math.abs(statsData.predictionChange || 0)}%
//               </Text>
//             </View>
//           </View>
//           <Text className="text-sm text-slate-600 mb-1">Next Month</Text>
//           <Text className="text-xl font-bold text-slate-900">
//             ₱{statsData.nextMonthPrediction?.toLocaleString() || '0'}
//           </Text>
//           <Text className="text-xs text-slate-400">AI Prediction</Text>
//         </View>

//         {/* Bills Uploaded Card */}
//         <View className="flex-1 bg-white rounded-2xl p-4 border border-slate-200">
//           <View className="flex-row items-start justify-between mb-2">
//             <Text className="text-2xl">📄</Text>
//             <View className="bg-blue-50 px-2 py-1 rounded-full">
//               <Text className="text-xs font-semibold text-blue-600">
//                 ↑ {statsData.billsChange || 0}%
//               </Text>
//             </View>
//           </View>
//           <Text className="text-sm text-slate-600 mb-1">This Month</Text>
//           <Text className="text-xl font-bold text-blue-600">
//             {statsData.billsUploaded}
//           </Text>
//           <Text className="text-xs text-slate-400">Bills Uploaded</Text>
//         </View>
//       </View>
//     </View>
//   );
// }