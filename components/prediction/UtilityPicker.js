import React, { useState } from "react";
import { View, TouchableOpacity, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function UtilityPicker({ utilities, selectedUtility, setSelectedUtility }) {
    const [selectedRange, setSelectedRange] = useState("1 month");
    const [showRangeDropdown, setShowRangeDropdown] = useState(false);

    const predictionRanges = ["1 month", "3 months", "6 months", "1 year"];

    return (
        <View className="px-2 pb-2 mb-4">
            <Text className="text-lg font-bold text-slate-900 mb-2">
                Configure Prediction
            </Text>
            
            {/* Category and Range Selection Row */}
            <View className="flex-row items-center justify-between mb-2">
                <Text className="text-xs text-slate-400">
                    📊 Select Category and Prediction Range
                </Text>
                
                {/* Prediction Range Dropdown */}
                <View className="relative">
                    <TouchableOpacity
                        onPress={() => setShowRangeDropdown(!showRangeDropdown)}
                        className="flex-row items-center bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-200"
                    >
                        <Text className="text-xs text-blue-700 font-semibold mr-1">
                            📅 {selectedRange}
                        </Text>
                        <Ionicons 
                            name={showRangeDropdown ? "chevron-up" : "chevron-down"} 
                            size={14} 
                            color="#1d4ed8" 
                        />
                    </TouchableOpacity>

                    {/* Dropdown Menu */}
                    {showRangeDropdown && (
                        <View className="absolute top-9 right-0 bg-white border-2 border-blue-300 rounded-xl shadow-2xl z-10 min-w-[130px] overflow-hidden">
                            {predictionRanges.map((range, index) => (
                                <TouchableOpacity
                                    key={range}
                                    onPress={() => {
                                        setSelectedRange(range);
                                        setShowRangeDropdown(false);
                                    }}
                                    className={`px-4 py-3 ${
                                        index !== predictionRanges.length - 1 ? "border-b border-slate-100" : ""
                                    } ${
                                        selectedRange === range ? "bg-blue-600" : "bg-slate-50 hover:bg-slate-100"
                                    }`}
                                >
                                    <Text
                                        className={`text-sm font-medium ${
                                            selectedRange === range
                                                ? "text-white font-bold"
                                                : "text-slate-700"
                                        }`}
                                    >
                                        {selectedRange === range ? "✓ " : ""}{range}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
            </View>

            {/* Utility Categories Scroll */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row gap-2">
                    {utilities.map((utility) => (
                        <TouchableOpacity
                            key={utility.id}
                            onPress={() => setSelectedUtility(utility)}
                            className={`px-4 py-2 rounded-lg ${
                                selectedUtility?.id === utility.id 
                                    ? "bg-blue-600" 
                                    : "bg-slate-100"
                            }`}
                        >
                            <Text
                                className={`font-semibold text-sm ${
                                    selectedUtility?.id === utility.id 
                                        ? "text-white" 
                                        : "text-slate-600"
                                }`}
                            >
                                {utility.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}