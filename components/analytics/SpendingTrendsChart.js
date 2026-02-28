import React, { useState, useMemo } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

const CATEGORIES = [
  { key: "water",         label: "Water",       color: "#3b82f6" },
  { key: "electricity",   label: "Electricity", color: "#f59e0b" },
  { key: "miscellaneous", label: "Misc",        color: "#f97316" },
  { key: "transport",     label: "Transport",   color: "#6b7280" },
  { key: "groceries",     label: "Groceries",   color: "#10b981" },
  { key: "kitchenGas",    label: "Kitchen Gas", color: "#ef4444" },
];

const ALL_MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function SpendingTrendsChart({ spendingData = [] }) {
  const [activeBar, setActiveBar] = useState(null); // { monthIdx, category, value }

  const availableYears = useMemo(() => {
    const years = new Set(spendingData.map((d) => d.year).filter(Boolean));
    if (years.size === 0) years.add(new Date().getFullYear());
    return [...years].sort((a, b) => b - a);
  }, [spendingData]);

  const [selectedYear, setSelectedYear] = useState(() => availableYears[0]);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);

  // Jan–Dec fixed grid for selected year
  const chartData = useMemo(() => {
    return ALL_MONTHS.map((month, idx) => {
      const found = spendingData.find(
        (d) => d.year === selectedYear && d.monthIndex === idx
      );
      return {
        month,
        water:         found?.water         || 0,
        electricity:   found?.electricity   || 0,
        miscellaneous: found?.miscellaneous || 0,
        transport:     found?.transport     || 0,
        groceries:     found?.groceries     || 0,
        kitchenGas:    found?.kitchenGas    || 0,
      };
    });
  }, [spendingData, selectedYear]);

  const maxValue = useMemo(() => {
    const totals = chartData.map((d) =>
      CATEGORIES.reduce((sum, c) => sum + (d[c.key] || 0), 0)
    );
    const raw = Math.max(...totals, 1);
    if (raw <= 2000) return Math.ceil(raw / 500) * 500;
    if (raw <= 5000) return Math.ceil(raw / 1000) * 1000;
    return Math.ceil(raw / 2000) * 2000;
  }, [chartData]);

  const yAxisSteps = 6;
  const yAxisLabels = Array.from({ length: yAxisSteps + 1 }, (_, i) => {
    const val = Math.round((maxValue / yAxisSteps) * (yAxisSteps - i));
    return val >= 1000 ? `₱${(val / 1000).toFixed(1)}k` : `₱${val}`;
  });

  const handleBarPress = (monthIdx, category, value) => {
    if (!value) return;
    if (activeBar?.monthIdx === monthIdx && activeBar?.category === category) {
      setActiveBar(null);
    } else {
      setActiveBar({ monthIdx, category, value });
    }
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setYearDropdownOpen(false);
    setActiveBar(null);
  };

  const activeCat = activeBar
    ? CATEGORIES.find((c) => c.key === activeBar.category)
    : null;

  return (
    <View className="bg-white rounded-2xl border border-slate-200 p-3 mb-2 mx-4">

      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <View>
          <Text className="text-xl font-bold text-slate-900">Spending Trends</Text>
          <Text className="text-sm text-slate-500">Monthly by category</Text>
        </View>

        {/* Year Dropdown */}
        <View style={{ position: "relative", zIndex: 100 }}>
          <TouchableOpacity
            onPress={() => setYearDropdownOpen(!yearDropdownOpen)}
            className="flex-row items-center bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 gap-1"
          >
            <Text className="text-sm font-semibold text-slate-700">{selectedYear}</Text>
            <Text className="text-slate-500 text-xs ml-1">{yearDropdownOpen ? "▲" : "▼"}</Text>
          </TouchableOpacity>

          {yearDropdownOpen && (
            <View
              className="absolute bg-white border border-slate-200 rounded-xl shadow-lg"
              style={{ top: 40, right: 0, minWidth: 90, zIndex: 999 }}
            >
              {availableYears.map((year) => (
                <TouchableOpacity
                  key={year}
                  onPress={() => handleYearSelect(year)}
                  className={`px-4 py-2.5 ${year === selectedYear ? "bg-blue-50" : ""}`}
                >
                  <Text className={`text-sm font-medium ${year === selectedYear ? "text-blue-600" : "text-slate-700"}`}>
                    {year}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      {/* Tooltip Banner */}
      {activeBar ? (() => {
        const monthData = chartData[activeBar.monthIdx];
        const monthTotal = CATEGORIES.reduce((sum, c) => sum + (monthData[c.key] || 0), 0);
        return (
          <View
            className="rounded-xl px-4 py-3 mb-3"
            style={{
              backgroundColor: activeCat.color + "18",
              borderWidth: 1,
              borderColor: activeCat.color + "44",
            }}
          >
            {/* Row 1: category + amount + dismiss */}
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <View className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: activeCat.color }} />
                <Text className="text-xs font-semibold text-slate-700">
                  {activeCat.label} — {ALL_MONTHS[activeBar.monthIdx]} {selectedYear}
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Text className="text-sm font-bold" style={{ color: activeCat.color }}>
                  ₱{activeBar.value.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Text>
                <TouchableOpacity onPress={() => setActiveBar(null)}>
                  <Text className="text-slate-400 text-xs">✕</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Divider */}
            <View className="border-t border-slate-200 my-2" style={{ borderColor: activeCat.color + "33" }} />

            {/* Row 2: month total */}
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <View className="w-2.5 h-2.5 rounded-sm bg-slate-400" />
                <Text className="text-xs text-slate-500">
                  Total — {ALL_MONTHS[activeBar.monthIdx]} {selectedYear}
                </Text>
              </View>
              <Text className="text-sm font-bold text-slate-700">
                ₱{monthTotal.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Text>
            </View>
          </View>
        );
      })() : (
        <View className="mb-3 h-5 items-center justify-center">
          <Text className="text-xs text-slate-300 italic">Tap a bar to see amount</Text>
        </View>
      )}

      {/* Chart */}
      <View className="border-b border-l border-slate-200">
        <View className="flex-row">

          {/* Y-axis labels */}
          <View className="justify-between py-2 pr-2 w-12">
            {yAxisLabels.map((label, idx) => (
              <Text key={idx} className="text-xs text-slate-500">{label}</Text>
            ))}
          </View>

          {/* Bars */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row items-end px-1" style={{ height: 256, minWidth: 600 }}>
              {chartData.map((monthData, monthIdx) => {
                const total = CATEGORIES.reduce((sum, c) => sum + (monthData[c.key] || 0), 0);

                return (
                  <View
                    key={monthIdx}
                    className="items-center"
                    style={{ width: 44, marginHorizontal: 3 }}
                  >
                    {/* Stacked bar — flex-col-reverse so first category sits at bottom */}
                    <View
                      style={{
                        height: 224,
                        width: 28,
                        justifyContent: "flex-end",
                        flexDirection: "column",
                      }}
                    >
                      {total > 0 ? (
                        [...CATEGORIES].reverse().map((cat) => {
                          const value = monthData[cat.key] || 0;
                          if (value === 0) return null;

                          const heightPct = (value / maxValue) * 100;
                          const isActive =
                            activeBar?.monthIdx === monthIdx &&
                            activeBar?.category === cat.key;

                          return (
                            <TouchableOpacity
                              key={cat.key}
                              onPress={() => handleBarPress(monthIdx, cat.key, value)}
                              activeOpacity={0.7}
                              style={{
                                width: "100%",
                                height: `${heightPct}%`,
                                minHeight: 3,
                                backgroundColor: cat.color,
                                opacity: activeBar === null || isActive ? 1 : 0.35,
                              }}
                            />
                          );
                        })
                      ) : (
                        // Empty month placeholder
                        <View
                          style={{
                            width: "100%",
                            height: 4,
                            backgroundColor: "#e2e8f0",
                            borderRadius: 2,
                          }}
                        />
                      )}
                    </View>

                    {/* Month label */}
                    <Text
                      className="text-xs font-semibold mt-1"
                      style={{
                        color: activeBar?.monthIdx === monthIdx ? "#475569" : "#94a3b8",
                      }}
                    >
                      {monthData.month}
                    </Text>
                  </View>
                );
              })}
            </View>
          </ScrollView>

        </View>
      </View>

      {/* Legend */}
      <View className="flex-row flex-wrap mt-4" style={{ gap: 8 }}>
        {CATEGORIES.map((cat) => (
          <View key={cat.key} className="flex-row items-center" style={{ gap: 5 }}>
            <View style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: cat.color }} />
            <Text className="text-xs text-slate-600">{cat.label}</Text>
          </View>
        ))}
      </View>

    </View>
  );
}