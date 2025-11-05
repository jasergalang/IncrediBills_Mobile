import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { LinearGradient } from "expo-linear-gradient";

const recentUploads = [
  {
    id: 1,
    name: "October Electricity Bill.png",
    size: "2.5 MB",
    date: "Oct 15 at 10:30 AM",
    status: "uploaded",
  },
  {
    id: 2,
    name: "September Water Bill.pdf",
    size: "1.8 MB",
    date: "Sep 20 at 2:15 PM",
    status: "uploaded",
  },
  {
    id: 3,
    name: "August Gas Bill.jpg",
    size: "3.2 MB",
    date: "Aug 10 at 9:45 AM",
    status: "uploaded",
  },
  {
    id: 4,
    name: "July Electricity Bill.png",
    size: "2.1 MB",
    date: "Jul 5 at 11:20 AM",
    status: "uploading",
  },
];

export default function UploadBill({ route, navigation }) {
  const { category } = route.params || {
    category: { name: "Utility", icon: "📄", color: "blue" },
  };
  const [uploading, setUploading] = useState(false);
  const [uploads, setUploads] = useState(recentUploads);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log("Image selected:", result.assets[0].uri);
      // Add upload logic here
    }
  };

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/*", "application/pdf"],
    });

    if (!result.canceled) {
      console.log("Document selected:", result.uri);
      // Add upload logic here
    }
  };

  const removeUpload = (id) => {
    setUploads(uploads.filter((item) => item.id !== id));
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      {/* Header */}
      <View className="bg-white border-b border-slate-200 px-4 py-4">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="w-10 h-10 rounded-xl bg-slate-100 items-center justify-center"
          >
            <Ionicons name="arrow-back" size={20} color="#000" />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-xl font-bold text-slate-900">
              {category.name} Bill Upload
            </Text>
            <Text className="text-sm text-slate-600">
              Upload and manage your bills
            </Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Summary Cards */}
        <View className="p-4">
          <View className="flex-row gap-3 mb-6">
            <LinearGradient
              colors={["#eff6ff", "#dbeafe"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="flex-1 rounded-2xl p-4 border-2 border-blue-200"
            >
              <View className="w-10 h-10 bg-blue-500 rounded-xl items-center justify-center mb-3">
                <Text className="text-2xl">📊</Text>
              </View>
              <Text className="text-sm font-semibold text-slate-600 mb-1">
                Total Uploads
              </Text>
              <Text className="text-2xl font-bold text-blue-600">24</Text>
              <Text className="text-xs text-green-600 font-semibold mt-1">
                ↑ 8 this month
              </Text>
            </LinearGradient>

            <LinearGradient
              colors={["#f0fdf4", "#dcfce7"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="flex-1 rounded-2xl p-4 border-2 border-green-200"
            >
              <View className="w-10 h-10 bg-green-500 rounded-xl items-center justify-center mb-3">
                <Text className="text-2xl">✓</Text>
              </View>
              <Text className="text-sm font-semibold text-slate-600 mb-1">
                Processed
              </Text>
              <Text className="text-2xl font-bold text-green-600">22</Text>
              <Text className="text-xs text-slate-500 font-semibold mt-1">
                91% success rate
              </Text>
            </LinearGradient>
          </View>
        </View>

        {/* Upload Section */}
        <View className="px-4 mb-6">
          <Text className="text-base font-bold text-slate-900 mb-2">
            Upload Your Bill
          </Text>
          <Text className="text-sm text-slate-600 mb-4">
            Choose a file or take a photo of your {category.name.toLowerCase()}{" "}
            bill to get started.
          </Text>

          {/* Upload Box */}
          <TouchableOpacity
            onPress={pickImage}
            activeOpacity={0.7}
            className="border-2 border-dashed border-slate-300 rounded-2xl bg-slate-100 p-8 items-center justify-center mb-4"
          >
            <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mb-4">
              <Ionicons name="cloud-upload-outline" size={32} color="#2563eb" />
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

          {/* Action Buttons */}
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={pickImage}
              className="flex-1 bg-blue-600 rounded-xl py-3 flex-row items-center justify-center gap-2"
            >
              <Ionicons name="image-outline" size={20} color="#fff" />
              <Text className="text-white font-semibold">Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={pickDocument}
              className="flex-1 bg-indigo-600 rounded-xl py-3 flex-row items-center justify-center gap-2"
            >
              <Ionicons name="camera-outline" size={20} color="#fff" />
              <Text className="text-white font-semibold">Camera</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Uploads */}
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
              <Text className="text-sm font-semibold text-slate-700">
                View All
              </Text>
            </TouchableOpacity>
          </View>

          {/* Upload Items */}
          <View className="space-y-3">
            {uploads.map((item) => (
              <View
                key={item.id}
                className="bg-white rounded-2xl p-4 border border-slate-200"
              >
                <View className="flex-row items-center gap-3">
                  <View className="w-12 h-12 bg-blue-100 rounded-xl items-center justify-center">
                    <Ionicons
                      name={
                        item.name.includes(".pdf") ? "document-text" : "image"
                      }
                      size={24}
                      color="#2563eb"
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
                      <Text className="text-xs text-slate-500">
                        {item.size}
                      </Text>
                      <View className="w-1 h-1 bg-slate-400 rounded-full"></View>
                      <Text className="text-xs text-slate-500">
                        {item.date}
                      </Text>
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
                        <Ionicons
                          name="time-outline"
                          size={20}
                          color="#f59e0b"
                        />
                      </View>
                    )}
                    <TouchableOpacity
                      onPress={() => removeUpload(item.id)}
                      className="w-8 h-8 bg-slate-100 rounded-lg items-center justify-center"
                    >
                      <Ionicons name="close" size={18} color="#64748b" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Tips Section */}
        <View className="px-4 pb-6">
          <LinearGradient
            colors={["#fefce8", "#fef3c7"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="rounded-2xl p-4 border-2 border-amber-200"
          >
            <View className="flex-row items-start gap-3">
              <View className="w-10 h-10 bg-amber-500 rounded-xl items-center justify-center">
                <Text className="text-2xl">💡</Text>
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold text-amber-900 mb-2">
                  Pro Tips
                </Text>
                <Text className="text-xs text-amber-700 mb-1">
                  • Ensure the bill is clearly visible and readable
                </Text>
                <Text className="text-xs text-amber-700 mb-1">
                  • Use good lighting when taking photos
                </Text>
                <Text className="text-xs text-amber-700">
                  • Supported formats: PNG, JPG, PDF
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
