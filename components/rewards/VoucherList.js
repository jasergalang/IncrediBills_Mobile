import { View, Text, Pressable, FlatList } from "react-native";

export default function VouchersList({ activeVouchers, onBrowse }) {
  if (activeVouchers.length === 0) {
    return (
      <View className="bg-white p-10 rounded-2xl items-center">
        <Text className="text-6xl mb-4">🎫</Text>
        <Text className="text-xl font-bold mb-2">
          No Active Vouchers
        </Text>
        <Text className="text-slate-600 mb-4 text-center">
          Redeem rewards to get vouchers and start saving!
        </Text>
        <Pressable
          onPress={onBrowse}
          className="bg-indigo-600 px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-semibold">
            Browse Rewards
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      data={activeVouchers}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ gap: 16 }}
      renderItem={({ item }) => (
        <View className="bg-white border border-slate-200 rounded-2xl p-5">
          <View className="flex-row gap-4 mb-4">
            <Text className="text-4xl">{item.icon}</Text>
            <View className="flex-1">
              <Text className="font-bold">{item.reward}</Text>
              <Text className="font-mono bg-slate-900 text-white px-3 py-1 rounded-lg mt-2">
                {item.code}
              </Text>
            </View>
          </View>

          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-slate-600">
              Expires {item.expiryDate}
            </Text>
            <Text
              className={`font-bold ${
                item.daysLeft <= 7 ? "text-red-600" : "text-green-600"
              }`}
            >
              {item.daysLeft} days
            </Text>
          </View>

          <Pressable className="bg-indigo-600 py-3 rounded-xl">
            <Text className="text-white font-semibold text-center">
              Use Now
            </Text>
          </Pressable>
        </View>
      )}
    />
  );
}
