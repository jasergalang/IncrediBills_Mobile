import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";

const categories = [
  { id: "all", label: "All Rewards", icon: "🎁" },
  { id: "vouchers", label: "Vouchers", icon: "🎫" },
  { id: "discounts", label: "Discounts", icon: "💸" },
  { id: "premium", label: "Premium", icon: "⭐" },
  { id: "physical", label: "Physical", icon: "📦" },
];

export default function CategoryFilter({ selectedCategory, setSelectedCategory }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mb-6"
      contentContainerStyle={{ paddingHorizontal: 4 }}
    >
      <View className="flex-row gap-3">
        {categories.map((category) => {
          const isActive = selectedCategory === category.id;
          
          return (
            <Pressable
              key={category.id}
              onPress={() => setSelectedCategory(category.id)}
              className={`px-5 py-3 rounded-xl border-2 ${
                isActive
                  ? "bg-indigo-600 border-indigo-600"
                  : "bg-white border-slate-200"
              }`}
            >
              <View className="flex-row items-center gap-2">
                <Text className="text-base">{category.icon}</Text>
                <Text
                  className={`font-semibold text-sm ${
                    isActive ? "text-white" : "text-slate-700"
                  }`}
                >
                  {category.label}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}