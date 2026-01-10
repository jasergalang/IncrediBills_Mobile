import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

export default function FilterTabs({ selectedFilter, setSelectedFilter }) {
  const filters = ["Global", "Friends", "This Month", "All Time"];

  return (
    <View style={{  paddingBottom: 8, marginBottom: 16, paddingTop: 14 }}>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "row", gap: 8 }}>
          {filters.map((filter) => {
            const isActive = selectedFilter === filter;
            return (
              <TouchableOpacity
                key={filter}
                onPress={() => setSelectedFilter(filter)}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 12,
                  backgroundColor: isActive ? "#2563eb" : "#e2e8f0",
                }}
              >
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: 14,
                    color: isActive ? "white" : "#475569",
                  }}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
