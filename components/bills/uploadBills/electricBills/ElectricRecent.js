import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ElectricRecent({ electricBills, removeUpload }) {
  const navigation = useNavigation();

  const getFilename = (url) => {
    if (!url) return "Unknown File";
    return url.split("/").pop();
  };

  return (
    <View className="px-4 pb-6">
      <View className="flex-row items-center justify-between mb-4">
        <View>
          <Text className="text-base font-bold text-slate-900 mb-1">
            Recent Uploads
          </Text>

          <Text className="text-sm text-slate-600">
            {electricBills.count} files uploaded
          </Text>
        </View>

        <TouchableOpacity className="bg-slate-100 px-3 py-2 rounded-lg">
          <Text className="text-sm font-semibold text-slate-700">
            View All
          </Text>
        </TouchableOpacity>
      </View>

      <View className="space-y-3">
        {electricBills.bills.map((bill) => {
          const fileUrl = bill.billImage?.[0]?.url;
          const fileName = getFilename(fileUrl);

          return (
            <TouchableOpacity
              key={bill._id}
              onPress={() =>
                navigation.navigate("ElectricBillDetails", { id: bill._id })
              }
              className="bg-white rounded-2xl p-4 border border-slate-200"
            >
              <View className="flex-row items-center gap-3">
                <Image
                  source={{ uri: fileUrl }}
                  className="w-12 h-12 rounded-xl bg-amber-100"
                />
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-slate-900 mb-1">
                    {fileName}
                  </Text>
                  <Text className="text-xs text-slate-500">
                    {new Date(bill.createdAt).toLocaleString()}
                  </Text>
                </View>

                {bill.status === "Success" ? (
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={28}
                    color="#22c55e"
                  />
                ) : (
                  <Ionicons
                    name="close-circle-outline"
                    size={28}
                    color="#ef4444"
                  />
                )}

                <TouchableOpacity
                  onPress={(e) => {
                    e.stopPropagation();
                    removeUpload(bill._id);
                  }}
                  className="w-8 h-8 bg-slate-100 rounded-lg items-center justify-center ml-1"
                >
                  <Ionicons name="close" size={18} color="#64748b" />
                </TouchableOpacity>

              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
