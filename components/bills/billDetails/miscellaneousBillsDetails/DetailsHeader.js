import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DetailsHeader({ navigation, billName }) {
    return (
        <View className="px-4 py-3 bg-white border-b border-slate-200">
            <View className="flex-row items-center justify-between">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="w-10 h-10 items-center justify-center"
                >
                    <Ionicons name="arrow-back" size={24} color="#334155" />
                </TouchableOpacity>
                <View className="flex-1 items-center px-2">
                    <Text className="text-lg font-bold text-slate-900" numberOfLines={1}>
                        Bill Details
                    </Text>
                    <Text className="text-xs text-slate-600" numberOfLines={1}>
                        {billName}
                    </Text>
                </View>
                <TouchableOpacity className="w-10 h-10 items-center justify-center">
                    <Ionicons name="ellipsis-vertical" size={24} color="#334155" />
                </TouchableOpacity>
            </View>
        </View>
    );
}