import React, { useState } from "react";
import { View, TouchableOpacity, Text, ScrollView } from "react-native";
import AlertModal from "./AlertModal";
import { useSelector } from "react-redux";

export default function UtilityPicker({ utilities, selectedUtility, setSelectedUtility }) {
    const [alertModalVisible, setAlertModalVisible] = useState(false);

    // Match the same selector shape used in SummaryCards
    const predictions = useSelector((state) => state.predictions);

    const predictedAmount = (() => {
        if (!predictions || !selectedUtility) return null;
        const utilityPredictions = predictions[selectedUtility.id];
        if (!Array.isArray(utilityPredictions) || utilityPredictions.length === 0) return null;
        const latest = [...utilityPredictions].sort(
            (a, b) => new Date(b.predictedDate) - new Date(a.predictedDate)
        )[0];
        return latest?.predictedCost ?? null;
    })();

    const currentCardStyle = {
        backgroundColor: selectedUtility.backgroundColor,
        borderColor: selectedUtility.borderColor,
    };

    return (
        <>
            <View className="bg-white rounded-2xl border border-slate-200 p-3 mb-2">
                {/* Header Row */}
                <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-lg font-bold text-slate-900">
                        Configure Prediction
                    </Text>

                    {/* Set Alert Button */}
                    <TouchableOpacity
                        onPress={() => setAlertModalVisible(true)}
                        className="flex-row items-center bg-orange-400 px-3 py-2 rounded-lg"
                    >
                        <Text className="text-xs text-white font-semibold ml-1">🔔 Set Alert</Text>
                    </TouchableOpacity>
                </View>

                {/* Category Label */}
                <Text className="text-xs text-slate-400 mb-2">📊 Select Category</Text>

                {/* Utility Categories Scroll */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View className="flex-row gap-2">
                        {utilities.map((utility) => (
                            <TouchableOpacity
                                key={utility.id}
                                onPress={() => setSelectedUtility(utility)}
                                className={`px-4 py-2 rounded-lg ${selectedUtility?.id === utility.id
                                        ? ''
                                        : 'bg-slate-100'
                                    }`}
                                style={selectedUtility?.id === utility.id ? currentCardStyle : undefined}
                            >
                                <Text
                                    className={`font-semibold text-sm ${selectedUtility?.id === utility.id
                                        ? "text-black"
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

            <AlertModal
                visible={alertModalVisible}
                onClose={() => setAlertModalVisible(false)}
                selectedUtility={selectedUtility}
                predictedAmount={predictedAmount}
            />
        </>
    );
}