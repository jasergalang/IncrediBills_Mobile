import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function AnomalyAlerts({ anomalies }) {
  if (!anomalies || anomalies.length === 0) return null;
  return (
    <View className="px-4 pb-4">
      <LinearGradient
        colors={["#fef2f2", "#fee2e2"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-2xl p-4 border-2 border-red-200"
      >
        <View className="flex-row items-center gap-2 mb-3">
          <View className="w-10 h-10 bg-red-500 rounded-xl items-center justify-center">
            <Text className="text-xl">⚠️</Text>
          </View>
          <View className="flex-1">
            <Text className="font-bold text-slate-900">
              {anomalies.length} Anomalies Detected
            </Text>
            <Text className="text-xs text-slate-600">
              Unusual spending patterns
            </Text>
          </View>
        </View>
        {anomalies.map((anomaly, idx) => (
          <View
            key={idx}
            className="bg-white rounded-xl p-3 mb-2 border-l-4 border-red-500"
          >
            <View className="flex-row items-center gap-3">
              <Text className="text-2xl">{anomaly.icon}</Text>
              <View className="flex-1">
                <Text className="font-bold text-slate-900 text-sm">
                  {anomaly.category}
                </Text>
                <Text className="text-xs text-slate-600">
                  Normal: ₱{anomaly.normal} → Actual: ₱{anomaly.actual}
                </Text>
              </View>
              <View
                className={`px-2 py-1 rounded-full ${
                  anomaly.severity === "high" ? "bg-red-100" : "bg-amber-100"
                }`}
              >
                <Text
                  className={`text-xs font-bold ${
                    anomaly.severity === "high"
                      ? "text-red-700"
                      : "text-amber-700"
                  }`}
                >
                  {anomaly.severity === "high" ? "🔴" : "🟡"}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </LinearGradient>
    </View>
  );
}
