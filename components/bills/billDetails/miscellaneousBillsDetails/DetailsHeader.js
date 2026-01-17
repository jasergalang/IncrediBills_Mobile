import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DetailsHeader({ navigation, billName }) {
    return (
        <View className="bg-white border-b border-slate-200 px-4 py-4">
            <View className="flex-row items-center gap-3">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="w-10 h-10 rounded-xl bg-purple-100 items-center justify-center"
                >
                    <Text style={{ fontSize: 18 }}>❮</Text>
                </TouchableOpacity>
                <View className="flex-1">
                    <Text className="text-xl font-bold text-slate-900">Bill Details</Text>
                    <Text className="text-sm text-slate-600" numberOfLines={1}>
                        {billName}
                    </Text>
                </View>

            </View>
        </View>
    );
}