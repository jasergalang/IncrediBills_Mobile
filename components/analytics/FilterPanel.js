import React from "react";
import { View, TouchableOpacity, Text, ScrollView } from "react-native";

export default function FiltersPanel({
  selectedCategories,
  toggleCategory,
}) {
  const categories = [
    { id: "all", name: "All", icon: "📊" },
    { id: "water", name: "Water", icon: "💧" },
    { id: "electricity", name: "Electricity", icon: "⚡" },
    { id: "fuel", name: "Transport", icon: "🚗" },
    { id: "grocery", name: "Groceries", icon: "🛒" },
    { id: "miscellaneous", name: "Miscellaneous", icon: "📦" },
    { id: "kitchenGas", name: "Kitchen Gas", icon: "🔥" },
  ];

  return (
    <View className="bg-white rounded-2xl border border-slate-200 mx-4 p-4 ">
      <View className="flex-row items-center justify-between mb-4">
        <View>
          <Text className="text-lg font-bold text-slate-900 mb-1">
            Filter by Category
          </Text>
          <Text className="text-xs text-slate-600">
            Select categories to analyze
          </Text>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-0"
      >
        <View className="flex-row gap-2">
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => toggleCategory(category.id)}
              className={`px-4 py-2 rounded-lg ${
                selectedCategories.includes(category.id)
                  ? "bg-blue-600"
                  : "bg-slate-100"
              }`}
            >
              <Text
                className={`font-semibold text-sm ${
                  selectedCategories.includes(category.id)
                    ? "text-white"
                    : "text-slate-600"
                }`}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}