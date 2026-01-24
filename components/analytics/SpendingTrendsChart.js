// import React, { useState } from "react";
// import { View, Text, Pressable } from "react-native";

// export default function SpendingTrendsChart({ spendingData }) {
//   const [selectedBar, setSelectedBar] = useState(null); 
//   const maxSpending = Math.max(...spendingData.map((d) => d.amount), 1);

//   return (
//     <View className="px-4 pb-4">
//       <View className="bg-white rounded-2xl p-5 border border-slate-200">
//         <Text className="text-base font-bold text-slate-900 mb-4">
//           Spending Trends
//         </Text>
//         <View className="h-48 flex-row items-end justify-between gap-2">
//           {spendingData.map((data, idx) => {
//             const height = (data.amount / maxSpending) * 100;

//             return (
//               <Pressable
//                 key={idx}
//                 className="flex-1 items-center"
//                 onPress={() =>
//                   setSelectedBar(selectedBar === idx ? null : idx)
//                 }
//               >
//                 <View className="w-full" style={{ height: "100%" }}>
//                   <View
//                     className="w-full rounded-t"
//                     style={{
//                       height: `${height}%`,
//                       marginTop: "auto",
//                       backgroundColor: idx % 2 === 0 ? "#467bcfff" : "#8cbaf5ff",
//                     }}
//                   />
//                   {/* Show amount above the bar if selected */}
//                   {selectedBar === idx && (
//                     <View
//                       style={{
//                         position: "absolute",
//                         bottom: `${height + 10}%`,
//                         minWidth: 60,         
//                         backgroundColor: "rgba(0,0,0,0.7)",
//                         paddingHorizontal: 6,
//                         paddingVertical: 4,
//                         borderRadius: 4,
//                         alignItems: "center",   
//                       }}
//                     >
//                       <Text className="text-white text-xs font-bold">
//                         ₱{data.amount.toFixed(0)}
//                       </Text>
//                     </View>
//                   )}
//                 </View>
//                 <Text className="text-xs font-semibold text-slate-600 mt-2">
//                   {data.month}
//                 </Text>
//               </Pressable>
//             );
//           })}
//         </View>
//       </View>
//     </View>
//   );
// }
import React, { useState } from "react";
import { View, Text, Pressable, Dimensions, useWindowDimensions } from "react-native";
import Svg, { Path, Circle, Line, Text as SvgText } from "react-native-svg";

export default function SpendingTrendsChart({ spendingData }) {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const { width: screenWidth } = useWindowDimensions();

  if (!spendingData || spendingData.length === 0) {
    return null;
  }

  const maxSpending = Math.max(...spendingData.map((d) => d.amount), 1);
  const minSpending = Math.min(...spendingData.map((d) => d.amount), 0);
  
  // Responsive chart dimensions
  const chartWidth = screenWidth - 48; // Account for mx-4 (16px each side) and padding
  const chartHeight = Math.min(200, screenWidth * 0.5); // Responsive height
  const padding = { 
    top: 20, 
    right: 15, 
    bottom: 35, 
    left: screenWidth > 360 ? 50 : 45 
  };
  
  const graphWidth = chartWidth - padding.left - padding.right;
  const graphHeight = chartHeight - padding.top - padding.bottom;

  // Calculate points with safe division
  const points = spendingData.map((data, idx) => {
    const xPos = spendingData.length > 1 
      ? padding.left + (idx / (spendingData.length - 1)) * graphWidth
      : padding.left + graphWidth / 2;
    const yPos = padding.top + graphHeight - ((data.amount - minSpending) / (maxSpending - minSpending || 1)) * graphHeight;
    return { x: xPos, y: yPos, data };
  });

  // Create path for line
  const linePath = points
    .map((point, idx) => `${idx === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  // Y-axis labels with formatting
  const yAxisSteps = 4;
  const yAxisLabels = Array.from({ length: yAxisSteps + 1 }, (_, i) => {
    const value = minSpending + ((maxSpending - minSpending) * i) / yAxisSteps;
    return Math.round(value);
  }).reverse();

  // Format currency for Y-axis
  const formatCurrency = (value) => {
    if (value >= 1000) {
      return `₱${(value / 1000).toFixed(1)}k`;
    }
    return `₱${value}`;
  };

  // Determine if we should skip some X-axis labels on smaller screens
  const showEveryNthLabel = spendingData.length > 8 && screenWidth < 380 ? 2 : 1;

  return (
    <View className="mx-4 my-4 p-4 bg-white rounded-xl shadow-sm">
      <Text className="text-lg font-bold text-slate-800 mb-4">
        Spending Trends
      </Text>

      <View className="items-center w-full">
        <Svg width={chartWidth} height={chartHeight}>
          {/* Y-axis grid lines and labels */}
          {yAxisLabels.map((label, idx) => {
            const y = padding.top + (idx * graphHeight) / yAxisSteps;
            return (
              <React.Fragment key={idx}>
                <Line
                  x1={padding.left}
                  y1={y}
                  x2={chartWidth - padding.right}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />
                <SvgText
                  x={padding.left - 8}
                  y={y + 3}
                  fontSize={screenWidth < 360 ? "9" : "10"}
                  fill="#64748b"
                  textAnchor="end"
                >
                  {formatCurrency(label)}
                </SvgText>
              </React.Fragment>
            );
          })}

          {/* Line path */}
          <Path
            d={linePath}
            stroke="#10b981"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Gradient fill under line (optional) */}
          <Path
            d={`${linePath} L ${points[points.length - 1].x} ${chartHeight - padding.bottom} L ${padding.left} ${chartHeight - padding.bottom} Z`}
            fill="#10b981"
            fillOpacity="0.1"
          />

          {/* Data points */}
          {points.map((point, idx) => (
            <Circle
              key={idx}
              cx={point.x}
              cy={point.y}
              r={selectedPoint === idx ? 5 : 3.5}
              fill={selectedPoint === idx ? "#059669" : "#10b981"}
              stroke="white"
              strokeWidth="2"
              onPress={() => setSelectedPoint(selectedPoint === idx ? null : idx)}
            />
          ))}

          {/* X-axis labels */}
          {points.map((point, idx) => {
            const shouldShow = idx % showEveryNthLabel === 0 || idx === points.length - 1;
            return shouldShow ? (
              <SvgText
                key={idx}
                x={point.x}
                y={chartHeight - padding.bottom + 18}
                fontSize={screenWidth < 360 ? "9" : "10"}
                fill="#64748b"
                textAnchor="middle"
              >
                {point.data.month}
              </SvgText>
            ) : null;
          })}
        </Svg>

        {/* Selected point info */}
        {selectedPoint !== null && (
          <View className="mt-2 px-3 py-2 bg-green-50 rounded-lg">
            <Text className="text-sm font-semibold text-green-700">
              {spendingData[selectedPoint].month}: ₱{spendingData[selectedPoint].amount.toFixed(0)}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}