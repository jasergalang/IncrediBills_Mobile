import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const CATEGORIES = [
  { key: "water",         label: "Water",       color: "#3b82f6" },
  { key: "electricity",   label: "Electricity", color: "#f59e0b" },
  { key: "kitchenGas",    label: "Kitchen Gas", color: "#f97316" },
  { key: "fuel",          label: "Fuel",        color: "#ef4444" },
  { key: "grocery",       label: "Grocery",     color: "#22c55e" },
  { key: "miscellaneous", label: "Misc",        color: "#a855f7" },
];

const BAR_MAX_HEIGHT = 110;

export default function BillsTrendsChart({ monthlyData = [], totalChange }) {
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 4 }, (_, i) => currentYear - 3 + i).reverse();

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // { monthIndex, catKey } — which bar is currently selected
  const [activeBar, setActiveBar] = useState(null);

  // Sync selectedYear to most recent year with data once data loads
  useEffect(() => {
    if (monthlyData.length > 0) {
      const years = monthlyData.map((d) => parseInt(d.month.split("-")[0]));
      setSelectedYear(Math.max(...years));
    }
  }, [monthlyData]);

  // Clear active bar when year changes
  useEffect(() => {
    setActiveBar(null);
  }, [selectedYear]);

  const chartData = useMemo(() => {
    return MONTHS.map((label, idx) => {
      const key = `${selectedYear}-${String(idx + 1).padStart(2, "0")}`;
      const found = monthlyData.find((d) => d.month === key);
      return {
        month: label,
        water:         found?.water         || 0,
        electricity:   found?.electricity   || 0,
        kitchenGas:    found?.kitchenGas    || 0,
        fuel:          found?.fuel          || 0,
        grocery:       found?.grocery       || 0,
        miscellaneous: found?.miscellaneous || 0,
      };
    });
  }, [monthlyData, selectedYear]);

  const maxValue = useMemo(() => {
    const all = chartData.flatMap((d) => CATEGORIES.map((c) => d[c.key] || 0));
    return Math.max(...all, 1);
  }, [chartData]);

  const getBarHeight = (value) =>
    value > 0 ? Math.max((value / maxValue) * BAR_MAX_HEIGHT, 5) : 2;

  const handleBarPress = (monthIndex, catKey, value) => {
    if (!value) return; // don't activate empty bars
    // Toggle off if tapping the same bar
    if (activeBar?.monthIndex === monthIndex && activeBar?.catKey === catKey) {
      setActiveBar(null);
    } else {
      setActiveBar({ monthIndex, catKey, value });
    }
  };

  // Find the category config for the active bar
  const activeCat = activeBar
    ? CATEGORIES.find((c) => c.key === activeBar.catKey)
    : null;

  return (
    <View className="bg-white rounded-2xl border border-slate-200 mx-4 p-4 mb-4">

      {/* ── Header ── */}
      <View className="flex-row items-center justify-between mb-3">
        <View>
          <Text className="text-lg font-bold text-slate-900">Bills Trends</Text>
          <Text className="text-xs text-slate-500 mt-0.5">
            Monthly spending by category
          </Text>
        </View>

        {/* Year dropdown trigger */}
        <TouchableOpacity
          onPress={() => setDropdownVisible(true)}
          className="flex-row items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-50 border border-indigo-100"
        >
          <Text className="text-indigo-700 font-bold text-sm">{selectedYear}</Text>
          <Text className="text-indigo-400 text-xs">▾</Text>
        </TouchableOpacity>
      </View>

      {/* ── Year Dropdown Modal ── */}
      <Modal
        visible={dropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <TouchableOpacity
          className="flex-1 bg-black/40"
          activeOpacity={1}
          onPress={() => setDropdownVisible(false)}
        >
          <View
            className="absolute right-6 bg-white rounded-2xl overflow-hidden border border-slate-200"
            style={{
              top: 185,
              minWidth: 130,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.12,
              shadowRadius: 16,
              elevation: 10,
            }}
          >
            {yearOptions.map((year, idx) => (
              <TouchableOpacity
                key={year}
                onPress={() => {
                  setSelectedYear(year);
                  setDropdownVisible(false);
                }}
                className={`px-5 py-3 ${
                  idx < yearOptions.length - 1 ? "border-b border-slate-100" : ""
                } ${year === selectedYear ? "bg-indigo-50" : "bg-white"}`}
              >
                <View className="flex-row items-center justify-between gap-3">
                  <Text
                    className={`text-sm font-semibold ${
                      year === selectedYear ? "text-indigo-700" : "text-slate-700"
                    }`}
                  >
                    {year}
                  </Text>
                  {year === currentYear && (
                    <Text className="text-xs text-slate-400">current</Text>
                  )}
                  {year === selectedYear && (
                    <Text className="text-indigo-500 text-xs">✓</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* ── Legend ── */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-3"
      >
        <View className="flex-row gap-3">
          {CATEGORIES.map((cat) => (
            <View key={cat.key} className="flex-row items-center gap-1.5">
              <View
                className="w-2.5 h-2.5 rounded-sm"
                style={{ backgroundColor: cat.color }}
              />
              <Text className="text-xs font-medium text-slate-600">
                {cat.label}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* ── Active Bar Tooltip ── */}
      {activeBar && activeCat ? (
        <View
          className="rounded-xl px-4 py-2.5 mb-3 flex-row items-center justify-between"
          style={{ backgroundColor: activeCat.color + "18", borderWidth: 1, borderColor: activeCat.color + "33" }}
        >
          <View className="flex-row items-center gap-2">
            <View
              className="w-2.5 h-2.5 rounded-sm"
              style={{ backgroundColor: activeCat.color }}
            />
            <Text className="text-xs font-semibold text-slate-700">
              {activeCat.label} — {chartData[activeBar.monthIndex]?.month} {selectedYear}
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Text
              className="text-sm font-bold"
              style={{ color: activeCat.color }}
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

      {/* ── Bar Chart (Jan–Dec fixed) ── */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-3 pb-2">
          {chartData.map((data, monthIndex) => (
            <View key={monthIndex} className="items-center">
              <View
                className="flex-row items-end gap-0.5 mb-2"
                style={{ height: BAR_MAX_HEIGHT }}
              >
                {CATEGORIES.map((cat) => {
                  const h = getBarHeight(data[cat.key]);
                  const hasValue = data[cat.key] > 0;
                  const isActive =
                    activeBar?.monthIndex === monthIndex &&
                    activeBar?.catKey === cat.key;

                  return (
                    <TouchableOpacity
                      key={cat.key}
                      onPress={() => handleBarPress(monthIndex, cat.key, data[cat.key])}
                      activeOpacity={0.7}
                      hitSlop={{ top: 6, bottom: 6, left: 3, right: 3 }}
                      style={{
                        width: 8,
                        height: h,
                        backgroundColor: hasValue ? cat.color : "#e2e8f0",
                        borderRadius: 3,
                        opacity: isActive ? 1 : hasValue ? 0.75 : 0.25,
                        // Highlight active bar with scale effect via border
                        borderWidth: isActive ? 1.5 : 0,
                        borderColor: isActive ? "#fff" : "transparent",
                        transform: isActive ? [{ scaleX: 1.2 }] : [],
                      }}
                    />
                  );
                })}
              </View>

              {/* Month label — bold if active month */}
              <Text
                className="text-xs font-semibold"
                style={{
                  color: activeBar?.monthIndex === monthIndex ? "#475569" : "#94a3b8",
                }}
              >
                {data.month}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* ── Footer ── */}
      <View className="flex-row justify-between items-center mt-3 pt-3 border-t border-slate-100">
        <Text className="text-xs text-slate-500">Total Spending Trend</Text>
        <Text
          className={`text-xs font-bold ${
            totalChange < 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          {totalChange < 0 ? "↓" : "↑"} {Math.abs(totalChange).toFixed(2)}%{" "}
          {totalChange < 0 ? "saved" : "increase"}
        </Text>
      </View>
    </View>
  );
}