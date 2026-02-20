import React, { useMemo, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import Svg, { Polyline, Circle, Line, Text as SvgText } from "react-native-svg";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const PAD = { top: 20, bottom: 36, left: 44, right: 24 };

export default function SpendingOverview({ allBills }) {
  const { monthTotals, availableYears } = useMemo(() => {
    const totals = {};
    if (!allBills) return { monthTotals: {}, availableYears: [] };

    Object.values(allBills).forEach((bills) => {
      if (!bills) return;
      bills.forEach((bill) => {
        const d = new Date(bill.billMonth || bill.date);
        if (isNaN(d)) return;
        const year = d.getFullYear();
        const month = d.getMonth();
        if (!totals[year]) totals[year] = Array(12).fill(0);
        totals[year][month] += bill.cost || 0;
      });
    });

    const years = Object.keys(totals).map(Number).sort((a, b) => b - a);
    return { monthTotals: totals, availableYears: years };
  }, [allBills]);

  const [selectedYear, setSelectedYear] = useState(
    availableYears.length > 0 ? availableYears[0] : new Date().getFullYear()
  );

  const values = monthTotals[selectedYear] || Array(12).fill(0);
  const hasData = values.some((v) => v > 0);

  // Chart dimensions — use full card width minus horizontal card padding (px-4 = 16*2 = 32)
  const screenWidth = Dimensions.get("window").width;
  const chartWidth = screenWidth - 32; // matches px-4 on parent
  const chartHeight = 200;
  const plotW = chartWidth - PAD.left - PAD.right;
  const plotH = chartHeight - PAD.top - PAD.bottom;

  const maxVal = Math.max(...values, 1);
  const toX = (i) => PAD.left + (i / 11) * plotW;
  const toY = (v) => PAD.top + plotH - (v / maxVal) * plotH;

  const points = values.map((v, i) => `${toX(i)},${toY(v)}`).join(" ");

  const yTicks = [0, 0.33, 0.66, 1].map((f) => ({
    val: Math.round(maxVal * f),
    y: toY(maxVal * f),
  }));

  const formatAmt = (n) => {
    if (n >= 1000) return `₱${(n / 1000).toFixed(1)}k`;
    return `₱${n}`;
  };

  const [activeMonth, setActiveMonth] = useState(null);

  const handlePress = (evt) => {
    const touchX = evt.nativeEvent.locationX;
    let nearestIdx = 0;
    let nearestDist = Infinity;
    for (let i = 0; i < 12; i++) {
      const dist = Math.abs(toX(i) - touchX);
      if (dist < nearestDist) { nearestDist = dist; nearestIdx = i; }
    }
    setActiveMonth((prev) => (prev === nearestIdx ? null : nearestIdx));
  };

  return (
    <View className="px-4 pb-4">
      <View className="bg-white rounded-2xl border border-slate-200 overflow-hidden">

        {/* ── Header: Title + Year Selector (all inside the card) ── */}
        <View className="px-4 pt-4 pb-2">
          <Text className="text-base font-bold text-slate-900 mb-3">
            Spending Overview
          </Text>

          <View className="flex-row items-center gap-2">
            <Text className="text-xs text-slate-500 font-medium mr-1">Year</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-2">
                {availableYears.length === 0 ? (
                  <View className="px-3 py-1 rounded-full bg-slate-100">
                    <Text className="text-xs text-slate-400">No data</Text>
                  </View>
                ) : (
                  availableYears.map((yr) => (
                    <TouchableOpacity
                      key={yr}
                      onPress={() => { setSelectedYear(yr); setActiveMonth(null); }}
                      className={`px-3 py-1 rounded-full ${selectedYear === yr ? "bg-indigo-600" : "bg-slate-100"}`}
                    >
                      <Text className={`text-xs font-semibold ${selectedYear === yr ? "text-white" : "text-slate-600"}`}>
                        {yr}
                      </Text>
                    </TouchableOpacity>
                  ))
                )}
              </View>
            </ScrollView>
          </View>
        </View>

        {/* ── Empty State ── */}
        {!hasData ? (
          <View className="items-center justify-center py-10">
            <Text className="text-3xl mb-2">📊</Text>
            <Text className="text-sm text-slate-400">No spending data for {selectedYear}</Text>
          </View>
        ) : (
          <>
            {/* ── Active Month Tooltip ── */}
            {activeMonth !== null && (
              <View className="mx-4 mb-1 px-3 py-2 bg-indigo-50 rounded-xl border border-indigo-100 flex-row items-center justify-between">
                <Text className="text-xs font-semibold text-indigo-600">
                  {MONTHS[activeMonth]} {selectedYear}
                </Text>
                <Text className="text-sm font-bold text-indigo-700">
                  {values[activeMonth] > 0
                    ? `₱${values[activeMonth].toLocaleString()}`
                    : "No data"}
                </Text>
              </View>
            )}

            {/* ── SVG Chart (no horizontal padding — fills full card width) ── */}
            <View className="pt-1 pb-0">
              <Svg width={chartWidth} height={chartHeight} onPress={handlePress}>
                {/* Y grid lines + labels */}
                {yTicks.map((tick) => (
                  <React.Fragment key={tick.val}>
                    <Line
                      x1={PAD.left} y1={tick.y}
                      x2={chartWidth - PAD.right} y2={tick.y}
                      stroke="#e2e8f0" strokeWidth={1}
                      strokeDasharray={tick.val === 0 ? "0" : "3,3"}
                    />
                    <SvgText
                      x={PAD.left - 4} y={tick.y + 4}
                      fontSize={9} fill="#94a3b8" textAnchor="end"
                    >
                      {formatAmt(tick.val)}
                    </SvgText>
                  </React.Fragment>
                ))}

                {/* X month labels */}
                {MONTHS.map((m, i) => (
                  <SvgText
                    key={m}
                    x={toX(i)} y={chartHeight - 4}
                    fontSize={9}
                    fill={activeMonth === i ? "#4f46e5" : "#94a3b8"}
                    fontWeight={activeMonth === i ? "bold" : "normal"}
                    textAnchor="middle"
                  >
                    {m}
                  </SvgText>
                ))}

                {/* Active month guide line */}
                {activeMonth !== null && (
                  <Line
                    x1={toX(activeMonth)} y1={PAD.top}
                    x2={toX(activeMonth)} y2={PAD.top + plotH}
                    stroke="#4f46e5" strokeWidth={1.5}
                    strokeDasharray="3,3" opacity={0.5}
                  />
                )}

                {/* Spend line */}
                <Polyline
                  points={points}
                  fill="none"
                  stroke="#4f46e5"
                  strokeWidth={2.5}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />

                {/* Dots */}
                {values.map((v, i) =>
                  v > 0 ? (
                    <Circle
                      key={i}
                      cx={toX(i)} cy={toY(v)}
                      r={activeMonth === i ? 6 : 3.5}
                      fill={activeMonth === i ? "#4f46e5" : "#818cf8"}
                      stroke="white" strokeWidth={2}
                    />
                  ) : null
                )}
              </Svg>
            </View>

            {/* ── Legend: Total Bills ── */}
            <View className="flex-row items-center justify-center gap-2 pt-1">
              <View className="flex-row items-center gap-1.5">
                <View className="flex-row items-center" style={{ width: 28 }}>
                  <View style={{ flex: 1, height: 2, backgroundColor: "#4f46e5", borderRadius: 1 }} />
                  <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#818cf8", borderWidth: 1.5, borderColor: "white", marginLeft: -4 }} />
                </View>
                <Text className="text-xs text-slate-500 font-medium">Total Bills</Text>
              </View>
            </View>

            {/* ── Stats Cards ── */}
            {(() => {
              const totalSpending = values.reduce((sum, v) => sum + v, 0);
              const highestVal = Math.max(...values);
              const highestIdx = values.indexOf(highestVal);
              return (
                <View className="flex-row gap-3 px-4 pt-3 pb-4">
                  {/* Total Spending */}
                  <View className="flex-1 rounded-xl p-3" style={{ backgroundColor: "#eff6ff" }}>
                    <Text className="text-xs text-slate-500 font-medium mb-1">Total Spending</Text>
                    <Text className="text-lg font-bold" style={{ color: "#4f46e5" }}>
                      ₱{totalSpending.toLocaleString()}
                    </Text>
                    <Text className="text-xs mt-0.5" style={{ color: "#88acf5" }}>
                      {selectedYear}
                    </Text>
                  </View>

                  {/* Highest */}
                  <View className="flex-1 rounded-xl p-3" style={{ backgroundColor: "#fdf4ff" }}>
                    <Text className="text-xs text-slate-500 font-medium mb-1">Highest</Text>
                    <Text className="text-lg font-bold" style={{ color: "#9333ea" }}>
                      ₱{highestVal.toLocaleString()}
                    </Text>
                    <Text className="text-xs mt-0.5" style={{ color: "#c084fc" }}>
                      {MONTHS[highestIdx]} {selectedYear}
                    </Text>
                  </View>
                </View>
              );
            })()}
          </>
        )}
      </View>
    </View>
  );
}