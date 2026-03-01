// import React from "react";
// import { View, Text, TouchableOpacity } from "react-native";

// export default function BillsHeader({ navigation }) {
//   return (
//     <View className="bg-white border-b border-slate-200 px-4 py-4">
//       <View className="flex-row items-center justify-between">
//         <View >
//           <Text className="text-2xl font-bold text-slate-900">
//             Bills Management 📊
//           </Text>
//           <Text className="text-sm text-slate-600">
//             Manage, and analyze all your utility bills
//           </Text>
//         </View>

//         <View className="flex-row gap-2">
//           <TouchableOpacity className="w-10 h-10 rounded-xl bg-blue-100 items-center justify-center">
//             <Text style={{ fontSize: 20 }}>🔔</Text>
//             <View className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={() => navigation.openDrawer()}
//             className="w-10 h-10 rounded-xl bg-slate-100 items-center justify-center"
//           >
//             <Text style={{ fontSize: 20 }}>☰</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// }

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function BillsHeader({ navigation, unreadCount = 0, onBellPress }) {
  return (
    <View className="bg-white border-b border-slate-200 px-4 py-4">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-2xl font-bold text-slate-900">
            Bills Management 📊
          </Text>
          <Text className="text-sm text-slate-600">
            Manage, and analyze all your utility bills
          </Text>
        </View>

        <View className="flex-row gap-2">
          {/* Bell: view notification history */}
          <TouchableOpacity
            onPress={onBellPress}
            style={{
              position: "relative",
              width: 40,
              height: 40,
              borderRadius: 12,
              backgroundColor: "#dbeafe",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 20 }}>🔔</Text>

            {/* Unread badge */}
            {unreadCount > 0 && (
              <View
                style={{
                  position: "absolute",
                  top: 2,
                  right: 2,
                  minWidth: 16,
                  height: 16,
                  backgroundColor: "#ef4444",
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 3,
                  borderWidth: 1.5,
                  borderColor: "white",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 9,
                    fontWeight: "bold",
                    lineHeight: 12,
                  }}
                >
                  {unreadCount > 99 ? "99+" : unreadCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Drawer toggle */}
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            className="w-10 h-10 rounded-xl bg-slate-100 items-center justify-center"
          >
            <Text style={{ fontSize: 20 }}>☰</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}