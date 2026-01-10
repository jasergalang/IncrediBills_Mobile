import React from 'react'
import { View, Text } from "react-native";

export default function PredictionHeader() {
    return (
        <View className="bg-white border-b border-slate-200 px-4 py-4">
            <Text className="text-2xl font-bold text-slate-900 mb-1">
                AI Predictions 🔮
            </Text>
            <Text className="text-sm text-slate-600">
                Forecast your utility costs and explore what-if scenarios with
                AI-powered insights
            </Text>
        </View>
    );
}
