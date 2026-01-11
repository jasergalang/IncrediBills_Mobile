import React from "react";
import { View, FlatList, Dimensions } from "react-native";
import RewardCard from "./RewardCard";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2; // 2 columns with padding

export default function RewardsGrid({ rewards, userPoints, onRedeemClick, scrollEnabled = true }) {
  return (
    <FlatList
      data={rewards}
      keyExtractor={(item) => item.id.toString()}
      scrollEnabled={scrollEnabled}
      numColumns={2}
      columnWrapperStyle={{ gap: 16 }}
      contentContainerStyle={{ gap: 16 }}
      renderItem={({ item }) => (
        <View style={{ width: CARD_WIDTH }}>
          <RewardCard
            reward={item}
            userPoints={userPoints}
            onRedeemClick={onRedeemClick}

            // onRedeemClick={onRedeemClick}
          />
        </View>
      )}
    />
  );
}