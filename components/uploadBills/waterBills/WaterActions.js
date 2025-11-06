import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function UploadActions({ pickImage, takePhoto }) {
  return (
    <View className="flex-row gap-3">
      <TouchableOpacity
        onPress={pickImage}
        className="flex-1 bg-blue-600 rounded-xl py-3 flex-row items-center justify-center gap-2"
      >
        <Ionicons name="image-outline" size={20} color="#fff" />
        <Text className="text-white font-semibold">Gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={takePhoto}
        className="flex-1 bg-indigo-600 rounded-xl py-3 flex-row items-center justify-center gap-2"
      >
        <Ionicons name="camera-outline" size={20} color="#fff" />
        <Text className="text-white font-semibold">Camera</Text>
      </TouchableOpacity>
    </View>
  );
}
