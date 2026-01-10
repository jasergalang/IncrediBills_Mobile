import React from "react";
import { View, Text, ScrollView, Switch } from "react-native";

const notificationItems = [
  {
    key: "emailNotifications",
    icon: "📧",
    title: "Email Notifications",
    description: "Receive updates via email",
  },
  {
    key: "pushNotifications",
    icon: "🔔",
    title: "Push Notifications",
    description: "Get notified on your devices",
  },
  {
    key: "billReminders",
    icon: "📋",
    title: "Bill Reminders",
    description: "Get reminded before bill due dates",
  },
  {
    key: "usageAlerts",
    icon: "⚠️",
    title: "Usage Alerts",
    description: "Alerts when usage exceeds threshold",
  },
];

export default function NotificationSection({ notifications, setNotifications }) {
  return (
    <ScrollView className="flex-1 bg-slate-50">
      <View className="p-4">
        <View className="bg-white rounded-2xl border border-slate-200 p-6">
          <Text className="text-lg font-bold text-slate-900 mb-4">
            Notification Preferences
          </Text>

          <View className="space-y-4">
            {notificationItems.map((item, index) => (
              <View
                key={item.key}
                className={`flex-row items-center justify-between py-4 ${
                  index !== notificationItems.length - 1
                    ? "border-b border-slate-100"
                    : ""
                }`}
              >
                <View className="flex-row items-center flex-1">
                  <View className="w-12 h-12 rounded-xl bg-blue-50 items-center justify-center mr-4">
                    <Text className="text-2xl">{item.icon}</Text>
                  </View>

                  <View className="flex-1">
                    <Text className="font-semibold text-slate-900 mb-1">
                      {item.title}
                    </Text>
                    <Text className="text-sm text-slate-500">
                      {item.description}
                    </Text>
                  </View>
                </View>

                <Switch
                  value={notifications[item.key]}
                  onValueChange={(value) =>
                    setNotifications({
                      ...notifications,
                      [item.key]: value,
                    })
                  }
                  trackColor={{ false: "#cbd5e1", true: "#3b82f6" }}
                  thumbColor={notifications[item.key] ? "#ffffff" : "#f1f5f9"}
                />
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}