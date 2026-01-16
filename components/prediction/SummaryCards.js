import React from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";

export default function SummaryCards({ selectedUtility }) {
  const { latestAmounts } = useSelector((state) => state.bills);
  const predictions = useSelector((state) => state.predictions);


  if (!selectedUtility) {
    return null; // or keep a placeholder card
  }

  const utilityId = selectedUtility.id;

  const currentAmount = latestAmounts?.[utilityId] || 0;

  const utilityPredictions = predictions?.[utilityId] || [];
  // const latestPrediction =
  //   utilityPredictions.length > 0
  //     ? utilityPredictions[utilityPredictions.length - 1]?.predictedCost || 0
  //     : 0;
  const latestPrediction =
    utilityPredictions.length > 0
      ? [...utilityPredictions].sort(
        (a, b) => new Date(b.predictedDate) - new Date(a.predictedDate)
      )[0]?.predictedCost || 0
      : 0;

  // const savings = Math.max(currentAmount - latestPrediction, 0);
  const difference = latestPrediction - currentAmount;

  let changeLabel = "No Change";
  let changeValue = 0;
  let changeColor = "text-slate-500";

  if (difference > 0) {
    changeLabel = "Expected Increase";
    changeValue = difference;
    changeColor = "text-red-500";
  } else if (difference < 0) {
    changeLabel = "Expected Savings";
    changeValue = Math.abs(difference);
    changeColor = "text-green-500";
  }

  const accuracy = predictions?.computedChanges?.[utilityId] || 0;

  const currentCardStyle = {
    backgroundColor: selectedUtility.backgroundColor,
    borderColor: selectedUtility.borderColor,
  };

  return (
    <View className="pb-2 mb-2">
      <View className="flex-row gap-3 mb-3">

        {/* Current Bill */}
        <View className="flex-1 rounded-2xl p-4 border" style={currentCardStyle}>
          <View className="flex-row items-start justify-between mb-2">
            <Text className="text-2xl">📊</Text>
            <View className="px-2 py-1 rounded-full bg-white/70">
              <Text className="text-xs font-semibold text-slate-700">
                Current
              </Text>
            </View>
          </View>

          <Text className="text-xl font-bold text-slate-900">
            ₱{currentAmount.toLocaleString()}
          </Text>
          <Text className="text-xs text-slate-600">This Month</Text>
        </View>

        {/* Predicted */}
        <View className="flex-1 bg-white rounded-2xl p-4 border border-slate-200">
          <View className="flex-row items-start justify-between mb-2">
            <Text className="text-2xl">🔮</Text>
            <Text className="text-xs font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
              Predicted
            </Text>
          </View>

          <Text className="text-xl font-bold text-black">
            ₱{latestPrediction.toLocaleString()}
          </Text>
          <Text className="text-xs text-slate-400">Next Month</Text>
        </View>
      </View>

      <View className="flex-row gap-3">
        {/* Savings */}
        <View className="flex-1 bg-white rounded-2xl p-4 border border-slate-200">
          <View className="flex-row items-start justify-between mb-2">
            <Text className="text-2xl">💰</Text>
            <Text className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              Savings
            </Text>
          </View>

          {/* <Text className="text-xl font-bold text-green-500">
            ₱{savings.toLocaleString()}
          </Text>
          <Text className="text-xs text-slate-400">Expected Increase</Text> */}
          <Text className={`text-xl font-bold ${changeColor}`}>
            ₱{changeValue.toLocaleString()}
          </Text>
          <Text className="text-xs text-slate-400">
            {changeLabel}
          </Text>

        </View>

        {/* Accuracy */}
        <View className="flex-1 bg-white rounded-2xl p-4 border border-slate-200">
          <View className="flex-row items-start justify-between mb-2">
            <Text className="text-2xl">🎯</Text>
            <Text className="text-xs font-semibold text-green-700 bg-green-300 px-3 py-1 rounded-full">
              Accuracy
            </Text>
          </View>

          <Text className="text-xl font-bold text-blue-600">
            {accuracy}%
          </Text>
          <Text className="text-xs text-slate-400">Confidence Level</Text>
        </View>
      </View>
    </View>
  );
}
