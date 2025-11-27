import React from "react";
import { View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function WelcomeCard({ userData }) {
  // OPTIONAL: If you want to hide the card completely when logged out, uncomment this:
  // if (!userData) return null;

  return (
    <View className="p-4">
      <LinearGradient
        colors={["#2563eb", "#4f46e5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-2xl p-5"
      >
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-1">
            <Text className="text-white/80 text-sm mb-1">Good Day,</Text>
            <Text className="text-white font-bold text-xl">
<<<<<<< HEAD
<<<<<<< Updated upstream
              {userData.name}
            </Text>
          </View>
          <View className="w-14 h-14 bg-white/20 rounded-full items-center justify-center">
            <Text className="text-3xl">👤</Text>
=======
              {/* ✅ FIX 1: Add ?. and fallback strings */}
              {userData?.firstName || "Guest"} {userData?.lastName || ""}
            </Text>
          </View>
          <View className="w-14 h-14 bg-white/20 rounded-full overflow-hidden items-center justify-center">
            {/* ✅ FIX 2: Check if userData exists AND has a profile pic */}
            {userData?.profilePic ? (
=======
              {userData.firstName} {userData.lastName}
            </Text>
          </View>
          <View className="w-14 h-14 bg-white/20 rounded-full overflow-hidden items-center justify-center">
            {userData.profilePic ? (
>>>>>>> ab46273d0e7e6ca4d0f15d5b9ca4bdadc01a9bda
              <Image
                source={{ uri: userData.profilePic }}
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : (
              <Text className="text-3xl">👤</Text>
            )}
<<<<<<< HEAD
>>>>>>> Stashed changes
=======
>>>>>>> ab46273d0e7e6ca4d0f15d5b9ca4bdadc01a9bda
          </View>
        </View>
        <View className="flex-row items-center gap-4">
          <View className="flex-1 bg-white/20 rounded-xl p-3">
            <Text className="text-white/80 text-xs mb-1">Level</Text>
            <Text className="text-white font-bold text-xl">
              {/* ✅ FIX 3: safe access with fallback */}
              {userData?.level || 0}
            </Text>
          </View>
          <View className="flex-1 bg-white/20 rounded-xl p-3">
            <Text className="text-white/80 text-xs mb-1">Points</Text>
            <Text className="text-white font-bold text-xl">
              {/* ✅ FIX 4: safe access with fallback */}
              {userData?.points || 0}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}