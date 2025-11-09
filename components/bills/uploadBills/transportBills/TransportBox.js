import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";

export default function TransportBox({ navigation }) {
  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      console.log(result.assets[0].uri);
    }
  };

  const handleDocumentPick = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf", "image/*"],
    });
    if (result.type === "success") {
      console.log(result.uri);
    }
  };

  return (
    <View className="px-4 pb-4">
      <LinearGradient
        colors={["#f3f4f6", "#e5e7eb"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-2xl p-6 border-2 border-dashed border-gray-300"
      >
        <View className="items-center">
          <View className="w-16 h-16 bg-gray-500 rounded-2xl items-center justify-center mb-4">
            <Ionicons name="cloud-upload-outline" size={32} color="#fff" />
          </View>
          <Text className="text-lg font-bold text-slate-900 mb-2">
            Upload Fuel Receipt
          </Text>
          <Text className="text-sm text-slate-600 text-center mb-4">
            Drag & drop or click to upload{"\n"}PNG, JPG or PDF (Max 10MB)
          </Text>
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={handleImagePick}
              className="bg-gray-600 px-6 py-3 rounded-xl"
            >
              <Text className="text-white font-semibold">Choose Image</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDocumentPick}
              className="bg-slate-100 px-6 py-3 rounded-xl border border-slate-300"
            >
              <Text className="text-slate-700 font-semibold">Browse Files</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
