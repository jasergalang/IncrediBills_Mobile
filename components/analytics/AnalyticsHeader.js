import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AnalyticsHeader({ activeTab, setActiveTab }) {
  return (
    <View className="bg-white border-b border-slate-200 px-4 py-4">
      <View className="flex-row items-center justify-between mb-4">
        <View>
          <Text className="text-2xl font-bold text-slate-900">
            Analytics 📊
          </Text>
          <Text className="text-sm text-slate-600">
            Your insights dashboard
          </Text>
        </View>
        <TouchableOpacity className="w-10 h-10 rounded-xl bg-blue-100 items-center justify-center">
          <Ionicons name="share-outline" size={20} color="#2563eb" />
        </TouchableOpacity>
      </View>
      <View className="flex-row gap-2">
        <TouchableOpacity
          onPress={() => setActiveTab("utility")}
          className={`flex-1 py-3 rounded-xl ${activeTab === "utility" ? "bg-blue-600" : "bg-slate-100"}`}
        >
          <Text
            className={`text-center font-semibold ${activeTab === "utility" ? "text-white" : "text-slate-700"}`}
          >
            💡 Utility
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("games")}
          className={`flex-1 py-3 rounded-xl ${activeTab === "games" ? "bg-purple-600" : "bg-slate-100"}`}
        >
          <Text
            className={`text-center font-semibold ${activeTab === "games" ? "text-white" : "text-slate-700"}`}
          >
            🎮 Games
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
