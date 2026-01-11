import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

export default function SettingsHeader({ activeTab, setActiveTab, navigation }) {
  return (
    <View className="bg-white border-b border-slate-200 px-4 py-4">
      <View className="flex-row items-center justify-between mb-4">
        <View>
          <Text className="text-2xl font-bold text-slate-900">
            Settings ⚙️
          </Text>
          <Text className="text-sm text-slate-600">
            Manage your account and preferences
          </Text>
        </View>
        <View className="flex-row gap-2">
          <TouchableOpacity className="w-10 h-10 rounded-xl bg-blue-100 items-center justify-center">
            <Text style={{ fontSize: 20 }}>🔔</Text>
            <View className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            className="w-10 h-10 rounded-xl bg-slate-100 items-center justify-center"
          >
            <Text style={{ fontSize: 20 }}>☰</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-row gap-2">
        <TouchableOpacity
          onPress={() => setActiveTab("profile")}
          className={`flex-1 py-3 rounded-xl ${activeTab === "profile" ? "bg-blue-600" : "bg-slate-100"
            }`}
        >
          <Text
            className={`text-center font-semibold ${activeTab === "profile" ? "text-white" : "text-slate-700"
              }`}
          >
            👤 Profile
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab("notifications")}
          className={`flex-1 py-3 rounded-xl ${activeTab === "notifications" ? "bg-blue-600" : "bg-slate-100"
            }`}
        >
          <Text
            className={`text-center font-semibold ${activeTab === "notifications" ? "text-white" : "text-slate-700"
              }`}
          >
            🔔 Notifications
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab("security")}
          className={`flex-1 py-3 rounded-xl ${activeTab === "security" ? "bg-blue-600" : "bg-slate-100"
            }`}
        >
          <Text
            className={`text-center font-semibold ${activeTab === "security" ? "text-white" : "text-slate-700"
              }`}
          >
            🔒 Security
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}