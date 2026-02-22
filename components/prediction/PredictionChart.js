import React, { useState, useMemo } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useSelector } from "react-redux";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const monthMap = {
  'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
  'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
};

// Fixed predicted bar color — dark charcoal/grey
const PREDICTED_COLOR = "#475569";

export default function PredictionChart({ selectedUtility, bills = [] }) {
  // { type: 'actual' | 'predicted', monthIdx, value } — null when nothing selected
  const [activeBar, setActiveBar] = useState(null);

  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);

  const predictions = useSelector((state) => state.predictions);

  const utilityId = selectedUtility?.id || null;

  const utilityColor = selectedUtility?.borderColor || "#1e293b";
  const currentCardStyle = selectedUtility
    ? { backgroundColor: selectedUtility.borderColor, borderColor: selectedUtility.borderColor }
    : { backgroundColor: "#1e293b1a", borderColor: "#1e293b" };

  const availableYears = useMemo(() => {
    const years = new Set();
    years.add(currentYear);
    bills.forEach(bill => {
      if (bill.date) {
        const parts = bill.date.split(' ');
        const year = parseInt(parts[1] || parts[0]);
        if (!isNaN(year)) years.add(year);
      }
    });
    const utilityPredictions = predictions?.[utilityId] || [];
    utilityPredictions.forEach(p => {
      if (p.predictedDate) {
        const year = new Date(p.predictedDate).getFullYear();
        if (!isNaN(year)) years.add(year);
      }
    });
    return [...years].sort((a, b) => b - a);
  }, [bills, predictions, utilityId, currentYear]);

  const historicalByMonth = useMemo(() => {
    if (!utilityId || !bills || bills.length === 0) return {};
    const map = {};
    bills
      .filter(bill => bill.amount != null && bill.date)
      .forEach(bill => {
        const [monthName, yearStr] = bill.date.split(' ');
        const year = parseInt(yearStr);
        if (year !== selectedYear) return;
        const monthIdx = monthMap[monthName];
        if (monthIdx !== undefined) map[monthIdx] = bill.amount;
      });
    return map;
  }, [bills, utilityId, selectedYear]);

  const predictedByMonth = useMemo(() => {
    if (!utilityId || !predictions) return {};
    const map = {};
    const utilityPredictions = predictions[utilityId] || [];
    utilityPredictions
      .filter(p => p.predictedCost != null && p.predictedDate)
      .forEach(p => {
        const date = new Date(p.predictedDate);
        if (date.getFullYear() !== selectedYear) return;
        map[date.getMonth()] = p.predictedCost;
      });
    return map;
  }, [predictions, utilityId, selectedYear]);

  const allValues = [
    ...Object.values(historicalByMonth),
    ...Object.values(predictedByMonth),
  ];
  const rawMax = allValues.length ? Math.max(...allValues) : 1000;

  let maxValue;
  if (rawMax <= 2000) maxValue = Math.ceil(rawMax / 500) * 500;
  else if (rawMax <= 5000) maxValue = Math.ceil(rawMax / 1000) * 1000;
  else maxValue = Math.ceil(rawMax / 2000) * 2000;
  if (maxValue === 0) maxValue = 1000;

  const yAxisStep = maxValue / 6;
  const yAxisLabels = Array.from({ length: 7 }, (_, i) => {
    const val = Math.round(yAxisStep * (6 - i));
    return val >= 1000 ? `₱${(val / 1000).toFixed(1)}k` : `₱${val}`;
  });

  const handleBarPress = (type, monthIdx, value) => {
    if (!value) return;
    if (activeBar?.type === type && activeBar?.monthIdx === monthIdx) {
      setActiveBar(null);
    } else {
      setActiveBar({ type, monthIdx, value });
    }
  };

  // Clear active bar on year change
  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setYearDropdownOpen(false);
    setActiveBar(null);
  };

  if (!utilityId) return <View className="p-5"><Text>Select a utility to see chart</Text></View>;

  const activeMonthLabel = activeBar != null ? MONTHS[activeBar.monthIdx] : null;
  const activeIsActual = activeBar?.type === 'actual';

  return (
    <View className="bg-white rounded-2xl border border-slate-200 p-3 mb-2">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <View>
          <Text className="text-xl font-bold text-slate-900">Prediction Timeline</Text>
          <Text className="text-sm text-slate-500">AI-powered forecast</Text>
        </View>

        {/* Year Dropdown */}
        <View style={{ position: 'relative', zIndex: 100 }}>
          <TouchableOpacity
            onPress={() => setYearDropdownOpen(!yearDropdownOpen)}
            className="flex-row items-center bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 gap-1"
          >
            <Text className="text-sm font-semibold text-slate-700">{selectedYear}</Text>
            <Text className="text-slate-500 text-xs">{yearDropdownOpen ? '▲' : '▼'}</Text>
          </TouchableOpacity>

          {yearDropdownOpen && (
            <View
              className="absolute bg-white border border-slate-200 rounded-xl shadow-lg"
              style={{ top: 40, right: 0, minWidth: 90, zIndex: 999 }}
            >
              {availableYears.map(year => (
                <TouchableOpacity
                  key={year}
                  onPress={() => handleYearSelect(year)}
                  className={`px-4 py-2.5 ${year === selectedYear ? 'bg-blue-50' : ''}`}
                >
                  <Text className={`text-sm font-medium ${year === selectedYear ? 'text-blue-600' : 'text-slate-700'}`}>
                    {year}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      {/* Legend */}
      <View className="flex-row gap-4 mb-3">
        <View className="flex-row items-center gap-2">
          <View className="w-4 h-4 rounded border" style={currentCardStyle} />
          <Text className="text-sm font-medium text-slate-700">Actual</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <View className="w-4 h-4 rounded" style={{ backgroundColor: PREDICTED_COLOR }} />
          <Text className="text-sm font-medium text-slate-700">Predicted</Text>
        </View>
      </View>

      {/* ── Active Bar Tooltip Banner (BillsTrendsChart style) ── */}
      {activeBar ? (
        <View
          className="rounded-xl px-4 py-2.5 mb-3 flex-row items-center justify-between"
          style={{
            backgroundColor: activeIsActual ? utilityColor + "18" : PREDICTED_COLOR + "18",
            borderWidth: 1,
            borderColor: activeIsActual ? utilityColor + "44" : PREDICTED_COLOR + "44",
          }}
        >
          <View className="flex-row items-center gap-2">
            <View
              className="w-2.5 h-2.5 rounded-sm"
              style={{ backgroundColor: activeIsActual ? utilityColor : PREDICTED_COLOR }}
            />
            <Text className="text-xs font-semibold text-slate-700">
              {activeIsActual ? "Actual" : "Predicted"} — {activeMonthLabel} {selectedYear}
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Text
              className="text-sm font-bold"
              style={{ color: activeIsActual ? utilityColor : PREDICTED_COLOR }}
            >
              ₱{activeBar.value.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Text>
            <TouchableOpacity onPress={() => setActiveBar(null)}>
              <Text className="text-slate-400 text-xs">✕</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View className="mb-3 h-5 items-center justify-center">
          <Text className="text-xs text-slate-300 italic">Tap a bar to see amount</Text>
        </View>
      )}

      {/* Chart */}
      <View className="border-b border-l border-slate-200">
        <View className="flex-row">
          {/* Y Axis */}
          <View className="justify-between py-2 pr-2 w-12">
            {yAxisLabels.map((label, idx) => (
              <Text key={idx} className="text-xs text-slate-500">{label}</Text>
            ))}
          </View>

          {/* Bars */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row items-end px-1" style={{ height: 256, minWidth: 600 }}>
              {MONTHS.map((monthLabel, monthIdx) => {
                const actualVal = historicalByMonth[monthIdx];
                const predictedVal = predictedByMonth[monthIdx];

                const actualHeight = actualVal ? Math.max((actualVal / maxValue) * 100, 1) : 0;
                const predictedHeight = predictedVal ? Math.max((predictedVal / maxValue) * 100, 1) : 0;

                const isActualActive = activeBar?.type === 'actual' && activeBar?.monthIdx === monthIdx;
                const isPredActive = activeBar?.type === 'predicted' && activeBar?.monthIdx === monthIdx;

                return (
                  <View key={monthIdx} className="items-center" style={{ width: 44, marginHorizontal: 3 }}>
                    <View className="flex-row items-end gap-0.5" style={{ height: 224 }}>

                      {/* Actual bar */}
                      <View style={{ width: 18, height: '100%', justifyContent: 'flex-end' }}>
                        {actualVal != null && (
                          <TouchableOpacity
                            onPress={() => handleBarPress('actual', monthIdx, actualVal)}
                            activeOpacity={0.7}
                            hitSlop={{ top: 6, bottom: 6, left: 3, right: 3 }}
                            style={{
                              width: '100%',
                              height: `${actualHeight}%`,
                              minHeight: 4,
                            }}
                          >
                            <View
                              style={{
                                flex: 1,
                                borderTopLeftRadius: 5,
                                borderTopRightRadius: 5,
                                backgroundColor: utilityColor,
                                opacity: isActualActive ? 1 : 0.75,
                                transform: isActualActive ? [{ scaleX: 1.15 }] : [],
                                borderWidth: isActualActive ? 1.5 : 0,
                                borderColor: isActualActive ? "#fff" : "transparent",
                              }}
                            />
                          </TouchableOpacity>
                        )}
                      </View>

                      {/* Predicted bar — fixed charcoal grey, no gradient */}
                      <View style={{ width: 18, height: '100%', justifyContent: 'flex-end' }}>
                        {predictedVal != null && (
                          <TouchableOpacity
                            onPress={() => handleBarPress('predicted', monthIdx, predictedVal)}
                            activeOpacity={0.7}
                            hitSlop={{ top: 6, bottom: 6, left: 3, right: 3 }}
                            style={{
                              width: '100%',
                              height: `${predictedHeight}%`,
                              minHeight: 4,
                            }}
                          >
                            <View
                              style={{
                                flex: 1,
                                borderTopLeftRadius: 5,
                                borderTopRightRadius: 5,
                                backgroundColor: PREDICTED_COLOR,
                                opacity: isPredActive ? 1 : 0.65,
                                transform: isPredActive ? [{ scaleX: 1.15 }] : [],
                                borderWidth: isPredActive ? 1.5 : 0,
                                borderColor: isPredActive ? "#fff" : "transparent",
                              }}
                            />
                          </TouchableOpacity>
                        )}
                      </View>

                    </View>

                    {/* Month Label */}
                    <Text
                      className="text-xs font-semibold mt-1"
                      style={{
                        color: activeBar?.monthIdx === monthIdx ? "#475569" : "#94a3b8",
                      }}
                    >
                      {monthLabel}
                    </Text>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}