import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

export default function SettingsHeader({ activeTab, setActiveTab }) {
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
        <TouchableOpacity className="w-10 h-10 rounded-xl bg-slate-100 items-center justify-center">
          <Ionicons name="settings-outline" size={20} color="#475569" />
        </TouchableOpacity>
      </View>
      
      <View className="flex-row gap-2">
        <TouchableOpacity
          onPress={() => setActiveTab("profile")}
          className={`flex-1 py-3 rounded-xl ${
            activeTab === "profile" ? "bg-blue-600" : "bg-slate-100"
          }`}
        >
          <Text
            className={`text-center font-semibold ${
              activeTab === "profile" ? "text-white" : "text-slate-700"
            }`}
          >
            👤 Profile
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => setActiveTab("notifications")}
          className={`flex-1 py-3 rounded-xl ${
            activeTab === "notifications" ? "bg-blue-600" : "bg-slate-100"
          }`}
        >
          <Text
            className={`text-center font-semibold ${
              activeTab === "notifications" ? "text-white" : "text-slate-700"
            }`}
          >
            🔔 Notifications
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => setActiveTab("security")}
          className={`flex-1 py-3 rounded-xl ${
            activeTab === "security" ? "bg-blue-600" : "bg-slate-100"
          }`}
        >
          <Text
            className={`text-center font-semibold ${
              activeTab === "security" ? "text-white" : "text-slate-700"
            }`}
          >
            🔒 Security
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}