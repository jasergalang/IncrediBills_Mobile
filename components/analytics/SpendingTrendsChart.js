// import React from "react";
// import { View, Text } from "react-native";

// export default function SpendingTrendsChart({ spendingData }) {
//   const maxSpending = Math.max(...spendingData.map((d) => d.amount));
//   return (
//     <View className="px-4 pb-4">
//       <View className="bg-white rounded-2xl p-5 border border-slate-200">
//         <Text className="text-base font-bold text-slate-900 mb-4">
//           Spending Trends
//         </Text>
//         <View className="h-48 flex-row items-end justify-between gap-2">
//           {spendingData.map((data, idx) => {
//             const height = (data.amount / maxSpending) * 100;
//             return (
//               <View key={idx} className="flex-1 items-center">
//                 <View className="w-full" style={{ height: "100%" }}>
//                   {/* <View
//                     className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
//                     style={{ height: `${height}%`, marginTop: "auto" }}
//                   /> */}
//                   <View
//                     className="w-full rounded-t"
//                     style={{
//                       height: `${height}%`,
//                       marginTop: "auto",
//                       backgroundColor: idx % 2 === 0 ? "#467bcfff" : "#8cbaf5ff",
//                     }}
//                   />
//                 </View>
//                 <Text className="text-xs font-semibold text-slate-600 mt-2">
//                   {data.month}
//                 </Text>
//               </View>
//             );
//           })}
//         </View>
//       </View>
//     </View>
//   );
// }


import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";

export default function SpendingTrendsChart({ spendingData }) {
  const [selectedBar, setSelectedBar] = useState(null); // store the index of touched bar
  const maxSpending = Math.max(...spendingData.map((d) => d.amount), 1);

  return (
    <View className="px-4 pb-4">
      <View className="bg-white rounded-2xl p-5 border border-slate-200">
        <Text className="text-base font-bold text-slate-900 mb-4">
          Spending Trends
        </Text>
        <View className="h-48 flex-row items-end justify-between gap-2">
          {spendingData.map((data, idx) => {
            const height = (data.amount / maxSpending) * 100;

            return (
              <Pressable
                key={idx}
                className="flex-1 items-center"
                onPress={() =>
                  setSelectedBar(selectedBar === idx ? null : idx)
                }
              >
                <View className="w-full" style={{ height: "100%" }}>
                  <View
                    className="w-full rounded-t"
                    style={{
                      height: `${height}%`,
                      marginTop: "auto",
                      backgroundColor: idx % 2 === 0 ? "#467bcfff" : "#8cbaf5ff",
                    }}
                  />
                  {/* Show amount above the bar if selected */}
                  {selectedBar === idx && (
                    <View
                      // style={{
                      //   position: "absolute",
                      //   bottom: `${height + 10}%`,
                      //   backgroundColor: "rgba(0,0,0,0.7)",
                      //   paddingHorizontal: 6,
                      //   paddingVertical: 2,
                      //   borderRadius: 4,
                      // }}
                      style={{
                        position: "absolute",
                        bottom: `${height + 10}%`,
                        minWidth: 60,           // ensure enough width for 6 digits
                        backgroundColor: "rgba(0,0,0,0.7)",
                        paddingHorizontal: 6,
                        paddingVertical: 4,
                        borderRadius: 4,
                        alignItems: "center",   // center the text horizontally
                      }}
                    >
                      <Text className="text-white text-xs font-bold">
                        ₱{data.amount.toFixed(0)}
                      </Text>
                    </View>
                  )}
                </View>
                <Text className="text-xs font-semibold text-slate-600 mt-2">
                  {data.month}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}
