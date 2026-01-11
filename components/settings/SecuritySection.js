import React from "react";
import { View, Text, ScrollView, Switch } from "react-native";

const securityItems = [
  {
    key: "twoFactorAuth",
    icon: "🔐",
    title: "Two-Factor Authentication",
    description: "Add extra layer of security",
  },
  {
    key: "biometricLogin",
    icon: "👆",
    title: "Biometric Login",
    description: "Use fingerprint or face recognition",
  },
];

const privacyItems = [
  {
    key: "shareUsageData",
    icon: "📊",
    title: "Share Usage Data",
    description: "Help improve predictions with anonymized data",
  },
];

export default function SecuritySection({ privacySettings, setPrivacySettings }) {
  const handleChange = (key, value) => {
    setPrivacySettings({
      ...privacySettings,
      [key]: value,
    });
  };

  return (
    <ScrollView className="flex-1 bg-slate-50">
      <View className="p-4 space-y-4 ">
        {/* Security Settings */}
        <View className="bg-white rounded-2xl border border-slate-200 p-6 mb-3">
          <Text className="text-lg font-bold text-slate-900 mb-4">
            Security Settings
          </Text>

          <View className="space-y-4">
            {securityItems.map((item, index) => (
              <View
                key={item.key}
                className={`flex-row items-center justify-between py-4 ${
                  index !== securityItems.length - 1
                    ? "border-b border-slate-100"
                    : ""
                }`}
              >
                <View className="flex-row items-center flex-1">
                  <View className="w-12 h-12 rounded-xl bg-green-50 items-center justify-center mr-4">
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
                  value={privacySettings[item.key]}
                  onValueChange={(value) => handleChange(item.key, value)}
                  trackColor={{ false: "#cbd5e1", true: "#10b981" }}
                  thumbColor={privacySettings[item.key] ? "#ffffff" : "#f1f5f9"}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Privacy Settings */}
        <View className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
          <Text className="text-lg font-bold text-slate-900 mb-4">
            Privacy Settings
          </Text>

          <View className="space-y-4">
            {privacyItems.map((item) => (
              <View
                key={item.key}
                className="flex-row items-center justify-between py-4"
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
                  value={privacySettings[item.key]}
                  onValueChange={(value) => handleChange(item.key, value)}
                  trackColor={{ false: "#cbd5e1", true: "#3b82f6" }}
                  thumbColor={privacySettings[item.key] ? "#ffffff" : "#f1f5f9"}
                />
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}