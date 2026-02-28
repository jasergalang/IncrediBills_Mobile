import React, { useState } from "react";
import { View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";

const COLOR_MAP = {
  amber:   "#f59e0b",
  emerald: "#10b981",
  gray:    "#6b7280",
  orange:  "#f97316",
  blue:    "#3b82f6",
  red:     "#ef4444",
};

const DONUT_SIZE = 160;
const RADIUS = 40;
const STROKE_WIDTH = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function CategoryBreakdown({ categoryBreakdown = [], totalAmount = 0 }) {
  const [activeIdx, setActiveIdx] = useState(null);

  const filtered = categoryBreakdown.filter((c) => c.amount > 0);

  return (
    <View className="px-4 pb-4">
      <View className="bg-white rounded-2xl p-5 border border-slate-200">
        <Text className="text-base font-bold text-slate-900 mb-5">
          Category Breakdown
        </Text>

        <View className="flex-row items-center gap-4">

          {/* Donut Chart */}
          <View style={{ width: DONUT_SIZE, height: DONUT_SIZE, position: "relative" }}>
            <Svg
              width={DONUT_SIZE}
              height={DONUT_SIZE}
              viewBox="0 0 100 100"
              style={{ transform: [{ rotate: "-90deg" }] }}
            >
              {/* Background track */}
              <Circle
                cx="50"
                cy="50"
                r={RADIUS}
                fill="none"
                stroke="#e2e8f0"
                strokeWidth={STROKE_WIDTH}
              />

              {/* Category segments */}
              {filtered.map((cat, idx) => {
                const previousTotal = filtered
                  .slice(0, idx)
                  .reduce((s, c) => s + c.percentage, 0);

                const offset = (previousTotal / 100) * CIRCUMFERENCE;
                const length = (cat.percentage / 100) * CIRCUMFERENCE;
                const color = COLOR_MAP[cat.color] || "#3b82f6";
                const isActive = activeIdx === idx;

                return (
                  <Circle
                    key={idx}
                    cx="50"
                    cy="50"
                    r={RADIUS}
                    fill="none"
                    stroke={color}
                    strokeWidth={isActive ? STROKE_WIDTH + 3 : STROKE_WIDTH}
                    strokeDasharray={`${length} ${CIRCUMFERENCE}`}
                    strokeDashoffset={-offset}
                    opacity={activeIdx === null || isActive ? 1 : 0.4}
                    onPress={() => setActiveIdx(activeIdx === idx ? null : idx)}
                  />
                );
              })}
            </Svg>

            {/* Center label */}
            <View
              style={{
                position: "absolute",
                top: 0, left: 0, right: 0, bottom: 0,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {activeIdx !== null ? (
                // Show tapped category
                <View className="items-center">
                  <Text className="text-lg">{filtered[activeIdx]?.icon}</Text>
                  <Text
                    className="text-base font-bold"
                    style={{ color: COLOR_MAP[filtered[activeIdx]?.color] }}
                  >
                    {filtered[activeIdx]?.percentage}%
                  </Text>
                  <Text className="text-xs text-slate-500" numberOfLines={1}>
                    {filtered[activeIdx]?.category}
                  </Text>
                </View>
              ) : (
                // Show total
                <View className="items-center">
                  <Text className="text-base font-bold text-slate-900">
                    ₱{totalAmount >= 1000
                      ? `${(totalAmount / 1000).toFixed(1)}k`
                      : totalAmount.toLocaleString()}
                  </Text>
                  <Text className="text-xs text-slate-500">Total</Text>
                </View>
              )}
            </View>
          </View>

          {/* Category List */}
          <View className="flex-1" style={{ gap: 10 }}>
            {filtered.map((cat, idx) => {
              const color = COLOR_MAP[cat.color] || "#3b82f6";
              const isActive = activeIdx === idx;

              return (
                <View
                  key={idx}
                  style={{
                    opacity: activeIdx === null || isActive ? 1 : 0.4,
                  }}
                >
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center flex-1" style={{ gap: 8 }}>
                      {/* Color dot */}
                      <View
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: color,
                        }}
                      />
                      <View className="flex-1">
                        <Text className="text-xs font-semibold text-slate-800" numberOfLines={1}>
                          {cat.icon} {cat.category}
                        </Text>
                        <Text className="text-xs text-slate-400">
                          ₱{cat.amount.toLocaleString()}
                        </Text>
                      </View>
                    </View>
                    <Text className="text-xs font-bold text-slate-700">
                      {cat.percentage}%
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

        </View>
      </View>
    </View>
  );
}