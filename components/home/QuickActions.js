import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function QuickActions({ navigation }) {
  const actions = [
    {
      icon: "cloud-upload",
      label: "Upload Bill",
      route: "Upload",
      color: "blue",
    },
    {
      icon: "analytics",
      label: "Analytics",
      route: "Analytics",
      color: "purple",
    },
    { icon: "game-controller", label: "Games", route: "Games", color: "green" },
    { icon: "wallet", label: "Payments", route: "Profile", color: "amber" },
  ];

  return (
    <View className="px-4 pb-4">
      <Text className="text-base font-bold text-slate-900 mb-3">
        Quick Actions
      </Text>
      <View className="flex-row gap-3">
        {actions.map((action, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => navigation.navigate(action.route)}
            className="flex-1"
          >
            <View
              className={`bg-${action.color}-100 rounded-2xl p-4 items-center`}
            >
              <View
                className={`w-12 h-12 bg-${action.color}-500 rounded-xl items-center justify-center mb-2`}
              >
                <Ionicons name={action.icon} size={24} color="#fff" />
              </View>
              <Text className="text-xs font-semibold text-slate-700 text-center">
                {action.label}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
