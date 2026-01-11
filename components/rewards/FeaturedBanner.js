import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function FeaturedBanner() {
  return (
    <LinearGradient
      colors={["#7c3aed", "#ec4899"]}
      className="rounded-2xl p-6 mb-6"
    >
      <View className="flex-row items-center gap-3 mb-2">
        <Text className="text-3xl">🔥</Text>
        <Text className="text-white text-xl font-bold">
          Featured Rewards
        </Text>
      </View>

      <Text className="text-white/90 text-sm">
        Limited time offers! Grab these popular rewards before they're gone.
      </Text>
    </LinearGradient>
  );
}
