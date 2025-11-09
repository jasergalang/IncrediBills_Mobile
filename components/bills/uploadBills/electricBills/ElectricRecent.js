import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ElectricRecent({ uploads, removeUpload }) {
  const navigation = useNavigation();

  return (
    <View className="px-4 pb-6">
      <View className="flex-row items-center justify-between mb-4">
        <View>
          <Text className="text-base font-bold text-slate-900 mb-1">
            Recent Uploads
          </Text>
          <Text className="text-sm text-slate-600">
            {uploads.length} files uploaded
          </Text>
        </View>
        <TouchableOpacity className="bg-slate-100 px-3 py-2 rounded-lg">
          <Text className="text-sm font-semibold text-slate-700">View All</Text>
        </TouchableOpacity>
      </View>

      <View className="space-y-3">
        {uploads.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() =>
              navigation.navigate("ElectricBillDetails", {
                bill: {
                  ...item,
                  scannedCost: 2850.0,
                  scannedConsumption: 285,
                  scannedDate: item.date,
                  predictedCost: 3120.0,
                  predictedConsumption: 312,
                },
              })
            }
            className="bg-white rounded-2xl p-4 border border-slate-200"
          >
            <View className="flex-row items-center gap-3">
              <View className="w-12 h-12 bg-amber-100 rounded-xl items-center justify-center">
                <Ionicons
                  name={item.name.includes(".pdf") ? "document-text" : "image"}
                  size={24}
                  color="#f59e0b"
                />
              </View>
              <View className="flex-1">
                <Text
                  className="text-sm font-semibold text-slate-900 mb-1"
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
                <View className="flex-row items-center gap-2">
                  <Text className="text-xs text-slate-500">{item.size}</Text>
                  <View className="w-1 h-1 bg-slate-400 rounded-full"></View>
                  <Text className="text-xs text-slate-500">{item.date}</Text>
                </View>
              </View>
              <View className="flex-row items-center gap-2">
                {item.status === "uploaded" ? (
                  <View className="w-8 h-8 bg-green-100 rounded-lg items-center justify-center">
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color="#22c55e"
                    />
                  </View>
                ) : (
                  <View className="w-8 h-8 bg-amber-100 rounded-lg items-center justify-center">
                    <Ionicons name="time-outline" size={20} color="#f59e0b" />
                  </View>
                )}
                <TouchableOpacity
                  onPress={(e) => {
                    e.stopPropagation();
                    removeUpload(item.id);
                  }}
                  className="w-8 h-8 bg-slate-100 rounded-lg items-center justify-center"
                >
                  <Ionicons name="close" size={18} color="#64748b" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
