// import React from "react";
// import { View, Text } from "react-native";

// export default function BillsHeader() {
//   return (
//     <View className="bg-white border-b border-slate-200 px-4 py-4">
//       <Text className="text-2xl font-bold text-slate-900 mb-1">
//         Bills Management 📊
//       </Text>
//       <Text className="text-sm text-slate-600">
//         Track, manage, and analyze all your utility bills
//       </Text>
//     </View>
//   );
// }
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function GameHeader({ navigation }) {
  return (
    <View className="bg-white border-b border-slate-200 px-4 py-4">
      <View className="flex-row items-center justify-between">
        <View >
          <Text className="text-2xl font-bold text-slate-900">
            Gamification 🎮
          </Text>
          <Text className="text-sm text-slate-600">
            Battle Pollution Monsters
          </Text>
        </View>

        <View className="flex-row gap-2">
          <TouchableOpacity className="w-10 h-10 rounded-xl bg-blue-100 items-center justify-center">
            <Text style={{ fontSize: 20 }}>🔔</Text>
            <View className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </TouchableOpacity>

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
