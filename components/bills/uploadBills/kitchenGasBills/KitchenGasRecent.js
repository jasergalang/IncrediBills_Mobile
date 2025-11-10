import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function KitchenGasRecent({ uploads, removeUpload }) {
    const navigation = useNavigation();

    if (uploads.length === 0) return null;

    return (
        <View className="px-4 pb-4">
            <Text className="text-lg font-bold text-slate-900 mb-3">
                Recent Uploads
            </Text>
            {uploads.map((upload) => (
                <TouchableOpacity
                    key={upload.id}
                    onPress={() =>
                        navigation.navigate("KitchenGasBillDetails", {
                            bill: {
                                ...upload,
                                scannedCost: 550,
                                scannedKg: 11,
                                scannedDate: upload.date,
                                predictedCost: 580,
                                predictedKg: 11.5,
                            },
                        })
                    }
                    className="bg-white rounded-xl p-4 mb-3 flex-row items-center"
                >
                    <View className="w-12 h-12 bg-orange-100 rounded-xl items-center justify-center mr-3">
                        <Ionicons name="document-text" size={24} color="#f97316" />
                    </View>
                    <View className="flex-1">
                        <Text className="text-sm font-bold text-slate-900 mb-1">
                            {upload.name}
                        </Text>
                        <Text className="text-xs text-slate-600">
                            {upload.size} • {upload.date}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={(e) => {
                            e.stopPropagation();
                            removeUpload(upload.id);
                        }}
                        className="w-8 h-8 items-center justify-center"
                    >
                        <Ionicons name="trash-outline" size={20} color="#ef4444" />
                    </TouchableOpacity>
                </TouchableOpacity>
            ))}
        </View>
    );
}