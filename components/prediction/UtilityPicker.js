import React from "react";
import { View, TouchableOpacity, Text, ScrollView } from "react-native";

export default function UtilityPicker({ utilities, selectedUtility, setSelectedUtility }) {
    return (
        <View className="px-2 pb-2 mb-4">
            <Text className="text-lg font-bold text-slate-900 mb-2">
                Configure Prediction
            </Text>
            <Text className="text-xs text-slate-400 mb-2">
                📊 Select Category
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row gap-2">
                    {utilities.map((utility) => (
                        <TouchableOpacity
                            key={utility.id}
                            onPress={() => setSelectedUtility(utility)}
                            className={`px-4 py-2 rounded-lg ${selectedUtility?.id === utility.id ? "bg-blue-600" : "bg-slate-100"
                                }`}
                        >
                            <Text
                                className={`font-semibold text-sm ${selectedUtility?.id === utility.id ? "text-white" : "text-slate-600"
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
