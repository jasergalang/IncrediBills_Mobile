import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function AIAction({ 
  setShowSaveModal, 
  setShowThresholdModal 
}) {
  return (
      <View className="mb-6 rounded-2xl overflow-hidden">
      {/* Rounded container clips the gradient */}
      <LinearGradient
        colors={["#4f46e5", "#9333ea"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="p-4"
      >
        {/* Header */}
        <Text className="text-white font-bold text-2xl mb-3 text-center">
          Take Action on Your Predictions
        </Text>
        <Text className="text-white/90 text-sm mb-6 text-center leading-5">
          Save your predictions, set up alerts, or explore more scenarios to optimize your utility costs
        </Text>

        {/* Save Prediction Button - Full Width */}
        <TouchableOpacity
          onPress={() => setShowSaveModal(true)}
          className="bg-white px-6 py-3 rounded-xl mb-4"
        >
          <Text className="text-indigo-600 font-semibold text-base text-center">
            💾 Save Prediction
          </Text>
        </TouchableOpacity>

        {/* Two Buttons in Row */}
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={() => setShowThresholdModal(true)}
            className="bg-white/20 px-4 py-3 rounded-lg flex-1 flex-row items-center justify-center"
          >
            <Text className="text-white font-semibold text-base text-center">
              🔔 Set Alert
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-white/20 px-4 py-3 rounded-lg flex-1 flex-row items-center justify-center"
          >
            <Text className="text-white font-semibold text-base text-center">
              📧 Email Report
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}