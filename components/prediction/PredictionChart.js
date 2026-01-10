import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function PredictionChart() {
  const historical = [
    { month: "Oct", actual: 2500 },
    { month: "Nov", actual: 2800 },
    { month: "Dec", actual: 3000 },
  ];

  const forecast = [
    { month: "Jan", predicted: 3200, lower: 3000, upper: 3400 },
    { month: "Feb", predicted: 3100, lower: 2900, upper: 3300 },
  ];

  const maxValue = 4000;

  return (
    <View className="bg-white rounded-2xl border border-slate-200 p-4 mb-6">
      <Text className="text-lg font-bold text-slate-900 mb-2">
        Prediction Timeline
      </Text>
      <Text className="text-sm text-slate-600 mb-4">
        AI-powered forecast with confidence interval
      </Text>

      <View className="flex-row justify-between h-48 relative">
        {/* Historical bars */}
        {historical.map((data, index) => {
          const height = (data.actual / maxValue) * 100;
          return (
            <View key={index} className="flex-1 items-center mx-1">
              <LinearGradient
                colors={["#1e293b", "#334155"]} // dark slate gradient
                style={{ height: `${height}%`, width: "100%", borderTopLeftRadius: 6, borderTopRightRadius: 6 }}
              />
              <Text className="text-xs font-semibold mt-1">{data.month}</Text>
            </View>
          );
        })}

        {/* Forecast bars */}
        {forecast.map((data, index) => {
          const predictedHeight = (data.predicted / maxValue) * 100;
          const lowerHeight = (data.lower / maxValue) * 100;
          const upperHeight = (data.upper / maxValue) * 100;

          return (
            <View key={index} className="flex-1 items-center mx-1 relative">
              {/* Confidence interval */}
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  height: `${upperHeight}%`,
                  backgroundColor: "rgba(191, 219, 254, 0.3)", // light blue
                  borderTopLeftRadius: 6,
                  borderTopRightRadius: 6,
                }}
              />
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  height: `${lowerHeight}%`,
                  backgroundColor: "rgba(191, 219, 254, 0.3)", // light blue
                  borderTopLeftRadius: 6,
                  borderTopRightRadius: 6,
                }}
              />
              {/* Predicted bar */}
              <LinearGradient
                colors={["#3b82f6", "#60a5fa"]} // blue gradient
                style={{
                  height: `${predictedHeight}%`,
                  width: "100%",
                  borderTopLeftRadius: 6,
                  borderTopRightRadius: 6,
                }}
              />
              <Text className="text-xs font-semibold mt-1">{data.month}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
