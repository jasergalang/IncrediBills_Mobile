import { View, Text, Pressable, ScrollView } from "react-native";

export default function Tabs({ activeTab, setActiveTab, vouchersCount = 0 }) {
  const btn = (key) =>
    activeTab === key
      ? "bg-indigo-600"
      : "bg-white border border-slate-200";

  const text = (key) =>
    activeTab === key ? "text-white" : "text-slate-600";

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mb-6"
    >
      <View className="flex-row gap-3">
        <Pressable
          onPress={() => setActiveTab("catalog")}
          className={`px-5 py-3 rounded-xl ${btn("catalog")}`}
        >
          <Text className={`font-semibold ${text("catalog")}`}>
            🏪 Catalog
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setActiveTab("vouchers")}
          className={`px-5 py-3 rounded-xl ${btn("vouchers")}`}
        >
          <Text className={`font-semibold ${text("vouchers")}`}>
            🎫 My Vouchers ({vouchersCount})
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setActiveTab("history")}
          className={`px-5 py-3 rounded-xl ${btn("history")}`}
        >
          <Text className={`font-semibold ${text("history")}`}>
            📜 History
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
