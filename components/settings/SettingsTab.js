import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";

export default function SettingsTabs({ tabs, activeTab, setActiveTab }) {
  return (
    <View className="bg-white rounded-2xl border border-slate-200 mb-8 overflow-hidden">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <Pressable
              key={tab.id}
              onPress={() => setActiveTab(tab.id)}
              className={`px-6 py-4 border-b-2 ${
                isActive
                  ? "border-blue-600 bg-blue-50"
                  : "border-transparent"
              }`}
            >
              <View className="flex-row items-center">
                {/* Icon */}
                <View className="mr-2">
                  {tab.icon}
                </View>

                {/* Text */}
                <Text
                  className={`font-semibold text-sm ${
                    isActive ? "text-blue-600" : "text-slate-600"
                  }`}
                >
                  {tab.name}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
