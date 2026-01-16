import React, { useState, useMemo } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";

export default function PredictionChart({ selectedUtility, onSavePress, onAlertPress, bills = [] }) {
  const [hoveredBar, setHoveredBar] = useState(null);

  const predictions = useSelector((state) => state.predictions);
  const { latestAmounts } = useSelector((state) => state.bills);

  const utilityId = selectedUtility?.id || null;
  const currentAmount = utilityId ? latestAmounts?.[utilityId] || 0 : 0;

  const monthMap = {
    'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
    'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
  };

  const historicalData = useMemo(() => {
    if (!utilityId || !bills || bills.length === 0) return [];

    const utilityBills = bills
      .filter(bill => bill.amount != null && bill.date)
      .sort((a, b) => {
        const [monthA, yearA] = a.date.split(' ');
        const [monthB, yearB] = b.date.split(' ');
        const dateA = new Date(parseInt(yearA), monthMap[monthA] || 0);
        const dateB = new Date(parseInt(yearB), monthMap[monthB] || 0);
        return dateA - dateB;
      })
      .slice(-6);

    return utilityBills.map(bill => {
      const [monthName, year] = bill.date.split(' ');
      const monthNum = monthMap[monthName] || 0;
      const date = new Date(parseInt(year), monthNum);

      return {
        month: date.toLocaleString("default", { month: "short" }),
        actual: bill.amount,
        date: bill.date,
      };
    });
  }, [bills, utilityId]);

  const forecastData = useMemo(() => {
    if (!utilityId || !predictions) return [];

    const utilityPredictions = predictions[utilityId] || [];
    const futurePreds = utilityPredictions
      .filter(p => p.predictedCost != null && p.predictedDate)
      .sort((a, b) => new Date(a.predictedDate) - new Date(b.predictedDate))
      .slice(0, 1); // Only take the next month

    if (futurePreds.length === 0) return [];

    return futurePreds.map(p => ({
      month: new Date(p.predictedDate).toLocaleString("default", { month: "short" }),
      predicted: p.predictedCost,
      date: p.predictedDate
    }));
  }, [predictions, utilityId]);

  const allValues = [...historicalData.map(d => d.actual), ...forecastData.map(d => d.predicted)];
  const rawMax = allValues.length ? Math.max(...allValues) : 1000;

  let maxValue;
  if (rawMax <= 2000) {
    maxValue = Math.ceil(rawMax / 500) * 500;
  } else if (rawMax <= 5000) {
    maxValue = Math.ceil(rawMax / 1000) * 1000;
  } else {
    maxValue = Math.ceil(rawMax / 2000) * 2000;
  }

  const yAxisStep = maxValue / 6;
  const yAxisLabels = Array.from({ length: 7 }, (_, i) => {
    const val = Math.round(yAxisStep * (6 - i));
    return val >= 1000 ? `₱${(val / 1000).toFixed(1)}k` : `₱${val}`;
  });

  const currentCategory = {
    name: selectedUtility?.name || "Utility",
    current: currentAmount,
    predicted: forecastData.length > 0 ? forecastData[0].predicted : currentAmount,
  };

  if (!utilityId) return <View className="p-5"><Text>Select a utility to see chart</Text></View>;

  return (
    <View className="bg-white rounded-2xl border border-slate-200 p-5 mb-6">
      <View className="mb-5">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-1">
            <Text className="text-xl font-bold text-slate-900 mb-1">Prediction Timeline</Text>
            <Text className="text-sm text-slate-600">AI-powered forecast</Text>
          </View>
        </View>

        <View className="flex-row gap-2 mb-4">
          <TouchableOpacity onPress={onSavePress} className="flex-1 bg-blue-100 rounded-xl py-2.5 px-4">
            <Text className="text-blue-700 font-semibold text-sm text-center">💾 Save Prediction</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onAlertPress} className="flex-1 bg-amber-100 rounded-xl py-2.5 px-4">
            <Text className="text-amber-700 font-semibold text-sm text-center">🔔 Set Alert</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-row flex-wrap gap-4 mb-5">
        <View className="flex-row items-center gap-2">
          <View className="w-4 h-4 bg-slate-800 rounded" />
          <Text className="text-sm font-medium text-slate-700">Actual</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <View className="w-4 h-4 bg-blue-500 rounded" />
          <Text className="text-sm font-medium text-slate-700">Predicted</Text>
        </View>
      </View>

      <View className="border-b border-l border-slate-200 mb-5">
        <View className="flex-row">
          <View className="justify-between py-2 pr-2 w-12">
            {yAxisLabels.map((label, idx) => (
              <Text key={idx} className="text-xs text-slate-500">{label}</Text>
            ))}
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row items-end h-64 px-1 relative" style={{ minWidth: 400 }}>
              {historicalData.map((d, i) => {
                const height = ((d.actual / maxValue) * 100);
                const isHovered = hoveredBar === `hist-${i}`;
                return (
                  <View key={i} className="flex-1 items-center mx-1 min-w-[50px] relative">
                    <TouchableOpacity
                      onPressIn={() => setHoveredBar(`hist-${i}`)}
                      onPressOut={() => setHoveredBar(null)}
                      className="w-full items-center"
                      style={{ height: '100%', justifyContent: 'flex-end' }}
                    >
                      {isHovered && (
                        <View className="absolute bottom-full mb-2 bg-slate-900 rounded-lg px-3 py-2 z-50 shadow-lg" style={{ minWidth: 120 }}>
                          <Text className="text-white font-bold text-xs mb-1">{d.month}</Text>
                          <Text className="text-white text-xs">Actual: ₱{d.actual.toLocaleString()}</Text>
                          <View className="absolute -bottom-1 left-1/2 -ml-1 w-2 h-2 bg-slate-900" style={{ transform: [{ rotate: '45deg' }] }} />
                        </View>
                      )}
                      <LinearGradient
                        colors={isHovered ? ["#0f172a", "#1e293b"] : ["#1e293b", "#475569"]}
                        style={{ height: `${height}%`, width: "100%", borderTopLeftRadius: 6, borderTopRightRadius: 6, minHeight: 4 }}
                      />
                    </TouchableOpacity>
                    <Text className="text-xs font-semibold text-slate-600 mt-2">{d.month}</Text>
                  </View>
                );
              })}

              {forecastData.map((d, i) => {
                const height = ((d.predicted / maxValue) * 100);
                const isHovered = hoveredBar === `pred-${i}`;
                return (
                  <View key={i} className="flex-1 items-center mx-1 min-w-[50px] relative">
                    <TouchableOpacity
                      onPressIn={() => setHoveredBar(`pred-${i}`)}
                      onPressOut={() => setHoveredBar(null)}
                      className="w-full items-center"
                      style={{ height: '100%', justifyContent: 'flex-end' }}
                    >
                      {isHovered && (
                        <View className="absolute bottom-full mb-2 bg-slate-900 rounded-lg px-3 py-2 z-50 shadow-lg" style={{ minWidth: 120 }}>
                          <Text className="text-white font-bold text-xs mb-1">{d.month}</Text>
                          <Text className="text-white text-xs">Predicted: ₱{d.predicted.toLocaleString()}</Text>
                          <View className="absolute -bottom-1 left-1/2 -ml-1 w-2 h-2 bg-slate-900" style={{ transform: [{ rotate: '45deg' }] }} />
                        </View>
                      )}
                      <LinearGradient
                        colors={isHovered ? ["#2563eb", "#3b82f6"] : ["#3b82f6", "#60a5fa"]}
                        style={{ height: `${height}%`, width: "100%", borderTopLeftRadius: 6, borderTopRightRadius: 6, minHeight: 4 }}
                      />
                    </TouchableOpacity>
                    <Text className="text-xs font-semibold text-blue-600 mt-2">{d.month}</Text>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>

      <LinearGradient colors={["#eff6ff", "#e0e7ff"]} className="rounded-xl p-4 border border-blue-200">
        <View className="flex-row gap-3">
          <Text className="text-2xl">🤖</Text>
          <View className="flex-1">
            <Text className="font-bold text-slate-900 mb-1">AI Analysis</Text>
            <Text className="text-sm text-slate-700 leading-5">
              Based on historical patterns and seasonal trends, your {currentCategory.name.toLowerCase()} costs are expected to {currentCategory.predicted > currentCategory.current ? "increase" : "decrease"}.
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}