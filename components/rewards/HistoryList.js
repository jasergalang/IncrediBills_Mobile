import { View, Text, FlatList } from "react-native";

export default function HistoryList({ redemptionHistory }) {
  return (
    <FlatList
      data={redemptionHistory}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ gap: 12 }}
      renderItem={({ item }) => (
        <View className="bg-white rounded-xl p-4 border border-slate-200">
          <View className="flex-row gap-3 mb-2">
            <Text className="text-3xl">{item.icon}</Text>
            <View className="flex-1">
              <Text className="font-bold">{item.reward}</Text>
              <Text className="text-slate-600 text-sm">
                {item.redeemedDate}
              </Text>
            </View>
            <Text className="text-indigo-600 font-bold">
              -{item.pointsSpent}
            </Text>
          </View>

          <Text className="text-xs text-slate-500">
            Status: {item.status}
          </Text>
        </View>
      )}
    />
  );
}
