import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function QuickActions({ navigation }) {
  const actions = [
    {
      icon: "📤",
      label: "Scan Bill",
      route: "Upload",
      color: "blue",
    },
    {
      icon: "📊",
      label: "Analytics",
      route: "Analytics",
      color: "purple",
    },
    { 
      icon: "🎮", 
      label: "Games", 
      route: "Games", 
      color: "green" 
    },
    { 
      icon: "💰", 
      label: "Rewards", 
      route: "Profile", 
      color: "amber" 
    },
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
                className={`w-12 h-12 bg-white-500 rounded-xl items-center justify-center mb-2`}
              >
                <Text style={{ fontSize: 24 }}>{action.icon}</Text>
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