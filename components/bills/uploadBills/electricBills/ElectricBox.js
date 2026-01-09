import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ElectricBox({ pickImage, category, selectedImageUri, onRemoveImage }) {
  if (selectedImageUri) {
    return (
      <View className="rounded-2xl bg-white mb-4 overflow-hidden shadow-sm">
        {/* Remove button */}
        <TouchableOpacity
          onPress={onRemoveImage}
          className="absolute top-3 right-3 z-10 bg-red-500 rounded-full p-2 shadow-lg"
          activeOpacity={0.7}
        >
          <Ionicons name="close" size={20} color="white" />
        </TouchableOpacity>

        {/* Image preview */}
        <Image
          source={{ uri: selectedImageUri }}
          className="w-full h-80"
          resizeMode="cover"
        />

        {/* Change image button */}
        <TouchableOpacity
          onPress={pickImage}
          className="bg-amber-50 p-3 items-center border-t border-amber-100"
          activeOpacity={0.7}
        >
          <Text className="text-amber-600 font-semibold">Change Image</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={pickImage}
      activeOpacity={0.7}
      className="border-2 border-dashed border-amber-300 rounded-2xl bg-amber-50 p-8 items-center justify-center mb-4"
    >
      <View className="w-16 h-16 bg-amber-100 rounded-full items-center justify-center mb-4">
        <Ionicons name="cloud-upload-outline" size={32} color="#f59e0b" />
      </View>
      <Text className="text-base font-semibold text-slate-900 mb-2">
        Tap to Upload
      </Text>
      <Text className="text-sm text-slate-600 text-center mb-4">
        Choose a file from your device or take a photo
      </Text>
      <View className="flex-row gap-2">
        <View className="bg-white px-3 py-1 rounded-full border border-slate-200">
          <Text className="text-xs text-slate-600 font-medium">PNG</Text>
        </View>
        <View className="bg-white px-3 py-1 rounded-full border border-slate-200">
          <Text className="text-xs text-slate-600 font-medium">JPG</Text>
        </View>
        <View className="bg-white px-3 py-1 rounded-full border border-slate-200">
          <Text className="text-xs text-slate-600 font-medium">PDF</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}