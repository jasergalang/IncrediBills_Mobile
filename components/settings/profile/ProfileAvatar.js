import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";

export default function ProfileAvatar({ profile, imagePreview, setImagePreview }) {
    const dispatch = useDispatch();
    const [uploading, setUploading] = useState(false);

    const handleImagePick = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled) {
                const imageUri = result.assets[0].uri;
                setImagePreview(imageUri);

                // Upload to server
                await handleImageUpload(imageUri);
            }
        } catch (error) {
            Alert.alert("Error", "Failed to pick image. Please try again.");
        }
    };

    const handleImageUpload = async (imageUri) => {
        setUploading(true);

        try {
            // Create FormData for image upload
            const formData = new FormData();
            formData.append('profilePic', {
                uri: imageUri,
                type: 'image/jpeg',
                name: 'profile.jpg',
            });

            // Dispatch Redux action to upload image
            // await dispatch(uploadProfileImage(formData));

            // Simulate upload for now
            setTimeout(() => {
                setUploading(false);
                Alert.alert("Success", "Profile picture updated successfully!");
            }, 1500);
        } catch (error) {
            setUploading(false);
            Alert.alert("Error", "Failed to upload image. Please try again.");
            // Revert preview on error
            setImagePreview(profile?.profilePic?.[0]?.url || null);
        }
    };

    const handleRemoveImage = async () => {
        Alert.alert(
            "Remove Photo",
            "Are you sure you want to remove your profile picture?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Remove",
                    style: "destructive",
                    onPress: async () => {
                        setUploading(true);
                        try {
                            // Dispatch Redux action to remove image
                            // await dispatch(removeProfileImage());

                            // Simulate removal
                            setTimeout(() => {
                                setImagePreview(null);
                                setUploading(false);
                                Alert.alert("Success", "Profile picture removed.");
                            }, 1000);
                        } catch (error) {
                            setUploading(false);
                            Alert.alert("Error", "Failed to remove image.");
                        }
                    },
                },
            ]
        );
    };

    return (
        <View className="bg-white rounded-2xl border border-slate-200 p-6">
            <Text className="text-lg font-bold text-slate-900 mb-6">
                Profile Picture
            </Text>

            <View className="items-center">
                {/* Avatar Display */}
                <View className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-600 items-center justify-center overflow-hidden mb-6 relative">
                    {imagePreview ? (
                        <Image
                            source={{ uri: imagePreview }}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    ) : (
                        <Text className="text-6xl">👤</Text>
                    )}

                    {/* Upload Overlay */}
                    {uploading && (
                        <View className="absolute inset-0 bg-black/50 items-center justify-center">
                            <ActivityIndicator size="large" color="#ffffff" />
                        </View>
                    )}
                </View>

                {/* Profile Actions */}
                {/* <View className="w-full space-y-3 ">
                    <TouchableOpacity
                        onPress={handleImagePick}
                        disabled={uploading}
                        className={`px-6 py-3 rounded-xl items-center ${
                            uploading ? "bg-blue-400" : "bg-blue-600"
                        }`}
                    >
                        <Text className="text-white font-semibold">
                            {uploading ? "⏳ Uploading..." : "📸 Upload Photo"}
                        </Text>
                    </TouchableOpacity>
                    
                    {imagePreview && (
                        <TouchableOpacity
                            onPress={handleRemoveImage}
                            disabled={uploading}
                            className={`px-6 py-3 rounded-xl items-center border border-red-200 ${
                                uploading ? "bg-red-25" : "bg-red-50" 
                            }`}
                        >
                            <Text className="text-red-600 font-semibold">
                                ✕ Remove Photo
                            </Text>
                        </TouchableOpacity>
                    )}
                    
                    <Text className="text-sm text-slate-500 text-center pt-2">
                        JPG, PNG up to 5MB
                    </Text>
                </View> */}
                {/* Profile Actions */}
                <View className="w-full">
                    {/* Buttons */}
                    <View className="space-y-3">
                        <TouchableOpacity
                            onPress={handleImagePick}
                            disabled={uploading}
                            className={`px-6 py-3 mb-2 rounded-xl items-center ${uploading ? "bg-blue-400" : "bg-blue-600"
                                }`}
                        >
                            <Text className="text-white font-semibold">
                                {uploading ? "⏳ Uploading..." : "📸 Upload Photo"}
                            </Text>
                        </TouchableOpacity>

                        {imagePreview && (
                            <TouchableOpacity
                                onPress={handleRemoveImage}
                                disabled={uploading}
                                className={`px-6 py-3 rounded-xl items-center border border-red-200 ${uploading ? "bg-red-25" : "bg-red-50"
                                    }`}
                            >
                                <Text className="text-red-600 font-semibold">
                                    ✕ Remove Photo
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
}